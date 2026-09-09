import React, { useState } from 'react';
import {
  Layers,
  Users,
  Film,
  Camera,
  Truck,
  Sparkles,
  Search,
  CheckCircle2,
  Tag,
  MapPin,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { SceneBreakdown } from '../../types';

interface ProductionBreakdownViewProps {
  breakdowns: SceneBreakdown[];
}

export const ProductionBreakdownView: React.FC<ProductionBreakdownViewProps> = ({
  breakdowns,
}) => {
  const [selectedSceneNum, setSelectedSceneNum] = useState<number>(
    breakdowns[0]?.sceneNumber || 27
  );
  const [searchTerm, setSearchTerm] = useState('');

  const activeBreakdown =
    breakdowns.find((b) => b.sceneNumber === selectedSceneNum) || breakdowns[0];

  const filteredBreakdowns = breakdowns.filter(
    (b) =>
      b.slugline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.sceneNumber.toString().includes(searchTerm)
  );

  return (
    <div id="production-breakdown-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Production Architecture</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            SCENE BREAKDOWN STUDIO
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Automated entity tagging extracting Cast, Costumes, Props, Equipment, VFX, SFX, and Stunts directly from screenplay drafts with zero manual data entry.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 font-semibold">
          <span>46 Scenes Tagged</span>
          <span>•</span>
          <span className="text-emerald-700">100% Complete</span>
        </div>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scene Selector */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter scene breakdown..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-purple-500"
            />
          </div>

          <div className="space-y-2">
            {filteredBreakdowns.map((b) => {
              const isSelected = b.sceneNumber === activeBreakdown?.sceneNumber;
              return (
                <button
                  key={b.sceneNumber}
                  onClick={() => setSelectedSceneNum(b.sceneNumber)}
                  className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-50/80 border-purple-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-mono font-bold text-purple-700">
                      SCENE {b.sceneNumber}
                    </span>
                    <span className="text-slate-400">{b.estimatedShootTime}</span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 truncate">
                    {b.slugline}
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span>{b.location}</span>
                    <span className="text-slate-700 font-semibold">{b.cast.length} Cast</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Detailed Scene Breakdown Sheet */}
        {activeBreakdown && (
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                    Breakdown Sheet • Scene {activeBreakdown.sceneNumber}
                  </span>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">
                    {activeBreakdown.slugline}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-bold">
                    Est. Time: {activeBreakdown.estimatedShootTime}
                  </span>
                </div>
              </div>

              {/* Tagged Elements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Cast */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-600" />
                    <span>Cast Characters ({activeBreakdown.cast.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activeBreakdown.cast.map((c, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-semibold text-[11px]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location & Int/Ext */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Location & Set</span>
                  </div>
                  <div className="text-slate-700 font-medium">{activeBreakdown.location}</div>
                  <div className="text-[11px] text-slate-500">{activeBreakdown.intOrExt} • {activeBreakdown.dayOrNight}</div>
                </div>

                {/* Props */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    <span>Props</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activeBreakdown.props.map((p, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Costumes */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Wardrobe & Costumes</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activeBreakdown.costumes.map((cos, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 border border-indigo-200 text-[11px] font-medium"
                      >
                        {cos}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Equipment */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Camera & Rigging</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activeBreakdown.equipment.map((eq, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-medium"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* VFX & Stunts */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>VFX & Physical Stunts</span>
                  </div>
                  <div className="text-[11px] space-y-1">
                    <div>
                      <span className="font-semibold text-slate-500">VFX:</span>{' '}
                      <span className="text-slate-800">{activeBreakdown.vfx.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Stunts:</span>{' '}
                      <span className="text-slate-800">{activeBreakdown.stunts.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Production Notes */}
              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/60 text-xs">
                <span className="font-bold text-purple-900">Department Notes:</span>
                <p className="text-purple-950 mt-0.5 leading-relaxed font-medium">
                  {activeBreakdown.notes}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
