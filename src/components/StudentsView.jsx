import React, { useState, useMemo } from 'react';
import { Search, Filter, MoreVertical, Edit2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';
import { Card, CardContent } from './ui/Card';

export default function StudentsView({ 
  viewType, 
  data, 
  onOpenAddStudentModal,
  onMoveToNotPlaced,
  onMoveToPlaced,
  onMoveToNonPlacement,
  onEditStudent
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [minCgpa, setMinCgpa] = useState('');
  const [maxBacklogs, setMaxBacklogs] = useState('');

  const departments = useMemo(() => {
    const depts = new Set(data.map(d => d.dept).filter(Boolean));
    return ['All', ...Array.from(depts)];
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter(s => {
      const matchesSearch = 
        (s.name && s.name.toLowerCase().includes(search.toLowerCase())) ||
        (s.rollNo && s.rollNo.toLowerCase().includes(search.toLowerCase()));
      
      const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
      const matchesDept = deptFilter === 'All' || s.dept === deptFilter;
      
      const cgpaVal = parseFloat(s.cgpa);
      const matchesMinCgpa = minCgpa === '' || (!isNaN(cgpaVal) && cgpaVal >= parseFloat(minCgpa));
      
      const backlogsVal = parseInt(s.backlogs);
      const matchesMaxBacklogs = maxBacklogs === '' || (!isNaN(backlogsVal) && backlogsVal <= parseInt(maxBacklogs));

      return matchesSearch && matchesStatus && matchesDept && matchesMinCgpa && matchesMaxBacklogs;
    });
  }, [data, search, statusFilter, deptFilter, minCgpa, maxBacklogs]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadgeVariant = (status) => {
    switch(status) {
      case 'Placed': return 'success';
      case 'Not Placed': return 'warning';
      case 'Non-Placement': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {viewType === 'all' ? 'Student Directory' : viewType === 'placed' ? 'Placed Students' : 'Not Placed Students'}
          </h2>
          <p className="text-sm text-slate-500">
            {viewType === 'all' 
              ? 'Manage and track all registered students across the institution.'
              : viewType === 'placed' 
              ? 'Directory of students who have secured placements.'
              : 'Directory of students actively seeking placements.'}
          </p>
        </div>

        {viewType === 'all' && (
          <Button onClick={onOpenAddStudentModal}>
            Add Student
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="relative flex-1 w-full max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by name or register number..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-8 bg-white"
          />
        </div>
        
        {viewType === 'all' && (
          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="h-9 px-3 border border-slate-300 bg-white text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          >
            <option value="All">All Statuses</option>
            <option value="Placed">Placed</option>
            <option value="Not Placed">Not Placed</option>
            <option value="Non-Placement">Non-Placement</option>
          </select>
        )}
        
        <select 
          value={deptFilter}
          onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }}
          className="h-9 px-3 border border-slate-300 bg-white text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        >
          {departments.map(d => (
            <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
          ))}
        </select>

        <Button 
          variant={showAdvancedFilters ? "secondary" : "outline"} 
          className="ml-auto gap-2"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <Filter className="w-4 h-4" /> Filter Options
        </Button>
      </div>

      {showAdvancedFilters && (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-700">Min CGPA:</span>
            <Input 
              type="number" 
              step="0.1"
              placeholder="e.g. 7.5"
              className="h-8 w-24 text-xs" 
              value={minCgpa} 
              onChange={(e) => { setMinCgpa(e.target.value); setCurrentPage(1); }} 
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-700">Max Backlogs:</span>
            <Input 
              type="number" 
              placeholder="e.g. 0"
              className="h-8 w-24 text-xs" 
              value={maxBacklogs} 
              onChange={(e) => { setMaxBacklogs(e.target.value); setCurrentPage(1); }} 
            />
          </div>
          <Button variant="ghost" size="sm" onClick={() => { setMinCgpa(''); setMaxBacklogs(''); setCurrentPage(1); }} className="text-xs h-8 text-slate-500">
            Clear Filters
          </Button>
        </div>
      )}

      <Card className="rounded-none border-x-0 sm:border-x sm:rounded-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-500">
                  <th className="py-2.5 px-4 font-medium">Register No</th>
                  <th className="py-2.5 px-4 font-medium">Student Name</th>
                  <th className="py-2.5 px-4 font-medium">Department</th>
                  <th className="py-2.5 px-4 font-medium">CGPA</th>
                  {viewType === 'not_placed' && (
                    <th className="py-2.5 px-4 font-medium">Backlogs</th>
                  )}
                  {viewType === 'placed' && (
                    <>
                      <th className="py-2.5 px-4 font-medium">Company</th>
                      <th className="py-2.5 px-4 font-medium">Career Path</th>
                    </>
                  )}
                  {viewType === 'all' && <th className="py-2.5 px-4 font-medium">Status</th>}
                  <th className="py-2.5 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paginatedData.map((s) => (
                  <tr key={s.rollNo} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 text-slate-500 font-mono text-xs">{s.rollNo}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-900">{s.name}</td>
                    <td className="py-2.5 px-4 text-slate-600">{s.dept || '-'}</td>
                    <td className="py-2.5 px-4 text-slate-900">{s.cgpa !== undefined ? s.cgpa : '-'}</td>

                    {viewType === 'not_placed' && (
                      <td className="py-2.5 px-4 text-slate-900">{s.backlogs !== undefined ? s.backlogs : '-'}</td>
                    )}

                    {viewType === 'placed' && (
                      <>
                        <td className="py-2.5 px-4 text-slate-900">{s.offerCompany || '-'}</td>
                        <td className="py-2.5 px-4 text-slate-600">{s.placementType || '-'}</td>
                      </>
                    )}

                    {viewType === 'all' && (
                      <td className="py-2.5 px-4">
                        <Badge variant={getStatusBadgeVariant(s.status)}>
                          {s.status || 'Unknown'}
                        </Badge>
                      </td>
                    )}

                    <td className="py-2.5 px-4 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-500" onClick={() => onEditStudent && onEditStudent(s)}>
                          <Edit2 className="w-3 h-3 mr-1" /> Edit
                        </Button>
                        {viewType === 'placed' ? (
                          <Button variant="link" size="sm" onClick={() => onMoveToNotPlaced && onMoveToNotPlaced(s)}>
                            Revert
                          </Button>
                        ) : viewType === 'not_placed' ? (
                          <Button variant="link" size="sm" onClick={() => onMoveToPlaced && onMoveToPlaced(s)}>
                            Mark Placed
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreVertical className="w-4 h-4 text-slate-400" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-slate-500 bg-slate-50">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-slate-200 bg-white gap-3 sm:gap-0">
              <div className="text-xs text-slate-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="text-xs px-3 text-slate-700">
                  Page {currentPage} of {totalPages}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
