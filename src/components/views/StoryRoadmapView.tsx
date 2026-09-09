import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Film,
  MapPin,
  Clock,
  ShieldAlert,
  ArrowRight,
  GitCommit,
  Tag,
  Search,
} from 'lucide-react';
import { RoadmapItem } from '../../types';

interface StoryRoadmapViewProps {
  roadmapItems: RoadmapItem[];
  onSelectRoadmapItem?: (item: RoadmapItem) => void;
}

export const StoryRoadmapView: React.FC<StoryRoadmapViewProps> = ({
  roadmapItems,
  onSelectRoadmapItem,
}) => {
  const [selectedId, setSelectedId] = useState<string>(roadmapItems[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedItem = roadmapItems.find((r) => r.id === selectedId) || roadmapItems[0];

  const filteredItems = roadmapItems.filter(
    (item) =>
      item.objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.beat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="story-roadmap-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Master Creative Blueprint</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            STORY ROADMAP
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            The bridge between story structure and screenplay execution. Every screenplay scene links directly to a roadmap objective. System continuously monitors coverage and prevents accidental creative drift.
          </p>
        </div>

        {/* Blueprint Coverage Stats */}
        <div className="flex items-center gap-3 text-xs bg-purple-50 border border-purple-200/80 rounded-xl p-3">
          <div>
            <div className="text-[10px] text-purple-700 font-semibold uppercase">Roadmap Coverage</div>
            <div className="text-lg font-extrabold text-purple-950">95.6%</div>
          </div>
          <div className="h-8 w-px bg-purple-200" />
          <div>
            <div className="text-[10px] text-purple-700 font-semibold uppercase">Drift Status</div>
            <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Locked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search objectives, beats, or IDs (e.g. RM-27)..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-purple-500"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredItems.length} Blueprint Objectives
        </div>
      </div>

      {/* Main Layout: Left Roadmap Timeline, Right Item Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Visual Hierarchical Roadmap */}
        <div className="lg:col-span-2 space-y-3">
          {filteredItems.map((item) => {
            const isSelected = item.id === selectedItem?.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  if (onSelectRoadmapItem) onSelectRoadmapItem(item);
                }}
                className={`p-4 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-purple-50/80 border-purple-400 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 text-purple-300">
                      {item.id}
                    </span>
                    <span className="font-bold text-purple-700 uppercase">
                      {item.act} • {item.sequence}
                    </span>
                    <span>•</span>
                    <span className="text-slate-500 font-medium">{item.beat}</span>
                  </div>

                  <div className="text-xs font-bold text-slate-900">
                    {item.objective}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Film className="w-3 h-3 text-slate-400" />
                      <span>Scene {item.plannedScene}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0">
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      item.productionImportance === 'CRITICAL'
                        ? 'bg-red-100 text-red-800'
                        : item.productionImportance === 'HIGH'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.productionImportance}
                  </span>

                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{item.coverageStatus}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Blueprint Item Inspector */}
        {selectedItem && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between text-[10px] font-bold text-purple-600">
                <span>{selectedItem.id}</span>
                <span>Scene {selectedItem.plannedScene}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                {selectedItem.objective}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-900">Story Event:</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{selectedItem.storyEvent}</p>
              </div>

              <div>
                <span className="font-bold text-slate-900">Conflict:</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{selectedItem.conflict}</p>
              </div>

              <div>
                <span className="font-bold text-slate-900">Emotional Objective:</span>
                <p className="text-purple-700 font-medium mt-0.5 leading-relaxed">
                  {selectedItem.emotionalObjective}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-semibold text-slate-400">Setup</span>
                  <div className="text-[11px] font-medium text-slate-800 mt-0.5">
                    {selectedItem.setup}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-semibold text-slate-400">Payoff</span>
                  <div className="text-[11px] font-medium text-slate-800 mt-0.5">
                    {selectedItem.payoff}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="font-bold text-slate-900">Production Dependencies:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedItem.dependencies.map((dep, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1">
                <span className="font-bold text-slate-900">Foreshadowing:</span>
                <p className="text-slate-600 text-[11px] italic leading-relaxed">
                  “{selectedItem.foreshadowing}”
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
