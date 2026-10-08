/**
 * Reach International Operations - Supabase Database Client & Repository
 * 
 * Provides high-speed querying, search, pagination, and data retrieval
 * for meetings, fleet breakdowns, spare parts, and action items.
 */

import { createClient } from '@supabase/supabase-js';

// Resolve environment variables with Vite fallback
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://mwtfftedrtxiegawgssf.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dGZmdGVkcnR4aWVnYXdnc3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyNTY4NDMsImV4cCI6MjEwNjgzMjg0M30.yF6ql4PUqURv-ahh7MHGwsdG6rvxah_lfLmSKy7fOFo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    }
});

/**
 * Fetch list of meetings from Supabase database
 * @param {Object} options - Query filters and pagination
 * @returns {Promise<Array>} List of meetings
 */
export async function fetchMeetingsFromDb({ limit = 50, offset = 0, year = null, month = null } = {}) {
    try {
        let query = supabase
            .from('meetings')
            .select('*')
            .order('date', { ascending: false })
            .range(offset, offset + limit - 1);

        if (year && month) {
            const yNum = parseInt(year, 10);
            const mNum = parseInt(month, 10);
            const pMonth = String(mNum).padStart(2, '0');
            const lastDay = new Date(yNum, mNum, 0).getDate();
            const startDate = `${yNum}-${pMonth}-01`;
            const endDate = `${yNum}-${pMonth}-${String(lastDay).padStart(2, '0')}`;
            query = query.gte('date', startDate).lte('date', endDate);
        } else if (year) {
            query = query.gte('date', `${year}-01-01`).lte('date', `${year}-12-31`);
        }

        const { data, error } = await query;
        if (error) {
            console.error('Error fetching meetings from Supabase:', error.message);
            return null;
        }
        return data;
    } catch (err) {
        console.error('Exception fetching meetings from Supabase:', err);
        return null;
    }
}

/**
 * Fetch a single meeting with full relations (breakdowns, parts, action items)
 * @param {string} meetingId - Format meet-YYYY-MM-DD or date YYYY-MM-DD
 * @returns {Promise<Object>} Meeting object
 */
export async function fetchMeetingDetailFromDb(meetingId) {
    try {
        const id = meetingId.startsWith('meet-') ? meetingId : `meet-${meetingId}`;
        const { data: meeting, error: meetErr } = await supabase
            .from('meetings')
            .select('*')
            .eq('id', id)
            .single();

        if (meetErr || !meeting) {
            console.error('Error fetching meeting from Supabase:', meetErr?.message);
            return null;
        }

        // Parallel fetch related tables
        const [machinesRes, partsRes, actionsRes, directivesRes] = await Promise.all([
            supabase.from('breakdown_machines').select('*').eq('meeting_id', id).order('created_at'),
            supabase.from('meeting_parts').select('*').eq('meeting_id', id),
            supabase.from('meeting_action_items').select('*').eq('meeting_id', id),
            supabase.from('meeting_directives').select('*').eq('meeting_id', id)
        ]);

        return {
            ...meeting,
            breakdownMachines: machinesRes.data || [],
            parts: partsRes.data || [],
            actionItems: actionsRes.data || [],
            directives: directivesRes.data || []
        };
    } catch (err) {
        console.error('Exception fetching meeting detail from Supabase:', err);
        return null;
    }
}

/**
 * Fetch unbundled single-machine breakdown rows directly from Supabase
 * @param {Object} filters - Query filters
 * @returns {Promise<Array>} List of breakdown machines
 */
export async function fetchBreakdownMachinesFromDb({
    meetingId = null,
    date = null,
    startDate = null,
    endDate = null,
    search = null,
    model = null,
    site = null,
    limit = 500,
    offset = 0
} = {}) {
    try {
        let query = supabase
            .from('breakdown_machines')
            .select('*, meetings!inner(date)')
            .order('meetings(date)', { ascending: false })
            .order('created_at', { ascending: true })
            .range(offset, offset + limit - 1);

        if (meetingId) {
            const id = meetingId.startsWith('meet-') ? meetingId : `meet-${meetingId}`;
            query = query.eq('meeting_id', id);
        }
        if (date) query = query.eq('meetings.date', date);
        if (startDate) query = query.gte('meetings.date', startDate);
        if (endDate) query = query.lte('meetings.date', endDate);
        if (model) query = query.ilike('model', `%${model}%`);
        if (site) query = query.ilike('site', `%${site}%`);
        if (search) {
            query = query.or(`issue.ilike.%${search}%,model.ilike.%${search}%,serial_number.ilike.%${search}%,site.ilike.%${search}%,action.ilike.%${search}%`);
        }

        const { data, error } = await query;
        if (error) {
            console.error('Error fetching breakdown machines from Supabase:', error.message);
            return null;
        }
        return (data || []).map(row => ({
            ...row,
            date: row.meetings?.date || row.date || '',
            model: row.model || row.machine_model || '',
            machine_model: row.model || row.machine_model || '',
            site: row.site || row.site_location || '',
            site_location: row.site || row.site_location || '',
            issue: row.issue || row.description || row.short_issue || '',
            action: row.action || row.short_action || '',
            logistics: row.logistics || row.short_logistics || '',
            clarification: row.clarification || row.short_clarification || '',
            pending_issue: row.pending_issue || row.short_pending || '',
            status: row.status || row.short_status || 'Active Breakdown'
        }));
    } catch (err) {
        console.error('Exception fetching breakdown machines from Supabase:', err);
        return null;
    }
}

/**
 * Check if Supabase connectivity is healthy and tables are present
 * @returns {Promise<boolean>}
 */
export async function checkSupabaseHealth() {
    try {
        const { count, error } = await supabase
            .from('meetings')
            .select('*', { count: 'exact', head: true });
        if (error) return false;
        return true;
    } catch {
        return false;
    }
}
