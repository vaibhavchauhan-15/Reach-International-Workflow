-- ============================================================================
-- Migration 02: breakdown_machines Table
-- Fully normalized: Strictly 1 machine per row, no duplicate date column.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

DROP TABLE IF EXISTS public.breakdown_machines CASCADE;

CREATE TABLE public.breakdown_machines (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    meeting_id TEXT NOT NULL,
    model TEXT NOT NULL,
    serial_number TEXT NOT NULL,
    site TEXT NOT NULL,
    issue TEXT NOT NULL,
    action TEXT NULL,
    logistics TEXT NULL,
    clarification TEXT NULL,
    pending_issue TEXT NULL,
    status TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    CONSTRAINT breakdown_machines_pkey PRIMARY KEY (id),
    CONSTRAINT breakdown_machines_meeting_id_fkey FOREIGN KEY (meeting_id) REFERENCES public.meetings(id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Fast B-Tree and GIN Trigram Search Indexes
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_meeting_id ON public.breakdown_machines USING btree (meeting_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_model ON public.breakdown_machines USING btree (model) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_serial ON public.breakdown_machines USING btree (serial_number) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_site ON public.breakdown_machines USING btree (site) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_status ON public.breakdown_machines USING btree (status) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_issue_trgm ON public.breakdown_machines USING gin (issue gin_trgm_ops) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_model_trgm ON public.breakdown_machines USING gin (model gin_trgm_ops) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_breakdown_machines_site_trgm ON public.breakdown_machines USING gin (site gin_trgm_ops) TABLESPACE pg_default;

-- Row Level Security (RLS)
ALTER TABLE public.breakdown_machines ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Breakdown Machines" ON public.breakdown_machines;
CREATE POLICY "Public Read Breakdown Machines" ON public.breakdown_machines FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Service Role All Breakdown Machines" ON public.breakdown_machines;
CREATE POLICY "Service Role All Breakdown Machines" ON public.breakdown_machines FOR ALL TO service_role USING (true) WITH CHECK (true);
