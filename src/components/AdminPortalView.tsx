import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  BookOpen,
  Building2,
  Award,
  BarChart3,
  Calendar,
  Settings,
  MessageSquare,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Archive,
  Download,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Clock,
  Key,
  ShieldCheck,
  Check,
  X,
  FileCheck2,
  Lock
} from 'lucide-react';
import {
  AdminUserRecord,
  AdminCourseRecord,
  AdminOrgRecord,
  AdminCertificateRecord,
  AdminCourseStatus,
  Specialty,
  Course
} from '../types';
import {
  DEMO_ADMIN_SYSTEM_STATS,
  DEMO_ADMIN_USERS,
  DEMO_ADMIN_COURSES,
  DEMO_ORGANIZATIONS_LIST as DEMO_ADMIN_ORGS,
  DEMO_ADMIN_CERTIFICATES,
} from '../data/mockData';

interface AdminPortalViewProps {
  onSwitchToClinician?: () => void;
  onSwitchToOrgPortal?: () => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  onSwitchToClinician,
  onSwitchToOrgPortal,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'users' | 'courses' | 'experts' | 'organizations' | 'events' | 'certificates' | 'community' | 'analytics' | 'settings'
  >('overview');

  // State for data tables
  const [usersList, setUsersList] = useState<AdminUserRecord[]>(DEMO_ADMIN_USERS);
  const [coursesList, setCoursesList] = useState<AdminCourseRecord[]>(DEMO_ADMIN_COURSES);
  const [orgsList, setOrgsList] = useState<AdminOrgRecord[]>(DEMO_ADMIN_ORGS);
  const [certsList, setCertsList] = useState<AdminCertificateRecord[]>(DEMO_ADMIN_CERTIFICATES);

  // Search & Filter state
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');

  const [courseSearch, setCourseSearch] = useState('');
  const [courseStatusFilter, setCourseStatusFilter] = useState('All');

  const [orgSearch, setOrgSearch] = useState('');
  const [orgTierFilter, setOrgTierFilter] = useState('All');

  const [certSearch, setCertSearch] = useState('');

  // Modals & Action Feedback
  const [selectedUserDetail, setSelectedUserDetail] = useState<AdminUserRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Course status changer
  const handleUpdateCourseStatus = (courseId: string, newStatus: AdminCourseStatus) => {
    setCoursesList(
      coursesList.map((c) => (c.id === courseId ? { ...c, status: newStatus } : c))
    );
    showToast(`Course status updated to "${newStatus}".`);
  };

