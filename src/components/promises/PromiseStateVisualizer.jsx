import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Sparkles, CheckCircle2, XCircle, Clock, RefreshCw, ArrowRight } from 'lucide-react';

export default function PromiseStateVisualizer({ states }) {
  const [promiseState, setPromiseState] = useState('pending'); // 'pending' | 'fulfilled' | 'rejected'
  const [dataPayload, setDataPayload] = useState(null);

  const handleResolve = () => {
    setPromiseState('fulfilled');
    setDataPayload({ status: 200, message: 'Data fetched successfully: { id: 1, user: "Vaishnavi" }' });
  };

  const handleReject = () => {
    setPromiseState('rejected');
    setDataPayload({ status: 500, error: 'NetworkError: Failed to reach remote host' });
  };

  const handleReset = () => {
    setPromiseState('pending');
    setDataPayload(null);
  };

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Promise State Machine"
        subtitle="Observe the 3 lifecycle states of a Promise in memory."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <ConceptCard>
            <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                Trigger State Transition
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset to Pending</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleResolve}
                disabled={promiseState !== 'pending'}
                className="w-full p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold flex items-center justify-between hover:bg-emerald-900/40 disabled:opacity-40 transition-all shadow-glow-emerald"
              >
                <span>resolve("Success Payload")</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={handleReject}
                disabled={promiseState !== 'pending'}
                className="w-full p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold flex items-center justify-between hover:bg-rose-900/40 disabled:opacity-40 transition-all"
              >
                <span>reject("Network Error")</span>
                <XCircle className="w-4 h-4 text-rose-400" />
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-atlas-border text-xs text-slate-400">
              Note: Once settled into Fulfilled or Rejected, a Promise cannot transition again.
            </div>
          </ConceptCard>

          {/* 3 State Cards */}
          <div className="space-y-2">
            {states.map((st, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border font-mono text-xs transition-all ${
                  promiseState.toUpperCase() === st.name
                    ? `${st.color} shadow-glow-sm font-bold scale-[1.02]`
                    : 'bg-atlas-950/60 border-atlas-border text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>{st.name}</span>
                  <span className="text-[10px]">{st.badge}</span>
                </div>
                <p className="text-[11px] font-sans text-slate-400">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Pipeline Display */}
        <div className="lg:col-span-7">
          <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                <span className="text-xs font-mono font-bold text-slate-300">
                  Attached Promise Pipeline Handlers
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${
                    promiseState === 'fulfilled'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                      : promiseState === 'rejected'
                      ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                      : 'bg-amber-950 text-amber-300 border-amber-500/40'
                  }`}
                >
                  State: {promiseState}
                </span>
              </div>

              {/* .then() Box */}
              <div
                className={`p-4 rounded-xl border transition-all mb-3 ${
                  promiseState === 'fulfilled'
                    ? 'bg-emerald-950/30 border-emerald-500/60 text-white shadow-glow-emerald'
                    : 'bg-atlas-950 border-atlas-border text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold">.then((data) =&gt; {'{ ... }'})</span>
                  <span>{promiseState === 'fulfilled' ? '▶ TRIGGERED' : 'Awaiting Resolve'}</span>
                </div>
                {promiseState === 'fulfilled' && (
                  <pre className="text-xs font-mono text-emerald-300 bg-atlas-900 p-2.5 rounded border border-emerald-500/30">
                    <code>{JSON.stringify(dataPayload, null, 2)}</code>
                  </pre>
                )}
              </div>

              {/* .catch() Box */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  promiseState === 'rejected'
                    ? 'bg-rose-950/30 border-rose-500/60 text-white shadow-lg'
                    : 'bg-atlas-950 border-atlas-border text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold">.catch((err) =&gt; {'{ ... }'})</span>
                  <span>{promiseState === 'rejected' ? '▶ TRIGGERED' : 'Awaiting Rejection'}</span>
                </div>
                {promiseState === 'rejected' && (
                  <pre className="text-xs font-mono text-rose-300 bg-atlas-900 p-2.5 rounded border border-rose-500/30">
                    <code>{JSON.stringify(dataPayload, null, 2)}</code>
                  </pre>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-atlas-border text-xs font-mono text-slate-400">
              .finally(() =&gt; hideSpinner()); // Always executes upon settlement
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
