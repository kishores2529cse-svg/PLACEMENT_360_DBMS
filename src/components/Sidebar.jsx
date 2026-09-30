import React from 'react';
import { LayoutGrid, Users, CheckCircle2, CircleDot, UserMinus, Info, BarChart3, Settings, Database } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'students', label: 'All Students', icon: Users },
    { id: 'placed', label: 'Placed', icon: CheckCircle2 },
    { id: 'not_placed', label: 'Not Placed', icon: CircleDot },
    { id: 'non_placement', label: 'Non-Placement', icon: UserMinus },
    { id: 'about', label: 'About', icon: Info },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'dbms', label: 'SQL Console', icon: Database },
  ];

  return (
    <aside className="w-64 bg-[#121212] border-r border-[#1E1E22] flex flex-col justify-between p-5 min-h-screen text-slate-300 select-none shrink-0">
      <div className="space-y-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center font-extrabold text-black text-xl shadow-lg shadow-yellow-500/20">
            P
          </div>
          <div>
            <div className="font-extrabold text-white text-base tracking-tight leading-tight">Placement</div>
            <div className="text-yellow-500 text-xs font-bold leading-tight">360</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase px-2">
            Main Menu
          </div>
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-yellow-500 text-slate-950 font-bold shadow-md shadow-yellow-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A1A1E]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-[#1E1E22]">
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'settings'
              ? 'bg-yellow-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A1A1E]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-9 h-9 rounded-full bg-yellow-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-md">
            A
          </div>
          <div className="truncate">
            <div className="text-xs font-bold text-white leading-tight">Admin</div>
            <div className="text-[11px] text-slate-400 leading-tight">Placement Cell</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
