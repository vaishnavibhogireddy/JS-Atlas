import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Layers, Plus, Trash2, Edit3, Sparkles, RefreshCw } from 'lucide-react';

export default function ObjectInspectorVisualizer() {
  const [userObj, setUserObj] = useState({
    name: 'Vaishnavi',
    age: 19,
    city: 'Bhimavaram',
    role: 'developer',
  });

  const [activeTab, setActiveTab] = useState('inspector'); // 'inspector' | 'staticMethods'
  const [newKey, setNewKey] = useState('');
  const [newVal, setNewVal] = useState('');

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!newKey.trim()) return;
    setUserObj({
      ...userObj,
      [newKey.trim()]: newVal.trim(),
    });
    setNewKey('');
    setNewVal('');
  };

  const handleDelete = (keyToDelete) => {
    const updated = { ...userObj };
    delete updated[keyToDelete];
    setUserObj(updated);
  };

  const handleReset = () => {
    setUserObj({
      name: 'Vaishnavi',
      age: 19,
      city: 'Bhimavaram',
      role: 'developer',
    });
  };

  const keys = Object.keys(userObj);
  const values = Object.values(userObj);
  const entries = Object.entries(userObj);

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Object Inspector"
        subtitle="Manipulate key-value pairs and inspect dictionary metadata in real time."
      />

      {/* Mode Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('inspector')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'inspector'
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'bg-atlas-900 border border-atlas-border text-slate-400 hover:text-white'
          }`}
        >
          Live Object Inspector
        </button>
        <button
          onClick={() => setActiveTab('staticMethods')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'staticMethods'
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'bg-atlas-900 border border-atlas-border text-slate-400 hover:text-white'
          }`}
        >
          Object.keys / values / entries
        </button>
      </div>

      {activeTab === 'inspector' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls to mutate object */}
          <div className="lg:col-span-6 space-y-4">
            <ConceptCard>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Add or Update Property
                </span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <form onSubmit={handleAddOrUpdate} className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">
                    Property Key Name
                  </label>
                  <input
                    type="text"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="e.g. status or rating"
                    className="w-full bg-atlas-950 border border-atlas-border rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-indigo"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">
                    Property Value
                  </label>
                  <input
                    type="text"
                    value={newVal}
                    onChange={(e) => setNewVal(e.target.value)}
                    placeholder="e.g. 'active' or 99"
                    className="w-full bg-atlas-950 border border-atlas-border rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-indigo"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-indigo hover:bg-indigo-500 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-glow-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Set user.{newKey || 'key'} = {newVal || 'value'}</span>
                </button>
              </form>
            </ConceptCard>
          </div>

          {/* Live Object Graphic */}
          <div className="lg:col-span-6">
            <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-blue" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      Memory Entity: user
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    Address: 0x00FA44
                  </span>
                </div>

                {/* The Object Container */}
                <div className="p-4 rounded-xl bg-atlas-950 border border-brand-indigo/40 space-y-2">
                  {Object.entries(userObj).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between p-2 rounded-lg bg-atlas-900/80 border border-slate-800 hover:border-slate-700 transition-colors text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sky-300 font-bold">{k}:</span>
                        <span className="text-amber-300">
                          {typeof v === 'string' ? `"${v}"` : String(v)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDelete(k)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                        title="Delete property"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-atlas-border flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Total Properties: {Object.keys(userObj).length}</span>
                <span className="text-emerald-400">dot notation: user.name</span>
              </div>
            </ConceptCard>
          </div>
        </div>
      )}

      {activeTab === 'staticMethods' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ConceptCard glow={true}>
            <span className="text-xs font-mono font-bold text-sky-400 block mb-2">
              Object.keys(user)
            </span>
            <pre className="p-3 bg-atlas-950 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
              <code>{JSON.stringify(keys, null, 2)}</code>
            </pre>
          </ConceptCard>

          <ConceptCard glow={true}>
            <span className="text-xs font-mono font-bold text-amber-400 block mb-2">
              Object.values(user)
            </span>
            <pre className="p-3 bg-atlas-950 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
              <code>{JSON.stringify(values, null, 2)}</code>
            </pre>
          </ConceptCard>

          <ConceptCard glow={true}>
            <span className="text-xs font-mono font-bold text-emerald-400 block mb-2">
              Object.entries(user)
            </span>
            <pre className="p-3 bg-atlas-950 rounded-xl font-mono text-xs text-slate-200 overflow-x-auto">
              <code>{JSON.stringify(entries, null, 2)}</code>
            </pre>
          </ConceptCard>
        </div>
      )}
    </section>
  );
}
