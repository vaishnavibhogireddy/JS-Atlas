import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Target, Zap, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-atlas-900 border border-brand-indigo/30 text-xs font-mono text-brand-blue mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>The JS Atlas Manifesto</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          See JavaScript. Understand JavaScript.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
          Why we built an interactive visual atlas instead of another 800-page manual or generic course.
        </p>
      </div>

      {/* Core Philosophy Cards */}
      <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
        <div className="rounded-2xl bg-atlas-900/80 border border-atlas-border p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            <span>The Problem with Traditional Learning</span>
          </h2>
          <p>
            Traditional documentation sites are built for reference searches, not rapid conceptual modeling. Online courses stretch 20 minutes of real insight into 15 hours of video padding. Textbooks drown learners in obscure historical quirks before they even grasp memory references.
          </p>
          <p>
            Learners end up copy-pasting code without developing a mental picture of how variables bind to memory, how the event loop queues callbacks, or how lexical scopes nest.
          </p>
        </div>

        <div className="rounded-2xl bg-atlas-900/80 border border-brand-indigo/30 p-6 sm:p-8 space-y-4 shadow-glow-sm">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-blue" />
            <span>The 80 / 20 Knowledge Principle</span>
          </h2>
          <p>
            In software engineering, 20% of foundational mechanics power 80% of everyday production decisions. JS Atlas focuses strictly on this high-leverage 20%:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-atlas-950 border border-atlas-border flex items-center gap-2 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Clear visual mental models</span>
            </div>
            <div className="p-3 rounded-xl bg-atlas-950 border border-atlas-border flex items-center gap-2 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct syntax & idiomatic patterns</span>
            </div>
            <div className="p-3 rounded-xl bg-atlas-950 border border-atlas-border flex items-center gap-2 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Interactive memory simulations</span>
            </div>
            <div className="p-3 rounded-xl bg-atlas-950 border border-atlas-border flex items-center gap-2 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Pitfall prevention & common errors</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-atlas-900/80 border border-atlas-border p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>Stage 1 Architecture</span>
          </h2>
          <p>
            Stage 1 establishes the full visual knowledge network, dynamic SVG mapping system, responsive cluster navigator, and the complete template topic page for <strong>Variables</strong>.
          </p>
          <div className="pt-2">
            <Link
              to="/learn/variables"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-atlas-950 font-bold text-xs shadow-glow-emerald hover:scale-105 transition-all"
            >
              <span>Explore the Variables Topic</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
