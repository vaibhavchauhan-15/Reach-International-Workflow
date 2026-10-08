/**
 * Reach International Operations - Supabase Meeting Data Service
 * 
 * Replaces all static JSON files with live queries to Supabase.
 * Powers the meeting summaries dashboard, search, month navigation,
 * and individual meeting detail modal directly from the database.
 */

import { supabase } from '../lib/supabaseClient.js';
import { 
    formatDateDDMMYYYY, 
    normalizeDateToYYYYMMDD, 
    generateAllDateVariations 
} from './meetingUtils.js';

export { searchMeetings, getChronologicalNavigation } from './meetingUtils.js';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// In-memory cache for ultra-fast UI rendering
let cachedYearsData = null;
let cachedSearchIndex = null;
const cachedMeetingDetails = new Map();

/**
 * Normalizes a raw Supabase meeting row into the standard meeting summary shape
 */
function normalizeMeetingRow(row) {
    if (!row) return null;
    const dateStr = row.date;
    const displayDate = formatDateDDMMYYYY(dateStr);

    return {
        id: row.id || `meet-${dateStr}`,
        date: dateStr,
        dateDisplay: displayDate,
        dateFormatted: displayDate,
        title: row.title || displayDate,
        focus: row.focus || '',
        isHoliday: Boolean(row.is_holiday),
        holidayName: row.holiday_name || '',
        noMeetingHeld: Boolean(row.no_meeting_held),
        notRecorded: Boolean(row.not_recorded),
        breakdownCount: row.breakdowns_count || 0,
        partsCount: row.parts_count || 0,
        directivesCount: row.directives_count || 0,
        actionItemsCount: row.action_items_count || 0,
        raw_json: row.raw_json || null
    };
}

/**
 * Fetch the global years index containing year tree, month counts, and chronological sequence.
 * Directly queried and constructed from Supabase.
 */
export async function fetchYearsIndex() {
    if (cachedYearsData) {
        return cachedYearsData;
    }

    try {
        const { data: rows, error } = await supabase
            .from('meetings')
            .select('id, date, title, focus, is_holiday, holiday_name, no_meeting_held, not_recorded, breakdowns_count, parts_count, directives_count, action_items_count')
            .order('date', { ascending: true });

        if (error) {
            console.error('Error fetching meetings from Supabase:', error.message);
            throw error;
        }

        if (!rows || rows.length === 0) {
            return {
                years: [],
                totalMeetings: 0,
                latestYear: '2026',
                latestMonth: '10',
                latestMeetingId: null,
                chronologicalSequence: []
            };
        }

        // Build chronological sequence (ascending)
        const chronologicalSequence = rows.map(r => normalizeMeetingRow(r));

        // Group into years and months
        const yearMap = new Map();

        rows.forEach(r => {
            const dateParts = r.date.split('-');
            const yearStr = dateParts[0];
            const monthStr = dateParts[1];

            if (!yearMap.has(yearStr)) {
                yearMap.set(yearStr, new Map());
            }

            const monthMap = yearMap.get(yearStr);
            if (!monthMap.has(monthStr)) {
                monthMap.set(monthStr, {
                    month: monthStr,
                    name: MONTH_NAMES[parseInt(monthStr, 10) - 1] || 'Unknown',
                    meetingCount: 0,
                    latestMeetingDate: r.date
                });
            }

            const monthEntry = monthMap.get(monthStr);
            monthEntry.meetingCount++;
            if (r.date > monthEntry.latestMeetingDate) {
                monthEntry.latestMeetingDate = r.date;
            }
        });

        // Convert to hierarchical structure sorted descending
        const yearsArray = Array.from(yearMap.entries())
            .map(([year, monthsMap]) => {
                const months = Array.from(monthsMap.values()).sort((a, b) => b.month.localeCompare(a.month));
                const totalYearMeetings = months.reduce((acc, m) => acc + m.meetingCount, 0);
                return {
                    year,
                    meetingCount: totalYearMeetings,
                    months
                };
            })
            .sort((a, b) => b.year.localeCompare(a.year));

        const latestMeeting = chronologicalSequence[chronologicalSequence.length - 1];
        const latestDateParts = latestMeeting?.date ? latestMeeting.date.split('-') : ['2026', '10'];

        cachedYearsData = {
            years: yearsArray,
            totalMeetings: chronologicalSequence.length,
            latestYear: latestDateParts[0],
            latestMonth: latestDateParts[1],
            latestMeetingId: latestMeeting?.id || null,
            chronologicalSequence
        };

        return cachedYearsData;
    } catch (err) {
        console.error('fetchYearsIndex failed:', err);
        throw err;
    }
}

