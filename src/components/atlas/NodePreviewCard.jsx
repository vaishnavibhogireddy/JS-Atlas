import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

export default function NodePreviewCard({ node, category, onClose }) {
  if (!node) return null;

  const isReady = node.status === 'ready';

  return (
    <div className="rounded-2xl bg-atlas-900/95 border border-atlas-border-bright p-5 shadow-2xl backdrop-blur-xl max-w-sm w-full transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {category && (
          <span
            className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
            style={{
              borderColor: `${category.color}40`,
              color: category.color,
              backgroundColor: `${category.color}15`,
            }}
          >
            {category.title}
          </span>
        )}

        {isReady ? (
          <span className="flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3" />
            <span>Ready to Learn</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-500/30">
            <Clock className="w-3 h-3" />
            <span>Coming Next</span>
          </span>
        )}
      </div>

      {/* Title & Tagline */}
      <h3 className="text-xl font-bold text-white tracking-tight">{node.name}</h3>
      <p className="mt-1 text-xs text-slate-300 leading-relaxed">{node.tagline}</p>

      {/* Summary Bullet Points */}
      {node.bulletPoints && (
        <div className="mt-3 pt-3 border-t border-atlas-border space-y-1.5">
          {node.bulletPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-2 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo mt-1 shrink-0" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      )}

      {/* Call to action */}
      <div className="mt-4 pt-3 border-t border-atlas-border">
        {isReady && node.route ? (
          <Link
            to={node.route}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-atlas-950 font-bold text-xs tracking-wide shadow-glow-emerald transition-all duration-200 hover:scale-[1.02]"
          >
            <span>Learn {node.name}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="flex items-center justify-between text-xs text-slate-400 bg-atlas-950/60 rounded-xl px-3 py-2 border border-slate-800">
            <span className="font-mono text-[11px]">Roadmap Concept</span>
            <span className="text-amber-400/90 font-medium text-[11px]">Stage 3</span>
          </div>
        )}
      </div>
    </div>
  );
}
