import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { GitBranch, Check, X, ArrowDown, UserCheck, ShieldAlert, ShoppingBag } from 'lucide-react';

export default function DecisionTreeVisualizer({ falsyValues, truthySurprises }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [role, setRole] = useState('admin'); // 'admin' | 'user'
  const [cartTotal, setCartTotal] = useState(120);

  // Evaluate branch
  let activeBranch = 'guest';
  let discount = 0;
  if (!isLoggedIn) {
    activeBranch = 'guest';
    discount = 0;
  } else if (role === 'admin') {
    activeBranch = 'admin';
    discount = 30;
  } else if (cartTotal >= 100) {
    activeBranch = 'vip_customer';
    discount = 15;
  } else {
    activeBranch = 'standard_customer';
    discount = 5;
  }

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive Decision Tree Simulator"
        subtitle="Toggle runtime state and watch the JavaScript engine evaluate branches in real time."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* State Controls */}
        <div className="lg:col-span-5 space-y-4">
          <ConceptCard>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block mb-4">
              Runtime Program State
            </span>

            {/* Is Logged In Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-atlas-950 border border-atlas-border">
                <span className="text-xs font-mono text-slate-300">isLoggedIn:</span>
                <button
                  onClick={() => setIsLoggedIn(!isLoggedIn)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    isLoggedIn
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow-emerald'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {String(isLoggedIn)}
                </button>
              </div>

              {/* Role Selector */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-atlas-950 border border-atlas-border">
                <span className="text-xs font-mono text-slate-300">role:</span>
                <div className="flex gap-1.5">
                  {['admin', 'user'].map((r) => (
                    <button
                      key={r}
                      disabled={!isLoggedIn}
                      onClick={() => setRole(r)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all disabled:opacity-30 ${
                        role === r && isLoggedIn
                          ? 'bg-brand-indigo text-white font-bold'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      "{r}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart Total Slider */}
              <div className="p-3 rounded-xl bg-atlas-950 border border-atlas-border space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">cartTotal:</span>
                  <span className="text-amber-400 font-bold">${cartTotal}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="10"
                  disabled={!isLoggedIn || role === 'admin'}
                  value={cartTotal}
                  onChange={(e) => setCartTotal(Number(e.target.value))}
                  className="w-full accent-amber-400 disabled:opacity-30"
                />
              </div>
            </div>
          </ConceptCard>

          {/* 7 Falsy Reference Pill Matrix */}
          <div className="p-4 rounded-2xl bg-atlas-900/60 border border-atlas-border">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-2">
              The 7 JavaScript Falsy Values
            </span>
            <div className="flex flex-wrap gap-1.5">
              {falsyValues.map((f, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-rose-950/40 text-rose-300 border border-rose-500/30"
                >
                  {f.value}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Decision Tree Visualizer */}
        <div className="lg:col-span-7">
          <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-brand-blue" />
                  <span className="text-xs font-mono font-bold text-slate-300">
                    Active Code Branch Inspector
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  Discount: {discount}%
                </span>
              </div>

              {/* Branch Diagram Cards */}
              <div className="space-y-2.5 font-mono text-xs">
                {/* Branch 1: Guest */}
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    activeBranch === 'guest'
                      ? 'bg-rose-950/30 border-rose-500 text-white shadow-lg'
                      : 'bg-atlas-950/60 border-atlas-border text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>if (!isLoggedIn)</span>
                    <span>{activeBranch === 'guest' ? '▶ ACTIVE' : 'Skipped'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mt-1">
                    Redirect to login. (Discount: 0%)
                  </p>
                </div>

                {/* Branch 2: Admin */}
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    activeBranch === 'admin'
                      ? 'bg-purple-950/40 border-purple-500 text-white shadow-glow-md'
                      : 'bg-atlas-950/60 border-atlas-border text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>else if (role === "admin")</span>
                    <span>{activeBranch === 'admin' ? '▶ ACTIVE' : 'Skipped'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mt-1">
                    Grant full administrator discount: 30%
                  </p>
                </div>

                {/* Branch 3: VIP Customer */}
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    activeBranch === 'vip_customer'
                      ? 'bg-amber-950/40 border-amber-500 text-white shadow-glow-yellow'
                      : 'bg-atlas-950/60 border-atlas-border text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>else if (cartTotal &gt;= 100)</span>
                    <span>{activeBranch === 'vip_customer' ? '▶ ACTIVE' : 'Skipped'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mt-1">
                    High volume shopper reward: 15% discount
                  </p>
                </div>

                {/* Branch 4: Fallback standard */}
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    activeBranch === 'standard_customer'
                      ? 'bg-sky-950/40 border-sky-500 text-white shadow-glow-sm'
                      : 'bg-atlas-950/60 border-atlas-border text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>else</span>
                    <span>{activeBranch === 'standard_customer' ? '▶ ACTIVE' : 'Skipped'}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mt-1">
                    Default member rate: 5% discount
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-atlas-border text-xs text-slate-400">
              JavaScript stops evaluating at the first true branch and skips the rest.
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
