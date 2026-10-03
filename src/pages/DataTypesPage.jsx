import React, { useEffect } from 'react';
import TopicBreadcrumb from '../components/layout/TopicBreadcrumb';
import BackToAtlas from '../components/layout/BackToAtlas';
import SectionHeading from '../components/common/SectionHeading';
import ConceptCard from '../components/common/ConceptCard';
import CodeBlock from '../components/common/CodeBlock';
import ImportantRulesList from '../components/variables/ImportantRulesList';
import CommonMistakes from '../components/variables/CommonMistakes';
import TakeawaysCard from '../components/variables/TakeawaysCard';
import TypeofVisualizer from '../components/datatypes/TypeofVisualizer';
import { DATA_TYPES_CONTENT } from '../data/dataTypesData';
import { Database, Clock, Layers, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function DataTypesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = DATA_TYPES_CONTENT;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <TopicBreadcrumb category="Fundamentals" topic="Data Types" />

        <header className="mb-12 pb-8 border-b border-atlas-border">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-2.5 py-1 rounded-md bg-sky-950/80 border border-sky-500/40 text-sky-400 font-mono text-xs font-semibold uppercase tracking-wider">
              Fundamentals
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{data.meta.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {data.meta.title}
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            {data.meta.subtitle}
          </p>
        </header>

        <div className="space-y-16 sm:space-y-20">
          {/* 1. Quick Idea & Primitives vs Objects */}
          <section className="scroll-mt-24">
            <SectionHeading
              stepNumber="1"
              title={data.idea.heading}
              subtitle="The high-level split between Primitive values and Reference Objects in memory."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ConceptCard glow={true} borderColor="border-sky-500/40">
                <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
                  <h3 className="font-mono text-lg font-bold text-sky-400">
                    7 Primitive Types
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300">
                    Stored by Value
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Immutable raw data values. Passed and copied strictly by value.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {['String', 'Number', 'BigInt', 'Boolean', 'undefined', 'null', 'Symbol'].map((p) => (
                    <div key={p} className="p-2 rounded-lg bg-atlas-950 border border-slate-800 text-slate-200">
                      ✓ {p}
                    </div>
                  ))}
                </div>
              </ConceptCard>

              <ConceptCard glow={true} borderColor="border-indigo-500/40">
                <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-3">
                  <h3 className="font-mono text-lg font-bold text-indigo-400">
                    1 Reference Type (Object)
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300">
                    Stored by Reference
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Mutable key-value collections and memory structures.
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-atlas-950 border border-slate-800 text-slate-200">
                    • Plain Objects: <code className="text-amber-300">{`{ name: "Atlas" }`}</code>
                  </div>
                  <div className="p-2 rounded-lg bg-atlas-950 border border-slate-800 text-slate-200">
                    • Arrays: <code className="text-amber-300">[1, 2, 3]</code>
                  </div>
                  <div className="p-2 rounded-lg bg-atlas-950 border border-slate-800 text-slate-200">
                    • Functions: <code className="text-amber-300">() =&gt; {}</code>
                  </div>
                </div>
              </ConceptCard>
            </div>
          </section>

          {/* 2. Primitives Catalog */}
          <section className="scroll-mt-24">
            <SectionHeading
              stepNumber="2"
              title="The 7 JavaScript Primitives Breakdown"
              subtitle="Quick reference for each primitive with syntax examples."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.primitives.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-atlas-900 border border-atlas-border flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-sm text-white">{item.name}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${item.type === 'primitive' ? 'bg-sky-950 text-sky-400' : 'bg-indigo-950 text-indigo-400'}`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">{item.desc}</p>
                  </div>
                  <code className="text-[11px] font-mono text-amber-300 bg-atlas-950 px-2 py-1 rounded border border-slate-800 truncate">
                    {item.example}
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Interactive typeof Visualizer */}
          <TypeofVisualizer typeofTable={data.typeofTable} />

          {/* 4. Important Rules */}
          <ImportantRulesList rules={data.importantRules} />

          {/* 5. Common Mistakes */}
          <CommonMistakes mistakes={data.mistakes} />

          {/* 6. Takeaways */}
          <TakeawaysCard takeaways={data.takeaways} />
        </div>

        <div className="mt-16">
          <BackToAtlas />
        </div>
      </div>
    </div>
  );
}
