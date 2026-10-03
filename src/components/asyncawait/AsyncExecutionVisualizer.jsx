import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Zap, Play, ArrowRight, RotateCcw, CheckCircle2, PauseCircle } from 'lucide-react';

export default function AsyncExecutionVisualizer({ comparison }) {
  const [step, setStep] = useState(0);

  const executionSteps = [
    {
      line: '1. Call async function loadUser()',
      state: 'Running',
      detail: 'Enters the async function. Main thread is active.',
      mainThread: 'Busy with loadUser()',
    },
    {
      line: '2. Hits `const user = await fetchUser();`',
      state: 'Paused at await',
      detail: 'Pauses execution of loadUser() only. Yields control back to the Event Loop.',
      mainThread: 'Free to handle clicks & animations',
    },
    {
      line: '3. fetchUser() Promise resolves with { name: "Vaishnavi" }',
      state: 'Resuming',
      detail: 'Event loop places the resumed async function continuation into microtask queue.',
      mainThread: 'Picks up resumed async function',
    },
    {
      line: '4. Variable `user` receives payload and proceeds to next line',
      state: 'Finished',
      detail: 'Execution completes, returning a resolved Promise with final data.',
      mainThread: 'Completed',
    },
  ];

  const currentStep = executionSteps[step];

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Async / Await Execution Flow"
        subtitle="Watch how await yields control back to the event loop without freezing the browser."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Comparison Code Tabs */}
        <div className="lg:col-span-6 space-y-4">
          <ConceptCard>
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
              <span className="text-xs font-mono font-bold text-slate-300">
                Promise Chaining vs Async / Await
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                  Traditional Promise Chaining (.then)
                </span>
                <pre className="p-3 bg-atlas-950 rounded-xl font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
                  <code>{comparison.promiseSyntax}</code>
                </pre>
              </div>

              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                  Modern Async / Await (Flat & Sequential)
                </span>
                <pre className="p-3 bg-atlas-950 rounded-xl font-mono text-xs text-emerald-400 border border-emerald-500/30 overflow-x-auto shadow-glow-emerald">
                  <code>{comparison.asyncSyntax}</code>
                </pre>
              </div>
            </div>
          </ConceptCard>
        </div>

        {/* Stepper Timeline */}
        <div className="lg:col-span-6">
          <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                <span className="text-xs font-mono font-bold text-slate-300">
                  Execution Stepper
                </span>
                <span className="text-xs font-mono text-brand-blue">
                  Step {step + 1} of {executionSteps.length}
                </span>
              </div>

              {/* Step Detail Card */}
              <div className="p-4 bg-atlas-950 rounded-xl border border-brand-indigo/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold">{currentStep.line}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      step === 1 ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'bg-emerald-950 text-emerald-300'
                    }`}
                  >
                    {currentStep.state}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {currentStep.detail}
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Main Browser Thread:</span>
                  <span className="text-emerald-400 font-bold">{currentStep.mainThread}</span>
                </div>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="mt-4 pt-3 border-t border-atlas-border flex items-center justify-between">
              <button
                onClick={() => setStep(0)}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>

              <button
                disabled={step === executionSteps.length - 1}
                onClick={() => setStep((s) => s + 1)}
                className="px-4 py-2 bg-brand-indigo hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-glow-sm"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
