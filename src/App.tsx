import React, { useState } from 'react';
import { Sidebar, NavTab } from './components/navigation/Sidebar';
import { Header } from './components/navigation/Header';
import { CinematicNavbar, CinematicTab } from './components/navigation/CinematicNavbar';
import { IdeaLandingView } from './components/views/IdeaLandingView';
import { StoryPageView } from './components/views/StoryPageView';
import { ProjectsHomeView } from './components/views/ProjectsHomeView';
import { ProjectSetupView } from './components/views/ProjectSetupView';
import { MainProjectDashboardView } from './components/views/MainProjectDashboardView';
import { ScreenplayPageView } from './components/views/ScreenplayPageView';
import { CharacterProfilesView } from './components/views/CharacterProfilesView';
import { ProductionDesignView } from './components/views/ProductionDesignView';
import { PreProductionBoardView } from './components/views/PreProductionBoardView';
import { ProductionWorkView } from './components/views/ProductionWorkView';
import { PostProductionView } from './components/views/PostProductionView';
import { AIAssistantDrawer } from './components/navigation/AIAssistantDrawer';
import { CommandCenterView } from './components/views/CommandCenterView';
import { WhatIfSimulatorView } from './components/views/WhatIfSimulatorView';
import { CreativeDecisionBoardView } from './components/views/CreativeDecisionBoardView';
import { StoryStructureView } from './components/views/StoryStructureView';
import { StoryRoadmapView } from './components/views/StoryRoadmapView';
import { ScreenplayStudioView } from './components/views/ScreenplayStudioView';
import { ScreenplayHealthView } from './components/views/ScreenplayHealthView';
import { ProductionBreakdownView } from './components/views/ProductionBreakdownView';
import { SchedulingStripboardView } from './components/views/SchedulingStripboardView';
import { BudgetIntelligenceView } from './components/views/BudgetIntelligenceView';
import { RiskRadarView } from './components/views/RiskRadarView';
import { ProductionReadinessView } from './components/views/ProductionReadinessView';
import { CharacterIntelligenceView } from './components/views/CharacterIntelligenceView';
import { LiveShootingDayView } from './components/views/LiveShootingDayView';
import {
  IdeaAndStoryLabView,
  WorldBuildingView,
  MLPredictionsView,
  ContinuityIntelligenceView,
  StoryboardShotPlannerView,
  TeamCollaborationView,
  CallSheetReportView,
} from './components/views/AuxiliaryViews';
import { NewProjectModal } from './components/modals/NewProjectModal';

import {
  INITIAL_PROJECT,
  INITIAL_CHARACTERS,
  INITIAL_STRUCTURE_BEATS,
  INITIAL_ROADMAP_ITEMS,
  INITIAL_SCENE_BREAKDOWN,
  INITIAL_BUDGET,
  INITIAL_STRIPBOARD_ITEMS,
  INITIAL_RISKS,
  INITIAL_CREATIVE_DECISIONS,
  INITIAL_TEAM,
  INITIAL_WHAT_IF_SIMULATIONS,
  INITIAL_STRUCTURE_DISCUSSIONS,
} from './data/initialData';

import {
  Project,
  Role,
  CreativeDecision,
  WhatIfSimulation,
  StructureBeat,
  StructureDiscussion,
} from './types';

export type ExtendedAppTab = CinematicTab | NavTab;

