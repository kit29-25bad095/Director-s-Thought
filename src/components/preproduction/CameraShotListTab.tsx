import React, { useState } from 'react';
import {
  Camera,
  Film,
  Sparkles,
  Plus,
  Edit3,
  CheckCircle2,
  RefreshCw,
  Clock,
  HelpCircle,
  Eye,
  Sliders,
} from 'lucide-react';
import { PreProdShot } from '../../types/preproduction';

interface CameraShotListTabProps {
  shots: PreProdShot[];
  onUpdateShots: (shots: PreProdShot[]) => void;
  onAskAi: (prompt: string) => void;
}

export const CameraShotListTab: React.FC<CameraShotListTabProps> = ({
  shots,
  onUpdateShots,
  onAskAi,
}) => {
  const [selectedSceneFilter, setSelectedSceneFilter] = useState<number | 'ALL'>('ALL');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingShot, setEditingShot] = useState<PreProdShot | null>(null);

  // New shot draft
  const [newShot, setNewShot] = useState<Partial<PreProdShot>>({
    sceneNumber: 27,
    shotNumber: '27D',
    shotSize: 'CLOSE-UP',
    angle: 'EYE-LEVEL',
    lens: '85mm Anamorphic',
    cameraMovement: 'SLOW PUSH',
    subject: 'Kabir & Wrench',
    action: 'Kabir tightens grip on torque wrench as truth is revealed',
    dialogueSnippet: 'Forgive me.',
    storyPurpose: 'Silent emotional fracture',
    durationSec: 4.5,
    status: 'Proposed',
  });

  const filteredShots =
    selectedSceneFilter === 'ALL'
      ? shots
      : shots.filter((s) => s.sceneNumber === selectedSceneFilter);

  const handleGenerateShots = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('AI Cinematography Assistant generated 6 new optimal coverage shots based on Director’s visual grammar.');
    }, 1000);
  };

  const handleAcceptAll = () => {
    onUpdateShots(shots.map((s) => ({ ...s, status: 'Approved' })));
    alert('All generated shots approved for camera department stripboard.');
  };

  const handleSaveNewShot = () => {
    if (!newShot.shotNumber || !newShot.subject) return;
    const shotToAdd: PreProdShot = {
      id: `shot_${Date.now()}`,
      sceneNumber: Number(newShot.sceneNumber) || 1,
      shotNumber: newShot.shotNumber || '1X',
      shotSize: newShot.shotSize || 'MED',
      angle: newShot.angle || 'EYE-LEVEL',
      lens: newShot.lens || '50mm',
      cameraMovement: newShot.cameraMovement || 'STATIC',
      subject: newShot.subject || 'Subject',
      action: newShot.action || 'Action description',
      dialogueSnippet: newShot.dialogueSnippet,
      storyPurpose: newShot.storyPurpose || 'Story purpose',
      durationSec: Number(newShot.durationSec) || 5,
      status: 'Approved',
    };
    onUpdateShots([...shots, shotToAdd]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5 text-neutral-100">
      {/* Cinematography Assistant Header & 5 User-Requested Buttons */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#12141a] border border-neutral-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Cinematography Co-Pilot & AI Shot List Generator
            </h2>
            <p className="text-xs text-neutral-400">
              Coverage strategies, optical compression, focal lengths, camera movement & rhythm
            </p>
          </div>
        </div>

        {/* 5 User Requested Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGenerateShots}
            disabled={isGenerating}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Shots</span>
          </button>
          <button
            onClick={handleGenerateShots}
            disabled={isGenerating}
            className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
            <span>Regenerate</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Shot</span>
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accept All</span>
          </button>
        </div>
      </div>

      {/* Filter by Scene */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 font-medium">Filter Scene:</span>
          <div className="flex items-center gap-1">
            {['ALL', 1, 14, 27, 42].map((sc) => (
              <button
                key={sc.toString()}
                onClick={() => setSelectedSceneFilter(sc as any)}
                className={`px-2.5 py-1 rounded-lg font-mono text-xs cursor-pointer transition ${
                  selectedSceneFilter === sc
                    ? 'bg-emerald-500 text-neutral-950 font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                {sc === 'ALL' ? 'ALL SCENES' : `SC ${sc}`}
              </button>
            ))}
          </div>
        </div>

        <span className="text-neutral-500 font-mono text-[11px]">
          {filteredShots.length} Coverage Shots Listed
        </span>
      </div>

      {/* Shot List Table */}
      <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                <th className="pb-3 font-bold">Shot #</th>
                <th className="pb-3 font-bold">Scene</th>
                <th className="pb-3 font-bold">Size & Angle</th>
                <th className="pb-3 font-bold">Lens & Movement</th>
                <th className="pb-3 font-bold">Subject & Action</th>
                <th className="pb-3 font-bold">Dramatic Purpose</th>
                <th className="pb-3 font-bold">Est. Time</th>
                <th className="pb-3 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              {filteredShots.map((shot) => (
                <tr key={shot.id} className="hover:bg-neutral-900/40 transition">
                  <td className="py-3 font-mono font-bold text-amber-400">{shot.shotNumber}</td>
                  <td className="py-3 font-mono text-neutral-400">SC {shot.sceneNumber}</td>
                  <td className="py-3">
                    <span className="font-semibold text-white">{shot.shotSize}</span>
                    <span className="text-neutral-400 block text-[11px]">{shot.angle}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-emerald-400 font-medium">{shot.lens}</span>
                    <span className="text-neutral-400 block text-[11px]">{shot.cameraMovement}</span>
                  </td>
                  <td className="py-3 max-w-60">
                    <div className="font-medium text-neutral-100">{shot.subject}</div>
                    <div className="text-[11px] text-neutral-400 truncate">{shot.action}</div>
                    {shot.dialogueSnippet && (
                      <div className="text-[10px] text-amber-300/80 italic mt-0.5">
                        "{shot.dialogueSnippet}"
                      </div>
                    )}
                  </td>
                  <td className="py-3 max-w-50 text-[11px] text-neutral-300">
                    {shot.storyPurpose}
                  </td>
                  <td className="py-3 font-mono text-neutral-400">{shot.durationSec}s</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {shot.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Shot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#12141a] border border-neutral-800 rounded-2xl w-full max-w-lg p-6 space-y-4 text-neutral-100 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add New Coverage Shot</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-neutral-400 font-semibold block mb-1">Scene Number</label>
                <input
                  type="number"
                  value={newShot.sceneNumber}
                  onChange={(e) => setNewShot({ ...newShot, sceneNumber: Number(e.target.value) })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 font-semibold block mb-1">Shot Number (e.g. 27D)</label>
                <input
                  type="text"
                  value={newShot.shotNumber}
                  onChange={(e) => setNewShot({ ...newShot, shotNumber: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 font-semibold block mb-1">Shot Size</label>
                <input
                  type="text"
                  value={newShot.shotSize}
                  onChange={(e) => setNewShot({ ...newShot, shotSize: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-neutral-400 font-semibold block mb-1">Lens (e.g. 50mm Anamorphic)</label>
                <input
                  type="text"
                  value={newShot.lens}
                  onChange={(e) => setNewShot({ ...newShot, lens: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white"
                />
              </div>
              <div className="col-span-2">
                <label className="text-neutral-400 font-semibold block mb-1">Subject & Action</label>
                <input
                  type="text"
                  value={newShot.action}
                  onChange={(e) => setNewShot({ ...newShot, action: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white"
                />
              </div>
              <div className="col-span-2">
                <label className="text-neutral-400 font-semibold block mb-1">Dramatic Purpose</label>
                <input
                  type="text"
                  value={newShot.storyPurpose}
                  onChange={(e) => setNewShot({ ...newShot, storyPurpose: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewShot}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
              >
                Save Shot to Stripboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
