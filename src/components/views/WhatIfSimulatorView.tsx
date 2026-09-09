import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  Send,
  AlertTriangle,
  Layers,
  Film,
  Calendar,
  DollarSign,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Vote,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import { WhatIfSimulation, Project, Role } from '../../types';
import { simulateWhatIf } from '../../services/geminiService';

interface WhatIfSimulatorViewProps {
  project: Project;
  simulations: WhatIfSimulation[];
  onAddSimulation: (sim: WhatIfSimulation) => void;
  onSendToDecisionBoard: (sim: WhatIfSimulation) => void;
  activeRole: Role;
}

export const WhatIfSimulatorView: React.FC<WhatIfSimulatorViewProps> = ({
  project,
  simulations,
  onAddSimulation,
  onSendToDecisionBoard,
  activeRole,
}) => {
  const [activeSimIndex, setActiveSimIndex] = useState(0);
  const [queryInput, setQueryInput] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const activeSim: WhatIfSimulation = simulations[activeSimIndex] || simulations[0];

  const presets = [
    'What if I remove Scene 27?',
    'What if the hospital becomes a house in the flashback?',
    'What if Kabir dies in Scene 42 during the spacewalk?',
    'What if we combine Scene 14 and Scene 15 into one location?',
    'What if we replace the Leh exterior with virtual LED volume?',
  ];

  const handleRunSimulation = async (customQuery?: string) => {
    const query = customQuery || queryInput;
    if (!query.trim() || isSimulating) return;

    setIsSimulating(true);

    try {
      const result = await simulateWhatIf(query, project);
      if (result) {
        const newSim: WhatIfSimulation = {
          id: `sim_${Date.now()}`,
          query: result.query || query,
          timestamp: new Date().toISOString(),
          before: result.before || {
            scenesCount: 46,
            budget: '₹2.45 Cr',
            durationDays: 28,
            riskScore: 72,
          },
          after: result.after || {
            scenesCount: 45,
            budget: '₹2.31 Cr',
            durationDays: 27.2,
            riskScore: 61,
          },
          impact: result.impact || {
            story: { summary: 'Impact evaluated.', score: 7, details: ['Story continuity requires review.'] },
            structure: { summary: 'Midpoint affected.', beatsAffected: ['Midpoint'] },
            roadmap: { summary: 'Roadmap aligned.', itemsAffected: ['RM-27'] },
            screenplay: { summary: 'Minor dialogue rewrites.', scenesToRewrite: [28] },
            production: { summary: 'Saves stage turnaround time.', cast: 'No change', location: 'Shared set', equipment: 'Less lighting', vfx: 'None' },
            budget: { diff: '-₹14L', details: 'Set build reduction' },
            schedule: { diff: '-0.8 days', details: 'Consolidated schedule' },
            risk: { diff: '72% -> 61%', details: 'Reduced risk' },
          },
          recommendation: result.recommendation || 'Consider creative balance before committing.',
          votes: [
            { role: 'Director', voterName: 'Aarav Mehta', vote: 'MODIFY', comment: 'Let us test in the team board.' },
          ],
          status: 'PROPOSED',
        };

        onAddSimulation(newSim);
        setActiveSimIndex(0);
        setQueryInput('');
      }
    } catch (e) {
      console.error('What-if error:', e);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div id="what-if-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Signature Feature Banner */}
      <div className="p-6 rounded-2xl bg-linear-to-r from-amber-500/10 via-purple-600/10 to-indigo-600/10 border border-amber-400/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Signature Decision Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            WHAT-IF SIMULATOR
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Ask any creative question in natural language. Director’s Thought instantly calculates the downstream consequences across 8 dimensions: Story, Structure, Roadmap, Screenplay, Production, Budget, Schedule, and Risk.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">History:</span>
          <select
            value={activeSimIndex}
            onChange={(e) => setActiveSimIndex(Number(e.target.value))}
            className="text-xs font-bold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 shadow-xs focus:outline-hidden cursor-pointer"
          >
            {simulations.map((s, idx) => (
              <option key={s.id} value={idx}>
                {s.query}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Query Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunSimulation();
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <HelpCircle className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
            <input
              id="whatif-query-input"
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="e.g. What if I remove Scene 27? / What if the hospital becomes a house?"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-purple-500 transition shadow-inner"
            />
          </div>
          <button
            type="submit"
            disabled={!queryInput.trim() || isSimulating}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating Consequences...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Simulate Consequences</span>
              </>
            )}
          </button>
        </form>

        {/* Presets Chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px]">
          <span className="text-slate-400 font-semibold uppercase text-[10px] mr-1">
            Try Presets:
          </span>
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setQueryInput(p);
                handleRunSimulation(p);
              }}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-900 font-medium transition cursor-pointer border border-slate-200/80"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE SIMULATION RESULT DISPLAY */}
      {activeSim && (
        <div className="space-y-6">
          {/* Section 52: Comparison Card (BEFORE vs AFTER) */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  Active Simulation
                </span>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>“{activeSim.query}”</span>
                </h2>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Simulated on {new Date(activeSim.timestamp).toLocaleDateString()}
              </div>
            </div>

            {/* Before vs After Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              {/* VS Pill Badge */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 text-white text-[11px] font-black items-center justify-center shadow-lg z-10 border-2 border-white">
                VS
              </div>

              {/* BEFORE CARD */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    CURRENT BASELINE (BEFORE)
                  </span>
                  <span className="text-xs font-bold text-slate-700">Locked Plan</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <div className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                      <Film className="w-3.5 h-3.5 text-slate-400" />
                      <span>Scene Count</span>
                    </div>
                    <div className="text-base font-extrabold text-slate-900 mt-1">
                      {activeSim.before.scenesCount} Scenes
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <div className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                      <span>Production Budget</span>
                    </div>
                    <div className="text-base font-extrabold text-slate-900 mt-1">
                      {activeSim.before.budget}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <div className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Shoot Duration</span>
                    </div>
                    <div className="text-base font-extrabold text-slate-900 mt-1">
                      {activeSim.before.durationDays} Days
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <div className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                      <span>Production Risk</span>
                    </div>
                    <div className="text-base font-extrabold text-amber-700 mt-1">
                      {activeSim.before.riskScore}%
                    </div>
                  </div>
                </div>
              </div>

              {/* AFTER CARD */}
              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                    SIMULATED OUTCOME (AFTER)
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {activeSim.impact.budget.diff}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-purple-100">
                    <div className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                      <Film className="w-3.5 h-3.5 text-purple-500" />
                      <span>New Scene Count</span>
                    </div>
                    <div className="text-base font-extrabold text-purple-950 mt-1">
                      {activeSim.after.scenesCount} Scenes
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-purple-100">
                    <div className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Adjusted Budget</span>
                    </div>
                    <div className="text-base font-extrabold text-emerald-700 mt-1">
                      {activeSim.after.budget}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-purple-100">
                    <div className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>Adjusted Days</span>
                    </div>
                    <div className="text-base font-extrabold text-blue-800 mt-1">
                      {activeSim.after.durationDays} Days
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-purple-100">
                    <div className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                      <span>New Risk Score</span>
                    </div>
                    <div className="text-base font-extrabold text-emerald-700 mt-1">
                      {activeSim.after.riskScore}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 8-Dimensional Impact Analysis Breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Consequence Impact Breakdown (8 Dimensions)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* 1. Story Impact */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                    <span>Story Impact</span>
                  </span>
                  <span className="font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px]">
                    {activeSim.impact.story.score}/10
                  </span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {activeSim.impact.story.summary}
                </p>
                <ul className="list-disc list-inside text-slate-500 space-y-1 text-[11px] pt-1">
                  {activeSim.impact.story.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              {/* 2. Structure Impact */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Structure Impact</span>
                  </span>
                  <span className="font-bold text-indigo-700 text-[10px]">Beats</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {activeSim.impact.structure.summary}
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  {activeSim.impact.structure.beatsAffected.map((b, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-semibold text-[10px] border border-indigo-200"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Roadmap Impact */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>Roadmap Impact</span>
                  </span>
                  <span className="font-bold text-blue-700 text-[10px]">Objectives</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {activeSim.impact.roadmap.summary}
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  {activeSim.impact.roadmap.itemsAffected.map((item, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold text-[10px] border border-blue-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Screenplay Impact */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Screenplay Impact</span>
                  </span>
                  <span className="font-bold text-emerald-700 text-[10px]">Rewrites</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {activeSim.impact.screenplay.summary}
                </p>
                <div className="pt-1 text-[11px] text-slate-500">
                  Scenes requiring rewrite:{' '}
                  <span className="font-bold text-slate-800">
                    {activeSim.impact.screenplay.scenesToRewrite.join(', ')}
                  </span>
                </div>
              </div>

              {/* 5. Production Impact */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-amber-600" />
                    <span>Production Impact</span>
                  </span>
                  <span className="font-bold text-amber-700 text-[10px]">On-Set</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {activeSim.impact.production.summary}
                </p>
                <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                  <div>Cast: {activeSim.impact.production.cast}</div>
                  <div>Location: {activeSim.impact.production.location}</div>
                  <div>Equipment: {activeSim.impact.production.equipment}</div>
                </div>
              </div>

              {/* 6. Budget Impact */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Budget Impact</span>
                  </span>
                  <span className="font-bold text-emerald-800 text-xs">
                    {activeSim.impact.budget.diff}
                  </span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {activeSim.impact.budget.details}
                </p>
              </div>

              {/* 7. Schedule Impact */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Schedule Impact</span>
                  </span>
                  <span className="font-bold text-blue-800 text-xs">
                    {activeSim.impact.schedule.diff}
                  </span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {activeSim.impact.schedule.details}
                </p>
              </div>

              {/* 8. Risk Impact */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span>Risk Impact</span>
                  </span>
                  <span className="font-bold text-amber-800 text-xs">
                    {activeSim.impact.risk.diff}
                  </span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {activeSim.impact.risk.details}
                </p>
              </div>
            </div>
          </div>

          {/* AI Recommendation & Action Buttons */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Director's Thought Neutral Recommendation:</span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              “{activeSim.recommendation}”
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <div className="text-xs text-slate-400 font-medium">
                AI does NOT make the final decision. The filmmaker and team decide.
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  id="btn-send-to-decision-board"
                  onClick={() => onSendToDecisionBoard(activeSim)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <Vote className="w-4 h-4 text-slate-950" />
                  <span>Send to Creative Decision Board (Team Vote)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
