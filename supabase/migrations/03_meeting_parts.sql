-- ============================================================================
-- Migration 03: meeting_parts Table
-- Fully normalized: Eliminates duplicate date column.
-- ============================================================================

DROP TABLE IF EXISTS public.meeting_parts CASCADE;

CREATE TABLE public.meeting_parts (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    meeting_id TEXT NOT NULL,
    part_name TEXT NOT NULL,
    equipment_context TEXT NULL,
    status_next_steps TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    CONSTRAINT meeting_parts_pkey PRIMARY KEY (id),
    CONSTRAINT meeting_parts_meeting_id_fkey FOREIGN KEY (meeting_id) REFERENCES public.meetings(id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Fast B-Tree Indexes
CREATE INDEX IF NOT EXISTS idx_meeting_parts_meeting_id ON public.meeting_parts USING btree (meeting_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_meeting_parts_part_name ON public.meeting_parts USING btree (part_name) TABLESPACE pg_default;

-- Row Level Security (RLS)
ALTER TABLE public.meeting_parts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Parts" ON public.meeting_parts;
CREATE POLICY "Public Read Parts" ON public.meeting_parts FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Service Role All Parts" ON public.meeting_parts;
CREATE POLICY "Service Role All Parts" ON public.meeting_parts FOR ALL TO service_role USING (true) WITH CHECK (true);
