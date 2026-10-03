import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { ArrowRight, Check, Sparkles, Terminal } from 'lucide-react';

export default function DeclarationVisual({ data }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = data.steps[activeStepIndex];

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="2"
        title={data.heading}
        subtitle={data.subtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step Selector Cards */}
        <div className="lg:col-span-5 space-y-3">
          {data.steps.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start justify-between ${
                  isSelected
                    ? 'bg-atlas-850 border-brand-indigo shadow-glow-sm'
                    : 'bg-atlas-900/60 border-atlas-border hover:border-slate-700 hover:bg-atlas-850/50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-brand-indigo/30 text-brand-blue'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  <div className="mt-2 font-mono text-base font-bold text-white">
                    <code>{step.code}</code>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                    isSelected
                      ? 'bg-brand-indigo text-white'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Visual Engine Memory Simulation */}
        <div className="lg:col-span-7">
          <ConceptCard glow={true} className="h-full flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-semibold text-slate-300">
                    Engine State: {activeStep.title}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-950 text-sky-400 border border-sky-500/30">
                  {activeStep.badge}
                </span>
              </div>

              {/* Code Highlight */}
              <div className="p-3.5 rounded-xl bg-atlas-950 border border-atlas-border font-mono text-base text-emerald-400 font-bold mb-4 shadow-inner">
                {activeStep.code}
              </div>

              {/* Explanation text */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {activeStep.explanation}
              </p>

              {/* Memory Visual Box */}
              <div className="p-5 rounded-xl bg-atlas-950/80 border border-slate-800 flex flex-col items-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Allocated Memory Box
                </span>

                <div className="w-full max-w-sm rounded-xl border-2 border-dashed border-sky-400/50 bg-sky-950/20 p-4 transition-all duration-300">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-sky-500/20 pb-2">
                    <span className="text-sky-300 font-bold">Identifier: age</span>
                    <span className="text-slate-400 text-[11px]">Type: {activeStepIndex === 0 ? 'undefined' : 'number'}</span>
                  </div>

                  <div className="py-4 text-center">
                    <span
                      className={`text-2xl font-mono font-black ${
                        activeStepIndex === 0
                          ? 'text-slate-500 italic'
                          : 'text-amber-400 drop-shadow'
                      }`}
                    >
                      {activeStep.memoryState.value}
                    </span>
                  </div>

                  <div className="text-center pt-2 border-t border-sky-500/20 text-[11px] font-mono text-slate-400">
                    {activeStepIndex === 0 && 'Slot created in memory, empty for now.'}
                    {activeStepIndex === 1 && 'Stored numeric value 20 into the age slot.'}
                    {activeStepIndex === 2 && 'Created slot and assigned 20 in 1 atomic step.'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-atlas-border">
              <span>Next step:</span>
              <button
                onClick={() => setActiveStepIndex((prev) => (prev + 1) % data.steps.length)}
                className="text-brand-blue hover:text-white font-mono font-medium transition-colors"
              >
                Toggle next state →
              </button>
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
