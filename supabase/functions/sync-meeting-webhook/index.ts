import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function cleanOneLine(text: unknown): string {
  if (!text || typeof text !== "string") return "";
  return text.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeDate(raw: unknown): string {
  if (!raw) return "";
  const s = String(raw).trim();
  const m1 = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (m1) return `${m1[1]}-${m1[2].padStart(2, "0")}-${m1[3].padStart(2, "0")}`;
  const m2 = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
  if (m2) return `${m2[3]}-${m2[2].padStart(2, "0")}-${m2[1].padStart(2, "0")}`;
  const m3 = s.match(/meet-(\d{4}-\d{2}-\d{2})/);
  if (m3) return m3[1];
  return "";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: "Server misconfigured: missing Supabase credentials." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await req.json();

    // Support direct payload or wrapped payload
    const meetingData = body.meeting || body;
    const isoDate = normalizeDate(meetingData.date || meetingData.id);

    if (!isoDate) {
      return new Response(JSON.stringify({ error: "Invalid date format. Expected YYYY-MM-DD or DD-MM-YYYY." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const meetingId = meetingData.id || `meet-${isoDate}`;
    const dateParts = isoDate.split("-");
    const displayDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    const title = cleanOneLine(meetingData.title) || displayDate;
    const focus = cleanOneLine(meetingData.focus) || "";
    const isHoliday = Boolean(meetingData.isHoliday);
    const holidayName = isHoliday ? (cleanOneLine(meetingData.holidayName) || "Holiday") : null;
    const noMeetingHeld = Boolean(meetingData.noMeetingHeld);
    const notRecorded = Boolean(meetingData.notRecorded);

    // Webhook Secret Verification (Optional - active if SYNC_WEBHOOK_SECRET is set in Edge Function secrets)
    const expectedSecret = Deno.env.get("SYNC_WEBHOOK_SECRET");
    if (expectedSecret) {
      const incomingSecret = req.headers.get("x-webhook-secret") || req.headers.get("x-api-key");
      const authHeader = req.headers.get("authorization");
      const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
      if (incomingSecret !== expectedSecret && bearerToken !== expectedSecret && bearerToken !== supabaseServiceKey) {
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid webhook secret or authorization token." }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    // 1. Unbundle & clean breakdown machines (Strictly ONE MACHINE per card)
    const rawBreakdowns = Array.isArray(meetingData.breakdowns) ? meetingData.breakdowns : [];
    const machinesList: Array<Record<string, unknown>> = [];

    for (const item of rawBreakdowns) {
      if (!item) continue;
      const rawSerial = cleanOneLine(item.serial_number || item.serialNumber || "N/A");
      const rawModel = cleanOneLine(item.model || item.machine_model || "Standard Fleet Machine");
      const rawSite = cleanOneLine(item.site || item.site_location || item.location || "General Site");
      const rawIssue = cleanOneLine(item.issue || item.description || "Breakdown reported.");
      const rawAction = cleanOneLine(item.action || "Technician inspection assigned.");
      const rawLogistics = cleanOneLine(item.logistics) || null;
      const rawClarification = cleanOneLine(item.clarification) || null;
      const rawPending = cleanOneLine(item.pending_issue || item.pendingIssue) || null;
      const rawStatus = cleanOneLine(item.status || "Under Investigation");

      // Auto-unbundle if multiple serials are bundled (e.g., "33459 / 33400", "502 & 510")
      const serialSplitRegex = /\s*(?:\/|\band\b|&|,)\s*/i;
      const serialTokens = rawSerial.split(serialSplitRegex).map((s: string) => s.trim()).filter((s: string) => s.length > 0 && !s.match(/^(?:N\/?A|None)$/i));

      if (serialTokens.length > 1 && !rawSerial.includes("N/A")) {
        for (const token of serialTokens) {
          machinesList.push({
            meeting_id: meetingId,
            model: rawModel,
            serial_number: token,
            site: rawSite,
            issue: rawIssue,
            action: rawAction,
            logistics: rawLogistics,
            clarification: rawClarification,
            pending_issue: rawPending,
            status: rawStatus
          });
        }
      } else {
        machinesList.push({
          meeting_id: meetingId,
          model: rawModel,
          serial_number: rawSerial,
          site: rawSite,
          issue: rawIssue,
          action: rawAction,
          logistics: rawLogistics,
          clarification: rawClarification,
          pending_issue: rawPending,
          status: rawStatus
        });
      }
    }

    // 2. Spare parts
    const rawParts = Array.isArray(meetingData.parts) ? meetingData.parts : [];
    const partsList = rawParts
      .map((p: Record<string, unknown>) => ({
        meeting_id: meetingId,
        part_name: cleanOneLine(p.part || p.part_name),
        equipment_context: cleanOneLine(p.context || p.equipment_context) || null,
        status_next_steps: cleanOneLine(p.statusNextSteps || p.status_next_steps || "Procurement active.")
      }))
      .filter((p: { part_name: string }) => p.part_name);

    // 3. Action items
    const rawActions = Array.isArray(meetingData.actionItems) ? meetingData.actionItems : [];
    const actionList = rawActions
      .map((a: Record<string, unknown>) => ({
        meeting_id: meetingId,
        person: cleanOneLine(a.person || "Unassigned"),
        task: cleanOneLine(a.task || "Follow up required.")
      }))
      .filter((a: { person: string; task: string }) => a.person && a.task);

    // 4. Directives
    const rawDirectives = Array.isArray(meetingData.directives) ? meetingData.directives : [];
    const directiveList = rawDirectives
      .map((d: Record<string, unknown>) => ({
        meeting_id: meetingId,
        title: cleanOneLine(d.title || "Operational Directive"),
        points: Array.isArray(d.points) ? d.points.map((pt: unknown) => cleanOneLine(pt)).filter(Boolean) : []
      }))
      .filter((d: { title: string }) => d.title);

    // 5. Upsert master meeting row
    const { error: meetErr } = await supabase
      .from("meetings")
      .upsert({
        id: meetingId,
        date: isoDate,
        title,
        focus,
        is_holiday: isHoliday,
        holiday_name: holidayName,
        no_meeting_held: noMeetingHeld,
        not_recorded: notRecorded,
        breakdowns_count: machinesList.length,
        parts_count: partsList.length,
        directives_count: directiveList.length,
        action_items_count: actionList.length,
        updated_at: new Date().toISOString()
      }, { onConflict: "id" });

    if (meetErr) {
      throw new Error(`Master meeting upsert error: ${meetErr.message}`);
    }

    // 6. Refresh child records atomically
    await Promise.all([
      supabase.from("breakdown_machines").delete().eq("meeting_id", meetingId),
      supabase.from("meeting_parts").delete().eq("meeting_id", meetingId),
      supabase.from("meeting_action_items").delete().eq("meeting_id", meetingId),
      supabase.from("meeting_directives").delete().eq("meeting_id", meetingId)
    ]);

    if (machinesList.length > 0) {
      const { error: bErr } = await supabase.from("breakdown_machines").insert(machinesList);
      if (bErr) throw new Error(`Breakdowns insert error: ${bErr.message}`);
    }
    if (partsList.length > 0) {
      const { error: pErr } = await supabase.from("meeting_parts").insert(partsList);
      if (pErr) throw new Error(`Parts insert error: ${pErr.message}`);
    }
    if (actionList.length > 0) {
      const { error: aErr } = await supabase.from("meeting_action_items").insert(actionList);
      if (aErr) throw new Error(`Action items insert error: ${aErr.message}`);
    }
    if (directiveList.length > 0) {
      const { error: dErr } = await supabase.from("meeting_directives").insert(directiveList);
      if (dErr) throw new Error(`Directives insert error: ${dErr.message}`);
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Meeting for ${displayDate} successfully ingested.`,
      meetingId,
      date: isoDate,
      breakdownsCount: machinesList.length,
      partsCount: partsList.length,
      actionItemsCount: actionList.length,
      directivesCount: directiveList.length
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
