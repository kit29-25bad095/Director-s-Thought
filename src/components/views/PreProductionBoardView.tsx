import React, { useState } from 'react';
import {
  Sparkles,
  Network,
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  Layers,
  Users,
  MapPin,
  Package,
  Camera,
  Film,
  Sun,
  Volume2,
  Flame,
  Calendar,
  DollarSign,
  CheckSquare,
  MessageSquare,
  ChevronRight,
  Printer,
  Download,
  CheckCircle2,
  X,
  FileText,
  Clock,
  ArrowRight,
  LayoutGrid,
} from 'lucide-react';
import { Project, Role } from '../../types';
import {
  INITIAL_INTELLIGENCE_NODES,
  INITIAL_CHANGE_IMPACT,
  INITIAL_SCRIPT_BREAKDOWNS,
  INITIAL_PREPROD_CHARACTERS,
  INITIAL_PREPROD_LOCATIONS,
  INITIAL_PREPROD_SHOTS,
  INITIAL_PREPROD_STORYBOARDS,
  INITIAL_PREPROD_AUDIT,
  INITIAL_PREPROD_CONTINUITY,
  INITIAL_PREPROD_TASKS,
} from '../../data/preproductionData';

// Studio Shot List & Preproduction View from design
import { PreProductionStudioView } from '../preproduction/PreProductionStudioView';

// Modals
import { ChangeImpactModal } from '../preproduction/ChangeImpactModal';
import { PreProductionAuditModal } from '../preproduction/PreProductionAuditModal';
import { ProductionBibleModal } from '../preproduction/ProductionBibleModal';
import { ProjectIntelligenceGraph } from '../preproduction/ProjectIntelligenceGraph';

// Department Tabs
import { ScreenplayBreakdownTab } from '../preproduction/ScreenplayBreakdownTab';
import { CharactersCastingTab } from '../preproduction/CharactersCastingTab';
import { LocationsScoutTab } from '../preproduction/LocationsScoutTab';
import { ArtPropsCostumeTab } from '../preproduction/ArtPropsCostumeTab';
import { CameraShotListTab } from '../preproduction/CameraShotListTab';
import { StoryboardPrevisTab } from '../preproduction/StoryboardPrevisTab';
import { LightingSoundTab } from '../preproduction/LightingSoundTab';
import { VfxStuntsTab } from '../preproduction/VfxStuntsTab';
import { ScheduleBudgetTab } from '../preproduction/ScheduleBudgetTab';
import { ContinuityRiskTab } from '../preproduction/ContinuityRiskTab';
import { LogisticsTasksTab } from '../preproduction/LogisticsTasksTab';
import { DirectorsThoughtTab } from '../preproduction/DirectorsThoughtTab';

interface PreProductionBoardViewProps {
  project: Project;
  onNavigateTab: (tab: any) => void;
  activeRole: Role;
}

export type PreProdDepartment =
  | 'graph'
  | 'breakdown'
  | 'characters'
  | 'locations'
  | 'art-props'
  | 'camera-shots'
  | 'storyboard'
  | 'lighting-sound'
  | 'vfx-stunts'
  | 'schedule-budget'
  | 'continuity'
  | 'logistics-tasks'
  | 'copilot';

