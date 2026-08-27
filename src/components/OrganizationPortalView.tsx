import React, { useState } from 'react';
import {
  Building2,
  Users,
  Award,
  BarChart3,
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
  BookOpen,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Globe2,
  Eye,
  FileText,
  Video,
  Check,
  Edit,
  Trash2,
  Archive,
  Share2,
  MoreVertical,
  X,
  Upload,
  Settings,
  Lock,
  Mail,
  UserCheck,
  Key,
  ChevronRight,
  Sliders,
  ChevronDown
} from 'lucide-react';
import {
  OrgLearningProgram,
  OrgContentItem,
  AudienceMember,
  OrgTeamMemberRole,
  OrganizationProfile,
  ProgramStatus,
  OrgContentType,
  OrgUserRole,
  Specialty,
  Course
} from '../types';
import {
  DEMO_ORGANIZATION_PROFILE,
  DEMO_ORG_PROGRAMS,
  DEMO_ORG_CONTENT_ITEMS,
  DEMO_AUDIENCE_MEMBERS,
  DEMO_ORG_TEAM_MEMBERS,
  DEMO_ENTERPRISE_ANALYTICS,
} from '../data/mockData';

interface OrganizationPortalViewProps {
  courses: Course[];
  onSelectCourse?: (course: Course) => void;
  onSwitchToClinician?: () => void;
  onSwitchToSuperAdmin?: () => void;
  onOpenB2BLanding?: () => void;
}

