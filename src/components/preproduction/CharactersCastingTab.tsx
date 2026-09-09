import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  FileText,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import { PreProdCharacter } from '../../types/preproduction';

interface CharactersCastingTabProps {
  characters: PreProdCharacter[];
  onAskAi: (prompt: string) => void;
}

export const CharactersCastingTab: React.FC<CharactersCastingTabProps> = ({
  characters,
  onAskAi,
}) => {
  const [selectedCharId, setSelectedCharId] = useState<string>(characters[0]?.id || 'char_kabir');
  const activeChar = characters.find((c) => c.id === selectedCharId) || characters[0];

  return (
    <div className="space-y-5 text-neutral-100">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#12141a] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Character Intelligence & Casting Assistant
            </h2>
            <p className="text-xs text-neutral-400">
              Arcs, motivation progression, behavioral consistency alerts, audition sides & casting briefs
            </p>
          </div>
        </div>

        <button
          onClick={() => onAskAi('Analyze character arcs and verify emotional progression across Act II.')}
          className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Audit Consistency</span>
        </button>
      </div>

      {/* Grid: Character Selector & Deep Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Character Cards (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          {characters.map((char) => {
            const isSelected = char.id === selectedCharId;
            return (
              <div
                key={char.id}
                onClick={() => setSelectedCharId(char.id)}
                className={`p-4 rounded-xl border cursor-pointer transition space-y-2.5 ${
                  isSelected
                    ? 'bg-indigo-500/10 border-indigo-500'
                    : 'bg-[#12141a] border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{char.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                    {char.roleType}
                  </span>
                </div>

                <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>Age: {char.ageRange}</span>
                  <span className="font-mono text-indigo-400">{char.screenTimePercent}% Screen Time</span>
                </div>

                {char.consistencyAlert && (
                  <div className="text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{char.consistencyAlert}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Deep Dossier & Casting Assistant (8 Cols) */}
        <div className="lg:col-span-8 bg-[#12141a] rounded-2xl border border-neutral-800 p-5 sm:p-6 space-y-5">
          {/* Dossier Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{activeChar.name}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-medium">
                  {activeChar.roleType} • {activeChar.ageRange}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Attached / Shortlisted: <strong className="text-amber-400">{activeChar.actorAttached || 'Casting In Progress'}</strong>
              </p>
            </div>

            <span className="text-xs font-mono text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 rounded-lg">
              {activeChar.screenTimePercent}% Screen Time • {activeChar.importantScenes.length} Key Scenes
            </span>
          </div>

          {/* Goals, Motivations & Conflicts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Core Goal</span>
              <p className="text-neutral-200">{activeChar.goal}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Primal Motivation</span>
              <p className="text-neutral-200">{activeChar.motivation}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Internal Conflict</span>
              <p className="text-neutral-200">{activeChar.internalConflict}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Character Arc Progression</span>
              <p className="text-neutral-200">{activeChar.arc}</p>
            </div>
          </div>

          {/* Consistency Alert Warning Box */}
          {activeChar.consistencyAlert && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 uppercase text-[10px]">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Behavioral Consistency Alert</span>
              </div>
              <p className="text-neutral-200">{activeChar.consistencyAlert}</p>
            </div>
          )}

          {/* Casting Assistant: Audition Sides & Questions */}
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" />
                <span>AI Casting Director Assistant</span>
              </h3>
              <span className="text-[11px] text-neutral-400">Audition Package</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  Selected Audition Sides
                </span>
                <div className="p-3 rounded-lg bg-neutral-950 font-mono text-neutral-300 border border-neutral-800 italic">
                  "{activeChar.auditionSides}"
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  Director's Key Audition Questions
                </span>
                <ul className="space-y-1 text-neutral-300 list-disc list-inside">
                  {activeChar.auditionQuestions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 text-neutral-400">
                <strong className="text-neutral-300">Callback Notes: </strong>
                {activeChar.callbackNotes}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
