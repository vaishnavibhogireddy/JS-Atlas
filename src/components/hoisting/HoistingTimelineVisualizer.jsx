import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { ArrowRight, ArrowDown, Clock, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export default function HoistingTimelineVisualizer({ comparisonTable }) {
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);

  const selected = comparisonTable[selectedItemIdx];

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive 2-Phase Hoisting Timeline"
        subtitle="Understand how JavaScript compiles code during the Creation Phase before executing line 1."
      />

      {/* Construct Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
        {comparisonTable.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedItemIdx(idx)}
            className={`p-3 rounded-xl border text-left font-mono text-xs transition-all ${
              selectedItemIdx === idx
                ? 'bg-brand-indigo/20 border-brand-indigo text-white shadow-glow-sm'
                : 'bg-atlas-900 border-atlas-border text-slate-400 hover:text-white'
            }`}
          >
            <span className="font-bold block truncate">{item.construct}</span>
            <span className="text-[10px] text-slate-500 block truncate">{item.syntax}</span>
          </button>
        ))}
      </div>

      {/* 2-Phase Timeline Comparison */}
      <ConceptCard glow={true} className="bg-atlas-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Phase 1: Creation Phase */}
          <div className="p-5 rounded-2xl bg-atlas-950 border border-brand-indigo/30 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-atlas-border">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Phase 1: Creation / Memory Setup
              </span>
              <span className="text-[10px] font-mono text-slate-500">Before execution</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              The engine scans scope and allocates memory for:
            </p>

            <div className="p-3 bg-atlas-900 rounded-xl font-mono text-xs text-sky-300 border border-slate-800">
              {selected.creationPhase}
            </div>
          </div>

          {/* Phase 2: Execution Phase */}
          <div className="p-5 rounded-2xl bg-atlas-950 border border-emerald-500/30 space-y-3 shadow-glow-emerald">
            <div className="flex items-center justify-between pb-2 border-b border-atlas-border">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Phase 2: Runtime Execution (Line by Line)
              </span>
              <span className="text-[10px] font-mono text-slate-500">Executing code</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              If accessed before the declaration line:
            </p>

            <div className="p-3 bg-atlas-900 rounded-xl font-mono text-xs text-white border border-slate-800">
              {selected.beforeDeclaration}
            </div>
          </div>
        </div>

        {/* Temporal Dead Zone Alert Banner */}
        {selected.construct.includes('let / const') && (
          <div className="mt-6 p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-1 text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-mono font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>Temporal Dead Zone (TDZ) Visualized</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              The TDZ is the time window between entering scope and executing the `let`/`const` declaration. Any read attempt inside this zone throws a strict <code>ReferenceError</code>.
            </p>
          </div>
        )}
      </ConceptCard>
    </section>
  );
}
