import React, { useState } from 'react';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';

export default function ApplicationsView({ applications }) {
  const [search, setSearch] = useState('');
  
  const filtered = applications.filter(a => 
    a.studentName.toLowerCase().includes(search.toLowerCase()) || 
    a.company.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadgeVariant = (status) => {
    switch(status.toLowerCase()) {
      case 'offered': return 'success';
      case 'rejected': return 'danger';
      case 'in progress': return 'warning';
      case 'applied': return 'primary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Application Tracking
          </h2>
          <p className="text-sm text-slate-500">
            Monitor student applications and progression through interview rounds.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by student or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      <Card className="rounded-none sm:rounded-sm shadow-sm border-x-0 sm:border-x">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-500">
                  <th className="py-2.5 px-4 font-medium">Application ID</th>
                  <th className="py-2.5 px-4 font-medium">Student</th>
                  <th className="py-2.5 px-4 font-medium">Company & Role</th>
                  <th className="py-2.5 px-4 font-medium">Applied Date</th>
                  <th className="py-2.5 px-4 font-medium">Current Stage</th>
                  <th className="py-2.5 px-4 font-medium">Status</th>
                  <th className="py-2.5 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((app) => (
                  <tr key={app.appId} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 font-mono text-xs text-slate-500">
                      {app.appId}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-medium text-slate-900">{app.studentName}</div>
                      <div className="text-xs text-slate-500">{app.rollNo}</div>
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-medium text-slate-900">{app.company}</div>
                      <div className="text-xs text-slate-500">{app.role}</div>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-slate-700">
                      {app.round}
                    </td>
                    <td className="py-2.5 px-4">
                      <Badge variant={getStatusBadgeVariant(app.status)}>
                        {app.status}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-500 bg-slate-50">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
