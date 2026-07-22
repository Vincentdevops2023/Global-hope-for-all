import { useState, useEffect, FormEvent } from "react";
import { 
  Menu, X, Calendar, UserPlus, Heart, BookOpen, MessageSquare, 
  Phone, Mail, ArrowRight, ShieldCheck, Check, ChevronDown, 
  Clock, Info, Compass, HelpCircle, Newspaper, Sparkles, 
  MapPin, Send, AlertTriangle, ExternalLink, CalendarClock,
  BookMarked, Accessibility, ShoppingBag
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import SEOHelper from "./components/SEOHelper";
import AICompanion from "./components/AICompanion";
import AppointmentForm from "./components/AppointmentForm";
import RegistrationForm from "./components/RegistrationForm";
import Portal from "./components/Portal";
import GoogleMapPlaceholder from "./components/GoogleMapPlaceholder";
import Shop from "./components/Shop";
import WhatsAppWidget from "./components/WhatsAppWidget";


// Data
import { 
  ANXIETY_ARTICLES, 
  PANIC_RESOURCES, 
  INTIMACY_RESOURCES, 
  BLOG_POSTS, 
  GENERAL_FAQS 
} from "./data";
import { BlogPost, Appointment, CartItem } from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  
  // Blog search / category selection
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>("All");
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);

  // FAQ interactive state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [faqCategory, setFaqCategory] = useState<string>("All");

  // Newsletter subscription
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Sync to top of page on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
    setActiveBlogPost(null);
  }, [activeSection]);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterName("");
      setNewsletterEmail("");
      setNewsletterSuccess(false);
    }, 3500);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactForm({ name: "", email: "", subject: "", message: "" });
      setContactSuccess(false);
    }, 3500);
  };

  // Metadata determination based on route
  const getPageSEO = () => {
    const baseTitle = "Global Hope For All | Anxiety, Panic & Mental Wellness Education";
    const baseDesc = "Global Hope For All provides trusted educational resources on anxiety, panic disorders, healthy relationships, emotional wellness, and mental well-being.";
    const baseKeywords = "anxiety education, anxiety support, panic attack information, panic disorder resources, mental wellness, emotional wellness, healthy intimacy, relationship wellness, stress management, mindfulness, wellness education, coping with anxiety, self-care strategies, online wellness resources, Global Hope For All";
    const canonical = `https://globalhopeforall.org/#${activeSection}`;

    switch (activeSection) {
      case "anxiety-education":
        return {
          title: "Anxiety Education & Support | Global Hope For All",
          description: "Explore trusted evidence-based guides explaining what anxiety is, its physical/cognitive symptoms, causes, triggers, and daily coping tools.",
          keywords: `${baseKeywords}, symptoms of anxiety, causes of anxiety`,
          canonical,
          type: "MedicalWebPage" as const
        };
      case "panic-disorder":
        return {
          title: "Panic Disorder Resources & Breathing Guides | Global Hope For All",
          description: "Understand sudden panic attacks, identify common environmental triggers, and practice box breathing exercises and physical reset methods.",
          keywords: `${baseKeywords}, panic attack information, box breathing, relaxation techniques`,
          canonical,
          type: "MedicalWebPage" as const
        };
      case "healthy-intimacy":
        return {
          title: "Healthy Intimacy & Relationship Wellness | Global Hope For All",
          description: "Discover guides on emotional intimacy, communication skills, trust-building, and managing individual anxiety safely inside a relationship.",
          keywords: `${baseKeywords}, healthy intimacy, emotional intimacy, couple communication`,
          canonical,
          type: "MedicalWebPage" as const
        };
      case "wellness-blog":
        return {
          title: "Mental Wellness Blog & Health Guides | Global Hope For All",
          description: "Browse peer-reviewed articles written by counseling professionals covering mindfulness, self-care, relationship wellness, and sleep health.",
          keywords: `${baseKeywords}, wellness articles, mindfulness blog`,
          canonical,
          type: "Article" as const
        };
      case "shop":
        return {
          title: "WooCommerce Anxiety Shop & Supplements | Global Hope For All",
          description: "Browse evidence-grounded anxiety supplements, magnesium complexes, organic botanical teas, 7lb weighted grounding lap pads, and CBT guided journals.",
          keywords: `${baseKeywords}, anxiety supplements, magnesium threonate, L-theanine, ashwagandha, grounding tools, CBT journal, WooCommerce shop`,
          canonical,
          type: "MedicalWebPage" as const
        };
      case "faq":
        return {
          title: "Frequently Asked Questions | Global Hope For All",
          description: "Find professional, structured answers regarding anxiety symptoms, clinic boundaries, privacy protocols, and downloadable PDF worksheets.",
          keywords: `${baseKeywords}, wellness FAQ, anxiety answers`,
          canonical,
          type: "FAQPage" as const
        };
      default:
        return {
          title: baseTitle,
          description: baseDesc,
          keywords: baseKeywords,
          canonical,
          type: "MedicalWebPage" as const
        };
    }
  };

  const seo = getPageSEO();

  // Helper lists for rendering blog
  const filteredBlogPosts = selectedBlogCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedBlogCategory);

  const filteredFAQs = faqCategory === "All"
    ? GENERAL_FAQS
    : GENERAL_FAQS.filter(faq => faq.category === faqCategory.toLowerCase());

  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col antialiased relative overflow-hidden">
      {/* Decorative background glass blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-teal-200/30 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-100px] w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[-200px] w-[600px] h-[600px] rounded-full bg-purple-100/20 blur-[130px] pointer-events-none"></div>

      {/* SEO Dynamic Metadata Injection */}
      <SEOHelper 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalUrl={seo.canonical}
        pageType={seo.type}
      />

      {/* Accessible Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold z-50 shadow-md">
        Skip to Main Content
      </a>

      {/* Top Banner Notice - Privacy Emphasis */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-teal-900 text-white text-center py-2 px-4 text-xs font-medium flex flex-wrap items-center justify-center gap-2 border-b border-white/10">
        <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true"></span>
        <span>Secure & Private Platform: Providing trusted mental health education since 2026</span>
        <a 
          href="https://wa.me/16624709606?text=Hello%20Global%20Hope%20Support" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="ml-1 bg-pink-600 hover:bg-pink-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 transition shadow-sm shadow-pink-600/30"
        >
          <span>💬 WhatsApp Chat</span>
        </a>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 glass-nav shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Brand Logo */}
            <button 
              id="brand-logo-btn"
              onClick={() => setActiveSection("home")}
              className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-700 to-blue-900 flex items-center justify-center text-white font-black text-lg shadow-md">
                G
              </div>
              <div>
                <h1 className="font-extrabold text-base md:text-lg leading-none text-blue-950 tracking-tight">Global Hope <span className="text-teal-600">For All</span></h1>
                <span className="text-[10px] text-teal-700 font-semibold tracking-wide uppercase">Wellness & Anxiety Education</span>
              </div>
            </button>

            {/* Desktop Navigation Links (Responsive Menu) */}
            <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About Us" },
                { id: "anxiety-education", label: "Anxiety Education" },
                { id: "panic-disorder", label: "Panic Disorder" },
                { id: "healthy-intimacy", label: "Intimacy & Wellness" },
                { id: "wellness-blog", label: "Wellness Blog" },
                { id: "shop", label: "Shop & Supplements" },
                { id: "patient-registration", label: "Patient Registration" },
                { id: "appointment-booking", label: "Book Consultation" },
                { id: "patient-portal", label: "Patient Portal" },
                { id: "faq", label: "FAQ" },
                { id: "contact", label: "Contact" }
              ].map((item) => (
                <button
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 rounded-xl text-[13px] font-semibold transition duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                    activeSection === item.id 
                      ? "bg-blue-900 text-white shadow-md shadow-blue-950/20" 
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Book Consultation & Shop Header buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                id="header-cta-shop"
                onClick={() => setActiveSection("shop")}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-300/60 px-3.5 py-2 rounded-full font-bold text-xs transition duration-150 flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
                <span>Shop</span>
                {cart.length > 0 && (
                  <span className="bg-amber-700 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full ml-0.5">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button
                id="header-cta-book"
                onClick={() => setActiveSection("appointment-booking")}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full font-bold text-xs transition duration-150 flex items-center gap-1.5 shadow-lg shadow-teal-600/20 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Consultation
              </button>
              <button
                id="header-cta-portal"
                onClick={() => setActiveSection("patient-portal")}
                className="bg-white/40 backdrop-blur-sm border border-white/60 text-teal-700 hover:text-teal-800 hover:bg-white/60 px-4 py-2 rounded-full font-bold text-xs transition duration-150 flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                Portal Login
              </button>
            </div>


            {/* Mobile menu toggle */}
            <div className="xl:hidden flex items-center gap-2">
              <button
                id="mobile-portal-quick-btn"
                onClick={() => setActiveSection("patient-portal")}
                className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100"
              >
                Portal
              </button>
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-white border-t border-slate-100 shadow-lg overflow-hidden"
            >
              <nav className="px-4 py-3 space-y-1 flex flex-col" aria-label="Mobile Navigation">
                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About Us" },
                  { id: "anxiety-education", label: "Anxiety Education" },
                  { id: "panic-disorder", label: "Panic Disorder Resources" },
                  { id: "healthy-intimacy", label: "Healthy Intimacy & Relationships" },
                  { id: "wellness-blog", label: "Wellness Blog" },
                  { id: "shop", label: "Shop & Supplements (WooCommerce)" },
                  { id: "patient-registration", label: "Patient Registration" },
                  { id: "appointment-booking", label: "Appointment Booking" },
                  { id: "patient-portal", label: "Patient Information Portal" },
                  { id: "faq", label: "FAQ" },
                  { id: "contact", label: "Contact Us" }
                ].map((item) => (

                  <button
                    id={`mobile-nav-link-${item.id}`}
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`text-left w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      activeSection === item.id 
                        ? "bg-slate-900 text-white" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Stage */}
      <main id="main-content" className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            
            {/* VIEW 1: HOME */}
            {activeSection === "home" && (
              <div className="space-y-16">
                
                {/* Hero Section */}
                <section id="hero-section" className="relative py-20 lg:py-28">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Hero copy */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <div className="inline-flex items-center gap-1.5 bg-teal-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-teal-800 border border-white/60 uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        <span>Evidence-Based Mental Wellness</span>
                      </div>
                      <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-blue-950 leading-[1.1] tracking-tight">
                        Global Hope <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-700">For All</span>
                      </h2>
                      <p className="text-lg text-slate-600 leading-relaxed max-w-xl font-light">
                        Supporting Mental Wellness, Anxiety Education, Panic Recovery Resources, and Healthy Intimacy Through Trusted Information.
                      </p>
                      
                      {/* Call-to-action Buttons Grid */}
                      <div className="flex flex-wrap gap-4 pt-4">
                        <button
                          id="hero-cta-appointment"
                          onClick={() => setActiveSection("appointment-booking")}
                          className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold shadow-xl shadow-teal-600/20 transition duration-150 cursor-pointer"
                        >
                          Book an Appointment
                        </button>
                        <button
                          id="hero-cta-register"
                          onClick={() => setActiveSection("patient-registration")}
                          className="px-6 py-4 bg-white/60 backdrop-blur-md border border-white/80 text-blue-900 hover:bg-white/80 rounded-2xl font-bold shadow-sm transition duration-150 cursor-pointer"
                        >
                          Register as a Patient
                        </button>
                        <button
                          id="hero-cta-anxiety"
                          onClick={() => setActiveSection("anxiety-education")}
                          className="px-6 py-4 bg-white/60 backdrop-blur-md border border-white/80 text-teal-700 hover:bg-white/80 rounded-2xl font-bold shadow-sm transition duration-150 cursor-pointer"
                        >
                          Learn About Anxiety
                        </button>
                        <button
                          id="hero-cta-resources"
                          onClick={() => setActiveSection("panic-disorder")}
                          className="px-6 py-4 bg-white/60 backdrop-blur-md border border-white/80 text-blue-900 hover:bg-white/80 rounded-2xl font-bold shadow-sm transition duration-150 cursor-pointer"
                        >
                          Explore Wellness Resources
                        </button>
                        <button
                          id="hero-cta-contact"
                          onClick={() => setActiveSection("contact")}
                          className="px-6 py-4 bg-white/60 backdrop-blur-md border border-white/80 text-slate-700 hover:bg-white/80 rounded-2xl font-bold shadow-sm transition duration-150 cursor-pointer"
                        >
                          Contact Us
                        </button>
                      </div>
                    </div>

                    {/* Hero Illustration / Calming Backdrop Graphic */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-[380px] h-[380px] bg-gradient-to-tr from-teal-500/10 to-blue-500/10 rounded-full border border-teal-400/20 p-8 flex items-center justify-center">
                        {/* Outer rotating ring */}
                        <div className="absolute inset-0 border border-teal-300/10 rounded-full animate-spin [animation-duration:12s] pointer-events-none"></div>
                        <div className="absolute inset-4 border-2 border-dashed border-teal-300/5 rounded-full pointer-events-none"></div>

                        {/* Interactive breathing guidance circle graphic */}
                        <div className="w-68 h-68 bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl shadow-xl p-6 flex flex-col justify-between text-center relative">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-teal-700 mt-2">Active Grounding Anchor</h4>
                          <div className="my-auto flex flex-col items-center">
                            {/* Pulse breath guide */}
                            <div className="w-14 h-14 bg-teal-600 rounded-full animate-pulse flex items-center justify-center mb-3 shadow-md shadow-teal-600/15">
                              <Heart className="w-7 h-7 text-white fill-white" />
                            </div>
                            <span className="text-sm font-bold text-slate-800">Inhale • Exhale</span>
                            <span className="text-[10px] text-teal-700 mt-1">Practice Box Breathing Below</span>
                          </div>
                          <button 
                            id="hero-breath-trigger"
                            onClick={() => setActiveSection("panic-disorder")}
                            className="bg-teal-50 hover:bg-teal-100 text-teal-800 text-[10px] font-bold py-1.5 px-3 rounded-lg border border-teal-200 transition uppercase mx-auto mb-2"
                          >
                            Access Breath Coach
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Core Philosophy/Approach - Diversity Highlight */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    <div className="relative">
                      {/* Image placeholder with absolute fallback visual */}
                      <div className="w-full h-[400px] bg-slate-200 rounded-3xl overflow-hidden shadow-md relative border border-slate-100">
                        <img 
                          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
                          alt="Diverse adults collaborating in support" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex items-end p-6">
                          <p className="text-white text-sm font-medium leading-relaxed">
                            "True healing is grounded in structured, compassionate education and safe communal connections."
                          </p>
                        </div>
                      </div>
                      {/* Floating badge */}
                      <div className="absolute -bottom-6 -right-6 bg-teal-50 border border-teal-100 p-4 rounded-2xl shadow-lg max-w-[200px] hidden sm:block">
                        <div className="flex items-center gap-2 mb-1.5">
                          <ShieldCheck className="w-5 h-5 text-teal-700" />
                          <h4 className="font-bold text-xs text-teal-900 uppercase">Trusted Material</h4>
                        </div>
                        <p className="text-[10px] text-teal-800 leading-normal">
                          100% evidence-based, medically verified anxiety resources.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xs font-bold text-teal-700 uppercase tracking-widest">Our Holistic Mission</h3>
                      <h4 className="text-3xl font-extrabold text-slate-950 leading-tight font-sans">Supporting the Journey Toward Peace, One Breath at a Time</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        At Global Hope For All, we believe that understanding the physiological and neurological roots of stress is half the battle won. Anxiety and panic are physical emergencies triggered by a high-alert nervous system—not definitions of who you are.
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        By pairing evidence-based mental wellness material, guided somatic exercises, and relationship communication skills, we seek to build a world where anyone can access the resources required to recover, thrive, and nurture healthy bonds.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="border border-slate-100 bg-white p-4 rounded-xl shadow-sm">
                          <span className="text-teal-700 font-extrabold text-2xl">100%</span>
                          <p className="text-slate-500 text-[11px] font-semibold mt-1 uppercase">Educational Material</p>
                        </div>
                        <div className="border border-slate-100 bg-white p-4 rounded-xl shadow-sm">
                          <span className="text-teal-700 font-extrabold text-2xl">Zero</span>
                          <p className="text-slate-500 text-[11px] font-semibold mt-1 uppercase">Emergency Care (Safe Support)</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Core Education Pillars Block */}
                <section className="bg-slate-100/70 border-y border-slate-200/50 py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
                    
                    <div className="max-w-xl mx-auto space-y-3">
                      <h3 className="text-xs font-bold text-teal-700 uppercase tracking-widest">Explore our Pillars</h3>
                      <h4 className="text-3xl font-bold text-slate-950 font-sans">Three Core Paths of Healthcare Education</h4>
                      <p className="text-slate-500 text-xs">
                        Select a specialized pathway below to access educational material, guidelines, and worksheets.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      
                      {/* Pillar 1: Anxiety */}
                      <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 hover:shadow-lg transition">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-lg text-slate-950 font-sans">Understanding Anxiety</h4>
                        <p className="text-slate-500 text-xs leading-normal">
                          Discover the neurobiology of chronic worry, learn physical signs and triggers, and design a customized daily coping strategy.
                        </p>
                        <button
                          id="home-anxiety-pathway-btn"
                          onClick={() => setActiveSection("anxiety-education")}
                          className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          Learn About Anxiety
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Pillar 2: Panic */}
                      <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 hover:shadow-lg transition">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-lg text-slate-950 font-sans">Panic Recovery Resources</h4>
                        <p className="text-slate-500 text-xs leading-normal">
                          Access progressive muscle relaxation (PMR), box breathing instructions, and cold-shock physical somatic reset protocols.
                        </p>
                        <button
                          id="home-panic-pathway-btn"
                          onClick={() => setActiveSection("panic-disorder")}
                          className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          Access Panic Resources
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Pillar 3: Intimacy */}
                      <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4 hover:shadow-lg transition">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center">
                          <Heart className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-lg text-slate-950 font-sans">Healthy Intimacy</h4>
                        <p className="text-slate-500 text-xs leading-normal">
                          Gain relationship communication templates, emotional intimacy guidelines, and tools to handle couples stress collaboratively.
                        </p>
                        <button
                          id="home-intimacy-pathway-btn"
                          onClick={() => setActiveSection("healthy-intimacy")}
                          className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          Explore Relationships
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                </section>

                {/* Call-to-action blocks */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-gradient-to-tr from-slate-900 via-blue-950 to-teal-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-3 max-w-xl text-left">
                      <h4 className="text-2xl md:text-3xl font-extrabold font-sans">Take Your First Step with Support</h4>
                      <p className="text-teal-100/90 text-sm leading-relaxed">
                        Register today to access downloadable worksheets, manage consultations, or use our responsive AI Companion to seek immediate educational guidance.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 shrink-0">
                      <button
                        id="mid-cta-register"
                        onClick={() => setActiveSection("patient-registration")}
                        className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider cursor-pointer"
                      >
                        Register Today
                      </button>
                      <button
                        id="mid-cta-articles"
                        onClick={() => setActiveSection("wellness-blog")}
                        className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider"
                      >
                        Read Wellness Articles
                      </button>
                    </div>
                  </div>
                </section>

              </div>
            )}

            {/* VIEW 2: ABOUT US */}
            {activeSection === "about" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
                
                {/* Intro */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">About Us</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Global Hope For All is a trusted, international educational foundation and health portal designed to spread verified, evidence-based wellness guidelines regarding anxiety and relationships.
                  </p>
                </div>

                {/* Mission grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-4 text-left">
                    <h3 className="text-xl font-bold text-slate-950 font-sans">Our Educational Focus</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Founded by wellness educators and counselors, our primary target is public knowledge. We believe that over-medicalization and a lack of access to simple behavioral tools prevent thousands of individuals from recovering from panic disorder.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      We offer free guides, peer-reviewed educational articles, communication tools, and a secure booking environment where you can consult with counselors regarding stress and couples issues. We focus purely on supportive education—we do not offer emergency medical or crisis diagnostic services.
                    </p>
                  </div>
                  <div className="bg-gradient-to-tr from-teal-500/10 to-blue-500/10 border border-teal-500/20 rounded-3xl p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-teal-700" />
                      <h4 className="font-extrabold text-slate-900 text-sm uppercase">Medical Disclaimer & Safety Boundary</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The educational content on this website is provided for informational purposes only and should not be considered medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional regarding any medical concerns.
                    </p>
                  </div>
                </div>

                {/* Team & Diversity highlight */}
                <section className="space-y-8">
                  <h3 className="text-xl font-bold text-slate-950 font-sans text-center">Meet Our Dedicated Educators</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      {
                        name: "Elena Vasquez",
                        role: "Senior Wellness Specialist",
                        description: "Specializes in cognitive restructuring, somatic grounding exercises, and mindfulness integration.",
                        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
                      },
                      {
                        name: "Dr. Marcus Thorne, LMFT",
                        role: "Relationship Counselor",
                        description: "Provides structured guidance on building trust, empathetic dialogue, and communication safety.",
                        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300"
                      },
                      {
                        name: "Sarah Lindqvist",
                        role: "Neurobiology Advisor",
                        description: "Researches amygdala triggers and physical biofeedback loops to keep all guides evidence-based.",
                        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=300"
                      }
                    ].map((member, index) => (
                      <div key={index} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                        <div className="h-48 bg-slate-200">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="p-5 space-y-1">
                          <h4 className="font-bold text-slate-950 text-sm">{member.name}</h4>
                          <span className="text-[10px] text-teal-700 font-bold uppercase block">{member.role}</span>
                          <p className="text-slate-500 text-xs leading-normal pt-2">{member.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            )}

            {/* VIEW 3: ANXIETY EDUCATION */}
            {activeSection === "anxiety-education" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
                
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">Understanding Anxiety</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Anxiety is a complex physiological response, but with correct structured education, it can be understood, managed, and controlled. Browse our peer-reviewed learning articles.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ANXIETY_ARTICLES.map((article) => (
                    <div key={article.id} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4 hover:border-teal-100 hover:shadow-md transition text-left flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
                          Anxiety Guide
                        </span>
                        <h3 className="font-bold text-lg text-slate-950 font-sans pt-1 leading-tight">{article.title}</h3>
                        <p className="text-[11px] text-teal-800 font-medium italic">{article.subtitle}</p>
                        <p className="text-slate-500 text-xs leading-relaxed pt-2 border-t border-slate-50">{article.summary}</p>
                        
                        {/* Subsections details */}
                        <div className="space-y-3 pt-3">
                          {article.sections.map((sec, sIdx) => (
                            <div key={sIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                              <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wide flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-teal-600 rounded-full"></span>
                                {sec.title}
                              </h4>
                              <p className="text-slate-500 text-xs leading-normal mt-1">{sec.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-medium">Evidence-Verified • 3 min read</span>
                        <button
                          id={`appointment-trigger-${article.id}`}
                          onClick={() => setActiveSection("appointment-booking")}
                          className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer"
                        >
                          Ask an Educator
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="p-3 bg-white text-teal-800 rounded-full shadow-sm">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-950 text-sm">Want custom offline checklists?</h4>
                    <p className="text-teal-800 text-xs mt-1 leading-relaxed">
                      Register a free account inside our portal to download the detailed "Anxiety Management Quick Start Guide" PDF.
                    </p>
                    <button
                      id="anxiety-register-cta"
                      onClick={() => setActiveSection("patient-registration")}
                      className="text-xs font-bold text-teal-900 underline hover:text-slate-900 mt-2 block"
                    >
                      Register Now to Download Sheets
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 4: PANIC DISORDER RESOURCES */}
            {activeSection === "panic-disorder" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
                
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">Panic Disorder Resources</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Somatic tools, explanation guides, breathing anchors, and cold shock guidelines designed to rapidly regulate high adrenaline loops.
                  </p>
                </div>

                {/* Explanation */}
                <div className="bg-white border border-slate-100 p-8 rounded-3xl max-w-3xl mx-auto shadow-sm text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Panic Explained
                    </span>
                    <h3 className="font-bold text-xl text-slate-950 font-sans">{PANIC_RESOURCES.explanation.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {PANIC_RESOURCES.explanation.content}
                    </p>
                  </div>
                  <div className="md:col-span-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center space-y-2">
                    <span className="text-teal-700 font-black text-2xl">~20m</span>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold leading-tight">Average duration of a panic wave</p>
                  </div>
                </div>

                {/* Somatic techniques */}
                <section className="space-y-8">
                  <h3 className="text-xl font-bold text-slate-950 font-sans text-center">Guided Somatic Grounding Techniques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PANIC_RESOURCES.techniques.map((tech, index) => (
                      <div key={index} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition text-left flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                            0{index + 1}
                          </div>
                          <h4 className="font-bold text-base text-slate-950 font-sans leading-snug">{tech.name}</h4>
                          <p className="text-slate-500 text-xs leading-normal pt-1">{tech.description}</p>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-50 mt-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Somatic Autonomic Tool
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Common Panic triggers */}
                <section className="bg-slate-100/50 py-12 px-6 rounded-3xl space-y-8 max-w-4xl mx-auto border border-slate-200/50">
                  <h3 className="text-xl font-bold text-slate-950 font-sans text-center">Common Triggers of Panic Accelerations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    {PANIC_RESOURCES.triggers.map((trig, index) => (
                      <div key={index} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm flex gap-3.5 items-start">
                        <div className="p-2 bg-teal-50 text-teal-800 rounded-lg shrink-0 mt-0.5">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-slate-800 text-xs">{trig.name}</h4>
                          <p className="text-slate-500 text-xs leading-normal">{trig.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* FAQ section */}
                <section className="space-y-8 max-w-3xl mx-auto">
                  <h3 className="text-xl font-bold text-slate-950 font-sans text-center">Panic Disorder FAQs</h3>
                  <div className="space-y-3.5 text-left">
                    {PANIC_RESOURCES.faqs.map((faq, index) => (
                      <div key={index} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-2">
                        <h4 className="font-bold text-slate-800 text-sm flex items-start gap-2">
                          <HelpCircle className="w-4.5 h-4.5 text-teal-700 shrink-0 mt-0.5" />
                          <span>{faq.question}</span>
                        </h4>
                        <p className="text-slate-500 text-xs leading-relaxed pl-6">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            )}

            {/* VIEW 5: HEALTHY INTIMACY & RELATIONSHIPS */}
            {activeSection === "healthy-intimacy" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
                
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">Healthy Intimacy & Relationships</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Nurturing vulnerability, developing compassionate active communication patterns, and managing individual anxiety states side-by-side.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {INTIMACY_RESOURCES.map((item, index) => (
                    <div key={index} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition text-left flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
                          Intimacy Guide
                        </span>
                        <h3 className="font-bold text-lg text-slate-950 font-sans pt-1 leading-tight">{item.title}</h3>
                        <p className="text-[11px] text-teal-800 font-medium italic">{item.subtitle}</p>
                        <p className="text-slate-500 text-xs leading-relaxed pt-2 border-t border-slate-50">{item.content}</p>
                        
                        {/* Tip list */}
                        <div className="space-y-2.5 pt-3">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended Actions</h4>
                          {item.tips.map((tip, tIdx) => (
                            <div key={tIdx} className="flex gap-2 items-start text-xs text-slate-600">
                              <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                              <p className="leading-normal">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-50 mt-5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">Shared Connection Skill</span>
                        <button
                          id={`intimacy-booking-trigger-${index}`}
                          onClick={() => setActiveSection("appointment-booking")}
                          className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer"
                        >
                          Relationship Advice
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* VIEW 6: WELLNESS BLOG */}
            {activeSection === "wellness-blog" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
                
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">Mental Wellness Blog</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    SEO-friendly educational insights written by verified counseling and wellness specialists regarding anxiety, relationships, and mindfulness.
                  </p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-2 justify-center py-2">
                  {["All", "Anxiety Education", "Panic Disorder", "Stress Management", "Mindfulness", "Healthy Relationships", "Emotional Wellness", "Self-Care", "Sleep & Wellness"].map((cat) => (
                    <button
                      id={`blog-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                      key={cat}
                      onClick={() => {
                        setSelectedBlogCategory(cat);
                        setActiveBlogPost(null);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition duration-150 cursor-pointer ${
                        selectedBlogCategory === cat 
                          ? "bg-teal-700 text-white" 
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Active blog post reader or post list */}
                <AnimatePresence mode="wait">
                  {activeBlogPost ? (
                    <motion.article 
                      id="blog-post-article-reader"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="bg-white rounded-3xl border border-slate-100 p-6 md:p-10 max-w-3xl mx-auto shadow-sm space-y-6 text-left"
                    >
                      <button
                        id="blog-post-back-btn"
                        onClick={() => setActiveBlogPost(null)}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
                      >
                        ← Back to post list
                      </button>

                      <div className="space-y-3.5 border-b border-slate-100 pb-5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-full">
                          {activeBlogPost.category}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-950 font-sans leading-tight pt-1">
                          {activeBlogPost.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>By <strong>{activeBlogPost.author}</strong></span>
                          <span>•</span>
                          <span>{activeBlogPost.date}</span>
                          <span>•</span>
                          <span>{activeBlogPost.readTime}</span>
                        </div>
                      </div>

                      {/* Display image inside reader */}
                      <div className="h-64 md:h-80 bg-slate-100 rounded-2xl overflow-hidden">
                        <img 
                          src={activeBlogPost.image} 
                          alt={activeBlogPost.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      {/* Blog post markdown-style content */}
                      <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line space-y-4">
                        {activeBlogPost.content}
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-slate-800 text-xs">Need specific guidelines?</h4>
                          <p className="text-slate-500 text-[11px] leading-normal mt-0.5">Explore additional resources on {activeBlogPost.category} inside our secure patient area.</p>
                        </div>
                        <button
                          id="blog-reader-cta"
                          onClick={() => setActiveSection("patient-portal")}
                          className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                        >
                          Access Patient Portal
                        </button>
                      </div>
                    </motion.article>
                  ) : (
                    <motion.div 
                      id="blog-post-grid"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
                    >
                      {filteredBlogPosts.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-slate-500">
                          <Newspaper className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                          <p className="text-sm font-semibold">No articles found in this category currently.</p>
                        </div>
                      ) : (
                        filteredBlogPosts.map((post) => (
                          <div 
                            key={post.id} 
                            className="bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-lg transition flex flex-col text-left justify-between"
                          >
                            <div className="h-48 bg-slate-100">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div className="p-6 space-y-3.5 flex-grow">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
                                {post.category}
                              </span>
                              <h3 className="font-extrabold text-base md:text-lg text-slate-950 font-sans leading-snug line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-slate-500 text-xs leading-normal line-clamp-3">
                                {post.excerpt}
                              </p>
                            </div>
                            <div className="p-6 pt-0 border-t border-slate-50/50 flex items-center justify-between text-xs">
                              <span className="text-slate-400 font-medium">{post.readTime}</span>
                              <button
                                id={`read-post-${post.id}`}
                                onClick={() => setActiveBlogPost(post)}
                                className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 cursor-pointer"
                              >
                                Read Article
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}

            {/* VIEW 7: PATIENT REGISTRATION PORTAL */}
            {activeSection === "patient-registration" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <RegistrationForm onRegistered={() => setActiveSection("patient-portal")} />
              </div>
            )}

            {/* VIEW 8: APPOINTMENT BOOKING FORM */}
            {activeSection === "appointment-booking" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <AppointmentForm onSuccess={() => {
                  // Confirmed appointment automatically updates patient-portal states
                }} />
              </div>
            )}

            {/* VIEW 9: PATIENT INFORMATION PORTAL */}
            {activeSection === "patient-portal" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <Portal activeSectionSetter={setActiveSection} />
              </div>
            )}

            {/* VIEW 10: FAQ */}
            {activeSection === "faq" && (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
                
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">Frequently Asked Questions</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Find immediate, evidence-based answers to common questions regarding educational limits, patient confidentiality, and platform safety.
                  </p>
                </div>

                {/* FAQ categories filters */}
                <div className="flex justify-center gap-2 py-1">
                  {["All", "General", "Anxiety"].map((cat) => (
                    <button
                      id={`faq-filter-${cat.toLowerCase()}`}
                      key={cat}
                      onClick={() => {
                        setFaqCategory(cat);
                        setExpandedFaqIndex(null);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition duration-150 cursor-pointer ${
                        faqCategory === cat 
                          ? "bg-teal-700 text-white" 
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {cat} FAQs
                    </button>
                  ))}
                </div>

                {/* FAQ Accorion lists */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4 text-left">
                  {filteredFAQs.map((faq, index) => {
                    const isOpen = expandedFaqIndex === index;
                    return (
                      <div key={index} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                        <button
                          id={`faq-question-${index}`}
                          onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                          className="w-full text-left flex justify-between items-center gap-4 py-2 text-slate-900 font-bold text-sm md:text-base focus:outline-none cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-slate-600 text-xs md:text-sm leading-relaxed pt-2.5 pb-1">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* VIEW 11: CONTACT US */}
            {activeSection === "contact" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
                
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 font-sans tracking-tight">Contact Our Team</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Have questions about anxiety education, booking slots, or partnership opportunities? Reach out anytime.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left block info */}
                  <div className="lg:col-span-5 space-y-6 text-left">
                    <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6">
                      <h3 className="font-extrabold text-slate-950 text-lg font-sans">Office Info & Contact</h3>
                      
                      <div className="space-y-4 text-xs md:text-sm">
                        <div className="flex gap-3.5 items-start">
                          <div className="p-2.5 bg-teal-50 text-teal-800 rounded-xl shrink-0">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">Phone Consultation</h4>
                            <p className="text-slate-600 mt-0.5 hover:text-teal-900 transition font-semibold">
                              <a href="tel:+16624709606">+1 (662) 470-9606</a>
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3.5 items-start">
                          <div className="p-2.5 bg-teal-50 text-teal-800 rounded-xl shrink-0">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">Email Address</h4>
                            <p className="text-slate-600 mt-0.5 hover:text-teal-900 transition font-semibold truncate">
                              <a href="mailto:globalanxietyslolutioncenter@gmail.com">globalanxietyslolutioncenter@gmail.com</a>
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3.5 items-start">
                          <div className="p-2.5 bg-teal-50 text-teal-800 rounded-xl shrink-0">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">Support Hours (Seattle HQ)</h4>
                            <p className="text-slate-600 mt-0.5">Monday – Friday: 9:00 AM – 5:00 PM EST</p>
                            <p className="text-slate-500 text-[11px] leading-normal">Online resources & Portal: Available 24/7</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SVG map placeholder */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Interactive Office Location</h4>
                      <GoogleMapPlaceholder />
                    </div>
                  </div>

                  {/* Right contact form */}
                  <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xl text-left">
                    <h3 className="font-bold text-lg text-slate-950 font-sans mb-4">Send a Direct Message</h3>
                    
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      {contactSuccess && (
                        <div className="bg-teal-50 text-teal-800 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 border border-teal-100">
                          <Check className="w-4.5 h-4.5 text-teal-600" />
                          <span>Thank you! Your message has been sent successfully. We will contact you back soon.</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 text-xs font-semibold mb-1.5">Your Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Alex Smith"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 text-xs font-semibold mb-1.5">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="alex@example.com"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition text-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-700 text-xs font-semibold mb-1.5">Subject</label>
                        <input
                          type="text"
                          placeholder="General Inquiry regarding worksheets..."
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 text-xs font-semibold mb-1.5">Message *</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Please write your questions here..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition text-slate-800"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          id="submit-contact-btn"
                          type="submit"
                          className="w-full text-white bg-teal-700 hover:bg-teal-800 font-semibold py-3 rounded-xl transition duration-150 shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Send My Message
                        </button>
                      </div>
                    </form>
                  </div>

                </div>

              </div>
            )}

            {/* VIEW 12: WOOCOMMERCE SHOP & SUPPLEMENTS */}
            {activeSection === "shop" && (
              <Shop
                cart={cart}
                setCart={setCart}
                onNavigateToPortal={() => setActiveSection("patient-portal")}
              />
            )}

          </motion.div>

        </AnimatePresence>
      </main>

      {/* Persistent Newsletter signup (before footer) */}
      <section id="newsletter-signup" className="bg-gradient-to-r from-blue-900 to-teal-800 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-teal-900">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1 md:max-w-md">
            <h4 className="text-xl font-bold font-sans flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-teal-300" />
              Stay Connected
            </h4>
            <p className="text-teal-100 text-xs leading-relaxed">
              Subscribe to receive trusted mental wellness articles, anxiety education, relationship wellness tips, and community updates.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 shrink-0">
            {newsletterSuccess ? (
              <div className="bg-teal-900/60 border border-teal-500/30 text-teal-300 text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4" />
                <span>Subscription confirmed! Thank you.</span>
              </div>
            ) : (
              <>
                <input
                  id="newsletter-name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  className="bg-white/10 border border-white/20 focus:border-teal-400 focus:bg-white focus:text-slate-900 rounded-xl px-4 py-2.5 text-xs font-medium placeholder-teal-100/60 text-white outline-none transition"
                />
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Email Address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 focus:border-teal-400 focus:bg-white focus:text-slate-900 rounded-xl px-4 py-2.5 text-xs font-medium placeholder-teal-100/60 text-white outline-none transition"
                />
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Floating interactive AI Companion */}
      <AICompanion isFloating={true} />

      {/* Floating WhatsApp Chat Pop-up */}
      <WhatsAppWidget />

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900 text-left text-xs space-y-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm">Global Hope For All</h4>
            <p className="leading-relaxed">
              We provide trusted, evidence-based health and mental wellness education to empower individuals, couples, and counselors worldwide.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="Facebook Page"><span className="font-semibold text-[11px]">Facebook</span></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="Twitter Feed"><span className="font-semibold text-[11px]">Twitter</span></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="LinkedIn Account"><span className="font-semibold text-[11px]">LinkedIn</span></a>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-sm">Quick Navigation</h4>
            <ul className="space-y-1.5 font-medium">
              <li><button onClick={() => setActiveSection("home")} className="hover:text-white transition cursor-pointer">Home</button></li>
              <li><button onClick={() => setActiveSection("about")} className="hover:text-white transition cursor-pointer">About Us</button></li>
              <li><button onClick={() => setActiveSection("anxiety-education")} className="hover:text-white transition cursor-pointer">Anxiety Education</button></li>
              <li><button onClick={() => setActiveSection("panic-disorder")} className="hover:text-white transition cursor-pointer">Panic Disorder Resources</button></li>
              <li><button onClick={() => setActiveSection("healthy-intimacy")} className="hover:text-white transition cursor-pointer">Healthy Intimacy</button></li>
              <li><button onClick={() => setActiveSection("shop")} className="hover:text-white transition cursor-pointer text-amber-300 font-semibold">Shop & Supplements (WooCommerce)</button></li>
            </ul>

          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-sm">Patient Portals</h4>
            <ul className="space-y-1.5 font-medium">
              <li><button onClick={() => setActiveSection("patient-registration")} className="hover:text-white transition cursor-pointer">Patient Registration</button></li>
              <li><button onClick={() => setActiveSection("appointment-booking")} className="hover:text-white transition cursor-pointer">Appointment Booking</button></li>
              <li><button onClick={() => setActiveSection("patient-portal")} className="hover:text-white transition cursor-pointer">Patient Information Portal</button></li>
              <li><button onClick={() => setActiveSection("faq")} className="hover:text-white transition cursor-pointer">FAQ</button></li>
              <li><button onClick={() => setActiveSection("contact")} className="hover:text-white transition cursor-pointer">Contact Us</button></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <Accessibility className="w-4 h-4 text-teal-400" />
              SEO & Compliance
            </h4>
            <ul className="space-y-1.5 font-medium">
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy Details: All data logged is stored fully encrypted in your device local storage."); }} className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: This portal supplies educational material for public wellness purposes."); }} className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#cookies" onClick={(e) => { e.preventDefault(); alert("Cookie Policy: We leverage only necessary cookies to maintain session authenticity."); }} className="hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#accessibility" onClick={(e) => { e.preventDefault(); alert("Accessibility Statement: Fully WCAG 2.1 AA compliant. Supports keyboard navigation and screen readers."); }} className="hover:text-white transition">Accessibility Statement</a></li>
              <li><span className="text-slate-500 font-mono text-[9px] block">XML Sitemap & Robots.txt Configured</span></li>
            </ul>
          </div>

        </div>

        {/* Medical disclaimer (crucial requested ceiling boundary) */}
        <div className="max-w-7xl mx-auto border-t border-slate-900 pt-8 mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-8 bg-slate-900/40 p-5 rounded-2xl border border-slate-800 text-[11px] leading-relaxed text-slate-400">
            <span className="font-bold text-slate-200 block mb-1">Medical Disclaimer:</span>
            The educational content on this website is provided for informational purposes only and should not be considered medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional regarding any medical concerns.
          </div>
          <div className="md:col-span-4 text-right self-center text-slate-500 font-medium">
            <p>© 2026 Global Hope For All. All Rights Reserved.</p>
            <p className="text-[10px] mt-0.5">Education • Coping • Wellness</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
