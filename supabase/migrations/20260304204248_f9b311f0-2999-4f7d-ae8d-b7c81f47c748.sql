
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT NOT NULL,
  start_date DATE NOT NULL,
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON public.applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON public.applications FOR SELECT TO authenticated USING (true);

CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Cakes',
  image_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read gallery" ON public.gallery FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow authenticated insert gallery" ON public.gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated delete gallery" ON public.gallery FOR DELETE TO authenticated USING (true);
