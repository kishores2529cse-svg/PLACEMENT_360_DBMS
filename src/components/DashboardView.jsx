import React from 'react';
import { GraduationCap, CheckCircle2, CircleDot, Percent, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function DashboardView({ students, onNavigateToStudents }) {
  const totalStudents = students.length;
  const placedStudents = students.filter(s => s.status === 'Placed').length;
  const notPlacedStudents = students.filter(s => s.status === 'Not Placed').length;
  const placementRate = totalStudents ? Math.round((placedStudents / totalStudents) * 100) : 0;

  // Donut chart math (circumference = 2 * pi * r = 2 * 3.14159 * 40 = 251.3)
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (placementRate / 100) * circumference;

  return (
    <div className="space-y-6">

      {/* Hero Placement Overview Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#18181B] text-white p-6 sm:p-8 shadow-xl">
        {/* Background Decorative Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-yellow-500/10 via-yellow-500/5 to-transparent pointer-events-none" />
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="text-[11px] font-extrabold tracking-wider text-yellow-500 uppercase">
            PLACEMENT OVERVIEW
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Track your placement journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl">
            Manage student placement information from one centralized platform.
          </p>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Card 1: Total Students */}
        <div className="bg-white dark:bg-[#18181C] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-700 dark:text-yellow-400 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Students</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mt-0.5">
              {totalStudents}
            </div>
            <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 mt-0.5">
              <span>↑ 12% this year</span>
            </div>
          </div>
        </div>

        {/* Card 2: Placed Students */}
        <div className="bg-white dark:bg-[#18181C] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Placed Students</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mt-0.5">
              {placedStudents}
            </div>
            <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 mt-0.5">
              <span>↑ 8% this month</span>
            </div>
          </div>
        </div>

        {/* Card 3: Not Placed */}
        <div className="bg-white dark:bg-[#18181C] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
            <CircleDot className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Not Placed</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mt-0.5">
              {notPlacedStudents}
            </div>
            <div className="text-[11px] font-medium text-amber-600 dark:text-amber-400 mt-0.5">
              Needs attention
            </div>
          </div>
        </div>

        {/* Card 4: Placement Rate */}
        <div className="bg-white dark:bg-[#18181C] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-yellow-500/10 flex items-center justify-center text-amber-800 dark:text-yellow-400 shrink-0 font-extrabold text-lg">
            %
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Placement Rate</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mt-0.5">
              {placementRate}%
            </div>
            <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
              Current rate
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Split: Recent Students Table (65%) & Donut Chart (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Recent Students Table */}
        <div className="lg:col-span-8 bg-white dark:bg-[#18181C] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">

          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Recent Students</h3>
              <p className="text-xs text-slate-400 font-medium">Latest student placement records</p>
            </div>
            <button
              onClick={onNavigateToStudents}
              className="text-xs font-bold text-yellow-600 hover:text-yellow-500 flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <th className="py-3 px-2">Student</th>
                  <th className="py-3 px-2">Department</th>
                  <th className="py-3 px-2">CGPA</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                {students.slice(0, 5).map((student) => (
                  <tr key={student.rollNo} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Student Info */}
                    <td className="py-3.5 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 font-extrabold flex items-center justify-center text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{student.name}</div>
                          <div className="text-[11px] font-mono text-slate-400">{student.rollNo}</div>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-2 font-medium text-slate-700 dark:text-slate-300">
                      {student.dept}
                    </td>

                    {/* CGPA */}
                    <td className="py-3.5 px-2 font-bold text-slate-900 dark:text-white">
                      {student.cgpa}
                    </td>

                    {/* Status Pill matching screenshot */}
                    <td className="py-3.5 px-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${student.status === 'Placed'
                        ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300'
                        }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Column: Placement Status Donut Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-[#18181C] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">

          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Placement Status</h3>
            <p className="text-xs text-slate-400 font-medium">Current student distribution</p>
          </div>

          {/* SVG Donut Chart */}
          <div className="py-8 flex flex-col items-center justify-center relative">
            <svg className="w-48 h-48 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="currentColor"
                strokeWidth="14"
                className="text-slate-100 dark:text-slate-800 fill-none"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="#EAB308"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="fill-none transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{placementRate}%</span>
              <span className="text-xs text-slate-400 font-semibold">PLACED</span>
            </div>
          </div>

          {/* Legend */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">PLACED ({placedStudents})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">NOT PLACED ({notPlacedStudents})</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
