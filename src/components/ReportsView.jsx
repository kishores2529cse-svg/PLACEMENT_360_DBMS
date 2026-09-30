import React from 'react';
import { BarChart3, Award, TrendingUp, Users, Building2 } from 'lucide-react';

export default function ReportsView({ students, drives }) {
  const deptStats = ['CSE', 'IT', 'ECE', 'MECH'].map(dept => {
    const list = students.filter(s => s.dept === dept);
    const placed = list.filter(s => s.status === 'Placed').length;
    const rate = list.length ? Math.round((placed / list.length) * 100) : 0;
    return { dept, total: list.length, placed, rate };
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#18181C] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-yellow-500" />
          Placement Analytics & Reports
        </h2>
        <p className="text-xs text-slate-400 font-medium">Department wise statistics and recruitment performance metrics.</p>
      </div>

      {/* Grid of Department Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Department Placement Breakdown */}
        <div className="bg-white dark:bg-[#18181C] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Department Wise Placement Rate</h3>
          
          <div className="space-y-4">
            {deptStats.map(ds => (
              <div key={ds.dept} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>{ds.dept} Department</span>
                  <span>{ds.placed} / {ds.total} Placed ({ds.rate}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full transition-all duration-700"
                    style={{ width: `${ds.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Recruiters */}
        <div className="bg-white dark:bg-[#18181C] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Top Recruiting Partners</h3>
          
          <div className="space-y-3">
            {drives.map(drive => (
              <div key={drive.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-yellow-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-sm">
                    {drive.company.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{drive.company}</div>
                    <div className="text-[11px] text-slate-400">{drive.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">₹{drive.package} LPA</div>
                  <div className="text-[10px] text-slate-400">{drive.applicants} Applicants</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
