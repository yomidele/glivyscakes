import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/apply", label: "Training" },
  { to: "/contact", label: "Contact" },
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Glivyz Cakes & Events" className="h-12 md:h-16 w-auto rounded-full" />
          <span className="font-heading text-lg md:text-xl font-bold text-primary">
            Glivyz<span className="text-gradient-gold"> Cakes & Events</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setBookMenuOpen(!bookMenuOpen)}
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
            >
              Book Service
              <ChevronDown size={16} className={`transition-transform ${bookMenuOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {bookMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-warm overflow-hidden z-50"
                >
                  {bookingOptions.map((opt) => (
                    <a
                      key={opt.label}
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(opt.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setBookMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
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
          className="md:hidden text-foreground p-2"
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
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    location.pathname === link.to
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border pt-3 flex flex-col gap-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Book Service</p>
                {bookingOptions.map((opt) => (
                  <a
                    key={opt.label}
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(opt.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold text-center"
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
