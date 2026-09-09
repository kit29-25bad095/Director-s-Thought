import React, { useState } from 'react';
import {
  Film,
  Camera,
  Layers,
  Users,
  MapPin,
  Package,
  Shirt,
  PenTool,
  Calendar,
  DollarSign,
  Box,
  Users2,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  FileSpreadsheet,
  FileText,
  Sparkles,
  Search,
  Bell,
  ChevronDown,
  Plus,
  Download,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Home,
  CheckCircle2,
  X,
  Play,
  ArrowRight,
  Sliders,
  Share2,
  Filter,
} from 'lucide-react';
import { PREPROD_SCENES, PREPROD_SHOTS_DATA, PreprodScene, PreprodShot } from '../../data/preproductionUiData';

export type PreprodSidebarTab =
  | 'dashboard'
  | 'script-analysis'
  | 'scene-breakdown'
  | 'characters'
  | 'locations'
  | 'props'
  | 'costume'
  | 'production-design'
  | 'camera-plan'
  | 'shot-list'
  | 'storyboard'
  | 'schedule'
  | 'budget'
  | 'equipment'
  | 'crew'
  | 'continuity'
  | 'risk-analysis'
  | 'permissions'
  | 'reports';

interface PreProductionStudioViewProps {
  onNavigateTab?: (tab: string) => void;
  onSelectTopTab?: (tab: 'script' | 'pre-production' | 'production' | 'post-production') => void;
  activeTopTab?: 'script' | 'pre-production' | 'production' | 'post-production';
}

