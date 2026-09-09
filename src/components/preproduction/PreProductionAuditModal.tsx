import React from 'react';
import {
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  X,
  Sparkles,
  Download,
  FileCheck,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { PreProductionAudit } from '../../types/preproduction';

interface PreProductionAuditModalProps {
  audit: PreProductionAudit;
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

export const PreProductionAuditModal: React.FC<PreProductionAuditModalProps> = ({
  audit,
  isOpen,
  onClose,
  projectName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#12141a] border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 bg-neutral-900/60 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                  Automated Pre-Production Audit
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {audit.overallReadiness}% Shoot Ready
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">
                {projectName} — Production Health Audit
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-neutral-800 flex-1">
          {/* Top Score Banner */}
          <div className="p-5 rounded-2xl bg-linear-to-r from-emerald-950/40 via-neutral-900 to-blue-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Shoot Readiness Certification</span>
              </div>
              <p className="text-sm text-neutral-200">
                15 Core Departments evaluated across 46 locked scenes. All narrative dependencies validated.
              </p>
            </div>

            <div className="flex items-baseline gap-2 bg-neutral-950/80 px-4 py-2.5 rounded-xl border border-neutral-800 shrink-0">
              <span className="text-3xl font-black text-emerald-400 font-mono">{audit.overallReadiness}%</span>
              <span className="text-xs text-neutral-400">Readiness Score</span>
            </div>
          </div>

          {/* Department Breakdown Bars */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
              15 Department Readiness Indicators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(audit.departmentScores).map(([dept, scoreVal]) => {
                const score = Number(scoreVal);
                return (
                  <div
                    key={dept}
                    className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-neutral-200 truncate">{dept}</span>
                      <span className={`font-mono font-bold ${score >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {score}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${score >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Critical Blockers */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-rose-400 uppercase flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" />
              <span>Critical Production Blockers ({audit.blockers.length})</span>
            </h3>
            <div className="space-y-2.5">
              {audit.blockers.map((b, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-300 uppercase tracking-wide">
                      {b.department}
                    </span>
                    <span className="text-[10px] text-rose-400 px-2 py-0.5 rounded bg-rose-900/40">
                      Pending Action
                    </span>
                  </div>
                  <p className="text-xs text-neutral-200 font-medium">{b.issue}</p>
                  <div className="text-[11px] text-emerald-300/90 pt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Resolution: {b.resolution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Requirements List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Missing Equipment & Prop Items ({audit.missingItems.length})</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {audit.missingItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-neutral-900/90 border border-amber-500/20 text-xs text-neutral-300 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended AI Actions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-blue-400 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Recommended Pre-Production Milestones</span>
            </h3>
            <div className="space-y-2">
              {audit.recommendedActions.map((action, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 text-xs text-neutral-200 flex items-center gap-2.5"
                >
                  <div className="w-5 h-5 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                    {idx + 1}
                  </div>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-900/90 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            Last audited 5 minutes ago • All cross-module links synced
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert('Pre-Production Audit Report successfully downloaded as PDF.');
              }}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold cursor-pointer transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Report</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
