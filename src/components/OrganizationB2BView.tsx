import React, { useState } from 'react';
import {
  Building2,
  Users,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Plus,
  Search,
  Filter,
  Send,
  Download,
  ShieldCheck,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { OrgTeamMember, Course } from '../types';
import { DEMO_ORG_TEAM } from '../data/mockData';

interface OrganizationB2BViewProps {
  courses: Course[];
  onAssignCourse: (courseId: string, department: string) => void;
}

export const OrganizationB2BView: React.FC<OrganizationB2BViewProps> = ({
  courses,
  onAssignCourse,
}) => {
  const [teamMembers, setTeamMembers] = useState<OrgTeamMember[]>(DEMO_ORG_TEAM);
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignedCourseId, setAssignedCourseId] = useState(courses[0]?.id || '');
  const [targetDept, setTargetDept] = useState('All Departments');
  const [assignSuccessNotice, setAssignSuccessNotice] = useState(false);

  const departments = ['All', 'Cardiology', 'Intensive Coronary Care Unit', 'Fellowship Program', 'Pharmacy Services'];

  const filteredMembers = teamMembers.filter((m) => {
    if (selectedDept !== 'All' && m.department !== selectedDept) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalMembers = teamMembers.length;
  const compliantCount = teamMembers.filter((m) => m.status === 'Compliant').length;
  const avgCompliance = Math.round(
    teamMembers.reduce((acc, m) => acc + m.complianceRate, 0) / totalMembers
  );

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    onAssignCourse(assignedCourseId, targetDept);
    setShowAssignModal(false);
    setAssignSuccessNotice(true);
    setTimeout(() => setAssignSuccessNotice(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F4F9F9] pb-20 text-[#1A2B3B]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A192F] to-[#162C4E] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  Hospital & Healthcare System Enterprise
                </span>
                <span className="text-xs text-teal-100/70">Institutional Training Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Pacific Heart & Vascular Health System
              </h1>
              <p className="text-xs sm:text-sm text-teal-100/80">
                Centralized staff CME tracking, mandatory specialty curricula, and Joint Commission compliance audits.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowAssignModal(true)}
                className="px-4 py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Assign Mandatory Module</span>
              </button>
            </div>
          </div>

          {assignSuccessNotice && (
            <div className="p-3 bg-emerald-900/80 border border-emerald-400/40 rounded-xl text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Mandatory clinical module assigned to staff. Automated calendar invites and compliance deadlines dispatched.</span>
            </div>
          )}
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Department Compliance</span>
              <BarChart3 className="w-4 h-4 text-[#0E9384]" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {avgCompliance}%{' '}
              <span className="text-xs font-normal text-emerald-600">On Target</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#0E9384] h-full rounded-full" style={{ width: `${avgCompliance}%` }} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Active Clinicians</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {totalMembers}{' '}
              <span className="text-xs font-normal text-slate-500">Staff Enrolled</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Across 4 clinical divisions & fellowship
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Compliant Staff</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-700">
              {compliantCount} / {totalMembers}
            </div>
            <p className="text-[11px] text-slate-400">
              {Math.round((compliantCount / totalMembers) * 100)}% verified with state board
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Audit Status</span>
              <ShieldCheck className="w-4 h-4 text-[#0E9384]" />
            </div>
            <div className="text-sm font-bold text-teal-800 flex items-center gap-1.5 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Joint Commission Ready</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Real-time PARS data synchronized
            </p>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-2xl border border-teal-500/10 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-teal-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Staff Roster & CME License Compliance
              </h2>
              <p className="text-xs text-slate-500">
                Monitor individual physician, nurse practitioner, and pharmacist licensing progress.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-3 py-2 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs text-slate-700 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Divisions' : d}
                  </option>
                ))}
              </select>

              <div className="relative w-full sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search staff..."
                  className="w-full pl-9 pr-4 py-2 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F9F9] text-slate-600 font-bold border-b border-teal-500/10">
                <tr>
                  <th className="p-4">Clinician & Role</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">CME Credits Earned</th>
                  <th className="p-4">Annual Target</th>
                  <th className="p-4">Compliance</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-[#F4F9F9]/70 transition-colors">
                    <td className="p-4 font-semibold text-slate-900">
                      <div className="text-sm font-bold text-slate-900">{m.name}</div>
                      <div className="text-slate-500 text-[11px] font-normal">{m.role} • {m.email}</div>
                    </td>
                    <td className="p-4 text-slate-700 font-medium">{m.department}</td>
                    <td className="p-4 font-bold text-slate-800">{m.creditsEarned} CME</td>
                    <td className="p-4 text-slate-600">{m.targetCredits} CME</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 w-8">{m.complianceRate}%</span>
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              m.status === 'Compliant'
                                ? 'bg-emerald-500'
                                : m.status === 'At Risk'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${Math.min(100, m.complianceRate)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                          m.status === 'Compliant'
                            ? 'bg-emerald-100 text-emerald-800'
                            : m.status === 'At Risk'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-slate-500">{m.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/10 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-[#0A192F] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-sm">Assign Mandatory CME Module</h3>
              </div>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAssign} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Select Accredited Course
                </label>
                <select
                  value={assignedCourseId}
                  onChange={(e) => setAssignedCourseId(e.target.value)}
                  className="w-full p-2.5 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.credits} Credits • {c.specialty})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Target Department / Cohort
                </label>
                <select
                  value={targetDept}
                  onChange={(e) => setTargetDept(e.target.value)}
                  className="w-full p-2.5 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                >
                  <option value="All Departments">All Hospital Departments</option>
                  <option value="Cardiology">Cardiology Division</option>
                  <option value="Intensive Coronary Care Unit">ICCU & Critical Care</option>
                  <option value="Fellowship Program">Cardiology & Oncology Fellows</option>
                  <option value="Pharmacy Services">Clinical Pharmacy Team</option>
                </select>
              </div>

              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-900 leading-relaxed">
                Staff members will receive an email notification with a 30-day completion deadline. Completed certificates will automatically report to the hospital credentialing file.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Deploy Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
