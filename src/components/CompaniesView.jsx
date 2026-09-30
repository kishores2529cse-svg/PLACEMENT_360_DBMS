import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';

export default function CompaniesView({ drives }) {
  const [search, setSearch] = useState('');
  
  const companies = Array.from(new Set(drives.map(d => d.company))).map(companyName => {
    const companyDrives = drives.filter(d => d.company === companyName);
    return {
      name: companyName,
      industry: 'Technology',
      location: companyDrives[0]?.location || 'Multiple Locations',
      activeDrives: companyDrives.length,
      topPackage: Math.max(...companyDrives.map(d => d.package)),
    };
  });

  const filtered = companies.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Partner Companies
          </h2>
          <p className="text-sm text-slate-500">
            Manage recruiting partners and corporate relationships.
          </p>
        </div>
        <Button className="shrink-0 gap-2">
          <Plus className="w-4 h-4" />
          Add Company
        </Button>
      </div>

      <div className="flex items-center w-full max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(company => (
          <Card key={company.name} className="flex flex-col rounded-sm shadow-sm hover:border-black transition-colors cursor-pointer">
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-700">
                  {company.name.charAt(0)}
                </div>
                <Badge variant="primary" className="font-mono">{company.activeDrives} Active Drives</Badge>
              </div>
              
              <h3 className="text-base font-semibold text-slate-900 mb-0.5">{company.name}</h3>
              <div className="text-xs text-slate-500 mb-4">{company.industry} • {company.location}</div>
              
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Top Package</span>
                <span className="text-sm font-semibold text-slate-900">{company.topPackage} LPA</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
