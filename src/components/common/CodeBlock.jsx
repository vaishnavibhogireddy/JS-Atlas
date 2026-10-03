import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code, language = 'javascript', title = '', highlightLines = [] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-atlas-900 border border-atlas-border font-mono text-sm shadow-xl">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-atlas-border bg-atlas-950/60 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-medium text-slate-300">{title}</span>
          </div>
          <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">{language}</span>
        </div>
      )}

      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute right-3 top-3 z-10 p-1.5 rounded-lg bg-atlas-800/80 hover:bg-atlas-700 text-slate-400 hover:text-white border border-slate-700/50 transition-colors opacity-80 group-hover:opacity-100"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>

      <pre className="p-4 overflow-x-auto text-slate-200 text-[13px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
