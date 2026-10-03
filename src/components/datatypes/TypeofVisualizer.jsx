import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Database, AlertTriangle, Sparkles, Check, ArrowRight, Layers } from 'lucide-react';

export default function TypeofVisualizer({ typeofTable }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [customVal, setCustomVal] = useState('');
  const [customResult, setCustomResult] = useState(null);

  const presets = typeofTable;
  const current = presets[selectedIdx];

  const handleCustomEval = (e) => {
    e.preventDefault();
    if (!customVal.trim()) return;
    try {
      // Evaluate safe typeof via Function constructor
      const fn = new Function(`"use strict"; return (${customVal});`);
      const evaluated = fn();
      const res = typeof evaluated;
      setCustomResult({
        input: customVal,
        result: res,
        isCustom: true,
        note: Array.isArray(evaluated)
          ? 'Array object (Array.isArray is true)'
          : evaluated === null
          ? 'Historical null object bug'
          : `JavaScript runtime type: ${res}`,
      });
    } catch (err) {
      setCustomResult({
        input: customVal,
        result: 'error',
        isCustom: true,
        note: `Syntax / Evaluation Error: ${err.message}`,
      });
    }
  };

  const activeDisplay = customResult || current;

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive typeof Visualizer"
        subtitle="Test any value or expression and inspect the exact runtime type returned by JavaScript."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Preset Selector */}
        <div className="lg:col-span-6 space-y-3">
          <ConceptCard>
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Select Test Value
              </span>
              <span className="text-[11px] font-mono text-slate-500">10 Standard Cases</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {presets.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedIdx(idx);
                    setCustomResult(null);
                  }}
                  className={`p-2.5 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between ${
                    selectedIdx === idx && !customResult
                      ? 'bg-brand-indigo/20 border-brand-indigo text-white shadow-glow-sm'
                      : 'bg-atlas-950/70 border-atlas-border text-slate-300 hover:border-slate-700 hover:bg-atlas-900'
                  }`}
                >
                  <span className="truncate">{item.input}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ml-1 shrink-0 ${
                      item.result === 'object'
                        ? 'bg-amber-950/80 text-amber-400'
                        : 'bg-sky-950/80 text-sky-400'
                    }`}
                  >
                    {item.result}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <form onSubmit={handleCustomEval} className="mt-4 pt-3 border-t border-atlas-border flex gap-2">
              <input
                type="text"
                value={customVal}
                onChange={(e) => setCustomVal(e.target.value)}
                placeholder="Custom expression e.g. 5 > 2 or [10]"
                className="flex-1 bg-atlas-950 border border-atlas-border rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-indigo"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-brand-indigo hover:bg-indigo-500 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-glow-sm"
              >
                typeof
              </button>
            </form>
          </ConceptCard>
        </div>

        {/* Live Type Visualizer Box */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-brand-blue" />
                  <span className="text-xs font-mono font-semibold text-slate-300">
                    Runtime Inspection
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Operator: typeof
                </span>
              </div>

              {/* Expression Visual Pipeline */}
              <div className="p-4 rounded-xl bg-atlas-950 border border-atlas-border space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Expression:</span>
                  <span className="text-amber-300 font-bold">{activeDisplay.input}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">typeof {activeDisplay.input}:</span>
                  <span
                    className={`font-black text-base px-2.5 py-1 rounded-lg border ${
                      activeDisplay.result === 'object'
                        ? 'bg-amber-950/40 border-amber-500/50 text-amber-400'
                        : activeDisplay.result === 'error'
                        ? 'bg-rose-950/40 border-rose-500/50 text-rose-400'
                        : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
                    }`}
                  >
                    "{activeDisplay.result}"
                  </span>
                </div>
              </div>

              {/* Note / Breakdown */}
              <div className="mt-4 p-3 rounded-xl bg-atlas-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {activeDisplay.note}
              </div>

              {/* Historical Null Alert if applicable */}
              {activeDisplay.input === 'null' && (
                <div className="mt-3 p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-2 text-xs text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Historical Quirk:</strong> In JS 1.0, type tags were represented by 3 bits. The tag for objects was 000, and null was represented as a NULL pointer (0x00), making `typeof null` evaluate to "object".
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-atlas-border flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Dynamic Typing in JavaScript</span>
              <span className="text-emerald-400">Values have types, not variables</span>
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
