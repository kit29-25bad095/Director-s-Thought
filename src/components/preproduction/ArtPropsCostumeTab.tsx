import React, { useState } from 'react';
import {
  Palette,
  Package,
  Shirt,
  Sparkles,
  Layers,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Scissors,
  Eye,
} from 'lucide-react';
import { INITIAL_SCRIPT_BREAKDOWNS } from '../../data/preproductionData';

interface ArtPropsCostumeTabProps {
  onAskAi: (prompt: string) => void;
}

export const ArtPropsCostumeTab: React.FC<ArtPropsCostumeTabProps> = ({ onAskAi }) => {
  const [activeSubTab, setActiveSubTab] = useState<'props' | 'costume' | 'art' | 'makeup'>('props');

  return (
    <div className="space-y-5 text-neutral-100">
      {/* Header & Sub-tab Switcher */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#12141a] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Production Design, Props & Costume Continuity
            </h2>
            <p className="text-xs text-neutral-400">
              Hero props categorization, costume distress timeline, moodboards & makeup progression
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs">
          <button
            onClick={() => setActiveSubTab('props')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeSubTab === 'props' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Props Management
          </button>
          <button
            onClick={() => setActiveSubTab('costume')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeSubTab === 'costume' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Costumes Timeline
          </button>
          <button
            onClick={() => setActiveSubTab('art')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeSubTab === 'art' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Art & Motifs
          </button>
          <button
            onClick={() => setActiveSubTab('makeup')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeSubTab === 'makeup' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Makeup & Prosthetics
          </button>
        </div>
      </div>

      {/* Subtab 1: Props Management */}
      {activeSubTab === 'props' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">Hero Props (4)</span>
              <p className="text-xs text-neutral-300 mt-1">
                Scarred Titanium Torque Wrench, Forensic Datapad, Pressure Valve Lever, Prayer Beads
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-rose-400 block">Story-Critical Props</span>
              <p className="text-xs text-neutral-300 mt-1">
                Commander Verma’s Purge Log Datapad (Unlocks Act II Climax revelation)
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-blue-400 block">Consumable Props</span>
              <p className="text-xs text-neutral-300 mt-1">
                Nitrogen cannisters (4 used), Emergency O2 seal patches, Reconstituted chai packets
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Continuity Tracked</span>
              <p className="text-xs text-neutral-300 mt-1">
                Prayer beads transfer from drawer (Scene 14) to pocket (Scene 27, 42)
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Cross-Scene Props Master Registry
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                    <th className="pb-2.5 font-bold">Prop Name</th>
                    <th className="pb-2.5 font-bold">Type</th>
                    <th className="pb-2.5 font-bold">Scenes Used</th>
                    <th className="pb-2.5 font-bold">Special Care / Duplicates</th>
                    <th className="pb-2.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                  <tr>
                    <td className="py-2.5 font-semibold text-white">Scarred Titanium Torque Wrench</td>
                    <td className="py-2.5 text-amber-400 font-medium">Hero / Stunt</td>
                    <td className="py-2.5 font-mono">Scene 1, 27, 42</td>
                    <td className="py-2.5">3 copies: 1 Hero metal, 2 lightweight rubber for throws</td>
                    <td className="py-2.5 text-emerald-400">Fabricated</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-white">Military Telemetry Datapad</td>
                    <td className="py-2.5 text-rose-400 font-medium">Story-Critical</td>
                    <td className="py-2.5 font-mono">Scene 14, 27</td>
                    <td className="py-2.5">OLED screen with programmable red forensic wave animation</td>
                    <td className="py-2.5 text-emerald-400">Ready</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-white">Commander Verma's Prayer Beads</td>
                    <td className="py-2.5 text-blue-400 font-medium">Continuity Hero</td>
                    <td className="py-2.5 font-mono">Scene 14, 27, 42</td>
                    <td className="py-2.5">Worn sandalwood with specific 108 bead count & red tassel</td>
                    <td className="py-2.5 text-emerald-400">Sourced</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Costume Continuity Timeline */}
      {activeSubTab === 'costume' && (
        <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Character Costume Progression & Distress Timeline
            </h3>
            <span className="text-[11px] text-neutral-400">Act I ➔ Act II ➔ Act III</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-[10px] font-bold text-blue-400 uppercase">Act I (Scene 1-12)</span>
              <h4 className="text-xs font-bold text-white">EVA Suit Mk-IV (Pristine Stage)</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Full pressurized orbital suit. Clean visor with minor surface scuffs. Internal LED amber wash at 40% intensity.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Act II (Scene 13-35)</span>
              <h4 className="text-xs font-bold text-white">Thermal Station Parka & Tunic</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Sweat-stained collar, torn shoulder seam on Kabir’s right arm. Salt crusting around wrist cuffs from station hypothermia.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-[10px] font-bold text-rose-400 uppercase">Act III (Scene 36-46)</span>
              <h4 className="text-xs font-bold text-white">Battered Climax EVA Suit</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Scorched solar glare burn marks on chest plate, severed safety tether wrapped around Maya’s wrist, frost accumulation on collar seal.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Art & Motifs */}
      {activeSubTab === 'art' && (
        <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Production Design Visual Concepts & Color Palette
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="font-bold text-amber-400 block text-[10px] uppercase">Architectural Motifs</span>
              <p className="text-neutral-300 leading-relaxed">
                Industrial utilitarianism inspired by 1970s Soviet space stations merged with near-future Indian engineering. Exposed pneumatic conduits, hexagonal bulkheads, and modular quick-swap hatches.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="font-bold text-amber-400 block text-[10px] uppercase">Color Contrast Palette</span>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-8 h-8 rounded bg-[#1e293b] border border-neutral-700" title="Station Hull Steel (5600K)" />
                <div className="w-8 h-8 rounded bg-[#d97706] border border-neutral-700" title="Solar Reflector Gold" />
                <div className="w-8 h-8 rounded bg-[#991b1b] border border-neutral-700" title="Emergency Alarm Red" />
                <div className="w-8 h-8 rounded bg-[#0f172a] border border-neutral-700" title="Deep Space Vacuum" />
              </div>
              <p className="text-neutral-400 text-[11px] pt-1">
                Dominant deep charcoal and steel blue; accented by sudden solar gold and emergency alarm crimson.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Makeup & Prosthetics */}
      {activeSubTab === 'makeup' && (
        <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Makeup & Prosthetic Continuity Mapping
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] font-bold text-neutral-400 uppercase block">Kabir (Temple Cut)</span>
              <p className="text-neutral-300 mt-1">
                Day 1 (Fresh laceration) ➔ Day 4 (Dark scab) ➔ Day 8 (Re-opened bleeding).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] font-bold text-neutral-400 uppercase block">Hypothermia & Frost</span>
              <p className="text-neutral-300 mt-1">
                Chapped, cracked lip prosthetic for Scene 27 & 42; ice spray crystals on eyelashes.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] font-bold text-neutral-400 uppercase block">Aging & Fatigue</span>
              <p className="text-neutral-300 mt-1">
                Grey hair streaks for Kabir; hollow under-eye shadows to emphasize 10-year station isolation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
