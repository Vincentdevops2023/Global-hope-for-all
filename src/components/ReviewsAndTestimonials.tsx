import React, { useState } from "react";
import { 
  Star, ShieldCheck, CheckCircle2, UserCheck, MessageSquarePlus, 
  ThumbsUp, Heart, Sparkles, Filter, X, Send, Award, ShoppingBag, 
  BookOpen, Users
} from "lucide-react";
import { Testimonial } from "../types";
import { PATIENT_TESTIMONIALS } from "../data";

interface ReviewsAndTestimonialsProps {
  onNavigateToBooking?: () => void;
  onNavigateToShop?: () => void;
}

export default function ReviewsAndTestimonials({ onNavigateToBooking, onNavigateToShop }: ReviewsAndTestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(PATIENT_TESTIMONIALS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isSubmitOpen, setIsSubmitOpen] = useState<boolean>(false);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Form State for New Review
  const [newReview, setNewReview] = useState({
    author: "",
    location: "",
    category: "Anxiety Care" as Testimonial['category'],
    rating: 5,
    title: "",
    comment: "",
    productName: ""
  });
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Categories list
  const categories = ["All", "Anxiety Care", "Panic Recovery", "Couples Intimacy", "Supplements & Shop", "General Consultation"];

  const filteredReviews = selectedCategory === "All"
    ? testimonials
    : testimonials.filter(r => r.category === selectedCategory);

  const handleToggleLike = (id: string) => {
    setLikedReviews(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.title || !newReview.comment) return;

    const created: Testimonial = {
      id: `user-rev-${Date.now()}`,
      author: newReview.author.trim(),
      roleOrLocation: newReview.location.trim() ? `Verified Patient • ${newReview.location.trim()}` : "Verified Patient",
      rating: newReview.rating,
      category: newReview.category,
      title: newReview.title.trim(),
      comment: newReview.comment.trim(),
      date: "Just now",
      verified: true,
      productName: newReview.productName.trim() || undefined,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200`
    };

    setTestimonials([created, ...testimonials]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitOpen(false);
      setNewReview({
        author: "",
        location: "",
        category: "Anxiety Care",
        rating: 5,
        title: "",
        comment: "",
        productName: ""
      });
    }, 2000);
  };

  return (
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left font-sans">
      
      {/* HEADER HERO */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-teal-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-pink-500/20 text-pink-300 border border-pink-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
              <span>Verified 5-Star Patient & Product Feedback</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-sans">
              Patient Reviews & Real Testimonials
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              Read authentic, 100% verified experiences from individuals who have accessed our anxiety education, panic recovery counseling, intimacy consultations, and WooCommerce wellness supplements.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                id="open-submit-review-modal-btn"
                onClick={() => setIsSubmitOpen(true)}
                className="bg-pink-600 hover:bg-pink-500 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-pink-600/30 flex items-center gap-2 transition cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Write a 5-Star Review
              </button>

              {onNavigateToBooking && (
                <button
                  onClick={onNavigateToBooking}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-5 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Book Consultation
                </button>
              )}
            </div>
          </div>

          {/* RATING HIGHLIGHT SCORE CARD */}
          <div className="lg:col-span-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-5xl font-black text-white tracking-tight flex items-center gap-1 font-sans">
                <span>4.9</span>
                <span className="text-2xl text-slate-400 font-normal">/5</span>
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 font-medium mt-1">
                  Based on 1,240+ Verified Reviews
                </p>
              </div>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4 text-xs text-slate-300">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 5-Star Reviews</span>
                <span className="font-bold text-white">96%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-pink-500 h-full w-[96%]"></div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-pink-400" /> Clinical Counseling Rating</span>
                <span className="font-bold text-white">5.0 / 5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-teal-600" />
          <span>Filter:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap border ${
              selectedCategory === cat
                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 group relative"
          >
            <div className="space-y-3">
              
              {/* Header: Avatar, Name, Rating */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"}
                    alt={rev.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-teal-500/20 shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      {rev.author}
                      {rev.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" title="Verified Patient / Buyer" />
                      )}
                    </h4>
                    <span className="text-[11px] text-slate-500 block font-light">
                      {rev.roleOrLocation}
                    </span>
                  </div>
                </div>

                <span className="bg-pink-50 text-pink-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-pink-100 uppercase tracking-wider shrink-0">
                  {rev.category}
                </span>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center gap-1 pt-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-slate-700 ml-1.5">{rev.rating}.0</span>
              </div>

              {/* Title & Comment */}
              <div>
                <h5 className="font-extrabold text-slate-900 text-sm mb-1.5 leading-snug">
                  "{rev.title}"
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>

              {/* Mentioned Product (if any) */}
              {rev.productName && (
                <div className="bg-teal-50/70 border border-teal-100 p-2.5 rounded-xl text-[11px] text-teal-900 flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span className="truncate">Verified purchase: <strong>{rev.productName}</strong></span>
                </div>
              )}

            </div>

            {/* Review Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>{rev.date}</span>
              <button
                onClick={() => handleToggleLike(rev.id)}
                className={`inline-flex items-center gap-1.5 text-[11px] font-semibold cursor-pointer transition ${
                  likedReviews[rev.id] ? "text-pink-600 font-bold" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${likedReviews[rev.id] ? "fill-pink-600" : ""}`} />
                <span>{likedReviews[rev.id] ? "Helpful (1)" : "Helpful"}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* WRITE A REVIEW MODAL */}
      {isSubmitOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsSubmitOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submitSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Thank You for Your 5-Star Review!</h3>
                <p className="text-xs text-slate-500">
                  Your review has been verified and published to Global Hope For All.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Star className="w-5 h-5 fill-pink-500 text-pink-500" />
                    Submit Your 5-Star Patient / Product Review
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Share your experience with our counseling services or WooCommerce shop products.
                  </p>
                </div>

                {/* Rating Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Star Rating:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1.5 hover:scale-110 transition cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newReview.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {newReview.rating} out of 5 Stars ⭐
                    </span>
                  </div>
                </div>

                {/* Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name / Alias *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah M."
                      value={newReview.author}
                      onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Location / State</label>
                    <input
                      type="text"
                      placeholder="e.g. Chicago, IL"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Review Category *</label>
                  <select
                    value={newReview.category}
                    onChange={(e) => setNewReview({ ...newReview, category: e.target.value as Testimonial['category'] })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    <option value="Anxiety Care">Anxiety Care & Consultation</option>
                    <option value="Panic Recovery">Panic Attack Recovery</option>
                    <option value="Couples Intimacy">Couples Intimacy & Relationship</option>
                    <option value="Supplements & Shop">Supplements & Shop Products</option>
                    <option value="General Consultation">General Wellness Consultation</option>
                  </select>
                </div>

                {/* Optional Product Name */}
                {newReview.category === "Supplements & Shop" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Purchased Product Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Ashwagandha KSM-66, CBT Journal..."
                      value={newReview.productName}
                      onChange={(e) => setNewReview({ ...newReview, productName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                    />
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Review Headline / Summary *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Life-changing guidance and fast supplement delivery!"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                {/* Detailed Comment */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Review *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how Global Hope For All supported your journey..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-500 text-white font-extrabold py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-pink-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Publish Verified Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
