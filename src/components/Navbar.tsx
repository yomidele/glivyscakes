import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/services", label: "SERVICES" },
  { to: "/gallery", label: "GALLERY" },
  { to: "/apply", label: "TRAINING" },
  { to: "/contact", label: "CONTACT" },
];

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookMenuOpen, setBookMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBookMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Glivyz Cakes & Events" className="h-12 w-12 rounded-full border-2 border-primary object-cover" />
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold text-primary leading-tight">GLIVYZ</span>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Cakes & Events</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-semibold tracking-wider transition-colors hover:text-primary ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-foreground/80"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <span className="block h-0.5 bg-primary mt-1 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            📞 +234 805 130 6562
          </a>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setBookMenuOpen(!bookMenuOpen)}
              className="bg-primary text-primary-foreground px-6 py-2.5 text-xs font-bold tracking-wider uppercase hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              Book Service
              <ChevronDown size={14} className={`transition-transform ${bookMenuOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {bookMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-card border border-border overflow-hidden z-50"
                >
                  {bookingOptions.map((opt) => (
                    <a
                      key={opt.label}
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(opt.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setBookMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {opt.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-semibold tracking-wider transition-colors ${
                    location.pathname === link.to
                      ? "text-primary"
                      : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border pt-4 flex flex-col gap-2">
                {bookingOptions.map((opt) => (
                  <a
                    key={opt.label}
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(opt.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="bg-primary text-primary-foreground px-5 py-3 text-sm font-bold text-center uppercase tracking-wider"
                  >
                    {opt.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
