import React, { useState } from 'react';
import { Search, Moon, Sun, Menu, X } from 'lucide-react';
import { CategoryType, CATEGORIES } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedCategory: CategoryType | 'All';
  setSelectedCategory: (cat: CategoryType | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({
  currentView,
  setCurrentView,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  isDark,
  toggleDarkMode
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleCategoryClick = (category: CategoryType | 'All') => {
    setSelectedCategory(category);
    setCurrentView('home');
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setCurrentView('home');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 glass-navbar transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-2 select-none group text-left cursor-pointer focus:outline-none"
              id="nav-logo-btn"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 text-white shadow-sm shadow-sky-500/30 group-hover:scale-105 transition-transform">
                <span className="font-sans font-bold text-lg tracking-wider">T</span>
              </div>
              <div>
                <span className="font-sans font-bold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-sky-500 transition-colors">
                  Trend<span className="text-sky-500">Sphere</span>
                </span>
                <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 -mt-1 leading-none tracking-wider">
                  TRENDS & ANALYSIS
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Category Elements */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleCategoryClick('All')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth cursor-pointer ${
                currentView === 'home' && selectedCategory === 'All'
                  ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400'
              }`}
              id="cat-all-btn"
            >
              All Trends
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth cursor-pointer ${
                  currentView === 'home' && selectedCategory === cat
                    ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400'
                }`}
                id={`cat-${cat.toLowerCase()}-btn`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Search & Theme Toggle */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Search Input Box */}
            <div className="relative hidden md:block w-44 lg:w-56">
              <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors ${searchFocused ? 'text-sky-500' : 'text-gray-400 dark:text-gray-500'}`}>
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search trends..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'home') setCurrentView('home');
                }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`block w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border transition-all placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${
                  searchFocused 
                    ? 'border-sky-500 ring-2 ring-sky-500/20 bg-white dark:bg-gray-950' 
                    : 'border-gray-200 dark:border-gray-800'
                }`}
                id="search-input-field"
              />
            </div>

            {/* Dark & Light Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle dark mode"
              id="dark-mode-toggle-btn"
            >
              {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors lg:hidden focus:outline-none cursor-pointer"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-3 px-4 shadow-lg animate-fadeIn">
          {/* Mobile Search input */}
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search articles & vectors..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'home') setCurrentView('home');
              }}
              className="block w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 focus:border-sky-500 focus:outline-none"
              id="search-input-mobile"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2 py-1">
              Trend Channels
            </p>
            <button
              onClick={() => handleCategoryClick('All')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-smooth cursor-pointer ${
                currentView === 'home' && selectedCategory === 'All'
                  ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
              id="cat-mobile-all"
            >
              All Trends
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-smooth cursor-pointer ${
                  currentView === 'home' && selectedCategory === cat
                    ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                id={`cat-mobile-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}

            <div className="h-px bg-gray-200 dark:bg-gray-800 my-2"></div>

            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2 py-1">
              Platform Features
            </p>
            <button
              onClick={() => {
                setCurrentView('about');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-smooth cursor-pointer ${
                currentView === 'about'
                  ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
              id="menu-mobile-about"
            >
              About TrendSphere
            </button>
            <button
              onClick={() => {
                setCurrentView('contact');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-smooth cursor-pointer ${
                currentView === 'contact'
                  ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
              id="menu-mobile-contact"
            >
              Contact Desk
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
