import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GalleryGrid from "@/components/GalleryGrid";
import CakePriceEstimator from "@/components/CakePriceEstimator";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />

      {/* Cake Price Estimator */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Price Calculator</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              INSTANT <span className="text-gradient-gold">CAKE PRICING</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto" />
          </motion.div>
          <CakePriceEstimator />
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Our Work</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              OUR <span className="text-gradient-gold">GALLERY</span>
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto" />
          </motion.div>
          <GalleryGrid showFilters={false} />
          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-block border-2 border-primary text-primary px-10 py-3 font-bold text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Let's Get Started</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              READY TO MAKE YOUR EVENT <span className="text-gradient-gold">SPECIAL?</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10">
              Whether you need a stunning cake, full catering, or want to learn baking — we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/2348051306562?text=Hello%20Glivyz%20Cakes!%20I%20would%20like%20to%20book%20a%20catering%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-10 py-4 font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Book via WhatsApp
              </a>
              <Link
                to="/apply"
                className="border-2 border-primary text-primary px-10 py-4 font-bold text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Join Training
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
