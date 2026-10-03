import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import CodeBlock from '../common/CodeBlock';
import { ShieldCheck, Zap, AlertTriangle, Check, X, Info } from 'lucide-react';

export default function LetConstVarComparison({ data }) {
  const [selectedKeyword, setSelectedKeyword] = useState('let');

  const getKeywordIcon = (kw) => {
    switch (kw) {
      case 'const':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'let':
        return <Zap className="w-5 h-5 text-sky-400" />;
      case 'var':
        return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      default:
        return null;
    }
  };

  const activeItem = data.find((item) => item.keyword === selectedKeyword) || data[0];

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="LET vs. CONST vs. VAR"
        subtitle="The three declaration keywords in JavaScript and when to use each."
      />

      {/* 3 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {data.map((item) => {
          const isSelected = selectedKeyword === item.keyword;
          const isConst = item.keyword === 'const';
          const isLet = item.keyword === 'let';
          const isVar = item.keyword === 'var';

          return (
            <div
              key={item.keyword}
              onClick={() => setSelectedKeyword(item.keyword)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? isConst
                    ? 'bg-emerald-950/30 border-emerald-500 shadow-glow-emerald'
                    : isLet
                    ? 'bg-sky-950/30 border-sky-500 shadow-glow-sm'
                    : 'bg-rose-950/30 border-rose-500/80 shadow-lg'
                  : 'bg-atlas-900/70 border-atlas-border hover:border-slate-700 hover:bg-atlas-850/60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getKeywordIcon(item.keyword)}
                  <h3 className="font-mono text-2xl font-black text-white tracking-wider">
                    {item.keyword}
                  </h3>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed min-h-[36px]">
                {item.tagline}
              </p>

              {/* Quick property checklist */}
              <div className="mt-4 pt-3 border-t border-atlas-border space-y-2 text-xs">
                {item.properties.map((prop, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-slate-400">{prop.label}</span>
                    <span
                      className={`font-mono text-[11px] font-medium ${
                        prop.status === 'good' || prop.status === 'strict'
                          ? 'text-emerald-400'
                          : prop.status === 'safe'
                          ? 'text-sky-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {prop.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Focused Detail & Recommendation Panel */}
      <ConceptCard glow={true} className="border-brand-indigo/30 bg-atlas-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-brand-blue" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Rule of Thumb for <span className="text-white font-black">{activeItem.keyword}</span>
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {activeItem.recommendation}
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-3">
              <span>Modern guideline:</span>
              <span className="text-emerald-400 font-mono font-semibold">1. Default to const</span>
              <span className="text-sky-400 font-mono font-semibold">2. Use let for mutations</span>
              <span className="text-rose-400 font-mono font-semibold line-through">3. Avoid var</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <CodeBlock
              code={activeItem.codeExample}
              title={`Example: ${activeItem.keyword}`}
              language="javascript"
            />
          </div>
        </div>
      </ConceptCard>
    </section>
  );
}
