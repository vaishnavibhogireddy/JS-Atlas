import React from 'react';
import { X, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ComingSoonToast({ node, onClose }) {
  if (!node) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] bg-atlas-900/95 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-amber-400">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-wider font-bold">
            Coming in Stage 3 (Async & Browser)
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-2.5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          {node.name}
        </h3>
        <p className="text-sm text-slate-300 mt-1">
          {node.tagline || node.summary}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-mono">11 Topics Active:</span>
        <Link
          to="/topics"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium hover:underline"
        >
          <span>Browse Active Topics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
