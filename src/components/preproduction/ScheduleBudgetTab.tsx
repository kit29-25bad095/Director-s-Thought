import React, { useState } from 'react';
import {
  Calendar,
  DollarSign,
  Clock,
  Layers,
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  Plus,
  BarChart3,
  TrendingDown,
} from 'lucide-react';

interface ScheduleBudgetTabProps {
  onAskAi: (prompt: string) => void;
}

export const ScheduleBudgetTab: React.FC<ScheduleBudgetTabProps> = ({ onAskAi }) => {
  const [activeSubTab, setActiveSubTab] = useState<'stripboard' | 'budget' | 'equipment'>('stripboard');

  // Stripboard strips
  const [strips, setStrips] = useState([
    { day: 'Day 1', scene: 'SC 1', slugline: 'EXT. HELIOS-7 SOLAR REFLECTOR', intExt: 'EXT', dayNight: 'DAY', loc: 'Stage 1 (LED/Wire)', pages: 2.2, hours: 9.5, cast: 'Kabir' },
    { day: 'Day 2-3', scene: 'SC 42', slugline: 'EXT. HELIOS-7 GIMBAL ARRAY CLIMAX', intExt: 'EXT', dayNight: 'DAY', loc: 'Stage 1 (LED/Wire)', pages: 6.5, hours: 14.0, cast: 'Kabir, Maya' },
    { day: 'Day 4-5', scene: 'SC 14', slugline: 'INT. MODULE C - MESS HALL', intExt: 'INT', dayNight: 'NIGHT', loc: 'Stage 2 (Station Interior)', pages: 2.8, hours: 5.0, cast: 'Kabir, Maya' },
    { day: 'Day 6-8', scene: 'SC 27', slugline: 'INT. AUXILIARY OXYGEN VAULT', intExt: 'INT', dayNight: 'NIGHT', loc: 'Stage 2 (Vault Set)', pages: 4.8, hours: 8.0, cast: 'Kabir, Maya' },
    { day: 'Day 16-19', scene: 'SC 11 & 46', slugline: 'EXT. LEH MOUNTAIN VALLEY', intExt: 'EXT', dayNight: 'DAY', loc: 'Leh-Ladakh Stakna Ridge', pages: 4.0, hours: 12.0, cast: 'Kabir, Maya' },
  ]);

  return (
    <div className="space-y-5 text-neutral-100">
      {/* Subtab Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#12141a] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Schedule Stripboard & Budget Intelligence
            </h2>
            <p className="text-xs text-neutral-400">
              Location grouping efficiency, estimated vs actual budget variances, equipment rental tracking
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs">
          <button
            onClick={() => setActiveSubTab('stripboard')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeSubTab === 'stripboard' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Stripboard Schedule
          </button>
          <button
            onClick={() => setActiveSubTab('budget')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeSubTab === 'budget' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Budget Intelligence
          </button>
          <button
            onClick={() => setActiveSubTab('equipment')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeSubTab === 'equipment' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Equipment Package
          </button>
        </div>
      </div>

      {/* 1. Stripboard Schedule View */}
      {activeSubTab === 'stripboard' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Total Shooting Days: <strong className="text-white">28 Days</strong></span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400">Schedule Efficiency: <strong className="text-emerald-400">98% Optimized</strong></span>
            </div>
            <button
              onClick={() => onAskAi('Optimize the stripboard to group all Soundstage 1 wire stunt scenes and minimize turnaround times.')}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Stripboard Auto-Optimize</span>
            </button>
          </div>

          <div className="space-y-2">
            {strips.map((strip, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-4 rounded-xl bg-[#12141a] border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-neutral-700 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 font-mono text-xs font-bold shrink-0">
                    {strip.day}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">{strip.scene}</span>
                      <span className="text-xs font-bold text-white">{strip.slugline}</span>
                    </div>
                    <span className="text-[11px] text-neutral-400">
                      Location: <strong className="text-neutral-300">{strip.loc}</strong> • Cast: {strip.cast}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 shrink-0">
                  <span>{strip.pages} pgs</span>
                  <span>{strip.hours} hrs</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 text-[10px] font-sans font-semibold">
                    {strip.intExt} • {strip.dayNight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Budget Intelligence View */}
      {activeSubTab === 'budget' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Estimated Range</span>
              <span className="text-xl font-bold text-white font-mono mt-1 block">₹2.4 Cr – ₹2.8 Cr</span>
              <span className="text-[11px] text-emerald-400">Under Studio Ceiling (₹3.0 Cr)</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Locked Actual Quotes</span>
              <span className="text-xl font-bold text-amber-400 font-mono mt-1 block">₹2,48,50,000</span>
              <span className="text-[11px] text-neutral-400">88% Line-Items Verified</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Contingency Reserve</span>
              <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">₹14,50,000</span>
              <span className="text-[11px] text-emerald-300">Net Favorable Variance (+₹80k)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Department Line-Item Quotations
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                    <th className="pb-2.5 font-bold">Department</th>
                    <th className="pb-2.5 font-bold">Budget Allocation</th>
                    <th className="pb-2.5 font-bold">Actual Quotation</th>
                    <th className="pb-2.5 font-bold">Variance</th>
                    <th className="pb-2.5 font-bold text-right">Approval</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                  <tr>
                    <td className="py-2.5 font-semibold text-white">Camera & Optics (Arri LF + Cooke)</td>
                    <td className="py-2.5 font-mono">₹28,00,000</td>
                    <td className="py-2.5 font-mono text-emerald-400">₹26,50,000</td>
                    <td className="py-2.5 font-mono text-emerald-400">-₹1,50,000</td>
                    <td className="py-2.5 text-right text-emerald-400 font-bold">Locked</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-white">Soundstage 1 (LED Volume & Wire Rig)</td>
                    <td className="py-2.5 font-mono">₹35,00,000</td>
                    <td className="py-2.5 font-mono text-white">₹35,00,000</td>
                    <td className="py-2.5 font-mono text-neutral-400">₹0</td>
                    <td className="py-2.5 text-right text-emerald-400 font-bold">Locked</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-white">Art Department & Vault Set Build</td>
                    <td className="py-2.5 font-mono">₹24,00,000</td>
                    <td className="py-2.5 font-mono text-amber-400">₹24,80,000</td>
                    <td className="py-2.5 font-mono text-amber-400">+₹80,000</td>
                    <td className="py-2.5 text-right text-amber-400 font-bold">Approved</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-white">Leh High-Altitude Logistics & Fleet</td>
                    <td className="py-2.5 font-mono">₹18,00,000</td>
                    <td className="py-2.5 font-mono text-emerald-400">₹17,20,000</td>
                    <td className="py-2.5 font-mono text-emerald-400">-₹80,000</td>
                    <td className="py-2.5 text-right text-emerald-400 font-bold">Locked</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. Equipment Package View */}
      {activeSubTab === 'equipment' && (
        <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Master Equipment Rental Package & Missing Items Detector
            </h3>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All Core Gear Contracted
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Camera Package</span>
              <p className="text-neutral-300 mt-1">Arri Alexa Mini LF, Alexa 35, Cooke Anamorphic /i Set (32-100mm)</p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">Grip & Motion</span>
              <p className="text-neutral-300 mt-1">30ft Technocrane, Ronin 2 3-axis head, Chapman Minibase, Fisher 10 Dolly</p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-blue-400 block">Lighting Array</span>
              <p className="text-neutral-300 mt-1">Arri SkyPanel S360-C matrix, 24kW HMI Solar Beam, DMX LED Ribbons</p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-indigo-400 block">Sound Package</span>
              <p className="text-neutral-300 mt-1">Sound Devices 888 32-bit float, Schoeps CMC641 mics, DPA 4060 lavs</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
