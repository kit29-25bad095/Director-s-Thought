import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  PenTool,
  ArrowRight,
  Sparkles,
  Check,
  X,
  RefreshCw,
  FileCheck,
  Trash2,
  BookOpen,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { Project, Role } from '../../types';
import { StoryWriterWorkspace } from '../story/StoryWriterWorkspace';
import { StoryAnalysisView } from '../story/StoryAnalysisView';
import { analyzeStoryDocument, StoryAnalysisResult } from '../../services/geminiService';

interface StoryPageViewProps {
  project: Project;
  activeRole: Role;
  onNavigateTab: (tab: any) => void;
  onUpdateProjectTitle?: (newTitle: string) => void;
}

export const StoryPageView: React.FC<StoryPageViewProps> = ({
  project,
  activeRole,
  onNavigateTab,
  onUpdateProjectTitle,
}) => {
  const [viewMode, setViewMode] = useState<'overview' | 'writer' | 'analyzed'>('overview');
  const [activeStoryTab, setActiveStoryTab] = useState<'structure' | 'write' | 'upload'>('structure');

  // 5-Stage Story Structure (Beginning -> Conflict -> Development -> Climax -> Ending)
  const [storyStages, setStoryStages] = useState([
    {
      id: 's1',
      title: 'Beginning',
      subtitle: 'Setup & World',
      description:
        'A passionate film student, Arun, gathers an ambitious crew of college friends to shoot his dream graduation film on an empty college campus.',
      color: 'blue',
    },
    {
      id: 's2',
      title: 'Conflict',
      subtitle: 'Inciting Incident & Crisis',
      description:
        'The lead actor cancels at the eleventh hour, lighting equipment blows a fuse in the main classroom, and the crew begins questioning Arun’s leadership.',
      color: 'amber',
    },
    {
      id: 's3',
      title: 'Development',
      subtitle: 'Rising Stakes & Complications',
      description:
        'Arun is forced to step into the role himself while Pooja takes over the camera. With only three hours left before campus security locks the gates, tempers flare.',
      color: 'purple',
    },
    {
      id: 's4',
      title: 'Climax',
      subtitle: 'The Ultimate Stand',
      description:
        'A power outage plunges the room into complete darkness during the film’s crucial monologue. Arun inspires the crew to light the scene using their smartphones and car headlights.',
      color: 'rose',
    },
    {
      id: 's5',
      title: 'Ending',
      subtitle: 'Resolution & Meaning',
      description:
        'The take is captured with raw, breathtaking intimacy. The crew embraces as dawn breaks over the campus, realizing their bond is stronger than ever.',
      color: 'emerald',
    },
  ]);

  // File upload state
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    type: string;
    content: string;
  } | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<StoryAnalysisResult | null>(null);
  const [currentDraftContent, setCurrentDraftContent] = useState<string>('');
  const [currentDraftTitle, setCurrentDraftTitle] = useState<string>(project.name || 'The Last Frame');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleTreatmentContent = `EXT. MOUNT SILAS RELAY OBSERVATORY - DUSK
An alpine blizzard batters the perimeter fences.
MARCUS VANCE (42) arrives with an emergency frequency recorder.
DR. ELENA ROSSI (38) reveals the distress signal is transmitted from their own coordinates forty-seven minutes in the future.`;

  const handleFileChosen = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) || sampleTreatmentContent;
      const sizeKb = (file.size / 1024).toFixed(1);
      const sizeStr = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${sizeKb} KB`;

      setUploadedFile({
        name: file.name,
        size: sizeStr,
        type: file.name.split('.').pop()?.toUpperCase() || 'PDF',
        content: text,
      });
    };
    reader.readAsText(file);
  };

  const handleAnalyzeStory = async () => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);

    try {
      const res = await analyzeStoryDocument({
        storyContent: uploadedFile.content,
        fileName: uploadedFile.name,
        project,
      });

      setAnalysisResult(res.analysis);
      setCurrentDraftTitle(res.analysis.title);
      setCurrentDraftContent(uploadedFile.content);
      if (onUpdateProjectTitle) onUpdateProjectTitle(res.analysis.title);
      setViewMode('analyzed');
    } catch (err) {
      console.warn('Error analyzing story:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (viewMode === 'writer') {
    return (
      <StoryWriterWorkspace
        initialTitle={currentDraftTitle}
        initialContent={currentDraftContent}
        project={project}
        activeRole={activeRole}
        onBack={() => setViewMode('overview')}
        onStructureStory={(title, content) => {
          setCurrentDraftTitle(title);
          setCurrentDraftContent(content);
          onNavigateTab('structure');
        }}
        onBuildCharacters={(title, content) => {
          setCurrentDraftTitle(title);
          setCurrentDraftContent(content);
          onNavigateTab('characters');
        }}
      />
    );
  }

  if (viewMode === 'analyzed' && analysisResult && uploadedFile) {
    return (
      <StoryAnalysisView
        fileName={uploadedFile.name}
        fileSize={uploadedFile.size}
        fileType={uploadedFile.type}
        storyContent={uploadedFile.content}
        analysis={analysisResult}
        project={project}
        onOpenWriter={(content, title) => {
          setCurrentDraftContent(content);
          setCurrentDraftTitle(title);
          setViewMode('writer');
        }}
        onNavigateToCharacters={() => onNavigateTab('characters')}
        onNavigateToStructure={() => onNavigateTab('structure')}
        onReAnalyze={handleAnalyzeStory}
        isReanalyzing={isAnalyzing}
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#f4f6fb] text-slate-800 p-6 sm:p-8 lg:p-10 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header matching the modern light aesthetic */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Story</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Build your narrative architecture from setup to resolution
            </p>
          </div>

          {/* Sub-view toggle pills */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 p-1 rounded-xl shadow-xs text-xs font-medium">
            <button
              onClick={() => setActiveStoryTab('structure')}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                activeStoryTab === 'structure'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              5-Stage Structure
            </button>
            <button
              onClick={() => setViewMode('writer')}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer text-slate-600 hover:text-slate-900`}
            >
              Open Writer
            </button>
            <button
              onClick={() => setActiveStoryTab('upload')}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                activeStoryTab === 'upload'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Import Treatment
            </button>
          </div>
        </div>

        {/* VIEW A: 5-STAGE STORY STRUCTURE (Beginning -> Conflict -> Development -> Climax -> Ending) */}
        {activeStoryTab === 'structure' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {storyStages.map((st, idx) => (
                <div
                  key={st.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        Stage 0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {st.title}
                    </h3>
                    <div className="text-xs font-semibold text-slate-500">
                      {st.subtitle}
                    </div>
                    <textarea
                      value={st.description}
                      onChange={(e) => {
                        const newDesc = e.target.value;
                        setStoryStages((prev) =>
                          prev.map((item) =>
                            item.id === st.id ? { ...item, description: newDesc } : item
                          )
                        );
                      }}
                      rows={6}
                      className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:outline-hidden focus:border-blue-500 transition resize-none leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom action bar */}
            <div className="flex items-center justify-between pt-4">
              <span className="text-xs text-slate-500">
                All 5 stages sync with Scene Breakdown and Screenplay Studio
              </span>
              <button
                onClick={() => onNavigateTab('screenplay')}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span>Advance to Screenplay</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* VIEW B: UPLOAD / IMPORT STORY TREATMENT */}
        {activeStoryTab === 'upload' && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-slate-900">Upload Story Treatment</h2>
              <p className="text-xs text-slate-500">
                Drop your PDF, DOCX, or text file to extract narrative structure automatically
              </p>
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  handleFileChosen(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-slate-50/80'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileChosen(e.target.files[0]);
                  }
                }}
              />
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">Drop your file here</p>
              <p className="text-xs text-slate-400 mt-0.5">or click to browse from device</p>
            </div>

            {uploadedFile && (
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-900">{uploadedFile.name}</div>
                    <div className="text-[11px] text-slate-500">{uploadedFile.size} • {uploadedFile.type}</div>
                  </div>
                </div>
                <button
                  onClick={handleAnalyzeStory}
                  disabled={isAnalyzing}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
