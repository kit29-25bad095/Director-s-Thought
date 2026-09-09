import React, { useState } from 'react';
import {
  CheckSquare,
  Truck,
  Users,
  Utensils,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { PreProdTask } from '../../types/preproduction';

interface LogisticsTasksTabProps {
  tasks: PreProdTask[];
  onUpdateTasks: (tasks: PreProdTask[]) => void;
  onAskAi: (prompt: string) => void;
}

export const LogisticsTasksTab: React.FC<LogisticsTasksTabProps> = ({
  tasks,
  onUpdateTasks,
  onAskAi,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'tasks' | 'crew' | 'transport'>('tasks');
  const [taskList, setTaskList] = useState<PreProdTask[]>(tasks);

  const toggleTask = (id: string) => {
    const updated = taskList.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTaskList(updated);
    onUpdateTasks(updated);
  };

  return (
    <div className="space-y-5 text-neutral-100">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#12141a] border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Logistics, Crew & Auto-Generated Production Tasks
            </h2>
            <p className="text-xs text-neutral-400">
              Auto-created tasks from breakdown requirements, call sheets, transport moves & crew roster
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs">
          <button
            onClick={() => setActiveSubTab('tasks')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeSubTab === 'tasks' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Auto Tasks ({taskList.filter((t) => !t.completed).length})
          </button>
          <button
            onClick={() => setActiveSubTab('crew')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeSubTab === 'crew' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Crew Roster
          </button>
          <button
            onClick={() => setActiveSubTab('transport')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
              activeSubTab === 'transport' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Transport & Catering
          </button>
        </div>
      </div>

      {/* 1. Auto-Generated Task Manager */}
      {activeSubTab === 'tasks' && (
        <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                AI Cross-Department Task Checklist
              </h3>
            </div>
            <span className="text-xs text-neutral-400 font-mono">
              {taskList.filter((t) => t.completed).length}/{taskList.length} Completed
            </span>
          </div>

          <div className="space-y-2.5">
            {taskList.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                  task.completed
                    ? 'bg-neutral-900/40 border-neutral-800/80 opacity-60'
                    : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 transition ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-500 text-black'
                        : 'border-neutral-700 bg-neutral-950'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {task.department}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded font-mono ${
                          task.priority === 'CRITICAL'
                            ? 'text-rose-400 bg-rose-500/10'
                            : 'text-amber-400 bg-amber-500/10'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p
                      className={`text-xs mt-1 font-medium ${
                        task.completed ? 'line-through text-neutral-500' : 'text-neutral-200'
                      }`}
                    >
                      {task.title}
                    </p>

                    <div className="text-[11px] text-neutral-500 mt-1 flex items-center gap-3">
                      <span>Assigned: <strong className="text-neutral-400">{task.assignedTo}</strong></span>
                      <span>•</span>
                      <span>Deadline: <strong className="text-neutral-400">{task.deadlineDay}</strong></span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline">
                  {task.autoGeneratedSource}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Crew Planner */}
      {activeSubTab === 'crew' && (
        <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Core Department Heads & Key Crew
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">Director of Photography</span>
              <div className="font-bold text-white mt-1">Elena Rostova</div>
              <span className="text-neutral-400 text-[11px]">ISC / Arri LF Specialist</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-blue-400 block">Production Designer</span>
              <div className="font-bold text-white mt-1">Vikram Malhotra</div>
              <span className="text-neutral-400 text-[11px]">Soundstage Modular Rigging</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-rose-400 block">Stunt Coordinator</span>
              <div className="font-bold text-white mt-1">Rajesh Nair</div>
              <span className="text-neutral-400 text-[11px]">Action Guild Certified</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-purple-400 block">Costume Designer</span>
              <div className="font-bold text-white mt-1">Nandita Das</div>
              <span className="text-neutral-400 text-[11px]">EVA Suit Fabrication</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-indigo-400 block">Sound Recordist</span>
              <div className="font-bold text-white mt-1">Gautam Bose</div>
              <span className="text-neutral-400 text-[11px]">32-Bit Float & Comms</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Line Producer (Ladakh)</span>
              <div className="font-bold text-white mt-1">Tenzing Norbu</div>
              <span className="text-neutral-400 text-[11px]">Local Permits & Sherpa Logistics</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Transport & Catering */}
      {activeSubTab === 'transport' && (
        <div className="p-5 rounded-2xl bg-[#12141a] border border-neutral-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Transport Logistics & Crew Catering Plan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Fleet & Move Schedule
              </span>
              <p className="text-neutral-300 leading-relaxed">
                • Mumbai Film City Lot: 3 Equipment Vans, 2 Generator Trucks (1200kVA total), 2 Cast Vanity Vans.<br/>
                • Company Move (Day 15): Equipment packed into air-cargo containers to Leh Kushok Bakula Rimpochee Airport.<br/>
                • Mountain Block: 6 local 4x4 Mahindra pickup trucks and heated crew transport bus.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5" /> High-Calorie Altitude Catering
              </span>
              <p className="text-neutral-300 leading-relaxed">
                • Hot breakfast call at 05:30 AM (Oats, eggs, parathas, ginger chai).<br/>
                • Constant hot hydration station: Garlic soup & butter tea (anti-AMS altitude sickness protocol).<br/>
                • Total Daily Catering Allocation: ₹1,200/head for 65 crew members.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
