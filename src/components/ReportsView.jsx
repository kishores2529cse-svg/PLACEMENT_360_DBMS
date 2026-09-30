import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';

export default function ReportsView({ students, drives }) {
  
  const deptData = useMemo(() => {
    const depts = {};
    students.forEach(s => {
      if (!s.dept) return;
      if (!depts[s.dept]) depts[s.dept] = { name: s.dept, placed: 0, unplaced: 0, total: 0 };
      depts[s.dept].total++;
      if (s.status === 'Placed') depts[s.dept].placed++;
      else depts[s.dept].unplaced++;
    });
    return Object.values(depts).sort((a, b) => b.total - a.total);
  }, [students]);

  const placementStatusData = useMemo(() => {
    const placed = students.filter(s => s.status === 'Placed').length;
    const notPlaced = students.filter(s => s.status === 'Not Placed').length;
    const optOut = students.filter(s => s.status === 'Non-Placement').length;
    
    return [
      { name: 'Placed', value: placed, color: '#24a148' },
      { name: 'Not Placed', value: notPlaced, color: '#f1c21b' },
      { name: 'Opted Out', value: optOut, color: '#8d8d8d' }
    ];
  }, [students]);

  const totalStudents = students.length;
  const placedStudents = placementStatusData[0].value;
  const placementRate = totalStudents ? Math.round((placedStudents / (totalStudents - placementStatusData[2].value)) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Analytics & Reports
          </h2>
          <p className="text-sm text-slate-500">
            Placement statistics and institutional performance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Effective Placement Rate</div>
            <div className="text-3xl font-semibold text-slate-900">{placementRate}%</div>
            <div className="text-xs text-slate-400 mt-2">Excluding students opted out for higher studies.</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Highest Package</div>
            <div className="text-3xl font-semibold text-slate-900">
              {drives.length ? Math.max(...drives.map(d => d.package)) : 0} <span className="text-sm font-medium text-slate-500">LPA</span>
            </div>
            <div className="text-xs text-slate-400 mt-2">Based on current active drives.</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total Active Drives</div>
            <div className="text-3xl font-semibold text-slate-900">
              {drives.filter(d => d.status === 'Active').length}
            </div>
            <div className="text-xs text-slate-400 mt-2">Currently accepting applications.</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Placement by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <RechartsTooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '2px', border: '1px solid #e2e8f0', boxShadow: 'none' }}
                  />
                  <Bar dataKey="placed" name="Placed" stackId="a" fill="black" />
                  <Bar dataKey="unplaced" name="Not Placed" stackId="a" fill="#c6c6c6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall Student Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8 py-6">
            <div className="h-[220px] w-[220px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={placementStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={1}
                    dataKey="value"
                    stroke="none"
                  >
                    {placementStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '2px', border: '1px solid #e2e8f0', boxShadow: 'none' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3 w-full md:w-auto">
              {placementStatusData.map(item => (
                <div key={item.name} className="flex items-center justify-between gap-6 px-4 py-2 border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
