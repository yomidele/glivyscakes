import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import CakePriceEstimator from "@/components/CakePriceEstimator";
import CateringQuoteForm from "@/components/CateringQuoteForm";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <ServicesSection />

        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Price Calculator</p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
                CAKE PRICE <span className="text-gradient-gold">ESTIMATOR</span>
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto" />
            </motion.div>
            <CakePriceEstimator />
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Events & Parties</p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
                REQUEST A <span className="text-gradient-gold">CATERING QUOTE</span>
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto" />
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
