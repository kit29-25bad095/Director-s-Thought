import React, { useState } from 'react';
import {
  Film,
  Plus,
  Folder,
  Clapperboard,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  User,
  X,
} from 'lucide-react';
import { Project, ProductionType } from '../../types';
import { SAMPLE_PROJECTS } from '../../data/suiteSampleData';

interface ProjectsHomeViewProps {
  currentProject: Project;
  onSelectProject: (proj: Project) => void;
  onCreateProject: (proj: Project) => void;
  onNavigateTab: (tab: any) => void;
}

export const ProjectsHomeView: React.FC<ProjectsHomeViewProps> = ({
  currentProject,
  onSelectProject,
  onCreateProject,
  onNavigateTab,
}) => {
  const [projectsList, setProjectsList] = useState<Project[]>(SAMPLE_PROJECTS);
  const [showProjectsModal, setShowProjectsModal] = useState(false);

  const handleCreateNewClick = () => {
    onNavigateTab('setup');
  };

  const handleOpenMyProjectsClick = () => {
    setShowProjectsModal(true);
  };

  return (
    <div className="h-full w-full flex flex-col lg:flex-row overflow-hidden bg-[#f4f6fb]">
      {/* 1. LEFT HALF: CINEMATIC DARK POSTER HERO (Exactly matching Screen 1) */}
      <div className="relative w-full lg:w-1/2 bg-[#0c1424] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden shrink-0 min-h-80 lg:min-h-full">
        {/* Subtle cinematic gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-[#080d18] via-[#0c1424]/80 to-transparent z-10" />
        
        {/* Filmmaker with camera silhouette against golden sunset background image */}
        <img
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80"
          alt="Director Silhouette"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
        />

        {/* Ambient warm film lens flare glow */}
        <div className="absolute top-1/3 right-10 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

        {/* Top brand header */}
        <div className="relative z-20 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Clapperboard className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-bold tracking-tight text-sm text-slate-200">
            Director's Thought
          </span>
        </div>

        {/* Center / Hero text block */}
        <div className="relative z-20 my-auto py-12 max-w-lg space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Director's Thought
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
            Plan • Create • Make It Real
          </p>
        </div>

        {/* Bottom Quote (Matching Screen 1) */}
        <div className="relative z-20 pt-6 border-t border-slate-800/80">
          <p className="italic text-xs sm:text-sm text-slate-400 leading-relaxed font-serif">
            “Every great film starts with a single thought.”
          </p>
        </div>
      </div>

      {/* 2. RIGHT HALF: CLEAN LIGHT ACTION CARDS (Exactly matching Screen 1) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#f4f6fb]">
        <div className="w-full max-w-md space-y-6">
          {/* Card 1: Create Project */}
          <button
            id="btn-create-project-card"
            onClick={handleCreateNewClick}
            className="group w-full bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-400/80 rounded-2xl p-6 sm:p-7 text-left transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-5 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
              <Plus className="w-7 h-7 stroke-2.5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Create Project
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
                Start a new film project
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Card 2: My Projects */}
          <button
            id="btn-my-projects-card"
            onClick={handleOpenMyProjectsClick}
            className="group w-full bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-400/80 rounded-2xl p-6 sm:p-7 text-left transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-5 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
              <Folder className="w-7 h-7 stroke-2" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                My Projects
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
                Open an existing project ({projectsList.length} saved)
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Quick info note */}
          <div className="pt-2 text-center text-xs text-slate-400">
            Current Active Project:{' '}
            <span
              onClick={() => onNavigateTab('dashboard')}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              {currentProject.name}
            </span>
          </div>
        </div>
      </div>

      {/* MODAL: MY PROJECTS CATALOG (When user clicks My Projects) */}
      {showProjectsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">My Film Projects</h3>
                <p className="text-xs text-slate-500">Select a project to load its director workspace</p>
              </div>
              <button
                onClick={() => setShowProjectsModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal List */}
            <div className="p-5 overflow-y-auto space-y-3 divide-y divide-slate-100">
              {projectsList.map((proj) => {
                const isSelected = currentProject.id === proj.id;
                return (
                  <div
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj);
                      setShowProjectsModal(false);
                      onNavigateTab('dashboard');
                    }}
                    className={`pt-3 first:pt-0 p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">
                        {proj.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-slate-900">{proj.name}</h4>
                          {isSelected && (
                            <span className="text-[10px] bg-blue-600 text-white font-medium px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {proj.productionType} • Directed by {proj.director || 'Mahi Balan'}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowProjectsModal(false);
                  onNavigateTab('setup');
                }}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Project Instead</span>
              </button>
              <button
                onClick={() => setShowProjectsModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
