import React, { useEffect } from 'react';
import TopicBreadcrumb from '../components/layout/TopicBreadcrumb';
import BackToAtlas from '../components/layout/BackToAtlas';
import SectionHeading from '../components/common/SectionHeading';
import ConceptCard from '../components/common/ConceptCard';
import ImportantRulesList from '../components/variables/ImportantRulesList';
import CommonMistakes from '../components/variables/CommonMistakes';
import TakeawaysCard from '../components/variables/TakeawaysCard';
import ClosureCounterVisualizer from '../components/closures/ClosureCounterVisualizer';
import { CLOSURES_CONTENT } from '../data/closuresData';
import { Clock, Lock } from 'lucide-react';

export default function ClosuresPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = CLOSURES_CONTENT;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <TopicBreadcrumb category="JavaScript Behavior" topic="Closures" />

        <header className="mb-12 pb-8 border-b border-atlas-border">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-2.5 py-1 rounded-md bg-rose-950/80 border border-rose-500/40 text-rose-400 font-mono text-xs font-semibold uppercase tracking-wider">
              JavaScript Behavior
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
          {/* 1. Quick Idea */}
          <section className="scroll-mt-24">
            <SectionHeading
              stepNumber="1"
              title={data.idea.heading}
              subtitle="The memory backpack: inner functions bundled with outer lexical scope."
            />
            <ConceptCard>
              <p className="text-base text-slate-200 leading-relaxed font-normal">
                {data.idea.summary}
              </p>
              <div className="mt-4 pt-4 border-t border-atlas-border space-y-2">
                {data.idea.bulletPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </ConceptCard>
          </section>

          {/* 2. Closure Lifecycle */}
          <section className="scroll-mt-24">
            <SectionHeading
              stepNumber="2"
              title="Closure Execution Lifecycle"
              subtitle="How enclosed variables survive after outer function return."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.lifecycleSteps.map((s, i) => (
                <ConceptCard key={i} className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-mono font-bold text-sm text-white mb-2">{s.step}</h3>
                    <p className="text-xs text-slate-400 mb-3">{s.desc}</p>
                  </div>
                  <pre className="p-2.5 bg-atlas-950 rounded-xl font-mono text-[11px] text-emerald-400 border border-slate-800 overflow-x-auto">
                    <code>{s.code}</code>
                  </pre>
                </ConceptCard>
              ))}
            </div>
          </section>

          {/* 3. Interactive Closure Counter Sandbox */}
          <ClosureCounterVisualizer />

          {/* 4. Real-world Use Cases */}
          <section className="scroll-mt-24">
            <SectionHeading
              stepNumber="4"
              title="Practical Use Cases for Closures"
              subtitle="Private variables, function factories, and stateful callbacks."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.useCases.map((uc, i) => (
                <ConceptCard key={i} className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-mono font-bold text-sm text-white mb-1">{uc.title}</h3>
                    <p className="text-xs text-slate-400 mb-3">{uc.desc}</p>
                  </div>
                  <pre className="p-2.5 bg-atlas-950 rounded-xl font-mono text-[11px] text-sky-300 border border-slate-800 overflow-x-auto">
                    <code>{uc.code}</code>
                  </pre>
                </ConceptCard>
              ))}
            </div>
          </section>

          {/* 5. Important Rules */}
          <ImportantRulesList rules={data.importantRules} />

          {/* 6. Common Mistakes */}
          <CommonMistakes mistakes={data.mistakes} />

          {/* 7. Takeaways */}
          <TakeawaysCard takeaways={data.takeaways} />
        </div>

        <div className="mt-16">
          <BackToAtlas />
        </div>
      </div>
    </div>
  );
}
