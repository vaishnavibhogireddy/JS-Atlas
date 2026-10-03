import React from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Check, X, AlertCircle, Sparkles } from 'lucide-react';

export default function NamingConventions({ data }) {
  const goodExamples = [
    { name: 'userName', reason: 'Clear intent, standard camelCase' },
    { name: 'totalPrice', reason: 'Describes the computed value' },
    { name: 'studentCount', reason: 'Unambiguous numeric purpose' },
    { name: 'isActive', reason: 'Ideal boolean naming convention' },
    { name: '_internalCache', reason: 'Valid leading underscore for private/internal variables' },
    { name: '$element', reason: 'Valid dollar sign for DOM references' },
  ];

  const avoidExamples = [
    { name: '123name', reason: 'SyntaxError: Cannot start with a number' },
    { name: 'x', reason: 'Too cryptic outside short loop counters' },
    { name: 'abc', reason: 'Provides zero context on stored data' },
    { name: 'user_name', reason: 'Snake_case is generally non-idiomatic in JS' },
    { name: 'let / const', reason: 'SyntaxError: Reserved JS keyword' },
    { name: 'user-name', reason: 'SyntaxError: Hyphens parsed as subtraction' },
  ];

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="5"
        title="Naming Variables"
        subtitle="Write clean, readable, bug-free variable identifiers."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Good Conventions Card */}
        <div className="lg:col-span-6">
          <div className="h-full rounded-2xl bg-atlas-900 border border-emerald-500/30 p-5 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4 text-emerald-400">
              <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="font-mono font-bold text-base uppercase tracking-wider text-white">
                Recommended & Idiomatic
              </h3>
            </div>

            <div className="space-y-2.5">
              {goodExamples.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-atlas-950/60 border border-emerald-500/20"
                >
                  <span className="font-mono text-sm font-bold text-emerald-300">
                    {item.name}
                  </span>
                  <span className="text-xs text-slate-400 text-right">
                    {item.reason}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Avoid Conventions Card */}
        <div className="lg:col-span-6">
          <div className="h-full rounded-2xl bg-atlas-900 border border-rose-500/30 p-5 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4 text-rose-400">
              <div className="w-7 h-7 rounded-lg bg-rose-950/80 border border-rose-500/40 flex items-center justify-center">
                <X className="w-4 h-4" />
              </div>
              <h3 className="font-mono font-bold text-base uppercase tracking-wider text-white">
                Avoid / Invalid
              </h3>
            </div>

            <div className="space-y-2.5">
              {avoidExamples.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-atlas-950/60 border border-rose-500/20"
                >
                  <span className="font-mono text-sm font-bold text-rose-400 line-through">
                    {item.name}
                  </span>
                  <span className="text-xs text-slate-400 text-right">
                    {item.reason}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Case Sensitivity Tip Card */}
      <div className="mt-4 p-4 rounded-xl bg-atlas-900/60 border border-atlas-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white">Strict Case Sensitivity:</strong>{' '}
            <code className="text-amber-300 font-mono">myAge</code>,{' '}
            <code className="text-amber-300 font-mono">MyAge</code>, and{' '}
            <code className="text-amber-300 font-mono">MYAGE</code> are 3 separate memory bindings.
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-500 shrink-0">
          Standard: lowerCamelCase
        </span>
      </div>
    </section>
  );
}
