import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Award, Users, Star, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bakery.jpg";

const WA_NUMBER = "2348051306562";

const bookingOptions = [
  {
    label: "Book Baking Service",
    message: "Hello, I would like to book your baking service from Glivyz Cakes and Events.",
  },
  {
    label: "Book Catering Service",
    message: "Hello, I would like to book your catering service from Glivyz Cakes and Events.",
  },
];

const stats = [
  { icon: Award, value: "500+", label: "CAKES DELIVERED" },
  { icon: Users, value: "25+", label: "TRAINED STUDENTS" },
  { icon: Star, value: "4.9", label: "CUSTOMER RATING" },
  { icon: Clock, value: "5+", label: "YEARS EXPERIENCE" },
];

const HeroSection = () => {
  const [showBookMenu, setShowBookMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowBookMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <section className="hero-section no-theme relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-4"
            >
              Welcome to
            </motion.p>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-2 leading-none">
              GLIVYZ CAKES
            </h1>
            <h2 className="font-heading text-2xl md:text-4xl italic text-primary mb-6">
              & Events
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Premium bakery, catering services & professional training in Lagos, Nigeria. 
              Making every celebration unforgettable with passion and flavor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                <button
                  onClick={() => setShowBookMenu(!showBookMenu)}
                  className="bg-primary text-primary-foreground px-10 py-4 text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Book Service
                  <ChevronDown size={16} className={`transition-transform ${showBookMenu ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showBookMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto mt-2 w-full sm:w-64 bg-card border border-border overflow-hidden z-50"
                    >
                      {bookingOptions.map((opt) => (
                        <a
                          key={opt.label}
                          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(opt.message)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowBookMenu(false)}
                          className="block px-5 py-3.5 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {opt.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link
                to="/apply"
                className="border-2 border-primary text-primary px-10 py-4 text-sm font-bold tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition-all inline-flex items-center justify-center w-full sm:w-auto"
              >
                Join Training
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 -mt-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border grid grid-cols-2 md:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-center gap-3 px-6 py-6 ${
                  i < stats.length - 1 ? "border-r border-border" : ""
                }`}
              >
                <stat.icon size={24} className="text-primary shrink-0" />
                <div>
                  <p className="font-heading text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] tracking-wider text-muted-foreground uppercase">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
