import React, { useEffect } from 'react';
import { Clock, MousePointerClick } from 'lucide-react';
import TopicBreadcrumb from '../components/layout/TopicBreadcrumb';
import BackToAtlas from '../components/layout/BackToAtlas';
import SectionHeading from '../components/common/SectionHeading';
import ConceptCard from '../components/common/ConceptCard';
import ImportantRulesList from '../components/variables/ImportantRulesList';
import CommonMistakes from '../components/variables/CommonMistakes';
import TakeawaysCard from '../components/variables/TakeawaysCard';
import EventFlowVisualizer from '../components/events/EventFlowVisualizer';
import { EVENTS_CONTENT } from '../data/eventsData';

export default function EventsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = EVENTS_CONTENT;

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <TopicBreadcrumb category="Browser" topic="Events" />

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
            <SectionHeading stepNumber="1" title={data.idea.heading} subtitle="From a user action to a visible interface response." />
            <ConceptCard>
              <p className="text-base text-slate-200 leading-relaxed">{data.idea.summary}</p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-5 gap-2 items-center text-center">
                {['USER ACTION', 'EVENT', 'HANDLER', 'JAVASCRIPT', 'UI CHANGE'].map((step, index) => (
                  <React.Fragment key={step}>
                    <div className="p-3 rounded-lg bg-atlas-950 border border-atlas-border font-mono text-[10px] sm:text-xs font-bold text-sky-300">
                      {step}
                    </div>
                    {index < 4 && <span className="hidden sm:block text-slate-500">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </ConceptCard>
          </section>

          <section className="scroll-mt-24">
            <SectionHeading stepNumber="2" title="Common Browser Events" subtitle="Choose an event that matches the interaction you need to observe." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.commonEvents.map((event) => (
                <ConceptCard key={event.name}>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <code className="font-mono text-sm font-bold text-sky-300">{event.name}</code>
                    <span className="text-[10px] font-mono text-amber-300">{event.type}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{event.desc}</p>
                </ConceptCard>
              ))}
            </div>
          </section>

          <section className="scroll-mt-24">
            <SectionHeading stepNumber="3" title="Syntax & Event Object" subtitle="Register a handler and use the event object for context or browser defaults." />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ConceptCard>
                <h3 className="font-mono font-bold text-sm text-white mb-3">addEventListener</h3>
                <pre className="p-3 bg-atlas-950 rounded-xl font-mono text-xs text-emerald-300 border border-slate-800 overflow-x-auto"><code>{`button.addEventListener("click", (event) => {\n  console.log(event.currentTarget);\n});\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  saveForm();\n});`}</code></pre>
              </ConceptCard>
              <ConceptCard>
                <h3 className="font-mono font-bold text-sm text-white mb-3">Useful Event Properties</h3>
                <div className="space-y-3">
                  {data.eventObjectProperties.map((item) => (
                    <div key={item.prop} className="border-b border-atlas-border pb-2 last:border-0">
                      <code className="text-xs font-mono text-sky-300">{item.prop}</code>
                      <p className="mt-1 text-xs text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </ConceptCard>
            </div>
          </section>

          <section className="scroll-mt-24">
            <SectionHeading stepNumber="4" title="Try an Event Handler" subtitle="Click the button or type a key to inspect the event delivered to JavaScript." />
            <EventFlowVisualizer commonEvents={data.commonEvents} eventObjectProperties={data.eventObjectProperties} />
          </section>

          <section className="scroll-mt-24">
            <SectionHeading stepNumber="5" title="Practical Use" subtitle="Events connect input controls to application behavior." />
            <ConceptCard>
              <div className="flex items-start gap-3">
                <MousePointerClick className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  Use <code className="text-sky-300">input</code> for live search, <code className="text-sky-300">change</code> for committed selections, and <code className="text-sky-300">submit</code> to validate or send forms. Call <code className="text-sky-300">event.preventDefault()</code> when handling a form without a page reload.
                </p>
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