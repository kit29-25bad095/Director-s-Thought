import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  Image as ImageIcon,
  Maximize2,
  Minimize2,
  Sparkles,
  Check,
  X,
  Edit3,
  ChevronRight,
  ChevronLeft,
  Send,
  Loader2,
  HelpCircle,
  FileText,
  Bookmark,
  Compass,
  Eye,
} from 'lucide-react';
import { Role, Project } from '../../types';
import { getStoryCompanionFeedback, StoryCompanionFeedback } from '../../services/geminiService';

interface StoryWriterWorkspaceProps {
  initialTitle?: string;
  initialContent?: string;
  project?: Project;
  activeRole: Role;
  onBack: () => void;
  onStructureStory: (title: string, content: string) => void;
  onBuildCharacters: (title: string, content: string) => void;
}

export const StoryWriterWorkspace: React.FC<StoryWriterWorkspaceProps> = ({
  initialTitle = 'The Horizon Paradox',
  initialContent = '',
  project,
  activeRole,
  onBack,
  onStructureStory,
  onBuildCharacters,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(
    initialContent ||
      `EXT. MOUNT SILAS RADAR OBSERVATORY - DUSK

A blizzard claws at the perimeter chain-link fence. High-voltage relay dishes moan in the sub-zero wind.

MARCUS VANCE (42), gaunt and hollow-eyed beneath a heavy shearling coat, steps off the tracked snowcat. His breath freezes on his collar.

He unclasps a sealed telemetry drive from his pocket. The green LED pulses once every three seconds—an impossible distress rhythm from a frequency decommissioned twelve years ago.

INT. OBSERVATORY - CORRIDOR - MINUTES LATER

The backup halogen lights hum. Frost crawls across the interior walls.

DR. ELENA ROSSI (38) stands at the primary telemetry console, her fingers trembling over a bank of analogue dials. She doesn’t turn around when Marcus enters.

ELENA
You shouldn't have answered the broadcast, Marcus.

MARCUS
It was encoded with Director Sterling’s private verification cipher.

ELENA
(turns, eyes hollow)
That wasn't Sterling's cipher. That was the frequency we used when the valley collapsed in '08. The frequency he ordered us to burn.`
  );

  const [fontStyle, setFontStyle] = useState<'courier' | 'serif' | 'sans'>('courier');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiActiveAction, setAiActiveAction] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [feedbackList, setFeedbackList] = useState<StoryCompanionFeedback[]>([]);
  const [editingSuggestionIndex, setEditingSuggestionIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Compute stats
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const pageEstimate = Math.max(1, Math.ceil(wordCount / 220));
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 180));

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      workspaceRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Format action helpers for simple textarea insertion
  const applyFormatting = (prefix: string, suffix: string = '') => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = el.value.substring(start, end);
    const replacement = prefix + (selected || 'text') + suffix;
    const newContent = el.value.substring(0, start) + replacement + el.value.substring(end);
    setContent(newContent);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 10);
  };

  const insertSceneHeading = (heading: string) => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    const start = el.selectionStart;
    const addition = `\n\n${heading}\n\n`;
    const newContent = el.value.substring(0, start) + addition + el.value.substring(start);
    setContent(newContent);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + addition.length, start + addition.length);
    }, 10);
  };

  // AI Companion actions
  const triggerCompanionAction = async (
    action: 'analyze' | 'conflict' | 'characters' | 'gaps' | 'pacing' | 'possibilities' | 'ask',
    promptText?: string
  ) => {
    setAiLoading(true);
    setAiActiveAction(action);
    if (!isAiSidebarOpen) setIsAiSidebarOpen(true);

    try {
      const res = await getStoryCompanionFeedback({
        storyText: content,
        storyTitle: title,
        action,
        customPrompt: promptText || customPrompt,
        project,
      });

      setFeedbackList((prev) => [res, ...prev]);
      if (action === 'ask') setCustomPrompt('');
    } catch (err) {
      console.warn(err);
    } finally {
      setAiLoading(false);
      setAiActiveAction('');
    }
  };

  // Apply suggestion without overwriting director's words
  const handleApplySuggestion = (suggestion: StoryCompanionFeedback, index: number) => {
    const textToAdd = suggestion.textToApply || `\n\n// DIRECTION NOTE: ${suggestion.headline}\n// ${suggestion.body}`;
    setContent((prev) => prev + textToAdd);

    setAppliedToast(`Applied note to draft: "${suggestion.headline}"`);
    setTimeout(() => setAppliedToast(null), 3000);

    // Remove from active list
    setFeedbackList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStartEdit = (suggestion: StoryCompanionFeedback, index: number) => {
    setEditingSuggestionIndex(index);
    setEditingText(suggestion.textToApply || suggestion.body);
  };

  const handleSaveAndApplyEdit = (index: number) => {
    setContent((prev) => prev + '\n\n' + editingText);
    setEditingSuggestionIndex(null);
    setAppliedToast('Applied customized direction note to story draft.');
    setTimeout(() => setAppliedToast(null), 3000);
    setFeedbackList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDismissSuggestion = (index: number) => {
    setFeedbackList((prev) => prev.filter((_, i) => i !== index));
  };

  // Optional subtle prompts on empty state
  const optionalPrompts = [
    { label: 'What happens?', text: 'An isolated communications station intercepts a ghost signal…' },
    { label: 'Who is involved?', text: 'MARCUS VANCE (Investigator) and DR. ELENA ROSSI (Engineer)…' },
    { label: 'What does the protagonist want?', text: 'To trace the origin before the transmission frequency collapses…' },
    { label: 'What stands in their way?', text: 'A catastrophic alpine storm and an armed lockdown order…' },
    { label: 'How does the story change?', text: 'The signal is revealed to originate from inside their own secure server…' },
  ];

  return (
    <div
      ref={workspaceRef}
      id="story-writer-workspace"
      className="flex flex-col h-[calc(100vh-60px)] bg-[#090a0d] text-neutral-100 overflow-hidden select-none"
    >
      {/* 1. TOP CINEMATIC WORKSPACE HEADER */}
      <header className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#0e1015] border-b border-neutral-800/90 z-20">
        {/* Left: Back & Title input */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            id="btn-back-to-story"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition px-2.5 py-1.5 rounded-lg hover:bg-neutral-800/80 cursor-pointer shrink-0 border border-transparent hover:border-neutral-700/60"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Story</span>
          </button>

          <div className="h-4 w-px bg-neutral-800 hidden sm:block" />

          {/* Editable Title */}
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-amber-500 shrink-0" />
            <input
              id="story-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Story"
              className="bg-transparent text-sm sm:text-base font-semibold text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded px-1.5 py-0.5 border border-transparent hover:border-neutral-800 transition truncate max-w-50 sm:max-w-xs md:max-w-md"
            />
            <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded shrink-0 hidden md:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Saved to draft
            </span>
          </div>
        </div>

        {/* Right: Stats, Typography, Companion Toggle & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Metadata counts */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-neutral-400 bg-neutral-900/80 px-2.5 py-1 rounded-lg border border-neutral-800">
            <span>{wordCount.toLocaleString()} words</span>
            <span className="text-neutral-600">•</span>
            <span>~{pageEstimate} pgs</span>
            <span className="text-neutral-600">•</span>
            <span className="text-amber-400/90">~{readTimeMin} min read</span>
          </div>

          {/* Font Selector */}
          <div className="hidden sm:flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setFontStyle('courier')}
              className={`px-2 py-1 rounded font-mono text-[11px] transition ${
                fontStyle === 'courier' ? 'bg-neutral-800 text-amber-300 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Courier Screenplay font"
            >
              Courier
            </button>
            <button
              onClick={() => setFontStyle('serif')}
              className={`px-2 py-1 rounded font-serif text-[11px] transition ${
                fontStyle === 'serif' ? 'bg-neutral-800 text-amber-300 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Editorial Serif"
            >
              Serif
            </button>
            <button
              onClick={() => setFontStyle('sans')}
              className={`px-2 py-1 rounded font-sans text-[11px] transition ${
                fontStyle === 'sans' ? 'bg-neutral-800 text-amber-300 font-semibold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Clean Sans"
            >
              Sans
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded-lg transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* AI Story Companion Toggle */}
          <button
            id="btn-toggle-story-companion"
            onClick={() => setIsAiSidebarOpen(!isAiSidebarOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
              isAiSidebarOpen
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-xs'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Story Companion</span>
          </button>

          {/* Structure Story CTA */}
          <button
            onClick={() => onStructureStory(title, content)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 text-xs font-semibold shadow transition active:scale-95 cursor-pointer"
          >
            <span>Structure Story</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. CINEMATIC FORMATTING TOOLBAR */}
      <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-2 bg-[#0c0d12] border-b border-neutral-800/60 overflow-x-auto scrollbar-none gap-2">
        <div className="flex items-center gap-1">
          {/* Undo / Redo */}
          <button
            onClick={() => document.execCommand('undo')}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/80 rounded transition"
            title="Undo"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => document.execCommand('redo')}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/80 rounded transition"
            title="Redo"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>

          <div className="h-3.5 w-px bg-neutral-800 mx-1" />

          {/* Text Styling */}
          <button
            onClick={() => applyFormatting('**', '**')}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/80 rounded transition font-bold"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => applyFormatting('*', '*')}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/80 rounded transition italic"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => applyFormatting('<u>', '</u>')}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/80 rounded transition"
            title="Underline"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>

          <div className="h-3.5 w-px bg-neutral-800 mx-1" />

          {/* Screenplay Quick Formats */}
          <button
            onClick={() => insertSceneHeading('INT. LOCATION - DAY')}
            className="px-2 py-1 text-[10px] font-mono font-semibold bg-neutral-900 hover:bg-neutral-800 text-amber-400/90 border border-neutral-800 rounded transition"
            title="Insert INT. scene header"
          >
            + INT.
          </button>
          <button
            onClick={() => insertSceneHeading('EXT. LOCATION - NIGHT')}
            className="px-2 py-1 text-[10px] font-mono font-semibold bg-neutral-900 hover:bg-neutral-800 text-amber-400/90 border border-neutral-800 rounded transition"
            title="Insert EXT. scene header"
          >
            + EXT.
          </button>
          <button
            onClick={() => applyFormatting('\n# ', '\n')}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/80 rounded transition"
            title="Act / Chapter Heading"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => applyFormatting('\n## ', '\n')}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/80 rounded transition"
            title="Sequence Heading"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>

          <div className="h-3.5 w-px bg-neutral-800 mx-1" />

          {/* Dialogue / Quote */}
          <button
            onClick={() => applyFormatting('\n> ', '\n')}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/80 rounded transition"
            title="Dialogue / Quote Block"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => applyFormatting('- ')}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/80 rounded transition"
            title="Bullet Beat"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => applyFormatting('1. ')}
            className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/80 rounded transition"
            title="Numbered Beat"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>

          <div className="h-3.5 w-px bg-neutral-800 mx-1" />

          <button
            onClick={() => {
              const marker = `\n\n[VISUAL COMP REFERENCE: Anamorphic wide shot, low-key lighting, cold color grade]\n\n`;
              setContent((prev) => prev + marker);
            }}
            className="flex items-center gap-1 px-2 py-1 text-[11px] text-neutral-400 hover:text-neutral-200 bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 rounded transition"
            title="Insert Visual Reference Marker"
          >
            <ImageIcon className="w-3 h-3 text-amber-500" />
            <span className="hidden sm:inline">Visual Comp</span>
          </button>
        </div>

        {/* Quick Word Indicator */}
        <div className="text-[10px] font-mono text-neutral-400 shrink-0">
          DIRECTOR’S DRAFT // DISTRACTION FREE
        </div>
      </div>

      {/* 3. MAIN WRITING SPLIT WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Applied Notification Toast */}
        {appliedToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-emerald-900/90 text-emerald-200 border border-emerald-600/70 px-4 py-2 rounded-xl text-xs font-medium shadow-2xl backdrop-blur flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{appliedToast}</span>
          </div>
        )}

        {/* MAIN TEXT CANVAS */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-16 py-8 flex justify-center bg-[#090a0d] scrollbar-thin scrollbar-thumb-neutral-800">
          <div className="w-full max-w-3xl flex flex-col">
            {/* Cinematic Page Card */}
            <div className="bg-[#0e1017] border border-neutral-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl min-h-[85vh] flex flex-col transition-all">
              {/* Story Title Header inside page */}
              <div className="mb-6 pb-4 border-b border-neutral-800/80 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-amber-500/80 mb-1">
                    PROJECT STORY TREATMENT
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100 font-sans">
                    {title || 'Untitled Story'}
                  </h1>
                </div>
                <div className="text-right text-[11px] font-mono text-neutral-400">
                  ACT I • SETUP
                </div>
              </div>

              {/* Optional Empty State Guidance */}
              {!content.trim() && (
                <div className="mb-6 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-xs">
                  <div className="flex items-center gap-2 text-amber-400 font-medium mb-1.5">
                    <Compass className="w-4 h-4" />
                    <span>Begin with your story…</span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-3">
                    Write freely without worrying about formal formatting. Optional prompts to spark ideas:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {optionalPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setContent((prev) => prev + (prev ? '\n\n' : '') + p.text)}
                        className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] transition border border-neutral-700/60 cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Distraction-Free Textarea */}
              <textarea
                ref={textareaRef}
                id="story-main-editor-canvas"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your story…"
                rows={28}
                className={`flex-1 w-full bg-transparent text-neutral-100 placeholder-neutral-600 focus:outline-none resize-none leading-relaxed text-sm sm:text-base selection:bg-amber-500/30 selection:text-amber-100 ${
                  fontStyle === 'courier'
                    ? 'font-mono tracking-wide'
                    : fontStyle === 'serif'
                    ? 'font-serif text-lg leading-loose'
                    : 'font-sans'
                }`}
              />
            </div>
          </div>
        </div>

        {/* COLLAPSIBLE RIGHT: AI STORY COMPANION */}
        {isAiSidebarOpen && (
          <aside
            id="story-companion-panel"
            className="w-80 sm:w-96 shrink-0 bg-[#0e1015] border-l border-neutral-800/90 flex flex-col h-full z-10 animate-in slide-in-from-right-3 duration-200"
          >
            {/* Companion Header */}
            <div className="p-4 border-b border-neutral-800/90 flex items-center justify-between bg-[#12141c]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-100 flex items-center gap-1.5">
                    <span>Story Companion</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded">
                      AI
                    </span>
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    Develop your story without losing your vision.
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsAiSidebarOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded transition"
                title="Collapse Assistant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* AI Action Grid */}
            <div className="p-3 border-b border-neutral-800/80 bg-neutral-900/40">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2 px-1">
                Story Exploration Actions
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  disabled={aiLoading}
                  onClick={() => triggerCompanionAction('analyze')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-200 text-xs font-medium border border-neutral-700/60 transition cursor-pointer disabled:opacity-50 text-left"
                >
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">Analyze Story</span>
                </button>

                <button
                  disabled={aiLoading}
                  onClick={() => triggerCompanionAction('conflict')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-200 text-xs font-medium border border-neutral-700/60 transition cursor-pointer disabled:opacity-50 text-left"
                >
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">Find Main Conflict</span>
                </button>

                <button
                  disabled={aiLoading}
                  onClick={() => triggerCompanionAction('characters')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-200 text-xs font-medium border border-neutral-700/60 transition cursor-pointer disabled:opacity-50 text-left"
                >
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">Identify Characters</span>
                </button>

                <button
                  disabled={aiLoading}
                  onClick={() => triggerCompanionAction('gaps')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-200 text-xs font-medium border border-neutral-700/60 transition cursor-pointer disabled:opacity-50 text-left"
                >
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">Find Story Gaps</span>
                </button>

                <button
                  disabled={aiLoading}
                  onClick={() => triggerCompanionAction('pacing')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-200 text-xs font-medium border border-neutral-700/60 transition cursor-pointer disabled:opacity-50 text-left"
                >
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">Improve Pacing</span>
                </button>

                <button
                  disabled={aiLoading}
                  onClick={() => triggerCompanionAction('possibilities')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-200 text-xs font-medium border border-neutral-700/60 transition cursor-pointer disabled:opacity-50 text-left"
                >
                  <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">Suggest Possibilities</span>
                </button>
              </div>

              {/* Custom Ask Director's Thought */}
              <div className="mt-2.5 flex items-center gap-1.5">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customPrompt.trim()) {
                      triggerCompanionAction('ask', customPrompt);
                    }
                  }}
                  placeholder="Ask Director’s Thought anything..."
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/70"
                />
                <button
                  disabled={aiLoading || !customPrompt.trim()}
                  onClick={() => triggerCompanionAction('ask', customPrompt)}
                  className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 transition disabled:opacity-40 cursor-pointer"
                  title="Submit inquiry"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Active Loading State */}
            {aiLoading && (
              <div className="p-4 flex items-center gap-3 bg-neutral-900/60 border-b border-neutral-800 text-xs text-amber-300">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Analyzing story architecture with Director AI...</span>
              </div>
            )}

            {/* Suggestions & Dramaturgical Feed */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-neutral-800">
              {/* Creator ownership reminder notice */}
              <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40 text-[11px] text-neutral-300 flex items-start gap-2">
                <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-200">Director’s Rule:</span>{' '}
                  Your story stays yours. AI helps you develop it. Suggestions are never automatically merged.
                </div>
              </div>

              {feedbackList.length === 0 && !aiLoading && (
                <div className="p-6 text-center text-xs text-neutral-500">
                  <FileText className="w-8 h-8 text-neutral-700 mx-auto mb-2 opacity-50" />
                  <p className="font-medium text-neutral-400">No active suggestions yet.</p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Click any action above to evaluate pacing, identify character dynamics, or find story gaps.
                  </p>
                </div>
              )}

              {/* Suggestion Cards */}
              {feedbackList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800/90 shadow-md flex flex-col gap-2.5 transition hover:border-neutral-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs font-semibold text-neutral-100 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{item.headline}</span>
                    </div>
                    <button
                      onClick={() => handleDismissSuggestion(idx)}
                      className="text-neutral-500 hover:text-neutral-300 transition p-0.5"
                      title="Dismiss"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {editingSuggestionIndex === idx ? (
                    <div className="space-y-2">
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        rows={4}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2 text-xs text-neutral-200 font-mono focus:outline-none focus:border-amber-500"
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => setEditingSuggestionIndex(null)}
                          className="px-2 py-1 text-[11px] rounded text-neutral-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveAndApplyEdit(idx)}
                          className="px-2.5 py-1 text-[11px] rounded bg-amber-500 text-neutral-950 font-semibold"
                        >
                          Save & Apply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans whitespace-pre-line">
                      {item.body}
                    </p>
                  )}

                  {/* Suggestion Actions: Apply, Edit, Dismiss */}
                  {editingSuggestionIndex !== idx && (
                    <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleApplySuggestion(item, idx)}
                          className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-semibold transition flex items-center gap-1 cursor-pointer"
                          title="Append note to draft"
                        >
                          <Check className="w-3 h-3 text-amber-400" />
                          <span>Apply</span>
                        </button>
                        <button
                          onClick={() => handleStartEdit(item, idx)}
                          className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] transition flex items-center gap-1 cursor-pointer"
                          title="Customize text before applying"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleDismissSuggestion(idx)}
                        className="text-[11px] text-neutral-500 hover:text-neutral-300 cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Panel Tagline */}
            <div className="p-3 border-t border-neutral-800/90 text-center bg-[#0c0d12]">
              <div className="text-[10px] font-mono text-neutral-400 tracking-wider">
                DIRECTOR’S THOUGHT // STORY COMPANION
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
