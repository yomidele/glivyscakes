import { motion } from "framer-motion";
import weddingCake from "@/assets/wedding-cake.jpg";
import smallChops from "@/assets/small-chops.jpg";
import foodTray from "@/assets/food-tray.jpg";
import lunchPacks from "@/assets/lunch-packs.jpg";
import bakingSchool from "@/assets/baking-school.jpg";

const services = [
  {
    title: "Custom Cakes",
    description: "Wedding cakes, birthday cakes, and celebration cakes designed to perfection.",
    image: weddingCake,
    price: "From ₦15,000",
  },
  {
    title: "Small Chops",
    description: "Spring rolls, samosa, puff puff, and more for your events and parties.",
    image: smallChops,
    price: "From ₦25,000",
  },
  {
    title: "Food Trays",
    description: "Beautifully packed jollof rice, fried rice, and assorted meals for all occasions.",
    image: foodTray,
    price: "From ₦20,000",
  },
  {
    title: "Lunch Packs",
    description: "Delicious and neatly packed meals for corporate events and gatherings.",
    image: lunchPacks,
    price: "From ₦15,000",
  },
  {
    title: "Training",
    description: "Learn professional baking and cake decoration from experienced instructors.",
    image: bakingSchool,
    price: "Enroll Now",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">What We Offer</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            OUR <span className="text-gradient-gold">SERVICES</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden border border-border"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-1">{service.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">{service.description}</p>
                  </div>
                  <span className="text-primary text-sm font-bold whitespace-nowrap">{service.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
