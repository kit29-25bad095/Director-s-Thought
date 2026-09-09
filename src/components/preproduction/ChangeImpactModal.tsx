import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  X,
  Edit3,
  Sparkles,
  ArrowRight,
  Clock,
  DollarSign,
  MapPin,
  Truck,
  Sun,
  Camera,
  Users,
  FileText,
} from 'lucide-react';
import { ChangeImpact } from '../../types/preproduction';

interface ChangeImpactModalProps {
  impact: ChangeImpact;
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
  onAskAi: (question: string) => void;
}

export const ChangeImpactModal: React.FC<ChangeImpactModalProps> = ({
  impact,
  isOpen,
  onClose,
  onAccept,
  onReject,
  onAskAi,
}) => {
  const [customQuestion, setCustomQuestion] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#12141a] border border-amber-500/40 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 bg-neutral-900/60 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {impact.severity} Severity Impact
                </span>
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {impact.timestamp}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                {impact.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-0.5 font-mono">
                {impact.triggerEvent}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - 7 Affected Areas */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-neutral-800 flex-1">
          {/* AI Synthesis Box */}
          <div className="p-4 rounded-xl bg-linear-to-r from-amber-500/10 via-neutral-900 to-blue-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Co-Pilot Impact Assessment</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
              {impact.aiRecommendation}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              7 Affected Project Areas Detected
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* 1. Location Schedule */}
              <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">1. Location Schedule</h4>
                  <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                    {impact.affectedAreas.locationSchedule}
                  </p>
                </div>
              </div>

              {/* 2. Transport & Logistics */}
              <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">2. Transport & Fleet</h4>
                  <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                    {impact.affectedAreas.transport}
                  </p>
                </div>
              </div>

              {/* 3. Call Sheet & Call Times */}
              <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">3. Daily Call Sheet</h4>
                  <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                    {impact.affectedAreas.callSheet}
                  </p>
                </div>
              </div>

              {/* 4. Lighting Approach */}
              <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">4. Lighting Plan</h4>
                  <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                    {impact.affectedAreas.lightingPlan}
                  </p>
                </div>
              </div>

              {/* 5. Camera & Rigging */}
              <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">5. Camera Plan</h4>
                  <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                    {impact.affectedAreas.cameraPlan}
                  </p>
                </div>
              </div>

              {/* 6. Budget & Cost Variance */}
              <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">6. Budget Impact</h4>
                  <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed font-mono">
                    {impact.affectedAreas.budget}
                  </p>
                </div>
              </div>

              {/* 7. Cast DOOD (Day Out of Days) */}
              <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3 md:col-span-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">7. Cast DOOD & Holding Days</h4>
                  <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                    {impact.affectedAreas.castDood}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Ask AI Bar */}
          <div className="pt-2 border-t border-neutral-800 flex items-center gap-2">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="Ask AI about this change (e.g., 'Can we keep golden hour without rescheduling crew?')..."
              className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-amber-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customQuestion.trim()) {
                  onAskAi(customQuestion.trim());
                  setCustomQuestion('');
                }
              }}
            />
            <button
              onClick={() => {
                if (customQuestion.trim()) {
                  onAskAi(customQuestion.trim());
                  setCustomQuestion('');
                }
              }}
              className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 rounded-xl transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask AI</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Director's Decision Required: AI will not commit changes automatically</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onReject}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5 text-rose-400" />
              <span>Reject Change</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Edit Parameters</span>
            </button>
            <button
              onClick={onAccept}
              className="px-5 py-2 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 text-xs font-bold cursor-pointer transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply & Cascade to 7 Areas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
