import React, { useState } from 'react';
import {
  Scissors,
  Film,
  Volume2,
  Sparkles,
  Sliders,
  Subtitles,
  Download,
  CheckCircle2,
  Clock,
  Play,
  FolderDown,
  ArrowRight,
  Disc,
} from 'lucide-react';
import { Project, Role, PostProductionTask } from '../../types';
import { INITIAL_POST_PRODUCTION_TASKS } from '../../data/suiteSampleData';

interface PostProductionViewProps {
  project: Project;
  onNavigateTab: (tab: any) => void;
  activeRole: Role;
}

export const PostProductionView: React.FC<PostProductionViewProps> = ({
  project,
  onNavigateTab,
  activeRole,
}) => {
  const [tasks, setTasks] = useState<PostProductionTask[]>(INITIAL_POST_PRODUCTION_TASKS);
  const [activeWorkflowStage, setActiveWorkflowStage] = useState<
    'import' | 'assemble' | 'sound-color' | 'render'
  >('assemble');
  const [activeTab, setActiveTab] = useState<
    'video' | 'audio' | 'vfx' | 'sfx' | 'color' | 'subtitles' | 'export'
  >('video');

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);

  // Footage rolls in Ingest stage
  const [footageRolls, setFootageRolls] = useState([
    { id: 'roll-1', name: 'A001_DAY1_CLASSROOM_RUSHES', camera: 'Sony FX6 (XAVC-I 4K)', clips: 18, size: '248 GB', status: 'Verified' },
    { id: 'roll-2', name: 'B001_DAY1_B_CAM_CLOSEUPS', camera: 'Sony FX3 (ProRes RAW)', clips: 22, size: '184 GB', status: 'Verified' },
    { id: 'roll-3', name: 'AUD_DAY1_SOUND_ZOOM_F8', camera: 'Zoom F8n (32-bit Float)', clips: 18, size: '14 GB', status: 'Synced' },
    { id: 'roll-4', name: 'A002_DAY2_STREET_NIGHT', camera: 'Sony FX6 (S-Log3 / Cine EI)', clips: 14, size: '196 GB', status: 'Ingesting' },
  ]);
  const [newRollName, setNewRollName] = useState('');
  const [isAddingRoll, setIsAddingRoll] = useState(false);

  const handleAddRoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRollName.trim()) return;
    setFootageRolls((prev) => [
      ...prev,
      {
        id: `roll-${Date.now()}`,
        name: newRollName.trim().toUpperCase(),
        camera: 'Cinema Camera (RAW / Log)',
        clips: 12,
        size: '120 GB',
        status: 'Verified',
      },
    ]);
    setNewRollName('');
    setIsAddingRoll(false);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: t.status === 'Completed' ? 'In Progress' : 'Completed',
              progress: t.status === 'Completed' ? 50 : 100,
            }
          : t
      )
    );
  };

  const handleSimulateExport = () => {
    setIsExporting(true);
    setExportProgress(10);
    setExportComplete(false);

    const intv = setInterval(() => {
      setExportProgress((p) => {
        if (p >= 100) {
          clearInterval(intv);
          setIsExporting(false);
          setExportComplete(true);
          return 100;
        }
        return p + 20;
      });
    }, 400);
  };

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const overallProgress = Math.round((completedCount / tasks.length) * 100);

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'export') return true;
    if (activeTab === 'video') return t.department === 'Video Editing';
    if (activeTab === 'audio') return t.department === 'Audio Editing';
    if (activeTab === 'vfx') return t.department === 'VFX';
    if (activeTab === 'sfx') return t.department === 'SFX';
    if (activeTab === 'color') return t.department === 'Color Grading';
    if (activeTab === 'subtitles') return t.department === 'Subtitles';
    return true;
  });

  return (
    <div className="h-full overflow-y-auto bg-[#f4f6fb] text-slate-800 p-6 sm:p-8 lg:p-10 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Post-production</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Assemble edits, mix soundscapes, grade colors, and generate festival master deliveries
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('export')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Final Delivery</span>
            </button>
          </div>
        </div>

        {/* 4-Step Pipeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs text-xs font-medium">
          {(
            [
              { id: 'import', label: '1. Import Footage', icon: <FolderDown className="w-4 h-4" /> },
              { id: 'assemble', label: '2. Assemble Edit', icon: <Scissors className="w-4 h-4" /> },
              { id: 'sound-color', label: '3. Sound & Color', icon: <Sliders className="w-4 h-4" /> },
              { id: 'render', label: '4. Final Render', icon: <Disc className="w-4 h-4" /> },
            ] as const
          ).map((st) => (
            <button
              key={st.id}
              onClick={() => {
                setActiveWorkflowStage(st.id);
                if (st.id === 'render') setActiveTab('export');
                else if (st.id === 'sound-color' && (activeTab === 'video' || activeTab === 'export')) setActiveTab('audio');
                else if (st.id === 'assemble') setActiveTab('video');
              }}
              className={`py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 ${
                activeWorkflowStage === st.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st.icon}
              <span>{st.label}</span>
            </button>
          ))}
        </div>

        {/* INGEST STAGE VIEW */}
        {activeWorkflowStage === 'import' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Footage Ingest & Media Management</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verify camera cards, dual-system audio sync, and ProRes proxy transcoding
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingRoll(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer transition shadow-xs flex items-center gap-1.5"
                >
                  <FolderDown className="w-3.5 h-3.5" />
                  <span>Log Camera Roll</span>
                </button>
                <button
                  onClick={() => {
                    setActiveWorkflowStage('assemble');
                    setActiveTab('video');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5"
                >
                  <span>Assemble Edit →</span>
                </button>
              </div>
            </div>

            {/* Ingest Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">LOCAL STORAGE VOLUME</span>
                <p className="text-sm font-bold text-slate-900">642 GB / 2.0 TB Used</p>
                <p className="text-slate-500">Fast NVMe RAID 5 Scratch</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">CHECKSUM STATUS</span>
                <p className="text-sm font-bold text-emerald-600">MD5 / xxHash64 Verified</p>
                <p className="text-slate-500">100% Bit-for-bit parity</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">PROXY PIPELINE</span>
                <p className="text-sm font-bold text-blue-600">1080p ProRes Proxy Ready</p>
                <p className="text-slate-500">Smooth real-time playback</p>
              </div>
            </div>

            {/* Inline Log Roll Form */}
            {isAddingRoll && (
              <form onSubmit={handleAddRoll} className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900">Log New Camera / Audio Roll</span>
                  <button
                    type="button"
                    onClick={() => setIsAddingRoll(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. A003_DAY2_INTERIOR_NIGHT"
                    value={newRollName}
                    onChange={(e) => setNewRollName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    Log Ingest
                  </button>
                </div>
              </form>
            )}

            {/* Rolls Grid */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block px-1">
                Ingested Media Rolls ({footageRolls.length})
              </span>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {footageRolls.map((roll) => (
                  <div key={roll.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                        <FolderDown className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-mono text-slate-900">{roll.name}</h4>
                        <p className="text-[11px] text-slate-400">{roll.camera} • {roll.clips} takes</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-slate-500 font-mono font-medium">{roll.size}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        {roll.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGES 2, 3, 4: Department Pills and Task lists */}
        {activeWorkflowStage !== 'import' && (
          <>
            {/* Department Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'video', label: 'Video Editing' },
                  { id: 'audio', label: 'Audio Editing' },
                  { id: 'vfx', label: 'VFX' },
                  { id: 'sfx', label: 'SFX' },
                  { id: 'color', label: 'Color Grading' },
                  { id: 'subtitles', label: 'Subtitles' },
                  { id: 'export', label: 'Festival Export' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'export') setActiveWorkflowStage('render');
                    else if (tab.id === 'video') setActiveWorkflowStage('assemble');
                    else setActiveWorkflowStage('sound-color');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overall Progress Widget */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">Post-Production Completion</span>
                  <span className="text-xs font-bold text-blue-600">{overallProgress}%</span>
                </div>
                <p className="text-xs text-slate-500">
                  {completedCount} of {tasks.length} major deliverables completed
                </p>
              </div>

              <div className="w-full sm:w-64 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            {/* EXPORT PANEL */}
            {activeTab === 'export' ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900">Festival Master Delivery</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Generate ProRes 422 HQ 4K Master, DCI-P3 Color space, and 5.1 Surround deliverables
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">CONTAINER</span>
                    <p className="font-bold text-slate-900">Apple ProRes 422 HQ (.mov)</p>
                    <p className="text-slate-500">3840 × 2160 @ 24.000 fps</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">AUDIO STREAM</span>
                    <p className="font-bold text-slate-900">24-bit 48kHz LPCM 5.1</p>
                    <p className="text-slate-500">Surround + Stereo Lt/Rt</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">SUBTITLES</span>
                    <p className="font-bold text-slate-900">English SMPTE-TT / SRT</p>
                    <p className="text-slate-500">Embedded Closed Captions</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    disabled={isExporting}
                    onClick={handleSimulateExport}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold cursor-pointer transition shadow-xs flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isExporting ? `Rendering... (${exportProgress}%)` : 'Render & Package Master'}</span>
                  </button>

                  {exportComplete && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Master package generated successfully!</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* TASKS LIST */
              <div className="space-y-3">
                {filteredTasks.map((task) => {
                  const isDone = task.status === 'Completed';
                  return (
                    <div
                      key={task.id}
                      onClick={() => handleToggleTask(task.id)}
                      className={`bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:border-slate-300 transition ${
                        isDone ? 'bg-slate-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <button
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border transition shrink-0 mt-0.5 sm:mt-0 ${
                            isDone
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 bg-white text-transparent'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4
                              className={`text-sm font-bold transition ${
                                isDone ? 'line-through text-slate-400' : 'text-slate-900'
                              }`}
                            >
                              {task.title}
                            </h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                              {task.department}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{task.notes}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs shrink-0 self-end sm:self-center">
                        <span className="text-slate-400 font-medium">{task.lead}</span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isDone
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
