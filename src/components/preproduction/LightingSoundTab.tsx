import React, { useState } from 'react';
import {
  Sun,
  Volume2,
  Music,
  Radio,
  Sparkles,
  Sliders,
  Disc,
  FileText,
  ShieldCheck,
} from 'lucide-react';

interface LightingSoundTabProps {
  onAskAi: (prompt: string) => void;
}

export const LightingSoundTab: React.FC<LightingSoundTabProps> = ({ onAskAi }) => {
  const [selectedScene, setSelectedScene] = useState<number>(27);

  const lightingSetups: Record<number, any> = {
    1: {
      keyLight: '24kW HMI Solar Beam on 60ft boom (Hard direct 5600K)',
      fillLight: 'Zero fill (Hard vacuum space contrast ratio 1:32)',
      backlight: 'Cyan LED rim bounce off orbital reflector petal',
      practicals: 'EVA helmet faceplate interior amber warm LED ribbon (3200K)',
      soundMics: 'Internal DPA 4060 helmet lav + chest bone conduction contact mic',
      roomTone: 'Complete external silence / pure claustrophobic suit respiration',
      musicCue: 'Sparse low cello drone transitioning into celestial glass harmonic swell',
      licenseStatus: 'Original Commission (Abbey Road Orchestra)',
    },
    14: {
      keyLight: 'Arri SkyPanel S60 diffused through 8x8 grid cloth (Corridor spill)',
      fillLight: 'Bounced warm tungsten bounce off mess hall stainless steel table',
      backlight: 'Overhead tube LED fixture flickering at 60Hz',
      practicals: 'Illuminated maintenance datapad display and coffee heating plate',
      soundMics: 'Schoeps CMC641 boom overhead + hidden Sanken COS-11D lavaliers',
      roomTone: 'Sub-bass 60Hz station HVAC recirculation rumble with mild 1.2s metallic echo',
      musicCue: 'Subtle dissonant piano motif when prayer beads are uncovered',
      licenseStatus: 'Original Score Lock',
    },
    27: {
      keyLight: 'DMX-controlled red emergency beacon sweeping every 4 seconds',
      fillLight: '15% cool cyan fill from cracked oxygen chamber indicator console',
      backlight: 'Subtle hair kicker light highlighting cold condensation mist',
      practicals: 'Forensic datapad emitting pulsing red waveform at 2.4 candela',
      soundMics: 'Dual lavaliers + Schoeps boundary plant mic affixed to steel bulkhead',
      roomTone: 'Hollow, claustrophobic vault acoustics with zero outside leak',
      musicCue: 'Solo violin rising in painful harmonic tension, cutting to dead silence on confession',
      licenseStatus: 'Original Score (Master Cue #18 locked)',
    },
  };

  const setup = lightingSetups[selectedScene] || lightingSetups[27];

  return (
    <div className="space-y-5 text-neutral-100">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#12141a] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Lighting & Sound Design Technical Blueprint
            </h2>
            <p className="text-xs text-neutral-400">
              Key/fill/backlight ratios, practical fixtures, acoustic microphone layout, wild tracks & music licensing
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[1, 14, 27].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedScene(num)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition ${
                selectedScene === num
                  ? 'bg-amber-500 text-neutral-950 shadow-xs'
                  : 'bg-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              Scene {num} Spec
            </button>
          ))}
        </div>
      </div>

      {/* Main Lighting & Sound Dual Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Module 1: Lighting Approach */}
        <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <span>Gaffer & Lighting Master Plan (Scene {selectedScene})</span>
            </h3>
            <span className="text-[10px] font-mono text-neutral-400">DMX Profile Active</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">Key Light</span>
              <p className="text-neutral-200">{setup.keyLight}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-400 block">Fill Light & Contrast Ratio</span>
              <p className="text-neutral-200">{setup.fillLight}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-indigo-400 block">Backlight / Rim Separation</span>
              <p className="text-neutral-200">{setup.backlight}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-rose-400 block">Practical Fixtures</span>
              <p className="text-neutral-200">{setup.practicals}</p>
            </div>
          </div>
        </div>

        {/* Module 2: Sound & Music Design */}
        <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <span>Sound Recordist & Music Supervision</span>
            </h3>
            <span className="text-[10px] font-mono text-neutral-400">32-bit Float Capture</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-indigo-400 block">Dialogue Microphone Layout</span>
              <p className="text-neutral-200">{setup.soundMics}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-cyan-400 block">Acoustics & Ambient Room Tone</span>
              <p className="text-neutral-200">{setup.roomTone}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-purple-400 block">Score / Music Cue</span>
              <p className="text-neutral-200">{setup.musicCue}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Music Licensing Status</span>
                <span className="text-emerald-400 font-semibold">{setup.licenseStatus}</span>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
