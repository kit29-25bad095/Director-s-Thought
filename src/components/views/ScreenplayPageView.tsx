import React, { useState, useRef, useEffect } from 'react';
import {
  Folder,
  ChevronDown,
  Cloud,
  Save,
  Download,
  User,
  FileText,
  Type,
  AlignLeft,
  AlignCenter,
  List,
  Maximize2,
  Minimize2,
  BookOpen,
  ChevronUp,
  MessageSquare,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  Camera,
  Scissors,
  Sparkles,
  Check,
  Copy,
  Printer,
  X,
  Users,
} from 'lucide-react';
import { Project, Role } from '../../types';

interface ScreenplayPageViewProps {
  project: Project;
  onNavigateTab: (tab: any) => void;
  activeRole: Role;
}

const DEFAULT_SCRIPT_TEXT = `FADE IN:

INT. COFFEE SHOP - MORNING

A cozy coffee shop filled with soft chatter. Sunlight streams through the large windows. The sound of a coffee machine hums in the background.

ARJUN (30s), a thoughtful writer, sits at a corner table, staring at his notebook. He takes a deep breath, opens it, and begins to write.

                    ARJUN
            (muttering)
    Maybe this time... it will be different.

The barista, a young woman, walks up with a cup of coffee.

                    BARISTA
    Here you go.

Arjun looks up, gives a small smile, and nods.

EXT. CITY STREET - LATE MORNING

The city is alive. People rush, vehicles honk, and life moves forward. Arjun walks through the crowd, holding his notebook, with a new sense of purpose.

FADE OUT.`;

interface FormatGuideItem {
  id: string;
  title: string;
  example: string;
  subtext: string;
  borderColor: string;
  iconColor: string;
  icon: React.ComponentType<{ className?: string }>;
  snippet: string;
}

const FORMAT_GUIDE_ITEMS: FormatGuideItem[] = [
  {
    id: 'scene-heading',
    title: 'Scene Heading',
    example: 'INT. HOUSE - LIVING ROOM - DAY',
    subtext: '(Location - Time)',
    borderColor: 'border-l-blue-500',
    iconColor: 'text-blue-500',
    icon: Type,
    snippet: '\n\nINT. LOCATION - TIME\n\n',
  },
  {
    id: 'action',
    title: 'Action',
    example: 'The hero walks into the room, looking around.',
    subtext: '(Describes what happens)',
    borderColor: 'border-l-emerald-500',
    iconColor: 'text-emerald-500',
    icon: AlignLeft,
    snippet: '\nThe character enters the space, observing the subtle tension.\n',
  },
  {
    id: 'character',
    title: 'Character',
    example: 'JOHN',
    subtext: '(Character name in CAPS)',
    borderColor: 'border-l-purple-500',
    iconColor: 'text-purple-500',
    icon: MessageSquare,
    snippet: '\n\n                    CHARACTER NAME\n',
  },
  {
    id: 'dialogue',
    title: 'Dialogue',
    example: 'This is the dialogue line.',
    subtext: '(What the character says)',
    borderColor: 'border-l-amber-500',
    iconColor: 'text-amber-500',
    icon: MessageCircle,
    snippet: '    This is what the character says with conviction.\n',
  },
  {
    id: 'parenthetical',
    title: 'Parenthetical',
    example: '(softly)',
    subtext: '(How the line is delivered)',
    borderColor: 'border-l-rose-400',
    iconColor: 'text-rose-400',
    icon: HelpCircle,
    snippet: '            (softly)\n',
  },
  {
    id: 'transition',
    title: 'Transition',
    example: 'CUT TO:',
    subtext: '(Moves to next scene)',
    borderColor: 'border-l-cyan-500',
    iconColor: 'text-cyan-500',
    icon: ArrowRight,
    snippet: '\n                                            CUT TO:\n\n',
  },
  {
    id: 'shot',
    title: 'Shot / Camera Direction',
    example: 'CLOSE UP - The character\'s face.',
    subtext: '(Visual direction)',
    borderColor: 'border-l-indigo-500',
    iconColor: 'text-indigo-500',
    icon: Camera,
    snippet: '\nCLOSE UP - Character eyes widen as the truth hits.\n',
  },
  {
    id: 'page-break',
    title: 'Page Break',
    example: '-- Page Ends --',
    subtext: '(Automatically handled)',
    borderColor: 'border-l-slate-400',
    iconColor: 'text-slate-400',
    icon: Scissors,
    snippet: '\n\n==================== [ PAGE BREAK ] ====================\n\n',
  },
];

