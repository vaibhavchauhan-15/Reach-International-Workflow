-- ============================================================================
-- Migration 05: meeting_action_items Table
-- Fully normalized: Eliminates duplicate date column.
-- ============================================================================

DROP TABLE IF EXISTS public.meeting_action_items CASCADE;

CREATE TABLE public.meeting_action_items (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    meeting_id TEXT NOT NULL,
    person TEXT NOT NULL,
    task TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    CONSTRAINT meeting_action_items_pkey PRIMARY KEY (id),
    CONSTRAINT meeting_action_items_meeting_id_fkey FOREIGN KEY (meeting_id) REFERENCES public.meetings(id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Fast B-Tree Indexes
CREATE INDEX IF NOT EXISTS idx_meeting_action_items_meeting_id ON public.meeting_action_items USING btree (meeting_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_meeting_action_items_person ON public.meeting_action_items USING btree (person) TABLESPACE pg_default;

-- Row Level Security (RLS)
ALTER TABLE public.meeting_action_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Action Items" ON public.meeting_action_items;
CREATE POLICY "Public Read Action Items" ON public.meeting_action_items FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Service Role All Action Items" ON public.meeting_action_items;
CREATE POLICY "Service Role All Action Items" ON public.meeting_action_items FOR ALL TO service_role USING (true) WITH CHECK (true);
