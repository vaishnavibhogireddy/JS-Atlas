import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Globe, Database, Play, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

export default function WebAPISandbox() {
  const [activeTab, setActiveTab] = useState('fetch'); // 'fetch' | 'storage'

  // Fetch state
  const [endpoint, setEndpoint] = useState('/api/users/1');
  const [fetchResult, setFetchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Storage state
  const [storageKey, setStorageKey] = useState('theme');
  const [storageVal, setStorageVal] = useState('dark');
  const [storageItems, setStorageItems] = useState({
    theme: '"dark"',
    sessionId: '"sess_894f2"',
    hasSeenTour: 'true',
  });

  const handleSimulateFetch = () => {
    setIsLoading(true);
    setFetchResult({ status: 'fetching', message: 'Sending HTTP GET request...' });

    setTimeout(() => {
      if (endpoint.includes('users')) {
        setFetchResult({
          status: 200,
          ok: true,
          data: { id: 1, name: 'Vaishnavi', role: 'developer', city: 'Bhimavaram' },
        });
      } else {
        setFetchResult({
          status: 404,
          ok: false,
          data: { error: 'Resource Not Found (response.ok is false!)' },
        });
      }
      setIsLoading(false);
    }, 500);
  };

  const handleSaveStorage = (e) => {
    e.preventDefault();
    if (!storageKey.trim()) return;
    setStorageItems({
      ...storageItems,
      [storageKey.trim()]: JSON.stringify(storageVal),
    });
    setStorageKey('');
    setStorageVal('');
  };

  const handleDeleteStorage = (k) => {
    const updated = { ...storageItems };
    delete updated[k];
    setStorageItems(updated);
  };

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Web API Workbench"
        subtitle="Test browser platform capabilities: Fetch networking and localStorage persistence."
      />

      {/* Mode Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('fetch')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'fetch'
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'bg-atlas-900 border border-atlas-border text-slate-400 hover:text-white'
          }`}
        >
          Fetch API (Networking)
        </button>
        <button
          onClick={() => setActiveTab('storage')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            activeTab === 'storage'
              ? 'bg-brand-indigo text-white shadow-glow-sm'
              : 'bg-atlas-900 border border-atlas-border text-slate-400 hover:text-white'
          }`}
        >
          localStorage (Persistence)
        </button>
      </div>

      {activeTab === 'fetch' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <ConceptCard>
              <span className="text-xs font-mono font-bold uppercase text-slate-300 block mb-3">
                Select Request Endpoint
              </span>

              <div className="space-y-2">
                <button
                  onClick={() => setEndpoint('/api/users/1')}
                  className={`w-full p-2.5 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between ${
                    endpoint === '/api/users/1'
                      ? 'bg-brand-indigo/20 border-brand-indigo text-white'
                      : 'bg-atlas-950/60 border-atlas-border text-slate-400 hover:text-white'
                  }`}
                >
                  <span>GET /api/users/1</span>
                  <span className="text-[10px] text-emerald-400 font-bold">200 OK</span>
                </button>

                <button
                  onClick={() => setEndpoint('/api/broken-path')}
                  className={`w-full p-2.5 rounded-xl border text-left font-mono text-xs transition-all flex items-center justify-between ${
                    endpoint === '/api/broken-path'
                      ? 'bg-brand-indigo/20 border-brand-indigo text-white'
                      : 'bg-atlas-950/60 border-atlas-border text-slate-400 hover:text-white'
                  }`}
                >
                  <span>GET /api/broken-path</span>
                  <span className="text-[10px] text-rose-400 font-bold">404 Error</span>
                </button>
              </div>

              <button
                onClick={handleSimulateFetch}
                disabled={isLoading}
                className="mt-4 w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-atlas-950 rounded-xl text-xs font-mono font-bold shadow-glow-emerald flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>await fetch("{endpoint}")</span>
              </button>
            </ConceptCard>
          </div>

          <div className="lg:col-span-7">
            <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    Fetch Response Inspector
                  </span>
                  {fetchResult && fetchResult.status !== 'fetching' && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        fetchResult.ok
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      HTTP {fetchResult.status} (response.ok = {String(fetchResult.ok)})
                    </span>
                  )}
                </div>

                <div className="p-4 bg-atlas-950 rounded-xl border border-atlas-border font-mono text-xs">
                  {fetchResult ? (
                    <pre className="text-emerald-300 whitespace-pre-wrap">
                      <code>{JSON.stringify(fetchResult.data || fetchResult.message, null, 2)}</code>
                    </pre>
                  ) : (
                    <span className="text-slate-500 italic">Click "await fetch" to send HTTP request...</span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-atlas-border text-xs text-slate-400">
                Always verify <code className="text-sky-300 font-mono">if (!response.ok)</code> before parsing response JSON.
              </div>
            </ConceptCard>
          </div>
        </div>
      )}

      {activeTab === 'storage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <ConceptCard>
              <span className="text-xs font-mono font-bold uppercase text-slate-300 block mb-3">
                localStorage.setItem(key, value)
              </span>

              <form onSubmit={handleSaveStorage} className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">Storage Key</label>
                  <input
                    type="text"
                    value={storageKey}
                    onChange={(e) => setStorageKey(e.target.value)}
                    placeholder="e.g. userToken"
                    className="w-full bg-atlas-950 border border-atlas-border rounded-xl px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-brand-indigo"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">Value String</label>
                  <input
                    type="text"
                    value={storageVal}
                    onChange={(e) => setStorageVal(e.target.value)}
                    placeholder="e.g. xyz_99"
                    className="w-full bg-atlas-950 border border-atlas-border rounded-xl px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-brand-indigo"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-brand-indigo hover:bg-indigo-500 text-white rounded-xl text-xs font-mono font-bold shadow-glow-sm"
                >
                  Save to localStorage
                </button>
              </form>
            </ConceptCard>
          </div>

          <div className="lg:col-span-7">
            <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    Live Origin Storage Table
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Quota: ~5MB
                  </span>
                </div>

                <div className="p-3 bg-atlas-950 rounded-xl border border-atlas-border space-y-2">
                  {Object.entries(storageItems).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between p-2 rounded bg-atlas-900 border border-slate-800 text-xs font-mono">
                      <div>
                        <span className="text-sky-300 font-bold">{k}: </span>
                        <span className="text-amber-300">{v}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteStorage(k)}
                        className="text-slate-500 hover:text-rose-400 p-1 text-[11px]"
                      >
                        removeItem()
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-atlas-border text-xs text-slate-400">
                Values survive browser restarts until explicitly cleared.
              </div>
            </ConceptCard>
          </div>
        </div>
      )}
    </section>
  );
}
