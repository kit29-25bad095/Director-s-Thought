import React, { useState } from 'react';
import {
  Clapperboard,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle2,
  Play,
  TrendingDown,
  TrendingUp,
  History,
  Sparkles,
} from 'lucide-react';

export const LiveShootingDayView: React.FC = () => {
  const [shotTakes, setShotTakes] = useState([
    { scene: 27, shot: '27A - Medium Two-Shot Kabir & Maya', takes: 4, status: 'Completed', notes: 'Take 3 is the Director circle take.' },
    { scene: 27, shot: '27B - Close-up Maya dialogue', takes: 3, status: 'Completed', notes: 'Good emotional resonance.' },
    { scene: 27, shot: '27C - Over-shoulder Kabir pressure gauge', takes: 2, status: 'In Progress', notes: 'Gimbal lighting adjustment.' },
    { scene: 28, shot: '28A - Wide Airlock corridor confrontation', takes: 0, status: 'Upcoming', notes: 'Requires atmospheric haze.' },
  ]);

  const [recordedDelay, setRecordedDelay] = useState('0 mins');

  return (
    <div id="live-shooting-day-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Clapperboard className="w-4 h-4 text-amber-400" />
            <span>Execution Intelligence • Day 14 of 28</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            LIVE SHOOTING DAY DASHBOARD
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Real-time on-set progress tracker. As takes and delays occur, Director’s Thought feeds actual execution metrics back into the learning loop to recalibrate future day schedules and budget forecasts.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/80 border border-slate-700 rounded-2xl p-4">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Call Time</div>
            <div className="text-xl font-black text-amber-300 mt-0.5">07:00 AM</div>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Current On-Set Status</div>
            <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>On Schedule (+15m)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Location & Call Sheet Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="font-bold text-slate-500 uppercase text-[10px] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Shooting Location</span>
          </div>
          <div className="text-sm font-extrabold text-slate-900">Soundstage 2, Film City Goregaon</div>
          <div className="text-slate-500 text-[11px]">Set: Helios-7 Auxiliary Cryo-Vault</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="font-bold text-slate-500 uppercase text-[10px] flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>Cast on Call Today</span>
          </div>
          <div className="text-sm font-extrabold text-slate-900">Kabir Sen, Maya Rao</div>
          <div className="text-slate-500 text-[11px]">Hair & Makeup ready at 06:30 AM</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="font-bold text-slate-500 uppercase text-[10px] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Target Completion</span>
          </div>
          <div className="text-sm font-extrabold text-slate-900">3.8 Screenplay Pages</div>
          <div className="text-slate-500 text-[11px]">Wrap estimated at 18:30</div>
        </div>
      </div>

      {/* Live Shot List Execution */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Play className="w-4 h-4 text-purple-600" />
            <span>Active Shots & Take Logs (Scene 27 & 28)</span>
          </h2>
          <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            Live Clapper Sync
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {shotTakes.map((shot, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span>{shot.shot}</span>
                  <span
                    className={`text-[9px] px-2 py-0.2 rounded-full font-bold uppercase ${
                      shot.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : shot.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {shot.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 italic">{shot.notes}</div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-slate-700 font-bold bg-slate-100 px-2 py-1 rounded">
                  {shot.takes} Takes
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 41: The Learning Loop (Actual vs Planned) */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
          <History className="w-4 h-4 text-purple-400" />
          <span>The Filmmaking Learning Loop (Actual vs Planned Calibration)</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Director’s Thought compares actual shooting speeds against initial estimates.
          Across the past 13 shooting days, Stage setup times averaged 8% faster than predicted, but cryogenic haze clearing required +12 minutes per setup. This data continuously refines future project estimates.
        </p>
      </div>
    </div>
  );
};
