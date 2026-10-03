import React from 'react';
import {
  Box,
  Database,
  Percent,
  GitBranch,
  RotateCw,
  Cpu,
  ListOrdered,
  Layers,
  Shield,
  ArrowUpCircle,
  Lock,
  FastForward,
  Sparkles,
  Zap,
  Activity,
  Layout,
  Edit3,
  MousePointerClick,
  Globe,
  CheckCircle2,
  Clock,
} from 'lucide-react';

const ICON_MAP = {
  Box,
  Database,
  Percent,
  GitBranch,
  RotateCw,
  Cpu,
  ListOrdered,
  Layers,
  Shield,
  ArrowUpCircle,
  Lock,
  FastForward,
  Sparkles,
  Zap,
  Activity,
  Layout,
  MousePointerClick,
  Globe,
  Edit3,
};

export default function KnowledgeNode({
  node,
  isCenter = false,
  isHovered = false,
  isDimmed = false,
  categoryColor = '#38bdf8',
  onHover,
  onLeave,
  onClick,
}) {
  const Icon = ICON_MAP[node.icon] || Sparkles;
  const isReady = node.status === 'ready';

  if (isCenter) {
    return (
      <g
        transform={`translate(${node.x}, ${node.y})`}
        className="cursor-pointer select-none group"
        onMouseEnter={() => onHover && onHover(node)}
        onMouseLeave={() => onLeave && onLeave()}
      >
        {/* Outer ambient glow rings */}
        <circle r="60" fill="#f59e0b" fillOpacity="0.04" className="animate-pulse" />
        <circle r="46" fill="#f59e0b" fillOpacity="0.1" className="blur-sm" />
        <circle
          r="38"
          fill="#0a0f1d"
          stroke="#f59e0b"
          strokeWidth="2.5"
          className="shadow-glow-yellow transition-all duration-300 group-hover:stroke-amber-300"
        />

        {/* Center JS Logo and Text */}
        <text
          textAnchor="middle"
          y="-4"
          className="font-mono font-black text-[15px] fill-amber-400 select-none tracking-wider"
        >
          JAVASCRIPT
        </text>
        <text
          textAnchor="middle"
          y="12"
          className="font-sans text-[8px] font-semibold fill-slate-400 select-none uppercase tracking-widest"
        >
          CORE ATLAS
        </text>
      </g>
    );
  }

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      className={`cursor-pointer select-none transition-all duration-300 ${
        isDimmed ? 'opacity-30' : 'opacity-100'
      }`}
      onMouseEnter={() => onHover && onHover(node)}
      onMouseLeave={() => onLeave && onLeave()}
      onClick={() => onClick && onClick(node)}
    >
      {/* Glow aura on hover or when ready */}
      {(isHovered || isReady) && (
        <circle
          r={isHovered ? '28' : '22'}
          fill={isReady ? '#10b981' : categoryColor}
          fillOpacity={isHovered ? '0.25' : '0.12'}
          className="blur-sm transition-all duration-300"
        />
      )}

      {/* Node background circle */}
      <circle
        r="19"
        fill="#0d1527"
        stroke={
          isHovered
            ? '#ffffff'
            : isReady
            ? '#10b981'
            : categoryColor
        }
        strokeWidth={isHovered ? '2.5' : isReady ? '2' : '1.2'}
        strokeOpacity={isHovered ? '1' : isReady ? '0.9' : '0.5'}
        className="transition-all duration-300"
      />

      {/* Embedded icon */}
      <foreignObject x="-9" y="-9" width="18" height="18" className="pointer-events-none">
        <div className="w-full h-full flex items-center justify-center">
          <Icon
            className={`w-3.5 h-3.5 transition-colors duration-200 ${
              isHovered
                ? 'text-white'
                : isReady
                ? 'text-emerald-400'
                : 'text-slate-300'
            }`}
          />
        </div>
      </foreignObject>

      {/* Status indicator pip */}
      {isReady ? (
        <circle cx="12" cy="-12" r="4.5" fill="#10b981" stroke="#060913" strokeWidth="1.5" />
      ) : null}

      {/* Node Label underneath */}
      <g transform="translate(0, 29)">
        {/* Label background pill for ultra readability */}
        <rect
          x="-45"
          y="-10"
          width="90"
          height="18"
          rx="5"
          fill="#060913"
          fillOpacity="0.85"
          stroke={isHovered ? categoryColor : 'rgba(255, 255, 255, 0.08)'}
          strokeWidth="1"
          className="transition-all duration-200"
        />
        <text
          textAnchor="middle"
          y="3"
          className={`font-sans text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
            isHovered
              ? 'fill-white font-bold'
              : isReady
              ? 'fill-emerald-300 font-bold'
              : 'fill-slate-300'
          }`}
        >
          {node.name}
        </text>
      </g>
    </g>
  );
}
