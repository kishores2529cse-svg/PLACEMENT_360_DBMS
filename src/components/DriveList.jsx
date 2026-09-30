import React, { useState } from 'react';
import { Building2, MapPin, Calendar, Users, Award, ExternalLink, Plus, Filter, Search, CheckCircle, AlertTriangle } from 'lucide-react';

export default function DriveList({ drives, activeRole, onApplyDrive, onOpenNewDriveModal }) {
  const [filterTier, setFilterTier] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrive, setSelectedDrive] = useState(null);

  const tiers = ['All', 'Super Dream', 'Dream', 'Mass Recruiter'];

  const filteredDrives = drives.filter(drive => {
    const matchesTier = filterTier === 'All' || drive.tier === filterTier;
    const matchesSearch = drive.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drive.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-4 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Campus Placement Drives
          </h2>
          <p className="text-xs text-slate-400">View active company eligibility criteria, recruitment timelines, and package details.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-700/60 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48 sm:w-64"
            />
          </div>

          {/* Tier Filters */}
          <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {tiers.map(tier => (
              <button
                key={tier}
                onClick={() => setFilterTier(tier)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  filterTier === tier
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Add New Drive Button for Officer */}
          {activeRole === 'officer' && (
            <button
              onClick={onOpenNewDriveModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Drive</span>
            </button>
          )}
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDrives.map(drive => (
          <div
            key={drive.id}
            className="glass-card rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 relative group border border-slate-800 hover:border-indigo-500/40"
          >
            <div>
              {/* Header: Company & Tier */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${drive.logoColor || 'from-indigo-500 to-purple-600'} p-0.5 flex items-center justify-center text-white font-black text-lg shadow-md`}>
                    <div className="w-full h-full bg-slate-950/80 rounded-[10px] flex items-center justify-center">
                      {drive.company.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">{drive.company}</h3>
                    <span className="text-[11px] font-mono text-slate-400">{drive.id}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  drive.tier === 'Super Dream'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : drive.tier === 'Dream'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {drive.tier}
                </span>
              </div>

              {/* Role & Package */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-200 line-clamp-1">{drive.role}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-black text-white">₹{drive.package}</span>
                  <span className="text-xs font-semibold text-indigo-400">LPA</span>
                </div>
              </div>

              {/* Eligibility & Details */}
              <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> Min CGPA:
                  </span>
                  <span className="font-bold text-slate-100">{drive.minCgpa} / 10.0</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Max Backlogs:
                  </span>
                  <span className="font-medium text-slate-200">{drive.maxBacklogs} Allowed</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Location:
                  </span>
                  <span className="font-medium text-slate-200 truncate max-w-[140px]">{drive.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Deadline:
                  </span>
                  <span className="font-mono text-slate-200">{drive.deadline}</span>
                </div>
              </div>

              {/* Department tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {drive.depts.map(d => (
                  <span key={d} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer action */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>{drive.totalApplicants} Applied</span>
              </div>

              {drive.status === 'Active' ? (
                <button
                  onClick={() => onApplyDrive(drive)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all"
                >
                  <span>{activeRole === 'student' ? 'Apply Now' : 'View Applicants'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              ) : (
                <span className="px-2.5 py-1 rounded text-[11px] font-semibold bg-slate-800 text-slate-400">
                  {drive.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
