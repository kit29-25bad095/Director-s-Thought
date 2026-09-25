import React, { useState, useEffect } from 'react';
import {
  Film,
  Camera,
  Plus,
  Settings,
  User,
  Sliders,
  Sparkles,
  Clapperboard,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import { Role } from '../../types';

export type CinematicTab =
  | 'projects'
  | 'setup'
  | 'dashboard'
  | 'idea'
  | 'story'
  | 'characters'
  | 'structure'
  | 'roadmap'
  | 'screenplay'
  | 'production-design'
  | 'pre-prod-board'
  | 'production-work'
  | 'post-production';

interface CinematicNavbarProps {
  activeTab: CinematicTab;
  onSelectTab: (tab: CinematicTab) => void;
  onBack?: () => void;
  previousPageTitle?: string | null;
  canGoBack?: boolean;
  projectName: string;
  onNewProject: () => void;
  activeRole: Role;
  onChangeRole: (role: Role) => void;
  onSaveProject?: () => void;
  isSaving?: boolean;
}

export const CinematicNavbar: React.FC<CinematicNavbarProps> = ({
  activeTab,
  onSelectTab,
  onBack,
  previousPageTitle,
  canGoBack = true,
  projectName,
  onNewProject,
  activeRole,
  onChangeRole,
  onSaveProject,
  isSaving = false,
}) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isWorkflowDropdownOpen, setIsWorkflowDropdownOpen] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  // Main visible tabs in header
  const navItems: { id: CinematicTab; label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'setup', label: 'Setup' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'idea', label: 'Idea' },
    { id: 'story', label: 'Story' },
    { id: 'screenplay', label: 'Screenplay' },
    { id: 'characters', label: 'Characters' },
    { id: 'production-design', label: 'Design' },
    { id: 'pre-prod-board', label: 'Board' },
    { id: 'production-work', label: 'Production' },
    { id: 'post-production', label: 'Post' },
  ];

  // All 11 pages in the workflow
  const allWorkflowPages: { id: CinematicTab; title: string }[] = [
    { id: 'projects', title: 'Projects' },
    { id: 'setup', title: 'Project Setup' },
    { id: 'dashboard', title: 'Main Project Dashboard' },
    { id: 'idea', title: 'Idea Development' },
    { id: 'story', title: 'Story Architecture' },
    { id: 'screenplay', title: 'Screenplay Writer' },
    { id: 'characters', title: 'Characters & Cast' },
    { id: 'production-design', title: 'Production Design' },
    { id: 'pre-prod-board', title: 'Pre-production Board' },
    { id: 'production-work', title: 'Production Work' },
    { id: 'post-production', title: 'Post-production & Delivery' },
  ];

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      if (activeTab === 'dashboard' || activeTab === 'setup') {
        onSelectTab('projects');
      } else {
        onSelectTab('dashboard');
      }
    }
  };

  // Keyboard navigation for Left Arrow key to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isEditable =
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        activeTag === 'select' ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      if (isEditable) return;

      if (e.key === 'ArrowLeft' && canGoBack) {
        e.preventDefault();
        handleBackClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoBack, onBack, activeTab, onSelectTab]);

  const handleSaveClick = () => {
    if (onSaveProject) onSaveProject();
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const roles: Role[] = ['Director', 'Writer', 'Producer', 'Cinematographer'];

  return (
    <header
      id="cinematic-navbar"
      className="sticky top-0 z-40 w-full bg-[#090a0d]/95 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-6 lg:px-8 py-2.5 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* LEFT: Top-left back arrow (exits to previous viewed page) + Brand Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {canGoBack && (
            <button
              id="top-left-back-btn"
              onClick={handleBackClick}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/95 hover:bg-neutral-800 text-neutral-100 border border-neutral-700/90 hover:border-amber-500/80 shadow-md backdrop-blur-md transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              title={previousPageTitle ? `Back to ${previousPageTitle} (Left Arrow key)` : 'Back to previous page (Left Arrow key)'}
            >
              <div className="w-5 h-5 rounded-full bg-neutral-800 group-hover:bg-amber-500/20 text-neutral-300 group-hover:text-amber-400 flex items-center justify-center transition border border-neutral-700/60 shrink-0">
                <ArrowLeft className="w-3 h-3" />
              </div>
              <div className="flex items-center gap-1.5 font-sans text-xs">
                <span className="font-semibold text-amber-400">Back</span>
                {previousPageTitle && (
                  <span className="text-neutral-300 text-xs font-medium hidden sm:inline truncate max-w-30">
                    to {previousPageTitle}
                  </span>
                )}
              </div>
            </button>
          )}

          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-amber-400 group-hover:border-amber-500/60 group-hover:text-amber-300 transition shadow-inner">
              <Clapperboard className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm tracking-tight text-neutral-100 group-hover:text-white transition flex items-center gap-1">
                  <span>🎬</span> Director’s Thought
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.2 bg-neutral-800/80 text-neutral-400 border border-neutral-700/60 rounded">
                  24 FPS
                </span>
              </div>
              <div className="text-[10px] text-neutral-400 font-mono tracking-wider truncate max-w-35 sm:max-w-none">
                {projectName ? projectName.toUpperCase() : 'STUDIO // DRAFT 04'}
              </div>
            </div>
          </button>
        </div>

        {/* CENTER: Main Navigation Tabs */}
        <div className="hidden lg:flex items-center gap-2">
          <nav
            id="cinematic-nav-tabs"
            className="flex items-center gap-1 bg-neutral-900/90 border border-neutral-800/90 rounded-full px-2 py-1 shadow-inner"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-neutral-100 text-neutral-950 font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-amber-600 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* 11-Stage Quick Switcher */}
          <div className="flex items-center bg-neutral-900/90 border border-neutral-800 rounded-full p-0.5 shadow-inner">
            <div className="relative">
              <button
                onClick={() => setIsWorkflowDropdownOpen(!isWorkflowDropdownOpen)}
                className="px-2.5 py-1 rounded-full hover:bg-neutral-800/80 text-neutral-300 text-xs font-mono transition cursor-pointer flex items-center gap-1.5"
                title="Filmmaker 11-Stage Workflow Index"
              >
                <span className="text-amber-400 font-semibold">11 STAGES</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isWorkflowDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-96 overflow-y-auto">
                  <div className="text-[10px] font-mono text-neutral-400 px-3 py-1.5 uppercase tracking-wider border-b border-neutral-800/80 mb-1">
                    11-Stage Production Roadmap
                  </div>
                  {allWorkflowPages.map((page, index) => (
                    <button
                      key={page.id}
                      onClick={() => {
                        onSelectTab(page.id);
                        setIsWorkflowDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition cursor-pointer ${
                        activeTab === page.id
                          ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30'
                          : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-amber-500 flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <span className="truncate">{page.title}</span>
                      </div>
                      {activeTab === page.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: + New Project, Save, Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* + New Project */}
          <button
            id="btn-new-project-top"
            onClick={onNewProject}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800/90 hover:bg-neutral-700/90 text-neutral-200 hover:text-white border border-neutral-700/80 text-xs font-medium transition cursor-pointer shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">New Project</span>
          </button>

          {/* Save Button */}
          <button
            id="btn-save-project-top"
            onClick={handleSaveClick}
            disabled={isSaving}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
              savedFeedback
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-800 hover:border-neutral-700'
            }`}
            title="Save changes to studio memory"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${savedFeedback ? 'bg-emerald-400' : 'bg-neutral-500'}`} />
            <span>{savedFeedback ? 'Saved' : isSaving ? 'Saving...' : 'Save'}</span>
          </button>

          {/* Profile / Role Selector */}
          <div className="relative">
            <button
              id="role-dropdown-btn"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs transition cursor-pointer"
              title="Director Profile"
            >
              <div className="w-5 h-5 rounded-full bg-linear-to-tr from-amber-600 to-amber-400 text-neutral-950 text-[10px] font-bold flex items-center justify-center">
                {activeRole[0]}
              </div>
              <span className="hidden lg:inline font-medium text-neutral-200">
                {activeRole}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] font-mono text-neutral-400 px-2.5 py-1 uppercase tracking-wider">
                  Active Department
                </div>
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onChangeRole(r);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                      activeRole === r
                        ? 'bg-neutral-800 text-amber-300 font-semibold'
                        : 'text-neutral-300 hover:bg-neutral-800/60'
                    }`}
                  >
                    <span>{r}</span>
                    {activeRole === r && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Settings icon */}
          <button
            id="btn-navbar-settings"
            onClick={() => onSelectTab('projects')}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/80 transition cursor-pointer border border-transparent hover:border-neutral-700/60"
            title="Studio Settings & Workspace"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Center Navigation */}
      <div className="md:hidden flex items-center justify-center gap-1 mt-2.5 pt-2 border-t border-neutral-800/60 overflow-x-auto scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition cursor-pointer ${
              activeTab === item.id
                ? 'bg-neutral-100 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
