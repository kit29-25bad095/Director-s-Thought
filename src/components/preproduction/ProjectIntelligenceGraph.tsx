import React, { useState } from 'react';
import {
  Network,
  Share2,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  MapPin,
  Users,
  Package,
  Shirt,
  Camera,
  Film,
  Calendar,
  DollarSign,
  FileText,
} from 'lucide-react';
import { IntelligenceNode } from '../../types/preproduction';

interface ProjectIntelligenceGraphProps {
  nodes: IntelligenceNode[];
  onSelectNode?: (nodeId: string) => void;
  onSimulateChange: (nodeId: string) => void;
}

export const ProjectIntelligenceGraph: React.FC<ProjectIntelligenceGraphProps> = ({
  nodes,
  onSelectNode,
  onSimulateChange,
}) => {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [activeNodeId, setActiveNodeId] = useState<string>(nodes[2]?.id || 'node_sc_27');

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];
  const connectedNodes = nodes.filter((n) => activeNode?.connectedNodeIds.includes(n.id));

  const typeConfig: Record<string, { icon: any; color: string; bg: string }> = {
    Scene: { icon: Film, color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30' },
    Character: { icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/15 border-indigo-500/30' },
    Location: { icon: MapPin, color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/30' },
    Prop: { icon: Package, color: 'text-amber-300', bg: 'bg-amber-500/15 border-amber-500/30' },
    Costume: { icon: Shirt, color: 'text-pink-400', bg: 'bg-pink-500/15 border-pink-500/30' },
    Camera: { icon: Camera, color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30' },
    Shot: { icon: Film, color: 'text-cyan-400', bg: 'bg-cyan-500/15 border-cyan-500/30' },
    Storyboard: { icon: Layers, color: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/30' },
    Schedule: { icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/30' },
    Budget: { icon: DollarSign, color: 'text-emerald-300', bg: 'bg-emerald-500/15 border-emerald-500/30' },
    CallSheet: { icon: FileText, color: 'text-rose-400', bg: 'bg-rose-500/15 border-rose-500/30' },
  };

  const filteredNodes =
    selectedType === 'ALL' ? nodes : nodes.filter((n) => n.type === selectedType);

  return (
    <div className="bg-[#12141a] rounded-2xl border border-neutral-800 overflow-hidden text-neutral-100 flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                Project Intelligence Knowledge Graph
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                Live Relational Mesh
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Scene ➔ Characters ➔ Location ➔ Props ➔ Costume ➔ Camera ➔ Shot ➔ Storyboard ➔ Schedule ➔ Budget
            </p>
          </div>
        </div>

        {/* Filter by Type */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0 scrollbar-none">
          <span className="text-neutral-500 text-[11px] font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {['ALL', 'Scene', 'Character', 'Location', 'Prop', 'Camera', 'Schedule', 'Budget'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedType === t
                  ? 'bg-amber-500 text-neutral-950 shadow-xs'
                  : 'bg-neutral-800/80 text-neutral-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Graph Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
        {/* Left: Interactive Node Grid (7 Cols) */}
        <div className="lg:col-span-7 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Click any node to trace connected dependencies across departments:</span>
            <span className="font-mono text-neutral-500">{filteredNodes.length} nodes indexed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-800">
            {filteredNodes.map((node) => {
              const cfg = typeConfig[node.type] || {
                icon: Film,
                color: 'text-amber-400',
                bg: 'bg-amber-500/15 border-amber-500/30',
              };
              const IconComp = cfg.icon;
              const isSelected = node.id === activeNodeId;

              return (
                <div
                  key={node.id}
                  onClick={() => {
                    setActiveNodeId(node.id);
                    onSelectNode?.(node.id);
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition flex flex-col justify-between gap-2 group ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/5'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${cfg.bg} ${cfg.color} shrink-0`}>
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                        {node.type}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        node.status === 'Ready'
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-amber-500/15 text-amber-300'
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                      {node.label}
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                      {node.detail}
                    </p>
                  </div>

                  <div className="pt-1.5 border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                    <span>{node.connectedNodeIds.length} Cross-Links</span>
                    <span className="text-amber-400/80 group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                      Trace <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Node Inspection & Ripple Simulation (5 Cols) */}
        <div className="lg:col-span-5 p-4 sm:p-5 bg-neutral-900/40 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                Active Node Inspection
              </span>
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Shared Intelligence Active
              </span>
            </div>

            {activeNode && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                      {activeNode.type} Node
                    </span>
                    <span className="text-xs font-mono text-neutral-400">{activeNode.id}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{activeNode.label}</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">{activeNode.detail}</p>
                </div>

                {/* Connected Linked Nodes */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-neutral-400 block">
                    Directly Connected Entities ({connectedNodes.length}):
                  </span>
                  <div className="space-y-1.5 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800">
                    {connectedNodes.map((cn) => {
                      const cfg = typeConfig[cn.type] || {
                        icon: Film,
                        color: 'text-amber-400',
                        bg: 'bg-amber-500/15 border-amber-500/30',
                      };
                      const Icon = cfg.icon;
                      return (
                        <div
                          key={cn.id}
                          onClick={() => setActiveNodeId(cn.id)}
                          className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/90 hover:border-amber-500/50 cursor-pointer flex items-center justify-between text-xs transition"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border ${cfg.bg} ${cfg.color} shrink-0`}>
                              <Icon className="w-3 h-3" />
                            </div>
                            <span className="text-neutral-200 font-medium truncate">{cn.label}</span>
                          </div>
                          <span className="text-[10px] text-neutral-500 font-mono shrink-0 pl-2">
                            {cn.type}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Simulate Change Action */}
          <div className="pt-3 border-t border-neutral-800 space-y-2">
            <button
              onClick={() => onSimulateChange(activeNode.id)}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Change to "{activeNode?.label.split(':')[0] || 'Node'}"</span>
            </button>
            <p className="text-[10px] text-neutral-500 text-center">
              Evaluates instant ripple effect across Location, Schedule, Lighting, Camera, and Budget.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
