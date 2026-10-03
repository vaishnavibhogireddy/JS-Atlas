import React from 'react';
import { Link } from 'react-router-dom';
import KnowledgeMap from '../components/atlas/KnowledgeMap';
import { Sparkles, ArrowRight, Zap, Target, Layers } from 'lucide-react';

export default function AtlasPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-indigo/10 blur-[100px] pointer-events-none" />

        {/* Stage 2 Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-atlas-900 border border-brand-indigo/30 text-xs font-mono text-brand-blue mb-6 shadow-glow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Stage 2 Complete • 11 Core JavaScript Topics Ready</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          JavaScript <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-400">Atlas</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg sm:text-xl font-medium text-slate-200 max-w-2xl mx-auto leading-relaxed">
          A visual map of the JavaScript concepts you actually need to know.
        </p>

        {/* Supporting text */}
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Explore the map. Follow the connections. Learn only what matters.
        </p>

        {/* Quick Launch CTA Banner */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/learn/variables"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-atlas-950 font-bold text-sm tracking-wide shadow-glow-emerald transition-all duration-200 hover:scale-105"
          >
            <span>Start Learning: Variables</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/topics"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-atlas-900 hover:bg-atlas-800 border border-atlas-border text-slate-300 hover:text-white font-medium text-sm transition-all"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Browse All 16 Topics</span>
          </Link>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <h2 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider">
              Interactive Concept Network
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
            Hover to inspect • Click any ready topic to enter interactive lesson
          </span>
        </div>

        {/* Knowledge Map Component */}
        <KnowledgeMap />
      </section>

      {/* Value Proposition Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-atlas-900/60 border border-atlas-border">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-2">Visual Knowledge First</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Understand concepts through mental models, interactive memory slots, and network relationships rather than 40-page textbook walls of text.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-atlas-900/60 border border-atlas-border">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-2">High-Signal 80/20 Learning</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We omit obscure historical trivia and present the 20% of JavaScript mechanics that power 80% of professional production codebases.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-atlas-900/60 border border-atlas-border">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-2">Interactive Variables Sandbox</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Explore Stage 1's polished Variables topic with live mutation memory boxes, declaration vs assignment steppers, and common mistake breakdowns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
