-- ============================================================================
-- Migration 01: meetings Table
-- Fully normalized: Eliminates heavy duplicate raw_json column.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

DROP TABLE IF EXISTS public.meetings CASCADE;

CREATE TABLE public.meetings (
    id TEXT NOT NULL,
    date DATE NOT NULL,
    title TEXT NOT NULL,
    focus TEXT NULL,
    is_holiday BOOLEAN NOT NULL DEFAULT FALSE,
    holiday_name TEXT NULL,
    no_meeting_held BOOLEAN NOT NULL DEFAULT FALSE,
    not_recorded BOOLEAN NOT NULL DEFAULT FALSE,
    breakdowns_count INTEGER NOT NULL DEFAULT 0,
    parts_count INTEGER NOT NULL DEFAULT 0,
    directives_count INTEGER NOT NULL DEFAULT 0,
    action_items_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    CONSTRAINT meetings_pkey PRIMARY KEY (id),
    CONSTRAINT meetings_date_key UNIQUE (date)
) TABLESPACE pg_default;

-- Fast B-Tree and Full-Text GIN Indexes
CREATE INDEX IF NOT EXISTS idx_meetings_date ON public.meetings USING btree (date DESC) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_meetings_title ON public.meetings USING btree (title) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_meetings_search ON public.meetings USING gin (
    to_tsvector('english'::regconfig, ((title || ' '::text) || COALESCE(focus, ''::text)))
) TABLESPACE pg_default;

-- Automatic updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_meetings_updated_at ON public.meetings;
CREATE TRIGGER set_meetings_updated_at
    BEFORE UPDATE ON public.meetings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Row Level Security (RLS)
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Meetings" ON public.meetings;
CREATE POLICY "Public Read Meetings" ON public.meetings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Service Role All Meetings" ON public.meetings;
CREATE POLICY "Service Role All Meetings" ON public.meetings FOR ALL TO service_role USING (true) WITH CHECK (true);
