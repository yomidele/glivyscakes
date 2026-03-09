import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
}

const CustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setReviews(data as Review[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !rating || !text.trim()) {
      toast.error("Please fill in your name, rating, and review.");
      return;
    }
    if (name.trim().length > 100 || text.trim().length > 500) {
      toast.error("Name or review text is too long.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      reviewer_name: name.trim(),
      rating,
      review_text: text.trim(),
    });
    if (error) {
      toast.error("Failed to post review.");
    } else {
      toast.success("Review posted!");
      setName("");
      setRating(0);
      setText("");
      fetchReviews();
    }
    setSubmitting(false);
  };

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <div>
      {/* Summary */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={20}
              className={s <= Math.round(Number(averageRating)) ? "text-primary fill-primary" : "text-muted-foreground/30"}
            />
          ))}
        </div>
        <span className="font-heading text-2xl font-bold text-primary">{averageRating}</span>
        <span className="text-muted-foreground text-sm">({reviews.length} reviews)</span>
      </div>

      {/* Review Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto bg-card border border-border p-6 mb-12"
      >
        <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-center">
          Leave a Review
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="w-full px-4 py-3 bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none text-sm"
          />
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                >
                  <Star
                    size={24}
                    className={`transition-colors cursor-pointer ${
                      s <= (hoverRating || rating)
                        ? "text-primary fill-primary"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Share your experience..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
            rows={3}
            className="w-full px-4 py-3 bg-background border border-border text-foreground focus:ring-2 focus:ring-primary outline-none text-sm resize-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground py-3 font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            <Send size={16} />
            {submitting ? "Posting..." : "Post Review"}
          </button>
        </div>
      </motion.form>

      {/* Reviews List */}
      <div className="max-w-3xl mx-auto grid gap-4">
        <AnimatePresence>
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{review.reviewer_name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={s <= review.rating ? "text-primary fill-primary" : "text-muted-foreground/30"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{review.review_text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        {reviews.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-8">
            No reviews yet. Be the first to share your experience!
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerReviews;
