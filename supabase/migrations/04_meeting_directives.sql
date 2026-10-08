-- ============================================================================
-- Migration 04: meeting_directives Table
-- Fully normalized: Eliminates duplicate date column.
-- ============================================================================

DROP TABLE IF EXISTS public.meeting_directives CASCADE;

CREATE TABLE public.meeting_directives (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    meeting_id TEXT NOT NULL,
    title TEXT NOT NULL,
    points JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    CONSTRAINT meeting_directives_pkey PRIMARY KEY (id),
    CONSTRAINT meeting_directives_meeting_id_fkey FOREIGN KEY (meeting_id) REFERENCES public.meetings(id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Fast B-Tree Indexes
CREATE INDEX IF NOT EXISTS idx_meeting_directives_meeting_id ON public.meeting_directives USING btree (meeting_id) TABLESPACE pg_default;

-- Row Level Security (RLS)
ALTER TABLE public.meeting_directives ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Directives" ON public.meeting_directives;
CREATE POLICY "Public Read Directives" ON public.meeting_directives FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Service Role All Directives" ON public.meeting_directives;
CREATE POLICY "Service Role All Directives" ON public.meeting_directives FOR ALL TO service_role USING (true) WITH CHECK (true);
