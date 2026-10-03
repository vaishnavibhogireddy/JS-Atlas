import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Compass, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-atlas-border bg-atlas-950/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500 text-atlas-950 font-mono font-bold text-xs">
              JS
            </div>
            <div>
              <p className="text-sm font-semibold text-white">JS Atlas</p>
              <p className="text-xs text-slate-400">See JavaScript. Understand JavaScript.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">
              Knowledge Atlas
            </Link>
            <Link to="/learn/variables" className="hover:text-white transition-colors">
              Variables (Stage 1)
            </Link>
            <Link to="/topics" className="hover:text-white transition-colors">
              Topic Roadmap
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Manifesto
            </Link>
          </div>

          <p className="text-xs text-slate-500">
            Engineered for rapid conceptual mastery. No textbook fluff.
          </p>
        </div>
      </div>
    </footer>
  );
}
