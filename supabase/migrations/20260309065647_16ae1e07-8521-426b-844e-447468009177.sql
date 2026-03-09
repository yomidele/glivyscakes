
-- Reviews table for live customer reviews
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name text NOT NULL,
  rating integer NOT NULL,
  review_text text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can delete reviews" ON public.reviews FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Cake prices table for admin-editable pricing
CREATE TABLE public.cake_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  price_key text NOT NULL UNIQUE,
  price_label text NOT NULL DEFAULT '',
  price_value numeric NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'base',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.cake_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read cake_prices" ON public.cake_prices FOR SELECT USING (true);
CREATE POLICY "Admin can insert cake_prices" ON public.cake_prices FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin can update cake_prices" ON public.cake_prices FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admin can delete cake_prices" ON public.cake_prices FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed default cake prices
INSERT INTO public.cake_prices (price_key, price_label, price_value, category) VALUES
  ('base_birthday', 'Birthday Cake', 15000, 'base'),
  ('base_wedding', 'Wedding Cake', 35000, 'base'),
  ('base_celebration', 'Celebration Cake', 20000, 'base'),
  ('size_6', '6 inch', 1, 'size'),
  ('size_8', '8 inch', 1.4, 'size'),
  ('size_10', '10 inch', 1.9, 'size'),
  ('size_12', '12 inch', 2.5, 'size'),
  ('flavor_vanilla', 'Vanilla', 0, 'flavor'),
  ('flavor_chocolate', 'Chocolate', 2000, 'flavor'),
  ('flavor_redvelvet', 'Red Velvet', 5000, 'flavor'),
  ('flavor_fruitcake', 'Fruit Cake', 3000, 'flavor'),
  ('design_simple', 'Simple', 0, 'design'),
  ('design_buttercream', 'Buttercream', 5000, 'design'),
  ('design_fondant', 'Fondant', 10000, 'design'),
  ('design_custom', 'Custom Design', 15000, 'design');
