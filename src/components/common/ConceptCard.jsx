import React from 'react';

export default function ConceptCard({ children, className = '', glow = false, borderColor = '' }) {
  return (
    <div
      className={`relative rounded-2xl bg-atlas-900/90 border ${
        borderColor || 'border-atlas-border'
      } p-5 sm:p-6 transition-all duration-300 ${
        glow ? 'shadow-glow-md' : 'hover:border-slate-700/80 shadow-lg'
      } ${className}`}
    >
      {children}
    </div>
  );
}
