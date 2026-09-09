import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  X,
  AlertCircle,
  Clock,
  Zap,
  HelpCircle,
  Search,
  Filter,
  Layers,
  ChevronDown,
  ChevronUp,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { ScriptBreakdownItem } from '../../types/preproduction';

interface ScreenplayBreakdownTabProps {
  breakdowns: ScriptBreakdownItem[];
  onUpdateBreakdown: (updated: ScriptBreakdownItem[]) => void;
  onAskAi: (prompt: string) => void;
}

export const ScreenplayBreakdownTab: React.FC<ScreenplayBreakdownTabProps> = ({
  breakdowns,
  onUpdateBreakdown,
  onAskAi,
}) => {
  const [selectedSceneNum, setSelectedSceneNum] = useState<number>(breakdowns[0]?.sceneNumber || 1);
  const [filterIntExt, setFilterIntExt] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<string | null>(null);

  const activeScene = breakdowns.find((b) => b.sceneNumber === selectedSceneNum) || breakdowns[0];

  const handleAction = (action: string) => {
    setIsAnalyzing(true);
    setAnalysisStatus(`Running AI ${action}...`);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisStatus(`${action} completed! All department dependencies linked.`);
      setTimeout(() => setAnalysisStatus(null), 4000);
    }, 900);
  };

  const handleApproval = (sceneNumber: number, status: 'ACCEPTED' | 'REJECTED') => {
    onUpdateBreakdown(
      breakdowns.map((b) => (b.sceneNumber === sceneNumber ? { ...b, aiApprovalStatus: status } : b))
    );
  };

  const filtered = breakdowns.filter((b) => {
    const matchType = filterIntExt === 'ALL' || b.intExt === filterIntExt;
    const matchSearch =
      b.slugline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.characters.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-5 text-neutral-100">
      {/* 4 Action Command Buttons requested by user */}
      <div className="p-4 rounded-2xl bg-[#12141a] border border-neutral-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleAction('Script Analysis')}
            disabled={isAnalyzing}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyze Script</span>
          </button>
          <button
            onClick={() => handleAction('Breakdown Generation')}
            disabled={isAnalyzing}
            className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Generate Breakdown</span>
          </button>
          <button
            onClick={() => handleAction('Missing Requirements Detection')}
            disabled={isAnalyzing}
            className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>Find Missing Requirements</span>
          </button>
          <button
            onClick={() => onAskAi('Analyze all scenes in Draft 04 and check if any dialogue contradicts character backstory.')}
            className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>Ask AI About Script</span>
          </button>
        </div>

        {analysisStatus && (
          <div className="text-xs text-amber-300 font-medium animate-in fade-in flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{analysisStatus}</span>
          </div>
        )}
      </div>

      {/* Main Two-Column View: Scene List & Deep Breakdown Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Scene Selector List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          {/* Search & Filter */}
          <div className="p-3 bg-[#12141a] rounded-xl border border-neutral-800 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search scenes, cast..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-amber-400"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <span className="font-semibold">Filter Type:</span>
              <div className="flex items-center gap-1">
                {['ALL', 'INT', 'EXT'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFilterIntExt(opt)}
                    className={`px-2 py-0.5 rounded cursor-pointer transition ${
                      filterIntExt === opt
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scene List Cards */}
          <div className="space-y-2 max-h-[560px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800">
            {filtered.map((scene) => {
              const isSelected = scene.sceneNumber === selectedSceneNum;
              return (
                <div
                  key={scene.sceneNumber}
                  onClick={() => setSelectedSceneNum(scene.sceneNumber)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition space-y-2 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500'
                      : 'bg-[#12141a] border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        SC {scene.sceneNumber}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-neutral-400">
                        {scene.intExt} • {scene.dayNight}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        scene.aiApprovalStatus === 'ACCEPTED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {scene.aiApprovalStatus}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {scene.slugline}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/80">
                    <span>{scene.characters.join(', ')}</span>
                    <span className="font-mono text-neutral-500">{scene.pages} pgs</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Breakdown Details (8 Cols) */}
        <div className="lg:col-span-8 bg-[#12141a] rounded-2xl border border-neutral-800 p-5 sm:p-6 space-y-5">
          {/* Header & Approval Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  SCENE {activeScene.sceneNumber}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {activeScene.pages} Pages • Est {activeScene.estimatedShootingHours} Shoot Hours
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                  Diff: {activeScene.difficultyRating}/5
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                {activeScene.slugline}
              </h2>
            </div>

            {/* AI Approval System Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleApproval(activeScene.sceneNumber, 'ACCEPTED')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition flex items-center gap-1 ${
                  activeScene.aiApprovalStatus === 'ACCEPTED'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accept</span>
              </button>
              <button
                onClick={() => handleApproval(activeScene.sceneNumber, 'REJECTED')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition flex items-center gap-1 ${
                  activeScene.aiApprovalStatus === 'REJECTED'
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                }`}
              >
                <X className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
              <button
                onClick={() => onAskAi(`Explain why you suggested these technical requirements for Scene ${activeScene.sceneNumber}.`)}
                className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold cursor-pointer transition flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Ask AI</span>
              </button>
            </div>
          </div>

          {/* AI Confidence & Source Citation banner */}
          <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Source: <strong className="text-neutral-200">{activeScene.aiSourceCitation}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Confidence:</span>
              <span className="text-emerald-400 font-bold uppercase">{activeScene.aiConfidence}</span>
            </div>
          </div>

          {/* Story & Dramatic Purpose */}
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Dramatic Core & Character Objectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
              <div>
                <span className="text-neutral-400 font-semibold block text-[10px] uppercase">Story Purpose</span>
                <p>{activeScene.storyPurpose}</p>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold block text-[10px] uppercase">Character Objective</span>
                <p>{activeScene.characterObjective}</p>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold block text-[10px] uppercase">Central Conflict</span>
                <p>{activeScene.conflict}</p>
              </div>
              <div>
                <span className="text-neutral-400 font-semibold block text-[10px] uppercase">Emotional Beat</span>
                <p>{activeScene.emotionalObjective}</p>
              </div>
            </div>
          </div>

          {/* Grouping Insight */}
          {activeScene.groupingInsight && (
            <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-start gap-2 text-xs text-blue-200">
              <Zap className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-blue-300">AI Production Grouping Insight: </span>
                <span>{activeScene.groupingInsight}</span>
              </div>
            </div>
          )}

          {/* Departments Breakdown Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Cast & Extras */}
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Cast & Extras</span>
              <div className="font-semibold text-white">{activeScene.characters.join(', ')}</div>
              <div className="text-[11px] text-neutral-400">Extras: {activeScene.extrasCount} people</div>
            </div>

            {/* Location & Stage */}
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Assigned Location</span>
              <div className="font-semibold text-white">{activeScene.location}</div>
              <div className="text-[11px] text-neutral-400">{activeScene.intExt} • {activeScene.dayNight}</div>
            </div>

            {/* Props Breakdown (Hero, Background, Consumable, Continuity) */}
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Props Breakdown</span>
              <div className="text-[11px] text-neutral-300">
                <strong className="text-amber-400">Hero: </strong>{activeScene.props.hero.join(', ') || 'None'}<br/>
                <strong className="text-neutral-400">Consumable: </strong>{activeScene.props.consumable.join(', ') || 'None'}<br/>
                <strong className="text-blue-400">Continuity: </strong>{activeScene.props.continuity.join(', ') || 'None'}
              </div>
            </div>

            {/* Costume & Makeup */}
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Costumes & Makeup</span>
              <div className="text-[11px] text-neutral-300">
                <strong>Costume: </strong>{activeScene.costumes.join(', ')}<br/>
                <strong>Makeup: </strong>{activeScene.makeup.join(', ')}
              </div>
            </div>

            {/* Camera & Lighting Approach */}
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Camera & Optics</span>
              <div className="text-[11px] text-neutral-300">
                <strong>Lens: </strong>{activeScene.cameraPlan.lens}<br/>
                <strong>Movement: </strong>{activeScene.cameraPlan.movement}<br/>
                <strong>Framing: </strong>{activeScene.cameraPlan.framing}
              </div>
            </div>

            {/* Sound & Music */}
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Sound & Room Tone</span>
              <div className="text-[11px] text-neutral-300">
                <strong>Mics: </strong>{activeScene.soundPlan.dialogueMics}<br/>
                <strong>Room Tone: </strong>{activeScene.soundPlan.roomTone}<br/>
                <strong>Music: </strong>{activeScene.soundPlan.musicCue}
              </div>
            </div>
          </div>

          {/* Stunts & Safety */}
          {activeScene.stunts.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between text-rose-300 font-bold uppercase text-[10px]">
                <span>Stunts & Safety Requirements</span>
                <span>Supervisor: {activeScene.stunts[0].supervisor}</span>
              </div>
              <p className="text-neutral-200">{activeScene.stunts[0].description}</p>
              <div className="text-[11px] text-neutral-400">
                Safety Checklist: {activeScene.stunts[0].safetyChecklist.join(' • ')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
