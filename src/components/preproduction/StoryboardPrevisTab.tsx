import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Camera,
  Play,
  ArrowRight,
  Sun,
  User,
  Film,
} from 'lucide-react';
import { PreProdStoryboard } from '../../types/preproduction';

interface StoryboardPrevisTabProps {
  storyboards: PreProdStoryboard[];
  onAskAi: (prompt: string) => void;
}

export const StoryboardPrevisTab: React.FC<StoryboardPrevisTabProps> = ({
  storyboards,
  onAskAi,
}) => {
  const [selectedSbId, setSelectedSbId] = useState<string>(storyboards[0]?.id || 'sb_1_1');
  const activeSb = storyboards.find((s) => s.id === selectedSbId) || storyboards[0];

  return (
    <div className="space-y-5 text-neutral-100">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#12141a] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Storyboard & Previsualization Engine
            </h2>
            <p className="text-xs text-neutral-400">
              Camera ➔ Actor ➔ Movement ➔ Action ➔ Cut • Visual blocking sequence & optical framing
            </p>
          </div>
        </div>

        <button
          onClick={() => onAskAi('Generate 3D camera blocking coordinates and lens height for Scene 27 confrontation.')}
          className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Previs AI Assistant</span>
        </button>
      </div>

      {/* Main Grid: Storyboard Thumbnails & Previs Blocking Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Frame Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          {storyboards.map((sb) => {
            const isSelected = sb.id === selectedSbId;
            return (
              <div
                key={sb.id}
                onClick={() => setSelectedSbId(sb.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition space-y-2.5 ${
                  isSelected
                    ? 'bg-purple-500/10 border-purple-500'
                    : 'bg-[#12141a] border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                {/* Visual Thumbnail Gradient Canvas */}
                <div
                  className={`w-full h-28 rounded-lg bg-linear-to-br ${sb.thumbnailGradient} border border-neutral-700/60 p-3 flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-amber-300 font-bold backdrop-blur-xs">
                      SC {sb.sceneNumber} • {sb.shotNumber}
                    </span>
                    <span className="text-[10px] text-neutral-300 font-mono bg-black/50 px-1.5 py-0.5 rounded">
                      2.39:1
                    </span>
                  </div>

                  <div className="text-[11px] text-white font-semibold line-clamp-1 drop-shadow-md">
                    {sb.composition.split(':')[0]}
                  </div>
                </div>

                <div className="text-xs text-neutral-300 font-medium line-clamp-2">
                  {sb.composition}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Blocking Workflow (8 Cols) */}
        <div className="lg:col-span-8 bg-[#12141a] rounded-2xl border border-neutral-800 p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  SCENE {activeSb.sceneNumber} • SHOT {activeSb.shotNumber}
                </span>
                <span className="text-xs text-neutral-400">Cinematic Previsualization</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {activeSb.composition}
              </h3>
            </div>
          </div>

          {/* Previsualization Blocking Sequence (Requested by user: Camera -> Actor -> Movement -> Action -> Cut) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5" />
              <span>Previsualization Blocking Flow (Camera ➔ Actor ➔ Movement ➔ Action ➔ Cut)</span>
            </h4>

            <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 font-mono text-xs text-neutral-200 leading-relaxed">
              {activeSb.blockingWorkflow.split('->').map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 py-1">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-neutral-300">{step.trim()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Optical & Physical Setup Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                <Camera className="w-3 h-3 text-emerald-400" /> Camera Position & Height
              </span>
              <p className="text-neutral-200">{activeSb.cameraPosition}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                <User className="w-3 h-3 text-indigo-400" /> Character Positions & Marks
              </span>
              <p className="text-neutral-200">{activeSb.characterPositions}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                <Sun className="w-3 h-3 text-amber-400" /> Lighting Approach & Practical Falloff
              </span>
              <p className="text-neutral-200">{activeSb.lightingApproach}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                <Film className="w-3 h-3 text-cyan-400" /> Environment & Atmosphere
              </span>
              <p className="text-neutral-200">{activeSb.environment}</p>
            </div>
          </div>

          {/* Technical Notes */}
          {activeSb.notes && (
            <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800 text-xs text-neutral-400">
              <strong className="text-neutral-300">DP & VFX Operator Note: </strong>
              {activeSb.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
