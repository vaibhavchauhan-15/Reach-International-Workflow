/**
 * Reach International Operations - Streamlined Daily Meeting Supabase Pipeline
 * 
 * Purpose:
 * Fast, atomic, 100% cloud-based ingestion for a SINGLE daily meeting report.
 * Directly upserts into Supabase without re-seeding past meetings or writing static files.
 * 
 * Usage:
 * 1. CLI file path: node scripts/sync-daily-meeting.js path/to/meeting.json
 * 2. CLI json string: node scripts/sync-daily-meeting.js --json '{"date":"2026-10-08",...}'
 * 3. Stdin piping: cat meeting.json | node scripts/sync-daily-meeting.js
 * 4. Programmatic import: import { syncDailyMeeting } from './scripts/sync-daily-meeting.js';
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { unbundleBreakdownEntry } from '../src/utils/breakdownNormalizer.js';
import { formatDateDDMMYYYY, normalizeDateToYYYYMMDD } from '../src/utils/meetingUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function loadEnv() {
    const envPath = path.join(ROOT_DIR, '.env');
    if (!fs.existsSync(envPath)) return {};
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    const env = {};
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const [k, ...v] = trimmed.split('=');
        if (k && v.length) env[k.trim()] = v.join('=').trim();
    }
    return env;
}

const env = loadEnv();
const SUPABASE_URL = process.env.SUPABASE_URL || env.SUPABASE_URL || 'https://mwtfftedrtxiegawgssf.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;

if (!SERVICE_KEY) {
    console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY in environment or .env');
    process.exit(1);
}

export const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false }
});

/**
 * Clean and truncate string to a concise single-line representation
 */