export const PreProductionBoardView: React.FC<PreProductionBoardViewProps> = ({
  project,
  onNavigateTab,
  activeRole,
}) => {
  // View mode: 'studio' matches reference design; 'command-hub' is the graph & bible hub
  const [viewMode, setViewMode] = useState<'studio' | 'command-hub'>('studio');

  // Master State
  const [activeDept, setActiveDept] = useState<PreProdDepartment>('graph');
  const [nodes, setNodes] = useState(INITIAL_INTELLIGENCE_NODES);
  const [changeImpact, setChangeImpact] = useState(INITIAL_CHANGE_IMPACT);
  const [breakdowns, setBreakdowns] = useState(INITIAL_SCRIPT_BREAKDOWNS);
  const [characters, setCharacters] = useState(INITIAL_PREPROD_CHARACTERS);
  const [locations, setLocations] = useState(INITIAL_PREPROD_LOCATIONS);
  const [shots, setShots] = useState(INITIAL_PREPROD_SHOTS);
  const [storyboards, setStoryboards] = useState(INITIAL_PREPROD_STORYBOARDS);
  const [audit, setAudit] = useState(INITIAL_PREPROD_AUDIT);
  const [continuityAlerts, setContinuityAlerts] = useState(INITIAL_PREPROD_CONTINUITY);
  const [tasks, setTasks] = useState(INITIAL_PREPROD_TASKS);

  // Modals visibility
  const [isImpactModalOpen, setIsImpactModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isBibleModalOpen, setIsBibleModalOpen] = useState(false);

  // If studio mode is selected, render the clean Director's Thought studio design
  if (viewMode === 'studio') {
    return (
      <div className="relative w-full h-full">
        {/* Floating switcher button to access graph & audit */}
        <div className="absolute top-3.5 right-64 z-40 hidden xl:flex items-center gap-2">
          <button
            onClick={() => setViewMode('command-hub')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Switch to Intelligence Graph & Production Bible"
          >
            <Network className="w-3.5 h-3.5 text-amber-400" />
            <span>Intelligence Graph & Bible</span>
          </button>
        </div>

        <PreProductionStudioView
          onNavigateTab={onNavigateTab}
          onSelectTopTab={(tab) => {
            if (tab === 'script') onNavigateTab('screenplay');
            else if (tab === 'production') onNavigateTab('production-work');
            else if (tab === 'post-production') onNavigateTab('post-production');
            else if (tab === 'pre-production') setViewMode('studio');
          }}
          activeTopTab="pre-production"
        />
      </div>
    );
  }

  // Ask AI in Co-pilot trigger
  const handleAskAi = (prompt: string) => {
    setActiveDept('copilot');
  };

  // Change Impact Simulation
  const handleSimulateChange = (nodeId: string) => {
    const targetNode = nodes.find((n) => n.id === nodeId);
    const nodeName = targetNode ? targetNode.label : 'Selected Item';

    setChangeImpact({
      id: `ci_${Date.now()}`,
      title: `${nodeName} Change Impact Simulation`,
      triggerEvent: `${nodeName} schedule / specification adjusted by ${activeRole}`,
      severity: 'HIGH',
      timestamp: 'Just now (AI Detected)',
      affectedAreas: {
        locationSchedule: 'Shooting block restructured. 2 exterior scenes consolidated to minimize location rentals.',
        transport: 'Fleet dispatch adjusted. Dedicated equipment truck routed to site 24 hrs in advance.',
        callSheet: 'Call sheet schedule recalculates call time to 06:00 AM for sunrise lighting setup.',
        lightingPlan: 'Lighting ratio modified to accommodate variable exterior daylight.',
        cameraPlan: 'DP Elena Rostova assigned high-speed 96fps profile and handheld rig.',
        budget: 'Estimated net budget impact: ₹75,000 reallocation from stage rentals to location permits.',
        castDood: 'Day Out of Days consolidated; 1 holding day eliminated for Kabir Sen.',
      },
      aiRecommendation: 'Recommended. Consolidating this block reduces idle holding days and optimizes rental fleet utilization.',
      status: 'PROPOSED',
    });
    setIsImpactModalOpen(true);
  };

  const handleAcceptChange = () => {
    setChangeImpact((prev) => ({ ...prev, status: 'ACCEPTED' }));
    setIsImpactModalOpen(false);
    alert('Change approved! Intelligence layer has cascaded updates across Schedule, Transport, Call Sheets, and Budget.');
  };

  const handleRejectChange = () => {
    setChangeImpact((prev) => ({ ...prev, status: 'REJECTED' }));
    setIsImpactModalOpen(false);
  };

  // Department navigation items with icons
  const departments = [
    { id: 'graph', label: 'Intelligence Graph', icon: Network, badge: 'Live' },
    { id: 'breakdown', label: 'Script Breakdown', icon: Layers, badge: `${breakdowns.length} Sc` },
    { id: 'characters', label: 'Cast & Characters', icon: Users },
    { id: 'locations', label: 'Locations & Scouts', icon: MapPin },
    { id: 'art-props', label: 'Props & Costumes', icon: Package },
    { id: 'camera-shots', label: 'Camera & Shots', icon: Camera, badge: `${shots.length}` },
    { id: 'storyboard', label: 'Storyboard & Previs', icon: Film },
    { id: 'lighting-sound', label: 'Lighting & Sound', icon: Sun },
    { id: 'vfx-stunts', label: 'VFX & Stunts', icon: Flame },
    { id: 'schedule-budget', label: 'Schedule & Budget', icon: Calendar },
    { id: 'continuity', label: 'Continuity & Risks', icon: AlertTriangle, badge: `${continuityAlerts.filter(a => a.status === 'ACTIVE').length}` },
    { id: 'logistics-tasks', label: 'Logistics & Tasks', icon: CheckSquare, badge: `${tasks.filter(t => !t.completed).length}` },
    { id: 'copilot', label: "Director's Co-Pilot", icon: MessageSquare, highlight: true },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0a0b0e] text-neutral-100 overflow-hidden font-sans">
      {/* 1. TOP PRODUCTION INTELLIGENCE COMMAND BAR */}
      <header className="p-4 sm:p-5 border-b border-neutral-800/90 bg-[#101217]/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[linear-gradient(135deg,#fbbf24_0%,#b45309_100%)] flex items-center justify-center text-neutral-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold tracking-wider text-amber-400 uppercase">
                Pre-Production Intelligence Hub
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-mono">Synced Across 15 Departments</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {project.name} • Master Pre-Production
            </h1>
          </div>
        </div>

        {/* 3 Core Global Action Triggers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Change Impact Analysis Trigger */}
          <button
            onClick={() => setIsImpactModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Change Impact Engine</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/30 text-[10px] text-amber-200">
              1 Active
            </span>
          </button>

          {/* Pre-Production Audit / Shoot-Readiness Trigger */}
          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Shoot Readiness</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-[10px] text-emerald-200 font-mono font-bold">
              {audit.overallReadiness}%
            </span>
          </button>

          {/* Complete Production Bible Trigger */}
          <button
            onClick={() => setIsBibleModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Production Bible</span>
          </button>

          {/* Switch to Studio Shot List View */}
          <button
            onClick={() => setViewMode('studio')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs shadow-blue-500/20"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Shot List Studio</span>
          </button>
        </div>
      </header>

      {/* 2. SECONDARY SCROLLABLE DEPARTMENT NAVIGATION BAR */}
      <nav className="px-4 sm:px-6 py-2.5 bg-neutral-950/90 border-b border-neutral-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 text-xs">
        {departments.map((dept) => {
          const Icon = dept.icon;
          const isActive = activeDept === dept.id;

          return (
            <button
              key={dept.id}
              onClick={() => setActiveDept(dept.id as PreProdDepartment)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-bold'
                  : dept.highlight
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/25'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{dept.label}</span>
              {dept.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-black/30 text-neutral-950' : 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {dept.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. DYNAMIC MAIN WORKSPACE BODY */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-neutral-800">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* TAB 1: Project Intelligence Graph */}
          {activeDept === 'graph' && (
            <ProjectIntelligenceGraph
              nodes={nodes}
              onSimulateChange={handleSimulateChange}
              onSelectNode={(nodeId) => {
                if (nodeId.startsWith('node_sc_')) setActiveDept('breakdown');
                if (nodeId.startsWith('node_char_')) setActiveDept('characters');
                if (nodeId.startsWith('node_loc_')) setActiveDept('locations');
                if (nodeId.startsWith('node_prop_') || nodeId.startsWith('node_cost_')) setActiveDept('art-props');
                if (nodeId.startsWith('node_cam_') || nodeId.startsWith('node_shot_')) setActiveDept('camera-shots');
                if (nodeId.startsWith('node_sb_')) setActiveDept('storyboard');
                if (nodeId.startsWith('node_sched_') || nodeId.startsWith('node_budg_')) setActiveDept('schedule-budget');
              }}
            />
          )}

          {/* TAB 2: Script Breakdown */}
          {activeDept === 'breakdown' && (
            <ScreenplayBreakdownTab
              breakdowns={breakdowns}
              onUpdateBreakdown={setBreakdowns}
              onAskAi={handleAskAi}
            />
          )}

          {/* TAB 3: Characters & Casting */}
          {activeDept === 'characters' && (
            <CharactersCastingTab characters={characters} onAskAi={handleAskAi} />
          )}

          {/* TAB 4: Locations & Scouts */}
          {activeDept === 'locations' && (
            <LocationsScoutTab locations={locations} onAskAi={handleAskAi} />
          )}

          {/* TAB 5: Art, Props & Costumes */}
          {activeDept === 'art-props' && <ArtPropsCostumeTab onAskAi={handleAskAi} />}

          {/* TAB 6: Camera & Shots */}
          {activeDept === 'camera-shots' && (
            <CameraShotListTab
              shots={shots}
              onUpdateShots={setShots}
              onAskAi={handleAskAi}
            />
          )}

          {/* TAB 7: Storyboard & Previs */}
          {activeDept === 'storyboard' && (
            <StoryboardPrevisTab storyboards={storyboards} onAskAi={handleAskAi} />
          )}

          {/* TAB 8: Lighting & Sound */}
          {activeDept === 'lighting-sound' && <LightingSoundTab onAskAi={handleAskAi} />}

          {/* TAB 9: VFX & Stunts */}
          {activeDept === 'vfx-stunts' && <VfxStuntsTab onAskAi={handleAskAi} />}

          {/* TAB 10: Schedule & Budget */}
          {activeDept === 'schedule-budget' && <ScheduleBudgetTab onAskAi={handleAskAi} />}

          {/* TAB 11: Continuity & Risks */}
          {activeDept === 'continuity' && (
            <ContinuityRiskTab
              alerts={continuityAlerts}
              onUpdateAlerts={setContinuityAlerts}
              onAskAi={handleAskAi}
            />
          )}

          {/* TAB 12: Logistics & Tasks */}
          {activeDept === 'logistics-tasks' && (
            <LogisticsTasksTab
              tasks={tasks}
              onUpdateTasks={setTasks}
              onAskAi={handleAskAi}
            />
          )}

          {/* TAB 13: Director's Co-Pilot (Multilingual NLP) */}
          {activeDept === 'copilot' && (
            <DirectorsThoughtTab
              project={project}
              onSelectDepartmentTab={(tab) => setActiveDept(tab as PreProdDepartment)}
            />
          )}
        </div>
      </main>

      {/* 4. MODALS */}
      <ChangeImpactModal
        impact={changeImpact}
        isOpen={isImpactModalOpen}
        onClose={() => setIsImpactModalOpen(false)}
        onAccept={handleAcceptChange}
        onReject={handleRejectChange}
        onAskAi={handleAskAi}
      />

      <PreProductionAuditModal
        audit={audit}
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        projectName={project.name}
      />

      <ProductionBibleModal
        project={project}
        isOpen={isBibleModalOpen}
        onClose={() => setIsBibleModalOpen(false)}
      />
    </div>
  );
};
