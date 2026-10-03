import React, { useEffect } from 'react';
import TopicBreadcrumb from '../components/layout/TopicBreadcrumb';
import BackToAtlas from '../components/layout/BackToAtlas';
import SectionHeading from '../components/common/SectionHeading';
import ConceptCard from '../components/common/ConceptCard';
import ImportantRulesList from '../components/variables/ImportantRulesList';
import CommonMistakes from '../components/variables/CommonMistakes';
import TakeawaysCard from '../components/variables/TakeawaysCard';
import DOMManipulatorSandbox from '../components/dommanipulation/DOMManipulatorSandbox';
import { DOM_MANIPULATION_CONTENT } from '../data/domManipulationData';
import { Clock, Edit3 } from 'lucide-react';

export default function DOMManipulationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = DOM_MANIPULATION_CONTENT;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <TopicBreadcrumb category="Browser" topic="DOM Manipulation" />

        <header className="mb-12 pb-8 border-b border-atlas-border">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-500/40 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
              Browser JavaScript
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
              subtitle="Select, read, update, style, create, and remove document nodes."
            />
            <ConceptCard>
              <p className="text-base text-slate-200 leading-relaxed font-normal">
                {data.idea.summary}
              </p>
              <div className="mt-4 pt-4 border-t border-atlas-border space-y-2">
                {data.idea.bulletPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </ConceptCard>
          </section>

          {/* 2. Selection Methods */}
          <section className="scroll-mt-24">
            <SectionHeading
              stepNumber="2"
              title="Selection Methods"
              subtitle="querySelector vs querySelectorAll vs getElementById."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.selectionMethods.map((sm, i) => (
                <ConceptCard key={i}>
                  <code className="text-xs font-mono font-bold text-sky-300 block mb-1">
                    {sm.method}
                  </code>
                  <span className="text-[10px] font-mono text-emerald-400 block mb-2">
                    Returns: {sm.returns}
                  </span>
                  <p className="text-xs text-slate-400">{sm.desc}</p>
                </ConceptCard>
              ))}
            </div>
          </section>

          {/* 3. Interactive DOM Manipulation Sandbox */}
          <DOMManipulatorSandbox />

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
