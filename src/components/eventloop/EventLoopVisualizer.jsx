import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Activity, ArrowRight, RotateCcw, Play, CheckCircle2, RefreshCw } from 'lucide-react';

export default function EventLoopVisualizer({ classicExample, components }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      action: 'Line 1: console.log("A")',
      callStack: ['console.log("A")'],
      webApis: [],
      queue: [],
      output: ['A'],
      desc: '`console.log("A")` is pushed onto the Call Stack, executes immediately, logs "A", and pops off.',
    },
    {
      action: 'Line 3: setTimeout(() => log("B"), 0)',
      callStack: ['setTimeout(...)'],
      webApis: ['Timer (0ms)'],
      queue: [],
      output: ['A'],
      desc: '`setTimeout` is pushed to the Call Stack. It registers the timer callback with Web APIs and immediately pops off the stack.',
    },
    {
      action: 'Timer completes in Web APIs',
      callStack: [],
      webApis: [],
      queue: ['() => console.log("B")'],
      output: ['A'],
      desc: 'Web APIs timer completes and places the callback into the Task Queue. It cannot run yet because code is executing.',
    },
    {
      action: 'Line 7: console.log("C")',
      callStack: ['console.log("C")'],
      webApis: [],
      queue: ['() => console.log("B")'],
      output: ['A', 'C'],
      desc: '`console.log("C")` is pushed to Call Stack, executes, logs "C", and pops off.',
    },
    {
      action: 'Event Loop pushes callback to Stack',
      callStack: ['console.log("B")'],
      webApis: [],
      queue: [],
      output: ['A', 'C', 'B'],
      desc: 'Call Stack is now empty! The Event Loop picks `() => log("B")` from the Task Queue, pushes it onto the Call Stack, and logs "B".',
    },
  ];

  const current = steps[currentStep];

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Event Loop Execution Simulator"
        subtitle="Step through the classic 'A -> C -> B' example to see the Event Loop in action."
      />

      <div className="space-y-6">
        {/* The 4 Event Loop Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 1. Call Stack */}
          <div className="p-4 rounded-2xl bg-atlas-900 border-2 border-brand-indigo/40 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-atlas-border text-xs font-mono font-bold text-sky-400">
              <span>1. CALL STACK</span>
              <span className="text-[10px] text-slate-500">LIFO</span>
            </div>
            <div className="min-h-[70px] flex flex-col justify-end gap-1.5 font-mono text-xs">
              {current.callStack.length === 0 ? (
                <span className="text-slate-600 text-center py-4 italic text-[11px]">[ Empty Stack ]</span>
              ) : (
                current.callStack.map((item, i) => (
                  <div key={i} className="p-2 rounded bg-brand-indigo/20 border border-brand-indigo/60 text-white font-bold text-center animate-pulse">
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 2. Web APIs */}
          <div className="p-4 rounded-2xl bg-atlas-900 border-2 border-amber-500/40 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-atlas-border text-xs font-mono font-bold text-amber-400">
              <span>2. WEB APIs</span>
              <span className="text-[10px] text-slate-500">Background</span>
            </div>
            <div className="min-h-[70px] flex flex-col justify-center gap-1.5 font-mono text-xs">
              {current.webApis.length === 0 ? (
                <span className="text-slate-600 text-center py-4 italic text-[11px]">[ Idle ]</span>
              ) : (
                current.webApis.map((item, i) => (
                  <div key={i} className="p-2 rounded bg-amber-950/40 border border-amber-500/50 text-amber-300 text-center">
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 3. Task Queue */}
          <div className="p-4 rounded-2xl bg-atlas-900 border-2 border-purple-500/40 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-atlas-border text-xs font-mono font-bold text-purple-400">
              <span>3. TASK QUEUE</span>
              <span className="text-[10px] text-slate-500">FIFO</span>
            </div>
            <div className="min-h-[70px] flex flex-col justify-center gap-1.5 font-mono text-xs">
              {current.queue.length === 0 ? (
                <span className="text-slate-600 text-center py-4 italic text-[11px]">[ Queue Empty ]</span>
              ) : (
                current.queue.map((item, i) => (
                  <div key={i} className="p-2 rounded bg-purple-950/40 border border-purple-500/50 text-purple-300 text-center truncate">
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 4. Console Output */}
          <div className="p-4 rounded-2xl bg-atlas-900 border-2 border-emerald-500/40 space-y-2 shadow-glow-emerald">
            <div className="flex items-center justify-between pb-2 border-b border-atlas-border text-xs font-mono font-bold text-emerald-400">
              <span>4. CONSOLE OUTPUT</span>
              <span className="text-[10px] text-slate-500">Stdout</span>
            </div>
            <div className="min-h-[70px] flex items-center justify-center gap-2 font-mono text-lg font-bold text-amber-400">
              {current.output.join(' → ') || '[ No output yet ]'}
            </div>
          </div>
        </div>

        {/* Stepper Description & Controls */}
        <ConceptCard glow={true}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-brand-blue uppercase">
                Step {currentStep + 1} of {steps.length}: {current.action}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {current.desc}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setCurrentStep(0)}
                className="px-3 py-2 rounded-xl bg-atlas-950 border border-atlas-border text-xs font-mono text-slate-400 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                disabled={currentStep === steps.length - 1}
                onClick={() => setCurrentStep((s) => s + 1)}
                className="px-4 py-2 bg-brand-indigo hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 shadow-glow-sm"
              >
                <span>Next Loop Tick</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ConceptCard>
      </div>
    </section>
  );
}
