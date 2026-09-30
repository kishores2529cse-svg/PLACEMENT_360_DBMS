import React from 'react';
import { Info, Database, ShieldCheck, Zap, ArrowDown } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white dark:bg-[#18181C] p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center font-extrabold text-black text-3xl shadow-lg shadow-yellow-500/20">
            P
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">About Placement 360</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Campus Placement & DBMS Management System</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Project Problem Statement</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Traditionally, institutions face significant challenges tracking placement records. Details of placed students, non-placed students, and students opting out (higher studies, business) are often scattered across WhatsApp messages, local file systems, and disparate Excel sheets. This approach inherently leads to massive <strong>data redundancy</strong> and <strong>data inconsistency</strong>.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Placement 360</strong> solves this by serving as a centralized DBMS application. It completely replaces messy spreadsheets with structured, normalized relational tables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <Database className="w-6 h-6 text-yellow-500 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Relational Integrity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Strictly defined schema constraints ensure data is consistent across <code className="text-emerald-500">students_placed</code>, <code className="text-amber-500">students_notplaced</code>, and <code className="text-indigo-500">non_placement</code> tables.</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <Zap className="w-6 h-6 text-emerald-500 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Dynamic Workflows</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">When a student is marked as "Placed", the system handles the cross-table transaction automatically (DELETE from Not Placed, INSERT to Placed) behind the scenes.</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <ShieldCheck className="w-6 h-6 text-indigo-500 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Single Source of Truth</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Placement Officers, Admins, and automated reporting systems all read from exactly the same up-to-date relational database.</p>
          </div>
        </div>

        <div id="creators-section" className="pt-8 mt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 text-center">MEET THE CREATORS</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              {/* Note: The user should save their image as 'team.png' in the public folder */}
              <img 
                src="/team.png" 
                alt="Placement 360 Creators Team" 
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/800x400/1e293b/ffffff?text=Please+add+team.png+to+public+folder";
                }}
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <p className="font-bold text-slate-900 dark:text-white text-sm">HARIS ROSHAN</p>
                <div className="h-1 w-8 bg-emerald-500 rounded-full mx-auto"></div>
              </div>
              
              <div className="space-y-1">
                <p className="font-bold text-slate-900 dark:text-white text-sm">JEEVINTH</p>
                <div className="h-1 w-8 bg-blue-500 rounded-full mx-auto"></div>
              </div>
              
              <div className="space-y-1">
                <p className="font-extrabold text-yellow-600 dark:text-yellow-500 text-sm">KISHORE S</p>
                <p className="text-[10px] text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-wider">Team Lead</p>
                <div className="h-1 w-8 bg-yellow-500 rounded-full mx-auto mt-1"></div>
              </div>
              
              <div className="space-y-1">
                <p className="font-bold text-slate-900 dark:text-white text-sm">JAMES VASANTHAN</p>
                <div className="h-1 w-8 bg-indigo-500 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Scroll Button */}
      <button 
        onClick={() => document.getElementById('creators-section')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-10 right-10 bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] transition-all duration-300 animate-bounce z-50 flex items-center justify-center group"
        aria-label="Scroll to Creators"
      >
        <ArrowDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
