import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Mail, Clock, Phone, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Get in <span className="text-gradient-gold">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We'd love to hear from you. Reach out to us for orders, inquiries, or anything else.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6 space-y-5"
            >
              <div className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    5 David Daramola Street, Olaoluwa Bus Stop, Off Ikola Road, Command Alimosho Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Email</h3>
                  <a href="mailto:glivyzcakesandevents@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    glivyzcakesandevents@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Opening Hours</h3>
                  <p className="text-sm text-muted-foreground">Wednesday 8:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-primary mt-1 shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-sm mb-1">WhatsApp</h3>
                  <a
                    href="https://wa.me/234XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-heading text-xl font-semibold mb-3">Follow Us</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Stay updated with our latest creations, events, and school updates.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/glivyzcakesandevents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram size={18} />
                    Instagram
                  </a>
                  <a
                    href="https://tiktok.com/@glivyzcakesandevents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.27a8.16 8.16 0 003.76.92V6.69z"/>
                    </svg>
                    TikTok
                  </a>
                </div>
              </div>

              <a
                href="https://wa.me/234XXXXXXXXXX?text=Hello%20Glivyz%20Cakes!%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity block"
              >
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