export const ScreenplayPageView: React.FC<ScreenplayPageViewProps> = ({
  project,
  onNavigateTab,
  activeRole,
}) => {
  const [scriptTitle, setScriptTitle] = useState('Untitled Script');
  const [scriptText, setScriptText] = useState(DEFAULT_SCRIPT_TEXT);
  const [activeScene, setActiveScene] = useState('Scene 1');
  const [activeSlugline, setActiveSlugline] = useState('INT. COFFEE SHOP - MORNING');
  const [fontSize, setFontSize] = useState<number>(12);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState<'left' | 'center'>('left');
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [savedTime, setSavedTime] = useState('2:30 PM');
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [selectedFormatFeedback, setSelectedFormatFeedback] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Compute live word count and approximate page count (industry standard ~250 words per screenplay page)
  const words = scriptText.trim() ? scriptText.trim().split(/\s+/).length : 0;
  const pages = Math.max(1, Math.ceil(words / 220));

  // Update cursor position on selection / keyup / click
  const updateCursorPosition = () => {
    if (!textareaRef.current) return;
    const text = textareaRef.current.value;
    const selStart = textareaRef.current.selectionStart;
    const lines = text.substring(0, selStart).split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    setCursorPos({ line, col });
  };

  const handleSave = () => {
    const now = new Date();
    const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSavedTime(formatted);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2400);
  };

  const handleInsertSnippet = (item: FormatGuideItem) => {
    if (!textareaRef.current) {
      setScriptText((prev) => prev + item.snippet);
      return;
    }

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = scriptText.substring(0, start);
    const after = scriptText.substring(end);

    const updatedText = before + item.snippet + after;
    setScriptText(updatedText);

    setSelectedFormatFeedback(item.title);
    setTimeout(() => setSelectedFormatFeedback(null), 1800);

    setTimeout(() => {
      textarea.focus();
      const newPos = start + item.snippet.length;
      textarea.setSelectionRange(newPos, newPos);
      updateCursorPosition();
    }, 50);
  };

  const handleExportText = () => {
    const blob = new Blob([scriptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scriptTitle.replace(/\s+/g, '_')}.fountain`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(scriptText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handlePrint = () => {
    window.print();
    setShowExportModal(false);
  };

  return (
    <div className={`min-h-screen bg-[#f8f9fc] text-slate-800 flex flex-col font-sans transition-all duration-200 ${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-white' : 'p-4 sm:p-6 lg:p-8'}`}>
      {/* 1. TOP BAR / SCRIPT ACTION BAR */}
      <header className="max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        {/* Left Side: Project Switcher & Script Title */}
        <div className="flex items-center gap-3.5 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-slate-700 text-xs sm:text-sm font-medium shadow-xs hover:border-slate-300 transition cursor-pointer">
            <Folder className="w-4 h-4 text-slate-500" />
            <span className="font-semibold">{project.name || 'My Project'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="relative">
            <input
              type="text"
              value={scriptTitle}
              onChange={(e) => setScriptTitle(e.target.value)}
              className="bg-white border border-slate-200/90 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-800 shadow-xs outline-hidden transition min-w-[180px]"
              placeholder="Script Title"
            />
          </div>
        </div>

        {/* Right Side: Cloud Auto-Saved, Save Button, Export Button, Profile Avatar */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Cloud className="w-4 h-4 text-sky-500" />
            <div className="flex flex-col sm:flex-row sm:gap-1.5 leading-tight text-[11px] sm:text-xs">
              <span className="font-medium text-slate-600">Auto Saved</span>
              <span className="text-slate-400">{savedTime}</span>
            </div>
          </div>

          <button
            id="screenplay-save-btn"
            onClick={handleSave}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white hover:bg-slate-50 active:scale-95 border border-slate-200/90 text-slate-700 text-xs sm:text-sm font-medium shadow-xs transition cursor-pointer"
            title="Save changes"
          >
            <Save className="w-4 h-4 text-slate-600" />
            <span>Save</span>
          </button>

          <button
            id="screenplay-export-btn"
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer"
            title="Export script"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>

          <div
            className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs cursor-pointer hover:bg-slate-200 transition"
            title={`Active Role: ${activeRole}`}
          >
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Save Notification Toast */}
      {showSaveToast && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-lg animate-in fade-in duration-150">
          <Check className="w-4 h-4" />
          <span>Screenplay saved successfully!</span>
        </div>
      )}

      {/* Format Feedback Toast */}
      {selectedFormatFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Inserted {selectedFormatFeedback} element</span>
        </div>
      )}

      {/* 2. MAIN WORKSPACE (2-COLUMN GRID) */}
      <main className="max-w-7xl w-full mx-auto mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
        {/* LEFT COLUMN: The Screenplay Document Card */}
        <section className={`${isGuideOpen ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-200`}>
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col overflow-hidden">
            {/* Document Sub-Header: Icon + Title + Scene Selector + Slugline Selector */}
            <div className="px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-slate-800" />
                <span className="text-base font-bold text-slate-900">{scriptTitle}</span>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Scene Dropdown */}
                <div className="relative">
                  <select
                    value={activeScene}
                    onChange={(e) => setActiveScene(e.target.value)}
                    className="appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer outline-hidden focus:border-blue-500 transition"
                  >
                    <option value="Scene 1">Scene 1</option>
                    <option value="Scene 2">Scene 2</option>
                    <option value="All Scenes">All Scenes</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Slugline Dropdown */}
                <div className="relative">
                  <select
                    value={activeSlugline}
                    onChange={(e) => setActiveSlugline(e.target.value)}
                    className="appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-mono font-medium text-slate-800 cursor-pointer outline-hidden focus:border-blue-500 transition max-w-[230px] sm:max-w-none truncate"
                  >
                    <option value="INT. COFFEE SHOP - MORNING">INT. COFFEE SHOP - MORNING</option>
                    <option value="EXT. CITY STREET - LATE MORNING">EXT. CITY STREET - LATE MORNING</option>
                    <option value="INT. APARTMENT - NIGHT">INT. APARTMENT - NIGHT</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Rich Formatting Toolbar */}
            <div className="px-5 sm:px-6 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between gap-3 select-none flex-wrap">
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                {/* Bold */}
                <button
                  onClick={() => setIsBold(!isBold)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer transition ${isBold ? 'bg-slate-100 text-blue-600 font-extrabold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  title="Bold (Ctrl+B)"
                >
                  B
                </button>

                {/* Italic */}
                <button
                  onClick={() => setIsItalic(!isItalic)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center italic text-xs font-serif cursor-pointer transition ${isItalic ? 'bg-slate-100 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  title="Italic (Ctrl+I)"
                >
                  I
                </button>

                {/* Underline */}
                <button
                  onClick={() => setIsUnderline(!isUnderline)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center underline text-xs cursor-pointer transition ${isUnderline ? 'bg-slate-100 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  title="Underline (Ctrl+U)"
                >
                  U
                </button>

                <div className="h-4 w-px bg-slate-200 mx-1" />

                {/* Align Left */}
                <button
                  onClick={() => setAlignment('left')}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition ${alignment === 'left' ? 'bg-slate-100 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                  title="Align Left"
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                </button>

                {/* Align Center */}
                <button
                  onClick={() => setAlignment('center')}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition ${alignment === 'center' ? 'bg-slate-100 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                  title="Align Center"
                >
                  <AlignCenter className="w-3.5 h-3.5" />
                </button>

                {/* Bullet List */}
                <button
                  onClick={() => {
                    const snippet = '\n• ';
                    setScriptText((prev) => prev + snippet);
                  }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 cursor-pointer transition"
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-px bg-slate-200 mx-1" />

                {/* Font Size Dropdown */}
                <div className="relative flex items-center">
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="appearance-none bg-transparent hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded px-2 pr-5 py-1 text-xs text-slate-700 cursor-pointer outline-hidden"
                  >
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={14}>14</option>
                    <option value={16}>16</option>
                  </select>
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400 absolute right-1 pointer-events-none" />
                </div>
              </div>

              {/* Fullscreen Toggle Button */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Script Text Area Canvas (Courier Prime / Screenplay Typography) */}
            <div className="p-6 sm:p-10 lg:p-12 bg-white flex justify-center">
              <div className="w-full max-w-2xl min-h-[580px] sm:min-h-[680px]">
                <textarea
                  id="screenplay-main-editor"
                  ref={textareaRef}
                  value={scriptText}
                  onChange={(e) => {
                    setScriptText(e.target.value);
                    updateCursorPosition();
                  }}
                  onKeyUp={updateCursorPosition}
                  onClick={updateCursorPosition}
                  onSelect={updateCursorPosition}
                  style={{
                    fontSize: `${fontSize}pt`,
                    lineHeight: '1.65',
                    fontFamily: '"Courier Prime", Courier, monospace, ui-monospace',
                    fontWeight: isBold ? '700' : '400',
                    fontStyle: isItalic ? 'italic' : 'normal',
                    textDecoration: isUnderline ? 'underline' : 'none',
                    textAlign: alignment,
                  }}
                  className="w-full h-full min-h-[580px] sm:min-h-[680px] resize-none outline-hidden text-slate-900 border-none bg-transparent placeholder:text-slate-300 selection:bg-blue-100 selection:text-blue-900 leading-relaxed font-mono"
                  spellCheck={false}
                  placeholder="Type your screenplay scene here..."
                />
              </div>
            </div>

            {/* Editor Bottom Status Bar: Ln 1, Col 1 & Words: 92 | Pages: 1 */}
            <div className="px-6 py-3 border-t border-slate-100 bg-white flex items-center justify-between text-xs text-slate-500 font-sans">
              <div>
                <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span>Words: {words}</span>
                <span className="text-slate-300">|</span>
                <span>Pages: {pages}</span>
              </div>
            </div>
          </div>

          {/* Advance Pipeline Bar to Character Profiles */}
          <div className="mt-5 flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Next Stage: Define actors and casting breakdown for these screenplay characters.</span>
            </div>
            <button
              onClick={() => onNavigateTab('characters')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition shadow-xs"
            >
              <span>Advance to Characters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* RIGHT COLUMN: Screenplay Format Guide (Collapsible Card) */}
        <aside className={`${isGuideOpen ? 'lg:col-span-4' : 'hidden'} space-y-4 transition-all duration-200`}>
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
            {/* Guide Header */}
            <div
              onClick={() => setIsGuideOpen(!isGuideOpen)}
              className="flex items-center justify-between cursor-pointer select-none"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-slate-800" />
                <h2 className="text-sm font-bold text-slate-900">Screenplay Format Guide</h2>
              </div>
              <button
                className="text-slate-400 hover:text-slate-700 transition p-0.5"
                title={isGuideOpen ? 'Collapse guide' : 'Expand guide'}
              >
                {isGuideOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Format Items List (8 items matching exact design) */}
            <div className="space-y-2.5">
              {FORMAT_GUIDE_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleInsertSnippet(item)}
                    className={`p-3 rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-xs bg-white transition-all cursor-pointer border-l-4 ${item.borderColor} group active:scale-[0.99]`}
                    title={`Click to insert ${item.title}`}
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                        {item.title}
                      </span>
                    </div>

                    <div className="mt-1 pl-5.5 space-y-0.5">
                      <div className="text-[11px] font-mono text-slate-600 leading-snug truncate">
                        {item.example}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {item.subtext}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Accent Banner: Simple. Focused. Powerful. */}
            <div className="mt-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-blue-950">Simple. Focused. Powerful.</div>
                <p className="text-[11px] text-blue-700/80 mt-0.5 leading-snug">
                  Write your story, we'll handle the format.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Download className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Export Screenplay</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Choose your preferred format to export <span className="font-semibold text-slate-700">"{scriptTitle}"</span>.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={handleExportText}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 flex items-center justify-between text-left transition cursor-pointer group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                    Fountain Script (.fountain)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Industry standard plain text format compatible with Final Draft & Highland
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </button>

              <button
                onClick={handleCopyScript}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 flex items-center justify-between text-left transition cursor-pointer group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                    Copy to Clipboard
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {copiedNotification ? 'Copied to clipboard!' : 'Quickly copy formatted text for pasting into other apps'}
                  </div>
                </div>
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </button>

              <button
                onClick={handlePrint}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 flex items-center justify-between text-left transition cursor-pointer group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                    Print / PDF Document
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Open browser print dialogue to print or save as PDF
                  </div>
                </div>
                <Printer className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
