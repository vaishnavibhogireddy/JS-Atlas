import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Sparkles, Check, X, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function EqualityVisualizer({ equalityComparisons }) {
  const [activeTab, setActiveTab] = useState('equality'); // 'equality' | 'nullish' | 'chaining'
  const [selectedComparison, setSelectedComparison] = useState(0);

  // State for Nullish tester
  const [nullishInput, setNullishInput] = useState('0');

  const currentEq = equalityComparisons[selectedComparison];

  // Evaluate Nullish test
  const getNullishResult = () => {
    let parsed;
    try {
      const fn = new Function(`"use strict"; return (${nullishInput});`);
      parsed = fn();
    } catch {
      parsed = nullishInput;
    }
    const orResult = parsed || 'Fallback';
    const nullishResult = parsed ?? 'Fallback';
    return { orResult, nullishResult };
  };

  const { orResult, nullishResult } = getNullishResult();

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Operator Lab"
        subtitle="Experience strict equality, the nullish coalescing operator, and safe optional chaining."
      />

      {/* Mode Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('equality')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'equality'
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'bg-atlas-900 border border-atlas-border text-slate-400 hover:text-white'
          }`}
        >
          === vs == Lab
        </button>
        <button
          onClick={() => setActiveTab('nullish')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'nullish'
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'bg-atlas-900 border border-atlas-border text-slate-400 hover:text-white'
          }`}
        >
          ?? vs || (Nullish Lab)
        </button>
        <button
          onClick={() => setActiveTab('chaining')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'chaining'
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'bg-atlas-900 border border-atlas-border text-slate-400 hover:text-white'
          }`}
        >
          ?. Optional Chaining Lab
        </button>
      </div>

      {activeTab === 'equality' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Preset Buttons */}
          <div className="lg:col-span-5 space-y-2">
            <ConceptCard>
              <span className="text-xs font-mono font-bold uppercase text-slate-400 block mb-3">
                Select Comparison Expression
              </span>
              <div className="space-y-1.5">
                {equalityComparisons.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedComparison(idx)}
                    className={`w-full p-2.5 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between ${
                      selectedComparison === idx
                        ? 'bg-brand-indigo/20 border-brand-indigo text-white shadow-glow-sm'
                        : 'bg-atlas-950/60 border-atlas-border text-slate-300 hover:bg-atlas-900'
                    }`}
                  >
                    <span>
                      {item.left} {item.operator} {item.right}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        item.result
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-950 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {String(item.result)}
                    </span>
                  </button>
                ))}
              </div>
            </ConceptCard>
          </div>

          {/* Result Inspector */}
          <div className="lg:col-span-7">
            <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    Equality Evaluation Engine
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {currentEq.operator === '===' ? 'Strict Equality' : 'Loose Coercion'}
                  </span>
                </div>

                {/* Big Expression Visual */}
                <div className="py-6 px-4 bg-atlas-950 rounded-xl border border-atlas-border text-center space-y-4">
                  <div className="flex items-center justify-center gap-3 text-lg sm:text-2xl font-mono font-bold">
                    <span className="text-sky-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                      {currentEq.left}
                    </span>
                    <span className="text-amber-400">{currentEq.operator}</span>
                    <span className="text-sky-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                      {currentEq.right}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                    <span
                      className={`text-xl font-mono font-black px-4 py-1 rounded-xl border ${
                        currentEq.result
                          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                          : 'bg-rose-950/60 border-rose-500/50 text-rose-400'
                      }`}
                    >
                      {String(currentEq.result)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-atlas-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Why: </strong>
                  {currentEq.reason}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-atlas-border text-xs text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Always prefer === to prevent silent type coercion bugs.</span>
              </div>
            </ConceptCard>
          </div>
        </div>
      )}

      {activeTab === 'nullish' && (
        <ConceptCard glow={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                Test Default Value Fallbacks
              </span>
              <p className="text-xs text-slate-400">
                Notice how `0`, `""`, and `false` are valid values that `||` mistakenly wipes out, while `??` preserves them!
              </p>

              <div className="flex flex-wrap gap-2">
                {['0', '""', 'false', 'null', 'undefined', '"Hello"'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setNullishInput(val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      nullishInput === val
                        ? 'bg-brand-indigo text-white font-bold'
                        : 'bg-atlas-950 border border-atlas-border text-slate-300 hover:bg-atlas-900'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-atlas-950 border border-rose-500/30 space-y-1">
                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
                  Logical OR (value || "Fallback")
                </span>
                <div className="font-mono text-sm font-bold text-white">
                  Result: <span className="text-rose-300">{JSON.stringify(orResult)}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-atlas-950 border border-emerald-500/40 space-y-1 shadow-glow-emerald">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                  Nullish Coalescing (value ?? "Fallback")
                </span>
                <div className="font-mono text-sm font-bold text-white">
                  Result: <span className="text-emerald-300">{JSON.stringify(nullishResult)}</span>
                </div>
              </div>
            </div>
          </div>
        </ConceptCard>
      )}

      {activeTab === 'chaining' && (
        <ConceptCard glow={true}>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border">
              <span className="text-xs font-mono font-bold text-slate-300">
                Optional Chaining (?.) Live Protection
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                Crash Proof
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <span className="text-xs font-mono text-rose-400 font-bold">
                  ❌ Standard Dot Notation on missing property
                </span>
                <code className="block text-xs font-mono text-slate-300 bg-atlas-950 p-2.5 rounded border border-slate-800">
                  user.address.city
                </code>
                <p className="text-xs text-rose-400 font-mono">
                  💥 TypeError: Cannot read properties of undefined
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 shadow-glow-emerald">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  ✅ With Optional Chaining
                </span>
                <code className="block text-xs font-mono text-slate-300 bg-atlas-950 p-2.5 rounded border border-slate-800">
                  user?.address?.city
                </code>
                <p className="text-xs text-emerald-400 font-mono">
                  ✓ Evaluates safely to: undefined (Zero crash)
                </p>
              </div>
            </div>
          </div>
        </ConceptCard>
      )}
    </section>
  );
}
