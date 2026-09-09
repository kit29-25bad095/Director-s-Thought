import React from 'react';
import {
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Activity,
  DollarSign,
  UserCheck,
  ChevronRight,
  Bell,
  PanelRightOpen,
  PanelRightClose,
} from 'lucide-react';
import { Role } from '../../types';

interface HeaderProps {
  currentModuleName: string;
  categoryName: string;
  activeRole: Role;
  onChangeRole: (role: Role) => void;
  onOpenWhatIf: () => void;
  isAiDrawerOpen: boolean;
  onToggleAiDrawer: () => void;
  readinessScore?: number;
  healthScore?: number;
  budgetString?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentModuleName,
  categoryName,
  activeRole,
  onChangeRole,
  onOpenWhatIf,
  isAiDrawerOpen,
  onToggleAiDrawer,
  readinessScore = 87,
  healthScore = 89,
  budgetString = '₹2.45 Cr',
}) => {
  const roles: Role[] = [
    'Director',
    'Writer',
    'Producer',
    'Cinematographer',
    'Assistant Director',
    'Editor',
    'Production Designer',
  ];

  return (
    <header
      id="app-header"
      className="h-14 border-b border-slate-200 bg-white px-4 flex items-center justify-between shrink-0 shadow-xs z-20 select-none"
    >
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-semibold text-slate-600 uppercase tracking-wider text-[11px]">
          {categoryName}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-bold text-slate-900 text-sm tracking-tight">
          {currentModuleName}
        </span>
      </div>

      {/* Center / Stats Metrics */}
      <div className="hidden lg:flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200/60 font-medium">
          <Activity className="w-3.5 h-3.5 text-purple-600" />
          <span>Script Health:</span>
          <span className="font-bold">{healthScore}%</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Readiness:</span>
          <span className="font-bold">{readinessScore}%</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium">
          <DollarSign className="w-3.5 h-3.5 text-slate-600" />
          <span>Budget:</span>
          <span className="font-bold">{budgetString}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Active Role Selector */}
        <div className="flex items-center gap-1.5 text-xs bg-slate-100/90 hover:bg-slate-200/70 border border-slate-300/80 rounded-lg px-2.5 py-1 transition">
          <UserCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span className="text-slate-600 font-medium text-[11px]">Active View:</span>
          <select
            id="role-selector"
            value={activeRole}
            onChange={(e) => onChangeRole(e.target.value as Role)}
            className="bg-transparent font-semibold text-slate-900 focus:outline-hidden cursor-pointer text-xs"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Quick What-If Trigger */}
        <button
          id="btn-quick-whatif"
          onClick={onOpenWhatIf}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
          title="Simulate consequences of a creative change"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-950" />
          <span>What-If</span>
        </button>

        {/* AI Assistant Toggle Button */}
        <button
          id="btn-toggle-ai-drawer"
          onClick={onToggleAiDrawer}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition active:scale-95 cursor-pointer ${
            isAiDrawerOpen
              ? 'bg-purple-700 text-white border-purple-800 shadow-sm'
              : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
          }`}
          title="Open Director's AI Decision Partner"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
          <span className="hidden sm:inline">AI Partner</span>
          {isAiDrawerOpen ? (
            <PanelRightClose className="w-3.5 h-3.5 ml-0.5" />
          ) : (
            <PanelRightOpen className="w-3.5 h-3.5 ml-0.5" />
          )}
        </button>
      </div>
    </header>
  );
};
