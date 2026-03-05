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
    "w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition-shadow";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-8 shadow-warm"
    >
      <h3 className="font-heading text-2xl font-bold mb-1 text-center">
        Cake Price <span className="text-gradient-gold">Estimator</span>
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Get an instant estimate for your dream cake
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Cake Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
            <option value="">Select type</option>
            {cakeTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Cake Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} className={selectClass}>
            <option value="">Select size</option>
            {cakeSizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Flavor</label>
          <select value={flavor} onChange={(e) => setFlavor(e.target.value)} className={selectClass}>
            <option value="">Select flavor</option>
            {flavors.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Design Style</label>
          <select value={design} onChange={(e) => setDesign(e.target.value)} className={selectClass}>
            <option value="">Select design</option>
            {designStyles.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {canEstimate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-muted-foreground text-sm mb-1">Estimated Price</p>
          <p className="font-heading text-3xl font-bold text-primary">
            ₦{estimatedPrice.toLocaleString()}
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(orderMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order This Cake on WhatsApp
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CakePriceEstimator;
