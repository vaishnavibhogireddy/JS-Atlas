import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ConceptCard from '../common/ConceptCard';
import { Layout, ArrowRight, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DOMTreeVisualizer() {
  const [selectedNode, setSelectedNode] = useState('h1');

  const nodesInfo = {
    document: {
      tag: 'document',
      type: 'Document Node (nodeType 9)',
      parent: 'window',
      children: ['html'],
      properties: 'URL, title, body, head',
    },
    html: {
      tag: '<html>',
      type: 'Element Node (nodeType 1)',
      parent: 'document',
      children: ['head', 'body'],
      properties: 'lang="en", documentElement',
    },
    body: {
      tag: '<body>',
      type: 'Element Node (nodeType 1)',
      parent: 'html',
      children: ['h1', 'p', 'button'],
      properties: 'clientWidth, style, classList',
    },
    h1: {
      tag: '<h1>',
      type: 'Element Node (nodeType 1)',
      parent: 'body',
      children: ['"Welcome to JS Atlas" (Text Node)'],
      properties: 'textContent="Welcome to JS Atlas", tagName="H1"',
    },
    button: {
      tag: '<button>',
      type: 'Element Node (nodeType 1)',
      parent: 'body',
      children: ['"Explore Atlas" (Text Node)'],
      properties: 'id="start-btn", disabled=false, onclick=fn',
    },
  };

  const active = nodesInfo[selectedNode] || nodesInfo.h1;

  return (
    <section className="scroll-mt-24">
      <SectionHeading
        stepNumber="3"
        title="Interactive DOM Tree Inspector"
        subtitle="Click any node in the document tree to inspect its living object properties in memory."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: The Visual Tree Nodes */}
        <div className="lg:col-span-6 space-y-3">
          <ConceptCard glow={true}>
            <span className="text-xs font-mono font-bold uppercase text-slate-300 block mb-3">
              Document Tree Hierarchy
            </span>

            {/* Tree branches */}
            <div className="space-y-2 font-mono text-xs">
              {/* Document Root */}
              <button
                onClick={() => setSelectedNode('document')}
                className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  selectedNode === 'document'
                    ? 'bg-brand-indigo/30 border-brand-indigo text-white shadow-glow-sm'
                    : 'bg-atlas-950/60 border-atlas-border text-slate-400 hover:text-white'
                }`}
              >
                <span>📁 document (Root)</span>
                <span className="text-[10px] text-slate-500">nodeType: 9</span>
              </button>

              {/* html */}
              <div className="pl-4">
                <button
                  onClick={() => setSelectedNode('html')}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedNode === 'html'
                      ? 'bg-brand-indigo/30 border-brand-indigo text-white shadow-glow-sm'
                      : 'bg-atlas-950/60 border-atlas-border text-slate-400 hover:text-white'
                  }`}
                >
                  <span>└ 🏷️ &lt;html&gt;</span>
                  <span className="text-[10px] text-slate-500">nodeType: 1</span>
                </button>
              </div>

              {/* body */}
              <div className="pl-8">
                <button
                  onClick={() => setSelectedNode('body')}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedNode === 'body'
                      ? 'bg-brand-indigo/30 border-brand-indigo text-white shadow-glow-sm'
                      : 'bg-atlas-950/60 border-atlas-border text-slate-400 hover:text-white'
                  }`}
                >
                  <span>└ 🏷️ &lt;body&gt;</span>
                  <span className="text-[10px] text-slate-500">nodeType: 1</span>
                </button>
              </div>

              {/* h1 & button */}
              <div className="pl-12 space-y-1.5">
                <button
                  onClick={() => setSelectedNode('h1')}
                  className={`w-full p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedNode === 'h1'
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-glow-emerald font-bold'
                      : 'bg-atlas-950/60 border-atlas-border text-slate-400 hover:text-white'
                  }`}
                >
                  <span>└ 📝 &lt;h1&gt;</span>
                  <span className="text-[10px] text-slate-500">Element</span>
                </button>

                <button
                  onClick={() => setSelectedNode('button')}
                  className={`w-full p-2 rounded-xl border text-left transition-all flex items-center justify-between ${
                    selectedNode === 'button'
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-glow-emerald font-bold'
                      : 'bg-atlas-950/60 border-atlas-border text-slate-400 hover:text-white'
                  }`}
                >
                  <span>└ 🔘 &lt;button#start-btn&gt;</span>
                  <span className="text-[10px] text-slate-500">Element</span>
                </button>
              </div>
            </div>
          </ConceptCard>
        </div>

        {/* Right: Selected Node Properties Panel */}
        <div className="lg:col-span-6">
          <ConceptCard glow={true} className="h-full flex flex-col justify-between bg-atlas-900">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-atlas-border mb-4">
                <span className="text-xs font-mono font-bold text-slate-300">
                  Node Object Inspector
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  {active.tag}
                </span>
              </div>

              <div className="p-4 bg-atlas-950 rounded-xl border border-atlas-border space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Node Classification:</span>
                  <span className="text-sky-300">{active.type}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Parent Node:</span>
                  <span className="text-amber-300">{active.parent}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Children:</span>
                  <span className="text-slate-200">{active.children.join(', ')}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 block">Sample Properties:</span>
                  <div className="p-2 rounded bg-atlas-900 text-emerald-400 text-[11px] break-all border border-slate-800">
                    {active.properties}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-atlas-border text-xs text-slate-400">
              JavaScript interacts with HTML exclusively through this object model.
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
}
