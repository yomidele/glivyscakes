import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import weddingCake from "@/assets/wedding-cake.jpg";
import smallChops from "@/assets/small-chops.jpg";
import foodTray from "@/assets/food-tray.jpg";
import lunchPacks from "@/assets/lunch-packs.jpg";
import bakingSchool from "@/assets/baking-school.jpg";
import heroBakery from "@/assets/hero-bakery.jpg";

const defaultGalleryItems = [
  { src: heroBakery, alt: "Bakery display", category: "Cakes" },
  { src: weddingCake, alt: "Wedding cake", category: "Cakes" },
  { src: smallChops, alt: "Small chops platter", category: "Catering" },
  { src: foodTray, alt: "Food tray", category: "Catering" },
  { src: lunchPacks, alt: "Lunch packs", category: "Catering" },
  { src: bakingSchool, alt: "Baking school class", category: "School" },
];

const categories = ["All", "Cakes", "Catering", "School"];

interface GalleryProps {
  items?: { src: string; alt: string; category: string }[];
  showFilters?: boolean;
}

const GalleryGrid = ({ items = defaultGalleryItems, showFilters = true }: GalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = selectedCategory === "All" ? items : items.filter((item) => item.category === selectedCategory);

  return (
    <>
      {showFilters && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs font-bold tracking-wider uppercase transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.src + idx}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="aspect-square overflow-hidden cursor-pointer group relative"
            onClick={() => setLightboxIndex(idx)}
          >
            <img src={item.src} alt={item.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors flex items-center justify-center">
              <span className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold uppercase tracking-wider">View</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4" onClick={() => setLightboxIndex(null)}>
            <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 text-foreground/80 hover:text-foreground z-10"><X size={32} /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length); }} className="absolute left-4 text-foreground/80 hover:text-foreground z-10"><ChevronLeft size={40} /></button>
            <img src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].alt} className="max-w-full max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % filtered.length); }} className="absolute right-4 text-foreground/80 hover:text-foreground z-10"><ChevronRight size={40} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryGrid;
