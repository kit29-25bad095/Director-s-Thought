import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  X,
  FileText,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PreProdContinuityAlert } from '../../types/preproduction';

interface ContinuityRiskTabProps {
  alerts: PreProdContinuityAlert[];
  onUpdateAlerts: (alerts: PreProdContinuityAlert[]) => void;
  onAskAi: (prompt: string) => void;
}

export const ContinuityRiskTab: React.FC<ContinuityRiskTabProps> = ({
  alerts,
  onUpdateAlerts,
  onAskAi,
}) => {
  const [activeAlerts, setActiveAlerts] = useState<PreProdContinuityAlert[]>(alerts);

  const handleFix = (id: string) => {
    const updated = activeAlerts.map((a) => (a.id === id ? { ...a, status: 'FIXED' as const } : a));
    setActiveAlerts(updated);
    onUpdateAlerts(updated);
  };

  const handleIgnore = (id: string) => {
    const updated = activeAlerts.map((a) => (a.id === id ? { ...a, status: 'IGNORED' as const } : a));
    setActiveAlerts(updated);
    onUpdateAlerts(updated);
  };

  return (
    <div className="space-y-5 text-neutral-100">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#12141a] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Continuity Supervision & Production Risk Matrix
            </h2>
            <p className="text-xs text-neutral-400">
              Wardrobe, injury & props continuity tracking across scenes • Risk radar & technical test assistant
            </p>
          </div>
        </div>

        <button
          onClick={() => onAskAi('Scan the entire screenplay for potential props or makeup continuity discrepancies between Act I and Act III.')}
          className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Run Continuity Scan</span>
        </button>
      </div>

      {/* Continuity Alerts List with [Fix], [Ignore], [Add Note] */}
      <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
          Active Continuity Flags ({activeAlerts.filter((a) => a.status === 'ACTIVE').length} Open)
        </h3>

        <div className="space-y-3">
          {activeAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border space-y-2.5 transition ${
                alert.status === 'FIXED'
                  ? 'bg-neutral-900/40 border-neutral-800 opacity-60'
                  : alert.severity === 'CRITICAL'
                  ? 'bg-rose-950/20 border-rose-500/30'
                  : 'bg-amber-500/10 border-amber-500/30'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {alert.severity} • {alert.itemType}
                  </span>
                  <span className="text-xs font-bold text-white">{alert.character}</span>
                  <span className="text-xs text-neutral-400 font-mono">
                    (Scenes: {alert.scenesAffected.join(', ')})
                  </span>
                </div>

                {/* 3 User-Specified Action Buttons: Fix, Ignore, Add Note */}
                <div className="flex items-center gap-1.5">
                  {alert.status === 'ACTIVE' ? (
                    <>
                      <button
                        onClick={() => handleFix(alert.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold cursor-pointer transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Fix</span>
                      </button>
                      <button
                        onClick={() => handleIgnore(alert.id)}
                        className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-semibold cursor-pointer transition flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        <span>Ignore</span>
                      </button>
                      <button
                        onClick={() => {
                          const note = prompt('Add continuity supervisor note:', alert.notes || '');
                          if (note !== null) {
                            setActiveAlerts(activeAlerts.map(a => a.id === alert.id ? { ...a, notes: note } : a));
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-semibold cursor-pointer transition flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-amber-400" />
                        <span>Add Note</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{alert.status}</span>
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-neutral-200 leading-relaxed">{alert.description}</p>

              <div className="p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-800 text-[11px] text-neutral-300 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">AI Script Supervisor Suggestion: </strong>
                  <span>{alert.aiSuggestion}</span>
                </div>
              </div>

              {alert.notes && (
                <div className="text-[11px] text-neutral-400 italic">
                  Note: {alert.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Production Risk Radar Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
          <span className="text-[10px] font-bold text-amber-400 uppercase block">Weather & Location Risk (Leh Valley)</span>
          <p className="text-neutral-300 leading-relaxed">
            High altitude sudden snow blizzards or sub-zero temperature drops may seize camera battery packs and hydraulic fluid in tripods.
          </p>
          <span className="text-emerald-400 font-semibold block text-[11px]">
            Mitigation: Heated camera thermal jackets + portable indoor soundstage backup contingency.
          </span>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
          <span className="text-[10px] font-bold text-blue-400 uppercase block">Technical LED Latency Risk</span>
          <p className="text-neutral-300 leading-relaxed">
            Frame synchronization drift between camera shutter and Unreal Engine LED volume during rapid crane sweeps.
          </p>
          <span className="text-emerald-400 font-semibold block text-[11px]">
            Mitigation: Genlock hardware test scheduled on Day -2 with Elena Rostova (DP).
          </span>
        </div>
      </div>
    </div>
  );
};
