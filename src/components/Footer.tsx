import { Link } from "react-router-dom";
import { Instagram, MapPin, Mail, Clock, Lock } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={logo} alt="Glivyz Cakes & Events" className="h-12 w-auto rounded-full" />
              <h3 className="font-heading text-2xl font-bold text-primary">
                Glivyz Cakes & Events
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium bakery, catering services, and baking school in Lagos, Nigeria. 
              Making every celebration sweeter since day one.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Services</Link>
              <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</Link>
              <Link to="/apply" className="text-sm text-muted-foreground hover:text-primary transition-colors">Baking School</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
              <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5">
                <Lock size={12} />
                Admin Login
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>5 David Daramola Street, Olaoluwa Bus Stop, Off Ikola Road, Command Alimosho Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-primary" />
                <a href="mailto:glivyzcakesandevents@gmail.com" className="hover:text-primary transition-colors">
                  glivyzcakesandevents@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="shrink-0 text-primary" />
                <span>Wednesday 8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
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

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Glivyz Cakes and Events. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