/**
 * Fetch a specific month's meeting index from Supabase.
 * @param {string|number} year e.g. "2026"
 * @param {string|number} month e.g. "09" or "9"
 */
export async function fetchMonthIndex(year, month) {
    const yearStr = String(year);
    const paddedMonth = String(month).padStart(2, '0');
    const yearNum = parseInt(yearStr, 10);
    const monthNum = parseInt(paddedMonth, 10);
    const lastDay = new Date(yearNum, monthNum, 0).getDate();

    const startDate = `${yearStr}-${paddedMonth}-01`;
    const endDate = `${yearStr}-${paddedMonth}-${String(lastDay).padStart(2, '0')}`;

    try {
        const { data: rows, error } = await supabase
            .from('meetings')
            .select('id, date, title, focus, is_holiday, holiday_name, no_meeting_held, not_recorded, breakdowns_count, parts_count, directives_count, action_items_count')
            .gte('date', startDate)
            .lte('date', endDate)
            .order('date', { ascending: false });

        if (error) {
            console.error(`Error fetching month index for ${yearStr}-${paddedMonth}:`, error.message);
            throw error;
        }

        const meetings = (rows || []).map(r => normalizeMeetingRow(r));
        const monthInt = parseInt(paddedMonth, 10);
        const monthName = MONTH_NAMES[monthInt - 1] || 'Unknown';

        return {
            year: yearStr,
            month: paddedMonth,
            monthName,
            meetingCount: meetings.length,
            meetings
        };
    } catch (err) {
        console.error(`fetchMonthIndex failed for ${yearStr}/${paddedMonth}:`, err);
        throw err;
    }
}

/**
 * Fetch an individual daily meeting document on-demand from Supabase.
 * Accepts: "2026-10-06", "06-10-2026", "meet-2026-10-06", etc.
 * @param {string} pathOrDate
 */
