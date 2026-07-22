import React, { useState } from "react";
import { 
  Newspaper, ArrowRight, ExternalLink, BookOpen, Sparkles, 
  Search, Tag, ShieldCheck, Bookmark, Share2, Info, ArrowLeft,
  CheckCircle2, ShoppingBag, Calendar, User, Eye, Link2
} from "lucide-react";
import { BlogPost, KeywordHighlight, FurtherReadingLink } from "../types";
import { BLOG_POSTS } from "../data";

interface BlogSectionProps {
  onNavigateSection: (sectionId: string) => void;
}

export default function BlogSection({ onNavigateSection }: BlogSectionProps) {
  const [activeBlogPost, setActiveBlogPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedKeywordModal, setSelectedKeywordModal] = useState<KeywordHighlight | null>(null);

  const categories = ["All", "Self-Care", "Healthy Relationships", "Panic Disorder", "Mindfulness"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Helper to render text with highlighted keywords embedded
  const renderContentWithHighlightedKeywords = (post: BlogPost) => {
    if (!post.keywords || post.keywords.length === 0) {
      return post.content;
    }

    // Split content into paragraphs or headers
    const paragraphs = post.content.split("\n\n");

    return (
      <div className="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
        {paragraphs.map((para, idx) => {
          if (para.startsWith("### ")) {
            return (
              <h3 key={idx} className="text-xl md:text-2xl font-black text-slate-950 pt-4 font-sans leading-tight">
                {para.replace("### ", "")}
              </h3>
            );
          }

          // Replace occurrences of keywords with interactive highlights
          let elements: (string | React.ReactNode)[] = [para];

          post.keywords?.forEach((kwObj) => {
            const keywordRegex = new RegExp(`(${kwObj.keyword})`, "gi");
            const newElements: (string | React.ReactNode)[] = [];

            elements.forEach((elem) => {
              if (typeof elem !== "string") {
                newElements.push(elem);
                return;
              }

              const parts = elem.split(keywordRegex);
              parts.forEach((part, pIdx) => {
                if (part.toLowerCase() === kwObj.keyword.toLowerCase()) {
                  newElements.push(
                    <button
                      key={`${idx}-${kwObj.keyword}-${pIdx}`}
                      onClick={() => setSelectedKeywordModal(kwObj)}
                      className="inline-flex items-center gap-1 bg-amber-100/90 hover:bg-amber-200 text-amber-950 font-bold px-2 py-0.5 rounded-md border border-amber-300/70 shadow-2xs transition cursor-pointer mx-1 my-0.5 group"
                      title={`Click to read definition & further reading for ${kwObj.keyword}`}
                    >
                      <span>{part}</span>
                      <Link2 className="w-3 h-3 text-amber-700 group-hover:scale-110 transition-transform" />
                    </button>
                  );
                } else {
                  newElements.push(part);
                }
              });
            });

            elements = newElements;
          });

          return (
            <p key={idx} className="leading-relaxed font-light text-slate-700">
              {elements}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-left font-sans">
      
      {/* BLOG HEADER */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-teal-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Newspaper className="w-3.5 h-3.5 text-teal-400" />
            <span>Evidence-Based Articles & Peer-Reviewed References</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-sans">
            Wellness & Mental Health Articles
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Explore deep-dive articles on anxiety management, panic neurobiology, couples intimacy, and mindfulness. Every article features highlighted keywords and verified further reading research links.
          </p>
        </div>
      </div>

      {/* READER OR GRID MODE */}
      {activeBlogPost ? (
        /* ARTICLE READER MODE */
        <article className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 max-w-4xl mx-auto shadow-md space-y-8 animate-in fade-in duration-200">
          
          {/* Back Button */}
          <button
            id="blog-back-to-list-btn"
            onClick={() => setActiveBlogPost(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Wellness Articles</span>
          </button>

          {/* Article Title & Meta */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1 rounded-full inline-block">
              {activeBlogPost.category}
            </span>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 font-sans leading-snug">
              {activeBlogPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-teal-600" /> {activeBlogPost.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {activeBlogPost.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-slate-400" /> {activeBlogPost.readTime}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="h-64 sm:h-96 bg-slate-100 rounded-3xl overflow-hidden shadow-inner">
            <img 
              src={activeBlogPost.image} 
              alt={activeBlogPost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* KEYWORD HIGHLIGHT TIP BAR */}
          <div className="bg-amber-50/90 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold">Interactive Keywords Highlighted: </span>
              Key clinical terms throughout this article are highlighted in gold badges (<span className="bg-amber-200 px-1.5 py-0.5 rounded font-bold text-amber-950">like this</span>). Click any highlighted term to view its medical definition and embedded further reading links!
            </div>
          </div>

          {/* Article Main Body Content */}
          <div className="pt-2">
            {renderContentWithHighlightedKeywords(activeBlogPost)}
          </div>

          {/* KEYWORDS SUMMARY & GLOSSARY BOX */}
          {activeBlogPost.keywords && activeBlogPost.keywords.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <Tag className="w-4 h-4 text-teal-700" />
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                  Highlighted Keywords & Quick Definitions
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeBlogPost.keywords.map((kw, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedKeywordModal(kw)}
                    className="bg-white border border-slate-200 p-3.5 rounded-2xl hover:border-amber-400 hover:shadow-md transition cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900 group-hover:text-amber-700 flex items-center gap-1">
                        ⭐ {kw.keyword}
                      </span>
                      <span className="text-[10px] text-teal-700 font-bold underline">Read Link</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal line-clamp-2 font-light">
                      {kw.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FURTHER READING & REFERENCED RESEARCH LINKS */}
          {activeBlogPost.furtherReading && activeBlogPost.furtherReading.length > 0 && (
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-lg">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="font-black text-base text-white font-sans uppercase tracking-wider">
                    Further Reading & Referenced Authorities
                  </h3>
                  <p className="text-xs text-slate-300 font-light mt-0.5">
                    Explore internal clinical guides, shop supplements, and external peer-reviewed publications.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {activeBlogPost.furtherReading.map((link, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 hover:border-teal-400/50 hover:bg-white/10 p-4 rounded-2xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-2 py-0.5 rounded-full border border-teal-500/30">
                          {link.source}
                        </span>
                        {link.isExternal && (
                          <span className="text-[10px] text-amber-300 font-mono">External Research</span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-sm text-white group-hover:text-teal-300 transition">
                        {link.title}
                      </h4>
                      {link.description && (
                        <p className="text-xs text-slate-300 leading-normal font-light">
                          {link.description}
                        </p>
                      )}
                    </div>

                    {link.isExternal ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-600 hover:bg-teal-500 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shrink-0 transition cursor-pointer"
                      >
                        <span>Open Research</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          if (link.targetSection) {
                            onNavigateSection(link.targetSection);
                          }
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shrink-0 transition cursor-pointer"
                      >
                        <span>Read Resource</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Footer Action Box */}
          <div className="bg-teal-50 border border-teal-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Have questions about this topic?</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Book a confidential wellness consultation or browse our WooCommerce shop for supplements.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateSection("shop")}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
              >
                Browse Shop
              </button>
              <button
                onClick={() => onNavigateSection("appointment-booking")}
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>

        </article>
      ) : (
        /* BLOG POST GRID MODE */
        <div className="space-y-6">
          
          {/* Controls Bar: Category Filter & Search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search articles, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-52 bg-slate-100 relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-extrabold text-lg text-slate-950 leading-snug group-hover:text-teal-700 transition">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Show keyword badges preview */}
                    {post.keywords && post.keywords.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {post.keywords.map((kw, k) => (
                          <span
                            key={k}
                            className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md"
                          >
                            ⭐ {kw.keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs pt-4 mt-2">
                  <span className="text-slate-400 font-medium">{post.readTime}</span>
                  <button
                    onClick={() => setActiveBlogPost(post)}
                    className="bg-teal-700 hover:bg-teal-800 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* KEYWORD DEFINITION POPUP MODAL */}
      {selectedKeywordModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 text-left">
            <button
              onClick={() => setSelectedKeywordModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full p-1.5 cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Medical Keyword Definition</span>
            </div>

            <h3 className="text-xl font-black text-slate-950 font-sans">
              {selectedKeywordModal.keyword}
            </h3>

            <p className="text-xs text-slate-700 leading-relaxed font-light bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {selectedKeywordModal.definition}
            </p>

            <div className="pt-2 flex justify-end gap-2">
              {selectedKeywordModal.externalUrl ? (
                <a
                  href={selectedKeywordModal.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Open Clinical Research</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : selectedKeywordModal.targetSection ? (
                <button
                  onClick={() => {
                    const sec = selectedKeywordModal.targetSection!;
                    setSelectedKeywordModal(null);
                    onNavigateSection(sec);
                  }}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Go to App Resource</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