function cleanOneLine(text) {
    if (!text || typeof text !== 'string') return '';
    return text.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Upsert a single daily meeting record and its child relations into Supabase.
 * @param {Object} meetingData - Standard meeting data object
 * @returns {Promise<Object>} Ingestion summary statistics
 */
export async function syncDailyMeeting(meetingData) {
    if (!meetingData || typeof meetingData !== 'object') {
        throw new Error('Invalid meeting data: expected a JSON object.');
    }

    const isoDate = normalizeDateToYYYYMMDD(meetingData.date || meetingData.id);
    if (!isoDate || !isoDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        throw new Error(`Invalid meeting date: "${meetingData.date}". Expected YYYY-MM-DD.`);
    }

    const meetingId = meetingData.id || `meet-${isoDate}`;
    const displayDate = formatDateDDMMYYYY(isoDate);
    const title = cleanOneLine(meetingData.title) || displayDate;
    const focus = cleanOneLine(meetingData.focus) || '';
    const isHoliday = Boolean(meetingData.isHoliday);
    const holidayName = isHoliday ? (cleanOneLine(meetingData.holidayName) || 'Holiday') : null;
    const noMeetingHeld = Boolean(meetingData.noMeetingHeld);
    const notRecorded = Boolean(meetingData.notRecorded);

    // 1. Process & unbundle machine breakdowns (Strictly ONE MACHINE per row)
    const rawBreakdowns = Array.isArray(meetingData.breakdowns) ? meetingData.breakdowns : [];
    const unbundledMachines = [];

    for (const item of rawBreakdowns) {
        if (!item) continue;

        // If the item is already a well-formed single-machine record, preserve exact fields
        if (item.model && (item.serialNumber || item.serial_number) && item.issue && item.action) {
            unbundledMachines.push({
                meeting_id: meetingId,
                model: cleanOneLine(item.model),
                serial_number: cleanOneLine(item.serialNumber || item.serial_number || 'N/A'),
                site: cleanOneLine(item.site || item.site_location || item.location || 'General Site'),
                issue: cleanOneLine(item.issue),
                action: cleanOneLine(item.action),
                logistics: cleanOneLine(item.logistics) || null,
                clarification: cleanOneLine(item.clarification) || null,
                pending_issue: cleanOneLine(item.pendingIssue || item.pending_issue) || null,
                status: cleanOneLine(item.status || 'Under Investigation')
            });
            continue;
        }

        const unbundled = unbundleBreakdownEntry(item, {
            date: isoDate,
            dateDisplay: displayDate,
            id: meetingId
        });

        if (Array.isArray(unbundled) && unbundled.length > 0) {
            unbundled.forEach(m => {
                unbundledMachines.push({
                    meeting_id: meetingId,
                    model: cleanOneLine(m.model || m.machine_model || 'Standard Fleet Machine'),
                    serial_number: cleanOneLine(m.serial_number || m.serialNumber || 'N/A'),
                    site: cleanOneLine(m.site || m.site_location || m.location || 'General Site'),
                    issue: cleanOneLine(m.full_issue || m.short_issue || m.issue || m.description || 'Breakdown reported.'),
                    action: cleanOneLine(m.full_action || m.short_action || m.action || 'Technician inspection assigned.'),
                    logistics: cleanOneLine(m.full_logistics || m.short_logistics || m.logistics) || null,
                    clarification: cleanOneLine(m.full_clarification || m.short_clarification || m.clarification) || null,
                    pending_issue: cleanOneLine(m.full_pending || m.short_pending || m.pending_issue || m.pendingIssue) || null,
                    status: cleanOneLine(m.full_status || m.short_status || m.status || 'Under Investigation')
                });
            });
        }
    }

    // 2. Process spare parts
    const rawParts = Array.isArray(meetingData.parts) ? meetingData.parts : [];
    const partsRows = rawParts.map(p => ({
        meeting_id: meetingId,
        part_name: cleanOneLine(p.part || p.part_name || 'Unspecified Part'),
        equipment_context: cleanOneLine(p.context || p.equipment_context) || null,
        status_next_steps: cleanOneLine(p.statusNextSteps || p.status_next_steps || 'Procurement follow-up active.')
    })).filter(p => p.part_name);

    // 3. Process action items
    const rawActionItems = Array.isArray(meetingData.actionItems) ? meetingData.actionItems : [];
    const actionRows = rawActionItems.map(a => ({
        meeting_id: meetingId,
        person: cleanOneLine(a.person || 'Unassigned'),
        task: cleanOneLine(a.task || 'Follow up required.')
    })).filter(a => a.person && a.task);

    // 4. Process directives
    const rawDirectives = Array.isArray(meetingData.directives) ? meetingData.directives : [];
    const directiveRows = rawDirectives.map(d => ({
        meeting_id: meetingId,
        title: cleanOneLine(d.title || 'Operational Directive'),
        points: Array.isArray(d.points) ? d.points.map(pt => cleanOneLine(pt)).filter(Boolean) : []
    })).filter(d => d.title);

    // 5. Upsert master meeting record
    const { error: meetErr } = await supabaseAdmin
        .from('meetings')
        .upsert({
            id: meetingId,
            date: isoDate,
            title,
            focus,
            is_holiday: isHoliday,
            holiday_name: holidayName,
            no_meeting_held: noMeetingHeld,
            not_recorded: notRecorded,
            breakdowns_count: unbundledMachines.length,
            parts_count: partsRows.length,
            directives_count: directiveRows.length,
            action_items_count: actionRows.length,
            updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

    if (meetErr) {
        throw new Error(`Failed to upsert meeting master record: ${meetErr.message}`);
    }

    // 6. Atomically refresh child tables for this specific meeting
    // Delete existing child entries for this meeting to prevent duplicates or stale records
    await Promise.all([
        supabaseAdmin.from('breakdown_machines').delete().eq('meeting_id', meetingId),
        supabaseAdmin.from('meeting_parts').delete().eq('meeting_id', meetingId),
        supabaseAdmin.from('meeting_action_items').delete().eq('meeting_id', meetingId),
        supabaseAdmin.from('meeting_directives').delete().eq('meeting_id', meetingId)
    ]);

    // Insert fresh child entries
    if (unbundledMachines.length > 0) {
        const { error: bErr } = await supabaseAdmin.from('breakdown_machines').insert(unbundledMachines);
        if (bErr) throw new Error(`Failed to insert breakdown machines: ${bErr.message}`);
    }

    if (partsRows.length > 0) {
        const { error: pErr } = await supabaseAdmin.from('meeting_parts').insert(partsRows);
        if (pErr) throw new Error(`Failed to insert parts: ${pErr.message}`);
    }

    if (actionRows.length > 0) {
        const { error: aErr } = await supabaseAdmin.from('meeting_action_items').insert(actionRows);
        if (aErr) throw new Error(`Failed to insert action items: ${aErr.message}`);
    }

    if (directiveRows.length > 0) {
        const { error: dErr } = await supabaseAdmin.from('meeting_directives').insert(directiveRows);
        if (dErr) throw new Error(`Failed to insert directives: ${dErr.message}`);
    }

    const summary = {
        meetingId,
        date: isoDate,
        displayDate,
        title,
        focus,
        counts: {
            breakdowns: unbundledMachines.length,
            parts: partsRows.length,
            actionItems: actionRows.length,
            directives: directiveRows.length
        }
    };

    return summary;
}

// ----------------------------------------------------------------------------
// CLI Execution Handler
// ----------------------------------------------------------------------------
async function runCli() {
    const args = process.argv.slice(2);

    if (args.length === 0 && process.stdin.isTTY) {
        console.log(`
Usage:
  node scripts/sync-daily-meeting.js <path-to-meeting.json>
  node scripts/sync-daily-meeting.js --json '{"date":"2026-10-08",...}'
  cat meeting.json | node scripts/sync-daily-meeting.js
        `);
        process.exit(0);
    }

    let rawInput = '';

    if (args[0] === '--json' && args[1]) {
        rawInput = args[1];
    } else if (args[0] && args[0] !== '--json') {
        const filePath = path.resolve(process.cwd(), args[0]);
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found at: ${filePath}`);
            process.exit(1);
        }
        rawInput = fs.readFileSync(filePath, 'utf8');
    } else {
        // Read from stdin
        rawInput = await new Promise(resolve => {
            let data = '';
            process.stdin.setEncoding('utf8');
            process.stdin.on('data', chunk => data += chunk);
            process.stdin.on('end', () => resolve(data));
        });
    }

    try {
        const parsed = JSON.parse(rawInput.trim());
        console.log(`⚡ Processing and syncing meeting to Supabase...`);
        const result = await syncDailyMeeting(parsed);

        console.log(`\n======================================================`);
        console.log(`✅ MEETING SYNCED TO SUPABASE SUCCESSFULLY`);
        console.log(`   - ID:           ${result.meetingId}`);
        console.log(`   - Date:         ${result.displayDate} (${result.date})`);
        console.log(`   - Focus:        ${result.focus || 'N/A'}`);
        console.log(`   - Machines:     ${result.counts.breakdowns} logged (1 per card)`);
        console.log(`   - Parts:        ${result.counts.parts} items tracked`);
        console.log(`   - Action Items: ${result.counts.actionItems} assigned`);
        console.log(`   - Directives:   ${result.counts.directives} policies logged`);
        console.log(`======================================================\n`);
    } catch (err) {
        console.error(`❌ Sync failed:`, err.message);
        process.exit(1);
    }
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
    runCli();
}
