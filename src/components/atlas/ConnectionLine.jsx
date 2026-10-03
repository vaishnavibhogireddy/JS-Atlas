import React from 'react';

export default function ConnectionLine({ from, to, isHighlighted, categoryColor = '#6366f1' }) {
  if (!from || !to) return null;

  // Calculate smooth cubic bezier path
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  // Curve control points
  const cx1 = from.x + dx * 0.45;
  const cy1 = from.y;
  const cx2 = from.x + dx * 0.55;
  const cy2 = to.y;

  const pathData = `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`;

  return (
    <g className="transition-all duration-300 pointer-events-none">
      {/* Background shadow line */}
      <path
        d={pathData}
        fill="none"
        stroke={isHighlighted ? categoryColor : 'rgba(255, 255, 255, 0.08)'}
        strokeWidth={isHighlighted ? 2.5 : 1.2}
        strokeDasharray={isHighlighted ? 'none' : '4 4'}
        className="transition-all duration-300"
      />

      {/* Animated glowing energy pulse when highlighted */}
      {isHighlighted && (
        <>
          <path
            d={pathData}
            fill="none"
            stroke={categoryColor}
            strokeWidth={4}
            strokeOpacity={0.4}
            className="blur-[2px]"
          />
          <path
            d={pathData}
            fill="none"
            stroke="#ffffff"
            strokeWidth={2}
            strokeDasharray="8 20"
            className="animate-flow"
          />
        </>
      )}
    </g>
  );
}
