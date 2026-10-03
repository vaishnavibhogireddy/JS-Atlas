import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Edit3, Plus, Trash2, Sparkles, RefreshCw, Palette, Type } from 'lucide-react';

export default function DOMManipulatorSandbox() {
  const [headingText, setHeadingText] = useState('Welcome to JS Atlas');
  const [isGlowing, setIsGlowing] = useState(false);
  const [badgeColor, setBadgeColor] = useState('emerald'); // 'emerald' | 'sky' | 'amber'
  const [itemsList, setItemsList] = useState(['Variables', 'Functions', 'Async / Await']);
  const [newItemInput, setNewItemInput] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemInput.trim()) return;
    setItemsList([...itemsList, newItemInput.trim()]);
    setNewItemInput('');
  };

  const handleRemoveItem = (index) => {
    setItemsList(itemsList.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setHeadingText('Welcome to JS Atlas');
    setIsGlowing(false);
    setBadgeColor('emerald');
    setItemsList(['Variables', 'Functions', 'Async / Await']);
  };

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive DOM Manipulation Lab"
        subtitle="Trigger real DOM mutations and observe instant updates in the rendered output."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-4">
          <ConceptCard>
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                DOM Mutation Controls
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-3">
              {/* 1. textContent Mutation */}
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  1. Mutate textContent: <code>heading.textContent = "..."</code>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={headingText}
                    onChange={(e) => setHeadingText(e.target.value)}
                    className="flex-1 bg-atlas-950 border border-atlas-border rounded-xl px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-brand-indigo"
                  />
                </div>
              </div>

              {/* 2. classList Toggle */}
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  2. Mutate classList: <code>card.classList.toggle("glow-mode")</code>
                </label>
                <button
                  onClick={() => setIsGlowing(!isGlowing)}
                  className={`w-full py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                    isGlowing
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-glow-yellow'
                      : 'bg-atlas-950 border-atlas-border text-slate-300 hover:bg-atlas-900'
                  }`}
                >
                  {isGlowing ? '✓ Class Active: "glow-mode"' : 'Toggle: card.classList.toggle("glow-mode")'}
                </button>
              </div>

              {/* 3. createElement & append */}
              <form onSubmit={handleAddItem}>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  3. createElement & append: <code>list.append(newItem)</code>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItemInput}
                    onChange={(e) => setNewItemInput(e.target.value)}
                    placeholder="New topic name..."
                    className="flex-1 bg-atlas-950 border border-atlas-border rounded-xl px-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-indigo"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-brand-indigo hover:bg-indigo-500 text-white rounded-xl text-xs font-mono font-bold shadow-glow-sm"
                  >
                    + append()
                  </button>
                </div>
              </form>
            </div>
          </ConceptCard>
        </div>

        {/* Live Rendered Element Box */}
        <div className="lg:col-span-6">
          <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                <span className="text-xs font-mono font-bold text-slate-300">
                  Live Rendered Document Fragment
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  Live DOM Output
                </span>
              </div>

              {/* The Live Interactive Component */}
              <div
                className={`p-5 rounded-2xl bg-atlas-950/90 border transition-all duration-300 ${
                  isGlowing ? 'border-amber-400 shadow-glow-yellow' : 'border-brand-indigo/40 shadow-xl'
                }`}
              >
                <h3 className="text-lg font-black text-white mb-2">
                  {headingText || 'Untitled'}
                </h3>

                <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Child List Elements (ul &gt; li)
                  </span>
                  {itemsList.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-atlas-900 border border-slate-800 text-xs font-mono text-slate-200"
                    >
                      <span>• {item}</span>
                      <button
                        onClick={() => handleRemoveItem(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Call item.remove()"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-atlas-border text-xs text-slate-400">
              JavaScript updates memory node objects, which the browser renders instantly without reloading.
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