  // User status changer
  const handleToggleUserStatus = (userId: string) => {
    setUsersList(
      usersList.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          showToast(`User ${u.name} is now ${nextStatus}.`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  // Filtered queries
  const filteredUsers = usersList.filter((u) => {
    if (userRoleFilter !== 'All' && u.role !== userRoleFilter) return false;
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.specialty.toLowerCase().includes(q) ||
        u.institution.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredCourses = coursesList.filter((c) => {
    if (courseStatusFilter !== 'All' && c.status !== courseStatusFilter) return false;
    if (courseSearch.trim()) {
      const q = courseSearch.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.specialty.toLowerCase().includes(q) ||
        c.authorName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredOrgs = orgsList.filter((o) => {
    if (orgTierFilter !== 'All' && o.tier !== orgTierFilter) return false;
    if (orgSearch.trim()) {
      const q = orgSearch.toLowerCase();
      return (
        o.name.toLowerCase().includes(q) ||
        o.primaryContact.toLowerCase().includes(q) ||
        o.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredCerts = certsList.filter((cert) => {
    if (certSearch.trim()) {
      const q = certSearch.toLowerCase();
      return (
        cert.recipientName.toLowerCase().includes(q) ||
        cert.courseTitle.toLowerCase().includes(q) ||
        cert.certificateHash.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F4F9F9] text-[#1A2B3B] flex flex-col font-sans">
      {/* Top Super Admin Header */}
      <header className="bg-[#06101E] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-black">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    Medvora Super Admin
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    Platform Control
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Global System Governance, Accreditation Compliance & User Registry
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {onSwitchToOrgPortal && (
                <button
                  onClick={onSwitchToOrgPortal}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-teal-300 border border-white/10 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Org Portal</span>
                </button>
              )}

              {onSwitchToClinician && (
                <button
                  onClick={onSwitchToClinician}
                  className="px-3.5 py-1.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <span>Clinician Portal ↗</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#06101E] text-white px-4 py-3 rounded-xl border border-purple-400/40 shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Admin Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col md:flex-row gap-6">
        {/* Admin Sidebar Navigation */}
        <aside className="w-full md:w-60 shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-teal-500/10 shadow-xs p-3 space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users, count: usersList.length },
              { id: 'courses', label: 'Courses', icon: BookOpen, count: coursesList.length },
              { id: 'organizations', label: 'Organizations', icon: Building2, count: orgsList.length },
              { id: 'certificates', label: 'Certificates', icon: Award, count: certsList.length },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeAdminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAdminTab(tab.id as any)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-[#F4F9F9]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>Compliance Status</span>
            </div>
            <p className="text-[11px] text-slate-500">
              ACCME PARS reporting synced 12m ago. 0 pending compliance flags.
            </p>
          </div>
        </aside>

        {/* Admin Content Pane */}
        <div className="flex-1 space-y-6 overflow-hidden">
          {/* ======================================================== */}
          {/* OVERVIEW TAB */}
          {/* ======================================================== */}
          {activeAdminTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Dashboard KPIs Required by User */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400">Total Professionals</span>
                  <div className="text-xl font-black text-slate-900">48,290</div>
                  <span className="text-[10px] text-emerald-600 font-bold">+24% YoY</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400">Active Users</span>
                  <div className="text-xl font-black text-purple-800">19,420</div>
                  <span className="text-[10px] text-purple-600 font-bold">40.2% MAU</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400">Published Courses</span>
                  <div className="text-xl font-black text-slate-900">312</div>
                  <span className="text-[10px] text-teal-600 font-bold">45 Specialties</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400">Certificates Issued</span>
                  <div className="text-xl font-black text-emerald-700">28,940</div>
                  <span className="text-[10px] text-emerald-600 font-bold">PARS Verified</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400">Organizations</span>
                  <div className="text-xl font-black text-slate-900">84</div>
                  <span className="text-[10px] text-slate-500 font-medium">B2B Partners</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400">Monthly Engagement</span>
                  <div className="text-xl font-black text-amber-600">1.42M m</div>
                  <span className="text-[10px] text-amber-600 font-bold">Deep learning</span>
                </div>
              </div>

              {/* Quick Activity Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Course Submissions */}
                <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Courses Under Review</h2>
                      <p className="text-xs text-slate-500">Curricula requiring editorial and CME committee approval</p>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                      1 Pending
                    </span>
                  </div>

                  <div className="space-y-3">
                    {coursesList
                      .filter((c) => c.status === 'Under Review')
                      .map((c) => (
                        <div
                          key={c.id}
                          className="p-4 bg-[#F4F9F9] rounded-xl border border-teal-500/10 flex items-center justify-between text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="font-bold text-slate-900">{c.title}</div>
                            <div className="text-slate-500 text-[11px]">
                              {c.specialty} • By {c.authorName} • {c.accreditedCredits} Credits
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateCourseStatus(c.id, 'Published')}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] cursor-pointer"
                            >
                              Approve & Publish
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* System Health */}
                <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                  <h2 className="text-sm font-bold text-slate-900">Accreditation & System Infrastructure</h2>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">ACCME PARS Live Webhook</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Operational (99.99%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">State Medical Board License Validation</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Connected (NPI Registry)
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-600">HIPAA Audit Logging</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Encrypted & Compliant
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* USERS MANAGEMENT TAB */}
          {/* ======================================================== */}
          {activeAdminTab === 'users' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    User Registry Management
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage healthcare professionals, faculty authors, institutional leads, and system admins.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    className="px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
                  >
                    <option value="All">All Roles</option>
                    <option value="Learner">Learner</option>
                    <option value="Faculty">Faculty</option>
                    <option value="OrgAdmin">OrgAdmin</option>
                    <option value="SuperAdmin">SuperAdmin</option>
                  </select>

                  <div className="relative w-full sm:w-56">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search clinicians..."
                      className="w-full pl-8 pr-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl border border-teal-500/10 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F9F9] text-slate-600 font-bold border-b border-teal-500/10">
                      <tr>
                        <th className="p-4">Name & Email</th>
                        <th className="p-4">Specialty</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Certs</th>
                        <th className="p-4">Joined</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-[#F4F9F9]/70 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-slate-900 text-sm">{u.name}</div>
                            <div className="text-slate-500 text-[11px]">
                              {u.email} • {u.institution}
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-slate-700">{u.specialty}</td>
                          <td className="p-4">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                u.role === 'SuperAdmin'
                                  ? 'bg-purple-100 text-purple-800'
                                  : u.role === 'Faculty'
                                  ? 'bg-teal-100 text-teal-800'
                                  : u.role === 'OrgAdmin'
                                  ? 'bg-sky-100 text-sky-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                u.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {u.status}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-900">{u.certificatesEarned}</td>
                          <td className="p-4 text-slate-500">{u.joinedDate}</td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleToggleUserStatus(u.id)}
                              className={`px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                                u.status === 'Active'
                                  ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              }`}
                            >
                              {u.status === 'Active' ? 'Suspend' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* COURSES MANAGEMENT TAB */}
          {/* ======================================================== */}
          {activeAdminTab === 'courses' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Courses & Curricula Oversight
                  </h2>
                  <p className="text-xs text-slate-500">
                    Review status (Draft, Under Review, Published, Archived), enrollments, and accredited ratings.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={courseStatusFilter}
                    onChange={(e) => setCourseStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Published">Published</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>

                  <div className="relative w-full sm:w-56">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                      placeholder="Search courses..."
                      className="w-full pl-8 pr-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Courses Table */}
              <div className="bg-white rounded-2xl border border-teal-500/10 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F9F9] text-slate-600 font-bold border-b border-teal-500/10">
                      <tr>
                        <th className="p-4">Title & Author</th>
                        <th className="p-4">Specialty</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Enrollments</th>
                        <th className="p-4">Rating</th>
                        <th className="p-4">Credits</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCourses.map((c) => (
                        <tr key={c.id} className="hover:bg-[#F4F9F9]/70 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-slate-900 text-sm max-w-sm">{c.title}</div>
                            <div className="text-slate-500 text-[11px]">By {c.authorName}</div>
                          </td>
                          <td className="p-4 font-semibold text-slate-700">{c.specialty}</td>
                          <td className="p-4">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                c.status === 'Published'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : c.status === 'Under Review'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : c.status === 'Draft'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-900">
                            {c.enrollmentsCount.toLocaleString()}
                          </td>
                          <td className="p-4 font-bold text-amber-600">★ {c.rating}</td>
                          <td className="p-4 font-bold text-teal-800">{c.accreditedCredits} CME</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {c.status === 'Under Review' && (
                                <button
                                  onClick={() => handleUpdateCourseStatus(c.id, 'Published')}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[10px] cursor-pointer"
                                >
                                  Publish
                                </button>
                              )}
                              {c.status === 'Published' && (
                                <button
                                  onClick={() => handleUpdateCourseStatus(c.id, 'Archived')}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-[10px] cursor-pointer"
                                >
                                  Archive
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ORGANIZATIONS TAB */}
          {/* ======================================================== */}
          {activeAdminTab === 'organizations' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    B2B Organizations Directory
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pharmaceutical partners, health systems, and medical societies on enterprise contracts.
                  </p>
                </div>

                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orgSearch}
                    onChange={(e) => setOrgSearch(e.target.value)}
                    placeholder="Search organization..."
                    className="w-full pl-8 pr-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Orgs Table */}
              <div className="bg-white rounded-2xl border border-teal-500/10 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F9F9] text-slate-600 font-bold border-b border-teal-500/10">
                      <tr>
                        <th className="p-4">Organization Name</th>
                        <th className="p-4">Contract Tier</th>
                        <th className="p-4">Programs</th>
                        <th className="p-4">HCPs Reached</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Renewal Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrgs.map((org) => (
                        <tr key={org.id} className="hover:bg-[#F4F9F9]/70 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-slate-900 text-sm">{org.name}</div>
                            <div className="text-slate-500 text-[11px]">
                              {org.type} • Contact: {org.primaryContact}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200">
                              {org.tier}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-900">{org.programsCount}</td>
                          <td className="p-4 font-bold text-teal-800">
                            {org.hcpReached.toLocaleString()}
                          </td>
                          <td className="p-4">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              {org.status}
                            </span>
                          </td>
                          <td className="p-4 text-right text-slate-500">{org.renewalDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CERTIFICATES TAB */}
          {/* ======================================================== */}
          {activeAdminTab === 'certificates' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    CME Certificate & Credit Registry
                  </h2>
                  <p className="text-xs text-slate-500">
                    ACCME PARS verified cryptographic completion records.
                  </p>
                </div>

                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    placeholder="Search by learner, hash..."
                    className="w-full pl-8 pr-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Certs Table */}
              <div className="bg-white rounded-2xl border border-teal-500/10 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F9F9] text-slate-600 font-bold border-b border-teal-500/10">
                      <tr>
                        <th className="p-4">Recipient Clinician</th>
                        <th className="p-4">Accredited Course</th>
                        <th className="p-4">Credits</th>
                        <th className="p-4">Accreditor</th>
                        <th className="p-4">Issued Date</th>
                        <th className="p-4 text-right">Verification Hash</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCerts.map((cert) => (
                        <tr key={cert.id} className="hover:bg-[#F4F9F9]/70 transition-colors">
                          <td className="p-4 font-bold text-slate-900 text-sm">
                            {cert.recipientName}
                          </td>
                          <td className="p-4 font-semibold text-slate-800 max-w-xs truncate">
                            {cert.courseTitle}
                          </td>
                          <td className="p-4 font-bold text-teal-800">{cert.creditsEarned} CME</td>
                          <td className="p-4 text-slate-600 font-medium">{cert.accreditationBody}</td>
                          <td className="p-4 text-slate-500">{cert.issuedDate}</td>
                          <td className="p-4 text-right font-mono text-[10px] text-slate-500">
                            {cert.certificateHash}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ANALYTICS TAB */}
          {/* ======================================================== */}
          {activeAdminTab === 'analytics' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                <h2 className="text-base font-bold text-slate-900">Platform-Wide Engagement Analytics</h2>
                <p className="text-xs text-slate-500">System growth, credential issuance rates, and active learning sessions.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-[#F4F9F9] rounded-xl border border-teal-500/10 space-y-1">
                    <span className="text-slate-500 text-xs font-semibold">Monthly Learning Hours</span>
                    <div className="text-2xl font-black text-slate-900">23,660 hrs</div>
                    <span className="text-[10px] text-emerald-600 font-bold">+16.8% this month</span>
                  </div>

                  <div className="p-4 bg-[#F4F9F9] rounded-xl border border-teal-500/10 space-y-1">
                    <span className="text-slate-500 text-xs font-semibold">Average Course Rating</span>
                    <div className="text-2xl font-black text-amber-600">4.89 / 5.0</div>
                    <span className="text-[10px] text-slate-500">From 14,200 peer reviews</span>
                  </div>

                  <div className="p-4 bg-[#F4F9F9] rounded-xl border border-teal-500/10 space-y-1">
                    <span className="text-slate-500 text-xs font-semibold">Verification Uptime</span>
                    <div className="text-2xl font-black text-emerald-600">99.98%</div>
                    <span className="text-[10px] text-emerald-600 font-bold">ACCME Webhooks</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SETTINGS TAB */}
          {/* ======================================================== */}
          {activeAdminTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                <h2 className="text-base font-bold text-slate-900">Super Admin Configuration</h2>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-[#F4F9F9] rounded-xl border border-teal-500/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Global ACCME Joint-Providership Sync</div>
                      <p className="text-slate-500 text-[11px]">Automatic PARS credit transmission to state boards</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      Enabled
                    </span>
                  </div>
                  <div className="p-3.5 bg-[#F4F9F9] rounded-xl border border-teal-500/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Platform-Wide Two-Factor Enforcement</div>
                      <p className="text-slate-500 text-[11px]">Required for all faculty and administrative roles</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      Enforced
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
