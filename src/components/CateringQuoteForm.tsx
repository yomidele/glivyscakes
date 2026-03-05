import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const eventTypes = [
  "Wedding",
  "Birthday Party",
  "Corporate Event",
  "Baby Shower",
  "Funeral Reception",
  "Other",
];

const budgetRanges = [
  "₦50,000 - ₦100,000",
  "₦100,000 - ₦250,000",
  "₦250,000 - ₦500,000",
  "₦500,000 - ₦1,000,000",
  "₦1,000,000+",
];

const CateringQuoteForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    numGuests: "",
    location: "",
    budgetRange: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("catering_quotes").insert({
      full_name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      event_type: formData.eventType,
      event_date: formData.eventDate,
      num_guests: parseInt(formData.numGuests),
      location: formData.location,
      budget_range: formData.budgetRange,
      notes: formData.notes,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to submit request. Please try again.");
    } else {
      setSubmitted(true);
      toast.success("Quote request submitted!");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition-shadow";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center py-12"
      >
        <div className="text-4xl mb-4">✅</div>
        <h3 className="font-heading text-2xl font-bold mb-2">Request Received!</h3>
        <p className="text-muted-foreground">
          Our team will contact you shortly regarding your catering request.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-lg mx-auto space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1.5">Full Name *</label>
        <input name="fullName" value={formData.fullName} onChange={handleChange} required className={inputClass} placeholder="Your full name" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Phone *</label>
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required className={inputClass} placeholder="+234..." />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Email *</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="you@email.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Event Type *</label>
          <select name="eventType" value={formData.eventType} onChange={handleChange} required className={inputClass}>
            <option value="">Select event</option>
            {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Event Date *</label>
          <input name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} required className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Number of Guests *</label>
          <input name="numGuests" type="number" min="1" value={formData.numGuests} onChange={handleChange} required className={inputClass} placeholder="e.g. 100" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Budget Range</label>
          <select name="budgetRange" value={formData.budgetRange} onChange={handleChange} className={inputClass}>
            <option value="">Select budget</option>
            {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Location *</label>
        <input name="location" value={formData.location} onChange={handleChange} required className={inputClass} placeholder="Event venue address" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Additional Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="Menu preferences, special requests..." />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Request Catering Quote"}
      </button>
    </motion.form>
  );
};

export default CateringQuoteForm;
