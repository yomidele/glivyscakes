import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GalleryGrid from "@/components/GalleryGrid";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />

      {/* Gallery Preview */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient-gold">Gallery</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              A taste of our finest creations and memorable events.
            </p>
          </motion.div>
          <GalleryGrid showFilters={false} />
          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="inline-block bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Your Event Special?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Whether you need a stunning cake, full catering, or want to learn baking — we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/2348051306562?text=Hello%20Glivyz%20Cakes!%20I%20would%20like%20to%20book%20a%20catering%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Book via WhatsApp
              </a>
              <Link
                to="/apply"
                className="bg-gold text-gold-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Join Baking School
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
