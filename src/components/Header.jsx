import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export default function Header({ pageTitle, searchQuery, setSearchQuery, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 sm:px-6 h-14">
        
        {/* Mobile Menu & Page Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleSidebar}
            className="md:hidden text-slate-500 hover:text-slate-900 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-base sm:text-lg font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-none">
            {pageTitle}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs bg-slate-50 border-slate-200"
            />
          </div>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          {/* Notifications */}
          <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#da1e28] rounded-full border border-white"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-7 h-7 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-slate-200 transition-colors">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium text-slate-600 hidden sm:block">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
