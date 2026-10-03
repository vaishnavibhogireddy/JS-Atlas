import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { RefreshCw, Play, Sparkles, ArrowRight, Code, Terminal } from 'lucide-react';

export default function InteractiveVariableBox() {
  const [score, setScore] = useState(10);
  const [history, setHistory] = useState([
    { code: 'let score = 10;', action: 'Initialization', time: 't=0' },
  ]);
  const [customInput, setCustomInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const applyChange = (newValue, codeString, actionName) => {
    setIsUpdating(true);
    setScore(newValue);
    setHistory((prev) => [
      { code: codeString, action: actionName, time: `t=${prev.length}` },
      ...prev.slice(0, 3), // Keep last 4 steps
    ]);
    setTimeout(() => setIsUpdating(false), 300);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    // Check if input is a number or string
    const num = Number(customInput);
    if (!isNaN(num) && customInput.trim() !== '') {
      applyChange(num, `score = ${num};`, 'Custom Number Assigned');
    } else {
      applyChange(customInput, `score = "${customInput}";`, 'Custom String Assigned');
    }
    setCustomInput('');
  };

  const handleReset = () => {
    setIsUpdating(true);
    setScore(10);
    setHistory([{ code: 'let score = 10;', action: 'Reset to Initial', time: 't=0' }]);
    setTimeout(() => setIsUpdating(false), 300);
  };

  // Determine type
  const scoreType = typeof score;

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="4"
        title="Visual Variable Box"
        subtitle="Experience how reassignment updates the contents of a memory slot."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Controls & Execution History */}
        <div className="lg:col-span-6 space-y-4">
          <ConceptCard>
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Trigger Reassignment Actions
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <button
                onClick={() => applyChange(20, 'score = 20;', 'Reassigned 10 → 20')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold transition-all ${
                  score === 20
                    ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-glow-sm'
                    : 'bg-atlas-950 border-atlas-border text-slate-300 hover:border-slate-600 hover:bg-atlas-900'
                }`}
              >
                score = 20;
              </button>

              <button
                onClick={() =>
                  applyChange(
                    typeof score === 'number' ? score + 5 : 5,
                    `score = score + 5;`,
                    'Incremented by 5'
                  )
                }
                className="py-2.5 px-3 rounded-xl border bg-atlas-950 border-atlas-border text-slate-300 hover:border-slate-600 hover:bg-atlas-900 text-xs font-mono font-semibold transition-all"
              >
                score += 5;
              </button>

              <button
                onClick={() => applyChange(100, 'score = 100;', 'High Score Assigned')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold transition-all ${
                  score === 100
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-glow-yellow'
                    : 'bg-atlas-950 border-atlas-border text-slate-300 hover:border-slate-600 hover:bg-atlas-900'
                }`}
              >
                score = 100;
              </button>

              <button
                onClick={() => applyChange('Level 2', 'score = "Level 2";', 'Type Changed (String)')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-semibold transition-all ${
                  score === 'Level 2'
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-glow-md'
                    : 'bg-atlas-950 border-atlas-border text-slate-300 hover:border-slate-600 hover:bg-atlas-900'
                }`}
              >
                score = "Level 2";
              </button>
            </div>

            {/* Custom Input */}
            <form onSubmit={handleCustomSubmit} className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type custom value e.g. 99 or 'Winner'..."
                className="flex-1 bg-atlas-950 border border-atlas-border rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-indigo"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-brand-indigo hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-glow-sm flex items-center gap-1 shrink-0"
              >
                <span>Assign</span>
                <Play className="w-3 h-3 fill-white" />
              </button>
            </form>

            {/* Execution History */}
            <div className="mt-5 pt-4 border-t border-atlas-border">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-2">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span>Execution Timeline</span>
              </div>
              <div className="space-y-1.5 font-mono text-xs">
                {history.map((h, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      i === 0 ? 'bg-atlas-950 text-emerald-400 border border-emerald-500/30' : 'text-slate-500'
                    }`}
                  >
                    <span>{h.code}</span>
                    <span className="text-[10px] text-slate-500">{h.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </ConceptCard>
        </div>

        {/* Right: Live Visual Variable Box */}
        <div className="lg:col-span-6 flex flex-col">
          <ConceptCard glow={true} className="flex-1 flex flex-col justify-between bg-atlas-900">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-6">
                <span className="text-xs font-mono font-semibold text-slate-300">
                  Live Memory Slot Representation
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 text-sky-400 border border-sky-500/40">
                  Mutable Binding
                </span>
              </div>

              {/* The Physical Box Visualization */}
              <div className="flex flex-col items-center py-6 px-4">
                <div
                  className={`w-full max-w-sm rounded-2xl border-2 transition-all duration-300 bg-atlas-950/90 shadow-2xl p-6 ${
                    isUpdating
                      ? 'scale-105 border-brand-blue shadow-glow-md'
                      : 'border-brand-indigo/40'
                  }`}
                >
                  {/* Top Bar inside box */}
                  <div className="flex items-center justify-between pb-3 border-b border-atlas-border">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">identifier:</span>
                      <span className="font-mono font-bold text-sky-300 text-sm">score</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      typeof: {scoreType}
                    </span>
                  </div>

                  {/* Centered Value */}
                  <div className="py-8 text-center">
                    <div
                      className={`text-4xl font-mono font-black tracking-wider transition-all duration-200 ${
                        isUpdating
                          ? 'text-brand-blue scale-110'
                          : typeof score === 'string'
                          ? 'text-purple-300'
                          : 'text-amber-400'
                      }`}
                    >
                      {typeof score === 'string' ? `"${score}"` : score}
                    </div>
                  </div>

                  {/* Memory Address & Status */}
                  <div className="pt-3 border-t border-atlas-border flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Address: 0x00FF82</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active in Scope
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation footer */}
            <div className="mt-4 p-3 rounded-xl bg-atlas-950/60 border border-atlas-border text-center text-xs text-slate-300">
              When <code className="text-sky-300 font-mono">score = {typeof score === 'string' ? `"${score}"` : score}</code> executes, the old value is overwritten inside the same memory slot.
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
