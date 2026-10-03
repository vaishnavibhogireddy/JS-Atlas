import React from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { CheckCircle2, Sparkles, Compass } from 'lucide-react';

export default function TakeawaysCard({ takeaways }) {
  return (
    <section className="scroll-mt-24">
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-atlas-900 via-atlas-900 to-atlas-950 border-2 border-brand-indigo/40 shadow-glow-md relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-32 bg-brand-indigo/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-atlas-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-indigo/20 border border-brand-indigo/50 flex items-center justify-center text-brand-blue shadow-glow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-brand-blue font-bold">
                Section 9 • Conceptual Checkpoint
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Know This Before Moving On
              </h2>
            </div>
          </div>

          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 w-fit">
            ✓ 7 Core Essentials
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {takeaways.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-atlas-950/70 border border-atlas-border/80 hover:border-brand-indigo/40 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
