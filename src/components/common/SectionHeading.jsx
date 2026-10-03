import React from 'react';

export default function SectionHeading({ stepNumber, title, subtitle, icon: Icon }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {stepNumber && (
          <div className="w-8 h-8 rounded-lg bg-brand-indigo/10 border border-brand-indigo/30 text-brand-indigo flex items-center justify-center font-mono font-bold text-sm shadow-glow-sm">
            {stepNumber}
          </div>
        )}
        {Icon && !stepNumber && (
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-slate-400 ml-0 sm:ml-11">
          {subtitle}
        </p>
      )}
    </div>
  );
}
