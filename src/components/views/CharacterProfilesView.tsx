import React, { useState } from 'react';
import {
  User,
  Plus,
  Edit3,
  Trash2,
  Camera,
  Shirt,
  Scissors,
  Bookmark,
  ChevronRight,
  CheckCircle2,
  Save,
  ArrowRight,
} from 'lucide-react';
import { Character, Project, Role } from '../../types';
import { INITIAL_CHARACTERS_ARUN } from '../../data/suiteSampleData';
import { INITIAL_CHARACTERS } from '../../data/initialData';

interface CharacterProfilesViewProps {
  project: Project;
  onNavigateTab: (tab: any) => void;
  activeRole: Role;
}

export const CharacterProfilesView: React.FC<CharacterProfilesViewProps> = ({
  project,
  onNavigateTab,
  activeRole,
}) => {
  const initialList =
    project.id === 'proj_first_take'
      ? INITIAL_CHARACTERS_ARUN
      : [...INITIAL_CHARACTERS_ARUN, ...INITIAL_CHARACTERS];

  const [characters, setCharacters] = useState<Character[]>(initialList);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(characters[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Character>>(characters[0]);

  const handleSelect = (char: Character) => {
    setSelectedCharacter(char);
    setFormData(char);
    setIsEditing(false);
  };

  const handleAddNew = () => {
    const newChar: Character = {
      id: `char_${Date.now()}`,
      name: 'New Character',
      age: 24,
      role: 'Supporting Cast',
      want: 'Wants to prove their worth on set',
      need: 'Needs to learn collaboration',
      personality: 'Energetic, observant, outspoken',
      flaw: 'Impatient under stress',
      internalConflict: 'Struggles with authority',
      externalConflict: 'Tight shooting deadlines',
      goal: 'Deliver shots on time',
      motivation: 'Passionate about cinema',
      fear: 'Letting the crew down',
      strength: 'Quick problem solver',
      backstory: 'Film school junior',
      secret: 'Has not slept in two days',
      arc: 'Learns to trust the team',
      firstAppearance: 'Scene 1',
      lastAppearance: 'Scene 2',
      importantScenes: [1, 2],
      relationships: [],
      costume: 'Casual street wear, shoulder messenger bag',
      makeup: 'Natural tousled hair, practical look',
      referenceImages: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      ],
    };
    setCharacters([...characters, newChar]);
    setSelectedCharacter(newChar);
    setFormData(newChar);
    setIsEditing(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = characters.map((c) =>
      c.id === selectedCharacter.id ? ({ ...c, ...formData } as Character) : c
    );
    setCharacters(updated);
    setSelectedCharacter({ ...selectedCharacter, ...formData } as Character);
    setIsEditing(false);
  };

  const handleDelete = (id: string) => {
    const remaining = characters.filter((c) => c.id !== id);
    setCharacters(remaining);
    if (remaining.length > 0) {
      setSelectedCharacter(remaining[0]);
      setFormData(remaining[0]);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f4f6fb] text-slate-800 p-6 sm:p-8 lg:p-10 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Characters</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Character profiles, visual continuity, costume notes, and script arcs
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddNew}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Character</span>
            </button>
            <button
              onClick={() => onNavigateTab('production-design')}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-xs"
            >
              <span>Production Design →</span>
            </button>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Character Roster List (Left Column) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Cast Roster ({characters.length})
              </span>
            </div>

            <div className="space-y-2">
              {characters.map((char) => {
                const isSelected = selectedCharacter?.id === char.id;
                return (
                  <div
                    key={char.id}
                    onClick={() => handleSelect(char)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                        : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      {char.referenceImages && char.referenceImages[0] ? (
                        <img
                          src={char.referenceImages[0]}
                          alt={char.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 text-xs">
                          {char.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-slate-900 truncate">
                          {char.name}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">Age {char.age}</span>
                      </div>
                      <div className="text-xs text-blue-600 font-medium truncate">
                        {char.role}
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition ${
                        isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-400'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Character Detailed Profile (Right Column) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            {selectedCharacter && !isEditing ? (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      {selectedCharacter.referenceImages && selectedCharacter.referenceImages[0] ? (
                        <img
                          src={selectedCharacter.referenceImages[0]}
                          alt={selectedCharacter.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 text-lg">
                          {selectedCharacter.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-900">{selectedCharacter.name}</h2>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold">
                          Age {selectedCharacter.age}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-500 mt-0.5">
                        {selectedCharacter.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer transition flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Edit Profile</span>
                    </button>
                    {characters.length > 1 && (
                      <button
                        onClick={() => handleDelete(selectedCharacter.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Delete Character"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Core Narrative Arc Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      DRAMATIC WANT (GOAL)
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {selectedCharacter.want || 'Wants to complete his film before sundown.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                      INTERNAL NEED (ARC)
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {selectedCharacter.need || 'Needs to trust his crew instead of micromanaging.'}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Personality & Traits</label>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                      {selectedCharacter.personality}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Costume / Wardrobe</label>
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                        {selectedCharacter.visualStyle || 'Everyday film student casual.'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Hair & Makeup</label>
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                        {selectedCharacter.hairAndMakeup || 'Natural, unstyled, realistic.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* EDIT FORM */
              <form onSubmit={handleSaveForm} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Edit Character Profile</h3>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={formData.age || 25}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Archetype</label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Personality</label>
                  <textarea
                    value={formData.personality || ''}
                    onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                    rows={3}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
