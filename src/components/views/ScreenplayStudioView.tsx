import React, { useState } from 'react';
import {
  Clapperboard,
  Sparkles,
  Layers,
  Save,
  CheckCircle2,
  Film,
  MapPin,
  Clock,
  Send,
  RefreshCw,
  Sliders,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { RoadmapItem, Character, Project } from '../../types';
import { generateScreenplayScene } from '../../services/geminiService';

interface ScreenplayStudioViewProps {
  project: Project;
  roadmapItems: RoadmapItem[];
  characters: Character[];
}

interface SceneItem {
  number: number;
  slugline: string;
  roadmapId: string;
  pages: number;
  content: string;
}

export const ScreenplayStudioView: React.FC<ScreenplayStudioViewProps> = ({
  project,
  roadmapItems,
  characters,
}) => {
  const initialScenes: SceneItem[] = [
    {
      number: 1,
      slugline: 'EXT. LEH VALLEY OBSERVATORY - DAWN',
      roadmapId: 'RM-01',
      pages: 2.5,
      content: `SCENE 1
EXT. LEH VALLEY OBSERVATORY - DAWN

The Himalayan crests are jagged knives cutting through indigo fog. Wind HOWLS through the frozen prayer flags.

DR. KABIR SEN (40s, hollow-eyed, clad in thermal flight gear) adjusts the primary optical collimator. The brass fittings are rimed with ice.

His fingers are raw, bleeding into the wool liner of his gloves.

KABIR
(into field dictaphone)
Solar calibration delta is minus seven percent. We are not experiencing seasonal fluctuation. The coronal cycle has severed.

Static crackles from the transceiver. A beacon light flashes AMBER.`,
    },
    {
      number: 14,
      slugline: 'INT. HELIOS-7 CONTROL ROOM - DAY',
      roadmapId: 'RM-14',
      pages: 3.0,
      content: `SCENE 14
INT. HELIOS-7 CONTROL ROOM - DAY

Monitors hum with real-time telemetry. Outside the reinforced quartz viewport, Earth is a pale crescent swallowed by creeping darkness.

MAYA RAO (30s, military-sharp, bearing the burn scars of the re-entry crash) slams a magnetic containment seal into place.

MAYA
The secondary solar valve isn't responding to the digital override.

Kabir enters, wiping coolant grease from his neck.

KABIR
Because the override was manually locked six hours before we cleared low orbit.

Maya turns sharply.

MAYA
By who?

Kabir doesn't answer. He turns his gaze toward the cold telemetry readout.`,
    },
    {
      number: 27,
      slugline: 'INT. HELIOS-7 AUXILIARY VAULT - NIGHT',
      roadmapId: 'RM-27',
      pages: 3.8,
      content: `SCENE 27
INT. HELIOS-7 AUXILIARY VAULT - NIGHT

The air is thin, tasting of burnt copper and ozone. A solitary red warning beacon sweeps over the frosted bulkheads.

Kabir stands motionless by the pressure gauge, his breath misting in the cold air.

Maya enters behind him, holding the encrypted military datapad.

MAYA
The flight recorder log wasn't an automatic purge. It had your biometric stamp.

Kabir looks down at his bruised hands.

KABIR
You wouldn't have survived the atmospheric drop without those reserves.

MAYA
(stepping forward, voice cracking)
You took a man's life to save mine. Did you ever plan on telling me?

Kabir looks into her eyes for the first time in six months.

KABIR
If we don't align the solar sails before perihelion, none of our sins will matter anyway.`,
    },
  ];

  const [scenes, setScenes] = useState<SceneItem[]>(initialScenes);
  const [activeSceneNumber, setActiveSceneNumber] = useState(27);
  const [editorContent, setEditorContent] = useState(
    initialScenes.find((s) => s.number === 27)?.content || ''
  );
  const [aiInstructions, setAiInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('All changes saved');

  const currentScene = scenes.find((s) => s.number === activeSceneNumber) || scenes[0];
  const linkedRoadmap = roadmapItems.find((r) => r.id === currentScene.roadmapId);

  const handleSelectScene = (scene: SceneItem) => {
    // Save current before switching
    setScenes((prev) =>
      prev.map((s) => (s.number === currentScene.number ? { ...s, content: editorContent } : s))
    );
    setActiveSceneNumber(scene.number);
    setEditorContent(scene.content);
  };

  const handleSave = () => {
    setScenes((prev) =>
      prev.map((s) => (s.number === currentScene.number ? { ...s, content: editorContent } : s))
    );
    setSaveStatus('Saved at ' + new Date().toLocaleTimeString());
  };

  const handleGenerateOrRefine = async () => {
    if (isGenerating || !linkedRoadmap) return;
    setIsGenerating(true);

    try {
      const res = await generateScreenplayScene({
        sceneNumber: currentScene.number,
        roadmapItem: linkedRoadmap,
        characters,
        instructions: aiInstructions,
        previousScene: editorContent,
      });

      if (res && res.screenplayText) {
        setEditorContent(res.screenplayText);
        setSaveStatus('AI Scene draft generated');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="screenplay-studio-view" className="space-y-4 pb-12 max-w-7xl mx-auto select-none">
      {/* Studio Header */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Clapperboard className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              SCREENPLAY STUDIO
            </h1>
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <span>{project.name}</span>
              <span>•</span>
              <span>Draft 04</span>
              <span>•</span>
              <span className="text-emerald-600 font-semibold">{saveStatus}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Scene</span>
          </button>
        </div>
      </div>

      {/* 3-Column Screenplay Workspace: Scene List | Screenplay Editor | Blueprint Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (3 cols): Scene Navigator */}
        <div className="lg:col-span-3 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            <span>Scenes ({scenes.length})</span>
            <span>46 Total</span>
          </div>

          <div className="space-y-1.5">
            {scenes.map((s) => {
              const isSelected = s.number === activeSceneNumber;
              return (
                <button
                  key={s.number}
                  onClick={() => handleSelectScene(s)}
                  className={`w-full text-left p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-50/80 border-purple-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-mono font-bold text-purple-700">
                      SCENE {s.number}
                    </span>
                    <span className="text-slate-400 font-medium">{s.pages} pgs</span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 truncate">
                    {s.slugline}
                  </div>

                  <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Roadmap: {s.roadmapId}</span>
                    <span className="text-emerald-600 font-semibold">Synced</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Column (6 cols): Screenplay Editor (Courier Prime / Screenplay Formatting) */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 shadow-sm p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-purple-600" />
              <span>{currentScene.slugline}</span>
            </div>
            <span className="text-slate-400 text-[11px]">Courier Prime • Industry Format</span>
          </div>

          <textarea
            id="screenplay-editor-textarea"
            value={editorContent}
            onChange={(e) => {
              setEditorContent(e.target.value);
              setSaveStatus('Unsaved changes...');
            }}
            rows={22}
            className="w-full font-mono text-xs sm:text-sm text-slate-900 bg-slate-50/30 p-4 rounded-xl border border-slate-200 focus:bg-white focus:outline-hidden focus:border-purple-400 leading-relaxed resize-none shadow-inner"
            placeholder="Write screenplay scene..."
          />
        </div>

        {/* Right Column (3 cols): Linked Roadmap Blueprint & AI Generation Panel */}
        <div className="lg:col-span-3 space-y-4">
          {/* Blueprint Card */}
          {linkedRoadmap && (
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-purple-700 uppercase tracking-wider text-[10px]">
                  Linked Blueprint: {linkedRoadmap.id}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 font-bold">
                  {linkedRoadmap.beat}
                </span>
              </div>

              <div>
                <div className="font-bold text-slate-900">Scene Objective:</div>
                <p className="text-slate-600 mt-0.5 leading-relaxed font-medium">
                  {linkedRoadmap.objective}
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-900">Emotional Goal:</div>
                <p className="text-purple-900 mt-0.5 leading-relaxed font-medium">
                  {linkedRoadmap.emotionalObjective}
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-900">Core Conflict:</div>
                <p className="text-slate-600 mt-0.5 leading-relaxed font-medium">
                  {linkedRoadmap.conflict}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1 text-slate-500">
                <div>Setup: {linkedRoadmap.setup}</div>
                <div>Payoff: {linkedRoadmap.payoff}</div>
              </div>
            </div>
          )}

          {/* AI Screenplay Assistant */}
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI Dialogue & Scene Refinement</span>
            </div>

            <p className="text-[11px] text-purple-950 leading-relaxed font-medium">
              Instruct Gemini to punch up subtext, adjust pacing, or generate alternative drafts while strictly preserving the linked roadmap objective.
            </p>

            <textarea
              value={aiInstructions}
              onChange={(e) => setAiInstructions(e.target.value)}
              placeholder="e.g. Sharpen the conflict between Kabir and Maya; make Kabir more guarded..."
              className="w-full p-2 text-xs bg-white border border-purple-200 rounded-lg focus:outline-hidden focus:border-purple-400 resize-none h-16"
            />

            <button
              id="btn-generate-scene-ai"
              onClick={handleGenerateOrRefine}
              disabled={isGenerating}
              className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Drafting Scene...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Refine / Generate with AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
