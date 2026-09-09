import React, { useState } from 'react';
import {
  GitBranch,
  Sparkles,
  Layers,
  MessageSquare,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpDown,
  BookOpen,
  Film,
} from 'lucide-react';
import { StructureBeat, StructureDiscussion } from '../../types';
import { discussStructureWithAI } from '../../services/geminiService';

interface StoryStructureViewProps {
  beats: StructureBeat[];
  discussions: StructureDiscussion[];
  onUpdateBeats: (beats: StructureBeat[]) => void;
  onUpdateDiscussions: (discussions: StructureDiscussion[]) => void;
}

export const StoryStructureView: React.FC<StoryStructureViewProps> = ({
  beats,
  discussions,
  onUpdateBeats,
  onUpdateDiscussions,
}) => {
  const [selectedStructure, setSelectedStructure] = useState<string>('Save the Cat! Beat Sheet');
  const [selectedBeatId, setSelectedBeatId] = useState<string>(beats[0]?.id || '');
  const [isDiscussing, setIsDiscussing] = useState(false);
  const [writerIntentInput, setWriterIntentInput] = useState('');

  const structures = [
    'Three-Act Structure',
    'Save the Cat! Beat Sheet',
    'Hero’s Journey',
    'Five-Act Structure',
    'Sequence Structure',
    'Custom Structure',
  ];

  const activeBeat = beats.find((b) => b.id === selectedBeatId) || beats[0];
  const activeDiscussion = discussions.find((d) => d.beatId === activeBeat?.id);

  const handleDiscussWithAI = async () => {
    if (!writerIntentInput.trim() || isDiscussing) return;
    setIsDiscussing(true);

    try {
      const res = await discussStructureWithAI({
        beatName: activeBeat.name,
        currentPosition: activeBeat.relatedScenes.join(', '),
        proposedPosition: 'Adjusted Position',
        writerIntent: writerIntentInput,
      });

      const newDiscussion: StructureDiscussion = {
        id: `disc_${Date.now()}`,
        beatId: activeBeat.id,
        beatName: activeBeat.name,
        aiObservation: res.analysis,
        writerPerspective: writerIntentInput,
        currentScene: `Scene ${activeBeat.relatedScenes[0]}`,
        proposedScene: `Scene ${activeBeat.relatedScenes[0] - 2}`,
        impacts: res.tradeoffs,
        status: 'PENDING',
      };

      onUpdateDiscussions([newDiscussion, ...discussions.filter((d) => d.beatId !== activeBeat.id)]);
      setWriterIntentInput('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsDiscussing(false);
    }
  };

  const handleDiscussionAction = (status: 'ACCEPTED' | 'MODIFIED' | 'REJECTED') => {
    if (!activeDiscussion) return;
    const updated = discussions.map((d) =>
      d.id === activeDiscussion.id ? { ...d, status } : d
    );
    onUpdateDiscussions(updated);
  };

  const acts = ['ACT I', 'ACT II', 'ACT III'] as const;

  return (
    <div id="story-structure-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Header & Framework Selector */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <GitBranch className="w-4 h-4 text-purple-600" />
            <span>Narrative Architecture</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            STORY STRUCTURE STUDIO
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Select standard structural archetypes, manipulate narrative beats, and deliberate trade-offs directly with AI before approving the Story Roadmap. The writer retains final authority.
          </p>
        </div>

        {/* Structure Selector Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Framework:</span>
          <select
            id="structure-archetype-select"
            value={selectedStructure}
            onChange={(e) => setSelectedStructure(e.target.value)}
            className="text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 shadow-xs focus:outline-hidden cursor-pointer"
          >
            {structures.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 11: AI + WRITER DISCUSSION WORKSPACE */}
      {activeDiscussion && (
        <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <span>Writer + AI Structure Discussion: {activeDiscussion.beatName}</span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase ${
                activeDiscussion.status === 'ACCEPTED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : activeDiscussion.status === 'REJECTED'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              Status: {activeDiscussion.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-purple-100 space-y-1">
              <div className="font-bold text-purple-700 flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Observation & Diagnosis:</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                “{activeDiscussion.aiObservation}”
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-purple-100 space-y-1">
              <div className="font-bold text-slate-800 text-[11px]">Writer's Stated Intent:</div>
              <p className="text-slate-700 leading-relaxed font-medium italic">
                “{activeDiscussion.writerPerspective}”
              </p>
            </div>
          </div>

          {/* Impact Metrics Trade-Off Table */}
          <div className="p-4 rounded-xl bg-white border border-purple-200/60 space-y-2">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Consequence Forecast (Proposed vs Current)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[10px] font-semibold">Pacing</div>
                <div className="font-extrabold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+{activeDiscussion.impacts.pacing}%</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[10px] font-semibold">Character Setup</div>
                <div className="font-extrabold text-amber-600 mt-0.5 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{activeDiscussion.impacts.character}%</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[10px] font-semibold">Suspense Build</div>
                <div className="font-extrabold text-purple-600 mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+{activeDiscussion.impacts.suspense}%</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[10px] font-semibold">Production Load</div>
                <div className="font-extrabold text-slate-800 mt-0.5">
                  {activeDiscussion.impacts.production}
                </div>
              </div>
            </div>

            {/* Accept / Modify / Reject Buttons (Section 11) */}
            <div className="flex items-center gap-2 pt-2">
              <button
                id="btn-structure-accept"
                onClick={() => handleDiscussionAction('ACCEPTED')}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition cursor-pointer flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ACCEPT</span>
              </button>

              <button
                id="btn-structure-modify"
                onClick={() => handleDiscussionAction('MODIFIED')}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition cursor-pointer"
              >
                MODIFY
              </button>

              <button
                id="btn-structure-reject"
                onClick={() => handleDiscussionAction('REJECTED')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer flex items-center gap-1"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>REJECT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 12: Visual Drag-and-Drop / Interactive Structure Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Three Act Beat Columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Story Beats Board</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              Click any beat to inspect or deliberate
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {acts.map((act) => {
              const actBeats = beats.filter((b) => b.act === act);
              return (
                <div
                  key={act}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-extrabold text-xs text-slate-900 tracking-wider">
                      {act}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                      {actBeats.length} Beats
                    </span>
                  </div>

                  <div className="space-y-2">
                    {actBeats.map((beat) => {
                      const isSelected = beat.id === activeBeat?.id;
                      return (
                        <button
                          key={beat.id}
                          onClick={() => setSelectedBeatId(beat.id)}
                          className={`w-full text-left p-3 rounded-lg border transition cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-700 shadow-md'
                              : 'bg-white border-slate-200 hover:border-purple-300 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] mb-1">
                            <span
                              className={`font-semibold truncate max-w-[110px] ${
                                isSelected ? 'text-purple-200' : 'text-purple-700'
                              }`}
                            >
                              {beat.sequence}
                            </span>
                            <span
                              className={`font-mono text-[9px] ${
                                isSelected ? 'text-purple-200' : 'text-slate-400'
                              }`}
                            >
                              {beat.pageEstimate}
                            </span>
                          </div>

                          <div
                            className={`font-bold text-xs ${
                              isSelected ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {beat.name}
                          </div>

                          <div
                            className={`text-[11px] line-clamp-2 mt-1 ${
                              isSelected ? 'text-purple-100' : 'text-slate-500'
                            }`}
                          >
                            {beat.storyEvent}
                          </div>

                          <div className="mt-2 pt-1.5 border-t border-slate-100/30 flex items-center justify-between text-[10px]">
                            <span className={isSelected ? 'text-purple-200' : 'text-slate-400'}>
                              Scenes: {beat.relatedScenes.join(', ')}
                            </span>
                            <span className={isSelected ? 'text-white' : 'text-slate-700'}>
                              {beat.characters.join(' & ')}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Beat Inspector & Deliberation Trigger */}
        {activeBeat && (
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                {activeBeat.act} • {activeBeat.sequence}
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {activeBeat.name}
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-900">Beat Purpose:</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{activeBeat.purpose}</p>
              </div>

              <div>
                <span className="font-bold text-slate-900">Story Event:</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{activeBeat.storyEvent}</p>
              </div>

              <div>
                <span className="font-bold text-slate-900">Emotional Objective:</span>
                <p className="text-purple-700 font-medium mt-0.5 leading-relaxed">
                  {activeBeat.emotionalObjective}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-semibold text-slate-400">Setup</span>
                  <div className="font-medium text-slate-800 text-[11px] mt-0.5">
                    {activeBeat.setup}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-semibold text-slate-400">Payoff</span>
                  <div className="font-medium text-slate-800 text-[11px] mt-0.5">
                    {activeBeat.payoff}
                  </div>
                </div>
              </div>
            </div>

            {/* Writer Intent Discussion Box */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                <span>Deliberate Trade-Off with AI</span>
              </label>
              <textarea
                value={writerIntentInput}
                onChange={(e) => setWriterIntentInput(e.target.value)}
                placeholder="State your artistic intent or counter-proposal (e.g. 'I want to keep this beat late to establish Kabir’s emotional isolation')..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:border-purple-500 transition resize-none h-20"
              />
              <button
                id="btn-discuss-structure-ai"
                onClick={handleDiscussWithAI}
                disabled={!writerIntentInput.trim() || isDiscussing}
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isDiscussing ? 'Analyzing Trade-Offs...' : 'Deliberate with AI'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
