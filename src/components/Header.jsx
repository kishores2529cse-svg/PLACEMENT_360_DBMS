import React from 'react';
import { Search, Sun, Moon, Sparkles } from 'lucide-react';

export default function Header({ pageTitle, isDarkMode, setIsDarkMode, searchQuery, setSearchQuery }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 px-8 bg-white dark:bg-[#18181C] border-b border-slate-200 dark:border-slate-800">
      
      {/* Page Title & Subheading */}
      <div>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-400 flex items-center gap-1.5">
          <span>Welcome back</span>
          <span>👋</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {pageTitle}
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        
        {/* Dark / Light Toggle Switch matching screenshot */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-14 h-8 rounded-full bg-slate-950 dark:bg-slate-800 p-1 flex items-center justify-between border border-slate-800 transition-colors relative"
          title="Toggle Dark/Light Mode"
        >
          <Sun className={`w-4 h-4 text-amber-400 transition-opacity ${isDarkMode ? 'opacity-40' : 'opacity-100'}`} />
          <Moon className={`w-4 h-4 text-yellow-400 transition-opacity ${isDarkMode ? 'opacity-100' : 'opacity-40'}`} />
          <div className={`w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-700 absolute top-1 transition-transform duration-200 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, roll no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-yellow-500 w-44 sm:w-60"
          />
        </div>

        {/* Notification Icon Button */}
        <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </button>

        {/* Admin Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-yellow-500 text-slate-950 font-bold flex items-center justify-center text-xs shadow-sm">
            A
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Admin</div>
            <div className="text-[10px] text-slate-400 leading-tight">Administrator</div>
          </div>
        </div>

      </div>

    </header>
  );
}
