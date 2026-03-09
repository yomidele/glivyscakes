import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const WA_NUMBER = "2348051306562";

interface PriceItem {
  price_key: string;
  price_label: string;
  price_value: number;
  category: string;
}

const CakePriceEstimator = () => {
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [flavor, setFlavor] = useState("");
  const [design, setDesign] = useState("");
  const [prices, setPrices] = useState<PriceItem[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const { data } = await supabase.from("cake_prices").select("price_key, price_label, price_value, category");
      if (data) setPrices(data as PriceItem[]);
    };
    fetchPrices();
  }, []);

  const getByCategory = (cat: string) => prices.filter((p) => p.category === cat);
  const getPrice = (label: string, cat: string) => {
    const item = prices.find((p) => p.category === cat && p.price_label === label);
    return item ? Number(item.price_value) : 0;
  };

  const baseItems = getByCategory("base");
  const sizeItems = getByCategory("size");
  const flavorItems = getByCategory("flavor");
  const designItems = getByCategory("design");

  const canEstimate = type && size && flavor && design;

  const estimatedPrice = canEstimate
    ? Math.round(
        getPrice(type, "base") * getPrice(size, "size") +
          getPrice(flavor, "flavor") +
          getPrice(design, "design")
      )
    : 0;

  const orderMessage = `Hello Glivyz Cakes! I would like to order a cake:\n\nCake Type: ${type}\nSize: ${size}\nFlavor: ${flavor}\nDesign: ${design}\nEstimated Price: ₦${estimatedPrice.toLocaleString()}\n\nPlease confirm availability.`;

  const selectClass =
    "w-full px-4 py-3 bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none transition-all text-sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-xl mx-auto bg-card border border-border p-8"
    >
      <h3 className="font-heading text-2xl font-bold mb-1 text-center">
        CAKE PRICE <span className="text-gradient-gold">ESTIMATOR</span>
      </h3>
      <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">Cake Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
            <option value="">Select type</option>
            {baseItems.map((t) => <option key={t.price_key} value={t.price_label}>{t.price_label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">Cake Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className={selectClass}>
            <option value="">Select size</option>
            {sizeItems.map((s) => <option key={s.price_key} value={s.price_label}>{s.price_label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">Flavor</label>
          <select value={flavor} onChange={(e) => setFlavor(e.target.value)} className={selectClass}>
            <option value="">Select flavor</option>
            {flavorItems.map((f) => <option key={f.price_key} value={f.price_label}>{f.price_label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">Design Style</label>
          <select value={design} onChange={(e) => setDesign(e.target.value)} className={selectClass}>
            <option value="">Select design</option>
            {designItems.map((d) => <option key={d.price_key} value={d.price_label}>{d.price_label}</option>)}
          </select>
        </div>
      </div>

      {canEstimate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 text-center border-t border-border pt-6"
        >
          <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">Estimated Price</p>
          <p className="font-heading text-4xl font-bold text-primary">
            ₦{estimatedPrice.toLocaleString()}
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(orderMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Order This Cake on WhatsApp
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CakePriceEstimator;
