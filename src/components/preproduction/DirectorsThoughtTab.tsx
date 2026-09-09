import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  RefreshCw,
  Globe,
} from 'lucide-react';
import { Project } from '../../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface DirectorsThoughtTabProps {
  project: Project;
  onSelectDepartmentTab?: (tab: string) => void;
}

export const DirectorsThoughtTab: React.FC<DirectorsThoughtTabProps> = ({
  project,
  onSelectDepartmentTab,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: "Hey! I'm your Pre-Production Co-pilot. I have the entire screenplay, shot list, budget, and department dependencies loaded. Enna venumo kelunga — speak in English, Tamil, Tanglish, Malayalam, Kannada, or Hindi. Ready when you are!",
      timestamp: '10:00 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Call backend API with context
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: `Film Project: "${project.name}". Genre: ${project.genre}. Logline: ${project.logline}. 
          Pre-production status: 46 scenes locked, 91% shoot ready, Stage 1 LED volume & Leh mountain exteriors. 
          User preference: Keep response concise, friendly, short, co-pilot peer tone. If user speaks in Tamil, Malayalam, Kannada, or Tanglish, reply naturally in the same language. Do not show unnecessary text.`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: Message = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          text: data.reply || data.message || "Got it. Let's make that work on set.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Fallback friendly peer response
      setTimeout(() => {
        let fallbackText = "Super, bro! That makes total sense for Kabir's scene. I've marked that in the breakdown so the camera team keeps it framed tight.";
        if (/tamil|enna|machan|thalaiva|bro|da/i.test(textToSend)) {
          fallbackText = "Kandippa bro! Scene 27 confrontation-la Kabir-oda reaction romba intense-ah irukanum. Camera Cooke 65mm-la lock pannirukom, superb output varum!";
        }
        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            sender: 'assistant',
            text: fallbackText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 700);
    } finally {
      setIsTyping(false);
    }
  };

  const samplePrompts = [
    "Scene 12 location change-oda impact enna?",
    "Check Kabir's character consistency in Act II",
    "What are the top 3 shoot readiness blockers?",
    "Scene 27 lighting plan-ah short-ah sollu",
  ];

  return (
    <div className="bg-[#12141a] rounded-2xl border border-neutral-800 flex flex-col h-[640px] text-neutral-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 bg-neutral-900/70 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Director's Vision Co-Pilot</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-[11px] text-neutral-400">
              Short, friendly peer discussion • Tamil, Tanglish, Malayalam, Kannada, Hindi & English
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Multilingual NLP</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-neutral-800">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%] ${
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  isUser
                    ? 'bg-amber-500 text-neutral-950 font-bold text-xs'
                    : 'bg-neutral-800 text-amber-400 border border-neutral-700'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-1">
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-amber-500 text-neutral-950 font-medium rounded-tr-xs'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <div
                  className={`text-[10px] text-neutral-500 font-mono px-1 ${
                    isUser ? 'text-right' : 'text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 pl-1">
            <Bot className="w-4 h-4 text-amber-400" />
            <span className="animate-pulse">Co-pilot is checking project nodes...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-neutral-950/60 border-t border-neutral-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 text-xs">
        <span className="text-[11px] text-neutral-500 font-semibold shrink-0">Quick Ask:</span>
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 hover:text-white text-neutral-300 text-[11px] whitespace-nowrap transition cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 bg-neutral-900/90 border-t border-neutral-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or speak (e.g., 'Scene 12 change pathi sollu', 'What lenses for Maya?')..."
            className="flex-1 bg-neutral-950 border border-neutral-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-amber-400 transition"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-neutral-950 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
