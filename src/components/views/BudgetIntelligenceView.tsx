import React from 'react';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { BudgetItem } from '../../types';

interface BudgetIntelligenceViewProps {
  budgetItems: BudgetItem[];
}

export const BudgetIntelligenceView: React.FC<BudgetIntelligenceViewProps> = ({
  budgetItems,
}) => {
  const totalBudget = budgetItems.reduce((acc, b) => acc + b.amount, 0);
  const contingencyBuffer = 850000; // 8.5L

  const formatINR = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} Lakhs`;
    return `₹${val.toLocaleString()}`;
  };

  const categories = Array.from(new Set(budgetItems.map((b) => b.category)));

  return (
    <div id="budget-intelligence-view" className="space-y-6 pb-12 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <DollarSign className="w-4 h-4 text-purple-600" />
            <span>Financial Intelligence</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            BUDGET & CONTINGENCY INTELLIGENCE
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Dynamic cost tracking linked directly to story decisions, set builds, locations, and shooting schedules.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 text-white rounded-2xl p-4 shadow-sm">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Committed Budget
            </div>
            <div className="text-2xl font-black text-purple-300 mt-0.5">
              {formatINR(totalBudget)}
            </div>
          </div>
          <div className="h-10 w-px bg-slate-800" />
          <div>
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              Safety Buffer
            </div>
            <div className="text-xs font-bold text-white mt-1">
              {formatINR(contingencyBuffer)}
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const catItems = budgetItems.filter((b) => b.category === cat);
          const catTotal = catItems.reduce((acc, b) => acc + b.amount, 0);
          const percent = ((catTotal / totalBudget) * 100).toFixed(1);

          return (
            <div
              key={cat}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  {cat}
                </span>
                <span className="font-extrabold text-purple-700">{percent}%</span>
              </div>
              <div className="text-lg font-black text-slate-900">{formatINR(catTotal)}</div>
              <div className="text-[11px] text-slate-400">{catItems.length} cost line items</div>
            </div>
          );
        })}
      </div>

      {/* Budget Line Items Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-purple-600" />
          <span>Line-Item Breakdown & Linked Dependencies</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                <th className="py-2.5 px-3">Item Description</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Related Scenes</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {budgetItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-bold text-slate-900">{item.item}</td>
                  <td className="py-3 px-3 text-slate-600">{item.category}</td>
                  <td className="py-3 px-3 text-slate-600 font-medium">{item.department}</td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    {formatINR(item.amount)}
                  </td>
                  <td className="py-3 px-3 text-purple-700 font-semibold">
                    {item.relatedScenes.map((s) => `Sc ${s}`).join(', ')}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        item.locked
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.locked ? 'Locked' : 'Estimated'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
