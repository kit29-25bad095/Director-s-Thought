import React, { useState } from 'react';
import {
  Calendar,
  Layers,
  Clock,
  MapPin,
  Users,
  MoveVertical,
  CheckCircle2,
  AlertTriangle,
  Film,
} from 'lucide-react';
import { StripboardItem } from '../../types';

interface SchedulingStripboardViewProps {
  strips: StripboardItem[];
}

export const SchedulingStripboardView: React.FC<SchedulingStripboardViewProps> = ({
  strips,
}) => {
  const [activeDayFilter, setActiveDayFilter] = useState<number | 'ALL'>('ALL');

  const days = (Array.from(new Set(strips.map((s) => Number(s.dayNumber)))) as number[]).sort(
    (a, b) => a - b
  );

  const filteredStrips =
    activeDayFilter === 'ALL'
      ? strips
      : strips.filter((s) => s.dayNumber === activeDayFilter);

  // Group by dayNumber
  const groupedByDay: Record<number, StripboardItem[]> = {};
  filteredStrips.forEach((strip) => {
    if (!groupedByDay[strip.dayNumber]) groupedByDay[strip.dayNumber] = [];
    groupedByDay[strip.dayNumber].push(strip);
  });

  return (
    <div id="scheduling-stripboard-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>Production Scheduling</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            DIGITAL STRIPBOARD & CALL PLANNING
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Color-coded stripboard optimized for company moves, cast availability windows, and golden-hour lighting schedules.
          </p>
        </div>

        {/* Day Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveDayFilter('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeDayFilter === 'ALL'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Days
          </button>
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDayFilter(d)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeDayFilter === d
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Day {d}
            </button>
          ))}
        </div>
      </div>

      {/* Stripboard Days Stream */}
      <div className="space-y-6">
        {Object.entries(groupedByDay).map(([dayNum, dayStrips]) => {
          const totalPages = dayStrips.reduce((acc, s) => acc + s.pages, 0);

          return (
            <div key={dayNum} className="space-y-2">
              {/* Day Break Banner (Industry Standard) */}
              <div className="p-3 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2 shadow-sm">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-extrabold text-amber-400 uppercase tracking-wider">
                    DAY {dayNum} OF 28
                  </span>
                  <span>•</span>
                  <span className="text-slate-300 font-medium">
                    Shoot Date: Day {dayNum} Production Lock
                  </span>
                  <span>•</span>
                  <span className="text-purple-300 font-semibold">{dayStrips.length} Scenes</span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Film className="w-3.5 h-3.5 text-slate-400" />
                    <span>{totalPages.toFixed(1)} Pages</span>
                  </div>
                </div>
              </div>

              {/* Strips under this day */}
              <div className="space-y-1.5">
                {dayStrips.map((strip) => {
                  const isDay = strip.dayNight === 'DAY';
                  const isInt = strip.intExt === 'INT';
                  let stripColorClass = 'bg-white border-slate-200 text-slate-900';
                  if (isInt && isDay) stripColorClass = 'bg-amber-50/70 border-amber-200 text-slate-900';
                  else if (isInt && !isDay) stripColorClass = 'bg-blue-50/70 border-blue-200 text-slate-900';
                  else if (!isInt && isDay) stripColorClass = 'bg-emerald-50/70 border-emerald-200 text-slate-900';
                  else if (!isInt && !isDay) stripColorClass = 'bg-purple-50/70 border-purple-200 text-slate-900';

                  return (
                    <div
                      key={strip.id}
                      className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition shadow-2xs hover:shadow-sm ${stripColorClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="font-mono font-extrabold w-12 text-purple-800">
                          SC {strip.sceneNumber}
                        </div>

                        <div>
                          <div className="font-bold flex items-center gap-2">
                            <span>{strip.heading}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            Location: {strip.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-[11px] shrink-0">
                        <div className="flex items-center gap-1 text-slate-600">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-semibold">{strip.castCount} Cast Members</span>
                        </div>

                        <div className="font-mono text-slate-500 w-14 text-right">
                          {strip.pages} pgs
                        </div>

                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            strip.status === 'SHOT'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {strip.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
