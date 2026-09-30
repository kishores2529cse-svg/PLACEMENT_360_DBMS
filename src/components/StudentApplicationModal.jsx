import React, { useState } from 'react';
import { X, Building2, CheckCircle2, XCircle, Send, Award, AlertCircle } from 'lucide-react';

export default function StudentApplicationModal({ drive, students, isOpen, onClose, onSubmitApplication }) {
  const [selectedRoll, setSelectedRoll] = useState(students[4]?.rollNo || students[0]?.rollNo || '');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !drive) return null;

  const currentStudent = students.find(s => s.rollNo === selectedRoll) || students[0];

  const isCgpaEligible = currentStudent ? currentStudent.cgpa >= drive.minCgpa : false;
  const isBacklogEligible = currentStudent ? currentStudent.backlogs <= drive.maxBacklogs : false;
  const isDeptEligible = currentStudent ? drive.depts.includes(currentStudent.dept) : false;

  const isEligible = isCgpaEligible && isBacklogEligible && isDeptEligible;

  const handleApply = () => {
    if (!isEligible) return;

    const newApp = {
      appId: `APP-${Math.floor(100 + Math.random() * 900)}`,
      rollNo: currentStudent.rollNo,
      studentName: currentStudent.name,
      driveId: drive.id,
      company: drive.company,
      role: drive.role,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      round: 'Online Assessment Pending'
    };

    onSubmitApplication(newApp);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md rounded-2xl p-6 border border-slate-700 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${drive.logoColor || 'from-indigo-600 to-purple-600'} flex items-center justify-center font-black text-white text-lg`}>
            {drive.company.charAt(0)}
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{drive.company} Application</h3>
            <p className="text-xs text-indigo-400 font-semibold">{drive.role} • ₹{drive.package} LPA</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-white">Application Submitted!</h4>
            <p className="text-xs text-slate-400">Record inserted into APPLICATIONS table successfully.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Student Profile</label>
              <select
                value={selectedRoll}
                onChange={(e) => setSelectedRoll(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                {students.map(s => (
                  <option key={s.rollNo} value={s.rollNo}>
                    {s.rollNo} - {s.name} ({s.dept}, CGPA: {s.cgpa})
                  </option>
                ))}
              </select>
            </div>

            {/* Live Eligibility Check Matrix */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Live Eligibility Audit
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">CGPA Cutoff (&ge; {drive.minCgpa}):</span>
                <span className={`font-mono font-bold flex items-center gap-1 ${isCgpaEligible ? 'text-emerald-400' : 'text-red-400'}`}>
                  {currentStudent.cgpa} {isCgpaEligible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Max Backlogs Allowed (&le; {drive.maxBacklogs}):</span>
                <span className={`font-mono font-bold flex items-center gap-1 ${isBacklogEligible ? 'text-emerald-400' : 'text-red-400'}`}>
                  {currentStudent.backlogs} {isBacklogEligible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Eligible Branch ({drive.depts.join(', ')}):</span>
                <span className={`font-mono font-bold flex items-center gap-1 ${isDeptEligible ? 'text-emerald-400' : 'text-red-400'}`}>
                  {currentStudent.dept} {isDeptEligible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                </span>
              </div>
            </div>

            {/* Eligibility summary alert */}
            {!isEligible && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>Student does not satisfy eligibility constraints for this drive.</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={!isEligible}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white transition-all ${
                  isEligible
                    ? 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Application</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
