import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import { motion } from "framer-motion";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Our Work</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              OUR <span className="text-gradient-gold">GALLERY</span>
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto mb-4" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Browse our collection of beautiful cakes, delicious food, and memorable events.
            </p>
          </motion.div>
          <GalleryGrid />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
