import React, { useState } from 'react';
import { Search, UserPlus, ArrowRightLeft } from 'lucide-react';

export default function StudentsView({ 
  viewType, 
  data, 
  onOpenAddStudentModal,
  onMoveToPlaced,
  onMoveToNotPlaced,
  onMoveToNonPlacement
}) {
  const [search, setSearch] = useState('');

  const filtered = data.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#18181C] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {viewType === 'all' && 'All Students Complete Details'}
            {viewType === 'placed' && 'Placed Students Directory'}
            {viewType === 'not_placed' && 'Students Awaiting Placement'}
            {viewType === 'non_placement' && 'Non-Placement (Opt-Out) Directory'}
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            {viewType === 'all' && 'Master view of all registered student records across all tables.'}
            {viewType === 'placed' && 'Records from STUDENTS_PLACED table (On-campus & Off-campus).'}
            {viewType === 'not_placed' && 'Records from STUDENTS_NOTPLACED table.'}
            {viewType === 'non_placement' && 'Records from NON_PLACEMENT table (Higher studies, Business, etc).'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by name or roll..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-yellow-500 w-full sm:w-56"
            />
          </div>

          {(viewType === 'all' || viewType === 'not_placed') && (
            <button
              onClick={onOpenAddStudentModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs shadow-md shadow-yellow-500/20 transition-all shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#18181C] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                {/* Custom Headers exactly as requested for Placed table */}
                {viewType === 'placed' ? (
                  <>
                    <th className="py-3.5 px-4">S.No</th>
                    <th className="py-3.5 px-4">Register No</th>
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-4">Career Path</th>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-4">Company Name</th>
                  </>
                ) : (
                  <>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Dept</th>
                    <th className="py-3.5 px-4">CGPA</th>
                    {(viewType === 'all' || viewType === 'not_placed') && <th className="py-3.5 px-4">Backlogs</th>}
                    {viewType === 'all' && (
                      <>
                        <th className="py-3.5 px-4">Company</th>
                        <th className="py-3.5 px-4">Path</th>
                      </>
                    )}
                    {(viewType === 'all' || viewType === 'non_placement') && (
                      <th className="py-3.5 px-4">Purpose</th>
                    )}
                  </>
                )}

                {viewType !== 'all' && <th className="py-3.5 px-4 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {filtered.map((s, index) => (
                <tr key={s.rollNo} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  
                  {/* Custom Render exactly as requested for Placed table */}
                  {viewType === 'placed' ? (
                    <>
                      <td className="py-3.5 px-4 font-bold text-slate-500">
                        {s.sNo || index + 1}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-900 dark:text-white">
                        {s.rollNo}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {s.name}
                      </td>
                      <td className="py-3.5 px-4">
                        {s.placementType ? (
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-[10px] uppercase">
                            {s.placementType}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        {s.dept}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                        {s.offerCompany || '-'}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 font-extrabold flex items-center justify-center text-xs">
                            {s.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm">{s.name}</div>
                            <div className="text-[11px] font-mono text-slate-400">{s.rollNo}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        {s.dept}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {s.cgpa}
                      </td>

                      {(viewType === 'all' || viewType === 'not_placed') && (
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${s.backlogs === 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300'}`}>
                            {s.backlogs !== undefined ? s.backlogs : '-'}
                          </span>
                        </td>
                      )}

                      {viewType === 'all' && (
                        <>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 dark:text-white">{s.offerCompany || '-'}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            {s.placementType ? (
                              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-[10px] uppercase">
                                {s.placementType}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                        </>
                      )}

                      {(viewType === 'all' || viewType === 'non_placement') && (
                        <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                          {s.purpose || '-'}
                        </td>
                      )}
                    </>
                  )}

                  {/* Action Buttons for explicit moves simulating DB operations */}
                  {viewType === 'not_placed' && (
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => onMoveToPlaced(s)}
                        className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-500/20"
                        title="Delete from Not Placed & Insert to Placed"
                      >
                        Mark Placed
                      </button>
                      <button
                        onClick={() => onMoveToNonPlacement(s)}
                        className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded hover:bg-amber-100 dark:hover:bg-amber-500/20"
                        title="Delete from Not Placed & Insert to Non-Placement"
                      >
                        Opt-Out (Non-Placement)
                      </button>
                    </td>
                  )}

                  {viewType === 'placed' && (
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onMoveToNotPlaced(s)}
                        className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 inline-flex"
                      >
                        <ArrowRightLeft className="w-3 h-3" />
                        Revert to Not Placed
                      </button>
                    </td>
                  )}

                  {viewType === 'non_placement' && (
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onMoveToNotPlaced(s)}
                        className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 inline-flex"
                      >
                        <ArrowRightLeft className="w-3 h-3" />
                        Revert to Not Placed
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-slate-400">
                    No records found in this table.
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
