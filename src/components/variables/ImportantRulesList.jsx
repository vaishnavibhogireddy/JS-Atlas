import React from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import {
  ShieldAlert,
  Boxes,
  Lock,
  Type,
  Layers,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function ImportantRulesList({ rules }) {
  const icons = [Boxes, Lock, Type, Layers, Sparkles, CheckCircle2];

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="6"
        title="Important Rules"
        subtitle="The essential behavioral constraints you must commit to memory."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rules.map((rule, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div
              key={idx}
              className="rounded-2xl bg-atlas-900/80 border border-atlas-border p-5 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-7 h-7 rounded-lg bg-brand-indigo/10 border border-brand-indigo/30 flex items-center justify-center text-brand-blue group-hover:scale-105 transition-transform">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-bold text-sm text-white">{rule.title}</h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {rule.desc}
                </p>
              </div>

              {rule.code && (
                <div className="mt-4 pt-3 border-t border-atlas-border">
                  <code className="block text-[11px] font-mono text-emerald-400/90 bg-atlas-950/80 px-2 py-1 rounded border border-slate-800 truncate">
                    {rule.code}
                  </code>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
