import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { ArrowDown, Database, Cpu, Sparkles } from 'lucide-react';

export default function QuickIdeaVisual({ data }) {
  const [activeTab, setActiveTab] = useState('vaishnavi');

  const examples = {
    vaishnavi: { name: 'name', value: '"Vaishnavi"', type: 'String', memory: '0x7FFD01' },
    score: { name: 'score', value: '42', type: 'Number', memory: '0x7FFD02' },
    isOnline: { name: 'isOnline', value: 'true', type: 'Boolean', memory: '0x7FFD03' },
  };

  const current = examples[activeTab];

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="1"
        title={data.heading}
        subtitle="The fundamental mental model for how computers store information."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Concise Explanation */}
        <div className="lg:col-span-6 space-y-4">
          <ConceptCard>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              A <span className="text-brand-blue font-semibold">variable</span> is a human-friendly name that points to a specific slot in computer memory where a value is stored.
            </p>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Instead of tracking random memory addresses or hardcoding values across your codebase, you assign a label. When you ask for the label, JavaScript looks up the value.
            </p>

            <div className="mt-5 pt-4 border-t border-atlas-border space-y-2">
              {data.bulletPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </ConceptCard>
        </div>

        {/* Right: Visual Pointer Diagram */}
        <div className="lg:col-span-6">
          <ConceptCard glow={true} className="bg-atlas-900/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-brand-indigo" />
                  <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                    Memory Model Diagram
                  </span>
                </div>

                {/* Example switcher */}
                <div className="flex items-center gap-1 bg-atlas-950 p-1 rounded-lg border border-atlas-border">
                  {Object.keys(examples).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-all ${
                        activeTab === key
                          ? 'bg-brand-indigo text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Pointer Visualization */}
              <div className="flex flex-col items-center py-6 px-4 bg-atlas-950/70 rounded-xl border border-slate-800/80 space-y-4">
                {/* 1. Variable Identifier Label */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                    Identifier (Label)
                  </span>
                  <div className="px-6 py-2.5 rounded-xl bg-sky-500/10 border-2 border-sky-400 text-sky-300 font-mono font-bold text-lg shadow-glow-sm">
                    {current.name}
                  </div>
                </div>

                {/* 2. Downward Pointer */}
                <div className="flex flex-col items-center text-slate-500 animate-bounce">
                  <ArrowDown className="w-5 h-5 text-brand-blue" />
                  <span className="text-[9px] font-mono text-slate-400">points to memory</span>
                </div>

                {/* 3. Physical Memory Slot */}
                <div className="w-full max-w-xs p-4 rounded-xl bg-atlas-900 border border-brand-indigo/40 shadow-glow-md">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2 border-b border-atlas-border pb-1.5">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Database className="w-3 h-3" />
                      Slot: {current.memory}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                      {current.type}
                    </span>
                  </div>
                  <div className="text-center py-2 text-xl font-mono font-bold text-amber-300 bg-atlas-950/80 rounded-lg border border-amber-500/20">
                    {current.value}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs text-slate-400 font-mono">
                Code syntax: <code className="text-sky-300 bg-slate-800/60 px-1.5 py-0.5 rounded font-bold">let {current.name} = {current.value};</code>
              </span>
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
