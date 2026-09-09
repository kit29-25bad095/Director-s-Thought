import React, { useState } from 'react';
import {
  Film,
  Sparkles,
  X,
  Check,
  Clapperboard,
  Layers,
  DollarSign,
  Clock,
} from 'lucide-react';
import { Project } from '../../types';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Project) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const [name, setName] = useState('Echoes of the Monsoon');
  const [productionType, setProductionType] = useState('Feature Film');
  const [genre, setGenre] = useState('Psychological Thriller');
  const [budgetTier, setBudgetTier] = useState('Indie (₹50L - ₹2Cr)');
  const [targetRuntime, setTargetRuntime] = useState('110 mins');
  const [logline, setLogline] = useState(
    'A solitary lighthouse keeper in coastal Kerala uncovers an encrypted nautical transmitter, drawing him into a cat-and-mouse game with a submarine commander during an unrelenting seasonal storm.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj: Project = {
      id: `proj_${Date.now()}`,
      name,
      productionType: productionType as any,
      genre,
      language: 'English',
      logline,
      description: logline,
      estimatedBudget: '₹1.85 Cr',
      targetRuntime,
      targetAudience: 'General Audience',
      mode: 'team',
      currentDraft: 'Draft 01',
      status: 'Development',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      createdAt: new Date().toISOString().split('T')[0],
    };
    onCreateProject(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150 select-none">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Initialize New Project</h2>
              <p className="text-[11px] text-slate-500">
                Setup film parameters and initialize intelligence pipelines
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Project Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-purple-500 font-semibold text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Production Format</label>
              <select
                value={productionType}
                onChange={(e) => setProductionType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-purple-500 font-medium"
              >
                <option>Feature Film</option>
                <option>Web Series</option>
                <option>Short Film</option>
                <option>Indie Film</option>
                <option>Documentary</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-purple-500 font-medium"
              >
                <option>Psychological Thriller</option>
                <option>Sci-Fi / Drama</option>
                <option>Action / Heist</option>
                <option>Neo-Noir Mystery</option>
                <option>Period Drama</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Budget Tier</label>
              <select
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-purple-500 font-medium"
              >
                <option>Micro-budget (&lt; ₹50L)</option>
                <option>Indie (₹50L - ₹2Cr)</option>
                <option>Mid-Scale (₹2Cr - ₹10Cr)</option>
                <option>High-End Tentpole (&gt; ₹10Cr)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Target Runtime</label>
              <input
                type="text"
                value={targetRuntime}
                onChange={(e) => setTargetRuntime(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-purple-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Logline / Premise</label>
            <textarea
              value={logline}
              onChange={(e) => setLogline(e.target.value)}
              rows={3}
              required
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-purple-500 leading-relaxed resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Initialize Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
