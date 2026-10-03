import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Layers, ArrowRight, RefreshCw, Sparkles, Plus, Trash2 } from 'lucide-react';

export default function ArrayTransformVisualizer({ transformations }) {
  const [activeTab, setActiveTab] = useState('transform'); // 'transform' | 'sandbox'
  const [selectedTransform, setSelectedTransform] = useState(0);

  // Sandbox state
  const [items, setItems] = useState([10, 20, 30]);

  const handlePush = () => {
    const nextVal = items.length > 0 ? items[items.length - 1] + 10 : 10;
    setItems([...items, nextVal]);
  };

  const handlePop = () => {
    if (items.length > 0) {
      setItems(items.slice(0, -1));
    }
  };

  const handleShift = () => {
    if (items.length > 0) {
      setItems(items.slice(1));
    }
  };

  const handleUnshift = () => {
    const firstVal = items.length > 0 ? Math.max(0, items[0] - 10) : 10;
    setItems([firstVal, ...items]);
  };

  const handleReset = () => {
    setItems([10, 20, 30]);
  };

  const curTrans = transformations[selectedTransform];

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Array Visualizer & Transforms"
        subtitle="Understand zero-indexed memory slots and modern functional transformations."
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('transform')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'transform'
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'bg-atlas-900 border border-atlas-border text-slate-400 hover:text-white'
          }`}
        >
          map / filter / reduce Transforms
        </button>
        <button
          onClick={() => setActiveTab('sandbox')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'sandbox'
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'bg-atlas-900 border border-atlas-border text-slate-400 hover:text-white'
          }`}
        >
          Indexed Array Sandbox
        </button>
      </div>

      {activeTab === 'transform' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {transformations.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTransform(idx)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedTransform === idx
                    ? 'bg-brand-indigo/20 border-brand-indigo text-white shadow-glow-sm'
                    : 'bg-atlas-900 border-atlas-border text-slate-400 hover:bg-atlas-850'
                }`}
              >
                <span className="font-mono text-xs font-bold text-sky-400 block mb-1">
                  {t.name.split('—')[0]}
                </span>
                <span className="text-xs text-slate-300 font-medium">{t.name.split('—')[1]}</span>
              </button>
            ))}
          </div>

          {/* Transformation Visual Diagram */}
          <ConceptCard glow={true} className="bg-atlas-900">
            <div className="flex flex-col items-center py-6 px-4 space-y-4 text-center">
              {/* Input Array */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Original Array
                </span>
                <div className="font-mono text-xl sm:text-2xl font-black text-sky-300 bg-atlas-950 px-6 py-2.5 rounded-xl border border-slate-800">
                  {curTrans.input}
                </div>
              </div>

              {/* Transformation Operator Badge */}
              <div className="flex flex-col items-center text-brand-blue animate-pulse">
                <span className="text-xs font-mono bg-brand-indigo/30 px-3 py-1 rounded-full border border-brand-indigo/40 text-brand-blue mb-1">
                  .{curTrans.name.split('(')[0]}({curTrans.operation})
                </span>
                <ArrowRight className="w-5 h-5 rotate-90" />
              </div>

              {/* Output Result */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  Resulting Output
                </span>
                <div className="font-mono text-xl sm:text-2xl font-black text-amber-400 bg-atlas-950 px-6 py-2.5 rounded-xl border border-emerald-500/40 shadow-glow-emerald">
                  {curTrans.output}
                </div>
              </div>
            </div>

            <div className="p-3 bg-atlas-950 rounded-xl border border-atlas-border text-xs text-slate-300 text-center">
              {curTrans.desc}
            </div>
          </ConceptCard>
        </div>
      )}

      {activeTab === 'sandbox' && (
        <ConceptCard glow={true}>
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-atlas-border">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                Array Manipulation Operations
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handlePush}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold hover:bg-emerald-900/50 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>push()</span>
                </button>
                <button
                  onClick={handlePop}
                  disabled={items.length === 0}
                  className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-400 text-xs font-mono font-bold hover:bg-rose-900/50 disabled:opacity-30"
                >
                  pop()
                </button>
                <button
                  onClick={handleUnshift}
                  className="px-3 py-1.5 rounded-lg bg-sky-950/60 border border-sky-500/40 text-sky-400 text-xs font-mono font-bold hover:bg-sky-900/50"
                >
                  unshift()
                </button>
                <button
                  onClick={handleShift}
                  disabled={items.length === 0}
                  className="px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-400 text-xs font-mono font-bold hover:bg-purple-900/50 disabled:opacity-30"
                >
                  shift()
                </button>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Indexed Memory Boxes */}
            <div className="p-6 bg-atlas-950 rounded-2xl border border-atlas-border overflow-x-auto">
              <div className="flex items-center gap-3 min-w-max justify-center">
                {items.length === 0 ? (
                  <span className="text-xs font-mono text-slate-500 italic">
                    [ Array is empty: length = 0 ]
                  </span>
                ) : (
                  items.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-[10px] font-mono text-slate-500 mb-1">
                        index: {idx}
                      </span>
                      <div className="w-16 h-16 rounded-xl bg-atlas-900 border-2 border-brand-indigo/40 text-amber-300 font-mono font-black text-lg flex items-center justify-center shadow-glow-sm transition-all hover:scale-105">
                        {val}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
              <span>Array.length: <strong className="text-white">{items.length}</strong></span>
              <span>Array.isArray: <strong className="text-emerald-400">true</strong></span>
            </div>
          </div>
        </ConceptCard>
      )}
    </section>
  );
}
