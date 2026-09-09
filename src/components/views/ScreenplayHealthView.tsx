import React from 'react';
import {
  Activity,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Heart,
  Zap,
  MessageSquare,
  Eye,
  ShieldCheck,
} from 'lucide-react';

interface ScreenplayHealthViewProps {
  healthScore?: number;
}

export const ScreenplayHealthView: React.FC<ScreenplayHealthViewProps> = ({
  healthScore = 89,
}) => {
  const healthMetrics = [
    { name: 'Pacing & Narrative Momentum', score: 92, icon: Zap, status: 'Optimal', note: 'Act II midpoint delivers steady acceleration.' },
    { name: 'Character Arc Progression', score: 88, icon: Heart, status: 'Good', note: 'Maya’s moral crisis is earned; Kabir could show more vulnerability in Scene 18.' },
    { name: 'Setup & Payoff Completeness', score: 90, icon: Layers, status: 'Optimal', note: '9 out of 10 key setups paid off before climax.' },
    { name: 'Emotional Resonance', score: 87, icon: Sparkles, status: 'Good', note: 'Scene 27 confrontation ranks as the highest emotional peak.' },
    { name: 'Conflict Density', score: 94, icon: TrendingUp, status: 'Exceptional', note: 'Every scene contains interpersonal or environmental obstacles.' },
    { name: 'Dialogue Distinctiveness', score: 85, icon: MessageSquare, status: 'Good', note: 'Distinct syntax between military-trained Maya and scientific Kabir.' },
    { name: 'Theme Cohesion', score: 91, icon: Eye, status: 'Optimal', note: 'The price of survival consistently echoes across subplots.' },
    { name: 'Visual Storytelling Efficiency', score: 89, icon: ShieldCheck, status: 'Optimal', note: '68% of story events revealed through action rather than expository dialogue.' },
  ];

  return (
    <div id="screenplay-health-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <Activity className="w-4 h-4 text-purple-600" />
            <span>Diagnostic Intelligence</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            SCREENPLAY HEALTH & DRIFT AUDIT
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Multi-dimensional narrative diagnostic evaluating dramatic momentum, emotional arcs, dialogue individuality, and setup/payoff balance.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-purple-50 border border-purple-200/80 rounded-2xl p-4">
          <div className="text-center">
            <div className="text-[10px] text-purple-700 font-bold uppercase tracking-wider">Overall Health Score</div>
            <div className="text-3xl font-extrabold text-purple-950 mt-0.5">{healthScore}%</div>
          </div>
          <div className="h-10 w-px bg-purple-200" />
          <div className="text-xs">
            <div className="font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Production Ready</span>
            </div>
            <div className="text-slate-500 text-[11px] mt-0.5">Draft 04 Validated</div>
          </div>
        </div>
      </div>

      {/* 8 Health Dimensions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.name}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-extrabold text-slate-900">{metric.score}%</span>
                </div>

                <h3 className="font-bold text-xs text-slate-900 mt-3">{metric.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{metric.note}</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Setup & Payoff Audit Matrix (Section 17) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-600" />
          <span>Setup & Payoff Tracking Matrix</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Setup: Solar Valve Override</span>
              <span className="text-emerald-700 font-bold">Paid Off</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Set up in Scene 14 (locked valve). Paid off in Scene 27 (revelation of Kabir’s tampering to save oxygen).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Setup: Hand Tremor in Ladakh</span>
              <span className="text-emerald-700 font-bold">Paid Off</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Set up in Scene 01 (Kabir’s frostbite in Leh). Paid off during the Scene 42 zero-g spacewalk tether snag.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Setup: Maya’s Encrypted Datapad</span>
              <span className="text-emerald-700 font-bold">Paid Off</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Introduced in Scene 09. Concluded in Scene 27 confrontation where Kabir is confronted with the biometric log.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
