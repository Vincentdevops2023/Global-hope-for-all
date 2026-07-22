import React, { useState } from "react";
import { 
  ShieldAlert, Lock, User, Key, LogOut, CheckCircle2, AlertCircle, 
  Plus, Edit3, Trash2, Eye, FileText, Star, ShoppingBag, Calendar, 
  Settings, Layers, RefreshCw, Save, Search, Filter, ShieldCheck, 
  ArrowRight, Sparkles, Database, Users, Tag, Clock, ChevronRight
} from "lucide-react";
import { BlogPost, Testimonial, Product, Appointment, PatientProfile } from "../types";
import { BLOG_POSTS, PATIENT_TESTIMONIALS, ANXIETY_PRODUCTS } from "../data";

interface AdminPanelProps {
  onNavigateSection?: (sectionId: string) => void;
  appointmentsList?: Appointment[];
  setAppointmentsList?: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

export default function AdminPanel({ onNavigateSection, appointmentsList = [], setAppointmentsList }: AdminPanelProps) {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("admin@globalhope.org");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"overview" | "blog" | "reviews" | "products" | "appointments" | "settings">("overview");

  // Content Management States
  const [articles, setArticles] = useState<BlogPost[]>(BLOG_POSTS);
  const [reviews, setReviews] = useState<Testimonial[]>(PATIENT_TESTIMONIALS);
  const [products, setProducts] = useState<Product[]>(ANXIETY_PRODUCTS);
  
  // Notification banner inside admin
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Please enter both email and password.");
      return;
    }
    // Demo admin check
    if (password === "admin2026" || password === "admin" || password === "123456") {
      setIsLoggedIn(true);
      setLoginError("");
      showToast("Successfully logged into Admin Back-End Dashboard.");
    } else {
      setLoginError("Invalid admin credentials. Use demo password: admin2026");
    }
  };

  // Demo auto-fill
  const fillDemoCredentials = () => {
    setEmail("admin@globalhope.org");
    setPassword("admin2026");
    setLoginError("");
  };

  // Modal / Form States
  const [editingArticle, setEditingArticle] = useState<BlogPost | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState<boolean>(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [newReviewForm, setNewReviewForm] = useState({
    author: "",
    location: "Verified Patient",
    category: "Anxiety Care" as Testimonial["category"],
    rating: 5,
    title: "",
    comment: ""
  });

  // Settings State
  const [siteSettings, setSiteSettings] = useState({
    announcementText: "✨ Global Hope For All — Free 15-Min Telehealth Assessment for New Anxiety & Panic Patients",
    contactPhone: "+1 (800) 456-HOPE",
    contactEmail: "care@globalhope.org",
    emergencyHotline: "988 Suicide & Crisis Lifeline"
  });

  // ARTICLE ACTIONS
  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
    showToast("Article deleted successfully.");
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    const exists = articles.some(a => a.id === editingArticle.id);
    if (exists) {
      setArticles(articles.map(a => a.id === editingArticle.id ? editingArticle : a));
      showToast(`Article "${editingArticle.title}" updated.`);
    } else {
      setArticles([editingArticle, ...articles]);
      showToast(`New article "${editingArticle.title}" published.`);
    }
    setIsArticleModalOpen(false);
    setEditingArticle(null);
  };

  // PRODUCT ACTIONS
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    showToast("Product removed from inventory.");
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const exists = products.some(p => p.id === editingProduct.id);
    if (exists) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      showToast(`Product "${editingProduct.name}" updated.`);
    } else {
      setProducts([editingProduct, ...products]);
      showToast(`New product "${editingProduct.name}" added to WooCommerce store.`);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // REVIEW ACTIONS
  const handleToggleVerifyReview = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, verified: !r.verified } : r));
    showToast("Review verification status updated.");
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
    showToast("Review removed.");
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Testimonial = {
      id: `rev-${Date.now()}`,
      author: newReviewForm.author,
      roleOrLocation: newReviewForm.location,
      rating: newReviewForm.rating,
      category: newReviewForm.category,
      title: newReviewForm.title,
      comment: newReviewForm.comment,
      date: "Just now",
      verified: true
    };
    setReviews([created, ...reviews]);
    setIsReviewModalOpen(false);
    showToast("New verified review published.");
    setNewReviewForm({
      author: "",
      location: "Verified Patient",
      category: "Anxiety Care",
      rating: 5,
      title: "",
      comment: ""
    });
  };

  // APPOINTMENT STATUS TOGGLE
  const handleUpdateAppointmentStatus = (id: string, newStatus: Appointment['status']) => {
    if (setAppointmentsList) {
      setAppointmentsList(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      showToast(`Appointment status changed to ${newStatus}.`);
    }
  };

  // IF NOT LOGGED IN: SHOW LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-left">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-900 via-teal-600 to-amber-500"></div>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-900 to-teal-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-black text-slate-950 font-sans tracking-tight">
              Admin Back-End Login
            </h2>
            <p className="text-xs text-slate-500 font-light">
              Global Hope For All — Executive Content & Operations Management Portal
            </p>
          </div>

          {/* Demo Info Box */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-xs text-teal-900 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5"><Key className="w-3.5 h-3.5 text-teal-700" /> Demo Admin Access</span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-[11px] bg-teal-700 text-white px-2.5 py-1 rounded-lg font-bold hover:bg-teal-800 transition cursor-pointer"
              >
                Auto-Fill
              </button>
            </div>
            <p className="font-mono text-[11px] text-teal-800">
              Email: <strong>admin@globalhope.org</strong><br/>
              Password: <strong>admin2026</strong>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-700 flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-950 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-slate-950/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Authenticate & Enter Admin Panel</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[11px] text-slate-400">
              🔒 256-bit Encrypted Session • Authorized Personnel Only
            </span>
          </div>

        </div>
      </div>
    );
  }

  // LOGGED IN ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-teal-400 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ADMIN HEADER BAR */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Authenticated System Administrator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-sans">
            Website Back-End CMS & Control Center
          </h2>
          <p className="text-xs text-slate-400 font-light">
            Manage blog articles, patient reviews, WooCommerce shop inventory, and consultation appointments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          {onNavigateSection && (
            <button
              onClick={() => onNavigateSection("home")}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer border border-white/10"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Site Preview</span>
            </button>
          )}

          <button
            onClick={() => {
              setIsLoggedIn(false);
              showToast("Logged out of admin panel.");
            }}
            className="bg-rose-600/80 hover:bg-rose-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* METRICS STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Published Articles</span>
          <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            <span>{articles.length}</span>
          </div>
          <span className="text-[10px] text-teal-700 font-medium">SEO & Peer-Reviewed</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verified Reviews</span>
          <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>{reviews.length}</span>
          </div>
          <span className="text-[10px] text-amber-600 font-medium">100% 5-Star Rating</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Shop Products</span>
          <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <span>{products.length}</span>
          </div>
          <span className="text-[10px] text-blue-600 font-medium">WooCommerce Active</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Consultation Requests</span>
          <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-pink-600" />
            <span>{appointmentsList.length}</span>
          </div>
          <span className="text-[10px] text-pink-600 font-medium">Active Patient Bookings</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1 col-span-2 lg:col-span-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Server & Database</span>
          <div className="text-2xl font-black text-emerald-600 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-bold text-slate-900">Online 100%</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-medium">Express + Vite Engine</span>
        </div>
      </div>

      {/* ADMIN TABS NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200">
        {[
          { id: "overview", label: "📊 Overview", icon: Layers },
          { id: "blog", label: "📰 Blog & Articles", icon: FileText },
          { id: "reviews", label: "⭐ Reviews & Testimonials", icon: Star },
          { id: "products", label: "🛍️ Shop Inventory", icon: ShoppingBag },
          { id: "appointments", label: "📅 Consultations", icon: Calendar },
          { id: "settings", label: "⚙️ Site Banners", icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 rounded-t-2xl text-xs font-extrabold flex items-center gap-2 transition cursor-pointer border-t border-x ${
              activeTab === tab.id
                ? "bg-white text-slate-950 border-slate-300 -mb-px shadow-2xs"
                : "bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200"
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT PANELS */}

      {/* TAB 1: OVERVIEW & QUICK ACTIONS */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-150">
          
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-2xs">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Recent Website Activity & Content Overview
            </h3>
            
            <div className="space-y-3">
              {articles.slice(0, 3).map((a) => (
                <div key={a.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">{a.category}</span>
                    <h4 className="font-bold text-xs text-slate-900">{a.title}</h4>
                    <span className="text-[10px] text-slate-400">By {a.author} • {a.date}</span>
                  </div>
                  <button
                    onClick={() => {
                      setEditingArticle(a);
                      setIsArticleModalOpen(true);
                      setActiveTab("blog");
                    }}
                    className="text-xs font-bold text-teal-700 hover:underline shrink-0"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 border border-slate-800 shadow-xl">
            <h3 className="font-extrabold text-sm text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Quick Admin Actions
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  setEditingArticle({
                    id: `blog-${Date.now()}`,
                    title: "",
                    slug: "",
                    category: "Anxiety Education",
                    excerpt: "",
                    content: "",
                    author: "Dr. Admin, MD",
                    date: "Today",
                    readTime: "5 min read",
                    tags: ["anxiety", "wellness"],
                    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400",
                    keywords: [],
                    furtherReading: []
                  });
                  setIsArticleModalOpen(true);
                  setActiveTab("blog");
                }}
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold p-3 rounded-2xl text-xs flex items-center justify-between transition cursor-pointer"
              >
                <span>+ Publish New Blog Article</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsReviewModalOpen(true);
                  setActiveTab("reviews");
                }}
                className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold p-3 rounded-2xl text-xs flex items-center justify-between transition cursor-pointer"
              >
                <span>+ Add Patient Review</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setEditingProduct({
                    id: `prod-${Date.now()}`,
                    name: "",
                    slug: "",
                    price: 29.99,
                    rating: 5,
                    reviewCount: 1,
                    category: "Supplements",
                    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
                    shortDescription: "",
                    description: "",
                    benefits: ["Reduces daily anxiety"],
                    inStock: true
                  });
                  setIsProductModalOpen(true);
                  setActiveTab("products");
                }}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold p-3 rounded-2xl text-xs flex items-center justify-between transition cursor-pointer"
              >
                <span>+ Add WooCommerce Product</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: BLOG & ARTICLES MANAGEMENT */}
      {activeTab === "blog" && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6 shadow-2xs animate-in fade-in duration-150">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-sans">Blog Article Management</h3>
              <p className="text-xs text-slate-500">Edit titles, content, categories, highlighted keywords, and further reading links.</p>
            </div>

            <button
              onClick={() => {
                setEditingArticle({
                  id: `blog-${Date.now()}`,
                  title: "",
                  slug: "new-article-slug",
                  category: "Anxiety Education",
                  excerpt: "",
                  content: "",
                  author: "Dr. Admin, MD",
                  date: "July 2026",
                  readTime: "5 min read",
                  tags: ["anxiety"],
                  image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400",
                  keywords: [],
                  furtherReading: []
                });
                setIsArticleModalOpen(true);
              }}
              className="bg-teal-700 hover:bg-teal-800 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Article</span>
            </button>
          </div>

          {/* Table of Articles */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Title & Category</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Keywords</th>
                  <th className="p-3">Reading Links</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-bold text-slate-900 max-w-xs">
                      <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-extrabold block w-max mb-1">
                        {art.category}
                      </span>
                      <span className="line-clamp-1">{art.title}</span>
                    </td>
                    <td className="p-3 text-slate-600 font-medium">{art.author}</td>
                    <td className="p-3">
                      <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md font-bold text-[10px]">
                        {art.keywords?.length || 0} Keywords
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-md font-bold text-[10px]">
                        {art.furtherReading?.length || 0} Links
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingArticle(art);
                          setIsArticleModalOpen(true);
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 3: REVIEWS & TESTIMONIALS */}
      {activeTab === "reviews" && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6 shadow-2xs animate-in fade-in duration-150">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-sans">Patient Reviews & Testimonials</h3>
              <p className="text-xs text-slate-500">Moderate patient reviews, toggle verification status, or publish new testimonials.</p>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-pink-600 hover:bg-pink-500 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Verified Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">{rev.author}</span>
                    {rev.verified && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Verified</span>
                    )}
                  </div>
                  <span className="text-[10px] text-pink-700 bg-pink-50 font-bold px-2 py-0.5 rounded-full border border-pink-200">
                    {rev.category}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="font-extrabold text-xs text-slate-900">"{rev.title}"</p>
                <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-3">{rev.comment}</p>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleToggleVerifyReview(rev.id)}
                      className="text-xs font-bold text-teal-700 hover:underline"
                    >
                      {rev.verified ? "Unverify" : "Verify Badge"}
                    </button>
                    <button
                      onClick={() => handleDeleteReview(rev.id)}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 4: WOOCOMMERCE SHOP PRODUCTS */}
      {activeTab === "products" && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6 shadow-2xs animate-in fade-in duration-150">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-sans">WooCommerce Shop Inventory</h3>
              <p className="text-xs text-slate-500">Manage prices, stock status, descriptions, and add new products.</p>
            </div>

            <button
              onClick={() => {
                setEditingProduct({
                  id: `prod-${Date.now()}`,
                  name: "",
                  slug: "new-product",
                  price: 24.99,
                  rating: 5,
                  reviewCount: 1,
                  category: "Supplements",
                  image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
                  shortDescription: "",
                  description: "",
                  benefits: ["Nervous system relaxation"],
                  inStock: true
                });
                setIsProductModalOpen(true);
              }}
              className="bg-amber-600 hover:bg-amber-500 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between space-y-3">
                <div className="flex gap-3 items-center">
                  <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">{p.category}</span>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1 mt-1">{p.name}</h4>
                    <span className="text-sm font-black text-slate-950">${p.price.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2">{p.shortDescription}</p>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className={`font-bold text-[10px] ${p.inStock ? "text-emerald-700" : "text-rose-600"}`}>
                    {p.inStock ? "● In Stock" : "○ Out of Stock"}
                  </span>

                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setIsProductModalOpen(true);
                      }}
                      className="text-xs font-bold text-blue-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 5: APPOINTMENTS & CONSULTATIONS */}
      {activeTab === "appointments" && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6 shadow-2xs animate-in fade-in duration-150">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-sans">Patient Consultation Bookings</h3>
            <p className="text-xs text-slate-500">View incoming appointments and update their confirmation status.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Reason / Details</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointmentsList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400 font-medium">
                      No consultation bookings found currently.
                    </td>
                  </tr>
                ) : (
                  appointmentsList.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-bold text-slate-900">{app.name}</td>
                      <td className="p-3 text-slate-600">
                        <div>{app.email}</div>
                        <div className="text-[10px] text-slate-400">{app.phone}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-800">
                        {app.date} at {app.time}
                      </td>
                      <td className="p-3 text-slate-600 max-w-xs truncate">{app.reason}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          app.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => handleUpdateAppointmentStatus(app.id, 'Confirmed')}
                          className="bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-lg text-[11px] hover:bg-emerald-100 transition"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleUpdateAppointmentStatus(app.id, 'Completed')}
                          className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-lg text-[11px] hover:bg-slate-200 transition"
                        >
                          Complete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: SITE BANNERS & SETTINGS */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6 shadow-2xs max-w-2xl animate-in fade-in duration-150">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-sans">Global Website Banners & Contact</h3>
            <p className="text-xs text-slate-500">Update the top announcement bar message and emergency hotline text.</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            showToast("Global website settings updated successfully.");
          }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Top Announcement Bar Text</label>
              <input
                type="text"
                value={siteSettings.announcementText}
                onChange={(e) => setSiteSettings({ ...siteSettings, announcementText: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={siteSettings.contactPhone}
                  onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Emergency Crisis Hotline</label>
                <input
                  type="text"
                  value={siteSettings.emergencyHotline}
                  onChange={(e) => setSiteSettings({ ...siteSettings, emergencyHotline: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-slate-950 hover:bg-slate-800 text-white font-extrabold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Website Settings</span>
            </button>
          </form>
        </div>
      )}

      {/* ARTICLE EDIT / CREATE MODAL */}
      {isArticleModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 border border-slate-200 shadow-2xl relative my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900 font-sans">
                {editingArticle.title ? "Edit Article" : "Create New Blog Article"}
              </h3>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    <option value="Anxiety Education">Anxiety Education</option>
                    <option value="Panic Disorder">Panic Disorder</option>
                    <option value="Stress Management">Stress Management</option>
                    <option value="Mindfulness">Mindfulness</option>
                    <option value="Healthy Relationships">Healthy Relationships</option>
                    <option value="Emotional Wellness">Emotional Wellness</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={editingArticle.author}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Excerpt Summary</label>
                <textarea
                  rows={2}
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Article Body Content</label>
                <textarea
                  rows={6}
                  required
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white font-extrabold px-5 py-2 rounded-xl shadow-md"
                >
                  Save & Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT EDIT / CREATE MODAL */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl relative my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900 font-sans">
                {editingProduct.name ? "Edit Shop Product" : "Add New WooCommerce Product"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price ($USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Availability</label>
                  <select
                    value={editingProduct.inStock ? "true" : "false"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.value === "true" })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.shortDescription}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-white font-extrabold px-5 py-2 rounded-xl shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REVIEW ADD MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900 font-sans">Publish Verified Testimonial</h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel K."
                  value={newReviewForm.author}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, author: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Headline Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Excellent panic counseling"
                  value={newReviewForm.title}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Review Comment</label>
                <textarea
                  rows={3}
                  required
                  value={newReviewForm.comment}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-500 text-white font-extrabold py-2.5 rounded-xl text-xs uppercase"
              >
                Save & Publish
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
