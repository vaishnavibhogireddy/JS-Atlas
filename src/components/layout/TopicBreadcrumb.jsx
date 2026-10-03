import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Layers } from 'lucide-react';

export default function TopicBreadcrumb({ category = 'Fundamentals', topic = 'Variables' }) {
  return (
    <nav className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-6 py-1 px-3 rounded-lg bg-atlas-900/60 border border-atlas-border w-fit">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-brand-blue transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Atlas</span>
      </Link>
      <ChevronRight className="w-3 h-3 text-slate-600" />
      <span className="flex items-center gap-1 text-slate-300">
        <Layers className="w-3 h-3 text-sky-400" />
        <span>{category}</span>
      </span>
      <ChevronRight className="w-3 h-3 text-slate-600" />
      <span className="text-emerald-400 font-semibold">{topic}</span>
    </nav>
  );
}
