import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  Brain,
  Layers,
  ChevronRight,
  Lightbulb,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Project, Role } from '../../types';
import { askAIAssistant } from '../../services/geminiService';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeModule: string;
  project: Project;
  activeRole: Role;
  selectedContext?: any;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  roleTag?: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  activeModule,
  project,
  activeRole,
  selectedContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I am your ${activeRole} Decision Intelligence Partner.
I have full context of "${project.name}" (Draft 04, Budget: ${project.estimatedBudget}, 28 shoot days).
Currently observing module: "${activeModule}". Ask me about story structure, roadmap alignment, budget consequences, or creative trade-offs.`,
      timestamp: 'Just now',
      roleTag: `${activeRole} AI`,
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic quick prompt suggestions based on active module (as specified in Section 47)
  const getContextualSuggestions = (module: string) => {
    switch (module) {
      case 'story-structure':
        return [
          'Why is my midpoint placed in Scene 27?',
          'How does moving the Inciting Incident affect Act I pacing?',
          'Analyze the setup and payoff balance in Act III.',
        ];
      case 'story-roadmap':
        return [
          'Which scenes are missing from Act II?',
          'Is objective RM-27 properly bridged to the climax?',
          'Show dependencies for the space gimbal array shoot.',
        ];
      case 'screenplay-studio':
        return [
          'Rewrite Scene 27 dialogue while preserving the roadmap objective.',
          'Check emotional subtext between Kabir and Maya.',
          'Identify dialogue lines that could be conveyed visually.',
        ];
      case 'budget':
        return [
          'Why is the Stage 1 gimbal build costing ₹38L?',
          'What are our top 3 areas of budget contingency risk?',
          'How much do we save by consolidating the Oxygen Vault set?',
        ];
      case 'schedule':
        return [
          'Can we shoot Ladakh exterior scenes 2 days earlier?',
          'Explain why Day 14 requires a 10.5-hour shoot.',
          'Optimize company moves between Stage 1 and Stage 2.',
        ];
      case 'what-if':
        return [
          'What happens if I remove Scene 27?',
          'What if Kabir confesses to Maya in Scene 14 instead?',
          'What if we replace the Leh exterior with virtual LED volume?',
        ];
      default:
        return [
          'Give me a 3-point health summary of the current draft.',
          'What is our highest production risk right now?',
          'Explain the consequences of our latest creative decision.',
        ];
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await askAIAssistant({
        message: query,
        context: {
          module: activeModule,
          selection: selectedContext,
        },
        role: `${activeRole} AI`,
        project,
      });

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roleTag: `${activeRole} AI`,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Decision intelligence offline or timeout. Reviewing local project memory: Scene 27 represents the core dramatic pivot; ensure team consensus before altering.',
        timestamp: 'Just now',
        roleTag: 'System Intelligence',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const suggestions = getContextualSuggestions(activeModule);

  return (
    <aside
      id="ai-assistant-drawer"
      className="fixed inset-y-0 right-0 w-96 bg-slate-900 border-l border-slate-800 text-slate-200 shadow-2xl flex flex-col z-50 select-none animate-in slide-in-from-right duration-200"
    >
      {/* Header */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-linear-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{activeRole} Intelligence</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-[10px] text-purple-400 flex items-center gap-1">
              <Brain className="w-3 h-3" />
              <span className="truncate max-w-42.5">Context: {activeModule}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          title="Close AI Assistant"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Project Memory Status Badge */}
      <div className="px-3.5 py-2 bg-purple-950/40 border-b border-purple-900/30 flex items-center justify-between text-[11px] text-purple-300">
        <div className="flex items-center gap-1.5 truncate">
          <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="truncate font-medium">Memory: {project.name} (Draft 04)</span>
        </div>
        <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-200 border border-purple-800/60 font-semibold">
          Synced
        </span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {m.roleTag && (
              <span className="text-[9px] font-bold text-purple-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                {m.roleTag}
              </span>
            )}
            <div
              className={`p-3 rounded-xl text-xs leading-relaxed max-w-[90%] shadow-xs ${
                m.sender === 'user'
                  ? 'bg-purple-600 text-white rounded-br-xs'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-xs whitespace-pre-wrap'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[9px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-purple-400 font-medium py-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Evaluating project memory & simulation matrix...</span>
          </div>
        )}
      </div>

      {/* Contextual Suggestions Chips */}
      <div className="px-3.5 py-2.5 bg-slate-950/70 border-t border-slate-800/80">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-400" />
          <span>Contextual Questions:</span>
        </div>
        <div className="flex flex-col gap-1">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="text-left text-[11px] text-slate-300 hover:text-white bg-slate-800/60 hover:bg-purple-900/30 border border-slate-700/60 hover:border-purple-500/40 rounded-md px-2.5 py-1 transition flex items-center justify-between group cursor-pointer"
            >
              <span className="truncate mr-2">{s}</span>
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-purple-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="ai-assistant-input"
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={`Ask ${activeRole} AI...`}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-purple-500 transition"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white transition shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </aside>
  );
};
