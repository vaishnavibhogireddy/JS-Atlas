import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ATLAS_CATEGORIES, ATLAS_NODES } from '../data/atlasData';
import { Sparkles, ArrowRight, Clock, CheckCircle2, Layers, Search } from 'lucide-react';
import ComingSoonToast from '../components/layout/ComingSoonToast';

export default function TopicsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [comingSoonNode, setComingSoonNode] = useState(null);

  const filteredNodes = ATLAS_NODES.filter((node) => {
    const matchesSearch =
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || node.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          JavaScript Topic Roadmap
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400">
          The curated syllabus of essential JavaScript knowledge. Stage 1 focuses on core architecture and the complete Variables module.
        </p>

        {/* Search & Filter bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search topics (e.g., Closures, Promises, let)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-atlas-900 border border-atlas-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-indigo"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-atlas-900 border border-atlas-border rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-brand-indigo font-mono"
          >
            <option value="all">All Categories</option>
            {ATLAS_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-12">
        {ATLAS_CATEGORIES.map((category) => {
          const categoryNodes = filteredNodes.filter((n) => n.categoryId === category.id);
          if (categoryNodes.length === 0) return null;

          return (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-atlas-border">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                  {category.title}
                </h2>
                <span className="text-xs text-slate-500 font-mono">
                  ({categoryNodes.length} topics)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryNodes.map((node) => {
                  const isReady = node.status === 'ready';

                  if (isReady && node.route) {
                    return (
                      <Link
                        key={node.id}
                        to={node.route}
                        className="rounded-2xl p-5 bg-gradient-to-b from-emerald-950/20 to-atlas-900 border border-emerald-500/40 hover:border-emerald-400 transition-all duration-200 shadow-glow-emerald flex flex-col justify-between group hover:scale-[1.02]"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                              Stage 1 Ready
                            </span>
                            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {node.name}
                          </h3>
                          <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                            {node.tagline}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-400 font-medium">
                          <span>Enter Interactive Lesson</span>
                          <span>→</span>
                        </div>
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={node.id}
                      onClick={() => setComingSoonNode(node)}
                      className="cursor-pointer rounded-2xl p-5 bg-atlas-900/60 border border-atlas-border hover:border-slate-700 hover:bg-atlas-850/60 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-[10px] text-amber-400/80 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            <span>Coming Next</span>
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-200 group-hover:text-white transition-colors">
                          {node.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                          {node.tagline}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-atlas-border flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span>Roadmap Topic</span>
                        <span className="group-hover:text-slate-300 transition-colors">Inspect →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <ComingSoonToast
        node={comingSoonNode}
        onClose={() => setComingSoonNode(null)}
      />
    </div>
  );
}
