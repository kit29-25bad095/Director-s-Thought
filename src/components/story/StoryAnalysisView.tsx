import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Users,
  Film,
  Compass,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Edit,
  Eye,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Layers,
  Clock,
} from 'lucide-react';
import { StoryAnalysisResult } from '../../services/geminiService';
import { Project } from '../../types';

interface StoryAnalysisViewProps {
  fileName: string;
  fileSize: string;
  fileType: string;
  storyContent: string;
  analysis: StoryAnalysisResult;
  project?: Project;
  onOpenWriter: (content: string, title: string) => void;
  onNavigateToCharacters: () => void;
  onNavigateToStructure: () => void;
  onReAnalyze: () => void;
  isReanalyzing?: boolean;
}

export const StoryAnalysisView: React.FC<StoryAnalysisViewProps> = ({
  fileName,
  fileSize,
  fileType,
  storyContent,
  analysis,
  project,
  onOpenWriter,
  onNavigateToCharacters,
  onNavigateToStructure,
  onReAnalyze,
  isReanalyzing = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  // Split story content into simulated pages if large
  const paragraphs = storyContent.split('\n\n');
  const itemsPerPage = Math.max(3, Math.ceil(paragraphs.length / totalPages));
  const displayedParagraphs = paragraphs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      id="story-analysis-view"
      className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-130px)] overflow-hidden bg-[#090a0d] border-t border-neutral-800/80"
    >
      {/* LEFT PANEL: DOCUMENT PREVIEW */}
      <section
        id="uploaded-document-preview"
        className="w-full lg:w-1/2 flex flex-col h-full border-r border-neutral-800/80 bg-[#0c0d12]"
      >
        {/* Document Header Bar */}
        <div className="shrink-0 p-3 sm:p-4 bg-[#101218] border-b border-neutral-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-amber-400 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-neutral-100 truncate">
                {fileName}
              </div>
              <div className="text-[10px] text-neutral-400 font-mono flex items-center gap-2">
                <span>{fileType.toUpperCase()}</span>
                <span>•</span>
                <span>{fileSize}</span>
                <span>•</span>
                <span className="text-emerald-400">Imported & Verified</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Page navigation */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 text-xs text-neutral-300">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 hover:bg-neutral-800 rounded disabled:opacity-30 cursor-pointer"
                title="Previous page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono text-[11px]">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 hover:bg-neutral-800 rounded disabled:opacity-30 cursor-pointer"
                title="Next page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Edit in Writer button */}
            <button
              onClick={() => onOpenWriter(storyContent, analysis.title)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium border border-neutral-700 transition cursor-pointer"
              title="Open full editable writer"
            >
              <Edit className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Edit in Writer</span>
            </button>
          </div>
        </div>

        {/* Formatted Script/Treatment Paper Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-[#07080a] scrollbar-thin scrollbar-thumb-neutral-800">
          <div className="w-full max-w-xl bg-[#0f1118] border border-neutral-800/90 rounded-xl p-6 sm:p-8 shadow-2xl font-mono text-xs sm:text-sm text-neutral-200 leading-relaxed min-h-150 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] text-neutral-500 pb-3 border-b border-neutral-800/80 uppercase tracking-widest font-mono">
                <span>{analysis.title.toUpperCase()}</span>
                <span>PAGE {currentPage}</span>
              </div>

              <div className="space-y-3 whitespace-pre-line text-neutral-300">
                {displayedParagraphs.length > 0 ? (
                  displayedParagraphs.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p>{storyContent}</p>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800/60 flex justify-between text-[10px] text-neutral-500 font-mono">
              <span>DIRECTOR’S THOUGHT // DOCUMENT PREVIEW</span>
              <span>SCENE BREAKDOWN PENDING</span>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT PANEL: STORY ANALYSIS */}
      <section
        id="story-analysis-report-panel"
        className="w-full lg:w-1/2 flex flex-col h-full bg-[#0a0b0e] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800"
      >
        {/* Panel Header */}
        <div className="shrink-0 p-4 sm:p-5 border-b border-neutral-800/80 bg-[#0e1016] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-neutral-100 flex items-center gap-2">
                <span>Story Analysis</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-300 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Ready for Development
                </span>
              </div>
              <div className="text-[11px] text-neutral-400">
                Director AI evaluation of story foundations & narrative engine.
              </div>
            </div>
          </div>

          <button
            onClick={onReAnalyze}
            disabled={isReanalyzing}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs transition cursor-pointer disabled:opacity-50"
            title="Re-run deep analysis"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReanalyzing ? 'animate-spin text-amber-400' : ''}`} />
            <span className="hidden sm:inline">Re-Analyze</span>
          </button>
        </div>

        {/* Content Modules */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* 1. Title, Genre & Logline */}
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                STORY FOUNDATION
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-200 font-medium">
                {analysis.genre}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-neutral-100 font-sans tracking-tight">
              {analysis.title}
            </h2>

            <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800/90 text-xs sm:text-sm text-neutral-200 italic leading-relaxed">
              "{analysis.logline}"
            </div>
          </div>

          {/* 2. Main Character Engine */}
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Main Character Engine</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                {analysis.mainCharacter.archetype}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
                {analysis.mainCharacter.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-neutral-100">
                  {analysis.mainCharacter.name}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-xs">
                  <div className="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
                    <span className="text-[10px] font-mono uppercase text-amber-400/90 block mb-0.5">
                      External Want
                    </span>
                    <span className="text-neutral-300 leading-snug">
                      {analysis.mainCharacter.want}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
                    <span className="text-[10px] font-mono uppercase text-indigo-400 block mb-0.5">
                      Internal Need
                    </span>
                    <span className="text-neutral-300 leading-snug">
                      {analysis.mainCharacter.need}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
                    <span className="text-[10px] font-mono uppercase text-rose-400 block mb-0.5">
                      Fatal Flaw
                    </span>
                    <span className="text-neutral-300 leading-snug">
                      {analysis.mainCharacter.flaw}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Supporting Characters */}
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2.5">
            <div className="text-xs font-semibold text-neutral-200 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-neutral-400" />
              <span>Supporting Cast & Dynamics</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {analysis.supportingCharacters.map((char, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-neutral-950/50 border border-neutral-800/70 text-xs"
                >
                  <div className="font-semibold text-neutral-200">{char.name}</div>
                  <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">
                    {char.role}
                  </div>
                  <div className="text-neutral-400 text-[11px] mt-1 leading-snug">
                    {char.dynamic}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Conflict, Setting & Theme */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 text-xs">
              <div className="text-[10px] font-mono uppercase text-rose-400 mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                Central Conflict
              </div>
              <p className="text-neutral-300 leading-snug">{analysis.centralConflict}</p>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 text-xs">
              <div className="text-[10px] font-mono uppercase text-sky-400 mb-1 flex items-center gap-1">
                <Compass className="w-3 h-3" />
                Setting & Texture
              </div>
              <p className="text-neutral-300 leading-snug">{analysis.setting}</p>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 text-xs">
              <div className="text-[10px] font-mono uppercase text-amber-400 mb-1 flex items-center gap-1">
                <Layers className="w-3 h-3" />
                Underlying Theme
              </div>
              <p className="text-neutral-300 leading-snug">{analysis.theme}</p>
            </div>
          </div>

          {/* 5. Three-Act Arc Breakdown */}
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3">
            <div className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Three-Act Story Structure</span>
            </div>

            <div className="space-y-2.5">
              {/* Beginning */}
              <div className="p-3 rounded-lg bg-neutral-950/60 border-l-2 border-l-amber-500 border-neutral-800/80 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                  ACT I • BEGINNING (THE HOOK & INCITING INCIDENT)
                </span>
                <p className="text-neutral-300 leading-relaxed">{analysis.beginning}</p>
              </div>

              {/* Middle */}
              <div className="p-3 rounded-lg bg-neutral-950/60 border-l-2 border-l-indigo-500 border-neutral-800/80 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 block mb-1">
                  ACT II • MIDDLE (CONFRONTATION & MIDPOINT REVERSAL)
                </span>
                <p className="text-neutral-300 leading-relaxed">{analysis.middle}</p>
              </div>

              {/* Ending */}
              <div className="p-3 rounded-lg bg-neutral-950/60 border-l-2 border-l-rose-500 border-neutral-800/80 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block mb-1">
                  ACT III • ENDING (THE CLIMAX & MORAL COST)
                </span>
                <p className="text-neutral-300 leading-relaxed">{analysis.ending}</p>
              </div>
            </div>
          </div>

          {/* 6. NEXT DEVELOPMENT STAGE CTA BUTTONS */}
          <div className="p-4 rounded-xl bg-linear-to-br from-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-neutral-100">
                Story Foundations Approved
              </div>
              <div className="text-[11px] text-neutral-400">
                Ready to develop characters or jump directly into the step-by-step structure beat board.
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onNavigateToCharacters}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold border border-neutral-700 transition cursor-pointer"
              >
                Continue to Characters →
              </button>
              <button
                onClick={onNavigateToStructure}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 text-xs font-bold shadow-lg transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Structure Story →</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
