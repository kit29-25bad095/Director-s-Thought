import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  Zap,
  Volume2,
  Camera,
  Sun,
  Truck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  DollarSign,
} from 'lucide-react';
import { PreProdLocation } from '../../types/preproduction';

interface LocationsScoutTabProps {
  locations: PreProdLocation[];
  onAskAi: (prompt: string) => void;
}

export const LocationsScoutTab: React.FC<LocationsScoutTabProps> = ({
  locations,
  onAskAi,
}) => {
  const [selectedLocId, setSelectedLocId] = useState<string>(locations[0]?.id || 'loc_soundstage1');
  const activeLoc = locations.find((l) => l.id === selectedLocId) || locations[0];

  return (
    <div className="space-y-5 text-neutral-100">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#12141a] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Location Intelligence & Scout Reports
            </h2>
            <p className="text-xs text-neutral-400">
              Stage blueprints, ambient acoustic ratings, company move consolidation & scout evaluations
            </p>
          </div>
        </div>

        <button
          onClick={() => onAskAi('How can we consolidate locations to reduce company moves and generator rental costs?')}
          className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Zap className="w-3.5 h-3.5 text-blue-400" />
          <span>Consolidation Engine</span>
        </button>
      </div>

      {/* Grid: Location Cards & Deep Scout Report */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Location Cards (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          {locations.map((loc) => {
            const isSelected = loc.id === selectedLocId;
            return (
              <div
                key={loc.id}
                onClick={() => setSelectedLocId(loc.id)}
                className={`p-4 rounded-xl border cursor-pointer transition space-y-2.5 ${
                  isSelected
                    ? 'bg-blue-500/10 border-blue-500'
                    : 'bg-[#12141a] border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate max-w-50">
                    {loc.name}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                      loc.permitsStatus === 'Secured'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {loc.permitsStatus}
                  </span>
                </div>

                <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>{loc.intExt} • {loc.dayNight}</span>
                  <span className="font-mono text-emerald-400">
                    ₹{loc.dailyRateINR.toLocaleString('en-IN')}/day
                  </span>
                </div>

                <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-800/80 flex items-center justify-between">
                  <span>Used in {loc.scenesUsed.length} Scenes</span>
                  <span className="text-neutral-400">Scenes: {loc.scenesUsed.join(', ')}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Scout Report & Technical Specs (8 Cols) */}
        <div className="lg:col-span-8 bg-[#12141a] rounded-2xl border border-neutral-800 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{activeLoc.name}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                  {activeLoc.type}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {activeLoc.addressOrStage}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono">
                Daily Rate: ₹{activeLoc.dailyRateINR.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Consolidation Suggestion Banner */}
          {activeLoc.consolidationSuggestion && (
            <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-start gap-2 text-xs text-blue-200">
              <Zap className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-blue-300">AI Consolidation Suggestion: </strong>
                <span>{activeLoc.consolidationSuggestion}</span>
              </div>
            </div>
          )}

          {/* 4 Technical Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                <Sun className="w-3 h-3 text-amber-400" /> Lighting Conditions
              </span>
              <p className="text-neutral-200 leading-relaxed">{activeLoc.lightingConditions}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-indigo-400" /> Sound Environment & Acoustics
              </span>
              <p className="text-neutral-200 leading-relaxed">{activeLoc.soundEnvironment}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                <Camera className="w-3 h-3 text-emerald-400" /> Camera & Dolly Rig Access
              </span>
              <p className="text-neutral-200 leading-relaxed">{activeLoc.cameraAccess}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                <Truck className="w-3 h-3 text-purple-400" /> Floor Dimensions & Height
              </span>
              <p className="text-neutral-200 leading-relaxed">{activeLoc.spaceDimensions}</p>
            </div>
          </div>

          {/* Scout Report Summary Box */}
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Scout Report Assessment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-neutral-300">
              <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-400 text-[10px] uppercase font-bold block">Power</span>
                {activeLoc.scoutReport.powerAvailable}
              </div>
              <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-400 text-[10px] uppercase font-bold block">Parking & Basecamp</span>
                {activeLoc.scoutReport.parkingSpace}
              </div>
              <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-400 text-[10px] uppercase font-bold block">Noise Rating</span>
                <span className="text-emerald-400 font-bold">{activeLoc.scoutReport.ambientNoiseRating}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800/80 text-neutral-300">
              <strong className="text-neutral-200">Director & AD Recommendation: </strong>
              {activeLoc.scoutReport.recommendation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
