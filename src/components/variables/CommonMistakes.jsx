import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import CodeBlock from '../common/CodeBlock';
import { ChevronDown, AlertOctagon, ArrowRight, Lightbulb } from 'lucide-react';

export default function CommonMistakes({ mistakes }) {
  const [expandedId, setExpandedId] = useState(mistakes[0]?.id || 'reassign-const');

  const toggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="7"
        title="Common Mistakes & Traps"
        subtitle="The top pitfalls beginner and intermediate developers encounter with JS variables."
      />

      <div className="space-y-3">
        {mistakes.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-atlas-900/90 border border-atlas-border overflow-hidden transition-all duration-200"
            >
              {/* Header Toggle */}
              <button
                onClick={() => toggle(item.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-atlas-850/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                    <AlertOctagon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30 inline-block mt-1">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-lg bg-atlas-950 border border-atlas-border flex items-center justify-center text-slate-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-white' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Collapsible Body */}
              {isExpanded && (
                <div className="p-4 sm:p-5 pt-0 border-t border-atlas-border/50 bg-atlas-950/40 space-y-4">
                  {/* Explanation */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.explanation}
                  </p>

                  {/* Side-by-side Bad Code vs Fix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="border border-rose-500/30 rounded-xl overflow-hidden bg-rose-950/10">
                      <div className="px-3 py-1.5 bg-rose-950/40 border-b border-rose-500/20 text-[11px] font-mono font-bold text-rose-400">
                        ❌ Problematic Code
                      </div>
                      <pre className="p-3 text-xs font-mono text-slate-200 overflow-x-auto">
                        <code>{item.badCode}</code>
                      </pre>
                    </div>

                    <div className="border border-emerald-500/30 rounded-xl overflow-hidden bg-emerald-950/10">
                      <div className="px-3 py-1.5 bg-emerald-950/40 border-b border-emerald-500/20 text-[11px] font-mono font-bold text-emerald-400">
                        ✅ Correct Solution
                      </div>
                      <pre className="p-3 text-xs font-mono text-slate-200 overflow-x-auto">
                        <code>{item.fixCode}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
