import React from 'react';
import { Link } from 'react-router-dom';
import { ATLAS_CATEGORIES, ATLAS_NODES } from '../../data/atlasData';
import { Sparkles, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

export default function MobileAtlasView({ onSelectNode }) {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-brand-indigo/10 border border-brand-indigo/30 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500 text-atlas-950 font-mono font-black text-lg mb-2 shadow-glow-yellow">
          JS
        </div>
        <h3 className="text-lg font-bold text-white">JavaScript Knowledge Network</h3>
        <p className="text-xs text-slate-300 mt-1">
          Explore all 5 core clusters. Tap any topic to view its summary or start learning.
        </p>
      </div>

      {ATLAS_CATEGORIES.map((category) => {
        const nodesInCategory = ATLAS_NODES.filter((n) => n.categoryId === category.id);

        return (
          <div
            key={category.id}
            className="rounded-2xl bg-atlas-900 border border-atlas-border p-4 shadow-lg overflow-hidden"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h4 className="text-sm font-bold text-white tracking-wide uppercase">
                  {category.title}
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {nodesInCategory.length} concepts
              </span>
            </div>

            {/* Nodes list */}
            <div className="grid grid-cols-1 gap-2.5">
              {nodesInCategory.map((node) => {
                const isReady = node.status === 'ready';

                if (isReady && node.route) {
                  return (
                    <Link
                      key={node.id}
                      to={node.route}
                      className="group flex items-center justify-between p-3 rounded-xl bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/40 transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white group-hover:text-emerald-300">
                            {node.name}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                            Ready
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">{node.tagline}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  );
                }

                return (
                  <button
                    key={node.id}
                    onClick={() => onSelectNode(node)}
                    className="w-full text-left p-3 rounded-xl bg-atlas-950/60 hover:bg-atlas-800/80 border border-atlas-border hover:border-slate-700 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                          {node.name}
                        </span>
                        <span className="text-[10px] font-mono text-amber-400/80 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>Coming next</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{node.tagline}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
