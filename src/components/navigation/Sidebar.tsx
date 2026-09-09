import React from 'react';
import {
  Home,
  Folder,
  Clapperboard,
  Lightbulb,
  BookOpen,
  FileText,
  Users,
  Palette,
  LayoutGrid,
  Video,
  Sliders,
} from 'lucide-react';
import { ExtendedAppTab } from '../../App';

export type NavTab = string;

interface SidebarProps {
  activeTab: ExtendedAppTab | string;
  onSelectTab: (tab: any) => void;
  projectName: string;
  onNewProject: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  projectName,
  onNewProject,
}) => {
  const mainNavItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'projects', label: 'My Projects', icon: Folder },
    { id: 'setup', label: 'Create Project', icon: Clapperboard, isAction: true },
    { id: 'idea', label: 'Idea', icon: Lightbulb },
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'screenplay', label: 'Screenplay', icon: FileText },
    { id: 'characters', label: 'Characters', icon: Users },
    { id: 'production-design', label: 'Production Design', icon: Palette },
    { id: 'pre-prod-board', label: 'Pre-production', icon: LayoutGrid },
    { id: 'production-work', label: 'Production', icon: Video },
    { id: 'post-production', label: 'Post-production', icon: Sliders },
  ];

  return (
    <aside
      id="app-sidebar"
      className="w-56 sm:w-60 bg-[#0c1322] text-slate-300 flex flex-col h-full border-r border-slate-800/80 shrink-0 select-none overflow-hidden"
    >
      {/* Brand Header */}
      <div className="px-5 pt-6 pb-5 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
          <Clapperboard className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-sm tracking-tight text-white leading-none">
            Director's Thought
          </h1>
          <span className="text-[10px] text-slate-400 font-normal tracking-normal mt-0.5">
            Plan • Create • Make It Real
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (item.id === 'dashboard' && activeTab === 'overview') ||
            (item.id === 'dashboard' && activeTab === 'command-center') ||
            (item.id === 'pre-prod-board' && (activeTab as string) === 'pre-production') ||
            (item.id === 'production-work' && (activeTab as string) === 'production') ||
            (item.id === 'post-production' && (activeTab as string) === 'post');

          if (item.isAction) {
            return (
              <div key={item.id} className="py-1">
                <button
                  id={`nav-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md font-semibold'
                      : 'bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer text-left ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Project Status Pill in Bottom of Sidebar */}
      <div className="p-3 mx-3 mb-4 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between text-xs">
        <div className="truncate mr-2">
          <div className="text-[10px] uppercase font-mono text-slate-500">Active Film</div>
          <div className="text-white font-medium truncate">{projectName}</div>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active Project" />
      </div>
    </aside>
  );
};
