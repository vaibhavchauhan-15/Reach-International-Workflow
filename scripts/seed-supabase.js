/**
 * Reach International Operations - Supabase Seeding Script
 * 
 * Ingests all 43 meeting records, unbundles all fleet breakdowns into strictly
 * ONE MACHINE per row, computes one-line summaries, and synchronizes with Supabase.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { unbundleBreakdownEntry } from '../src/utils/breakdownNormalizer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Load environment variables from .env
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
const SUPABASE_URL = env.SUPABASE_URL || 'https://mwtfftedrtxiegawgssf.supabase.co';
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;

if (!SERVICE_KEY) {
    console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false }
});

function getMeetingFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat && stat.isDirectory()) results = results.concat(getMeetingFiles(full));
        else if (file.endsWith('.json') && !file.includes('index') && !file.includes('years') && !file.includes('search')) {
            results.push(full);
        }
    });
    return results;
}

async function seedDatabase() {
    console.log('🚀 Connecting to Supabase at:', SUPABASE_URL);

    // 1. Verify table accessibility
    const { error: testErr } = await supabase.from('meetings').select('id').limit(1);
    if (testErr) {
        if (testErr.code === 'PGRST205' || testErr.code === '42P01' || testErr.message.includes('relation') || testErr.message.includes('does not exist')) {
            console.error('\n⚠️  Supabase tables do not exist yet in public schema.');
            console.error('👉 Please run "supabase/schema.sql" in your Supabase SQL Editor:');
            console.error(`   https://supabase.com/dashboard/project/mwtfftedrtxiegawgssf/sql/new\n`);
            return false;
        }
        console.error('❌ Connection error:', testErr.message);
        return false;
    }

    let meetingsToProcess = [];
    const meetingsDir = path.join(ROOT_DIR, 'src/data/meetings');
    if (fs.existsSync(meetingsDir)) {
        const meetingFiles = getMeetingFiles(meetingsDir);
        for (const filePath of meetingFiles) {
            meetingsToProcess.push(JSON.parse(fs.readFileSync(filePath, 'utf8')));
        }
    } else {
        console.log('📦 Local JSON directory not found. Fetching meetings from Supabase public.meetings...');
        const { data: dbMeetings, error: dbErr } = await supabase.from('meetings').select('raw_json').order('date');
        if (!dbErr && dbMeetings) {
            meetingsToProcess = dbMeetings.map(m => m.raw_json).filter(Boolean);
        }
    }
    console.log(`📦 Found ${meetingsToProcess.length} meeting records to seed.\n`);

    let totalMeetings = 0;
    let totalMachines = 0;
    let totalParts = 0;
    let totalActionItems = 0;
    let totalDirectives = 0;

    for (const meeting of meetingsToProcess) {
        const meetingId = meeting.id || `meet-${meeting.date}`;

        const breakdowns = meeting.breakdowns || [];
        const parts = meeting.parts || [];
        const actionItems = meeting.actionItems || [];
        const directives = meeting.directives || [];

        // Unbundle machines into strictly 1 machine per row
        const unbundledMachines = [];
        breakdowns.forEach(b => {
            const list = unbundleBreakdownEntry(b, meeting.date);
            unbundledMachines.push(...list);
        });

        // 1. Upsert meeting master record
        const meetingRecord = {
            id: meetingId,
            date: meeting.date,
            title: meeting.title || meeting.date,
            focus: meeting.focus || null,
            is_holiday: Boolean(meeting.isHoliday),
            holiday_name: meeting.holidayName || null,
            no_meeting_held: Boolean(meeting.noMeetingHeld),
            not_recorded: Boolean(meeting.notRecorded),
            breakdowns_count: unbundledMachines.length,
            parts_count: parts.length,
            directives_count: directives.length,
            action_items_count: actionItems.length
        };

        const { error: mErr } = await supabase
            .from('meetings')
            .upsert(meetingRecord, { onConflict: 'id' });

        if (mErr) {
            console.error(`❌ Error upserting meeting ${meetingId}:`, mErr.message);
            continue;
        }
        totalMeetings++;

        // Delete existing child records for this meeting to allow clean idempotent re-seed
        await Promise.all([
            supabase.from('breakdown_machines').delete().eq('meeting_id', meetingId),
            supabase.from('meeting_parts').delete().eq('meeting_id', meetingId),
            supabase.from('meeting_action_items').delete().eq('meeting_id', meetingId),
            supabase.from('meeting_directives').delete().eq('meeting_id', meetingId)
        ]);

        // 2. Insert unbundled machine breakdown rows
        if (unbundledMachines.length > 0) {
            const machineRows = unbundledMachines.map(m => ({
                meeting_id: meetingId,
                model: m.model || m.machine_model,
                serial_number: m.serial_number,
                site: m.site || m.site_location,
                issue: m.issue || m.short_issue || m.full_issue || m.description || 'Breakdown reported.',
                action: m.action || m.short_action || m.full_action || null,
                logistics: m.logistics || m.short_logistics || m.full_logistics || null,
                clarification: m.clarification || m.short_clarification || m.full_clarification || null,
                pending_issue: m.pending_issue || m.short_pending || m.full_pending || null,
                status: m.status || m.short_status || m.full_status || 'Active Breakdown'
            }));

            const { error: bErr } = await supabase.from('breakdown_machines').insert(machineRows);
            if (bErr) console.error(`   ⚠️ Error inserting machines for ${meetingId}:`, bErr.message);
            else totalMachines += machineRows.length;
        }

        // 3. Insert parts
        if (parts.length > 0) {
            const partRows = parts.map(p => ({
                meeting_id: meetingId,
                part_name: p.part || 'Component',
                equipment_context: p.context || 'General Site',
                status_next_steps: p.statusNextSteps || 'Pending'
            }));
            const { error: pErr } = await supabase.from('meeting_parts').insert(partRows);
            if (pErr) console.error(`   ⚠️ Error inserting parts for ${meetingId}:`, pErr.message);
            else totalParts += partRows.length;
        }

        // 4. Insert action items
        if (actionItems.length > 0) {
            const actionRows = actionItems.map(a => ({
                meeting_id: meetingId,
                person: a.person || 'Unassigned',
                task: a.task || ''
            }));
            const { error: aErr } = await supabase.from('meeting_action_items').insert(actionRows);
            if (aErr) console.error(`   ⚠️ Error inserting action items for ${meetingId}:`, aErr.message);
            else totalActionItems += actionRows.length;
        }

        // 5. Insert directives
        if (directives.length > 0) {
            const directiveRows = directives.map(d => ({
                meeting_id: meetingId,
                title: d.title || 'Directive',
                points: d.points || []
            }));
            const { error: dErr } = await supabase.from('meeting_directives').insert(directiveRows);
            if (dErr) console.error(`   ⚠️ Error inserting directives for ${meetingId}:`, dErr.message);
            else totalDirectives += directiveRows.length;
        }

        process.stdout.write(`✅ [${totalMeetings}/${meetingsToProcess.length}] Seeded ${meeting.date}: ${unbundledMachines.length} machine(s)\n`);
    }

    console.log('\n======================================================');
    console.log('🎉 SUPABASE SEEDING COMPLETE');
    console.log(`   - Meetings Synced: ${totalMeetings}`);
    console.log(`   - Machines Logged (1 per row): ${totalMachines}`);
    console.log(`   - Required Parts Logged: ${totalParts}`);
    console.log(`   - Action Items Assigned: ${totalActionItems}`);
    console.log(`   - Directives Documented: ${totalDirectives}`);
    console.log('======================================================\n');
    return true;
}

seedDatabase().catch(err => {
    console.error('Fatal seeding error:', err);
    process.exit(1);
});
