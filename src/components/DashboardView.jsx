import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export default function DashboardView({ students, onNavigateToStudents }) {
  const totalStudents = students.length;
  const placedStudents = students.filter(s => s.status === 'Placed').length;
  const notPlacedStudents = students.filter(s => s.status === 'Not Placed').length;
  const placementRate = totalStudents ? Math.round((placedStudents / totalStudents) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Placement Overview</h2>
          <p className="text-sm text-slate-500">Academic Year 2024-2025</p>
        </div>
        <Button onClick={onNavigateToStudents}>View All Students</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total Students</div>
            <div className="text-2xl font-semibold text-slate-900">{totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Placed</div>
            <div className="text-2xl font-semibold text-slate-900">{placedStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Not Placed</div>
            <div className="text-2xl font-semibold text-slate-900">{notPlacedStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Placement Rate</div>
            <div className="text-2xl font-semibold text-slate-900">{placementRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Placements</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200 text-xs font-medium text-slate-500">
                  <th className="py-2.5 px-4 font-medium">Register No</th>
                  <th className="py-2.5 px-4 font-medium">Student Name</th>
                  <th className="py-2.5 px-4 font-medium">Department</th>
                  <th className="py-2.5 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {students.slice(0, 8).map((student) => (
                  <tr key={student.rollNo}>
                    <td className="py-2.5 px-4 text-slate-500 font-mono text-xs">{student.rollNo}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-900">{student.name}</td>
                    <td className="py-2.5 px-4 text-slate-600">{student.dept}</td>
                    <td className="py-2.5 px-4">
                      <Badge variant={student.status === 'Placed' ? 'success' : student.status === 'Not Placed' ? 'warning' : 'default'}>
                        {student.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">Generate Placement Report</Button>
            <Button variant="outline" className="w-full justify-start">Schedule New Drive</Button>
            <Button variant="outline" className="w-full justify-start">Import Student Data (CSV)</Button>
            <Button variant="outline" className="w-full justify-start">Send Notifications</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