export async function fetchMeetingDetail(pathOrDate) {
    if (!pathOrDate) throw new Error("Meeting identifier or date required");

    let isoDate = '';
    const cleanId = String(pathOrDate).replace(/^\/data\/meetings\//, '').replace(/\.json$/, '');
    
    if (cleanId.startsWith('meet-')) {
        isoDate = cleanId.replace('meet-', '');
    } else {
        const pathMatch = cleanId.match(/(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
        if (pathMatch) {
            isoDate = `${pathMatch[1]}-${pathMatch[2].padStart(2, '0')}-${pathMatch[3].padStart(2, '0')}`;
        } else {
            isoDate = normalizeDateToYYYYMMDD(cleanId);
        }
    }

    if (!isoDate || !isoDate.includes('-')) {
        throw new Error(`Invalid meeting date identifier: ${pathOrDate}`);
    }

    const meetingId = `meet-${isoDate}`;

    // Return from in-memory cache if available
    if (cachedMeetingDetails.has(meetingId)) {
        return cachedMeetingDetails.get(meetingId);
    }

    try {
        const { data: row, error } = await supabase
            .from('meetings')
            .select('*')
            .or(`id.eq.${meetingId},date.eq.${isoDate}`)
            .single();

        if (error || !row) {
            console.error(`Error fetching meeting detail from Supabase for ${meetingId}:`, error?.message);
            throw new Error(`Meeting document not found for ${pathOrDate}`);
        }

        let meetingObject = null;

        // If raw_json is preserved in Supabase, return complete structure
        if (row.raw_json && typeof row.raw_json === 'object') {
            meetingObject = { ...row.raw_json };
        } else {
            // Reconstruct meeting object from child tables
            const [bRes, pRes, aRes, dRes] = await Promise.all([
                supabase.from('breakdown_machines').select('*').eq('meeting_id', meetingId).order('created_at'),
                supabase.from('meeting_parts').select('*').eq('meeting_id', meetingId),
                supabase.from('meeting_action_items').select('*').eq('meeting_id', meetingId),
                supabase.from('meeting_directives').select('*').eq('meeting_id', meetingId)
            ]);

            meetingObject = {
                id: meetingId,
                date: row.date,
                title: row.title || formatDateDDMMYYYY(row.date),
                focus: row.focus || '',
                isHoliday: Boolean(row.is_holiday),
                holidayName: row.holiday_name || '',
                noMeetingHeld: Boolean(row.no_meeting_held),
                notRecorded: Boolean(row.not_recorded),
                breakdowns: (bRes.data || []).map(b => ({
                    site: b.site || b.site_location || '',
                    model: b.model || b.machine_model || '',
                    serialNumber: b.serial_number || '',
                    location: b.site || b.site_location || '',
                    issue: b.issue || b.description || b.short_summary || b.full_issue || b.short_issue || '',
                    action: b.action || b.full_action || b.short_action || '',
                    logistics: b.logistics || b.full_logistics || b.short_logistics || '',
                    clarification: b.clarification || b.full_clarification || b.short_clarification || '',
                    status: b.status || b.full_status || b.short_status || '',
                    pendingIssue: b.pending_issue || b.full_pending || b.short_pending || ''
                })),
                parts: (pRes.data || []).map(p => ({
                    part: p.part_name,
                    context: p.equipment_context,
                    statusNextSteps: p.status_next_steps
                })),
                directives: (dRes.data || []).map(d => ({
                    title: d.title,
                    points: d.points || []
                })),
                actionItems: (aRes.data || []).map(a => ({
                    person: a.person,
                    task: a.task
                }))
            };
        }

        // Ensure formatted date fields are present
        const displayDate = formatDateDDMMYYYY(meetingObject.date || isoDate);
        meetingObject.id = meetingId;
        meetingObject.date = isoDate;
        meetingObject.dateDisplay = displayDate;
        meetingObject.dateFormatted = displayDate;
        if (!meetingObject.title) meetingObject.title = displayDate;

        cachedMeetingDetails.set(meetingId, meetingObject);
        return meetingObject;
    } catch (err) {
        console.error(`fetchMeetingDetail failed for ${pathOrDate}:`, err);
        throw err;
    }
}

/**
 * Fetch the global search index dynamically built from Supabase.
 */
export async function fetchSearchIndex() {
    if (cachedSearchIndex) {
        return cachedSearchIndex;
    }

    try {
        const { data: rows, error } = await supabase
            .from('meetings')
            .select(`
                id, date, title, focus, is_holiday, holiday_name, no_meeting_held, not_recorded, 
                breakdowns_count, parts_count, directives_count, action_items_count,
                breakdown_machines(site),
                meeting_parts(part_name, equipment_context),
                meeting_action_items(person)
            `)
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching search index from Supabase:', error.message);
            throw error;
        }

        cachedSearchIndex = (rows || []).map(row => {
            const raw = row.raw_json || {};
            const displayDate = formatDateDDMMYYYY(row.date);
            const dateVars = generateAllDateVariations(row.date);

            const sites = [];
            const people = [];
            const parts = [];

            const breakdownsList = Array.isArray(raw.breakdowns) ? raw.breakdowns : (row.breakdown_machines || []);
            const partsList = Array.isArray(raw.parts) ? raw.parts : (row.meeting_parts || []);
            const actionItemsList = Array.isArray(raw.actionItems) ? raw.actionItems : (row.meeting_action_items || []);

            breakdownsList.forEach(b => {
                if (b.site) sites.push(b.site);
                if (b.location) sites.push(b.location);
            });
            partsList.forEach(p => {
                if (p.part) parts.push(p.part);
                if (p.part_name) parts.push(p.part_name);
                if (p.context) sites.push(p.context);
                if (p.equipment_context) sites.push(p.equipment_context);
            });
            actionItemsList.forEach(a => {
                if (a.person) people.push(a.person);
            });

            return {
                id: row.id,
                date: row.date,
                dateDisplay: displayDate,
                dateFormatted: displayDate,
                title: row.title || displayDate,
                focus: row.focus || '',
                isHoliday: Boolean(row.is_holiday),
                holidayName: row.holiday_name || '',
                noMeetingHeld: Boolean(row.no_meeting_held),
                notRecorded: Boolean(row.not_recorded),
                breakdownCount: row.breakdowns_count || 0,
                partsCount: row.parts_count || 0,
                directivesCount: row.directives_count || 0,
                actionItemsCount: row.action_items_count || 0,
                keywords: [row.focus, ...sites, ...people, ...parts].filter(Boolean).join(' '),
                sites: Array.from(new Set(sites)).slice(0, 15),
                people: Array.from(new Set(people)),
                parts: Array.from(new Set(parts)).slice(0, 15),
                dateVariations: dateVars
            };
        });

        return cachedSearchIndex;
    } catch (err) {
        console.error('fetchSearchIndex failed:', err);
        throw err;
    }
}
