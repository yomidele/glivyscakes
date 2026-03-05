
CREATE TABLE public.catering_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  event_type text NOT NULL,
  event_date date NOT NULL,
  num_guests integer NOT NULL,
  location text NOT NULL,
  budget_range text NOT NULL DEFAULT '',
  notes text DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.catering_quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert catering quotes"
  ON public.catering_quotes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can read catering quotes"
  ON public.catering_quotes FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));
