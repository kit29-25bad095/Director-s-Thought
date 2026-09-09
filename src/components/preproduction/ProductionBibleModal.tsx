import React, { useState } from 'react';
import {
  BookOpen,
  Printer,
  Download,
  X,
  Sparkles,
  Layers,
  Users,
  MapPin,
  Camera,
  Shirt,
  Volume2,
  Calendar,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';
import { Project } from '../../types';
import { INITIAL_SCRIPT_BREAKDOWNS, INITIAL_PREPROD_CHARACTERS, INITIAL_PREPROD_LOCATIONS } from '../../data/preproductionData';

interface ProductionBibleModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductionBibleModal: React.FC<ProductionBibleModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [activeSection, setActiveSection] = useState<
    'vision' | 'breakdown' | 'characters' | 'locations' | 'technical' | 'schedule'
  >('vision');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#101217] border border-neutral-800 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/80 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                  Comprehensive Master Document
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                  Locked Draft 04
                </span>
              </div>
              <h2 className="text-lg font-bold text-white">
                {project.name} — Official Production Bible
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={() => alert('Production Bible exported as complete ZIP archive (Scripts, Breakdowns, Technical Drawings, Budget).')}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold cursor-pointer transition flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Package</span>
            </button>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-5 py-2.5 bg-neutral-950 border-b border-neutral-800/80 overflow-x-auto text-xs shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveSection('vision')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'vision'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. Director's Vision</span>
          </button>
          <button
            onClick={() => setActiveSection('breakdown')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'breakdown'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Script Breakdown</span>
          </button>
          <button
            onClick={() => setActiveSection('characters')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'characters'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>3. Characters & Cast</span>
          </button>
          <button
            onClick={() => setActiveSection('locations')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'locations'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>4. Locations & Stages</span>
          </button>
          <button
            onClick={() => setActiveSection('technical')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'technical'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>5. Technical Bible (Camera/Sound)</span>
          </button>
          <button
            onClick={() => setActiveSection('schedule')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'schedule'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>6. Master Schedule & Budget</span>
          </button>
        </div>

        {/* Bible Body View */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#0d0e12] scrollbar-thin scrollbar-thumb-neutral-800">
          {activeSection === 'vision' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="border-b border-neutral-800 pb-5">
                <span className="text-xs text-amber-400 font-mono uppercase tracking-widest">
                  Chapter I • Creative Manifest
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Director's Vision & Aesthetic Philosophy
                </h1>
                <p className="text-sm text-neutral-400 mt-1 italic">
                  "Atonement cannot be calculated; sacrifice is not an engineering variable."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Logline & Premise
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {project.logline}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Thematic Anchor
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    The conflict between technological coldness and primal human love. Every piece of equipment in the station was designed to save humanity from space; yet it took an immoral act for a father to preserve his own bloodline.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Visual Treatment & Aesthetic Grammar
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                    <span className="font-bold text-white block mb-1">Color Contrast</span>
                    Cyan, desaturated 5600K orbital steel vs warm amber 3200K interior memories.
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                    <span className="font-bold text-white block mb-1">Aspect Ratio</span>
                    2.39:1 Anamorphic format framing small characters in claustrophobic bulkheads.
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800/80">
                    <span className="font-bold text-white block mb-1">Pacing & Cutting</span>
                    Deliberate, meditative long takes escalating into kinetic, handheld tension in Act III.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'breakdown' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="border-b border-neutral-800 pb-5">
                <span className="text-xs text-amber-400 font-mono uppercase tracking-widest">
                  Chapter II • Scene Breakdown
                </span>
                <h1 className="text-2xl font-bold text-white mt-1">
                  Master Script Breakdown Matrix
                </h1>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Synchronized across Art, Props, Stunts, Sound, and Schedule
                </p>
              </div>

              <div className="space-y-4">
                {INITIAL_SCRIPT_BREAKDOWNS.map((sc) => (
                  <div
                    key={sc.sceneNumber}
                    className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/60 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-xs">
                          SCENE {sc.sceneNumber}
                        </span>
                        <span className="text-xs font-mono font-semibold text-white">
                          {sc.slugline}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-400 font-mono">
                        {sc.pages} Pages • Est {sc.estimatedShootingHours} hrs
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 italic">
                      "{sc.storyPurpose}"
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                        <span className="text-neutral-400 font-bold block text-[10px] uppercase">Cast</span>
                        <span className="text-white">{sc.characters.join(', ')}</span>
                      </div>
                      <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                        <span className="text-neutral-400 font-bold block text-[10px] uppercase">Hero Props</span>
                        <span className="text-white">{sc.props.hero.join(', ')}</span>
                      </div>
                      <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                        <span className="text-neutral-400 font-bold block text-[10px] uppercase">Stunts & Safety</span>
                        <span className="text-white">{sc.stunts.length ? sc.stunts[0].description : 'None'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'characters' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="border-b border-neutral-800 pb-5">
                <span className="text-xs text-amber-400 font-mono uppercase tracking-widest">
                  Chapter III • Character Roster
                </span>
                <h1 className="text-2xl font-bold text-white mt-1">
                  Character Motivations & Casting Dossier
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INITIAL_PREPROD_CHARACTERS.map((char) => (
                  <div
                    key={char.id}
                    className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <div>
                        <h3 className="text-base font-bold text-white">{char.name}</h3>
                        <span className="text-xs text-amber-400 font-medium">{char.roleType} • {char.ageRange}</span>
                      </div>
                      <span className="text-xs text-neutral-400 font-mono">
                        {char.screenTimePercent}% Screen Time
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-neutral-300">
                      <div>
                        <span className="text-neutral-400 font-semibold block text-[10px] uppercase">Dramatic Goal</span>
                        <p>{char.goal}</p>
                      </div>
                      <div>
                        <span className="text-neutral-400 font-semibold block text-[10px] uppercase">Internal Conflict</span>
                        <p>{char.internalConflict}</p>
                      </div>
                      <div>
                        <span className="text-neutral-400 font-semibold block text-[10px] uppercase">Character Arc</span>
                        <p>{char.arc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'locations' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="border-b border-neutral-800 pb-5">
                <span className="text-xs text-amber-400 font-mono uppercase tracking-widest">
                  Chapter IV • Locations & Stages
                </span>
                <h1 className="text-2xl font-bold text-white mt-1">
                  Location Scouting & Stage Floorplans
                </h1>
              </div>

              <div className="space-y-4">
                {INITIAL_PREPROD_LOCATIONS.map((loc) => (
                  <div
                    key={loc.id}
                    className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-2">
                      <div>
                        <h3 className="text-sm font-bold text-white">{loc.name}</h3>
                        <span className="text-xs text-neutral-400">{loc.type}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Permit: {loc.permitsStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-neutral-300">
                      <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                        <span className="text-neutral-400 text-[10px] uppercase font-bold block">Dimensions</span>
                        {loc.spaceDimensions}
                      </div>
                      <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                        <span className="text-neutral-400 text-[10px] uppercase font-bold block">Power & Fleet</span>
                        {loc.scoutReport.powerAvailable}
                      </div>
                      <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800">
                        <span className="text-neutral-400 text-[10px] uppercase font-bold block">Daily Rate</span>
                        ₹{loc.dailyRateINR.toLocaleString('en-IN')}/day
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'technical' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="border-b border-neutral-800 pb-5">
                <span className="text-xs text-amber-400 font-mono uppercase tracking-widest">
                  Chapter V • Technical Specifications
                </span>
                <h1 className="text-2xl font-bold text-white mt-1">
                  Camera, Optics & Acoustic Blueprint
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-300">
                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span>Camera Package</span>
                  </h3>
                  <p className="leading-relaxed">
                    • A-Camera: Arri Alexa Mini LF (Open Gate 4.5K ProRes 4444XQ)<br/>
                    • B-Camera: Arri Alexa 35 (Super 35 4.6K for high-ISO low-light)<br/>
                    • Lenses: Cooke Anamorphic /i Full Frame Plus (32, 40, 50, 75, 100mm)<br/>
                    • Rigging: 30ft Technocrane with Chapman Minibase, Ronin 2 3-axis head
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-indigo-400" />
                    <span>Sound Design Specification</span>
                  </h3>
                  <p className="leading-relaxed">
                    • Mics: Schoeps CMC641 matched pair, DPA 4060 miniature lavaliers<br/>
                    • Helmet Comms: Wireless bone-conduction communication loop<br/>
                    • Wild Tracks: 32-bit float impulse responses of all station sets<br/>
                    • Score: 50-piece string orchestra recorded in Abbey Road Studios
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'schedule' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="border-b border-neutral-800 pb-5">
                <span className="text-xs text-amber-400 font-mono uppercase tracking-widest">
                  Chapter VI • Schedule & Fiscal Plan
                </span>
                <h1 className="text-2xl font-bold text-white mt-1">
                  Master Stripboard & Capital Budget Allocation
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-center">
                  <span className="text-xs text-neutral-400 font-semibold uppercase block">Total Shoot Days</span>
                  <span className="text-2xl font-bold text-white font-mono mt-1 block">28 Days</span>
                  <span className="text-[11px] text-emerald-400">0 Day Contingency Buffer</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-center">
                  <span className="text-xs text-neutral-400 font-semibold uppercase block">Estimated Budget</span>
                  <span className="text-2xl font-bold text-white font-mono mt-1 block">{project.estimatedBudget}</span>
                  <span className="text-[11px] text-emerald-400">₹14L Contingency Reserve</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-center">
                  <span className="text-xs text-neutral-400 font-semibold uppercase block">Company Moves</span>
                  <span className="text-2xl font-bold text-white font-mono mt-1 block">1 Move</span>
                  <span className="text-[11px] text-blue-400">Mumbai Stage ➔ Leh Valley</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/90 flex items-center justify-between text-xs text-neutral-400 shrink-0">
          <span>Official Film Production Bible • Ready for Studio Sign-Off</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold cursor-pointer transition"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
