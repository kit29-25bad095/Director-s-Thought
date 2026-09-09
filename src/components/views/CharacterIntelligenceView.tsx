import React, { useState } from 'react';
import {
  Users,
  Heart,
  Target,
  Sparkles,
  Shield,
  MessageSquare,
  ChevronRight,
  GitCommit,
} from 'lucide-react';
import { Character } from '../../types';

interface CharacterIntelligenceViewProps {
  characters: Character[];
}

export const CharacterIntelligenceView: React.FC<CharacterIntelligenceViewProps> = ({
  characters,
}) => {
  const [selectedCharId, setSelectedCharId] = useState<string>(characters[0]?.id || '');
  const activeChar = characters.find((c) => c.id === selectedCharId) || characters[0];

  return (
    <div id="character-intel-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <Users className="w-4 h-4 text-purple-600" />
            <span>Dramatic Character Psychology</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            CHARACTER INTELLIGENCE & ARC TRACKER
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Deep character psychology mapping internal needs vs external wants, fatal flaws, dialogue voice signatures, and interpersonal tension matrix.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Tracked Characters:</span>
          <span className="text-xs font-bold bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full">
            {characters.length} Primary Cast
          </span>
        </div>
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Character List */}
        <div className="space-y-3">
          {characters.map((char) => {
            const isSelected = char.id === activeChar?.id;
            return (
              <button
                key={char.id}
                onClick={() => setSelectedCharId(char.id)}
                className={`w-full text-left p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-purple-50/80 border-purple-400 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{char.name}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold">
                      {char.roleInStory}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{char.actorMatch}</div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-purple-700 font-semibold">
                    {char.scenesCount} Scenes
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right 2 Columns: Character Dossier */}
        {activeChar && (
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                    {activeChar.roleInStory}
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    {activeChar.name}
                  </h2>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Attached Actor: <span className="font-semibold text-slate-800">{activeChar.actorMatch}</span>
                  </div>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-purple-50 text-purple-800 font-bold border border-purple-200">
                  {activeChar.scenesCount} Screenplay Scenes
                </span>
              </div>

              {/* Want vs Need & Flaw Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                    <span>External Want:</span>
                  </div>
                  <p className="text-slate-900 font-semibold">{activeChar.want}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-purple-700 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-purple-600" />
                    <span>Internal Need:</span>
                  </div>
                  <p className="text-slate-900 font-semibold">{activeChar.need}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-amber-700 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                    <span>Fatal Flaw / Wound:</span>
                  </div>
                  <p className="text-slate-900 font-semibold">{activeChar.flaw}</p>
                </div>
              </div>

              {/* Voice & Dialogue Traits */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                  <span>Dialogue Signature & Subtext Style:</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {activeChar.voiceTraits}
                </p>
              </div>

              {/* Interpersonal Relationships */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Relationships & Dynamic Tension
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeChar.relationships.map((rel, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-slate-200 bg-white space-y-0.5"
                    >
                      <div className="font-bold text-purple-800">{rel.with}</div>
                      <div className="text-[11px] text-slate-600 leading-tight">
                        {rel.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
