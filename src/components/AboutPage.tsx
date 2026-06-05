import React from 'react';
import { Target, ShieldCheck, HeartHandshake, Eye, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn text-left" id="about-page-container">
      
      {/* Editorial head */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-500 bg-sky-500/10 px-2.5 py-1 rounded">
          About TrendSphere
        </span>
        <h1 className="text-3xl md:text-4xl font-sans font-bold text-gray-900 dark:text-white tracking-tight">
          Rigorous Trend Synthesis, Open Access.
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Uncovering future waves in Tech, Cryptography, Global Logistics, and Creative Design, backed by fair programmatic advertisement monetization models.
        </p>
      </div>

      {/* Main bento structural display */}
      <div className="space-y-8 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
        
        {/* Editorial Vision */}
        <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 h-32 w-32 bg-sky-500/5 rounded-full blur-2xl"></div>
          <h2 className="text-lg font-sans font-bold text-gray-900 dark:text-white flex items-center gap-1.5 mb-2.5">
            <Sparkles className="h-5 w-5 text-sky-500" />
            The TrendSphere Vision
          </h2>
          <p className="text-xs md:text-sm text-gray-650 dark:text-gray-400">
            Technology and finance vectors change at blinding velocities. Traditional mainstream media outlets often report trends late, hiding core developments behind restrictive payments screens. TrendSphere operates differently. Our staff synthesizes deep, objective industry shifts and shares them free of charge. 
          </p>
          <p className="text-xs md:text-sm text-gray-650 dark:text-gray-400 mt-2">
            Instead of locking down our research base, we leverage premium programmatic advertisements. By pairing clean visual layouts with compliant, high-relevance ad containers, we pay our content creators fairly while keeping the repository completely accessible to students, developers, and micro-entrepreneurs worldwide.
          </p>
        </div>

        {/* Mission Statement block */}
        <div className="border border-dashed border-sky-400/30 rounded-2xl p-6 bg-sky-500/5 dark:bg-sky-950/10">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2 flex items-center gap-1.5">
            <Target className="h-4 w-4" />
            Core Mission Statement
          </h3>
          <blockquote className="text-sm md:text-md font-medium text-gray-800 dark:text-gray-200 italic pl-4 border-l-2 border-sky-500 leading-relaxed">
            "To build an open-source, high-fidelity trend journal that serves precise global analyses without paywalls, demonstrating how user-friendly, non-intrusive advertisements can securely fund modern cultural distribution."
          </blockquote>
        </div>

        {/* Grid Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h4 className="font-sans font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5 mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Privacy & Consent Integrity
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              We respect user privacy. We strictly avoid tracking scripts, cookies are manageable, and all advertising inventory is served via audited, sandboxed networks prioritizing context over aggressive behavioral analytics.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h4 className="font-sans font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5 mb-2">
              <HeartHandshake className="h-4 w-4 text-pink-500" />
              Honest Sponsored Relations
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              We decline intrusive flash popups, autoplay audios, and low-quality redirect loops. Every sponsorship display inside TrendSphere is explicitly marked "Sponsored" and curated inside fixed aspect spaces.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
