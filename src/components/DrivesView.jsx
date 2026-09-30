import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';

export default function DrivesView({ drives }) {
  const [search, setSearch] = useState('');
  
  const filtered = drives.filter(d => 
    d.company.toLowerCase().includes(search.toLowerCase()) || 
    d.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Placement Drives
          </h2>
          <p className="text-sm text-slate-500">
            Manage active and upcoming recruitment events.
          </p>
        </div>
        <Button className="shrink-0 gap-2">
          <Plus className="w-4 h-4" />
          Create Drive
        </Button>
      </div>

      <div className="flex items-center w-full max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search roles or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(drive => (
          <Card key={drive.id} className="flex flex-col rounded-sm shadow-sm">
            <CardHeader className="pb-3 px-5 pt-5 border-b border-slate-100">
              <div className="flex justify-between items-start mb-1">
                <div className="text-xs font-mono text-slate-500">{drive.id}</div>
                <Badge variant={drive.status === 'Active' ? 'success' : 'default'}>
                  {drive.status}
                </Badge>
              </div>
              <CardTitle className="text-base text-slate-900">{drive.company}</CardTitle>
              <div className="text-sm text-slate-600">
                {drive.role}
              </div>
            </CardHeader>
            <CardContent className="p-5 flex-1 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-y-3">
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Package</div>
                  <div className="font-medium text-slate-900">{drive.package} LPA</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Location</div>
                  <div className="font-medium text-slate-900">{drive.location}</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Eligibility</div>
                  <div className="font-medium text-slate-900">&ge; {drive.minCgpa} CGPA</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Applicants</div>
                  <div className="font-medium text-slate-900">{drive.applicants}</div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-slate-100">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Target Departments</div>
                <div className="flex flex-wrap gap-1">
                  {drive.depts.map(dept => (
                    <span key={dept} className="px-1.5 py-0.5 border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-600">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
