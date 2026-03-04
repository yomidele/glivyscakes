import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const courses = [
  "Cake Baking & Decoration",
  "Pastry Making",
  "Bread Baking",
  "Small Chops & Finger Foods",
  "Catering & Food Business",
];

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    startDate: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("applications").insert({
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      start_date: formData.startDate,
      notes: formData.notes,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to submit application. Please try again.");
    } else {
      toast.success("Application submitted successfully! We'll contact you soon.");
      setFormData({ fullName: "", email: "", phone: "", course: "", startDate: "", notes: "" });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto space-y-5"
    >
      <div>
        <label className="block text-sm font-medium mb-1.5">Full Name *</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          maxLength={100}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition-shadow"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Email Address *</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={255}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition-shadow"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Phone Number *</label>
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          maxLength={20}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition-shadow"
          placeholder="+234..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Preferred Course *</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition-shadow"
        >
          <option value="">Select a course</option>
          {courses.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Preferred Start Date *</label>
        <input
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition-shadow"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Additional Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          maxLength={1000}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring outline-none transition-shadow resize-none"
          placeholder="Any questions or special requirements?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </motion.form>
  );
};

export default ApplicationForm;
