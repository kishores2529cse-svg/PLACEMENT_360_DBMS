import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import StudentsView from './components/StudentsView';
import ReportsView from './components/ReportsView';
import DbmsConsole from './components/DbmsConsole';
import AboutView from './components/AboutView';
import AddStudentModal from './components/AddStudentModal';
import CompaniesView from './components/CompaniesView';
import DrivesView from './components/DrivesView';
import ApplicationsView from './components/ApplicationsView';
import { supabase } from './lib/supabase';
import { INITIAL_STUDENTS_PLACED, INITIAL_STUDENTS_NOT_PLACED, INITIAL_NON_PLACEMENT, INITIAL_DRIVES, INITIAL_APPLICATIONS } from './data/mockDatabase';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Core Datasets State mapped directly to Tables
  const [placedStudents, setPlacedStudents] = useState(INITIAL_STUDENTS_PLACED);
  const [notPlacedStudents, setNotPlacedStudents] = useState(INITIAL_STUDENTS_NOT_PLACED);
  const [nonPlacementStudents, setNonPlacementStudents] = useState(INITIAL_NON_PLACEMENT);

  const [drives, setDrives] = useState(INITIAL_DRIVES);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);

  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const openEditModal = (student) => {
    const currentStatus = allStudents.find(s => s.rollNo === student.rollNo)?.status || student.status;
    setEditingStudent({ ...student, status: currentStatus });
    setIsAddStudentOpen(true);
  };

  // Fetch data from Supabase and Subscribe to Realtime Updates
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: placedData, error: e1 } = await supabase.from('placed').select('*');
        const { data: notPlacedData, error: e2 } = await supabase.from('not_placed').select('*');
        const { data: nonPlacementData, error: e3 } = await supabase.from('non_placement').select('*');

        if (!e1 && placedData) {
          setPlacedStudents(placedData.map(d => ({
            sNo: d['S.No'],
            rollNo: d['Register No'],
            name: d['Student Name'],
            offerCompany: d['Company Name'],
            placementType: d['Career Path'],
            dept: d['Department']
          })));
        }
        if (!e2 && notPlacedData) {
          setNotPlacedStudents(notPlacedData.map(d => ({
            rollNo: d.regno,
            name: d.name,
            dept: d.dept,
            cgpa: d.cgpa,
            backlogs: d.backlogs
          })));
        }
        if (!e3 && nonPlacementData) {
          setNonPlacementStudents(nonPlacementData.map(d => ({
            rollNo: d.regno,
            name: d.name,
            dept: d.dept,
            cgpa: d.cgpa,
            purpose: d.purpose
          })));
        }
      } catch (err) {
        console.error("Supabase fetch failed, using fallback mock data.", err);
      }
    }
    
    // Only attempt fetch if key is provided (not placeholder)
    if (import.meta.env.VITE_SUPABASE_URL) {
      fetchData();

      // Realtime Subscriptions
      const channel = supabase.channel('schema-db-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'placed' }, payload => {
          fetchData(); // Simplest approach: refresh data on any change
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'not_placed' }, payload => {
          fetchData();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'non_placement' }, payload => {
          fetchData();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  // Combine for dashboard metrics and full list
  const allStudents = [
    ...placedStudents.map(s => ({ ...s, status: 'Placed' })),
    ...notPlacedStudents.map(s => ({ ...s, status: 'Not Placed' })),
    ...nonPlacementStudents.map(s => ({ ...s, status: 'Non-Placement' }))
  ];

  const handleAddStudent = async (newStudent) => {
    if (editingStudent) {
      const updateList = (list) => list.map(s => s.rollNo === editingStudent.rollNo ? { ...s, ...newStudent } : s);
      setPlacedStudents(updateList);
      setNotPlacedStudents(updateList);
      setNonPlacementStudents(updateList);

      if (import.meta.env.VITE_SUPABASE_URL) {
        try {
          await supabase.from('student_details').update({
            regno: newStudent.rollNo,
            name: newStudent.name,
            dept: newStudent.dept,
            cgpa: newStudent.cgpa,
            backlogs: newStudent.backlogs,
          }).eq('regno', editingStudent.rollNo);

          const currentStatus = allStudents.find(s => s.rollNo === editingStudent.rollNo)?.status;
          
          if (currentStatus === 'Placed') {
            await supabase.from('placed').update({
              "Register No": newStudent.rollNo,
              "Student Name": newStudent.name,
              "Department": newStudent.dept,
              "Company Name": newStudent.offerCompany
            }).eq('Register No', editingStudent.rollNo);
          } else if (currentStatus === 'Not Placed') {
            await supabase.from('not_placed').update({
              regno: newStudent.rollNo,
              name: newStudent.name,
              dept: newStudent.dept,
              cgpa: newStudent.cgpa,
              backlogs: newStudent.backlogs
            }).eq('regno', editingStudent.rollNo);
          } else if (currentStatus === 'Non-Placement') {
             await supabase.from('non_placement').update({
              regno: newStudent.rollNo,
              name: newStudent.name,
              dept: newStudent.dept,
              cgpa: newStudent.cgpa
            }).eq('regno', editingStudent.rollNo);
          }
        } catch (err) {
          console.error("Error updating Supabase:", err);
        }
      }
    } else {
      // Optimistic UI Update
      setNotPlacedStudents(prev => [newStudent, ...prev]);

    // Supabase DB Operations
    if (import.meta.env.VITE_SUPABASE_URL) {
      try {
        await supabase.from('student_details').insert({
          regno: newStudent.rollNo,
          name: newStudent.name,
          dept: newStudent.dept,
          cgpa: newStudent.cgpa,
          backlogs: newStudent.backlogs,
          status: 'Not Placed'
        });

        await supabase.from('not_placed').insert({
          regno: newStudent.rollNo,
          name: newStudent.name,
          dept: newStudent.dept,
          cgpa: newStudent.cgpa,
          backlogs: newStudent.backlogs
        });
      } catch (err) {
        console.error("Error inserting to Supabase:", err);
      }
    }
    }
  };

  const handleMoveToPlaced = async (student) => {
    // 1. Optimistic UI Update
    setNotPlacedStudents(prev => prev.filter(s => s.rollNo !== student.rollNo));
    setPlacedStudents(prev => [{
      ...student,
      offerCompany: 'TBD',
      ctc: 0,
      placementType: 'on-campus'
    }, ...prev]);

    // 2. Supabase DB Transactions
    if (import.meta.env.VITE_SUPABASE_URL) {
      try {
        await supabase.from('not_placed').delete().eq('regno', student.rollNo);
        
        await supabase.from('placed').insert({
          "Register No": student.rollNo,
          "Student Name": student.name,
          "Career Path": 'on-campus',
          "Department": student.dept,
          "Company Name": 'TBD'
        });

        await supabase.from('student_details').update({ status: 'Placed' }).eq('regno', student.rollNo);
      } catch (err) {
        console.error("Error updating Supabase tables:", err);
      }
    }
  };

  const handleMoveToNotPlaced = async (student) => {
    // 1. Optimistic UI Update
    setPlacedStudents(prev => prev.filter(s => s.rollNo !== student.rollNo));
    setNonPlacementStudents(prev => prev.filter(s => s.rollNo !== student.rollNo));
    setNotPlacedStudents(prev => [{
      ...student,
      offerCompany: undefined,
      ctc: undefined,
      placementType: undefined,
      purpose: undefined
    }, ...prev]);

    // 2. Supabase DB Transactions
    if (import.meta.env.VITE_SUPABASE_URL) {
      try {
        await supabase.from('placed').delete().eq('Register No', student.rollNo);
        await supabase.from('non_placement').delete().eq('regno', student.rollNo);
        
        await supabase.from('not_placed').insert({
          regno: student.rollNo,
          name: student.name,
          dept: student.dept || 'Unknown',
          cgpa: student.cgpa || 0,
          backlogs: student.backlogs || 0
        });

        await supabase.from('student_details').update({ status: 'Not Placed' }).eq('regno', student.rollNo);
      } catch (err) {
        console.error("Error updating Supabase tables:", err);
      }
    }
  };

  const handleMoveToNonPlacement = async (student) => {
    // 1. Optimistic UI Update
    setNotPlacedStudents(prev => prev.filter(s => s.rollNo !== student.rollNo));
    setNonPlacementStudents(prev => [{
      ...student,
      purpose: 'Higher Studies'
    }, ...prev]);

    // 2. Supabase DB Transactions
    if (import.meta.env.VITE_SUPABASE_URL) {
      try {
        await supabase.from('not_placed').delete().eq('regno', student.rollNo);
        
        await supabase.from('non_placement').insert({
          regno: student.rollNo,
          name: student.name,
          dept: student.dept || 'Unknown',
          cgpa: student.cgpa || 0,
          purpose: 'Higher Studies'
        });

        await supabase.from('student_details').update({ status: 'Non-Placement' }).eq('regno', student.rollNo);
      } catch (err) {
        console.error("Error updating Supabase tables:", err);
      }
    }
  };

  const pageTitles = {
    dashboard: 'Dashboard',
    students: 'All Students (Complete Details)',
    placed: 'Placed Students',
    not_placed: 'Not Placed Students',
    non_placement: 'Non-Placement (Opt-Outs)',
    about: 'About Placement 360',
    reports: 'Reports & Analytics',
    dbms: 'SQL Query Console',
    settings: 'Settings & Configurations',
  };

  return (
    <div className="min-h-screen flex font-sans bg-slate-50 text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          pageTitle={pageTitles[activeTab] || 'Dashboard'}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardView
              students={allStudents}
              onNavigateToStudents={() => setActiveTab('students')}
            />
          )}

          {activeTab === 'students' && (
            <StudentsView
              viewType="all"
              data={allStudents}
              onOpenAddStudentModal={() => { setEditingStudent(null); setIsAddStudentOpen(true); }}
              onEditStudent={openEditModal}
            />
          )}

          {activeTab === 'placements' && (
            <StudentsView
              viewType="placed"
              data={placedStudents}
              onMoveToNotPlaced={handleMoveToNotPlaced}
              onEditStudent={openEditModal}
            />
          )}

          {activeTab === 'not_placed' && (
            <StudentsView
              viewType="not_placed"
              data={notPlacedStudents}
              onMoveToPlaced={handleMoveToPlaced}
              onMoveToNonPlacement={handleMoveToNonPlacement}
              onEditStudent={openEditModal}
            />
          )}

          {activeTab === 'companies' && (
            <CompaniesView drives={drives} />
          )}

          {activeTab === 'drives' && (
            <DrivesView drives={drives} />
          )}

          {activeTab === 'applications' && (
            <ApplicationsView applications={applications} />
          )}

          {activeTab === 'about' && (
            <AboutView />
          )}

          {activeTab === 'reports' && (
            <ReportsView students={allStudents} drives={drives} />
          )}

          {activeTab === 'dbms' && (
            <DbmsConsole
              students={allStudents}
              drives={drives}
              applications={applications}
            />
          )}

          {activeTab === 'settings' && (
            <div className="bg-white p-6 border border-slate-200 max-w-2xl">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Placement Cell Settings</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Institution Name</label>
                  <input type="text" defaultValue="Placement Cell - DBMS Portal" className="w-full p-2 bg-slate-50 border border-slate-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black" />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Academic Batch Year</label>
                  <input type="text" defaultValue="2024 - 2025" className="w-full p-2 bg-slate-50 border border-slate-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-black" />
                </div>
                <button className="px-4 py-2 bg-black hover:bg-slate-800 text-white font-medium mt-2">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => { setIsAddStudentOpen(false); setEditingStudent(null); }}
        onAddStudent={handleAddStudent}
        initialData={editingStudent}
      />
    </div>
  );
}
