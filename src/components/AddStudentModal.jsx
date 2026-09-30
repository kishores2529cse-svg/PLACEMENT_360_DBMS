import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export default function AddStudentModal({ isOpen, onClose, onAddStudent, initialData }) {
  const [form, setForm] = useState({
    rollNo: '',
    name: '',
    dept: 'CSE',
    cgpa: '',
    backlogs: '',
    email: '',
    skills: '',
    offerCompany: '',
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setForm({
        rollNo: initialData.rollNo || '',
        name: initialData.name || '',
        dept: initialData.dept || 'CSE',
        cgpa: initialData.cgpa || '',
        backlogs: initialData.backlogs || '',
        email: initialData.email || '',
        skills: initialData.skills && Array.isArray(initialData.skills) ? initialData.skills.join(', ') : (initialData.skills || ''),
        offerCompany: initialData.offerCompany || '',
      });
    } else if (isOpen) {
      setForm({
        rollNo: '',
        name: '',
        dept: 'CSE',
        cgpa: '',
        backlogs: '',
        email: '',
        skills: '',
        offerCompany: '',
      });
    }
  }, [initialData, isOpen]);

  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rollNo) return;

    setIsLoading(true);

    const newStudent = {
      rollNo: form.rollNo,
      name: form.name,
      dept: form.dept,
      cgpa: parseFloat(form.cgpa),
      backlogs: isNaN(parseInt(form.backlogs)) ? 0 : parseInt(form.backlogs),
      status: initialData ? initialData.status : 'Not Placed',
      offerCompany: form.offerCompany || null,
      ctc: 0,
      email: form.email || `${form.name.toLowerCase().replace(/\s+/g, '.')}@college.edu`,
      skills: form.skills ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
      phone: '+91 9876543210'
    };

    await new Promise(r => setTimeout(r, 600));

    await onAddStudent(newStudent);
    
    // Reset form after submit
    setForm({
      rollNo: '',
      name: '',
      dept: 'CSE',
      cgpa: '',
      backlogs: '',
      email: '',
      skills: '',
      offerCompany: '',
    });
    
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 pb-4 px-4 bg-slate-900/40">
      <div className="w-full max-w-lg bg-white border border-slate-300 shadow-xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0 bg-slate-50">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {initialData ? 'Edit Student Record' : 'Add New Student'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {initialData ? 'Update the details for this student.' : 'Register a new student into the placement database.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 p-1.5 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          <form id="add-student-form" onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Register Number <span className="text-[#da1e28]">*</span></label>
                <Input
                  required
                  value={form.rollNo}
                  onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
                  className="font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Department <span className="text-[#da1e28]">*</span></label>
                <select
                  value={form.dept}
                  onChange={(e) => setForm({ ...form, dept: e.target.value })}
                  className="flex h-9 w-full border border-slate-300 bg-white px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:border-black focus-visible:ring-1 focus-visible:ring-black"
                >
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="AIDS">AIDS</option>
                  <option value="AGRI">AGRI</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Full Name <span className="text-[#da1e28]">*</span></label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">CGPA <span className="text-[#da1e28]">*</span></label>
                <Input
                  type="number"
                  step="0.01"
                  required
                  value={form.cgpa}
                  onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Active Backlogs <span className="text-[#da1e28]">*</span></label>
                <Input
                  type="number"
                  required
                  min="0"
                  value={form.backlogs}
                  onChange={(e) => setForm({ ...form, backlogs: e.target.value })}
                />
              </div>
            </div>

            {initialData && initialData.status === 'Placed' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Company Name <span className="text-[#da1e28]">*</span></label>
                <Input
                  required
                  value={form.offerCompany}
                  onChange={(e) => setForm({ ...form, offerCompany: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Email Address</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Technical Skills (comma separated)</label>
              <Input
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 shrink-0 flex justify-end gap-2 bg-slate-50">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button form="add-student-form" type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : initialData ? 'Update Record' : 'Save Record'}
          </Button>
        </div>

      </div>
    </div>
  );
}
