import React, { useEffect } from 'react';
import TopicBreadcrumb from '../components/layout/TopicBreadcrumb';
import BackToAtlas from '../components/layout/BackToAtlas';
import QuickIdeaVisual from '../components/variables/QuickIdeaVisual';
import DeclarationVisual from '../components/variables/DeclarationVisual';
import LetConstVarComparison from '../components/variables/LetConstVarComparison';
import InteractiveVariableBox from '../components/variables/InteractiveVariableBox';
import NamingConventions from '../components/variables/NamingConventions';
import ImportantRulesList from '../components/variables/ImportantRulesList';
import CommonMistakes from '../components/variables/CommonMistakes';
import MiniExampleWalkthrough from '../components/variables/MiniExampleWalkthrough';
import TakeawaysCard from '../components/variables/TakeawaysCard';
import { VARIABLES_CONTENT } from '../data/variablesData';
import { Box, Sparkles, Clock } from 'lucide-react';

export default function VariablesPage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = VARIABLES_CONTENT;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Breadcrumb Navigation */}
        <TopicBreadcrumb category="Fundamentals" topic="Variables" />

        {/* Page Header */}
        <header className="mb-12 pb-8 border-b border-atlas-border">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-2.5 py-1 rounded-md bg-sky-950/80 border border-sky-500/40 text-sky-400 font-mono text-xs font-semibold uppercase tracking-wider">
              Fundamentals
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{data.meta.readTime}</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-semibold">
              Stage 1 Template Topic
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-3">
            <span>{data.meta.title}</span>
          </h1>

          <p className="mt-3 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            {data.meta.subtitle}
          </p>
        </header>

        {/* 9 Structured Concept Sections */}
        <div className="space-y-16 sm:space-y-20">
          {/* 1. Quick Idea */}
          <QuickIdeaVisual data={data.idea} />

          {/* 2. Declaration vs Assignment */}
          <DeclarationVisual data={data.declarationVsAssignment} />

          {/* 3. Let / Const / Var */}
          <LetConstVarComparison data={data.keywords} />

          {/* 4. Visual Variable Box */}
          <InteractiveVariableBox />

          {/* 5. Naming Variables */}
          <NamingConventions data={data.naming} />

          {/* 6. Important Rules */}
          <ImportantRulesList rules={data.importantRules} />

          {/* 7. Common Mistakes */}
          <CommonMistakes mistakes={data.mistakes} />

          {/* 8. Mini Example */}
          <MiniExampleWalkthrough exampleData={data.miniExample} />

          {/* 9. Know This Before Moving On */}
          <TakeawaysCard takeaways={data.takeaways} />
        </div>

        {/* Back to Atlas Navigation */}
        <div className="mt-16">
          <BackToAtlas />
        </div>
      </div>
    </div>
  );
}
