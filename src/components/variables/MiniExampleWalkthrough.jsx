import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Play, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

export default function MiniExampleWalkthrough({ exampleData }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = exampleData.steps;
  const activeStep = steps[currentStep];

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="8"
        title="Mini Example Walkthrough"
        subtitle="Step-by-step execution simulation of realistic JavaScript code."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Code with Active Line Pointer */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="rounded-2xl bg-atlas-900 border border-atlas-border p-5 shadow-xl font-mono text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4 text-xs text-slate-400">
              <span className="font-bold text-slate-300">script.js</span>
              <span>Step {currentStep + 1} of {steps.length}</span>
            </div>

            {/* Code Lines */}
            <div className="space-y-1.5">
              {steps.map((s, idx) => {
                const isActive = currentStep === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`cursor-pointer flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                      isActive
                        ? 'bg-brand-indigo/20 border border-brand-indigo/60 text-white shadow-glow-sm'
                        : 'text-slate-400 hover:bg-atlas-950/60 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-5 text-right text-slate-600 select-none text-xs">
                      {s.line}
                    </span>
                    <span className="font-bold">{s.code}</span>
                    {isActive && (
                      <span className="ml-auto text-[10px] font-mono text-brand-blue bg-brand-indigo/20 px-2 py-0.5 rounded">
                        Executing
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Stepper buttons */}
            <div className="mt-6 pt-4 border-t border-atlas-border flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(0)}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white font-mono transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
                  className="px-3 py-1.5 rounded-lg bg-atlas-950 border border-atlas-border text-xs font-mono text-slate-300 disabled:opacity-30 hover:bg-atlas-800"
                >
                  Previous
                </button>
                <button
                  disabled={currentStep === steps.length - 1}
                  onClick={() => setCurrentStep((p) => Math.min(steps.length - 1, p + 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-brand-indigo hover:bg-indigo-500 text-white text-xs font-mono font-bold shadow-glow-sm disabled:opacity-30 flex items-center gap-1"
                >
                  <span>Next Line</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Realtime Memory State Inspector */}
        <div className="lg:col-span-6">
          <ConceptCard glow={true} className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                <span className="text-xs font-mono font-semibold text-slate-300">
                  Execution State Inspector
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  Line {activeStep.line} Active
                </span>
              </div>

              {/* Action Description */}
              <div className="p-3.5 rounded-xl bg-atlas-950 border border-atlas-border mb-4">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activeStep.action}
                </p>
              </div>

              {/* Memory Table */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                  Active Scope Memory Variables
                </span>

                {activeStep.memory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      item.status === 'updated'
                        ? 'bg-amber-950/30 border-amber-500/50 shadow-glow-yellow'
                        : item.status === 'locked'
                        ? 'bg-slate-950/60 border-slate-700/60'
                        : 'bg-atlas-950 border-brand-indigo/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-emerald-400">
                        {item.val}
                      </span>
                      {item.status === 'locked' && (
                        <span className="text-[10px] font-mono text-slate-500">const</span>
                      )}
                      {item.status === 'updated' && (
                        <span className="text-[10px] font-mono text-amber-400 font-bold animate-pulse">
                          Reassigned
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400 pt-3 border-t border-atlas-border leading-relaxed">
              {exampleData.explanation}
            </p>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
