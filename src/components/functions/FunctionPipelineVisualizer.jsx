import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Cpu, ArrowDown, Play, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FunctionPipelineVisualizer({ types }) {
  const [paramA, setParamA] = useState(4);
  const [paramB, setParamB] = useState(6);
  const [selectedType, setSelectedType] = useState(0);

  const sumResult = Number(paramA) + Number(paramB);

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Function Execution Pipeline"
        subtitle="Experience how arguments flow into parameters, get processed, and return computed output."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Function Runner */}
        <div className="lg:col-span-6 space-y-4">
          <ConceptCard glow={true}>
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Function Runner: add(a, b)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-indigo/30 text-brand-blue border border-brand-indigo/40">
                Pure Function
              </span>
            </div>

            {/* Visual Input -> Body -> Output Pipeline */}
            <div className="p-4 bg-atlas-950 rounded-xl border border-atlas-border space-y-4">
              {/* 1. Arguments Passed (Input) */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  1. Pass Arguments (Input Values)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 block mb-1">
                      Argument 1 (a)
                    </label>
                    <input
                      type="number"
                      value={paramA}
                      onChange={(e) => setParamA(Number(e.target.value))}
                      className="w-full bg-atlas-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-brand-indigo"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 block mb-1">
                      Argument 2 (b)
                    </label>
                    <input
                      type="number"
                      value={paramB}
                      onChange={(e) => setParamB(Number(e.target.value))}
                      className="w-full bg-atlas-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-brand-indigo"
                    />
                  </div>
                </div>
              </div>

              {/* Down Arrow */}
              <div className="flex justify-center text-brand-blue">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>

              {/* 2. Function Body (Transformation) */}
              <div className="p-3 rounded-lg bg-brand-indigo/10 border border-brand-indigo/30 text-center">
                <span className="text-[10px] font-mono text-brand-blue uppercase font-bold block mb-1">
                  2. Function Body Execution
                </span>
                <code className="text-xs font-mono text-slate-200">
                  return {paramA} + {paramB};
                </code>
              </div>

              {/* Down Arrow */}
              <div className="flex justify-center text-emerald-400">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>

              {/* 3. Output (Return Value) */}
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-center shadow-glow-emerald">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                  3. Computed Return Output
                </span>
                <span className="text-2xl font-mono font-black text-amber-400">
                  {sumResult}
                </span>
              </div>
            </div>
          </ConceptCard>
        </div>

        {/* Right: Function Declaration Syntaxes Comparison */}
        <div className="lg:col-span-6 space-y-3">
          <ConceptCard>
            <span className="text-xs font-mono font-bold uppercase text-slate-300 block mb-3">
              3 Ways to Define Functions in JS
            </span>

            <div className="space-y-2.5">
              {types.map((t, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedType(idx)}
                  className={`cursor-pointer p-3.5 rounded-xl border transition-all ${
                    selectedType === idx
                      ? 'bg-atlas-850 border-brand-indigo shadow-glow-sm'
                      : 'bg-atlas-950/60 border-atlas-border hover:bg-atlas-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-bold text-xs text-white">{t.name}</h4>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        t.hoisted.startsWith('Yes')
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Hoisted: {t.hoisted.startsWith('Yes') ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <code className="block text-xs font-mono text-sky-300 bg-atlas-950 p-2 rounded border border-slate-800/80 mb-2 truncate">
                    {t.syntax}
                  </code>
                  <p className="text-[11px] text-slate-400">{t.desc}</p>
                </div>
              ))}
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
