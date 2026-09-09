import React, { useState } from 'react';
import {
  User,
  Users,
  Plus,
  X,
  ChevronRight,
  Check,
  ChevronDown,
} from 'lucide-react';
import { Project, Role, ProductionType } from '../../types';

interface ProjectSetupViewProps {
  project: Project;
  onUpdateProject: (updated: Partial<Project>) => void;
  onNavigateTab: (tab: any) => void;
}

export const ProjectSetupView: React.FC<ProjectSetupViewProps> = ({
  project,
  onUpdateProject,
  onNavigateTab,
}) => {
  const [activeStep, setActiveStep] = useState<'basic' | 'team' | 'finish'>('basic');
  const [title, setTitle] = useState(project.name || 'The Last Frame');
  const [director, setDirector] = useState(project.director || 'Mahi Balan');
  const [filmType, setFilmType] = useState<string>(project.productionType || 'Feature Film');

  // Team list matching the screenshot
  const [team, setTeam] = useState<Array<{ id: string; name: string; role: string; avatar: string }>>([
    {
      id: 't1',
      name: 'Mahi Balan',
      role: 'Director',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    },
    {
      id: 't2',
      name: 'Arun Kumar',
      role: 'Writer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    },
    {
      id: 't3',
      name: 'Dhivya',
      role: 'Cinematographer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
    },
    {
      id: 't4',
      name: 'Sneha',
      role: 'Editor',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    },
  ]);

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Assistant Director');

  const handleRemoveMember = (id: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    setTeam((prev) => [
      ...prev,
      {
        id: `t_${Date.now()}`,
        name: newMemberName.trim(),
        role: newMemberRole,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
      },
    ]);
    setNewMemberName('');
    setIsAddingMember(false);
  };

  const handleNext = () => {
    if (activeStep === 'basic') {
      setActiveStep('team');
    } else if (activeStep === 'team') {
      setActiveStep('finish');
    } else {
      onUpdateProject({
        name: title,
        director: director,
        productionType: filmType as ProductionType,
      });
      onNavigateTab('dashboard');
    }
  };

  const handleFinishProject = () => {
    onUpdateProject({
      name: title,
      director: director,
      productionType: filmType as ProductionType,
    });
    onNavigateTab('dashboard');
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f4f6fb] text-slate-800 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        {/* Top Header & Wizard Steps (Matching Screen 2) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Create Project
          </h1>

          {/* Stepper (1) Basic Info -> (2) Team -> (3) Finish */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs text-xs font-medium">
            <button
              onClick={() => setActiveStep('basic')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition cursor-pointer ${
                activeStep === 'basic'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                activeStep === 'basic' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                1
              </span>
              <span>Basic Info</span>
            </button>

            <span className="text-slate-300">──</span>

            <button
              onClick={() => setActiveStep('team')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition cursor-pointer ${
                activeStep === 'team'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                activeStep === 'team' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                2
              </span>
              <span>Team</span>
            </button>

            <span className="text-slate-300">──</span>

            <button
              onClick={() => setActiveStep('finish')}
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition cursor-pointer ${
                activeStep === 'finish'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                activeStep === 'finish' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                3
              </span>
              <span>Finish</span>
            </button>
          </div>
        </div>

        {/* STEP 1 & 2: Basic Info & Team Members */}
        {activeStep !== 'finish' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Card: Project Setup */}
            <div className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-200 shadow-xs space-y-6 ${
              activeStep === 'basic' ? 'border-blue-400 ring-2 ring-blue-50' : 'border-slate-200/80 opacity-90'
            }`}>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">Project Setup</h2>
                <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Step 1</span>
              </div>

              <div className="space-y-4">
                {/* Project Name / Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Project Name / Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. The Last Frame"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Director */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Director
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={director}
                      onChange={(e) => setDirector(e.target.value)}
                      placeholder="e.g. Mahi Balan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition pr-8"
                    />
                    <ChevronRight className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Film Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Film Type
                  </label>
                  <div className="relative">
                    <select
                      value={filmType}
                      onChange={(e) => setFilmType(e.target.value)}
                      className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition pr-8 cursor-pointer"
                    >
                      <option value="Feature Film">Feature Film</option>
                      <option value="Short Film">Short Film</option>
                      <option value="Documentary">Documentary</option>
                      <option value="Web Series">Web Series</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Team Members */}
            <div className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-200 shadow-xs space-y-4 ${
              activeStep === 'team' ? 'border-blue-400 ring-2 ring-blue-50' : 'border-slate-200/80 opacity-90'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">Team Members</h2>
                  <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {team.length}
                  </span>
                </div>
                <button
                  onClick={() => setIsAddingMember(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </div>

              {/* Quick Add Form Inline if toggled */}
              {isAddingMember && (
                <form onSubmit={handleAddMember} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 animate-in fade-in">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900"
                    />
                    <select
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800"
                    >
                      <option value="Assistant Director">Assistant Director</option>
                      <option value="Producer">Producer</option>
                      <option value="Sound Designer">Sound Designer</option>
                      <option value="Production Designer">Production Designer</option>
                      <option value="Gaffer">Gaffer</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingMember(false)}
                      className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-medium cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </form>
              )}

              {/* Members List (Matching Screen 2 with avatar, name, role and X) */}
              <div className="divide-y divide-slate-100 max-h-70 overflow-y-auto">
                {team.map((m) => (
                  <div key={m.id} className="py-3 first:pt-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                          {m.name}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">{m.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(m.id)}
                      className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer"
                      title="Remove member"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Finish & Review Card */}
        {activeStep === 'finish' && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-2.5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Project Ready to Launch!</h2>
              <p className="text-xs text-slate-500">
                Review your production setup before entering the director workspace.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">PROJECT NAME</span>
                <p className="text-sm font-bold text-slate-900">{title}</p>
                <p className="text-slate-500">{filmType}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">DIRECTOR</span>
                <p className="text-sm font-bold text-slate-900">{director}</p>
                <p className="text-slate-500">Principal Vision Lead</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">CORE CREW</span>
                <p className="text-sm font-bold text-slate-900">{team.length} Members</p>
                <p className="text-slate-500">Assigned & Ready</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2 text-xs text-blue-900">
              <span className="font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-blue-600" />
                <span>Next Workflow Steps Prepared:</span>
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                <li>Idea Development & Team Discussions</li>
                <li>5-Stage Story Architecture & Script Treatment</li>
                <li>Screenplay Studio & Scene Breakdowns</li>
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setActiveStep('team')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                ← Back to Team
              </button>
              <button
                onClick={handleFinishProject}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer shadow-sm flex items-center gap-2"
              >
                <span>Launch Director Workspace</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action: Next Button (when not on finish) */}
      {activeStep !== 'finish' && (
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between pt-8">
          {activeStep === 'team' ? (
            <button
              onClick={() => setActiveStep('basic')}
              className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold cursor-pointer transition"
            >
              ← Back to Basic Info
            </button>
          ) : (
            <div />
          )}

          <button
            id="btn-project-setup-next"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition cursor-pointer shadow-sm hover:shadow flex items-center gap-2"
          >
            <span>{activeStep === 'basic' ? 'Next: Team Setup' : 'Next: Review & Finish'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
