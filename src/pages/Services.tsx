import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import CakePriceEstimator from "@/components/CakePriceEstimator";
import CateringQuoteForm from "@/components/CateringQuoteForm";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ServicesSection />

        {/* Cake Price Estimator */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
                Cake Price <span className="text-gradient-gold">Estimator</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Get an instant price estimate for your dream cake.
              </p>
            </motion.div>
            <CakePriceEstimator />
          </div>
        </section>

        {/* Catering Quote Form */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
                Request a <span className="text-gradient-gold">Catering Quote</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Tell us about your event and we'll get back to you with a custom quote.
              </p>
            </motion.div>
            <CateringQuoteForm />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
