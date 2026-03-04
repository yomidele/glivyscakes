import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/ApplicationForm";
import { motion } from "framer-motion";
import bakingSchool from "@/assets/baking-school.jpg";

const Apply = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Apply to Our <span className="text-gradient-gold">Baking School</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Learn from experienced instructors and master the art of baking, pastry making, and cake decoration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-warm">
              <img src={bakingSchool} alt="Baking school class" className="w-full h-auto" />
              <div className="p-6 bg-card">
                <h3 className="font-heading text-lg font-semibold mb-2">Why Choose Us?</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ Hands-on practical training</li>
                  <li>✓ Professional instructors</li>
                  <li>✓ Flexible course schedules</li>
                  <li>✓ Certificate upon completion</li>
                  <li>✓ Business setup guidance</li>
                </ul>
              </div>
            </div>

            <ApplicationForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Apply;
