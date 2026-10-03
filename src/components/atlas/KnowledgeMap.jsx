import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ATLAS_CATEGORIES,
  ATLAS_NODES,
  CENTER_NODE,
} from '../../data/atlasData';
import ConnectionLine from './ConnectionLine';
import KnowledgeNode from './KnowledgeNode';
import NodePreviewCard from './NodePreviewCard';
import MapLegend from './MapLegend';
import MobileAtlasView from './MobileAtlasView';
import ComingSoonToast from '../layout/ComingSoonToast';
import { LayoutGrid, Network } from 'lucide-react';

export default function KnowledgeMap() {
  const navigate = useNavigate();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [comingSoonNode, setComingSoonNode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('network'); // 'network' | 'cards'

  // Map category lookup
  const categoryMap = ATLAS_CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {});

  // Determine if a connection line should be highlighted
  const isLineHighlighted = (fromId, toId) => {
    if (!hoveredNode) return false;
    if (hoveredNode.id === fromId || hoveredNode.id === toId) return true;
    return false;
  };

  const handleNodeClick = (node) => {
    if (node.id === 'javascript') return;
    if (node.status === 'ready' && node.route) {
      navigate(node.route);
    } else {
      setComingSoonNode(node);
    }
  };

  const activeHoverOrSelect = hoveredNode || selectedNode;
  const activeCategory = activeHoverOrSelect
    ? categoryMap[activeHoverOrSelect.categoryId]
    : null;

  return (
    <div className="relative w-full space-y-4">
      {/* Top Controls & Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1">
          <MapLegend
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            totalNodes={ATLAS_NODES.length}
            readyNodes={11}
          />
        </div>

        {/* View Mode Toggle (Visual Network vs Structured Cards) */}
        <div className="flex items-center self-end sm:self-center bg-atlas-900 border border-atlas-border rounded-xl p-1 shrink-0">
          <button
            onClick={() => setViewMode('network')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'network'
                ? 'bg-brand-indigo/30 text-brand-blue border border-brand-indigo/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Visual Map</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'cards'
                ? 'bg-brand-indigo/30 text-brand-blue border border-brand-indigo/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clusters</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Network View */}
      {viewMode === 'network' ? (
        <div className="relative rounded-3xl bg-atlas-900/60 border border-atlas-border overflow-hidden bg-grid-pattern shadow-2xl backdrop-blur-xl">
          {/* Subtle Category Zone Backdrops */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Fundamentals zone */}
            <div className="absolute top-[8%] left-[8%] w-72 h-72 rounded-full bg-sky-500/5 blur-3xl" />
            {/* Functions zone */}
            <div className="absolute top-[8%] right-[8%] w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl" />
            {/* Behavior zone */}
            <div className="absolute bottom-[10%] left-[8%] w-72 h-72 rounded-full bg-rose-500/5 blur-3xl" />
            {/* Async zone */}
            <div className="absolute bottom-[10%] right-[8%] w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl" />
            {/* Browser zone */}
            <div className="absolute bottom-[2%] left-[40%] w-60 h-40 rounded-full bg-amber-500/5 blur-3xl" />
          </div>

          {/* SVG Canvas for Map */}
          <div className="w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] min-h-[500px]">
            <svg
              viewBox="0 0 1000 750"
              className="w-full h-full select-none"
            >
              <defs>
                {/* Glow Filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Cluster Zone Labels (Subtle background typography) */}
              {ATLAS_CATEGORIES.map((cat) => (
                <text
                  key={cat.id}
                  x={cat.clusterX}
                  y={cat.clusterY}
                  textAnchor="middle"
                  className="font-mono font-bold text-[12px] fill-slate-700/60 select-none tracking-widest uppercase pointer-events-none"
                >
                  {cat.title}
                </text>
              ))}

              {/* 1. Connection lines from Center to all Nodes */}
              {ATLAS_NODES.map((node) => {
                const category = categoryMap[node.categoryId];
                const isDimmed = selectedCategory && selectedCategory !== node.categoryId;
                const isLineActive = isLineHighlighted(CENTER_NODE.id, node.id);

                return (
                  <ConnectionLine
                    key={`center-${node.id}`}
                    from={CENTER_NODE}
                    to={node}
                    isHighlighted={isLineActive}
                    categoryColor={category ? category.color : '#6366f1'}
                  />
                );
              })}

              {/* 2. Inter-node Connections (e.g. Variables to Data Types, Scope, etc.) */}
              {ATLAS_NODES.map((node) => {
                return (node.connections || []).map((targetId) => {
                  if (targetId === 'javascript') return null;
                  const targetNode = ATLAS_NODES.find((n) => n.id === targetId);
                  if (!targetNode || targetId < node.id) return null; // Avoid duplicate lines

                  const category = categoryMap[node.categoryId];
                  const isLineActive = isLineHighlighted(node.id, targetNode.id);

                  return (
                    <ConnectionLine
                      key={`inter-${node.id}-${targetNode.id}`}
                      from={node}
                      to={targetNode}
                      isHighlighted={isLineActive}
                      categoryColor={category ? category.color : '#818cf8'}
                    />
                  );
                });
              })}

              {/* 3. Central Node: JAVASCRIPT */}
              <KnowledgeNode
                node={CENTER_NODE}
                isCenter={true}
                isHovered={hoveredNode?.id === 'javascript'}
                onHover={setHoveredNode}
                onLeave={() => setHoveredNode(null)}
              />

              {/* 4. Concept Nodes */}
              {ATLAS_NODES.map((node) => {
                const category = categoryMap[node.categoryId];
                const isHovered = hoveredNode?.id === node.id;
                const isDimmed = selectedCategory && selectedCategory !== node.categoryId;

                return (
                  <KnowledgeNode
                    key={node.id}
                    node={node}
                    isHovered={isHovered}
                    isDimmed={isDimmed}
                    categoryColor={category ? category.color : '#38bdf8'}
                    onHover={setHoveredNode}
                    onLeave={() => setHoveredNode(null)}
                    onClick={handleNodeClick}
                  />
                );
              })}
            </svg>
          </div>

          {/* Floating Hover Preview Card (Pinned bottom-left/right or reactive) */}
          {activeHoverOrSelect && activeHoverOrSelect.id !== 'javascript' && (
            <div className="absolute bottom-4 right-4 z-20 hidden md:block animate-in fade-in zoom-in-95 duration-200">
              <NodePreviewCard
                node={activeHoverOrSelect}
                category={activeCategory}
              />
            </div>
          )}
        </div>
      ) : (
        /* Mobile / Tablet Friendly Cluster Cards View */
        <MobileAtlasView onSelectNode={(node) => handleNodeClick(node)} />
      )}

      {/* Coming Soon Toast Feedback */}
      <ComingSoonToast
        node={comingSoonNode}
        onClose={() => setComingSoonNode(null)}
      />
    </div>
  );
}
