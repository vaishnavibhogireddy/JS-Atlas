import React, { useEffect } from 'react';
import TopicBreadcrumb from '../components/layout/TopicBreadcrumb';
import BackToAtlas from '../components/layout/BackToAtlas';
import SectionHeading from '../components/common/SectionHeading';
import ConceptCard from '../components/common/ConceptCard';
import CodeBlock from '../components/common/CodeBlock';
import ImportantRulesList from '../components/variables/ImportantRulesList';
import CommonMistakes from '../components/variables/CommonMistakes';
import TakeawaysCard from '../components/variables/TakeawaysCard';
import DecisionTreeVisualizer from '../components/conditions/DecisionTreeVisualizer';
import { CONDITIONS_CONTENT } from '../data/conditionsData';
import { Clock, GitBranch } from 'lucide-react';

export default function ConditionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = CONDITIONS_CONTENT;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <TopicBreadcrumb category="Fundamentals" topic="Conditions" />

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
          {/* 1. The Idea */}
          <section className="scroll-mt-24">
            <SectionHeading
              stepNumber="1"
              title={data.idea.heading}
              subtitle="Control branching logic based on boolean evaluation."
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

          {/* 2. Core Branching Patterns */}
          <section className="scroll-mt-24">
            <SectionHeading
              stepNumber="2"
              title="3 Conditional Patterns in JavaScript"
              subtitle="if/else, Ternary expressions, and switch pattern matching."
            />
            <div className="space-y-4">
              {data.decisionFlows.map((flow, i) => (
                <ConceptCard key={i}>
                  <div className="flex items-center justify-between pb-2 border-b border-atlas-border mb-3">
                    <h3 className="font-mono font-bold text-sm text-white">{flow.title}</h3>
                    <span className="text-[11px] text-slate-400">{flow.note}</span>
                  </div>
                  <pre className="p-3.5 bg-atlas-950 rounded-xl font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto">
                    <code>{flow.code}</code>
                  </pre>
                </ConceptCard>
              ))}
            </div>
          </section>

          {/* 3. Interactive Decision Tree Simulator */}
          <DecisionTreeVisualizer
            falsyValues={data.falsyValues}
            truthySurprises={data.truthySurprises}
          />

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
