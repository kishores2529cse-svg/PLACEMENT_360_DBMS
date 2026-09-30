import React, { useState } from 'react';
import { Database, Play, Code, Key, Table, CheckCircle2, AlertCircle, Sparkles, Copy, FileText } from 'lucide-react';
import { DBMS_SCHEMA, SAMPLE_QUERIES } from '../data/mockDatabase';

export default function DbmsConsole({ students, drives, applications }) {
  const [activeSchemaTable, setActiveSchemaTable] = useState('STUDENTS');
  const [sqlQuery, setSqlQuery] = useState(SAMPLE_QUERIES[0].query);
  const [queryResult, setQueryResult] = useState(null);
  const [queryError, setQueryError] = useState(null);
  const [execTime, setExecTime] = useState(null);

  // Execute SQL simulation against state
  const handleExecuteQuery = () => {
    setQueryError(null);
    const startTime = performance.now();

    const lowerQ = sqlQuery.trim().toLowerCase();

    try {
      if (!lowerQ.startsWith('select')) {
        throw new Error('DBMS Read-Only Console supports SELECT queries for live database exploration.');
      }

      let data = [];
      let columns = [];

      if (lowerQ.includes('from students')) {
        let list = [...students];

        if (lowerQ.includes('cgpa >= 8.5') && lowerQ.includes('backlogs = 0')) {
          list = list.filter(s => s.cgpa >= 8.5 && s.backlogs === 0);
        } else if (lowerQ.includes('status = \'placed\'')) {
          list = list.filter(s => s.status === 'Placed');
        }

        if (lowerQ.includes('order by cgpa desc')) {
          list.sort((a, b) => b.cgpa - a.cgpa);
        }

        columns = ['rollNo', 'name', 'dept', 'cgpa', 'backlogs', 'status', 'offerCompany', 'ctc'];
        data = list;
      } else if (lowerQ.includes('from job_drives')) {
        let list = [...drives];
        if (lowerQ.includes('package >= 20')) {
          list = list.filter(d => d.package >= 20);
        }
        if (lowerQ.includes('status = \'active\'')) {
          list = list.filter(d => d.status === 'Active');
        }
        columns = ['id', 'company', 'tier', 'role', 'package', 'minCgpa', 'location', 'status'];
        data = list;
      } else if (lowerQ.includes('join applications') || lowerQ.includes('from applications')) {
        let list = [...applications];
        columns = ['appId', 'rollNo', 'studentName', 'company', 'role', 'status', 'round', 'appliedDate'];
        data = list;
      } else {
        // Default fallback query return
        columns = ['rollNo', 'name', 'dept', 'cgpa', 'status'];
        data = students.slice(0, 5);
      }

      const endTime = performance.now();
      setExecTime((endTime - startTime).toFixed(2));
      setQueryResult({ columns, data });
    } catch (err) {
      setQueryError(err.message);
      setQueryResult(null);
    }
  };

  const loadSampleQuery = (q) => {
    setSqlQuery(q);
    setQueryError(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Column: Relational Schema & Prebuilt Queries (4 cols) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Schema Viewer Card */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              Relational Schema Viewer
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded">
              3 Tables
            </span>
          </div>

          {/* Table tabs */}
          <div className="flex bg-slate-900 p-1 rounded-xl mb-4 border border-slate-800">
            {DBMS_SCHEMA.map(t => (
              <button
                key={t.tableName}
                onClick={() => setActiveSchemaTable(t.tableName)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeSchemaTable === t.tableName
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tableName}
              </button>
            ))}
          </div>

          {/* Table Schema Details */}
          {DBMS_SCHEMA.filter(t => t.tableName === activeSchemaTable).map(t => (
            <div key={t.tableName} className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-2">
                <Table className="w-3.5 h-3.5 text-indigo-400" />
                Columns in <span className="font-mono text-white">{t.tableName}</span>
              </div>
              <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                {t.columns.map(col => (
                  <div key={col.name} className="flex items-center justify-between bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2">
                      {col.key === 'PK' ? (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-[9px] font-black border border-amber-500/30">PK</span>
                      ) : col.key === 'FK' ? (
                        <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono text-[9px] font-black border border-indigo-500/30">FK</span>
                      ) : (
                        <span className="w-5 text-center text-slate-600 font-mono">-</span>
                      )}
                      <span className="font-mono font-bold text-slate-200">{col.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-indigo-400">{col.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Preset Sample Queries */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Preset DBMS Queries
          </h3>
          <div className="space-y-2">
            {SAMPLE_QUERIES.map((sq, i) => (
              <button
                key={i}
                onClick={() => loadSampleQuery(sq.query)}
                className="w-full text-left p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/30 transition-all text-xs group"
              >
                <div className="font-semibold text-slate-200 group-hover:text-indigo-300 mb-1">{sq.title}</div>
                <div className="font-mono text-[10px] text-slate-400 truncate">{sq.query}</div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column: Interactive SQL Editor & Live Result Grid (8 cols) */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Editor Box */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">Live SQL Editor</span>
            </div>
            <button
              onClick={handleExecuteQuery}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Query</span>
            </button>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              rows={4}
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full p-4 bg-slate-950 font-mono text-xs text-emerald-300 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 resize-none shadow-inner leading-relaxed"
              placeholder="Enter SELECT query here..."
            />
          </div>

          {/* Error notice */}
          {queryError && (
            <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{queryError}</span>
            </div>
          )}
        </div>

        {/* Results Data Table */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 min-h-[300px]">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Table className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-bold text-white">Query Execution Results</span>
            </div>
            {execTime && (
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                  Executed in {execTime} ms
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {queryResult?.data?.length || 0} Rows
                </span>
              </div>
            )}
          </div>

          {queryResult ? (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-xs font-mono font-bold text-slate-300 border-b border-slate-800">
                    {queryResult.columns.map(col => (
                      <th key={col} className="py-2.5 px-3 uppercase tracking-wider">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  {queryResult.data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      {queryResult.columns.map(col => (
                        <td key={col} className="py-2.5 px-3 text-slate-200">
                          {row[col] !== undefined && row[col] !== null ? String(row[col]) : <span className="text-slate-600">NULL</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500 text-xs gap-2">
              <Database className="w-8 h-8 opacity-30 text-indigo-400" />
              <p>Click "Run Query" or choose a preset DBMS query to inspect live database output.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
