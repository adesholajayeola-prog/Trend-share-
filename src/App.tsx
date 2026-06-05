import React, { useState, useEffect } from 'react';
import { 
  Search, ArrowUp, Calendar, User, Eye, Sparkles, ChevronRight, 
  ChevronLeft, Mail, Check, TrendingUp, 
  ExternalLink, Heart 
} from 'lucide-react';
import { ARTICLES, Article, CategoryType, CATEGORIES, Comment } from './types';
import Navbar from './components/Navbar';
import ArticleDetail from './components/ArticleDetail';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CookieConsent from './components/CookieConsent';

export default function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleSlug, setActiveArticleSlug] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Articles & Comments local modified database states for session persistence
  const [articlesList, setArticlesList] = useState<Article[]>(() => {
    // Attempt local session retrieve
    const cache = sessionStorage.getItem('trendsphere_articles_db');
    return cache ? JSON.parse(cache) : ARTICLES;
  });

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsError, setNewsError] = useState('');
  const [newsSuccess, setNewsSuccess] = useState(false);

  // Back to Top button scroll listener
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track scroll for back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update session cache when articles list modifications are detected
  useEffect(() => {
    sessionStorage.setItem('trendsphere_articles_db', JSON.stringify(articlesList));
  }, [articlesList]);

  // Implement Dark/Light Mode toggle helper
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);



  // -------------------------------------------------------------
  // USER ENGAGEMENT HANDLERS (COMMENTS & INTERACTION)
  // -------------------------------------------------------------

  const handleAddComment = (articleId: string, newComment: Omit<Comment, 'id' | 'date' | 'likes'>) => {
    setArticlesList((prevArticles) => 
      prevArticles.map((art) => {
        if (art.id === articleId) {
          const freshComment: Comment = {
            id: 'c-user-' + Math.random().toString(36).substr(2, 9),
            authorName: newComment.authorName,
            authorEmail: newComment.authorEmail,
            content: newComment.content,
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            likes: 0
          };
          return {
            ...art,
            comments: [freshComment, ...art.comments]
          };
        }
        return art;
      })
    );
  };

  const handleLikeArticle = (articleId: string) => {
    setArticlesList((prevArticles) => 
      prevArticles.map((art) => {
        if (art.id === articleId) {
          return {
            ...art,
            likes: art.likes + 1
          };
        }
        return art;
      })
    );
  };

  const handleSelectArticleDetail = (slug: string) => {
    setActiveArticleSlug(slug);
    setCurrentView('article');
    // Increment specific views count
    setArticlesList((prevArticles) => 
      prevArticles.map((art) => {
        if (art.slug === slug) {
          return { ...art, views: art.views + 1 };
        }
        return art;
      })
    );
  };

  // Newsletter subscription
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsError('Please specify a valid email address.');
      setNewsSuccess(false);
      return;
    }
    setNewsError('');
    setNewsSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsSuccess(false), 5000);
  };

  // -------------------------------------------------------------
  // SEARCH & FILTER MATHEMATICS
  // -------------------------------------------------------------

  const filteredArticles = articlesList.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Extract properties
  const featuredArticle = articlesList.find(a => a.isFeatured) || articlesList[0];
  const trendingArticles = articlesList.filter(a => a.isTrending).slice(0, 3);

  // Pagination bounds
  const articlesPerPage = 4;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIdx = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIdx, startIdx + articlesPerPage);

  // When filters shift, snap page back to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Back-to-Top trigger scroller
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      
      {/* Header element */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Core Router Workspace */}
      <main className="grow">
        
        {currentView === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn" id="home-view-container">
            
            {/* Search Query Status panel */}
            {searchQuery && (
              <div className="bg-sky-50 dark:bg-sky-950/40 p-4 rounded-2xl border border-sky-100 dark:border-sky-900/40 text-left flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Searching active catalogs for:</p>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                    "{searchQuery}" — {filteredArticles.length} matching trends located
                  </h2>
                </div>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-semibold text-sky-500 hover:underline cursor-pointer"
                  id="clear-search-query-btn"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* HERO FEATURED BLOCKS AND SLIDES (Only show if no search queries and on 'All' category and Page 1) */}
            {!searchQuery && selectedCategory === 'All' && currentPage === 1 && (
              <div 
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border-b border-gray-100 dark:border-gray-900/60 pb-12 text-left"
                id="homepage-featured-hero"
              >
                {/* Hero Creative Cover (7 columns) */}
                <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-sm relative h-[320px] md:h-[420px] bg-slate-900 flex flex-col justify-end">
                  <img
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 hover:scale-102 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  {/* Hero Text content floating */}
                  <div className="relative p-6 md:p-8 space-y-3 z-10">
                    <span className="inline-flex bg-sky-500 text-white text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded">
                      Featured Trend
                    </span>
                    <h2 className="text-xl md:text-3xl font-sans font-bold text-white tracking-tight leading-tight">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-300 line-clamp-2 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-gray-400 font-medium pt-1">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 text-sky-400" />
                        {featuredArticle.author.name}
                      </span>
                      <span>• {featuredArticle.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Right hand Featured meta text and dynamic quick summary list (5 columns) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-4">
                    <div className="flex items-center bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded w-fit select-none">
                      Executive Summary
                    </div>
                    <h3 className="text-lg md:text-xl font-sans font-bold text-gray-900 dark:text-white leading-normal">
                      Behind the analysis: Micro-laser direct retinal panels and commercial quantum scalability.
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Silicon-spin qubits are bypassing super-cooled sub-Kelvin setups, making scaled Quantum CPU configurations viable for semiconductor standard foundries. Dive into our tech corridors to trace exact operational metrics.
                    </p>
                  </div>

                  {/* Quick features read button */}
                  <button
                    onClick={() => handleSelectArticleDetail(featuredArticle.slug)}
                    className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-semibold text-xs rounded-2xl shadow-md cursor-pointer hover:bg-sky-500 dark:hover:bg-sky-400 dark:hover:text-white transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
                    id="hero-read-article-btn"
                  >
                    <span>Read Featured Trend</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>



                </div>
              </div>
            )}



            {/* Feed layouts (Left Feed + Right trending / Sidebar widgets) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column Feed (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                <h3 className="text-sm font-mono font-bold tracking-widest text-gray-400 uppercase text-left">
                  {selectedCategory === 'All' ? 'Latest Global Trends' : `${selectedCategory} Trends`}
                </h3>

                {filteredArticles.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/10 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-500">No trends matched your query. Try broad terms like "DeFi", "Quantum", or "Silicon".</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      className="mt-4 px-4 py-2 bg-sky-500 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer focus:outline-none"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                    {paginatedArticles.map((art) => (
                      <div 
                        key={art.id}
                        className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-sky-500/50 dark:hover:border-sky-500/40 hover:shadow-lg transition-smooth flex flex-col justify-between"
                        id={`article-card-${art.id}`}
                      >
                        <div 
                          onClick={() => handleSelectArticleDetail(art.slug)}
                          className="cursor-pointer group flex flex-col h-full"
                        >
                          {/* Image box */}
                          <div className="h-44 bg-slate-900 overflow-hidden relative">
                            <img
                              src={art.imageUrl}
                              alt={art.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 left-3 bg-gray-950/80 text-white text-[9px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                              {art.category}
                            </div>
                          </div>

                          {/* Words and summaries */}
                          <div className="p-4 flex flex-col gap-2 grow">
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-semibold font-mono">
                              <Calendar className="h-3 w-3" />
                              <span>{art.publishedAt}</span>
                              <span>• {art.readTime}</span>
                            </div>

                            <h4 className="text-sm font-sans font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-sky-500 transition-colors">
                              {art.title}
                            </h4>

                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                              {art.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Card bottom details */}
                        <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-900/60 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                          <span>By {art.author.name}</span>
                          <button
                            onClick={() => handleSelectArticleDetail(art.slug)}
                            className="text-sky-500 font-bold hover:underline cursor-pointer flex items-center gap-0.5 focus:outline-none"
                            id={`read-more-${art.id}`}
                          >
                            <span>Explore</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Main Pagination layout row */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-6 font-sans">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-semibold text-gray-500 disabled:opacity-40 select-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none"
                      id="pager-prev-btn"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                      <span>Prev</span>
                    </button>
                    
                    <span className="text-xs font-mono font-bold text-gray-500">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-semibold text-gray-500 disabled:opacity-40 select-none cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none"
                      id="pager-next-btn"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

              </div>

              {/* Right Column Sidebar elements (4 cols) */}
              <div className="lg:col-span-4 space-y-6 text-left">
                
                {/* Popular articles dynamic stream */}
                <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-gray-400 mb-4 flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-sky-500 animate-pulse" />
                    Trending analysis
                  </h3>

                  <div className="space-y-4">
                    {trendingArticles.map((art, idx) => (
                      <button
                        key={art.id}
                        onClick={() => handleSelectArticleDetail(art.slug)}
                        className="flex gap-3 text-left w-full group focus:outline-none cursor-pointer"
                        id={`trending-widget-item-${art.id}`}
                      >
                        <div className="text-xl font-mono text-gray-200 dark:text-gray-800 font-bold shrink-0 pt-0.5 select-none">
                          0{idx + 1}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-500">
                            {art.category}
                          </span>
                          <h4 className="text-xs font-bold font-sans text-gray-900 dark:text-white mt-0.5 line-clamp-2 leading-snug group-hover:text-sky-500 transition-colors">
                            {art.title}
                          </h4>
                          <span className="text-[10px] font-mono text-gray-400 block mt-1">
                            {art.publishedAt}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Newsletter Subscription Box */}
            <div className="bg-gray-50 dark:bg-gray-900/60 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="absolute top-0 right-0 h-40 w-40 bg-sky-500/5 rounded-full blur-3xl"></div>
              <div className="space-y-2 max-w-xl">
                <h3 className="text-lg md:text-xl font-sans font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Mail className="h-5 w-5 text-sky-500" />
                  Weekly Trend Delivery
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Join 42,000 global investors, developers, and writers receiving deep-dive technical summaries directly in their inbox. Free updates, powered by the TrendSphere team.
                </p>
              </div>

              {/* Newsletter Form */}
              <div className="w-full md:w-auto shrink-0 md:min-w-[340px]">
                {newsSuccess ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs bg-emerald-500/15 p-3 rounded-xl border border-emerald-400/20">
                    <Check className="h-5 w-5 shrink-0" />
                    <span>Subscription verified. Look out for dispatch on Monday!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="email"
                        placeholder="E.g. reader@domain.com"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="block w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-gray-950 border border-gray-255 dark:border-gray-800 text-gray-900 dark:text-white focus:border-sky-500 focus:outline-none"
                        id="newsletter-email-input"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer transition-colors shrink-0 focus:outline-none"
                        id="newsletter-submit-btn"
                      >
                        Subscribe
                      </button>
                    </div>
                    {newsError && (
                      <p className="text-[10px] text-rose-500 font-semibold pl-1">{newsError}</p>
                    )}
                  </form>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Core Renders of dynamic subpages */}
        {currentView === 'article' && (
          (() => {
            const activeArt = articlesList.find(a => a.slug === activeArticleSlug);
            if (!activeArt) return <p className="text-center py-12">Article not located.</p>;

            // Select 3 related articles matching same category, excluding the active one
            const related = articlesList
              .filter(a => a.category === activeArt.category && a.id !== activeArt.id)
              .slice(0, 3);

            // Fail-safe: if category suggestions are none. Pick latest other items.
            const fallbackRelated = related.length > 0 
              ? related 
              : articlesList.filter(a => a.id !== activeArt.id).slice(0, 3);

            return (
              <ArticleDetail
                article={activeArt}
                onBack={() => {
                  setCurrentView('home');
                }}
                onSelectArticle={handleSelectArticleDetail}
                relatedArticles={fallbackRelated}
                onAddComment={handleAddComment}
                onLikeArticle={handleLikeArticle}
              />
            );
          })()
        )}

        {currentView === 'about' && (
          <AboutPage />
        )}

        {currentView === 'contact' && (
          <ContactPage />
        )}

      </main>

      {/* Structured Site Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-850 bg-gray-50 dark:bg-gray-950 py-10 text-left transition-smooth font-sans mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Box 1 Logo description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-sans font-bold">
                  T
                </div>
                <span className="font-sans font-bold text-lg text-gray-900 dark:text-white">
                  Trend<span className="text-sky-500">Sphere</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                A premium trend platform summarizing critical advances across technology currents, decentralized finance, global capital allocation, and creative lifestyle paradigms.
              </p>
            </div>

            {/* Box 2 Category Navigation */}
            <div>
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3.5 select-none">
                Channels
              </h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => {
                      setSelectedCategory('All');
                      setCurrentView('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-450 transition-colors focus:outline-none cursor-pointer"
                  >
                    All Channels
                  </button>
                </li>
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCurrentView('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-450 transition-colors focus:outline-none cursor-pointer"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 3 Platform Services */}
            <div>
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3.5 select-none">
                Resources
              </h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-450 transition-colors focus:outline-none cursor-pointer"
                  >
                    Vision & Mission
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentView('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-450 transition-colors focus:outline-none cursor-pointer"
                  >
                    Inquire Partnership
                  </button>
                </li>
              </ul>
            </div>

            {/* Box 4 Copyright / Regulatory transparency */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 select-none">
                High Editorial Standards
              </h5>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed font-sans">
                TrendSphere operates on a mission of high-integrity editorial trends analysis. All shared research or updates are delivered purely for technical preview and educational purposes.
              </p>
              <p className="text-[10px] font-mono text-gray-400">
                © 2026 TrendSphere Networks. All Rights Reserved.
              </p>
            </div>

          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-lg cursor-pointer transition-all duration-300 transform scale-100 hover:scale-110 border border-sky-450 focus:outline-none"
          title="Back to Top"
          id="scroll-to-top-button"
        >
          <ArrowUp className="h-4.5 w-4.5" />
        </button>
      )}

      {/* Interactive cookie dialog popup */}
      <CookieConsent />

    </div>
  );
}
