import React, { useState, useRef, useEffect } from 'react';
import {
  Lightbulb,
  Save,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  MessageSquare,
  Flame,
  Film,
  Users,
  Edit3,
  Bookmark,
  FileText,
  Loader2,
  Globe,
  Languages,
} from 'lucide-react';
import { Project, Role } from '../../types';

interface IdeaLandingViewProps {
  project: Project;
  activeRole: Role;
  onNavigateTab: (tab: any) => void;
  onOpenNewProject: () => void;
  onSelectExistingProject: (title: string, stage: string) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  savedToHistory?: boolean;
}

type DiscussionMode = 'collaborator' | 'devils_advocate' | 'director_vision' | 'character_dramaturg';

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  snippet?: string;
}

export const IdeaLandingView: React.FC<IdeaLandingViewProps> = ({
  project,
  activeRole,
  onNavigateTab,
}) => {
  const [filmIdeaText, setFilmIdeaText] = useState(
    'A young filmmaker tries to complete his first movie despite problems with his team.'
  );
  const [isEditingIdea, setIsEditingIdea] = useState(false);
  const [editedIdeaDraft, setEditedIdeaDraft] = useState(filmIdeaText);

  // Tab mode: 'chat' (AI Chatbot) or 'notes' (Manual Development Notes)
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'notes'>('chat');

  // Manual notes state
  const [discussionText, setDiscussionText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Discussion Persona Mode
  const [discussionMode] = useState<DiscussionMode>('collaborator');

  // Timeline Idea History (matching user screenshot)
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: '1', title: 'Initial idea', date: 'Sep 1, 2025' },
    { id: '2', title: 'Team discussion', date: 'Sep 2, 2025' },
    { id: '3', title: 'New angle', date: 'Sep 3, 2025' },
  ]);

  // AI Chat Messages state - short, natural, friendly conversation
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Hey bro! Let's talk about your film idea: "${filmIdeaText}". What scene or team conflict do you want to bounce around?`,
      timestamp: 'Just now',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom when messages update
  useEffect(() => {
    if (activeSubTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeSubTab, isLoading]);

  // Quick friendly discussion sparks
  const discussionSparks = [
    'Bro, director-kum DP-kum ego clash epdi set panlaam?',
    'What if the producer pulls funding midway?',
    'Lead actor caravan vittu veliya vara maaten nu solraan',
    'Give me a punchy climax twist with the crew',
  ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        role: 'user',
        content: textToSend,
        timestamp: nowStr,
      },
    ];

    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/discussion-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          filmIdea: filmIdeaText,
          mode: discussionMode,
          project,
        }),
      });

      const data = await response.json();
      const replyContent = data.reply || 'Great point bro! Let us take it forward.';

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: replyContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.warn('Chat request failed, providing short friendly insight:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: `Semma thought bro! Have the senior DP refuse to light the young director's shot right before sunset so the entire crew is caught in between. Crucial scene-la idhappadi oru ego clash vekkalaama bro?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToHistory = (content: string, messageId?: string) => {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    let derivedTitle = content
      .replace(/^#+\s*/, '')
      .replace(/^\*+\s*/, '')
      .replace(/[*_`]/g, '')
      .split('\n')[0]
      .trim();

    if (derivedTitle.length > 40) {
      derivedTitle = derivedTitle.slice(0, 38) + '...';
    }

    setHistory((prev) => [
      {
        id: `${Date.now()}`,
        title: derivedTitle || 'Discussion takeaway',
        date: today,
        snippet: content.slice(0, 120),
      },
      ...prev,
    ]);

    if (messageId) {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, savedToHistory: true } : m))
      );
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleManualSave = () => {
    if (discussionText.trim()) {
      handleSaveToHistory(discussionText.trim());
      setDiscussionText('');
    } else {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRestartChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Hey bro! Fresh slate. What angle or scene are you thinking about right now?`,
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f4f6fb] text-slate-800 p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header matching original layout */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Idea</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Discuss, stress-test, and evolve your concept with your friendly multilingual AI creative partner.
            </p>
          </div>
          <button
            id="btn-advance-story"
            onClick={() => onNavigateTab('story')}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition cursor-pointer shadow-2xs"
          >
            <span>Advance to Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Two-column layout (Left: Idea & Discussion Chatbot, Right: Idea History) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Film Idea & Discussion / Development */}
          <div className="lg:col-span-8 space-y-6">
            {/* Card 1: Film Idea (Matching Screen 4 & Screenshot) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span>Film Idea</span>
                </div>
                {!isEditingIdea ? (
                  <button
                    onClick={() => {
                      setEditedIdeaDraft(filmIdeaText);
                      setIsEditingIdea(true);
                    }}
                    className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-blue-600 transition cursor-pointer px-2 py-1 rounded-md hover:bg-slate-50"
                    title="Edit Film Idea"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Idea</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditingIdea(false)}
                      className="text-[11px] text-slate-500 hover:text-slate-700 px-2 py-1 rounded-md hover:bg-slate-100 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (editedIdeaDraft.trim()) {
                          setFilmIdeaText(editedIdeaDraft.trim());
                        }
                        setIsEditingIdea(false);
                      }}
                      className="text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-md transition cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {isEditingIdea ? (
                <textarea
                  value={editedIdeaDraft}
                  onChange={(e) => setEditedIdeaDraft(e.target.value)}
                  rows={2}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-blue-400 text-slate-900 text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-500 transition"
                  placeholder="Enter film idea..."
                />
              ) : (
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {filmIdeaText}
                </p>
              )}
            </div>

            {/* Card 2: Discussion / Development with Multilingual NLP AI Chatbot */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col overflow-hidden">
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-slate-900">Discussion</h2>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Short, real chat with your creative collaborator
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                    <button
                      id="tab-ai-chat"
                      onClick={() => setActiveSubTab('chat')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        activeSubTab === 'chat'
                          ? 'bg-white text-blue-600 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat</span>
                    </button>
                    <button
                      id="tab-manual-notes"
                      onClick={() => setActiveSubTab('notes')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        activeSubTab === 'notes'
                          ? 'bg-white text-blue-600 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Notes</span>
                    </button>
                  </div>

                  {activeSubTab === 'chat' && (
                    <button
                      onClick={handleRestartChat}
                      className="text-[11px] text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                      title="Restart chat"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Chatbot Content Area */}
              {activeSubTab === 'chat' ? (
                <div className="flex flex-col flex-1">
                  {/* Messages Thread */}
                  <div className="p-4 sm:p-5 space-y-3.5 max-h-105 min-h-65 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                    {messages.map((message) => {
                      const isAi = message.role === 'assistant';
                      return (
                        <div
                          key={message.id}
                          className={`flex items-start gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
                        >
                          {isAi && (
                            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              AI
                            </div>
                          )}

                          <div
                            className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                              isAi
                                ? 'bg-slate-100/90 text-slate-800 rounded-tl-xs'
                                : 'bg-blue-600 text-white rounded-tr-xs'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3 mb-1">
                              <span
                                className={`text-[10px] font-semibold ${
                                  isAi ? 'text-blue-600' : 'text-blue-200'
                                }`}
                              >
                                {isAi ? 'Creative Friend' : 'You'}
                              </span>
                              <span
                                className={`text-[10px] ${
                                  isAi ? 'text-slate-400' : 'text-blue-200/70'
                                }`}
                              >
                                {message.timestamp}
                              </span>
                            </div>

                            <p className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed">
                              {message.content}
                            </p>

                            {/* Clean compact action buttons for AI responses */}
                            {isAi && (
                              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                                <button
                                  onClick={() => handleSaveToHistory(message.content, message.id)}
                                  disabled={message.savedToHistory}
                                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition cursor-pointer ${
                                    message.savedToHistory
                                      ? 'text-emerald-700 font-semibold'
                                      : 'text-blue-600 hover:text-blue-800'
                                  }`}
                                >
                                  {message.savedToHistory ? (
                                    <>
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span>Saved</span>
                                    </>
                                  ) : (
                                    <>
                                      <Bookmark className="w-3 h-3" />
                                      <span>Save to History</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => handleCopyText(message.id, message.content)}
                                  className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 transition cursor-pointer"
                                  title="Copy response"
                                >
                                  {copiedId === message.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-600" />
                                      <span className="text-emerald-600 font-medium">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>

                          {!isAi && (
                            <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                              Y
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {isLoading && (
                      <div className="flex items-start gap-2.5 justify-start">
                        <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 animate-pulse text-xs font-bold">
                          AI
                        </div>
                        <div className="bg-slate-100 rounded-2xl px-3.5 py-2 text-xs text-slate-600 flex items-center gap-2">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                          <span>Typing...</span>
                        </div>
                      </div>
                    )}

                    <div ref={chatBottomRef} />
                  </div>

                  {/* Clean Quick Discussion Sparks */}
                  <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center gap-1.5 overflow-x-auto">
                    {discussionSparks.map((spark, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(spark)}
                        className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-400 text-[11px] font-medium transition cursor-pointer whitespace-nowrap shrink-0 shadow-2xs"
                      >
                        {spark}
                      </button>
                    ))}
                  </div>

                  {/* Chat Input Bar */}
                  <div className="p-3 sm:p-4 border-t border-slate-200/80 bg-white">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        id="discussion-chat-input"
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Talk like a friend (English, Tanglish, தமிழ், etc.)..."
                        disabled={isLoading}
                        className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition placeholder-slate-400 disabled:opacity-50"
                      />
                      <button
                        id="btn-send-discussion"
                        type="submit"
                        disabled={!inputMessage.trim() || isLoading}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold transition cursor-pointer shadow-xs flex items-center gap-1.5 shrink-0"
                      >
                        {isLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <>
                            <span>Send</span>
                            <Send className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                /* Manual Notes Mode (matching original textarea layout) */
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Manual Development Scratchpad</label>
                    <span className="text-xs text-slate-400">Write freeform thoughts and sync to history</span>
                  </div>
                  <textarea
                    id="discussion-notes-textarea"
                    value={discussionText}
                    onChange={(e) => setDiscussionText(e.target.value)}
                    placeholder="Add your thoughts, discussions or development notes in any language..."
                    rows={8}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none placeholder-slate-400"
                  />
                  <div className="flex items-center justify-between pt-1">
                    {isSaved ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Saved to Idea History!</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Notes sync with production timeline</span>
                    )}
                    <button
                      id="btn-save-idea"
                      onClick={handleManualSave}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (4 cols): Idea History (Matching Screen 4 & Screenshot) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">Idea History</h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold">
                  {history.length} Entries
                </span>
              </div>

              <div className="relative pl-4 space-y-5 border-l-2 border-slate-100">
                {history.map((item) => (
                  <div key={item.id} className="relative group">
                    {/* Timeline dot matching screenshot exactly */}
                    <span className="absolute -left-5.25 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-50 group-hover:scale-125 transition-transform" />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">{item.date}</p>
                      {item.snippet && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 bg-slate-50 p-1.5 rounded-md border border-slate-100">
                          {item.snippet}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Prompt to discuss history */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setActiveSubTab('chat');
                    handleSendMessage('Summarize our discussion so far and propose the next 3 scenes to write.');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200/80 hover:border-blue-200 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Synthesize History with AI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
