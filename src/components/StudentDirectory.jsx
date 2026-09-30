import React, { useState } from 'react';
import { Users, Search, Filter, Plus, CheckCircle, Clock, AlertCircle, Award, UserCheck, Shield } from 'lucide-react';

export default function StudentDirectory({ students, setStudents, activeRole, onOpenAddStudentModal }) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const departments = ['All', 'CSE', 'IT', 'ECE', 'EEE', 'MECH'];
  const statuses = ['All', 'Placed', 'Eligible', 'In-Process', 'Not Eligible'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) ||
                          student.rollNo.toLowerCase().includes(search.toLowerCase()) ||
                          student.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesDept = deptFilter === 'All' || student.dept === deptFilter;
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleStatusChange = (rollNo, newStatus) => {
    setStudents(prev => prev.map(s => s.rollNo === rollNo ? { ...s, status: newStatus } : s));
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="glass-card p-4 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Student Master Database
          </h2>
          <p className="text-xs text-slate-400">Total {students.length} registered students with CGPA, backlogs, and placement records.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Roll No, Name, Skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-700/60 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48 sm:w-64"
            />
          </div>

          {/* Dept Dropdown */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900/90 border border-slate-700/60 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            {departments.map(d => <option key={d} value={d}>{d === 'All' ? 'All Depts' : d}</option>)}
          </select>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900/90 border border-slate-700/60 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            {statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
          </select>

          {activeRole === 'officer' && (
            <button
              onClick={onOpenAddStudentModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Student Details</th>
                <th className="py-3.5 px-4">Dept</th>
                <th className="py-3.5 px-4">CGPA</th>
                <th className="py-3.5 px-4">Backlogs</th>
                <th className="py-3.5 px-4">Placement Status</th>
                <th className="py-3.5 px-4">Offer / CTC</th>
                <th className="py-3.5 px-4">Key Skills</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => (
                  <tr key={s.rollNo} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">{s.rollNo}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-100">{s.name}</div>
                      <div className="text-[11px] text-slate-400">{s.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-medium border border-slate-700">
                        {s.dept}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-bold ${s.cgpa >= 8.5 ? 'text-emerald-400' : s.cgpa >= 7.5 ? 'text-amber-400' : 'text-slate-300'}`}>
                        {s.cgpa.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${s.backlogs === 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400 font-bold'}`}>
                        {s.backlogs}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {activeRole === 'officer' ? (
                        <select
                          value={s.status}
                          onChange={(e) => handleStatusChange(s.rollNo, e.target.value)}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold focus:outline-none bg-slate-900 border border-slate-700 ${
                            s.status === 'Placed' ? 'text-emerald-400' : s.status === 'In-Process' ? 'text-amber-400' : 'text-slate-300'
                          }`}
                        >
                          <option value="Placed">Placed</option>
                          <option value="Eligible">Eligible</option>
                          <option value="In-Process">In-Process</option>
                          <option value="Not Eligible">Not Eligible</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          s.status === 'Placed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : s.status === 'In-Process'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {s.status === 'Placed' && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                          {s.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {s.offerCompany ? (
                        <div>
                          <div className="font-bold text-purple-300">{s.offerCompany}</div>
                          <div className="text-[11px] font-semibold text-emerald-400">₹{s.ctc} LPA</div>
                        </div>
                      ) : (
                        <span className="text-slate-500 font-mono">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="flex flex-wrap gap-1">
                        {s.skills.map((skill, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-slate-900 text-[10px] text-slate-300 rounded border border-slate-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400">
                    No student records matched your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
