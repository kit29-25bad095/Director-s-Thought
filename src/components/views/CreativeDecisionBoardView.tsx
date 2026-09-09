import React, { useState } from 'react';
import {
  Vote,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  UserCheck,
  Plus,
  Lock,
  DollarSign,
  Calendar,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';
import { CreativeDecision, Role, TeamMember } from '../../types';

interface CreativeDecisionBoardViewProps {
  decisions: CreativeDecision[];
  team: TeamMember[];
  activeRole: Role;
  onCastVote: (decisionId: string, role: Role, vote: 'APPROVE' | 'REJECT', notes: string) => void;
  onAuthorizeApproval: (decisionId: string, authorizedBy: string) => void;
}

export const CreativeDecisionBoardView: React.FC<CreativeDecisionBoardViewProps> = ({
  decisions,
  team,
  activeRole,
  onCastVote,
  onAuthorizeApproval,
}) => {
  const [selectedDecisionId, setSelectedDecisionId] = useState<string>(
    decisions[0]?.id || ''
  );
  const [voteNotes, setVoteNotes] = useState('');

  const activeDecision =
    decisions.find((d) => d.id === selectedDecisionId) || decisions[0];

  const userHasVoted = activeDecision?.votes.some((v) => v.role === activeRole);

  return (
    <div id="decision-board-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <Vote className="w-4 h-4 text-purple-600" />
            <span>Collaboration & Governance</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            CREATIVE DECISION BOARD
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Major creative shifts (e.g. location swaps, scene removals, ending revisions) are democratically deliberated by the Director, Writer, Producer, Cinematographer, and AD. AI offers neutral trade-off analysis. Human authorization is strictly required to update the master production plan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <div className="text-slate-400 font-medium">Logged in Role:</div>
            <div className="font-bold text-purple-700">{activeRole}</div>
          </div>
        </div>
      </div>

      {/* Main Split: Left Decision List, Right Active Decision Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of Decisions */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Decisions Pipeline ({decisions.length})
          </h2>

          <div className="space-y-2.5">
            {decisions.map((dec) => {
              const isSelected = dec.id === activeDecision?.id;
              const approveCount = dec.votes.filter((v) => v.vote === 'APPROVE').length;
              const rejectCount = dec.votes.filter((v) => v.vote === 'REJECT').length;

              return (
                <button
                  key={dec.id}
                  onClick={() => setSelectedDecisionId(dec.id)}
                  className={`w-full text-left p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-50/70 border-purple-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        dec.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : dec.status === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {dec.status}
                    </span>
                    <span className="text-[11px] text-slate-400">{dec.date}</span>
                  </div>

                  <div className="font-bold text-xs text-slate-900 line-clamp-2">
                    {dec.title}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Proposed by {dec.proposedBy}</span>
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="text-emerald-600">{approveCount} Yes</span>
                      <span>•</span>
                      <span className="text-red-600">{rejectCount} No</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Decision Detail, AI Neutral Analysis, Team Voting */}
        {activeDecision && (
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Decision Header & Impacts */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Creative Proposal #{activeDecision.id}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                    {activeDecision.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-extrabold uppercase ${
                      activeDecision.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {activeDecision.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {activeDecision.description}
              </p>

              {/* Impact Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs pt-1">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-semibold text-slate-400">Story Impact</div>
                  <div className="font-bold text-slate-800 mt-0.5">{activeDecision.impacts.story}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-semibold text-slate-400">Visual Impact</div>
                  <div className="font-bold text-slate-800 mt-0.5">{activeDecision.impacts.visual}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-semibold text-emerald-600">Cost Impact</div>
                  <div className="font-bold text-emerald-700 mt-0.5">{activeDecision.impacts.cost}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-semibold text-blue-600">Time Impact</div>
                  <div className="font-bold text-blue-800 mt-0.5">{activeDecision.impacts.time}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-semibold text-amber-600">Risk Shift</div>
                  <div className="font-bold text-amber-800 mt-0.5">{activeDecision.impacts.risk}</div>
                </div>
              </div>

              {/* AI Neutral Trade-Off Summary */}
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200/80 space-y-1 text-xs">
                <div className="font-bold text-purple-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>AI Neutral Trade-Off Analysis:</span>
                </div>
                <p className="text-purple-950 leading-relaxed font-medium">
                  {activeDecision.aiTradeOffSummary}
                </p>
              </div>
            </div>

            {/* Card 2: Team Votes */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-600" />
                <span>Team Ballots & Recorded Perspectives</span>
              </h3>

              <div className="space-y-2">
                {activeDecision.votes.map((v, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{v.voterName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                          {v.role}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5 italic">“{v.notes}”</p>
                    </div>

                    <span
                      className={`text-[10px] px-2.5 py-1 rounded font-extrabold uppercase shrink-0 ${
                        v.vote === 'APPROVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {v.vote}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cast Vote Form for Active Role */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="text-xs font-bold text-slate-900">
                  Cast Your Ballot as <span className="text-purple-700">{activeRole}</span>
                </div>

                <input
                  type="text"
                  value={voteNotes}
                  onChange={(e) => setVoteNotes(e.target.value)}
                  placeholder={`Reason for ${activeRole} vote...`}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-purple-500"
                />

                <div className="flex items-center gap-2">
                  <button
                    id="btn-vote-approve"
                    onClick={() => {
                      onCastVote(activeDecision.id, activeRole, 'APPROVE', voteNotes || 'Approved.');
                      setVoteNotes('');
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Proposal</span>
                  </button>

                  <button
                    id="btn-vote-reject"
                    onClick={() => {
                      onCastVote(activeDecision.id, activeRole, 'REJECT', voteNotes || 'Rejected.');
                      setVoteNotes('');
                    }}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject Proposal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Section 42 Human Approval Lock */}
            <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Human Executive Authorization</span>
                </div>
                {activeDecision.approvalAuthorizedBy && (
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Authorized by {activeDecision.approvalAuthorizedBy}</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                As mandated by the Director’s Thought AI safety charter, the AI engine will NEVER automatically modify the screenplay, story roadmap, budget, or call sheets. A department lead (Director or Producer) must explicitly lock and authorize the decision.
              </p>

              {activeDecision.status !== 'APPROVED' ? (
                <button
                  id="btn-authorize-decision"
                  onClick={() => onAuthorizeApproval(activeDecision.id, `${activeRole} (Aarav Mehta)`)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Commit to Master Production Plan</span>
                </button>
              ) : (
                <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-800/80 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Decision locked and integrated into Schedule, Budget, and Roadmap Version History.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
