import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { RiskItem } from '../../types';

interface RiskRadarViewProps {
  risks: RiskItem[];
}

export const RiskRadarView: React.FC<RiskRadarViewProps> = ({ risks }) => {
  return (
    <div id="risk-radar-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Operational Safeguards</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            PRODUCTION RISK RADAR
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Continuous threat detection across weather windows, stunt safety clearances, stage construction deadlines, and cast availability locks.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs bg-amber-50 border border-amber-200 rounded-xl p-3 font-semibold text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>{risks.filter((r) => r.severity === 'CRITICAL' || r.severity === 'HIGH').length} Critical/High Risks Monitored</span>
        </div>
      </div>

      {/* Risk Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {risks.map((risk) => (
          <div
            key={risk.id}
            className={`p-5 rounded-2xl border shadow-xs space-y-3 flex flex-col justify-between ${
              risk.severity === 'CRITICAL'
                ? 'bg-red-50/40 border-red-200'
                : risk.severity === 'HIGH'
                ? 'bg-amber-50/40 border-amber-200'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {risk.category} RISK
                </span>
                <span
                  className={`text-[9px] px-2.5 py-0.5 rounded-full font-extrabold uppercase ${
                    risk.severity === 'CRITICAL'
                      ? 'bg-red-100 text-red-800'
                      : risk.severity === 'HIGH'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {risk.severity} • {risk.likelihood} Likelihood
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-900">{risk.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{risk.impact}</p>
            </div>

            <div className="pt-3 border-t border-slate-200/80 space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-900">Mitigation Strategy:</span>
                <p className="text-slate-700 text-[11px] mt-0.5 font-medium leading-relaxed">
                  {risk.mitigationPlan}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-purple-700 font-semibold">
                  Affected Scenes: {risk.affectedScenes.join(', ')}
                </span>
                <span
                  className={`font-bold ${
                    risk.status === 'MITIGATED'
                      ? 'text-emerald-700'
                      : risk.status === 'MONITORING'
                      ? 'text-blue-700'
                      : 'text-amber-700'
                  }`}
                >
                  ● {risk.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
