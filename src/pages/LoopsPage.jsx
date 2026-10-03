import React, { useEffect } from 'react';
import TopicBreadcrumb from '../components/layout/TopicBreadcrumb';
import BackToAtlas from '../components/layout/BackToAtlas';
import SectionHeading from '../components/common/SectionHeading';
import ConceptCard from '../components/common/ConceptCard';
import ImportantRulesList from '../components/variables/ImportantRulesList';
import CommonMistakes from '../components/variables/CommonMistakes';
import TakeawaysCard from '../components/variables/TakeawaysCard';
import LoopStepperVisualizer from '../components/loops/LoopStepperVisualizer';
import { LOOPS_CONTENT } from '../data/loopsData';
import { Clock, RotateCw } from 'lucide-react';

export default function LoopsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = LOOPS_CONTENT;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <TopicBreadcrumb category="Fundamentals" topic="Loops" />

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
          {/* 1. Quick Idea */}
          <section className="scroll-mt-24">
            <SectionHeading
              stepNumber="1"
              title={data.idea.heading}
              subtitle="Automate repetitive calculations with controlled iteration."
            />
            <ConceptCard>
              <p className="text-base text-slate-200 leading-relaxed font-normal">
                {data.idea.summary}
              </p>
              <div className="mt-4 pt-4 border-t border-atlas-border space-y-2">
                {data.idea.bulletPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </ConceptCard>
          </section>

          {/* 2. Loop Types Catalog */}
          <section className="scroll-mt-24">
            <SectionHeading
              stepNumber="2"
              title="Loop Varieties in JavaScript"
              subtitle="When to use for, for...of, for...in, while, and do...while."
            />
            <div className="space-y-3">
              {data.loopTypes.map((loop, i) => (
                <div key={i} className="p-4 rounded-2xl bg-atlas-900 border border-atlas-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono font-bold text-sm text-white">{loop.name}</span>
                    <code className="block text-xs font-mono text-sky-300">{loop.syntax}</code>
                    <p className="text-xs text-slate-400">{loop.useCase}</p>
                  </div>
                  <pre className="p-3 bg-atlas-950 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800 shrink-0 overflow-x-auto min-w-[240px]">
                    <code>{loop.example}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Interactive Loop Stepper */}
          <LoopStepperVisualizer />

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
