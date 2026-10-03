import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { FastForward, ArrowDown, Play, RotateCcw, Clock, Sparkles } from 'lucide-react';

export default function CallbackFlowVisualizer() {
  const [name, setName] = useState('Vaishnavi');
  const [callbackType, setCallbackType] = useState('welcome');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('1. greet() received arguments...');

    setTimeout(() => {
      let msg = '';
      if (callbackType === 'welcome') {
        msg = `Welcome to JS Atlas, ${name}!`;
      } else if (callbackType === 'shout') {
        msg = `HELLO ${name.toUpperCase()}!!!`;
      } else {
        msg = `User ${name} logged in at ${new Date().toLocaleTimeString()}`;
      }
      setOutput(`2. Callback executed:\n→ "${msg}"`);
      setIsRunning(false);
    }, 400);
  };

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Callback Execution Flow"
        subtitle="Experience passing a function into another function as a parameter."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-6 space-y-4">
          <ConceptCard glow={true}>
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
              <span className="text-xs font-mono font-bold text-slate-300">
                Setup Callback Arguments
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-indigo/30 text-brand-blue">
                Higher-Order Function
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  Name Argument:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-atlas-950 border border-atlas-border rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-brand-indigo"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  Select Callback Function to Pass:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'welcome', label: 'welcomeUser' },
                    { id: 'shout', label: 'shoutName' },
                    { id: 'log', label: 'logTimestamp' },
                  ].map((cb) => (
                    <button
                      key={cb.id}
                      onClick={() => setCallbackType(cb.id)}
                      className={`p-2 rounded-xl text-xs font-mono transition-all border ${
                        callbackType === cb.id
                          ? 'bg-brand-indigo text-white font-bold border-brand-indigo shadow-glow-sm'
                          : 'bg-atlas-950 text-slate-400 border-atlas-border hover:text-white'
                      }`}
                    >
                      {cb.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRun}
                disabled={isRunning}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-atlas-950 rounded-xl text-xs font-mono font-bold shadow-glow-emerald flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute: greet("{name}", {callbackType}Fn)</span>
              </button>
            </div>
          </ConceptCard>
        </div>

        {/* Right: Visual Pipeline */}
        <div className="lg:col-span-6">
          <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                <span className="text-xs font-mono font-bold text-slate-300">
                  Execution Flow Pipeline
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  Function Inversion
                </span>
              </div>

              {/* Step 1: Outer Function */}
              <div className="p-3.5 rounded-xl bg-atlas-950 border border-brand-indigo/40 space-y-1 text-center">
                <span className="text-[10px] font-mono text-brand-blue uppercase font-bold">
                  Step 1: Outer Function (greet)
                </span>
                <p className="text-xs font-mono text-slate-200">
                  function greet(name, callback) {'{'} callback(name); {'}'}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center my-2 text-brand-blue animate-bounce">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Step 2: Callback Invocation */}
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1 text-center shadow-glow-emerald">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                  Step 2: Passed Callback Invocation ({callbackType})
                </span>
                <pre className="text-xs font-mono font-bold text-amber-300 whitespace-pre-line">
                  {output || 'Click Execute to trigger the callback'}
                </pre>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-atlas-border text-xs text-slate-400">
              The outer function delegates the final action to the callback function.
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
