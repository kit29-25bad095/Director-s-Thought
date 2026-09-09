import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Lock,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface ProductionReadinessViewProps {
  score?: number;
}

export const ProductionReadinessView: React.FC<ProductionReadinessViewProps> = ({
  score = 87,
}) => {
  const departments = [
    { name: 'Directorial & Creative', progress: 95, status: 'Ready', blocking: 0, items: ['Screenplay Draft 04 locked', 'Story Roadmap coverage 95.6%', 'Director tone board signed off'] },
    { name: 'Cinematography & Lighting', progress: 90, status: 'Ready', blocking: 0, items: ['Shot plan for Days 1-10 approved', 'Arri Alexa Mini LF package reserved', 'Low-light lens testing completed'] },
    { name: 'Production Design & Sets', progress: 82, status: 'In Progress', blocking: 1, items: ['Stage 1 gimbal build 85% constructed', 'Stage 2 cryogenic vault set dressing underway', 'Prop airlock console delivered'] },
    { name: 'Costume & Wardrobe', progress: 88, status: 'Ready', blocking: 0, items: ['Flight suits tailored for Kabir & Maya', 'Distressed fabric weathering approved', 'Thermal undersuits received'] },
    { name: 'Stunt & SFX Safety', progress: 78, status: 'Action Required', blocking: 1, items: ['Wire rigging clearance pending Mumbai Film City inspector visit on Thursday', 'Zero-g test rehearsal completed'] },
    { name: 'Locations & Logistics', progress: 92, status: 'Ready', blocking: 0, items: ['Leh Valley exterior permits verified', 'Film City Stage 1 & 2 booked', 'High-altitude medic team contracted'] },
  ];

  return (
    <div id="production-readiness-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Pre-Production Certification</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            PRODUCTION READINESS AUDIT
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Multi-department readiness score ensuring zero shooting-day surprises. Audits crew assignments, location permits, gear clearance, and safety certifications.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4">
          <div className="text-center">
            <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
              Total Readiness
            </div>
            <div className="text-3xl font-extrabold text-emerald-950 mt-0.5">{score}%</div>
          </div>
          <div className="h-10 w-px bg-emerald-200" />
          <div className="text-xs">
            <div className="font-bold text-emerald-800">GREENLIGHT STATUS</div>
            <div className="text-emerald-700 text-[11px] mt-0.5">2 Items Awaiting Verification</div>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <div
            key={dept.name}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{dept.name}</span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    dept.status === 'Ready'
                      ? 'bg-emerald-100 text-emerald-800'
                      : dept.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {dept.status}
                </span>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                  <span>Readiness</span>
                  <span className="font-bold text-slate-900">{dept.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      dept.progress >= 90
                        ? 'bg-emerald-600'
                        : dept.progress >= 80
                        ? 'bg-blue-600'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${dept.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 space-y-1.5 text-[11px] text-slate-600">
                {dept.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {dept.blocking > 0 && (
              <div className="pt-2 border-t border-slate-100 text-[11px] font-semibold text-amber-800 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{dept.blocking} pending sign-off</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
