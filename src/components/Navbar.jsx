import React from 'react';
import { Database, GraduationCap, Building2, Terminal, ShieldCheck, Sparkles, User, Bell } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, activeRole, setActiveRole }) {
  const roles = [
    { id: 'officer', label: 'T&P Officer', icon: ShieldCheck, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
    { id: 'student', label: 'Student Portal', icon: GraduationCap, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { id: 'dbms', label: 'DBMS Console', icon: Terminal, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  ];

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: Sparkles },
    { id: 'drives', label: 'Placement Drives', icon: Building2 },
    { id: 'students', label: 'Student Records', icon: GraduationCap },
    { id: 'dbms', label: 'SQL Query Console', icon: Database },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Database className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">Placement<span className="gradient-text">360</span></span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">v2.4</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-none">DBMS Campus Recruitment Engine</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Role Switcher & User Control */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-900/90 rounded-lg p-1 border border-slate-800">
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = activeRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setActiveRole(r.id);
                      if (r.id === 'dbms') setActiveTab('dbms');
                    }}
                    title={`Switch to ${r.label}`}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      isSelected
                        ? `${r.color} shadow-sm border`
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">{r.label}</span>
                  </button>
                );
              })}
            </div>

            <button className="relative p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
