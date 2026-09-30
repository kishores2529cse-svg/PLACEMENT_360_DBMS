import React from 'react';
import { TrendingUp, Award, Building2, Users, DollarSign, CheckCircle2 } from 'lucide-react';

export default function StatsCards({ students, drives }) {
  const totalStudents = students.length;
  const placedStudents = students.filter(s => s.status === 'Placed').length;
  const placementPercentage = totalStudents ? ((placedStudents / totalStudents) * 100).toFixed(1) : 0;
  
  const placedCTCs = students.filter(s => s.status === 'Placed').map(s => s.ctc);
  const highestPackage = placedCTCs.length ? Math.max(...placedCTCs) : 0;
  const avgPackage = placedCTCs.length ? (placedCTCs.reduce((a, b) => a + b, 0) / placedCTCs.length).toFixed(1) : 0;
  
  const activeDrives = drives.filter(d => d.status === 'Active').length;

  const stats = [
    {
      title: 'Highest Package Offered',
      value: `₹${highestPackage} LPA`,
      subtitle: 'Atlassian & Google',
      icon: Award,
      gradient: 'from-purple-500/20 to-indigo-500/10',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
    },
    {
      title: 'Placement Ratio',
      value: `${placementPercentage}%`,
      subtitle: `${placedStudents} of ${totalStudents} Eligible Placed`,
      icon: TrendingUp,
      gradient: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
    },
    {
      title: 'Average Package (CTC)',
      value: `₹${avgPackage} LPA`,
      subtitle: 'Across CSE, IT, ECE & EEE',
      icon: DollarSign,
      gradient: 'from-blue-500/20 to-cyan-500/10',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
    },
    {
      title: 'Active Recruitment Drives',
      value: `${activeDrives} Live`,
      subtitle: `${drives.length} Total Registered Companies`,
      icon: Building2,
      gradient: 'from-amber-500/20 to-orange-500/10',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`glass-card p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${stat.borderColor}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</span>
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} ${stat.textColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
              {stat.value}
            </div>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
              {stat.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
