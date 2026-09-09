import React from 'react';
import {
  Lightbulb,
  BookOpen,
  FileText,
  Video,
  Settings,
  User,
  ArrowRight,
  Users,
  Palette,
  Layers,
  Scissors,
} from 'lucide-react';
import { Project, Role } from '../../types';

interface MainProjectDashboardViewProps {
  project: Project;
  onNavigateTab: (tab: any) => void;
  activeRole: Role;
}

export const MainProjectDashboardView: React.FC<MainProjectDashboardViewProps> = ({
  project,
  onNavigateTab,
  activeRole,
}) => {
  return (
    <div className="h-full overflow-y-auto bg-[#f4f6fb] text-slate-800 p-6 sm:p-8 lg:p-10 space-y-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header: Project Details & User controls (Matching Screen 3) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {project.name || 'The Last Frame'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {project.productionType || 'Feature Film'} • Directed by {project.director || 'Mahi Balan'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('setup')}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 transition shadow-xs cursor-pointer"
              title="Project Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              M
            </div>
          </div>
        </div>

        {/* Panoramic Sunset Banner (Matching Screen 3) */}
        <div className="relative w-full h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-xs border border-slate-200/80">
          <img
            src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=80"
            alt="Cinematic Sunset Horizon"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent" />
        </div>

        {/* Project Stages Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Primary Creative Stages</h2>
            <span className="text-xs text-slate-400 font-medium">8 Key Director Workspaces</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Idea (Yellow/Amber pastel) */}
            <button
              id="card-stage-idea"
              onClick={() => onNavigateTab('idea')}
              className="group bg-[#fffbeb] hover:bg-[#fef3c7] border border-amber-200/80 rounded-2xl p-6 text-center transition-all duration-200 shadow-xs hover:shadow-md flex flex-col items-center justify-center gap-3 cursor-pointer min-h-42.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-400/30 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6 stroke-2.5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-600 uppercase">Stage 04</span>
                <h3 className="text-base font-bold text-slate-900">Idea Development</h3>
                <p className="text-xs text-slate-500 mt-1">Premise, themes & team notes</p>
              </div>
            </button>

            {/* Card 2: Story (Blue pastel) */}
            <button
              id="card-stage-story"
              onClick={() => onNavigateTab('story')}
              className="group bg-[#eff6ff] hover:bg-[#dbeafe] border border-blue-200/80 rounded-2xl p-6 text-center transition-all duration-200 shadow-xs hover:shadow-md flex flex-col items-center justify-center gap-3 cursor-pointer min-h-42.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 stroke-2.5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">Stage 05</span>
                <h3 className="text-base font-bold text-slate-900">Story Architecture</h3>
                <p className="text-xs text-slate-500 mt-1">5-stage beats & treatment writer</p>
              </div>
            </button>

            {/* Card 3: Screenplay (Purple pastel) */}
            <button
              id="card-stage-screenplay"
              onClick={() => onNavigateTab('screenplay')}
              className="group bg-[#faf5ff] hover:bg-[#f3e8ff] border border-purple-200/80 rounded-2xl p-6 text-center transition-all duration-200 shadow-xs hover:shadow-md flex flex-col items-center justify-center gap-3 cursor-pointer min-h-42.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 stroke-2.5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-600 uppercase">Stage 06</span>
                <h3 className="text-base font-bold text-slate-900">Screenplay Studio</h3>
                <p className="text-xs text-slate-500 mt-1">Scene dialogues, notes & sluglines</p>
              </div>
            </button>

            {/* Card 4: Characters (Rose pastel) */}
            <button
              id="card-stage-characters"
              onClick={() => onNavigateTab('characters')}
              className="group bg-[#fff1f2] hover:bg-[#ffe4e6] border border-rose-200/80 rounded-2xl p-6 text-center transition-all duration-200 shadow-xs hover:shadow-md flex flex-col items-center justify-center gap-3 cursor-pointer min-h-42.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 stroke-2.5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-600 uppercase">Stage 07</span>
                <h3 className="text-base font-bold text-slate-900">Characters & Cast</h3>
                <p className="text-xs text-slate-500 mt-1">Cast dossier, arcs & costumes</p>
              </div>
            </button>

            {/* Card 5: Production Design (Teal pastel) */}
            <button
              id="card-stage-design"
              onClick={() => onNavigateTab('production-design')}
              className="group bg-[#f0fdfa] hover:bg-[#ccfbf1] border border-teal-200/80 rounded-2xl p-6 text-center transition-all duration-200 shadow-xs hover:shadow-md flex flex-col items-center justify-center gap-3 cursor-pointer min-h-42.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6 stroke-2.5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-teal-600 uppercase">Stage 08</span>
                <h3 className="text-base font-bold text-slate-900">Production Design</h3>
                <p className="text-xs text-slate-500 mt-1">Art, lighting, props & cameras</p>
              </div>
            </button>

            {/* Card 6: Pre-production Board (Amber pastel) */}
            <button
              id="card-stage-board"
              onClick={() => onNavigateTab('pre-prod-board')}
              className="group bg-[#fff7ed] hover:bg-[#ffedd5] border border-orange-200/80 rounded-2xl p-6 text-center transition-all duration-200 shadow-xs hover:shadow-md flex flex-col items-center justify-center gap-3 cursor-pointer min-h-42.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 stroke-2.5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-orange-600 uppercase">Stage 09</span>
                <h3 className="text-base font-bold text-slate-900">Pre-prod 3×3 Board</h3>
                <p className="text-xs text-slate-500 mt-1">9 department readiness matrix</p>
              </div>
            </button>

            {/* Card 7: Production (Emerald/Green pastel) */}
            <button
              id="card-stage-production"
              onClick={() => onNavigateTab('production-work')}
              className="group bg-[#f0fdf4] hover:bg-[#dcfce7] border border-emerald-200/80 rounded-2xl p-6 text-center transition-all duration-200 shadow-xs hover:shadow-md flex flex-col items-center justify-center gap-3 cursor-pointer min-h-42.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6 stroke-2.5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase">Stage 10</span>
                <h3 className="text-base font-bold text-slate-900">Production Work</h3>
                <p className="text-xs text-slate-500 mt-1">Shot lists, takes & circle prints</p>
              </div>
            </button>

            {/* Card 8: Post-production (Indigo pastel) */}
            <button
              id="card-stage-post"
              onClick={() => onNavigateTab('post-production')}
              className="group bg-[#eef2ff] hover:bg-[#e0e7ff] border border-indigo-200/80 rounded-2xl p-6 text-center transition-all duration-200 shadow-xs hover:shadow-md flex flex-col items-center justify-center gap-3 cursor-pointer min-h-42.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <Scissors className="w-6 h-6 stroke-2.5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase">Stage 11</span>
                <h3 className="text-base font-bold text-slate-900">Post & Delivery</h3>
                <p className="text-xs text-slate-500 mt-1">Ingest, cuts, color & master</p>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Additional Stage Navigation Row */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Quick Suite Tools:</span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'setup', label: '02 Setup Wizard' },
              { id: 'structure', label: 'Narrative Beats' },
              { id: 'roadmap', label: 'Story Roadmap' },
              { id: 'characters', label: 'Cast & Characters' },
              { id: 'production-work', label: 'Takes Logger' },
              { id: 'post-production', label: 'Master Exporter' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => onNavigateTab(st.id)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition font-medium cursor-pointer shadow-2xs"
              >
                {st.label} →
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
