import React from 'react';
import { LayoutDashboard, Users, Building2, CalendarDays, FileText, CheckCircle, XCircle, BarChart3, User, Settings, Database } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'drives', label: 'Placement Drives', icon: CalendarDays },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'placements', label: 'Placements', icon: CheckCircle },
    { id: 'not_placed', label: 'Not Placed', icon: XCircle },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'dbms', label: 'SQL Console', icon: Database },
  ];

  return (
    <aside className="w-64 bg-black border-r border-neutral-800 flex flex-col justify-between min-h-screen text-neutral-300 select-none shrink-0">
      <div className="flex flex-col h-full">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-8 px-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-lg">
              P
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-tight leading-tight">Placement360</div>
              <div className="text-neutral-400 text-[10px] font-medium leading-tight uppercase tracking-wider mt-0.5">University System</div>
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase px-3 mb-3">
              Administration
            </div>
            <nav className="space-y-0.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-neutral-900 text-white border-l-2 border-white"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-900/50 border-l-2 border-transparent"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-neutral-500")} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-4 mt-auto space-y-0.5 border-t border-neutral-900">
          <button
            onClick={() => setActiveTab('profile')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors",
              activeTab === 'profile'
                ? "bg-neutral-900 text-white border-l-2 border-white"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/50 border-l-2 border-transparent"
            )}
          >
            <User className="w-4 h-4 text-neutral-500" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors",
              activeTab === 'settings'
                ? "bg-neutral-900 text-white border-l-2 border-white"
                : "text-neutral-400 hover:text-white hover:bg-neutral-900/50 border-l-2 border-transparent"
            )}
          >
            <Settings className="w-4 h-4 text-neutral-500" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
