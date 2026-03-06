import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/ApplicationForm";
import { motion } from "framer-motion";
import bakingSchool from "@/assets/baking-school.jpg";

const Apply = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">Learn & Grow</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              JOIN OUR <span className="text-gradient-gold">TRAINING</span>
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto mb-4" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Learn from experienced instructors and master the art of baking, pastry making, and cake decoration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div className="overflow-hidden border border-border">
              <img src={bakingSchool} alt="Training class" className="w-full h-auto" />
              <div className="p-6 bg-card">
                <h3 className="font-heading text-lg font-bold mb-3 uppercase tracking-wider">Why Choose Us?</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2"><span className="text-primary">✓</span> Hands-on practical training</li>
                  <li className="flex items-center gap-2"><span className="text-primary">✓</span> Professional instructors</li>
                  <li className="flex items-center gap-2"><span className="text-primary">✓</span> Flexible course schedules</li>
                  <li className="flex items-center gap-2"><span className="text-primary">✓</span> Certificate upon completion</li>
                  <li className="flex items-center gap-2"><span className="text-primary">✓</span> Business setup guidance</li>
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
