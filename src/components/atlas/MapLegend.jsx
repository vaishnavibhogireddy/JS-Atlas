import React from 'react';
import { ATLAS_CATEGORIES } from '../../data/atlasData';
import { Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MapLegend({ selectedCategory, onSelectCategory, totalNodes, readyNodes }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 rounded-2xl bg-atlas-900/60 border border-atlas-border backdrop-blur-md">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            selectedCategory === null
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'text-slate-400 hover:text-white hover:bg-atlas-800'
          }`}
        >
          All Concepts
        </button>

        {ATLAS_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                isSelected
                  ? 'border-white/30 text-white shadow-sm'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-atlas-800/60'
              }`}
              style={{
                backgroundColor: isSelected ? `${cat.color}25` : undefined,
                color: isSelected ? '#ffffff' : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Stats and Stage 1 Indicator */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Stage 2 Active: {readyNodes || 11} Concepts</span>
        </div>
        <div className="text-slate-500 hidden sm:inline-block">|</div>
        <div className="text-slate-400 hidden sm:inline-block">
          Total Nodes: <span className="text-slate-200 font-bold">{totalNodes}</span>
        </div>
      </div>
    </div>
  );
}
