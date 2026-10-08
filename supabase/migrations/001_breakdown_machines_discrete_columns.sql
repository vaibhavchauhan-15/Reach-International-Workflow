-- ============================================================================
-- Migration: Discrete Breakdown Columns (issue, action, logistics, clarification, pending_issue, status)
-- Description: Removes combined description column and establishes discrete fields.
-- Date: 2026-10-06
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Ensure public.meetings exists
CREATE TABLE IF NOT EXISTS public.meetings (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    title TEXT NOT NULL,
    focus TEXT,
    is_holiday BOOLEAN NOT NULL DEFAULT FALSE,
    holiday_name TEXT,
    no_meeting_held BOOLEAN NOT NULL DEFAULT FALSE,
    not_recorded BOOLEAN NOT NULL DEFAULT FALSE,
    breakdowns_count INTEGER NOT NULL DEFAULT 0,
    parts_count INTEGER NOT NULL DEFAULT 0,
    directives_count INTEGER NOT NULL DEFAULT 0,
    action_items_count INTEGER NOT NULL DEFAULT 0,
    raw_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Cleanly recreate breakdown_machines with discrete columns
DROP TABLE IF EXISTS public.breakdown_machines CASCADE;

CREATE TABLE public.breakdown_machines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meeting_id TEXT NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    model TEXT NOT NULL,
    serial_number TEXT NOT NULL,
    site TEXT NOT NULL,
    issue TEXT NOT NULL,
    action TEXT,
    logistics TEXT,
    clarification TEXT,
    pending_issue TEXT,
    status TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Optimized B-Tree & Trigram Indexes
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_date ON public.breakdown_machines(date DESC);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_meeting_id ON public.breakdown_machines(meeting_id);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_model ON public.breakdown_machines(model);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_serial ON public.breakdown_machines(serial_number);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_site ON public.breakdown_machines(site);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_status ON public.breakdown_machines(status);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_date_model ON public.breakdown_machines(date DESC, model);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_date_site ON public.breakdown_machines(date DESC, site);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_issue_trgm ON public.breakdown_machines USING gin(issue gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_model_trgm ON public.breakdown_machines USING gin(model gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_site_trgm ON public.breakdown_machines USING gin(site gin_trgm_ops);

-- 4. Row Level Security Policies
ALTER TABLE public.breakdown_machines ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Breakdown Machines" ON public.breakdown_machines;
CREATE POLICY "Public Read Breakdown Machines" ON public.breakdown_machines FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Service Role All Breakdown Machines" ON public.breakdown_machines;
CREATE POLICY "Service Role All Breakdown Machines" ON public.breakdown_machines FOR ALL TO service_role USING (true) WITH CHECK (true);
