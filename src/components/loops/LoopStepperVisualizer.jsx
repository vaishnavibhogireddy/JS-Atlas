import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { RotateCw, Play, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoopStepperVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('for'); // 'for' | 'forof_vs_forin'

  const maxSteps = 5; // i = 0, 1, 2, 3, 4, then stopped at 5

  const isCompleted = currentStep >= maxSteps;

  const handleNext = () => {
    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Loop Engine Stepper"
        subtitle="Watch the counter increment and test conditions at every cycle."
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('for')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'for'
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'bg-atlas-900 border border-atlas-border text-slate-400 hover:text-white'
          }`}
        >
          for Loop Stepper
        </button>
        <button
          onClick={() => setActiveTab('forof_vs_forin')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'forof_vs_forin'
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'bg-atlas-900 border border-atlas-border text-slate-400 hover:text-white'
          }`}
        >
          for...of (Values) vs for...in (Keys)
        </button>
      </div>

      {activeTab === 'for' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls & Code */}
          <div className="lg:col-span-6 space-y-4">
            <ConceptCard>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
                <span className="text-xs font-mono font-bold text-slate-300">
                  Target: for (let i = 0; i &lt; 5; i++)
                </span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Code Box with dynamic phase highlight */}
              <div className="p-4 rounded-xl bg-atlas-950 border border-atlas-border font-mono text-sm leading-relaxed space-y-1 shadow-inner">
                <div className="text-slate-300">
                  <span className="text-purple-400">for</span> (
                  <span className={currentStep === 0 ? 'bg-brand-indigo/40 text-brand-blue px-1 rounded' : 'text-slate-300'}>
                    let i = 0;
                  </span>{' '}
                  <span className={!isCompleted ? 'bg-amber-400/20 text-amber-300 px-1 rounded font-bold' : 'text-slate-300'}>
                    i &lt; 5;
                  </span>{' '}
                  <span className={currentStep > 0 && !isCompleted ? 'bg-emerald-400/20 text-emerald-300 px-1 rounded' : 'text-slate-300'}>
                    i++
                  </span>
                  ) {'{'}
                </div>
                <div className="pl-6 text-emerald-400 font-bold">
                  console.log(i); // Outputs: {!isCompleted ? currentStep : 'Done'}
                </div>
                <div className="text-slate-300">{'}'}</div>
              </div>

              {/* Stepper controls */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Step {currentStep} of {maxSteps}
                </span>

                <button
                  disabled={isCompleted}
                  onClick={handleNext}
                  className="px-4 py-2 bg-brand-indigo hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-2 shadow-glow-sm"
                >
                  <span>{isCompleted ? 'Loop Finished' : 'Next Iteration (i++)'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </ConceptCard>
          </div>

          {/* Real-time State & Timeline */}
          <div className="lg:col-span-6">
            <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    Iteration Timeline
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isCompleted
                        ? 'bg-rose-950/60 border-rose-500/40 text-rose-400'
                        : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                    }`}
                  >
                    Condition: {currentStep} &lt; 5 ({isCompleted ? 'false → Stop' : 'true → Run'})
                  </span>
                </div>

                {/* Progress Nodes: 0 -> 1 -> 2 -> 3 -> 4 -> Stop */}
                <div className="flex items-center justify-between py-6 px-2">
                  {[0, 1, 2, 3, 4, 'stop'].map((nodeVal, idx) => {
                    const isPassed = typeof nodeVal === 'number' ? currentStep >= nodeVal : isCompleted;
                    const isCurrent = typeof nodeVal === 'number' ? currentStep === nodeVal : isCompleted;

                    return (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all ${
                              isCurrent
                                ? 'bg-amber-500 text-atlas-950 shadow-glow-yellow scale-110'
                                : isPassed
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-atlas-950 text-slate-600 border border-slate-800'
                            }`}
                          >
                            {nodeVal}
                          </div>
                          <span className="text-[9px] font-mono text-slate-500 mt-1">
                            {typeof nodeVal === 'number' ? `i=${nodeVal}` : 'exit'}
                          </span>
                        </div>
                        {idx < 5 && (
                          <div
                            className={`flex-1 h-0.5 mx-1 transition-all ${
                              currentStep > idx ? 'bg-emerald-500' : 'bg-slate-800'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-atlas-border text-xs text-slate-300">
                {isCompleted ? (
                  <span className="text-amber-300 font-mono">
                    ✓ Condition (5 &lt; 5) evaluated to false. Loop terminated smoothly.
                  </span>
                ) : (
                  <span>
                    Executing body with <code className="text-sky-300 font-mono">i = {currentStep}</code>.
                  </span>
                )}
              </div>
            </ConceptCard>
          </div>
        </div>
      )}

      {activeTab === 'forof_vs_forin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptCard glow={true} borderColor="border-emerald-500/40">
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                for...of (Values) — Best for Arrays
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">
                Iterables
              </span>
            </div>
            <pre className="p-3 bg-atlas-950 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto mb-3">
              <code>{`const fruits = ["🍎 Apple", "🍌 Banana"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}`}</code>
            </pre>
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs font-mono text-emerald-300">
              Outputs values directly: "🍎 Apple", "🍌 Banana"
            </div>
          </ConceptCard>

          <ConceptCard glow={true} borderColor="border-sky-500/40">
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase">
                for...in (Keys) — Best for Objects
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300">
                Object Properties
              </span>
            </div>
            <pre className="p-3 bg-atlas-950 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto mb-3">
              <code>{`const user = { name: "Vaishnavi", age: 19 };\nfor (const key in user) {\n  console.log(key, user[key]);\n}`}</code>
            </pre>
            <div className="p-2.5 rounded-lg bg-sky-950/30 border border-sky-500/20 text-xs font-mono text-sky-300">
              Outputs keys: "name" → "Vaishnavi", "age" → 19
            </div>
          </ConceptCard>
        </div>
      )}
    </section>
  );
}
