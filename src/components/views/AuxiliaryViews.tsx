import React from 'react';
import {
  Sparkles,
  Cpu,
  Globe,
  RefreshCw,
  Camera,
  FileText,
  Users,
  CheckCircle2,
  TrendingUp,
  Download,
  Eye,
  Layers,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { Project, TeamMember } from '../../types';

// IDEA & STORY LAB
export const IdeaAndStoryLabView: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Creative Ideation & Development</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            IDEA LAB & STORY LAB
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Generate and stress-test core dramatic hooks, thematic premises, high-concept loglines, and multi-act treatments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Core Premise & Controlling Idea</h2>
          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/60 text-xs leading-relaxed font-medium text-purple-950">
            “When survival requires complicity in an unspeakable sacrifice, is humanity worth saving?”
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <p><strong>Primary Theme:</strong> The moral cost of continuity vs. individual sacrifice.</p>
            <p><strong>Tone Reference:</strong> Solaris meets Interstellar and Children of Men.</p>
            <p><strong>Visual Aesthetic:</strong> Brutalist pressurized titanium interior contrasted with stark, unforgiving Himalayan landscapes.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Treatment & Narrative Milestones</h2>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">Act I: The Dimming Dawn</span>
              <p className="text-slate-600 text-[11px] mt-0.5">Kabir discovers anomalous coronal decay in Ladakh. Military containment initiates.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">Act II: The Helios-7 Void</span>
              <p className="text-slate-600 text-[11px] mt-0.5">Maya and Kabir struggle against catastrophic mechanical failure and rising distrust.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-800">Act III: The Perihelion Fire</span>
              <p className="text-slate-600 text-[11px] mt-0.5">Kabir commits to the manual exterior alignment, sealing Maya's return journey.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// WORLD BUILDING
export const WorldBuildingView: React.FC<{ project: Project }> = ({ project }) => {
  const worldRules = [
    { rule: 'Atmospheric Scarcity', desc: 'Earth surface oxygen replenishment cycles have slowed by 40%. Civilian populations rely on rationed oxygen cartridges.' },
    { rule: 'Helios-7 Design Architecture', desc: 'Pressurized modules constructed from bonded titanium alloys; thermal shielding rated to 1,800 Kelvin.' },
    { rule: 'Communications Latency', desc: 'Beyond low orbit, telemetry transmission suffers a 4.2-minute solar interference lag, isolating the crew.' },
  ];

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
          <Globe className="w-4 h-4 text-purple-600" />
          <span>World Bible & Story Physics</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          WORLD BUILDING & LORE REPOSITORY
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          The codified reality matrix of {project.name}. Defines technological limits, social hierarchies, atmospheric conditions, and aesthetic design rules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {worldRules.map((w, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">
              Rule #{idx + 1}
            </span>
            <h2 className="text-sm font-bold text-slate-900">{w.rule}</h2>
            <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ML PREDICTIONS
export const MLPredictionsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
          <Cpu className="w-4 h-4 text-purple-600" />
          <span>Machine Learning Forecasting</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          ML PREDICTIONS & STATISTICAL INTELLIGENCE
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Trained on historical production schedules, weather records, and scene complexities to model budget overruns and shooting pace variances.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Schedule Overrun Risk</span>
          <div className="text-2xl font-black text-slate-900">1.8 Days</div>
          <p className="text-slate-500 text-[11px]">Predicted 82% probability of shooting 29.8 days instead of 28 without virtual set buffer.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Budget Drift Variance</span>
          <div className="text-2xl font-black text-emerald-700">+3.4%</div>
          <p className="text-slate-500 text-[11px]">Well within the ₹8.5L safety contingency threshold.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Audience Emotional Hook</span>
          <div className="text-2xl font-black text-purple-700">94th Percentile</div>
          <p className="text-slate-500 text-[11px]">Midpoint confrontation in Scene 27 models high retention across sci-fi drama cohorts.</p>
        </div>
      </div>
    </div>
  );
};

// CONTINUITY INTELLIGENCE
export const ContinuityIntelligenceView: React.FC = () => {
  const trackingItems = [
    { element: 'Kabir’s Left Hand Frostbite', state: 'Bandaged in Sc 1-14; Scars exposed in Sc 27; Degloved in Sc 42.' },
    { element: 'Maya’s Radiation Burn Collar', state: 'Fresh in Act I; Faded keloid in Act II; Inflamed during coolant rupture.' },
    { element: 'Solar Calibrator Crystal Key', state: 'Held by Kabir in Sc 1; Transferred to Maya’s vest in Sc 27.' },
  ];

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
          <RefreshCw className="w-4 h-4 text-purple-600" />
          <span>Cross-Scene Verification</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          CONTINUITY INTELLIGENCE
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Zero continuity errors across non-linear shooting days. Automatically maps wounds, props, costume weathering, and set destruction across all 46 scenes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trackingItems.map((item, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 text-xs">
            <span className="text-[10px] font-bold text-purple-700 uppercase">Tracked Entity #{i + 1}</span>
            <h2 className="text-sm font-bold text-slate-900">{item.element}</h2>
            <p className="text-slate-600 leading-relaxed">{item.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// STORYBOARD & SHOT PLANNER
export const StoryboardShotPlannerView: React.FC = () => {
  const storyboards = [
    { scene: 'Sc 27 - Shot 1', type: 'Extreme Wide', lens: '28mm Anamorphic', img: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80', notes: 'Establishing auxiliary vault frost.' },
    { scene: 'Sc 27 - Shot 2', type: 'Tight Close-up', lens: '65mm Prime', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80', notes: 'Maya holding the encrypted datapad.' },
    { scene: 'Sc 27 - Shot 3', type: 'Low Angle Hero', lens: '40mm', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80', notes: 'Kabir looking toward perihelion monitor.' },
  ];

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
          <Camera className="w-4 h-4 text-purple-600" />
          <span>Cinematography & Visual Flow</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          STORYBOARD & SHOT PLANNER
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Lens selection, camera movement choreography, and visual blocking tied directly to emotional beats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {storyboards.map((b, i) => (
          <div key={i} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
            <div className="h-44 bg-slate-950 overflow-hidden">
              <img src={b.img} alt={b.scene} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
            </div>
            <div className="p-4 space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>{b.scene}</span>
                <span className="text-purple-700 text-[11px] font-mono">{b.lens}</span>
              </div>
              <div className="text-slate-500 text-[11px]">{b.type}</div>
              <p className="text-slate-600 text-[11px] pt-1">{b.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// TEAM COLLABORATION
export const TeamCollaborationView: React.FC<{ team: TeamMember[] }> = ({ team }) => {
  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
          <Users className="w-4 h-4 text-purple-600" />
          <span>Filmmaking Crew Hierarchy</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
          TEAM & ROLE-BASED ACCESS
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Collaborative permissions across Directorial, Writing, Producing, Cinematography, and Production departments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((m) => (
          <div key={m.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">{m.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold uppercase">
                {m.role}
              </span>
            </div>
            <div className="text-slate-500 text-[11px]">{m.email}</div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Permissions: {m.permissions.length} modules</span>
              <span className="text-emerald-700 font-semibold">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// CALL SHEET & REPORTS VIEW
export const CallSheetReportView: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-purple-600" />
            <span>Official Daily Call Sheets</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            PRODUCTION CALL SHEET • DAY 14
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Auto-generated industry standard call sheet for {project.name}.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Official DGA Call Sheet PDF...')}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Call Sheet PDF</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Date</div>
            <div className="font-extrabold text-slate-900 mt-0.5">Day 14 Shoot</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">General Crew Call</div>
            <div className="font-extrabold text-purple-700 mt-0.5">07:00 AM</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Sunrise / Sunset</div>
            <div className="font-extrabold text-slate-900 mt-0.5">06:12 / 18:45</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Nearest Hospital</div>
            <div className="font-extrabold text-slate-900 mt-0.5">Kokilaben Hospital (15 mins)</div>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 uppercase text-xs pt-2">Scheduled Scenes for Today</h3>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase font-bold">
              <tr>
                <th className="p-2.5">Scene</th>
                <th className="p-2.5">Set / Description</th>
                <th className="p-2.5">D/N</th>
                <th className="p-2.5">Pages</th>
                <th className="p-2.5">Cast</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-2.5 font-bold text-purple-700">Sc 27</td>
                <td className="p-2.5 font-medium">INT. HELIOS-7 AUXILIARY VAULT - Confrontation</td>
                <td className="p-2.5">NIGHT</td>
                <td className="p-2.5">3.8</td>
                <td className="p-2.5">Kabir, Maya</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-purple-700">Sc 28</td>
                <td className="p-2.5 font-medium">INT. HELIOS-7 CORRIDOR - Pressure drop</td>
                <td className="p-2.5">NIGHT</td>
                <td className="p-2.5">1.2</td>
                <td className="p-2.5">Kabir, Maya</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
