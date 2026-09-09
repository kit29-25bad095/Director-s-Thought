import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  DollarSign,
  Calendar,
  AlertTriangle,
  Clapperboard,
  HelpCircle,
  Layers,
  Vote,
  Users,
  Film,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Project, TeamMember, CreativeDecision } from '../../types';
import { NavTab } from '../navigation/Sidebar';

interface CommandCenterViewProps {
  project: Project;
  team: TeamMember[];
  decisions: CreativeDecision[];
  onNavigate: (tab: NavTab) => void;
  onOpenWhatIf: () => void;
  readinessScore: number;
  healthScore: number;
}

export const CommandCenterView: React.FC<CommandCenterViewProps> = ({
  project,
  team,
  decisions,
  onNavigate,
  onOpenWhatIf,
  readinessScore,
  healthScore,
}) => {
  const workflowSteps = [
    { name: 'Idea', tab: 'idea-lab' as NavTab, status: 'completed' },
    { name: 'Story', tab: 'story-lab' as NavTab, status: 'completed' },
    { name: 'Characters', tab: 'character-intel' as NavTab, status: 'completed' },
    { name: 'Structure', tab: 'story-structure' as NavTab, status: 'completed' },
    { name: 'Roadmap', tab: 'story-roadmap' as NavTab, status: 'current' },
    { name: 'Screenplay', tab: 'screenplay-studio' as NavTab, status: 'current' },
    { name: 'Production', tab: 'production-readiness' as NavTab, status: 'upcoming' },
  ];

  return (
    <div id="command-center-view" className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Cinematic Project Hero Header */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage: `url(${project.coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80'})`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-transparent" />

        <div className="relative p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-purple-400 uppercase tracking-wider">
                <Film className="w-4 h-4" />
                <span>{project.productionType}</span>
                <span>•</span>
                <span>{project.genre}</span>
                <span>•</span>
                <span className="text-emerald-400">{project.status}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
                {project.name}
              </h1>
              <p className="text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
                {project.logline}
              </p>
            </div>

            {/* Quick Action Pill */}
            <div className="flex flex-wrap gap-2.5">
              <button
                id="cmd-hero-whatif"
                onClick={onOpenWhatIf}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition active:scale-95 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-slate-950" />
                <span>Simulate Creative Decision</span>
              </button>

              <button
                id="cmd-hero-screenplay"
                onClick={() => onNavigate('screenplay-studio')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg transition active:scale-95 cursor-pointer"
              >
                <Clapperboard className="w-4 h-4" />
                <span>Open Screenplay</span>
              </button>
            </div>
          </div>

          {/* Core Decision Intelligence Meta Bar */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="text-slate-400 text-[11px]">Current Draft</div>
              <div className="font-bold text-white text-sm">{project.currentDraft}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Runtime Target</div>
              <div className="font-bold text-white text-sm">{project.targetRuntime}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Estimated Budget</div>
              <div className="font-bold text-purple-300 text-sm">{project.estimatedBudget}</div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Shooting Schedule</div>
              <div className="font-bold text-emerald-400 text-sm">28 Days (Day 14 Next)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Lifecycle Workflow Breadcrumb (Idea -> Story -> Structure -> Roadmap -> Screenplay -> Production) */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span>Intelligence Pipeline</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold lowercase">
              active sync
            </span>
          </div>
          <span className="text-xs text-slate-600 font-medium">Draft 04 in Pre-Production</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
          {workflowSteps.map((step, index) => {
            const isDone = step.status === 'completed';
            const isCurrent = step.status === 'current';
            return (
              <button
                key={step.name}
                id={`btn-wf-${step.name.toLowerCase()}`}
                onClick={() => onNavigate(step.tab)}
                className={`p-2.5 rounded-lg border text-left transition flex flex-col justify-between cursor-pointer ${
                  isCurrent
                    ? 'bg-purple-50/80 border-purple-300 text-purple-950 shadow-xs'
                    : isDone
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-600 font-semibold">
                  <span>0{index + 1}</span>
                  {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />}
                </div>
                <div className="font-bold text-xs mt-1 text-slate-900">{step.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Creative Progress, Production Progress, Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Creative Progress */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-600" />
                <span>Creative Progress</span>
              </h2>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                Health: {healthScore}%
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Structure & Beat Balance</span>
                  <span className="font-bold text-slate-900">91%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '91%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Character Arcs (Kabir & Maya)</span>
                  <span className="font-bold text-slate-900">88%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Roadmap Alignment</span>
                  <span className="font-bold text-slate-900">90%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Conflict & Dramatic Pacing</span>
                  <span className="font-bold text-slate-900">94%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600">46 Scenes • 114 Pages</span>
              <button
                onClick={() => onNavigate('screenplay-health')}
                className="font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Full Diagnostics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Decision Recommendation Alert */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>AI Filmmaking Insight</span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              “Scene 27 carries 64% of the narrative emotional tension. Removing it would save ₹14L but break Maya’s character arc. We recommend keeping the dialogue while simplifying physical stage builds.”
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => onNavigate('decision-board')}
                className="text-[11px] font-bold text-amber-900 underline hover:text-amber-950 cursor-pointer"
              >
                Review Creative Decision Board
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Production Progress */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Production Progress</span>
              </h2>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Readiness: {readinessScore}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <div className="text-slate-600 font-medium">Budget Committed</div>
                <div className="text-sm font-extrabold text-slate-900 mt-0.5">₹2.45 Cr</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-1">₹8.5L buffer</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <div className="text-slate-600 font-medium">Shooting Schedule</div>
                <div className="text-sm font-extrabold text-slate-900 mt-0.5">28 Days</div>
                <div className="text-[10px] text-slate-700 font-semibold mt-1">Day 14 (Next)</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <div className="text-slate-600 font-medium">Breakdown Status</div>
                <div className="text-sm font-extrabold text-slate-900 mt-0.5">46/46 Scenes</div>
                <div className="text-[10px] text-blue-700 font-semibold mt-1">100% Tagged</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                <div className="text-slate-600 font-medium">Cast Availability</div>
                <div className="text-sm font-extrabold text-slate-900 mt-0.5">100% Locked</div>
                <div className="text-[10px] text-purple-700 font-semibold mt-1">DOOD Balanced</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 font-medium space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold">Next Production Milestone:</span>
                <span className="text-[11px] text-emerald-800">Day 14 Shoot</span>
              </div>
              <p className="text-[11px] text-emerald-900 leading-tight">
                Scene 27 & 28 (Auxiliary Vault confrontation). Soundstage 2, Film City Goregaon. Call time 07:00 AM.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => onNavigate('call-sheets')}
                className="font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <span>View Call Sheet</span>
              </button>
              <button
                onClick={() => onNavigate('production-readiness')}
                className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Readiness Audit</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Column 3: Intelligence & Decision Board */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Vote className="w-4 h-4 text-purple-600" />
                <span>Pending Team Decisions</span>
              </h2>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                {decisions.filter((d) => d.status === 'PENDING').length} Active
              </span>
            </div>

            <div className="space-y-2.5">
              {decisions.slice(0, 2).map((dec) => (
                <div
                  key={dec.id}
                  className="p-3 rounded-lg border border-slate-200 hover:border-purple-300 transition bg-slate-50/60"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900 truncate max-w-45">
                      {dec.title}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        dec.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {dec.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{dec.description}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200/60">
                    <span className="text-slate-600">Impact: {dec.impacts.cost}</span>
                    <button
                      onClick={() => onNavigate('decision-board')}
                      className="font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
                    >
                      Vote / Review
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => onNavigate('risk-radar')}
                className="text-amber-800 font-semibold flex items-center gap-1 hover:text-amber-950 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Risk Radar (4 Critical/High)</span>
              </button>
              <button
                onClick={() => onNavigate('ml-predictions')}
                className="font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
              >
                <span>ML Predictor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launchpad Buttons */}
      <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Fast Intelligence Workspaces</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Instantly navigate to core filmmaking modules or run real-time consequence analysis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('what-if')}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
          >
            What-If Simulator
          </button>
          <button
            onClick={() => onNavigate('story-roadmap')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer"
          >
            Story Roadmap
          </button>
          <button
            onClick={() => onNavigate('story-structure')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer"
          >
            Structure Studio
          </button>
          <button
            onClick={() => onNavigate('scene-breakdown')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer"
          >
            Scene Breakdown
          </button>
          <button
            onClick={() => onNavigate('stripboard')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer"
          >
            Stripboard
          </button>
        </div>
      </div>
    </div>
  );
};