export const OrganizationPortalView: React.FC<OrganizationPortalViewProps> = ({
  courses,
  onSelectCourse,
  onSwitchToClinician,
  onSwitchToSuperAdmin,
  onOpenB2BLanding,
}) => {
  // Navigation tabs for the Organization sidebar
  const [activeOrgTab, setActiveOrgTab] = useState<
    'overview' | 'programs' | 'content' | 'audience' | 'analytics' | 'events' | 'settings'
  >('overview');

  // Organization Data State
  const [orgProfile, setOrgProfile] = useState<OrganizationProfile>(DEMO_ORGANIZATION_PROFILE);
  const [programs, setPrograms] = useState<OrgLearningProgram[]>(DEMO_ORG_PROGRAMS);
  const [contentList, setContentList] = useState<OrgContentItem[]>(DEMO_ORG_CONTENT_ITEMS);
  const [audienceList, setAudienceList] = useState<AudienceMember[]>(DEMO_AUDIENCE_MEMBERS);
  const [teamMembers, setTeamMembers] = useState<OrgTeamMemberRole[]>(DEMO_ORG_TEAM_MEMBERS);

  // Modals State
  const [createProgramOpen, setCreateProgramOpen] = useState(false);
  const [addContentOpen, setAddContentOpen] = useState(false);
  const [inviteMemberOpen, setInviteMemberOpen] = useState(false);
  const [selectedProgramDetail, setSelectedProgramDetail] = useState<OrgLearningProgram | null>(null);
  const [previewContentItem, setPreviewContentItem] = useState<OrgContentItem | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // ----------------------------------------
  // Filter States for Audience
  // ----------------------------------------
  const [audienceSearch, setAudienceSearch] = useState('');
  const [audienceSpecialtyFilter, setAudienceSpecialtyFilter] = useState('All');
  const [audienceCountryFilter, setAudienceCountryFilter] = useState('All');
  const [audienceProgramFilter, setAudienceProgramFilter] = useState('All');
  const [audienceStatusFilter, setAudienceStatusFilter] = useState('All');

  // Filter States for Content
  const [contentSearch, setContentSearch] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState('All');
  const [contentStatusFilter, setContentStatusFilter] = useState('All');

  // Filter States for Programs
  const [programStatusFilter, setProgramStatusFilter] = useState<string>('All');
  const [programSearch, setProgramSearch] = useState('');

  // Analytics Filters
  const [analyticsDateRange, setAnalyticsDateRange] = useState('Last 6 Months');
  const [analyticsSpecialty, setAnalyticsSpecialty] = useState('All Specialties');
  const [analyticsCountry, setAnalyticsCountry] = useState('Global');
  const [analyticsProgram, setAnalyticsProgram] = useState('All Programs');

  // ----------------------------------------
  // Handlers for Program Creation
  // ----------------------------------------
  const [newProgramData, setNewProgramData] = useState({
    title: '',
    description: '',
    targetSpecialty: 'Cardiology' as Specialty,
    audienceType: 'Cardiologists, Heart Failure Specialists, Clinical Pharmacists',
    startDate: 'Sep 01, 2026',
    endDate: 'Dec 31, 2026',
    coursesCount: 3,
    sponsoredBy: orgProfile.name,
    accreditedCredits: 3.0,
  });

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    const newProg: OrgLearningProgram = {
      id: `prog-${Date.now()}`,
      title: newProgramData.title || 'New Clinical Curriculum 2026',
      description: newProgramData.description || 'Targeted educational series for healthcare specialists.',
      targetSpecialty: newProgramData.targetSpecialty,
      audienceCount: 1500,
      enrolledCount: 0,
      completedCount: 0,
      completionRate: 0,
      avgEngagementMinutes: 0,
      status: 'Draft',
      coursesCount: newProgramData.coursesCount,
      courseIds: ['cme-cardio-101'],
      courseNames: ['Foundational Specialty Module'],
      audienceType: newProgramData.audienceType,
      startDate: newProgramData.startDate,
      endDate: newProgramData.endDate,
      sponsoredBy: newProgramData.sponsoredBy,
      accreditedCredits: newProgramData.accreditedCredits,
    };
    setPrograms([newProg, ...programs]);
    setCreateProgramOpen(false);
    showToast(`Learning program "${newProg.title}" created in Draft status.`);
  };

  // Handlers for Content Management
  const [newContentData, setNewContentData] = useState({
    title: '',
    type: 'Course' as 'Course' | 'Video' | 'Article' | 'Assessment' | 'Event',
    specialty: 'Cardiology' as Specialty,
    durationOrCredits: '30 mins • 1.0 CME',
    authorOrFaculty: 'Medvora Clinical Faculty',
  });

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault();
    const item: OrgContentItem = {
      id: `cnt-${Date.now()}`,
      title: newContentData.title || 'Untitled Learning Asset',
      type: newContentData.type,
      specialty: newContentData.specialty,
      status: 'Draft',
      views: 0,
      completionRate: 0,
      durationOrCredits: newContentData.durationOrCredits,
      updatedAt: 'Just now',
      authorOrFaculty: newContentData.authorOrFaculty,
    };
    setContentList([item, ...contentList]);
    setAddContentOpen(false);
    showToast(`Content item "${item.title}" saved to library.`);
  };

  const handleToggleContentPublish = (id: string) => {
    setContentList(
      contentList.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'Published' ? 'Draft' : 'Published';
          showToast(`"${c.title}" is now ${nextStatus}.`);
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleArchiveContent = (id: string) => {
    setContentList(
      contentList.map((c) => (c.id === id ? { ...c, status: 'Archived' } : c))
    );
    showToast('Content moved to archive.');
  };

  // Handlers for Team Invites
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<OrgUserRole>('Editor');

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: OrgTeamMemberRole = {
      id: `team-${Date.now()}`,
      name: newMemberName || 'New Team Member',
      email: newMemberEmail,
      role: newMemberRole,
      department: 'Medical Affairs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      status: 'Invited',
      lastLogin: 'Pending Confirmation',
    };
    setTeamMembers([...teamMembers, newMember]);
    setInviteMemberOpen(false);
    setNewMemberEmail('');
    setNewMemberName('');
    showToast(`Invitation sent to ${newMember.email} with ${newMember.role} permissions.`);
  };

  // Filtered Programs
  const filteredPrograms = programs.filter((p) => {
    if (programStatusFilter !== 'All' && p.status !== programStatusFilter) return false;
    if (programSearch.trim()) {
      const q = programSearch.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.targetSpecialty.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Content
  const filteredContent = contentList.filter((item) => {
    if (contentTypeFilter !== 'All' && item.type !== contentTypeFilter) return false;
    if (contentStatusFilter !== 'All' && item.status !== contentStatusFilter) return false;
    if (contentSearch.trim()) {
      const q = contentSearch.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.authorOrFaculty.toLowerCase().includes(q) ||
        item.specialty.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Audience
  const filteredAudience = audienceList.filter((aud) => {
    if (audienceSpecialtyFilter !== 'All' && aud.specialty !== audienceSpecialtyFilter) return false;
    if (audienceCountryFilter !== 'All' && aud.country !== audienceCountryFilter) return false;
    if (audienceProgramFilter !== 'All' && !aud.program.includes(audienceProgramFilter)) return false;
    if (audienceStatusFilter !== 'All' && aud.status !== audienceStatusFilter) return false;
    if (audienceSearch.trim()) {
      const q = audienceSearch.toLowerCase();
      return (
        aud.name.toLowerCase().includes(q) ||
        aud.email.toLowerCase().includes(q) ||
        aud.institution.toLowerCase().includes(q) ||
        aud.role.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Unique lists for filters
  const uniqueCountries = ['All', ...Array.from(new Set(audienceList.map((a) => a.country)))];
  const uniqueSpecialties = ['All', 'Cardiology', 'Oncology', 'Neurology', 'Critical Care', 'Endocrinology', 'Emergency Medicine', 'Pediatrics'];

  return (
    <div className="min-h-screen bg-[#F4F9F9] text-[#1A2B3B] flex flex-col font-sans">
      {/* Organization Header Bar */}
      <header className="bg-[#0A192F] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Org Brand Identity */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-black text-sm shadow-inner">
                {orgProfile.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {orgProfile.name}
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/40 hidden sm:inline-block">
                    {orgProfile.contractTier}
                  </span>
                </div>
                <p className="text-[11px] text-teal-100/70 hidden sm:block">
                  Enterprise Healthcare Learning & Medical Affairs Portal
                </p>
              </div>
            </div>

            {/* Portal Switcher & Action buttons */}
            <div className="flex items-center gap-3">
              {onOpenB2BLanding && (
                <button
                  onClick={onOpenB2BLanding}
                  className="hidden md:flex text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  B2B Landing Page ↗
                </button>
              )}

              {onSwitchToClinician && (
                <button
                  onClick={onSwitchToClinician}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-teal-200 border border-white/15 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Clinician View</span>
                </button>
              )}

              <button
                onClick={() => setCreateProgramOpen(true)}
                className="px-3.5 py-1.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Create Program</span>
                <span className="sm:hidden">Program</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Toast */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#0A192F] text-white px-4 py-3 rounded-xl border border-teal-400/40 shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="text-xs font-medium">{successToast}</span>
        </div>
      )}

      {/* Main Layout with Sidebar and Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-60 shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-teal-500/10 shadow-xs p-3 space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3, badge: undefined },
              { id: 'programs', label: 'Programs', icon: Layers, badge: `${programs.length}` },
              { id: 'content', label: 'Content', icon: BookOpen, badge: `${contentList.length}` },
              { id: 'audience', label: 'Audience', icon: Users, badge: '12.4k' },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp, badge: 'Live' },
              { id: 'events', label: 'Events', icon: Calendar, badge: '1 Live' },
              { id: 'settings', label: 'Settings', icon: Settings, badge: undefined },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeOrgTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveOrgTab(tab.id as any)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0E9384] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-[#F4F9F9]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-teal-50 text-teal-700 border border-teal-100'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Plan Quota Card */}
          <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Seat Capacity</span>
              <span className="text-[11px] text-teal-700 font-bold">
                {orgProfile.seatsOccupied.toLocaleString()} / {orgProfile.seatLimit.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#0E9384] h-full rounded-full"
                style={{
                  width: `${Math.round((orgProfile.seatsOccupied / orgProfile.seatLimit) * 100)}%`,
                }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              83% allocated. Contract renewal date: {orgProfile.renewalDate}.
            </p>
          </div>
        </aside>

        {/* Main Content Pane */}
        <div className="flex-1 space-y-6 overflow-hidden">
          {/* ======================================================== */}
          {/* 1. OVERVIEW TAB */}
          {/* ======================================================== */}
          {activeOrgTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Dashboard KPIs Required by User */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* KPI 1 */}
                <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Professionals Reached</span>
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#0E9384]">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    12,480
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18.4% vs last quarter</span>
                  </div>
                </div>

                {/* KPI 2 */}
                <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Course Enrollments</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <BookOpen className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    8,920
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-indigo-600 font-semibold">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Across 6 active programs</span>
                  </div>
                </div>

                {/* KPI 3 */}
                <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Completion Rate</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    78.4%
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                    <span>+9.2% above CME benchmark</span>
                  </div>
                </div>

                {/* KPI 4 */}
                <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Average Engagement</span>
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    24m
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
                    <span>Per active learning session</span>
                  </div>
                </div>
              </div>

              {/* Charts Row 1: Enrollment Trend & Course Completion */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Enrollment Trend Chart */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Enrollment & Completion Trend</h2>
                      <p className="text-xs text-slate-500">Monthly learner volume and credential certifications</p>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200/60">
                      2026 Trajectory
                    </span>
                  </div>

                  {/* Visual Bar Chart */}
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-44 border-b border-slate-100 pb-2">
                      {DEMO_ENTERPRISE_ANALYTICS.monthlyEnrollmentTrend.map((m) => (
                        <div key={m.month} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                          <div className="w-full flex items-end justify-center gap-1 h-36">
                            {/* Enrollments Bar */}
                            <div
                              className="w-4 sm:w-6 bg-[#0E9384] rounded-t-md transition-all group-hover:bg-[#0b7a6d]"
                              style={{ height: `${(m.enrollments / 2500) * 100}%` }}
                              title={`Enrollments: ${m.enrollments}`}
                            />
                            {/* Completions Bar */}
                            <div
                              className="w-4 sm:w-6 bg-sky-400 rounded-t-md transition-all group-hover:bg-sky-500"
                              style={{ height: `${(m.completions / 2500) * 100}%` }}
                              title={`Completions: ${m.completions}`}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-slate-500">{m.month}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-6 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-xs bg-[#0E9384]" />
                        <span>Course Enrollments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-xs bg-sky-400" />
                        <span>Accredited Completions</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Completion & Engagement by Specialty */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-5">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Engagement by Specialty</h2>
                    <p className="text-xs text-slate-500">Learner distribution across clinical divisions</p>
                  </div>

                  <div className="space-y-3.5">
                    {DEMO_ENTERPRISE_ANALYTICS.specialtyDistribution.map((spec) => (
                      <div key={spec.specialty} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-700">{spec.specialty}</span>
                          <span className="text-slate-900 font-bold">
                            {spec.count.toLocaleString()} HCPs ({spec.percent}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${spec.percent}%`,
                              backgroundColor: spec.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-100 text-[11px] text-teal-900 flex items-center justify-between">
                    <span className="font-semibold">Top Performing Cohort</span>
                    <span className="font-bold">Cardiology (81.2% completion)</span>
                  </div>
                </div>
              </div>

              {/* Charts Row 2: Geographic Distribution & Content Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Geographic Distribution */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Geographic Distribution</h2>
                      <p className="text-xs text-slate-500">Global reach across healthcare markets</p>
                    </div>
                    <Globe2 className="w-4 h-4 text-slate-400" />
                  </div>

                  <div className="space-y-3">
                    {DEMO_ENTERPRISE_ANALYTICS.geographicReach.map((geo) => (
                      <div key={geo.country} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded-sm text-[10px]">
                            {geo.code}
                          </span>
                          <span className="font-semibold text-slate-700">{geo.country}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-slate-900">{geo.count.toLocaleString()}</span>
                          <span className="text-slate-400 text-[11px] ml-1.5">({geo.percent}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Performance Table */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Top Performing Educational Content</h2>
                      <p className="text-xs text-slate-500">Highest rated and most completed clinical curricula</p>
                    </div>
                    <button
                      onClick={() => setActiveOrgTab('content')}
                      className="text-xs font-bold text-[#0E9384] hover:underline cursor-pointer"
                    >
                      View All ↗
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F4F9F9] text-slate-600 font-bold border-b border-slate-100">
                        <tr>
                          <th className="p-3">Curriculum Title</th>
                          <th className="p-3">Views</th>
                          <th className="p-3">Completion</th>
                          <th className="p-3">Avg Time</th>
                          <th className="p-3 text-right">Rating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {DEMO_ENTERPRISE_ANALYTICS.contentPerformanceRanking.map((cnt) => (
                          <tr key={cnt.title} className="hover:bg-[#F4F9F9]/60">
                            <td className="p-3 font-semibold text-slate-900 max-w-xs truncate">
                              {cnt.title}
                            </td>
                            <td className="p-3 text-slate-600 font-medium">{cnt.views.toLocaleString()}</td>
                            <td className="p-3">
                              <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                                {cnt.completionRate}
                              </span>
                            </td>
                            <td className="p-3 text-slate-600">{cnt.avgTime}</td>
                            <td className="p-3 text-right font-bold text-amber-600">
                              ★ {cnt.rating}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. PROGRAMS TAB */}
          {/* ======================================================== */}
          {activeOrgTab === 'programs' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Learning Program Management
                  </h2>
                  <p className="text-xs text-slate-500">
                    Structured CME curricula, accredited fellowship tracks, and corporate medical education.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Status filter */}
                  <select
                    value={programStatusFilter}
                    onChange={(e) => setProgramStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>

                  <div className="relative w-full sm:w-56">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={programSearch}
                      onChange={(e) => setProgramSearch(e.target.value)}
                      placeholder="Search programs..."
                      className="w-full pl-8 pr-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
                    />
                  </div>

                  <button
                    onClick={() => setCreateProgramOpen(true)}
                    className="px-4 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Program</span>
                  </button>
                </div>
              </div>

              {/* Program Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                              {program.targetSpecialty}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                program.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : program.status === 'Draft'
                                  ? 'bg-amber-100 text-amber-800'
                                  : program.status === 'Completed'
                                  ? 'bg-sky-100 text-sky-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {program.status}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 leading-snug">
                            {program.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {program.description}
                      </p>

                      <div className="p-3 bg-[#F4F9F9] rounded-xl border border-teal-500/10 text-xs space-y-2">
                        <div className="text-[11px] text-slate-500 font-semibold">
                          Target Audience: <span className="text-slate-800">{program.audienceType}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">Timeline:</span>
                          <span className="font-semibold text-slate-700">
                            {program.startDate} – {program.endDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Program Stats Row */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 block font-medium">Courses</span>
                          <span className="text-sm font-black text-slate-800">{program.coursesCount}</span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 block font-medium">Enrollment</span>
                          <span className="text-sm font-black text-teal-700">
                            {program.enrolledCount.toLocaleString()}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 block font-medium">Completion</span>
                          <span className="text-sm font-black text-emerald-700">
                            {program.completionRate}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-bold text-slate-500">
                          {program.accreditedCredits ? `${program.accreditedCredits} CME Credits` : 'Non-accredited'}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedProgramDetail(program)}
                            className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          >
                            Program Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. CONTENT MANAGEMENT TAB */}
          {/* ======================================================== */}
          {activeOrgTab === 'content' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Content Management Hub
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage Courses, Surgical Videos, Practice Articles, Assessments, and Live Symposia.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Type filter */}
                  <select
                    value={contentTypeFilter}
                    onChange={(e) => setContentTypeFilter(e.target.value)}
                    className="px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
                  >
                    <option value="All">All Content Types</option>
                    <option value="Course">Courses</option>
                    <option value="Video">Videos</option>
                    <option value="Article">Articles</option>
                    <option value="Assessment">Assessments</option>
                    <option value="Event">Events</option>
                  </select>

                  {/* Status filter */}
                  <select
                    value={contentStatusFilter}
                    onChange={(e) => setContentStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Published">Published</option>
                    <option value="In Review">In Review</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>

                  <div className="relative w-full sm:w-52">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={contentSearch}
                      onChange={(e) => setContentSearch(e.target.value)}
                      placeholder="Search title, faculty..."
                      className="w-full pl-8 pr-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
                    />
                  </div>

                  <button
                    onClick={() => setAddContentOpen(true)}
                    className="px-4 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Content</span>
                  </button>
                </div>
              </div>

              {/* Content Table Required by User */}
              <div className="bg-white rounded-2xl border border-teal-500/10 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F9F9] text-slate-600 font-bold border-b border-teal-500/10">
                      <tr>
                        <th className="p-4">Title & Faculty</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Specialty</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Views</th>
                        <th className="p-4">Completion</th>
                        <th className="p-4">Updated</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredContent.map((item) => (
                        <tr key={item.id} className="hover:bg-[#F4F9F9]/70 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-slate-900 text-sm max-w-sm">
                              {item.title}
                            </div>
                            <div className="text-slate-500 text-[11px] font-medium">
                              {item.authorOrFaculty} • {item.durationOrCredits}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 rounded-md font-bold text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                              {item.type}
                            </span>
                          </td>
                          <td className="p-4 font-semibold text-slate-700">{item.specialty}</td>
                          <td className="p-4">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                item.status === 'Published'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : item.status === 'In Review'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : item.status === 'Draft'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-800">
                            {item.views.toLocaleString()}
                          </td>
                          <td className="p-4 font-semibold text-teal-800">
                            {item.completionRate > 0 ? `${item.completionRate}%` : '—'}
                          </td>
                          <td className="p-4 text-slate-500">{item.updatedAt}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setPreviewContentItem(item)}
                                title="Preview Content"
                                className="p-1.5 hover:bg-teal-50 text-slate-600 hover:text-teal-700 rounded-lg cursor-pointer transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleToggleContentPublish(item.id)}
                                title={item.status === 'Published' ? 'Unpublish' : 'Publish'}
                                className="p-1.5 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 rounded-lg cursor-pointer transition-colors"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleArchiveContent(item.id)}
                                title="Archive Content"
                                className="p-1.5 hover:bg-rose-50 text-slate-600 hover:text-rose-700 rounded-lg cursor-pointer transition-colors"
                              >
                                <Archive className="w-4 h-4" />
                              </button>
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
          {/* 4. AUDIENCE MANAGEMENT TAB */}
          {/* ======================================================== */}
          {activeOrgTab === 'audience' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Healthcare Audience Management
                  </h2>
                  <p className="text-xs text-slate-500">
                    Monitor clinician license verification, program enrollment, and learning engagement.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      showToast('Exporting audience roster CSV...');
                    }}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Audience Multi-Filters Row */}
              <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                {/* Search */}
                <div className="md:col-span-2 relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={audienceSearch}
                    onChange={(e) => setAudienceSearch(e.target.value)}
                    placeholder="Search by physician name, role, hospital..."
                    className="w-full pl-8 pr-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden"
                  />
                </div>

                {/* Specialty Filter */}
                <div>
                  <select
                    value={audienceSpecialtyFilter}
                    onChange={(e) => setAudienceSpecialtyFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-700 font-semibold focus:outline-hidden"
                  >
                    {uniqueSpecialties.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec === 'All' ? 'All Specialties' : spec}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Country Filter */}
                <div>
                  <select
                    value={audienceCountryFilter}
                    onChange={(e) => setAudienceCountryFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-700 font-semibold focus:outline-hidden"
                  >
                    {uniqueCountries.map((c) => (
                      <option key={c} value={c}>
                        {c === 'All' ? 'All Countries' : c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={audienceStatusFilter}
                    onChange={(e) => setAudienceStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-700 font-semibold focus:outline-hidden"
                  >
                    <option value="All">All Activities</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Enrolled">Enrolled</option>
                  </select>
                </div>
              </div>

              {/* Audience Table Required by User */}
              <div className="bg-white rounded-2xl border border-teal-500/10 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F9F9] text-slate-600 font-bold border-b border-teal-500/10">
                      <tr>
                        <th className="p-4">Name & Institution</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Specialty</th>
                        <th className="p-4">Country</th>
                        <th className="p-4">Enrolled Program</th>
                        <th className="p-4">Engagement</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Last Active</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAudience.map((aud) => (
                        <tr key={aud.id} className="hover:bg-[#F4F9F9]/70 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={aud.avatar}
                                alt={aud.name}
                                className="w-7 h-7 rounded-full object-cover border border-slate-200"
                              />
                              <div>
                                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                  <span>{aud.name}</span>
                                  {aud.verifiedLicense && (
                                    <span title="Verified State Medical Board License">
                                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-500 text-[11px]">
                                  {aud.institution} • {aud.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-slate-700 font-medium">{aud.role}</td>
                          <td className="p-4 font-semibold text-slate-800">{aud.specialty}</td>
                          <td className="p-4 text-slate-600">{aud.country}</td>
                          <td className="p-4 font-semibold text-teal-900 max-w-xs truncate">
                            {aud.program}
                          </td>
                          <td className="p-4 font-bold text-slate-900">
                            {aud.engagementMinutes} mins
                          </td>
                          <td className="p-4">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                aud.status === 'Completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : aud.status === 'Active'
                                  ? 'bg-sky-100 text-sky-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {aud.status}
                            </span>
                          </td>
                          <td className="p-4 text-right text-slate-500">{aud.lastActive}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 5. ADVANCED ANALYTICS TAB */}
          {/* ======================================================== */}
          {activeOrgTab === 'analytics' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Analytics Top Filter Bar Required by User */}
              <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Advanced Enterprise Learning Analytics
                    </h2>
                    <p className="text-xs text-slate-500">
                      Multi-dimensional metrics across reach, completion velocity, and learning retention.
                    </p>
                  </div>

                  <button
                    onClick={() => showToast('Generating Comprehensive ACCME Compliance Report PDF...')}
                    className="px-3.5 py-1.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs self-start"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>

                {/* Filters Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Date Range</label>
                    <select
                      value={analyticsDateRange}
                      onChange={(e) => setAnalyticsDateRange(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl font-semibold text-slate-800 focus:outline-hidden"
                    >
                      <option value="Last 30 Days">Last 30 Days</option>
                      <option value="Last 6 Months">Last 6 Months</option>
                      <option value="Year to Date 2026">Year to Date 2026</option>
                      <option value="Lifetime Contract">Lifetime Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Specialty</label>
                    <select
                      value={analyticsSpecialty}
                      onChange={(e) => setAnalyticsSpecialty(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl font-semibold text-slate-800 focus:outline-hidden"
                    >
                      <option value="All Specialties">All Specialties</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Endocrinology">Endocrinology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Country</label>
                    <select
                      value={analyticsCountry}
                      onChange={(e) => setAnalyticsCountry(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl font-semibold text-slate-800 focus:outline-hidden"
                    >
                      <option value="Global">Global All Markets</option>
                      <option value="United States">United States</option>
                      <option value="Germany">Germany</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Program Cohort</label>
                    <select
                      value={analyticsProgram}
                      onChange={(e) => setAnalyticsProgram(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl font-semibold text-slate-800 focus:outline-hidden"
                    >
                      <option value="All Programs">All Active Programs</option>
                      <option value="Heart Failure GDMT">Heart Failure GDMT</option>
                      <option value="Immuno-Oncology Lab">Immuno-Oncology Lab</option>
                      <option value="Stroke Revascularization">Stroke Revascularization</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 5 Core Metrics Required by User */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500">Reach</span>
                  <div className="text-2xl font-black text-slate-900">12,480</div>
                  <span className="text-[10px] text-emerald-600 font-bold">+18.4% YoY</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500">Enrollments</span>
                  <div className="text-2xl font-black text-slate-900">8,920</div>
                  <span className="text-[10px] text-indigo-600 font-bold">71.4% capture rate</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500">Completion</span>
                  <div className="text-2xl font-black text-teal-700">78.4%</div>
                  <span className="text-[10px] text-teal-600 font-bold">6,993 Certs</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500">Engagement Depth</span>
                  <div className="text-2xl font-black text-slate-900">92.6%</div>
                  <span className="text-[10px] text-emerald-600 font-bold">Video retention</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-semibold text-slate-500">Avg Learning Time</span>
                  <div className="text-2xl font-black text-amber-600">24.2 min</div>
                  <span className="text-[10px] text-slate-500 font-medium">Per clinician</span>
                </div>
              </div>

              {/* Analytics Deep Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart 1: Enrollment over time & Engagement trend */}
                <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Enrollment Over Time</h3>
                      <p className="text-xs text-slate-500">Cumulative verified practitioner acquisitions</p>
                    </div>
                    <span className="text-xs font-bold text-[#0E9384] bg-teal-50 px-2.5 py-1 rounded-lg">
                      +280/mo
                    </span>
                  </div>

                  <div className="h-44 flex items-end justify-between gap-3 border-b border-slate-100 pb-2">
                    {DEMO_ENTERPRISE_ANALYTICS.monthlyEnrollmentTrend.map((t) => (
                      <div key={t.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <div
                          className="w-full max-w-[36px] bg-gradient-to-t from-[#0E9384] to-teal-400 rounded-t-md transition-all hover:opacity-90"
                          style={{ height: `${(t.reach / 3000) * 100}%` }}
                        />
                        <span className="text-[11px] font-bold text-slate-500">{t.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart 2: Specialty & Country Distribution breakdown */}
                <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Country & Regional Distribution</h3>
                    <p className="text-xs text-slate-500">Cross-border educational reach</p>
                  </div>

                  <div className="space-y-2.5">
                    {DEMO_ENTERPRISE_ANALYTICS.geographicReach.slice(0, 5).map((g) => (
                      <div key={g.country} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-700">{g.country}</span>
                          <span className="text-slate-900 font-bold">{g.count.toLocaleString()} HCPs</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#0E9384] h-full rounded-full" style={{ width: `${g.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 6. EVENTS TAB */}
          {/* ======================================================== */}
          {activeOrgTab === 'events' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Live Symposia & Grand Rounds Broadcasts
                  </h2>
                  <p className="text-xs text-slate-500">
                    Interactive multi-faculty panels, live polling, and accredited credit claim management.
                  </p>
                </div>

                <button
                  onClick={() => showToast('Live broadcast studio configured.')}
                  className="px-4 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule Live Event</span>
                </button>
              </div>

              {/* Event Cards */}
              <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        Upcoming Live Broadcast
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800">
                        1.25 AMA PRA Credits
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Live Grand Rounds: Renal Denervation in Real-World Resistant Hypertension
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                    840 Registered Specialists
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Multi-disciplinary live debate between interventional cardiologists and nephrologists on patient selection, procedural durability, and medication burden reduction.
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-4 text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0E9384]" />
                      Tomorrow, Aug 28, 2026
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#0E9384]" />
                      12:00 PM EST (75 mins)
                    </span>
                  </div>

                  <button
                    onClick={() => showToast('Opening broadcast control room...')}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                  >
                    Open Live Studio Controls ↗
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 7. SETTINGS TAB */}
          {/* ======================================================== */}
          {activeOrgTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Organization Profile Settings */}
              <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-5">
                <h2 className="text-base font-bold text-slate-900">Organization Profile & Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Company / Organization Name</label>
                    <input
                      type="text"
                      value={orgProfile.name}
                      onChange={(e) => setOrgProfile({ ...orgProfile, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 font-semibold focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Organization Type</label>
                    <input
                      type="text"
                      disabled
                      value={orgProfile.type}
                      className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-semibold cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Primary Medical Affairs Contact</label>
                    <input
                      type="text"
                      value={orgProfile.primaryContact}
                      onChange={(e) => setOrgProfile({ ...orgProfile, primaryContact: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 font-semibold focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={orgProfile.contactEmail}
                      onChange={(e) => setOrgProfile({ ...orgProfile, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 font-semibold focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => showToast('Organization profile changes saved.')}
                    className="px-4 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Team Members & Roles Management */}
              <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Team Members & Role-Based Access Control
                    </h2>
                    <p className="text-xs text-slate-500">
                      Manage team roles: <strong>Admin</strong>, <strong>Editor</strong>, <strong>Analyst</strong>, and <strong>Viewer</strong>.
                    </p>
                  </div>

                  <button
                    onClick={() => setInviteMemberOpen(true)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Invite Member</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F9F9] text-slate-600 font-bold border-b border-slate-100">
                      <tr>
                        <th className="p-3">Team Member</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Last Login</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {teamMembers.map((m) => (
                        <tr key={m.id} className="hover:bg-[#F4F9F9]/50">
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{m.name}</div>
                            <div className="text-slate-400 text-[11px]">{m.email}</div>
                          </td>
                          <td className="p-3 text-slate-700 font-medium">{m.department}</td>
                          <td className="p-3">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                m.role === 'Admin'
                                  ? 'bg-purple-100 text-purple-800'
                                  : m.role === 'Editor'
                                  ? 'bg-teal-100 text-teal-800'
                                  : m.role === 'Analyst'
                                  ? 'bg-sky-100 text-sky-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {m.role}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                              {m.status}
                            </span>
                          </td>
                          <td className="p-3 text-right text-slate-500">{m.lastLogin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Security & Permissions */}
              <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                <h2 className="text-base font-bold text-slate-900">Security & Authentication Policies</h2>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-[#F4F9F9] rounded-xl border border-teal-500/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-[#0E9384]" />
                        <span>Enterprise Single Sign-On (SAML 2.0 / Okta / Azure AD)</span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Enforce corporate identity provider authentication for all team members.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Configured
                    </span>
                  </div>

                  <div className="p-3.5 bg-[#F4F9F9] rounded-xl border border-teal-500/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#0E9384]" />
                        <span>Mandatory Two-Factor Authentication (2FA)</span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Enforced for all Admin and Editor roles.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Enforced
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODALS */}
      {/* ======================================================== */}

      {/* 1. Create Learning Program Modal Required by User */}
      {createProgramOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/20 w-full max-w-xl overflow-hidden my-8 animate-in zoom-in-95">
            <div className="px-6 py-4 bg-[#0A192F] text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-sm">Create New Learning Program</h3>
              </div>
              <button
                onClick={() => setCreateProgramOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProgram} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Program Name *
                </label>
                <input
                  type="text"
                  required
                  value={newProgramData.title}
                  onChange={(e) => setNewProgramData({ ...newProgramData, title: e.target.value })}
                  placeholder="e.g. 2026 Heart Failure GDMT Masterclass"
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 font-semibold focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Program Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newProgramData.description}
                  onChange={(e) => setNewProgramData({ ...newProgramData, description: e.target.value })}
                  placeholder="Summarize learning objectives, clinical target, and guideline alignment..."
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:outline-hidden resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Target Specialty *
                  </label>
                  <select
                    value={newProgramData.targetSpecialty}
                    onChange={(e) => setNewProgramData({ ...newProgramData, targetSpecialty: e.target.value as Specialty })}
                    className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 font-semibold focus:outline-hidden"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Emergency Medicine">Emergency Medicine</option>
                    <option value="Infectious Disease">Infectious Disease</option>
                    <option value="Endocrinology">Endocrinology</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Accredited CME Credits
                  </label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    value={newProgramData.accreditedCredits}
                    onChange={(e) => setNewProgramData({ ...newProgramData, accreditedCredits: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 font-semibold focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Target Healthcare Audience *
                </label>
                <input
                  type="text"
                  value={newProgramData.audienceType}
                  onChange={(e) => setNewProgramData({ ...newProgramData, audienceType: e.target.value })}
                  placeholder="e.g. Attending Cardiologists, Fellows, Heart Failure Nurse Practitioners"
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={newProgramData.startDate}
                    onChange={(e) => setNewProgramData({ ...newProgramData, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    End / Renewal Date
                  </label>
                  <input
                    type="text"
                    value={newProgramData.endDate}
                    onChange={(e) => setNewProgramData({ ...newProgramData, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateProgramOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Create Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Upload / Add Content Modal */}
      {addContentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/20 w-full max-w-lg overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 bg-[#0A192F] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-sm">Add Educational Content</h3>
              </div>
              <button onClick={() => setAddContentOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddContent} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Content Title *</label>
                <input
                  type="text"
                  required
                  value={newContentData.title}
                  onChange={(e) => setNewContentData({ ...newContentData, title: e.target.value })}
                  placeholder="e.g. Surgical Technique: Transcatheter Mitral Valve Repair"
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 font-semibold focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Content Type</label>
                  <select
                    value={newContentData.type}
                    onChange={(e) => setNewContentData({ ...newContentData, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 font-semibold focus:outline-hidden"
                  >
                    <option value="Course">Course</option>
                    <option value="Video">Video</option>
                    <option value="Article">Article</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Event">Event</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialty</label>
                  <select
                    value={newContentData.specialty}
                    onChange={(e) => setNewContentData({ ...newContentData, specialty: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 font-semibold focus:outline-hidden"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Infectious Disease">Infectious Disease</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Author / Faculty Lead</label>
                <input
                  type="text"
                  value={newContentData.authorOrFaculty}
                  onChange={(e) => setNewContentData({ ...newContentData, authorOrFaculty: e.target.value })}
                  placeholder="e.g. Dr. Michael Chen, MD, FACC"
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddContentOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl font-bold cursor-pointer"
                >
                  Save Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Invite Team Member Modal */}
      {inviteMemberOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/20 w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 bg-[#0A192F] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-sm">Invite Organization Colleague</h3>
              </div>
              <button onClick={() => setInviteMemberOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleInviteMember} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Dr. Arthur Pendelton"
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 font-semibold focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Role & Permissions</label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as OrgUserRole)}
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 font-semibold focus:outline-hidden"
                >
                  <option value="Admin">Admin (Full Control, Billing, Settings)</option>
                  <option value="Editor">Editor (Create & Publish Content, Manage Programs)</option>
                  <option value="Analyst">Analyst (View Analytics & Export Audience Data)</option>
                  <option value="Viewer">Viewer (Read-Only Access)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInviteMemberOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl font-bold cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Program Detail Slide-out / Modal */}
      {selectedProgramDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/20 w-full max-w-xl overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 bg-[#0A192F] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300">
                  {selectedProgramDetail.targetSpecialty}
                </span>
                <h3 className="font-bold text-sm mt-1">{selectedProgramDetail.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProgramDetail(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-slate-700 leading-relaxed">{selectedProgramDetail.description}</p>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#F4F9F9] p-3 rounded-xl border border-teal-500/10">
                  <span className="text-slate-400 text-[10px] block">Audience Target</span>
                  <span className="font-black text-slate-900 text-sm">
                    {selectedProgramDetail.audienceCount.toLocaleString()}
                  </span>
                </div>
                <div className="bg-[#F4F9F9] p-3 rounded-xl border border-teal-500/10">
                  <span className="text-slate-400 text-[10px] block">Enrollments</span>
                  <span className="font-black text-teal-700 text-sm">
                    {selectedProgramDetail.enrolledCount.toLocaleString()}
                  </span>
                </div>
                <div className="bg-[#F4F9F9] p-3 rounded-xl border border-teal-500/10">
                  <span className="text-slate-400 text-[10px] block">Completions</span>
                  <span className="font-black text-emerald-700 text-sm">
                    {selectedProgramDetail.completedCount.toLocaleString()}
                  </span>
                </div>
              </div>

              {selectedProgramDetail.keyLearningObjectives && (
                <div className="space-y-1.5 bg-teal-50/60 p-3.5 rounded-xl border border-teal-100">
                  <div className="font-bold text-teal-950">Learning Objectives:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                    {selectedProgramDetail.keyLearningObjectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedProgramDetail(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Preview Content Item Modal */}
      {previewContentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/20 w-full max-w-lg overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 bg-[#0A192F] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-sm">Content Preview</h3>
              </div>
              <button
                onClick={() => setPreviewContentItem(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800">
                  {previewContentItem.type} • {previewContentItem.specialty}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {previewContentItem.title}
                </h3>
                <p className="text-slate-500 text-[11px] mt-1">
                  By {previewContentItem.authorOrFaculty} • {previewContentItem.durationOrCredits}
                </p>
              </div>

              <div className="p-4 bg-[#F4F9F9] rounded-xl border border-teal-500/10 space-y-2 text-slate-700">
                <div className="font-bold text-slate-900">Curriculum Telemetry Status:</div>
                <div className="flex justify-between">
                  <span>Total Views / Plays:</span>
                  <span className="font-bold">{previewContentItem.views.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Rate:</span>
                  <span className="font-bold text-teal-700">{previewContentItem.completionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>ACCME PARS Reporting:</span>
                  <span className="font-bold text-emerald-700">Automated Live Sync</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setPreviewContentItem(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
