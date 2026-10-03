import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Shield, ArrowUp, CheckCircle2, Search, ArrowRight } from 'lucide-react';

export default function ScopeChainVisualizer() {
  const [targetVar, setTargetVar] = useState('blockVar');

  const lookupScenarios = {
    blockVar: {
      name: 'blockVar',
      foundAt: 'Block Scope',
      steps: ['1. Found immediately in Block Scope ({ ... }). Search finishes.'],
      foundInCurrent: true,
      color: 'text-emerald-400',
    },
    fnVar: {
      name: 'fnVar',
      foundAt: 'Function Scope',
      steps: [
        '1. Search Block Scope: Not found.',
        '2. Step outward to Function Scope: Found `fnVar`! Search finishes.',
      ],
      foundInCurrent: false,
      color: 'text-sky-400',
    },
    globalVar: {
      name: 'globalVar',
      foundAt: 'Global Scope',
      steps: [
        '1. Search Block Scope: Not found.',
        '2. Step outward to Function Scope: Not found.',
        '3. Step outward to Global Scope: Found `globalVar`! Search finishes.',
      ],
      foundInCurrent: false,
      color: 'text-amber-400',
    },
  };

  const currentLookup = lookupScenarios[targetVar];

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Scope Chain Lookup Simulator"
        subtitle="Watch how JavaScript resolves variables by searching outward through lexical boundaries."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Variable Selector */}
        <div className="lg:col-span-5 space-y-4">
          <ConceptCard>
            <span className="text-xs font-mono font-bold text-slate-300 uppercase block mb-3">
              Select Variable to Look Up
            </span>

            <div className="space-y-2">
              {Object.keys(lookupScenarios).map((key) => {
                const item = lookupScenarios[key];
                const isSelected = targetVar === key;

                return (
                  <button
                    key={key}
                    onClick={() => setTargetVar(key)}
                    className={`w-full p-3 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-indigo/20 border-brand-indigo text-white shadow-glow-sm'
                        : 'bg-atlas-950/60 border-atlas-border text-slate-300 hover:bg-atlas-900'
                    }`}
                  >
                    <span>console.log({item.name});</span>
                    <span className={`text-[10px] font-bold ${item.color}`}>
                      {item.foundAt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step-by-step Search Log */}
            <div className="mt-5 pt-4 border-t border-atlas-border space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                Engine Scope Walk Log
              </span>
              <div className="space-y-1.5 font-mono text-xs">
                {currentLookup.steps.map((st, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-atlas-950 text-slate-300 border border-slate-800 text-[11px]"
                  >
                    {st}
                  </div>
                ))}
              </div>
            </div>
          </ConceptCard>
        </div>

        {/* Visual Russian-Doll Nested Scope Hierarchy */}
        <div className="lg:col-span-7">
          <ConceptCard glow={true} className="bg-atlas-900 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                <span className="text-xs font-mono font-bold text-slate-300">
                  Nested Lexical Environments
                </span>
                <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  <span>Outward Search Only</span>
                </span>
              </div>

              {/* 1. Global Scope (Outer Layer) */}
              <div className="p-4 rounded-2xl bg-amber-950/10 border-2 border-dashed border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-amber-400">
                  <span className="font-bold">🌍 GLOBAL SCOPE</span>
                  <span>const globalVar = "App";</span>
                </div>

                {/* 2. Function Scope (Middle Layer) */}
                <div className="p-4 rounded-xl bg-sky-950/20 border-2 border-dashed border-sky-500/40 space-y-3 ml-2 sm:ml-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-sky-400">
                    <span className="font-bold">⚡ FUNCTION SCOPE</span>
                    <span>let fnVar = 42;</span>
                  </div>

                  {/* 3. Block Scope (Innermost Layer) */}
                  <div className="p-4 rounded-lg bg-emerald-950/30 border-2 border-emerald-500/50 space-y-2 ml-2 sm:ml-4 shadow-glow-emerald">
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
                      <span className="font-bold">🔒 BLOCK SCOPE {'{ ... }'}</span>
                      <span>const blockVar = true;</span>
                    </div>

                    <div className="pt-2 text-center text-xs font-mono text-white bg-atlas-950/80 p-2 rounded border border-emerald-500/30">
                      Target Access: <span className="text-amber-300 font-bold">console.log({targetVar});</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-atlas-border text-xs text-slate-400">
              The engine searches inward-outward. Inner scopes inherit outer variables, but outer scopes cannot see inward.
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
