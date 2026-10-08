-- ============================================================================
-- REACH INTERNATIONAL WORKFLOW - SUPABASE DATABASE SCHEMA
-- Purpose: Highly optimized schema for daily meeting records, fleet breakdowns,
--          spare parts requisitions, directives, and delegated action items.
-- Designed for: Blazing fast search, reads, writes, cascade deletes, and Excel exports.
-- ============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. Meetings Master Table
CREATE TABLE IF NOT EXISTS public.meetings (
    id TEXT PRIMARY KEY,                           -- Format: meet-YYYY-MM-DD
    date DATE NOT NULL UNIQUE,                     -- YYYY-MM-DD
    title TEXT NOT NULL,                          -- e.g. "06 Oct 2026"
    focus TEXT,                                   -- Agenda and focus overview
    is_holiday BOOLEAN NOT NULL DEFAULT FALSE,
    holiday_name TEXT,
    no_meeting_held BOOLEAN NOT NULL DEFAULT FALSE,
    not_recorded BOOLEAN NOT NULL DEFAULT FALSE,
    breakdowns_count INTEGER NOT NULL DEFAULT 0,
    parts_count INTEGER NOT NULL DEFAULT 0,
    directives_count INTEGER NOT NULL DEFAULT 0,
    action_items_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Fleet Breakdown Machines Table
-- Strictly ONE MACHINE per row (multi-machine entries unbundled into individual rows)
-- Discrete normalized columns: issue, action, logistics, clarification, pending_issue, status
CREATE TABLE IF NOT EXISTS public.breakdown_machines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meeting_id TEXT NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
    model TEXT NOT NULL,                           -- e.g. "Genie GS-5390 RT", "JCB 45ft Scissor Lift"
    serial_number TEXT NOT NULL,                   -- e.g. "S539014-1234", "6228", or "N/A"
    site TEXT NOT NULL,                            -- e.g. "Bhiwadi Site", "Mundra Project Depot"
    issue TEXT NOT NULL,                           -- Specific defect / malfunction
    action TEXT,                                   -- Assigned action & technician tasks
    logistics TEXT,                                -- Logistics, transit & parts dispatch
    clarification TEXT,                            -- Operating context, billing or client notes
    pending_issue TEXT,                            -- Immediate next operational blockers
    status TEXT,                                   -- Machine breakdown lifecycle status
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 4. Spare Parts Tracker Table
CREATE TABLE IF NOT EXISTS public.meeting_parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meeting_id TEXT NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
    part_name TEXT NOT NULL,
    equipment_context TEXT,
    status_next_steps TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 5. Action Items & Accountability Table
CREATE TABLE IF NOT EXISTS public.meeting_action_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meeting_id TEXT NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
    person TEXT NOT NULL,
    task TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 6. Directives Table
CREATE TABLE IF NOT EXISTS public.meeting_directives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meeting_id TEXT NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    points JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================================================
-- PERFORMANCE INDEXES (Optimized for Fast Search, Range Reads & Cascade Deletes)
-- ============================================================================

-- Meetings Indexes
CREATE INDEX IF NOT EXISTS idx_meetings_date ON public.meetings(date DESC);
CREATE INDEX IF NOT EXISTS idx_meetings_title ON public.meetings(title);
CREATE INDEX IF NOT EXISTS idx_meetings_search ON public.meetings USING gin(to_tsvector('english', title || ' ' || COALESCE(focus, '')));

-- Breakdown Machines Indexes (High-Speed Filtering & Trigram Text Search)
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_meeting_id ON public.breakdown_machines(meeting_id);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_model ON public.breakdown_machines(model);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_serial ON public.breakdown_machines(serial_number);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_site ON public.breakdown_machines(site);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_status ON public.breakdown_machines(status);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_issue_trgm ON public.breakdown_machines USING gin(issue gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_model_trgm ON public.breakdown_machines USING gin(model gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_site_trgm ON public.breakdown_machines USING gin(site gin_trgm_ops);

-- Parts & Action Items Indexes
CREATE INDEX IF NOT EXISTS idx_meeting_parts_meeting_id ON public.meeting_parts(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_action_items_meeting_id ON public.meeting_action_items(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_action_items_person ON public.meeting_action_items(person);
CREATE INDEX IF NOT EXISTS idx_meeting_directives_meeting_id ON public.meeting_directives(meeting_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breakdown_machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_action_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_directives ENABLE ROW LEVEL SECURITY;

-- Anonymous & Authenticated read-only access for frontend application
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public Read Meetings" ON public.meetings;
    CREATE POLICY "Public Read Meetings" ON public.meetings FOR SELECT TO anon, authenticated USING (true);

    DROP POLICY IF EXISTS "Public Read Breakdown Machines" ON public.breakdown_machines;
    CREATE POLICY "Public Read Breakdown Machines" ON public.breakdown_machines FOR SELECT TO anon, authenticated USING (true);

    DROP POLICY IF EXISTS "Public Read Parts" ON public.meeting_parts;
    CREATE POLICY "Public Read Parts" ON public.meeting_parts FOR SELECT TO anon, authenticated USING (true);

    DROP POLICY IF EXISTS "Public Read Action Items" ON public.meeting_action_items;
    CREATE POLICY "Public Read Action Items" ON public.meeting_action_items FOR SELECT TO anon, authenticated USING (true);

    DROP POLICY IF EXISTS "Public Read Directives" ON public.meeting_directives;
    CREATE POLICY "Public Read Directives" ON public.meeting_directives FOR SELECT TO anon, authenticated USING (true);

    -- Service role full administrative read, insert, update, delete
    DROP POLICY IF EXISTS "Service Role All Meetings" ON public.meetings;
    CREATE POLICY "Service Role All Meetings" ON public.meetings FOR ALL TO service_role USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Service Role All Breakdown Machines" ON public.breakdown_machines;
    CREATE POLICY "Service Role All Breakdown Machines" ON public.breakdown_machines FOR ALL TO service_role USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Service Role All Parts" ON public.meeting_parts;
    CREATE POLICY "Service Role All Parts" ON public.meeting_parts FOR ALL TO service_role USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Service Role All Action Items" ON public.meeting_action_items;
    CREATE POLICY "Service Role All Action Items" ON public.meeting_action_items FOR ALL TO service_role USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Service Role All Directives" ON public.meeting_directives;
    CREATE POLICY "Service Role All Directives" ON public.meeting_directives FOR ALL TO service_role USING (true) WITH CHECK (true);
END $$;

-- Automatic updated_at timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_meetings_updated_at ON public.meetings;
CREATE TRIGGER set_meetings_updated_at
    BEFORE UPDATE ON public.meetings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
