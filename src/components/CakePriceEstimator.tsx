import { useState } from "react";
import { motion } from "framer-motion";

const WA_NUMBER = "2348051306562";

const cakeTypes = ["Birthday Cake", "Wedding Cake", "Celebration Cake"];
const cakeSizes = ["6 inch", "8 inch", "10 inch", "12 inch"];
const flavors = ["Vanilla", "Chocolate", "Red Velvet", "Fruit Cake"];
const designStyles = ["Simple", "Buttercream", "Fondant", "Custom Design"];

const basePrices: Record<string, number> = {
  "Birthday Cake": 15000,
  "Wedding Cake": 35000,
  "Celebration Cake": 20000,
};

const sizeMultipliers: Record<string, number> = {
  "6 inch": 1,
  "8 inch": 1.4,
  "10 inch": 1.9,
  "12 inch": 2.5,
};

const flavorAdds: Record<string, number> = {
  Vanilla: 0,
  Chocolate: 2000,
  "Red Velvet": 5000,
  "Fruit Cake": 3000,
};

const designAdds: Record<string, number> = {
  Simple: 0,
  Buttercream: 5000,
  Fondant: 10000,
  "Custom Design": 15000,
};

const CakePriceEstimator = () => {
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [flavor, setFlavor] = useState("");
  const [design, setDesign] = useState("");

  const canEstimate = type && size && flavor && design;

  const estimatedPrice = canEstimate
    ? Math.round(
        (basePrices[type] || 0) * (sizeMultipliers[size] || 1) +
          (flavorAdds[flavor] || 0) +
          (designAdds[design] || 0)
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
            {cakeTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">Cake Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className={selectClass}>
            <option value="">Select size</option>
            {cakeSizes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">Flavor</label>
          <select value={flavor} onChange={(e) => setFlavor(e.target.value)} className={selectClass}>
            <option value="">Select flavor</option>
            {flavors.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">Design Style</label>
          <select value={design} onChange={(e) => setDesign(e.target.value)} className={selectClass}>
            <option value="">Select design</option>
            {designStyles.map((d) => <option key={d} value={d}>{d}</option>)}
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
