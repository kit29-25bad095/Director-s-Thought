import React from 'react';
import {
  ShieldAlert,
  Flame,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
  Sparkles,
  FileCheck,
} from 'lucide-react';

interface VfxStuntsTabProps {
  onAskAi: (prompt: string) => void;
}

export const VfxStuntsTab: React.FC<VfxStuntsTabProps> = ({ onAskAi }) => {
  return (
    <div className="space-y-5 text-neutral-100">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#12141a] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              VFX, Special Effects & Stunt Safety Rigging
            </h2>
            <p className="text-xs text-neutral-400">
              Shot-by-shot VFX tracking, pyrotechnics permits, high-wire arrest safety checklists & on-set medical standby
            </p>
          </div>
        </div>

        <button
          onClick={() => onAskAi('Audit stunt wire rig safety protocols and emergency medical evacuation plans for Stage 1.')}
          className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Audit Stunt Safety</span>
        </button>
      </div>

      {/* VFX Shots Master Table */}
      <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
          Visual Effects (VFX) & Practical SFX Breakdown
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                <th className="pb-2.5 font-bold">Scene</th>
                <th className="pb-2.5 font-bold">Type</th>
                <th className="pb-2.5 font-bold">Element Description</th>
                <th className="pb-2.5 font-bold">Complexity</th>
                <th className="pb-2.5 font-bold">Vendor / Department</th>
                <th className="pb-2.5 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              <tr>
                <td className="py-2.5 font-mono text-amber-400 font-bold">Scene 1</td>
                <td className="py-2.5 text-blue-400 font-semibold">Photoreal VFX</td>
                <td className="py-2.5">Orbital Earth perspective, high-res atmospheric cloud vortices, zero-g ice crystals</td>
                <td className="py-2.5 font-mono text-rose-400">High (Hero)</td>
                <td className="py-2.5">Viraj VFX Studio</td>
                <td className="py-2.5 text-right text-emerald-400 font-semibold">Pre-Approved</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-amber-400 font-bold">Scene 27</td>
                <td className="py-2.5 text-purple-400 font-semibold">Motion Graphics</td>
                <td className="py-2.5">Corrupted forensic wave telemetry log on datapad display + breath frost condensation</td>
                <td className="py-2.5 font-mono text-blue-400">Medium</td>
                <td className="py-2.5">Art & VFX In-House</td>
                <td className="py-2.5 text-right text-emerald-400 font-semibold">Asset Locked</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-amber-400 font-bold">Scene 42</td>
                <td className="py-2.5 text-rose-400 font-semibold">Practical SFX + Pyros</td>
                <td className="py-2.5">Sheared hydraulic cable spark squibs and pressurized cold CO2 venting</td>
                <td className="py-2.5 font-mono text-rose-400">High</td>
                <td className="py-2.5">Action SFX Mumbai</td>
                <td className="py-2.5 text-right text-amber-400 font-semibold">Permit Approved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Stunt Planner with Safety Checklist & Medical Standby */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <h4 className="text-xs font-bold text-rose-400 uppercase flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Stunt Safety Protocols & Rigging Checks</span>
            </h4>
            <span className="text-[10px] text-neutral-400 font-mono">Guild Certified</span>
          </div>

          <div className="space-y-2 text-xs text-neutral-300">
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Dual-Wire Deceleration Harness: </strong>
                10kN tested load lines inspected by Coordinator Rajesh Nair.
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Crash Mat Floor Dispersal: </strong>
                4-inch high-density foam mats positioned under all wire paths outside LED camera frustum.
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Actor Rehearsal Window: </strong>
                Kabir stunt double dry-run scheduled 48 hours prior to principal photography.
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4" />
              <span>Medical & Emergency Readiness</span>
            </h4>
            <span className="text-[10px] text-emerald-400 font-mono">100% Compliant</span>
          </div>

          <div className="space-y-2 text-xs text-neutral-300">
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-400 block text-[10px] uppercase font-bold">On-Set Paramedic</span>
              Dr. Amitav Sen & 2 EMTs on permanent soundstage standby with AED defibrillator.
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-400 block text-[10px] uppercase font-bold">Designated Trauma Center</span>
              Kokilaben Dhirubhai Ambani Hospital, Andheri West (8.4 km / 14-min emergency transit route mapped).
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
              <span className="text-neutral-400 block text-[10px] uppercase font-bold">High Altitude Leh Plan</span>
              Oxygen concentrators and portable hyperbaric chambers pre-booked in Leh for cold exterior block.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
