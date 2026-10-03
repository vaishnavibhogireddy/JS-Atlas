import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Lock, Plus, RefreshCw, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ClosureCounterVisualizer() {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Closure Counter Sandbox"
        subtitle="Watch the inner function retain living private memory state across invocations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code Structure */}
        <div className="lg:col-span-6 space-y-4">
          <ConceptCard>
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
              <span className="text-xs font-mono font-bold text-slate-300">
                Closure Blueprint
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-indigo/30 text-brand-blue border border-brand-indigo/40">
                Encapsulation
              </span>
            </div>

            <pre className="p-4 rounded-xl bg-atlas-950 font-mono text-xs text-slate-200 leading-relaxed border border-atlas-border overflow-x-auto">
              <code>{`function createCounter() {
  let count = 0; // 🔒 Private enclosed variable

  return function() {
    count++;     // Mutates private variable
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();`}</code>
            </pre>

            <div className="mt-4 p-3 bg-atlas-950/60 rounded-xl border border-slate-800 text-xs text-slate-300">
              `createCounter()` has already executed and returned. Yet the returned inner function still holds a living memory reference to `count`!
            </div>
          </ConceptCard>
        </div>

        {/* Right: Live Interactive Closure Instances */}
        <div className="lg:col-span-6 space-y-4">
          <ConceptCard glow={true} className="bg-atlas-900">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-4">
              Independent Living Closure Instances
            </span>

            {/* Instance A */}
            <div className="p-4 rounded-xl bg-atlas-950 border border-emerald-500/40 space-y-3 mb-4 shadow-glow-emerald">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Instance A: counterA()</span>
                </div>
                <button
                  onClick={() => setCountA(0)}
                  className="text-slate-500 hover:text-white"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-slate-400">
                  Private count: <strong className="text-2xl text-amber-300 font-black ml-2">{countA}</strong>
                </div>

                <button
                  onClick={() => setCountA((c) => c + 1)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-atlas-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>counterA()</span>
                </button>
              </div>
            </div>

            {/* Instance B */}
            <div className="p-4 rounded-xl bg-atlas-950 border border-sky-500/40 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-sky-400 font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Instance B: counterB() (Independent)</span>
                </div>
                <button
                  onClick={() => setCountB(0)}
                  className="text-slate-500 hover:text-white"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-slate-400">
                  Private count: <strong className="text-2xl text-sky-300 font-black ml-2">{countB}</strong>
                </div>

                <button
                  onClick={() => setCountB((c) => c + 1)}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-atlas-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>counterB()</span>
                </button>
              </div>
            </div>

            <div className="pt-2 text-xs font-mono text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero global variable pollution: state is completely private.</span>
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
