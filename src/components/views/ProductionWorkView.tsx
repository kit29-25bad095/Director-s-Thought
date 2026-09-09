import React, { useState } from 'react';
import {
  Video,
  Clapperboard,
  Camera,
  Sun,
  UserCheck,
  Volume2,
  CheckCircle2,
  XCircle,
  Plus,
  Play,
  RotateCcw,
  Star,
  ChevronRight,
  Clock,
  Layers,
} from 'lucide-react';
import { Project, Role, ProductionWorkShot, ProductionTake } from '../../types';
import { INITIAL_PRODUCTION_WORK_SHOTS } from '../../data/suiteSampleData';

interface ProductionWorkViewProps {
  project: Project;
  onNavigateTab: (tab: any) => void;
  activeRole: Role;
}

export const ProductionWorkView: React.FC<ProductionWorkViewProps> = ({
  project,
  onNavigateTab,
  activeRole,
}) => {
  const [shots, setShots] = useState<ProductionWorkShot[]>(INITIAL_PRODUCTION_WORK_SHOTS);
  const [activeShotId, setActiveShotId] = useState<string>(shots[0]?.id || 'shot_sc1_01');

  const activeShot = shots.find((s) => s.id === activeShotId) || shots[0];

  const [isAddingTake, setIsAddingTake] = useState(false);
  const [newTakeDuration, setNewTakeDuration] = useState('00:45');
  const [newTakeResult, setNewTakeResult] = useState<'Good' | 'Circled' | 'NG' | 'Hold'>('Good');
  const [newTakeNotes, setNewTakeNotes] = useState('');

  const [isAddingShot, setIsAddingShot] = useState(false);
  const [newShotNumber, setNewShotNumber] = useState(`Shot 0${shots.length + 1}`);
  const [newCameraAngle, setNewCameraAngle] = useState('Medium Shot');
  const [newLens, setNewLens] = useState('35mm Prime');
  const [newLighting, setNewLighting] = useState('Key daylight with soft bounce');
  const [newBlocking, setNewBlocking] = useState('Actor moves from A to B');
  const [newSound, setNewSound] = useState('Boom mic + Lav');

  const handleAddTake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeShot) return;

    const nextTakeNum = activeShot.takes.length + 1;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newTake: ProductionTake = {
      id: `tk_${Date.now()}`,
      takeNumber: nextTakeNum,
      status: newTakeResult === 'Circled' || newTakeResult === 'Good' ? 'GOOD' : 'NG',
      duration: newTakeDuration || '00:30',
      result: newTakeResult,
      isCircled: newTakeResult === 'Circled',
      notes: newTakeNotes.trim() || 'Shot on set.',
      timestamp: nowTime,
    };

    setShots((prev) =>
      prev.map((s) => (s.id === activeShot.id ? { ...s, takes: [...s.takes, newTake] } : s))
    );

    setNewTakeNotes('');
    setIsAddingTake(false);
  };

  const handleToggleCircled = (shotId: string, takeId?: string, takeNumber?: number) => {
    setShots((prev) =>
      prev.map((s) => {
        if (s.id !== shotId) return s;
        return {
          ...s,
          takes: s.takes.map((t) => {
            const isMatch =
              (takeId && t.id === takeId) ||
              (takeNumber !== undefined && t.takeNumber === takeNumber);
            if (!isMatch) return t;
            const newCircled = !t.isCircled;
            return {
              ...t,
              isCircled: newCircled,
              result: newCircled ? 'Circled' : 'Good',
            };
          }),
        };
      })
    );
  };

  const handleAddShotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newShotItem: ProductionWorkShot = {
      id: `shot_${Date.now()}`,
      sceneNumber: 'Scene 01',
      shotNumber: newShotNumber,
      cameraAngle: newCameraAngle,
      lens: newLens,
      lightingSetup: newLighting,
      actorBlocking: newBlocking,
      soundRecording: {
        micType: newSound,
        roomToneCaptured: true,
        frequencyNotes: 'Clean audio track',
        peakDb: '-18 dB',
      },
      status: 'Shooting',
      takes: [
        {
          id: `tk_${Date.now()}_1`,
          takeNumber: 1,
          status: 'GOOD',
          duration: '00:30',
          result: 'Good',
          isCircled: false,
          notes: 'First rehearsal take.',
          timestamp: '10:00 AM',
        },
      ],
    };

    setShots((prev) => [...prev, newShotItem]);
    setActiveShotId(newShotItem.id);
    setIsAddingShot(false);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f4f6fb] text-slate-800 p-6 sm:p-8 lg:p-10 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Production Work</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Live set logging: Scene → Shot → Take with camera angles, lenses, and circled takes
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddingShot(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Shot</span>
            </button>
            <button
              onClick={() => onNavigateTab('post-production')}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-600 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-xs"
            >
              <span>Post-Production →</span>
            </button>
          </div>
        </div>

        {/* Scene Banner */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Clapperboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  CURRENT SCENE
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600">INT. CLASSROOM - DAY</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                Scene 01: Arun enters empty room, discovers missing team
              </h2>
            </div>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Shots List (Left Column) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Planned Shots ({shots.length})
              </span>
            </div>

            <div className="space-y-2">
              {shots.map((s) => {
                const isActive = s.id === activeShotId;
                const circledCount = s.takes.filter((t) => t.isCircled).length;

                return (
                  <div
                    key={s.id}
                    onClick={() => setActiveShotId(s.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer ${
                      isActive
                        ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                        : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600">
                        {s.shotNumber}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                        {s.takes.length} Takes {circledCount > 0 ? `• ★ ${circledCount}` : ''}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-slate-900 mt-1">
                      {s.cameraAngle}
                    </div>

                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <span>Lens: {s.lens}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Shot & Takes Table (Right Column) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            {activeShot && (
              <div className="space-y-6">
                {/* Shot Specs Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {activeShot.shotNumber} — {activeShot.cameraAngle}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Lens: {activeShot.lens}</p>
                  </div>

                  <button
                    onClick={() => setIsAddingTake(true)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log Next Take</span>
                  </button>
                </div>

                {/* Technical Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">LIGHTING</span>
                    <p className="font-semibold text-slate-800 truncate">{activeShot.lightingSetup}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">BLOCKING</span>
                    <p className="font-semibold text-slate-800 truncate">{activeShot.actorBlocking}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">AUDIO</span>
                    <p className="font-semibold text-slate-800 truncate">
                      {typeof activeShot.soundRecording === 'string'
                        ? activeShot.soundRecording
                        : activeShot.soundRecording?.micType || 'Boom + Lav'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">STATUS</span>
                    <p className="font-semibold text-blue-600 truncate">{activeShot.status}</p>
                  </div>
                </div>

                {/* Takes Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Recorded Takes Log
                  </h4>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                        <tr>
                          <th className="py-2.5 px-3">Take #</th>
                          <th className="py-2.5 px-3">Result</th>
                          <th className="py-2.5 px-3">Duration</th>
                          <th className="py-2.5 px-3">Time</th>
                          <th className="py-2.5 px-3">Circled (Editor Star)</th>
                          <th className="py-2.5 px-3">Director Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans">
                        {activeShot.takes.map((tk, idx) => {
                          const takeKey = tk.id || `take_${activeShot.id}_${tk.takeNumber}_${idx}`;
                          return (
                            <tr key={takeKey} className="hover:bg-slate-50/70 transition">
                              <td className="py-2.5 px-3 font-bold text-slate-900">
                                Take 0{tk.takeNumber}
                              </td>
                              <td className="py-2.5 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    tk.result === 'Circled' || tk.result === 'Good'
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : 'bg-rose-50 text-rose-700'
                                  }`}
                                >
                                  {tk.result || (tk.status === 'CIRCLE_TAKE' ? 'Circled' : 'Good')}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 font-mono text-slate-600">{tk.duration || '00:30'}</td>
                              <td className="py-2.5 px-3 text-slate-400">{tk.timestamp || tk.timecode || '10:00 AM'}</td>
                              <td className="py-2.5 px-3">
                                <button
                                  onClick={() => handleToggleCircled(activeShot.id, tk.id, tk.takeNumber)}
                                  className={`px-2 py-1 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center gap-1 ${
                                    tk.isCircled
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                                  }`}
                                >
                                  <Star
                                    className={`w-3.5 h-3.5 ${
                                      tk.isCircled ? 'fill-amber-500 text-amber-500' : ''
                                    }`}
                                  />
                                  <span>{tk.isCircled ? 'Circled' : 'Mark'}</span>
                                </button>
                              </td>
                              <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate">
                                {tk.notes}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Shot Modal */}
      {isAddingShot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add Planned Shot</h3>
              <button
                onClick={() => setIsAddingShot(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddShotSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Shot Number / Name</label>
                <input
                  type="text"
                  value={newShotNumber}
                  onChange={(e) => setNewShotNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Camera Framing</label>
                  <select
                    value={newCameraAngle}
                    onChange={(e) => setNewCameraAngle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="Wide Shot">Wide Shot</option>
                    <option value="Medium Shot">Medium Shot</option>
                    <option value="Close-up">Close-up</option>
                    <option value="Extreme Close-up">Extreme Close-up</option>
                    <option value="Over-the-Shoulder">Over-the-Shoulder</option>
                    <option value="Low Angle">Low Angle</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Lens Spec</label>
                  <input
                    type="text"
                    value={newLens}
                    onChange={(e) => setNewLens(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                    placeholder="e.g. 35mm Prime"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Lighting Setup</label>
                <input
                  type="text"
                  value={newLighting}
                  onChange={(e) => setNewLighting(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  placeholder="e.g. Key daylight + rim light"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Actor Blocking / Action</label>
                <input
                  type="text"
                  value={newBlocking}
                  onChange={(e) => setNewBlocking(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  placeholder="e.g. Actor enters from door, crosses to desk"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Audio / Sound Setup</label>
                <input
                  type="text"
                  value={newSound}
                  onChange={(e) => setNewSound(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  placeholder="e.g. MKH416 Boom + Wireless Lav"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingShot(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
                >
                  Save Shot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Take Modal */}
      {isAddingTake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Log Take 0{(activeShot?.takes?.length || 0) + 1} for {activeShot?.shotNumber}
              </h3>
              <button
                onClick={() => setIsAddingTake(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTake} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Take Result</label>
                  <select
                    value={newTakeResult}
                    onChange={(e) => setNewTakeResult(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="Good">Good</option>
                    <option value="Circled">Circled (Print It!)</option>
                    <option value="Hold">Hold</option>
                    <option value="NG">NG (No Good)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Duration (mm:ss)</label>
                  <input
                    type="text"
                    value={newTakeDuration}
                    onChange={(e) => setNewTakeDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                    placeholder="00:35"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Director / Script Notes</label>
                <textarea
                  value={newTakeNotes}
                  onChange={(e) => setNewTakeNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 h-20 resize-none"
                  placeholder="Notes on performance, camera motion, sound quality..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingTake(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
                >
                  Log Take
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
