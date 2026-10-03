import React, { useEffect } from 'react';
import { Clock, Globe } from 'lucide-react';
import TopicBreadcrumb from '../components/layout/TopicBreadcrumb';
import BackToAtlas from '../components/layout/BackToAtlas';
import SectionHeading from '../components/common/SectionHeading';
import ConceptCard from '../components/common/ConceptCard';
import ImportantRulesList from '../components/variables/ImportantRulesList';
import CommonMistakes from '../components/variables/CommonMistakes';
import TakeawaysCard from '../components/variables/TakeawaysCard';
import WebAPISandbox from '../components/webapis/WebAPISandbox';
import { WEB_APIS_CONTENT } from '../data/webApisData';

export default function WebApisPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = WEB_APIS_CONTENT;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <TopicBreadcrumb category="Browser" topic="Web APIs" />

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
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">{data.meta.title}</h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            {data.meta.subtitle}
          </p>
        </header>

        <div className="space-y-16 sm:space-y-20">
          <section className="scroll-mt-24">
            <SectionHeading stepNumber="1" title={data.idea.heading} subtitle="JavaScript language features use capabilities supplied by the browser." />
            <ConceptCard>
              <p className="text-base text-slate-200 leading-relaxed">{data.idea.summary}</p>
              <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-center">
                <div className="p-4 rounded-lg bg-atlas-950 border border-sky-500/30 font-mono text-xs font-bold text-sky-300">JAVASCRIPT</div>
                <span className="text-slate-500">→</span>
                <div className="p-4 rounded-lg bg-atlas-950 border border-indigo-500/30 font-mono text-xs font-bold text-indigo-300">BROWSER APIs</div>
              </div>
            </ConceptCard>
          </section>

          <section className="scroll-mt-24">
            <SectionHeading stepNumber="2" title="Browser API Catalog" subtitle="Common platform features exposed to scripts running in the browser." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.apiCatalog.map((api) => (
                <ConceptCard key={api.name}>
                  <h3 className="font-mono font-bold text-sm text-white mb-1">{api.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{api.desc}</p>
                  <code className="block text-[11px] font-mono text-sky-300 mb-2">{api.syntax}</code>
                  <pre className="p-3 bg-atlas-950 rounded-xl font-mono text-[11px] text-emerald-300 border border-slate-800 overflow-x-auto"><code>{api.example}</code></pre>
                </ConceptCard>
              ))}
            </div>
          </section>

          <section className="scroll-mt-24">
            <SectionHeading stepNumber="3" title="How Async Browser Work Connects" subtitle="Browser APIs provide work; Promises and the runtime coordinate its result." />
            <ConceptCard>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {['WEB APIs', 'PROMISES', 'ASYNC / AWAIT', 'EVENT LOOP'].map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0 p-3 rounded-lg bg-atlas-950 border border-atlas-border text-center font-mono text-[10px] sm:text-xs font-bold text-indigo-300">{step}</div>
                    {index < 3 && <span className="hidden sm:block text-slate-500">→</span>}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed">For example, <code className="text-sky-300">fetch()</code> is a browser API that returns a Promise; <code className="text-sky-300">await</code> reads its result, and the Event Loop schedules the continuation.</p>
            </ConceptCard>
          </section>

          <section className="scroll-mt-24">
            <SectionHeading stepNumber="4" title="Practical Workbench" subtitle="Explore a simulated Fetch response and browser storage operations." />
            <WebAPISandbox />
          </section>

          <section className="scroll-mt-24">
            <SectionHeading stepNumber="5" title="Practical Use" subtitle="Use platform APIs for browser capabilities rather than recreating them in application code." />
            <ConceptCard>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">Fetch data with <code className="text-sky-300">fetch</code>, keep small preferences in Web Storage, schedule delayed work with <code className="text-sky-300">setTimeout</code>, and parse links with the <code className="text-sky-300">URL</code> API. These are browser-provided interfaces, not JavaScript syntax itself.</p>
              </div>
            </ConceptCard>
          </section>

          <ImportantRulesList rules={data.importantRules} />
          <CommonMistakes mistakes={data.mistakes} />
          <TakeawaysCard takeaways={data.takeaways} />
        </div>

        <div className="mt-16"><BackToAtlas /></div>
      </div>
    </div>
  );
}