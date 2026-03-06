import { Link } from "react-router-dom";
import { Instagram, MapPin, Mail, Clock, Lock, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

const WA_NUMBER = "2348051306562";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter / CTA Strip */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl font-bold text-primary-foreground">GET IN TOUCH</h3>
            <p className="text-primary-foreground/80 text-sm">Order cakes, book catering, or join our training program</p>
          </div>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Hello%20Glivyz%20Cakes!`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-background text-foreground px-8 py-3 font-bold text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Glivyz Cakes & Events" className="h-12 w-12 rounded-full border-2 border-primary object-cover" />
              <div>
                <h3 className="font-heading text-lg font-bold text-primary">GLIVYZ</h3>
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Cakes & Events</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium bakery, catering services, and training in Lagos, Nigeria. 
              Making every celebration sweeter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-5 text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Services</Link>
              <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</Link>
              <Link to="/apply" className="text-sm text-muted-foreground hover:text-primary transition-colors">Training</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
              <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5">
                <Lock size={12} />
                Admin Login
              </Link>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-5 text-foreground">Opening Hours</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-foreground">8AM - 6PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-foreground">9AM - 5PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-primary">Closed</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider mb-5 text-foreground">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>5 David Daramola Street, Olaoluwa Bus Stop, Off Ikola Road, Command Alimosho Lagos</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-primary" />
                <a href="tel:+2348051306562" className="hover:text-primary transition-colors">+234 805 130 6562</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-primary" />
                <a href="mailto:glivyzcakesandevents@gmail.com" className="hover:text-primary transition-colors">
                  glivyzcakesandevents@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <a href="https://instagram.com/glivyzcakesandevents" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://tiktok.com/@glivyzcakesandevents" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.27a8.16 8.16 0 003.76.92V6.69z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Glivyz Cakes and Events. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Lagos, Nigeria 🇳🇬
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