export default function App() {
  const [project, setProject] = useState<Project>(INITIAL_PROJECT);
  const [activeTab, setActiveTab] = useState<ExtendedAppTab>('pre-prod-board');
  const [historyStack, setHistoryStack] = useState<ExtendedAppTab[]>([]);
  const [activeRole, setActiveRole] = useState<Role>('Director');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);

  // Centralized navigation with history recording
  const navigateToTab = (newTab: ExtendedAppTab) => {
    if (newTab === activeTab) return;
    setHistoryStack((prev) => [...prev, activeTab]);
    setActiveTab(newTab);
  };

  // Cinematic top nav mapping
  const getCinematicActiveTab = (tab: ExtendedAppTab): CinematicTab => {
    const directTabs: CinematicTab[] = [
      'projects',
      'setup',
      'dashboard',
      'idea',
      'story',
      'characters',
      'structure',
      'roadmap',
      'screenplay',
      'production-design',
      'pre-prod-board',
      'production-work',
      'post-production',
    ];
    if (directTabs.includes(tab as CinematicTab)) {
      return tab as CinematicTab;
    }
    if (tab === 'story-lab') return 'story';
    if (tab === 'character-intel') return 'characters';
    if (tab === 'story-structure') return 'structure';
    if (tab === 'story-roadmap') return 'roadmap';
    if (tab === 'screenplay-studio' || tab === 'screenplay-health' || tab === 'revision-intel')
      return 'screenplay';
    if (tab === 'command-center' || tab === 'overview') return 'dashboard';
    return 'projects';
  };

  const handleSelectCinematicTab = (cTab: CinematicTab) => {
    navigateToTab(cTab);
  };

  const handleGoBack = () => {
    if (historyStack.length > 0) {
      const nextHistory = [...historyStack];
      const previous = nextHistory.pop()!;
      setHistoryStack(nextHistory);
      setActiveTab(previous);
    } else {
      // If history is empty, exit logically:
      // Subpages exit to Dashboard, Dashboard exits to Projects Home
      if (activeTab === 'dashboard' || activeTab === 'setup') {
        setActiveTab('projects');
      } else if (activeTab !== 'projects') {
        setActiveTab('dashboard');
      }
    }
  };

  const getTabTitle = (tab: ExtendedAppTab): string => {
    switch (tab) {
      case 'projects':
        return 'Projects';
      case 'setup':
        return 'Setup';
      case 'dashboard':
      case 'command-center':
      case 'overview':
        return 'Dashboard';
      case 'idea':
        return 'Idea';
      case 'story':
      case 'story-lab':
        return 'Story';
      case 'characters':
      case 'character-intel':
        return 'Characters';
      case 'structure':
      case 'story-structure':
        return 'Structure';
      case 'roadmap':
      case 'story-roadmap':
        return 'Roadmap';
      case 'screenplay':
      case 'screenplay-studio':
      case 'screenplay-health':
      case 'revision-intel':
        return 'Screenplay';
      case 'production-design':
        return 'Production Design';
      case 'pre-prod-board':
        return 'Pre-Prod Board';
      case 'production-work':
        return 'Production';
      case 'post-production':
        return 'Post-Production';
      case 'decision-board':
        return 'Decision Board';
      case 'what-if':
        return 'What-If Simulator';
      default:
        return 'Dashboard';
    }
  };

  const getPreviousTab = (): ExtendedAppTab | null => {
    if (historyStack.length > 0) {
      return historyStack[historyStack.length - 1];
    }
    if (activeTab === 'dashboard' || activeTab === 'setup') {
      return 'projects';
    }
    if (activeTab !== 'projects') {
      return 'dashboard';
    }
    return null;
  };

  const previousTab = getPreviousTab();
  const previousPageTitle = previousTab ? getTabTitle(previousTab) : null;
  const canGoBack = activeTab !== 'projects' || historyStack.length > 0;

  // Core mutable intelligence state
  const [decisions, setDecisions] = useState<CreativeDecision[]>(INITIAL_CREATIVE_DECISIONS);
  const [simulations, setSimulations] = useState<WhatIfSimulation[]>(INITIAL_WHAT_IF_SIMULATIONS);
  const [structureBeats, setStructureBeats] = useState<StructureBeat[]>(INITIAL_STRUCTURE_BEATS);
  const [discussions, setDiscussions] = useState<StructureDiscussion[]>(INITIAL_STRUCTURE_DISCUSSIONS);

  // Handlers
  const handleCastVote = (
    decisionId: string,
    role: Role,
    vote: 'APPROVE' | 'REJECT',
    notes: string
  ) => {
    setDecisions((prev) =>
      prev.map((d) => {
        if (d.id === decisionId) {
          const filteredVotes = d.votes.filter((v) => v.role !== role);
          const newVote = {
            role,
            voterName: `${role} (${role === 'Director' ? 'Aarav' : 'Team Lead'})`,
            vote,
            notes,
          };
          const updatedVotes = [...filteredVotes, newVote];
          const approveCount = updatedVotes.filter((v) => v.vote === 'APPROVE').length;
          const status = approveCount >= 3 ? 'APPROVED' : 'PENDING';
          return { ...d, votes: updatedVotes, status };
        }
        return d;
      })
    );
  };

  const handleAuthorizeApproval = (decisionId: string, authorizedBy: string) => {
    setDecisions((prev) =>
      prev.map((d) =>
        d.id === decisionId
          ? {
              ...d,
              status: 'APPROVED',
              approvalAuthorizedBy: authorizedBy,
            }
          : d
      )
    );
  };

  const handleAddSimulation = (newSim: WhatIfSimulation) => {
    setSimulations((prev) => [newSim, ...prev]);
  };

  const handleSendToDecisionBoard = (sim: WhatIfSimulation) => {
    const newDecision: CreativeDecision = {
      id: `dec_${Date.now()}`,
      title: sim.query,
      description: `What-If Simulation proposal: ${sim.recommendation}. Budget shift: ${sim.impact.budget.diff}, Schedule shift: ${sim.impact.schedule.diff}.`,
      proposedBy: `${activeRole} (via What-If Simulation)`,
      date: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      impacts: {
        story: sim.impact.story.summary,
        visual: 'Set adjustments required',
        cost: sim.impact.budget.diff,
        time: sim.impact.schedule.diff,
        risk: sim.impact.risk.diff,
      },
      aiTradeOffSummary: sim.recommendation,
      votes: [
        {
          role: activeRole,
          voterName: `${activeRole} Lead`,
          vote: 'APPROVE',
          notes: 'Tested in What-If Simulator. Proposing to creative department heads for vote.',
        },
      ],
    };

    setDecisions((prev) => [newDecision, ...prev]);
    setActiveTab('decision-board');
  };

  const handleCreateProject = (newProj: Project) => {
    setProject(newProj);
    setActiveTab('command-center');
  };

  // Map active tab to human title & category
  const getTabMeta = (tab: NavTab) => {
    switch (tab) {
      case 'idea':
        return { category: 'DEVELOPMENT', title: 'Idea Development' };
      case 'story':
        return { category: 'DEVELOPMENT', title: 'Story Development' };
      case 'command-center':
        return { category: 'PROJECT', title: 'Command Center' };
      case 'overview':
        return { category: 'PROJECT', title: 'Project Overview' };
      case 'idea-lab':
        return { category: 'CREATIVE', title: 'Idea Lab' };
      case 'story-lab':
        return { category: 'CREATIVE', title: 'Story Lab' };
      case 'character-intel':
        return { category: 'CREATIVE', title: 'Character Intelligence' };
      case 'world-building':
        return { category: 'CREATIVE', title: 'World Building' };
      case 'story-structure':
        return { category: 'CREATIVE', title: 'Story Structure Studio' };
      case 'story-roadmap':
        return { category: 'CREATIVE', title: 'Story Roadmap' };
      case 'screenplay-studio':
        return { category: 'CREATIVE', title: 'Screenplay Studio' };
      case 'screenplay-health':
        return { category: 'CREATIVE', title: 'Screenplay Health' };
      case 'revision-intel':
        return { category: 'CREATIVE', title: 'Revision Intelligence' };
      case 'what-if':
        return { category: 'INTELLIGENCE', title: 'What-If Simulator' };
      case 'decision-board':
        return { category: 'INTELLIGENCE', title: 'Creative Decision Board' };
      case 'risk-radar':
        return { category: 'INTELLIGENCE', title: 'Risk Radar' };
      case 'ml-predictions':
        return { category: 'INTELLIGENCE', title: 'ML Predictions' };
      case 'continuity':
        return { category: 'INTELLIGENCE', title: 'Continuity Intelligence' };
      case 'production-readiness':
        return { category: 'PRODUCTION', title: 'Production Readiness' };
      case 'scene-breakdown':
        return { category: 'PRODUCTION', title: 'Scene Breakdown' };
      case 'storyboard':
        return { category: 'PRODUCTION', title: 'Storyboard' };
      case 'shot-planner':
        return { category: 'PRODUCTION', title: 'Shot Planner' };
      case 'cast-crew':
        return { category: 'PRODUCTION', title: 'Cast & Crew' };
      case 'budget':
        return { category: 'PRODUCTION', title: 'Budget Intelligence' };
      case 'schedule':
      case 'stripboard':
        return { category: 'PRODUCTION', title: 'Stripboard & Schedule' };
      case 'dood':
        return { category: 'PRODUCTION', title: 'Day Out of Days (DOOD)' };
      case 'call-sheets':
        return { category: 'PRODUCTION', title: 'Call Sheets' };
      case 'shooting-day':
        return { category: 'EXECUTION', title: 'Live Shooting Day' };
      case 'actual-vs-planned':
        return { category: 'EXECUTION', title: 'Actual vs Planned' };
      case 'team':
        return { category: 'COLLABORATION', title: 'Team & Permissions' };
      case 'reports':
      case 'export':
        return { category: 'REPORTS', title: 'Production Reports & Export' };
      default:
        return { category: 'INTELLIGENCE', title: 'Decision Intelligence' };
    }
  };

  const meta = getTabMeta(activeTab);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProject = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#090a0d] font-sans text-neutral-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. TOP MINIMAL DARK CINEMATIC NAVIGATION (Universal) */}
      <CinematicNavbar
        activeTab={getCinematicActiveTab(activeTab)}
        onSelectTab={handleSelectCinematicTab}
        onBack={handleGoBack}
        previousPageTitle={previousPageTitle}
        canGoBack={canGoBack}
        projectName={project.name}
        onNewProject={() => setIsNewProjectModalOpen(true)}
        activeRole={activeRole}
        onChangeRole={setActiveRole}
        onSaveProject={handleSaveProject}
        isSaving={isSaving}
      />

      {/* 2. MAIN WORKSPACE CONTAINER */}
      {activeTab === 'projects' ? (
        /* Page 1 — Create / My Project */
        <main className="flex-1 overflow-hidden">
          <ProjectsHomeView
            currentProject={project}
            onSelectProject={(selectedP) => {
              setProject(selectedP);
            }}
            onCreateProject={(newP) => {
              setProject(newP);
            }}
            onNavigateTab={handleSelectCinematicTab}
          />
        </main>
      ) : activeTab === 'setup' ? (
        /* Page 2 — Project Setup */
        <main className="flex-1 overflow-hidden">
          <ProjectSetupView
            project={project}
            onUpdateProject={(updated) => setProject((prev) => ({ ...prev, ...updated }))}
            onNavigateTab={handleSelectCinematicTab}
          />
        </main>
      ) : activeTab === 'dashboard' ? (
        /* Page 3 — Main Project Dashboard */
        <main className="flex-1 overflow-hidden">
          <MainProjectDashboardView
            project={project}
            onNavigateTab={handleSelectCinematicTab}
            activeRole={activeRole}
          />
        </main>
      ) : activeTab === 'idea' ? (
        /* Page 4 — Idea Landing & Discussion Area */
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800">
          <IdeaLandingView
            project={project}
            activeRole={activeRole}
            onNavigateTab={handleSelectCinematicTab}
            onOpenNewProject={() => setIsNewProjectModalOpen(true)}
            onSelectExistingProject={(projTitle, stage) => {
              setProject((prev) => ({ ...prev, name: projTitle }));
              handleSelectCinematicTab(stage);
            }}
          />
        </main>
      ) : activeTab === 'story' ? (
        /* Page 5 — Story Page */
        <main className="flex-1 overflow-hidden">
          <StoryPageView
            project={project}
            activeRole={activeRole}
            onNavigateTab={handleSelectCinematicTab}
            onUpdateProjectTitle={(newTitle) => setProject((prev) => ({ ...prev, name: newTitle }))}
          />
        </main>
      ) : activeTab === 'screenplay' ? (
        /* Page 6 — Screenplay Page */
        <main className="flex-1 overflow-hidden">
          <ScreenplayPageView
            project={project}
            onNavigateTab={handleSelectCinematicTab}
            activeRole={activeRole}
          />
        </main>
      ) : activeTab === 'characters' ? (
        /* Page 7 — Character Profiles */
        <main className="flex-1 overflow-hidden">
          <CharacterProfilesView
            project={project}
            onNavigateTab={handleSelectCinematicTab}
            activeRole={activeRole}
          />
        </main>
      ) : activeTab === 'production-design' ? (
        /* Page 8 — Production Design */
        <main className="flex-1 overflow-hidden">
          <ProductionDesignView
            project={project}
            onNavigateTab={handleSelectCinematicTab}
            activeRole={activeRole}
          />
        </main>
      ) : activeTab === 'pre-prod-board' ? (
        /* Page 9 — Pre-production Board */
        <main className="flex-1 overflow-hidden">
          <PreProductionBoardView
            project={project}
            onNavigateTab={handleSelectCinematicTab}
            activeRole={activeRole}
          />
        </main>
      ) : activeTab === 'production-work' ? (
        /* Page 10 — Production Work */
        <main className="flex-1 overflow-hidden">
          <ProductionWorkView
            project={project}
            onNavigateTab={handleSelectCinematicTab}
            activeRole={activeRole}
          />
        </main>
      ) : activeTab === 'post-production' ? (
        /* Page 11 — Post-production */
        <main className="flex-1 overflow-hidden">
          <PostProductionView
            project={project}
            onNavigateTab={handleSelectCinematicTab}
            activeRole={activeRole}
          />
        </main>
      ) : (
        /* Full Film Studio Workspace for Characters, Structure, Roadmap, Screenplay, Projects */
        <div className="flex-1 flex overflow-hidden">
          {/* Left Navigation Sidebar */}
          <Sidebar
            activeTab={activeTab as NavTab}
            onSelectTab={navigateToTab}
            projectName={project.name}
            onNewProject={() => setIsNewProjectModalOpen(true)}
          />

          {/* Main Workspace Frame */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0c0d12]">
            {/* Top Header */}
            <Header
              currentModuleName={meta.title}
              categoryName={meta.category}
              activeRole={activeRole}
              onChangeRole={setActiveRole}
              onOpenWhatIf={() => navigateToTab('what-if')}
              isAiDrawerOpen={isAiDrawerOpen}
              onToggleAiDrawer={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
              readinessScore={87}
              healthScore={89}
              budgetString={project.estimatedBudget}
            />

            {/* Dynamic Main Workspace Container */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-neutral-800">
              {activeTab === 'command-center' && (
                <CommandCenterView
                  project={project}
                  team={INITIAL_TEAM}
                  decisions={decisions}
                  onNavigate={navigateToTab}
                  onOpenWhatIf={() => navigateToTab('what-if')}
                  readinessScore={87}
                  healthScore={89}
                />
              )}

              {activeTab === 'overview' && (
                <CommandCenterView
                  project={project}
                  team={INITIAL_TEAM}
                  decisions={decisions}
                  onNavigate={navigateToTab}
                  onOpenWhatIf={() => navigateToTab('what-if')}
                  readinessScore={87}
                  healthScore={89}
                />
              )}

              {activeTab === 'what-if' && (
                <WhatIfSimulatorView
                  project={project}
                  simulations={simulations}
                  onAddSimulation={handleAddSimulation}
                  onSendToDecisionBoard={handleSendToDecisionBoard}
                  activeRole={activeRole}
                />
              )}

              {activeTab === 'decision-board' && (
                <CreativeDecisionBoardView
                  decisions={decisions}
                  team={INITIAL_TEAM}
                  activeRole={activeRole}
                  onCastVote={handleCastVote}
                  onAuthorizeApproval={handleAuthorizeApproval}
                />
              )}

              {(activeTab === 'story-structure' || activeTab === 'structure') && (
                <StoryStructureView
                  beats={structureBeats}
                  discussions={discussions}
                  onUpdateBeats={setStructureBeats}
                  onUpdateDiscussions={setDiscussions}
                />
              )}

              {(activeTab === 'story-roadmap' || activeTab === 'roadmap') && (
                <StoryRoadmapView
                  roadmapItems={INITIAL_ROADMAP_ITEMS}
                  onSelectRoadmapItem={() => {}}
                />
              )}

              {activeTab === 'screenplay-studio' && (
                <ScreenplayStudioView
                  project={project}
                  roadmapItems={INITIAL_ROADMAP_ITEMS}
                  characters={INITIAL_CHARACTERS}
                />
              )}

              {activeTab === 'screenplay-health' && (
                <ScreenplayHealthView healthScore={89} />
              )}

              {activeTab === 'revision-intel' && (
                <ScreenplayHealthView healthScore={89} />
              )}

              {activeTab === 'scene-breakdown' && (
                <ProductionBreakdownView breakdowns={INITIAL_SCENE_BREAKDOWN} />
              )}

              {(activeTab === 'stripboard' || activeTab === 'schedule' || activeTab === 'dood') && (
                <SchedulingStripboardView strips={INITIAL_STRIPBOARD_ITEMS} />
              )}

              {activeTab === 'budget' && (
                <BudgetIntelligenceView budgetItems={INITIAL_BUDGET} />
              )}

              {activeTab === 'risk-radar' && (
                <RiskRadarView risks={INITIAL_RISKS} />
              )}

              {activeTab === 'production-readiness' && (
                <ProductionReadinessView score={87} />
              )}

              {activeTab === 'character-intel' && (
                <CharacterIntelligenceView characters={INITIAL_CHARACTERS} />
              )}

              {(activeTab === 'shooting-day' || activeTab === 'actual-vs-planned') && (
                <LiveShootingDayView />
              )}

              {activeTab === 'idea-lab' && (
                <IdeaAndStoryLabView project={project} />
              )}

              {activeTab === 'story-lab' && (
                <StoryPageView
                  project={project}
                  activeRole={activeRole}
                  onNavigateTab={handleSelectCinematicTab}
                  onUpdateProjectTitle={(newTitle) => setProject((prev) => ({ ...prev, name: newTitle }))}
                />
              )}

              {activeTab === 'world-building' && (
                <WorldBuildingView project={project} />
              )}

              {(activeTab === 'ml-predictions' || activeTab === 'analytics') && (
                <MLPredictionsView />
              )}

              {activeTab === 'continuity' && (
                <ContinuityIntelligenceView />
              )}

              {(activeTab === 'storyboard' || activeTab === 'shot-planner') && (
                <StoryboardShotPlannerView />
              )}

              {(activeTab === 'team' || activeTab === 'cast-crew') && (
                <TeamCollaborationView team={INITIAL_TEAM} />
              )}

              {(activeTab === 'call-sheets' || activeTab === 'reports' || activeTab === 'export') && (
                <CallSheetReportView project={project} />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Persistent Context-Aware AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        activeModule={meta.title}
        project={project}
        activeRole={activeRole}
      />

      {/* Project Creation / Switch Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}