export const PreProductionStudioView: React.FC<PreProductionStudioViewProps> = ({
  onNavigateTab,
  onSelectTopTab,
  activeTopTab = 'pre-production',
}) => {
  // Navigation State
  const [activeSidebarTab, setActiveSidebarTab] = useState<PreprodSidebarTab>('shot-list');
  const [selectedSceneId, setSelectedSceneId] = useState<string>('sc_01');
  const [selectedShotIndex, setSelectedShotIndex] = useState<number>(0);
  const [sceneTabMode, setSceneTabMode] = useState<'scenes' | 'shots'>('scenes');

  // Filter States
  const [sceneFilter, setSceneFilter] = useState('All Scenes');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [timeOfDayFilter, setTimeOfDayFilter] = useState('All Day/Night');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isSceneDetailsOpen, setIsSceneDetailsOpen] = useState(false);
  const [isAddShotOpen, setIsAddShotOpen] = useState(false);
  const [isGenerateAiOpen, setIsGenerateAiOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [aiAssistantInput, setAiAssistantInput] = useState('');
  const [aiAssistantReply, setAiAssistantReply] = useState<string | null>(null);

  // Shots management
  const [allShots, setAllShots] = useState(PREPROD_SHOTS_DATA);

  // Current Scene & Shots
  const currentScene = PREPROD_SCENES.find((s) => s.id === selectedSceneId) || PREPROD_SCENES[0];
  const currentShots = allShots[selectedSceneId] || [];
  const selectedShot = currentShots[selectedShotIndex] || currentShots[0];

  // Total duration calculation
  const totalSceneDurationSec = currentShots.reduce((acc, shot) => acc + (shot.durationSec || 6), 0);

  // Filtered scenes
  const filteredScenes = PREPROD_SCENES.filter((sc) => {
    if (sceneFilter !== 'All Scenes' && sc.sceneNumber !== sceneFilter) return false;
    if (locationFilter !== 'All Locations' && !sc.location.includes(locationFilter)) return false;
    if (timeOfDayFilter !== 'All Day/Night' && sc.timeOfDay !== timeOfDayFilter) return false;
    if (
      searchQuery &&
      !sc.slugline.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !sc.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Filtered shots for the current scene
  const filteredShots = currentShots.filter((shot) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      shot.shotNumber.toLowerCase().includes(q) ||
      shot.shotType.toLowerCase().includes(q) ||
      shot.purpose.toLowerCase().includes(q) ||
      shot.lens.toLowerCase().includes(q)
    );
  });

  // Handle AI Assistant submit
  const handleAskAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiAssistantInput.trim()) return;
    const query = aiAssistantInput;
    setAiAssistantInput('');
    setAiAssistantReply(
      `Analyzing project for "${query}"... Based on Scene 01, natural 5600K key light with an 85mm prime lens on shot 1.3 is recommended to maximize character empathy.`
    );
  };

  const handleNextShot = () => {
    if (selectedShotIndex < currentShots.length - 1) {
      setSelectedShotIndex(selectedShotIndex + 1);
    } else {
      setSelectedShotIndex(0);
    }
  };

  const handlePrevShot = () => {
    if (selectedShotIndex > 0) {
      setSelectedShotIndex(selectedShotIndex - 1);
    } else {
      setSelectedShotIndex(currentShots.length - 1);
    }
  };

  // Add a new shot
  const handleCreateShot = (shotData: Partial<PreprodShot>) => {
    const nextNum = `${currentScene.sceneNumber.replace('Scene ', '').trim()}.${currentShots.length + 1}`;
    const newShot: PreprodShot = {
      id: `shot_${Date.now()}`,
      shotNumber: nextNum,
      sceneId: selectedSceneId,
      thumbnail: currentScene.thumbnail,
      storyboardImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      aiGeneratedImage: currentScene.thumbnail,
      shotType: shotData.shotType || 'Medium Shot',
      angle: shotData.angle || 'Eye Level',
      movement: shotData.movement || 'Static',
      lens: shotData.lens || '50mm',
      duration: shotData.duration || '6 sec',
      durationSec: 6,
      purpose: shotData.purpose || 'Capture character reaction',
      aiSuggestion: 'Frame slightly off-center to suggest dynamic instability.',
      aiInsight: {
        description: 'New shot added to coverage plan. Optimizes editing transitions.',
        confidence: 'High Confidence',
        source: 'User Input',
      },
    };

    setAllShots((prev) => ({
      ...prev,
      [selectedSceneId]: [...(prev[selectedSceneId] || []), newShot],
    }));
    setIsAddShotOpen(false);
  };

  // Sidebar navigation items
  const sidebarItems: { id: PreprodSidebarTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'script-analysis', label: 'Script Analysis', icon: FileText },
    { id: 'scene-breakdown', label: 'Scene Breakdown', icon: Layers },
    { id: 'characters', label: 'Characters', icon: Users },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'props', label: 'Props', icon: Package },
    { id: 'costume', label: 'Costume & Wardrobe', icon: Shirt },
    { id: 'production-design', label: 'Production Design', icon: PenTool },
    { id: 'camera-plan', label: 'Camera Plan', icon: Camera },
    { id: 'shot-list', label: 'Shot List', icon: Film },
    { id: 'storyboard', label: 'Storyboard', icon: Film },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'budget', label: 'Budget', icon: DollarSign },
    { id: 'equipment', label: 'Equipment', icon: Box },
    { id: 'crew', label: 'Crew', icon: Users2 },
    { id: 'continuity', label: 'Continuity', icon: RefreshCw },
    { id: 'risk-analysis', label: 'Risk Analysis', icon: AlertTriangle },
    { id: 'permissions', label: 'Permissions', icon: ShieldCheck },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-[#F8FAFC] text-slate-800 font-sans antialiased overflow-hidden select-none">
      {/* 1. TOP HEADER BAR */}
      <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 z-30">
        {/* Left Brand & Project Dropdown */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">Director's Thought</h1>
              <p className="text-[10px] text-slate-400 font-medium leading-none">AI Powered Filmmaking</p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Project Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Project</span>
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition">
                <span>The Last Horizon</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Primary Nav Tabs */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          <button
            onClick={() => onSelectTopTab && onSelectTopTab('script')}
            className={`h-full text-xs font-semibold transition px-1 flex items-center relative ${
              activeTopTab === 'script' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Script
            {activeTopTab === 'script' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
          </button>

          <button
            onClick={() => onSelectTopTab && onSelectTopTab('pre-production')}
            className={`h-full text-xs font-semibold transition px-1 flex items-center relative ${
              activeTopTab === 'pre-production' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pre-Production
            {activeTopTab === 'pre-production' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
          </button>

          <button
            onClick={() => onSelectTopTab && onSelectTopTab('production')}
            className={`h-full text-xs font-semibold transition px-1 flex items-center relative ${
              activeTopTab === 'production' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Production
            {activeTopTab === 'production' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
          </button>

          <button
            onClick={() => onSelectTopTab && onSelectTopTab('post-production')}
            className={`h-full text-xs font-semibold transition px-1 flex items-center relative ${
              activeTopTab === 'post-production' ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Post-Production
            {activeTopTab === 'post-production' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition">
            <Search className="w-4 h-4" />
          </button>

          <div className="relative">
            <button className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
          </div>

          <div className="h-6 w-px bg-slate-200" />

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-1 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Alex Carter"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="hidden lg:block text-left">
              <span className="block text-xs font-bold text-slate-800 leading-tight">Alex Carter</span>
              <span className="block text-[10px] text-slate-400 font-medium leading-none">Director</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </div>
        </div>
      </header>

      {/* 2. BODY WORKSPACE: LEFT SIDEBAR + MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 overflow-y-auto scrollbar-thin">
          <div className="p-3 space-y-1">
            {/* Dashboard top link */}
            <button
              onClick={() => {
                setActiveSidebarTab('dashboard');
                onNavigateTab && onNavigateTab('dashboard');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                activeSidebarTab === 'dashboard'
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            {/* Section Header */}
            <div className="pt-4 pb-1 px-3">
              <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                Pre-Production
              </span>
            </div>

            {/* Nav Items List */}
            {sidebarItems.slice(1).map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebarTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSidebarTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition text-left ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom AI Assistant Card */}
          <div className="p-3 m-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-blue-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">AI Assistant</span>
            </div>
            <p className="text-xs font-bold text-slate-900 leading-tight">Ask Director's Thought AI</p>

            <form onSubmit={handleAskAi} className="relative mt-2">
              <input
                type="text"
                value={aiAssistantInput}
                onChange={(e) => setAiAssistantInput(e.target.value)}
                placeholder="Ask anything about your project..."
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 pr-9 text-[11px] text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 transition"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition cursor-pointer"
              >
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>

            {aiAssistantReply && (
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-[11px] text-blue-900 mt-2">
                <p className="leading-relaxed">{aiAssistantReply}</p>
                <button
                  onClick={() => setAiAssistantReply(null)}
                  className="text-[10px] text-blue-600 font-bold mt-1 underline block"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN WORKSPACE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] flex flex-col">
          {/* If Active Tab is Shot List (as shown in reference image) */}
          {activeSidebarTab === 'shot-list' ? (
            <div className="p-6 space-y-5 max-w-[1680px] mx-auto w-full">
              {/* 1. MODULE SUB-HEADER / TOOLBAR */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight">Shot List</h2>
                    <p className="text-xs text-slate-500 font-medium">
                      AI-generated shot list with scene breakdown, camera details and more.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setIsGenerateAiOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-50 transition shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate with AI</span>
                  </button>

                  <button
                    onClick={() => setIsAddShotOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition shadow-xs shadow-blue-500/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Shot</span>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setIsExportOpen(!isExportOpen)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                      <span>Export</span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </button>
                    {isExportOpen && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-40 text-xs">
                        <button
                          onClick={() => {
                            alert('Exporting PDF Shot List with thumbnails & storyboard...');
                            setIsExportOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
                        >
                          Export PDF Shot List
                        </button>
                        <button
                          onClick={() => {
                            alert('Exporting CSV for production spreadsheet...');
                            setIsExportOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
                        >
                          Export CSV Spreadsheet
                        </button>
                        <button
                          onClick={() => {
                            alert('Exporting Final Draft / XML / EDL for NLE...');
                            setIsExportOpen(false);
                          }}
                          className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-700 font-medium"
                        >
                          Export XML / Final Cut Pro
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. FILTER BAR */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  {/* Scenes Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">Scenes</span>
                    <select
                      value={sceneFilter}
                      onChange={(e) => setSceneFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-blue-500"
                    >
                      <option value="All Scenes">All Scenes</option>
                      {PREPROD_SCENES.map((s) => (
                        <option key={s.id} value={s.sceneNumber}>
                          {s.sceneNumber} - {s.slugline}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Locations Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">Locations</span>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-blue-500"
                    >
                      <option value="All Locations">All Locations</option>
                      <option value="Apartment">Apartment Loft</option>
                      <option value="City Street">City Street</option>
                      <option value="Office">Office</option>
                      <option value="River Side">River Side</option>
                      <option value="Cafe">Cafe</option>
                      <option value="Bridge">Bridge</option>
                    </select>
                  </div>

                  {/* Time of Day Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">Time of Day</span>
                    <select
                      value={timeOfDayFilter}
                      onChange={(e) => setTimeOfDayFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-blue-500"
                    >
                      <option value="All Day/Night">All Day/Night</option>
                      <option value="DAY">Day</option>
                      <option value="NIGHT">Night</option>
                      <option value="MORNING">Morning</option>
                      <option value="EVENING">Evening</option>
                    </select>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by scene, shot, or action..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              {/* 3. THREE-COLUMN WORKSPACE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* COLUMN 1: SCENE SELECTOR (col-span-12 lg:col-span-3) */}
                <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-4 space-y-4 shadow-2xs">
                  {/* Toggle Tabs: Scenes | Shots */}
                  <div className="flex items-center gap-4 border-b border-slate-200 pb-2 text-xs font-semibold">
                    <button
                      onClick={() => setSceneTabMode('scenes')}
                      className={`relative pb-2 transition ${
                        sceneTabMode === 'scenes' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Scenes
                      {sceneTabMode === 'scenes' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                      )}
                    </button>
                    <button
                      onClick={() => setSceneTabMode('shots')}
                      className={`relative pb-2 transition ${
                        sceneTabMode === 'shots' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Shots
                      {sceneTabMode === 'shots' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                      )}
                    </button>
                  </div>

                  {/* Scenes List */}
                  <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
                    {filteredScenes.map((scene) => {
                      const isSelected = scene.id === selectedSceneId;
                      return (
                        <div
                          key={scene.id}
                          onClick={() => {
                            setSelectedSceneId(scene.id);
                            setSelectedShotIndex(0);
                          }}
                          className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-blue-50/70 border-blue-300 ring-1 ring-blue-400/30'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={scene.thumbnail}
                              alt={scene.sceneNumber}
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-900">{scene.sceneNumber}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-medium truncate">{scene.slugline}</p>
                              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                                {allShots[scene.id]?.length || scene.shotCount} shots
                              </span>
                            </div>
                          </div>

                          <ChevronRight
                            className={`w-4 h-4 shrink-0 transition ${
                              isSelected ? 'text-blue-600' : 'text-slate-300'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* COLUMN 2: SELECTED SCENE SHOT LIST TABLE (col-span-12 lg:col-span-6) */}
                <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
                  {/* Scene Details Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-bold text-slate-900">{currentScene.sceneNumber}</h3>
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        {currentScene.slugline}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          {currentShots.length} shots
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          {currentScene.timeOfDay}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          {currentScene.setting === 'INT' ? 'Interior' : 'Exterior'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsSceneDetailsOpen(true)}
                      className="px-3 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
                    >
                      View Scene Details
                    </button>
                  </div>

                  {/* Shots Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-semibold text-[11px]">
                          <th className="pb-3 w-10">#</th>
                          <th className="pb-3 w-28">Shot</th>
                          <th className="pb-3">Shot Details</th>
                          <th className="pb-3 w-20">Duration</th>
                          <th className="pb-3">AI Suggestion</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredShots.map((shot, idx) => {
                          const isSelected = idx === selectedShotIndex;
                          return (
                            <tr
                              key={shot.id}
                              onClick={() => setSelectedShotIndex(idx)}
                              className={`cursor-pointer transition group ${
                                isSelected ? 'bg-blue-50/40' : 'hover:bg-slate-50/70'
                              }`}
                            >
                              {/* Shot Number */}
                              <td className="py-3 font-semibold text-slate-700 align-top">{shot.shotNumber}</td>

                              {/* Shot Thumbnail */}
                              <td className="py-3 pr-3 align-top">
                                <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-video w-24">
                                  <img
                                    src={shot.thumbnail}
                                    alt={`Shot ${shot.shotNumber}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition"
                                  />
                                </div>
                              </td>

                              {/* Shot Details */}
                              <td className="py-3 pr-3 align-top space-y-0.5">
                                <span className="font-bold text-slate-900 block text-xs">{shot.shotType}</span>
                                <div className="text-[11px] text-slate-500 leading-tight space-y-0.5">
                                  <p>Angle: {shot.angle}</p>
                                  <p>Movement: {shot.movement}</p>
                                  <p>Lens: {shot.lens}</p>
                                  <p className="text-slate-600">Purpose: {shot.purpose}</p>
                                </div>
                              </td>

                              {/* Duration */}
                              <td className="py-3 pr-3 text-slate-600 font-medium align-top whitespace-nowrap">
                                {shot.duration}
                              </td>

                              {/* AI Suggestion */}
                              <td className="py-3 align-top space-y-1">
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">
                                  <Lightbulb className="w-3 h-3" />
                                  <span>AI Suggestion</span>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-relaxed">{shot.aiSuggestion}</p>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer: Total Duration */}
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
                    <span>Total Duration ({currentScene.sceneNumber})</span>
                    <span className="text-slate-900 font-bold">{totalSceneDurationSec} sec</span>
                  </div>
                </div>

                {/* COLUMN 3: RIGHT INSPECTOR PANEL (col-span-12 lg:col-span-3) */}
                <div className="lg:col-span-3 space-y-4">
                  {/* CARD 1: AI STORYBOARD PREVIEW */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <h4 className="text-xs font-bold text-slate-900">AI Storyboard Preview</h4>
                      </div>
                      <button
                        onClick={() => alert(`Regenerating pencil storyboard sketch for Shot ${selectedShot?.shotNumber}...`)}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition"
                      >
                        Generate
                      </button>
                    </div>

                    {/* Storyboard Image */}
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img
                        src={selectedShot?.storyboardImage}
                        alt="Storyboard sketch"
                        className="w-full h-full object-cover filter contrast-125"
                      />
                    </div>

                    {/* Storyboard Pagination & Label */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div>
                        <span className="font-bold text-slate-800 block text-xs">
                          {currentScene.sceneNumber} | Shot {selectedShot?.shotNumber}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {selectedShot?.shotType} - {selectedShot?.angle} - {selectedShot?.lens}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-500 font-mono text-xs">
                        <button
                          onClick={handlePrevShot}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600 transition"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span>
                          {selectedShotIndex + 1} / {currentShots.length}
                        </span>
                        <button
                          onClick={handleNextShot}
                          className="p-1 hover:bg-slate-100 rounded text-slate-600 transition"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: SHOT DETAILS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2.5 shadow-2xs text-xs">
                    <h4 className="font-bold text-slate-900 text-xs pb-1 border-b border-slate-100">
                      Shot Details
                    </h4>

                    <div className="grid grid-cols-2 gap-y-2 text-[11px]">
                      <span className="text-slate-400">Scene</span>
                      <span className="font-semibold text-slate-800 text-right truncate">
                        {currentScene.sceneNumber} - {currentScene.slugline}
                      </span>

                      <span className="text-slate-400">Shot Number</span>
                      <span className="font-semibold text-slate-800 text-right">{selectedShot?.shotNumber}</span>

                      <span className="text-slate-400">Shot Type</span>
                      <span className="font-semibold text-slate-800 text-right">{selectedShot?.shotType}</span>

                      <span className="text-slate-400">Angle</span>
                      <span className="font-semibold text-slate-800 text-right">{selectedShot?.angle}</span>

                      <span className="text-slate-400">Movement</span>
                      <span className="font-semibold text-slate-800 text-right">{selectedShot?.movement}</span>

                      <span className="text-slate-400">Lens</span>
                      <span className="font-semibold text-slate-800 text-right">{selectedShot?.lens}</span>

                      <span className="text-slate-400">Duration</span>
                      <span className="font-semibold text-slate-800 text-right">{selectedShot?.duration}</span>

                      <span className="text-slate-400">Purpose</span>
                      <span className="font-semibold text-slate-800 text-right truncate">{selectedShot?.purpose}</span>
                    </div>
                  </div>

                  {/* CARD 3: AI GENERATED IMAGE */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <h4 className="text-xs font-bold text-slate-900">AI Generated Image</h4>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <button
                          onClick={() => alert('Downloading preview render image...')}
                          className="p-1 hover:text-slate-700 transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => alert('Opening full-screen high-res preview...')}
                          className="p-1 hover:text-slate-700 transition"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img
                        src={selectedShot?.aiGeneratedImage}
                        alt="AI Generated Still"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex justify-end pt-0.5">
                      <button
                        onClick={() => alert(`Regenerating photorealistic look for Shot ${selectedShot?.shotNumber}...`)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                      >
                        <RefreshCw className="w-3 h-3 text-slate-500" />
                        <span>Regenerate</span>
                      </button>
                    </div>
                  </div>

                  {/* CARD 4: AI INSIGHT */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2.5 shadow-2xs text-xs">
                    <div className="flex items-center gap-1.5 text-blue-600 font-bold">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>AI Insight</span>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {selectedShot?.aiInsight?.description ||
                        "This shot sets the tone for the scene and establishes the character's environment. Natural morning light will create a realistic and emotional atmosphere."}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {selectedShot?.aiInsight?.confidence || 'High Confidence'}
                      </span>
                      <span className="text-slate-400 font-medium">
                        {selectedShot?.aiInsight?.source || 'Source: Scene 01, Script'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* OTHER PRE-PRODUCTION SUBMODULE VIEWS WITH THE SAME PRISTINE DESIGN SYSTEM */
            <div className="p-6 space-y-6 max-w-[1680px] mx-auto w-full">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 capitalize">
                    {activeSidebarTab.replace('-', ' ')}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Comprehensive production intelligence for {activeSidebarTab.replace('-', ' ')}.
                  </p>
                </div>
                <button
                  onClick={() => setActiveSidebarTab('shot-list')}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                >
                  Return to Shot List
                </button>
              </div>

              {/* Dynamic View Placeholder for other sections */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 capitalize">
                      {activeSidebarTab.replace('-', ' ')} Studio Active
                    </h3>
                    <p className="text-xs text-slate-500">
                      All 15 departments are synchronized with the central Project Intelligence Layer.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
                    <span className="text-sm font-bold text-emerald-600 block mt-1">100% Shoot Ready</span>
                    <span className="text-xs text-slate-500">Approved by Director Alex Carter</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Department Link</span>
                    <span className="text-sm font-bold text-slate-900 block mt-1">6 Scenes Connected</span>
                    <span className="text-xs text-slate-500">Auto-cascading schedule changes</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Quality Score</span>
                    <span className="text-sm font-bold text-blue-600 block mt-1">96 / 100</span>
                    <span className="text-xs text-slate-500">Zero continuity conflicts detected</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: VIEW SCENE DETAILS */}
      {isSceneDetailsOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{currentScene.sceneNumber} Breakdown</h3>
                <p className="text-xs text-slate-500">{currentScene.slugline}</p>
              </div>
              <button
                onClick={() => setIsSceneDetailsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-700 block mb-1">Scene Synopsis</span>
                <p className="text-slate-600 leading-relaxed p-3 bg-slate-50 rounded-xl border border-slate-100">
                  {currentScene.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Characters</span>
                  <span className="font-semibold text-slate-800">{currentScene.characters.join(', ')}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Filming Location</span>
                  <span className="font-semibold text-slate-800">{currentScene.location}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Director's Tone & Atmosphere</span>
                <p className="text-slate-600 leading-relaxed">
                  Start intimate and tranquil. Use natural 3200K morning illumination with faint street hum below.
                  The sudden electronic alert at shot 1.2 breaks the calm, shifting the visual palette toward tense, shallow-focus isolation.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsSceneDetailsOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD SHOT */}
      {isAddShotOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Shot to {currentScene.sceneNumber}</h3>
              <button
                onClick={() => setIsAddShotOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const shotType = (form.elements.namedItem('shotType') as HTMLSelectElement).value;
                const angle = (form.elements.namedItem('angle') as HTMLSelectElement).value;
                const movement = (form.elements.namedItem('movement') as HTMLSelectElement).value;
                const lens = (form.elements.namedItem('lens') as HTMLInputElement).value;
                const purpose = (form.elements.namedItem('purpose') as HTMLInputElement).value;
                handleCreateShot({ shotType, angle, movement, lens, purpose });
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Shot Type</label>
                  <select
                    name="shotType"
                    defaultValue="Medium Shot"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                  >
                    <option value="Wide Shot">Wide Shot</option>
                    <option value="Medium Shot">Medium Shot</option>
                    <option value="Medium Close Up">Medium Close Up</option>
                    <option value="Close Up">Close Up</option>
                    <option value="Extreme Close Up">Extreme Close Up</option>
                    <option value="POV">POV</option>
                    <option value="Over Shoulder">Over Shoulder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Angle</label>
                  <select
                    name="angle"
                    defaultValue="Eye Level"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                  >
                    <option value="Eye Level">Eye Level</option>
                    <option value="Low Angle">Low Angle</option>
                    <option value="High Angle">High Angle</option>
                    <option value="Dutch Angle">Dutch Angle</option>
                    <option value="Bird Eye">Bird Eye</option>
                    <option value="Behind Character">Behind Character</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Movement</label>
                  <select
                    name="movement"
                    defaultValue="Static"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                  >
                    <option value="Static">Static</option>
                    <option value="Push In">Push In</option>
                    <option value="Pull Out">Pull Out</option>
                    <option value="Slow Pan">Slow Pan</option>
                    <option value="Steadicam">Steadicam</option>
                    <option value="Handheld">Handheld</option>
                    <option value="Dolly">Dolly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Lens</label>
                  <input
                    name="lens"
                    defaultValue="50mm"
                    placeholder="e.g., 35mm, 50mm, 85mm"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Story Purpose</label>
                <input
                  name="purpose"
                  defaultValue="Capture character reaction to incoming alert"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-800"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddShotOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition"
                >
                  Save Shot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: GENERATE WITH AI */}
      {isGenerateAiOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">AI Shot List Generator</h3>
              </div>
              <button
                onClick={() => setIsGenerateAiOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Generate full cinematic shot coverage for <strong>{currentScene.sceneNumber}</strong> using script breakdown, character emotion vectors, and cinematography grammar.
            </p>

            <div className="space-y-2 text-xs">
              <label className="block text-slate-600 font-semibold">Cinematography Style Preset</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-800 font-medium">
                <option>Intimate Naturalism (Roger Deakins / Denis Villeneuve)</option>
                <option>High Kinetic Energy (Christopher Nolan / Hoyte van Hoytema)</option>
                <option>Stylized Symmetrical (Wes Anderson)</option>
                <option>Neo-Noir Shadows (Gordon Willis)</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsGenerateAiOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`AI successfully generated coverage for ${currentScene.sceneNumber}! Added 2 alternate angles.`);
                  setIsGenerateAiOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Coverage</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
