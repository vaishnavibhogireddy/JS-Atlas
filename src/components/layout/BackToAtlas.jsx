import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Map } from 'lucide-react';

export default function BackToAtlas() {
  return (
    <div className="pt-12 pb-6 border-t border-atlas-border flex flex-col sm:flex-row items-center justify-between gap-4">
      <Link
        to="/"
        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-atlas-900 hover:bg-atlas-800 border border-atlas-border hover:border-brand-indigo/50 text-slate-200 hover:text-white font-medium text-sm transition-all duration-200 hover:shadow-glow-sm"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-brand-blue" />
        <span>← Back to Atlas</span>
      </Link>

      <p className="text-xs text-slate-500 font-mono">
        Explore more nodes on the interactive JavaScript knowledge map.
      </p>
    </div>
  );
}
