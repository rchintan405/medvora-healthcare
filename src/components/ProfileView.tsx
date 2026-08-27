import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Building2,
  Mail,
  User,
  Calendar,
  Save,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  Sliders,
  Bell,
  BookOpen,
  Check,
  Video,
  Bookmark,
  ExternalLink,
  Users,
  Edit3,
  X,
  TrendingUp,
  Download,
  Flame,
  ChevronRight
} from 'lucide-react';
import {
  UserProfile,
  Specialty,
  Course,
  Certificate,
  WebinarEvent,
  Faculty,
  UserProgress,
  CommunityPost
} from '../types';
import { SPECIALTY_CATEGORIES } from '../data/mockData';

interface ProfileViewProps {
  user: UserProfile;
  courses: Course[];
  userProgress: Record<string, UserProgress>;
  certificates: Certificate[];
  webinars: WebinarEvent[];
  facultyList: Faculty[];
  communityPosts: CommunityPost[];
  onUpdateProfile: (updated: UserProfile) => void;
  onSelectCourse: (course: Course) => void;
  onOpenCertificate: (cert: Certificate) => void;
  onSelectWebinar: (webinar: WebinarEvent) => void;
}

type ProfileTab = 'overview' | 'courses' | 'certificates' | 'webinars' | 'saved' | 'following';

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  courses,
  userProgress,
  certificates,
  webinars,
  facultyList,
  communityPosts,
  onUpdateProfile,
  onSelectCourse,
  onOpenCertificate,
  onSelectWebinar,
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<UserProfile>({ ...user });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Computations
  const enrolledCourses = courses.filter((c) => {
    const prog = userProgress[c.id];
    return prog && prog.percentCompleted > 0;
  });

  const inProgressCourses = courses.filter((c) => {
    const prog = userProgress[c.id];
    return prog && prog.percentCompleted > 0 && prog.percentCompleted < 100;
  });

  const registeredWebinarsList = webinars.filter((w) => w.registered);
  const followingFacultyList = facultyList.filter((f) => f.isFollowing);
  const savedDiscussions = communityPosts.filter((p) => p.saved);

  const cmePercent = Math.min(
    100,
    Math.round((user.completedCmeThisYear / (user.targetCmeCredits || 50)) * 100)
  );

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editFormData);
    setShowEditModal(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleSpecialtyToggle = (spec: Specialty) => {
    if (spec === editFormData.primarySpecialty) return;
    if (editFormData.secondarySpecialties.includes(spec)) {
      setEditFormData({
        ...editFormData,
        secondarySpecialties: editFormData.secondarySpecialties.filter((s) => s !== spec),
      });
    } else {
      setEditFormData({
        ...editFormData,
        secondarySpecialties: [...editFormData.secondarySpecialties, spec],
      });
    }
  };

  return (
    <div id="profile-view" className="min-h-screen bg-[#F4F9F9] pb-24 text-[#1A2B3B]">
      {/* Toast Alert */}
      {savedSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A192F] text-white px-4 py-3 rounded-xl shadow-xl border border-teal-500/30 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>Professional profile and state licensing details successfully updated.</span>
        </div>
      )}

      {/* Profile Top Banner */}
      <div className="bg-[#0A192F] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Clinician Identity */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-teal-400 shadow-xl"
                />
                <span className="absolute bottom-0 right-0 p-1 bg-teal-500 rounded-full text-white border-2 border-[#0A192F]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {user.name}
                  </h1>
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-teal-500/20 text-teal-300 rounded-md border border-teal-500/30">
                    {user.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-teal-100/90 font-medium">
                  {user.primarySpecialty} {user.secondarySpecialties.length > 0 && `• ${user.secondarySpecialties.join(', ')}`}
                </p>
                <div className="flex items-center gap-3 text-xs text-teal-100/60 flex-wrap pt-0.5">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {user.institution} ({user.department || 'Medicine'})
                  </span>
                  <span>•</span>
                  <span>NPI: {user.npiNumber}</span>
                  <span>•</span>
                  <span>License: {user.licenseNumber} ({user.licenseState})</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                id="edit-profile-btn"
                onClick={() => {
                  setEditFormData({ ...user });
                  setShowEditModal(true);
                }}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/20 cursor-pointer flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-xl p-3.5">
              <span className="text-[11px] text-teal-100/70 block">Annual CME Target</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-black text-white">{user.completedCmeThisYear.toFixed(1)}</span>
                <span className="text-xs text-teal-300">/ {user.targetCmeCredits || 50} Credits</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-teal-400 h-full rounded-full" style={{ width: `${cmePercent}%` }} />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-xl p-3.5">
              <span className="text-[11px] text-teal-100/70 block">Verified Certificates</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-black text-white">{certificates.length}</span>
                <span className="text-xs text-teal-300">ACCME Issued</span>
              </div>
              <span className="text-[10px] text-teal-100/60 block mt-1">Audit ready</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-xl p-3.5">
              <span className="text-[11px] text-teal-100/70 block">Learning Streak</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-xl font-black text-white">{user.streakDays || 12}</span>
                <span className="text-xs text-teal-300">Days Active</span>
              </div>
              <span className="text-[10px] text-teal-100/60 block mt-1">Top 5% of network</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-xl p-3.5">
              <span className="text-[11px] text-teal-100/70 block">Faculty Following</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-black text-white">{followingFacultyList.length}</span>
                <span className="text-xs text-teal-300">Investigators</span>
              </div>
              <span className="text-[10px] text-teal-100/60 block mt-1">Direct trial updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Licensing', icon: User },
            { id: 'courses', label: `My Courses (${enrolledCourses.length})`, icon: BookOpen },
            { id: 'certificates', label: `Certificates (${certificates.length})`, icon: Award },
            { id: 'webinars', label: `Grand Rounds (${registeredWebinarsList.length})`, icon: Video },
            { id: 'saved', label: `Saved Discussions (${savedDiscussions.length})`, icon: Bookmark },
            { id: 'following', label: `Faculty Following (${followingFacultyList.length})`, icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`profile-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as ProfileTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#0E9384] text-white border-[#0E9384] shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#0E9384]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview & Licensing */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Professional Credentials Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0E9384]" />
                  <span>Physician Board Certification & Licensure</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-slate-400 text-[10px] font-semibold">Medical License</span>
                    <p className="font-bold text-slate-900">{user.licenseNumber}</p>
                    <p className="text-[11px] text-slate-500">State of {user.licenseState} Medical Board</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-slate-400 text-[10px] font-semibold">National Provider Identifier (NPI)</span>
                    <p className="font-bold text-slate-900">{user.npiNumber}</p>
                    <p className="text-[11px] text-slate-500">Enumerated via NPPES</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-slate-400 text-[10px] font-semibold">Primary Specialty Board</span>
                    <p className="font-bold text-slate-900">{user.primarySpecialty}</p>
                    <p className="text-[11px] text-slate-500">Maintenance of Certification (MOC) Active</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-slate-400 text-[10px] font-semibold">Clinical Appointment</span>
                    <p className="font-bold text-slate-900">{user.role}</p>
                    <p className="text-[11px] text-slate-500">{user.institution}</p>
                  </div>
                </div>
              </div>

              {/* In Progress Courses */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#0E9384]" />
                    <span>In-Progress Educational Activities</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="text-xs text-[#0E9384] font-bold hover:underline cursor-pointer"
                  >
                    View all ({enrolledCourses.length}) →
                  </button>
                </div>

                {inProgressCourses.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2">
                    No modules currently in progress. Start an accredited course from the CME Catalog.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {inProgressCourses.slice(0, 3).map((c) => {
                      const prog = userProgress[c.id];
                      return (
                        <div
                          key={c.id}
                          onClick={() => onSelectCourse(c)}
                          className="p-4 bg-slate-50 hover:bg-teal-50/40 border border-slate-200 rounded-xl transition-all cursor-pointer space-y-2 group"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900 group-hover:text-[#0E9384] transition-colors">
                              {c.title}
                            </span>
                            <span className="font-bold text-[#0E9384] text-xs">
                              {prog?.percentCompleted || 0}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#0E9384] h-full rounded-full"
                              style={{ width: `${prog?.percentCompleted || 0}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>{c.faculty.name}</span>
                            <span>{c.credits} CME Credits</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: CME Compliance Card */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0E9384]" />
                  <span>ACCME PARS Compliance</span>
                </h3>

                <div className="p-4 bg-teal-50 border border-teal-100 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>2026 Reporting Cycle</span>
                    <span className="text-[#0E9384]">{cmePercent}% Complete</span>
                  </div>
                  <div className="w-full bg-teal-200/60 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0E9384] h-full rounded-full" style={{ width: `${cmePercent}%` }} />
                  </div>
                  <p className="text-[11px] text-slate-600 pt-1">
                    {user.completedCmeThisYear.toFixed(1)} of {user.targetCmeCredits || 50} required Category 1 CME credits earned. Target completion date: December 31, 2026.
                  </p>
                </div>

                <div className="pt-2 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>Category 1 AMA PRA:</span>
                    <span className="font-bold text-slate-900">{user.completedCmeThisYear.toFixed(1)} hrs</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>Pharmacology Specific:</span>
                    <span className="font-bold text-slate-900">8.5 hrs</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>Direct PARS Reporting:</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Synced
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Enrolled & Completed Courses */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.length === 0 ? (
              <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No Enrolled Courses Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Browse the accredited CME catalog to start learning and earning state-approved credits.
                </p>
              </div>
            ) : (
              enrolledCourses.map((c) => {
                const prog = userProgress[c.id];
                const isCompleted = prog?.percentCompleted === 100;

                return (
                  <div
                    key={c.id}
                    onClick={() => onSelectCourse(c)}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 space-y-3 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="px-2 py-0.5 rounded-md font-bold bg-teal-50 text-[#0E9384]">
                          {c.specialty}
                        </span>
                        <span className="font-bold text-slate-700">{c.credits} CME Credits</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{c.title}</h4>
                      <p className="text-xs text-slate-500">{c.faculty.name} • {c.faculty.institution}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span>{isCompleted ? 'Completed' : 'In Progress'}</span>
                        <span className="text-[#0E9384]">{prog?.percentCompleted || 0}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0E9384] h-full rounded-full"
                          style={{ width: `${prog?.percentCompleted || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 3: Earned Certificates */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.length === 0 ? (
              <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <Award className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No Certificates Earned Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Complete clinical assessments with 80%+ pass score to earn accredited certificates.
                </p>
              </div>
            ) : (
              certificates.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => onOpenCertificate(cert)}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 space-y-3 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-50 text-[#0E9384]">
                        {cert.accreditationType}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {cert.verificationCode}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{cert.courseTitle}</h4>
                    <p className="text-xs text-slate-500">Issued: {cert.issueDate}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E9384]">
                    <span>{cert.creditsEarned} Credits Earned</span>
                    <span className="flex items-center gap-1">
                      <span>View & Download</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: Registered Webinars */}
        {activeTab === 'webinars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredWebinarsList.length === 0 ? (
              <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <Video className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No Grand Rounds Registered</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Explore upcoming symposia and live panels in the Grand Rounds section.
                </p>
              </div>
            ) : (
              registeredWebinarsList.map((webinar) => (
                <div
                  key={webinar.id}
                  onClick={() => onSelectWebinar(webinar)}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 space-y-3 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="px-2 py-0.5 rounded-md font-bold bg-teal-50 text-[#0E9384]">
                        {webinar.category || 'Webinar'}
                      </span>
                      <span className="font-bold text-slate-700">{webinar.credits} CME</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{webinar.title}</h4>
                    <p className="text-xs text-slate-500">{webinar.speaker.name} • {webinar.date}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E9384]">
                    <span>Confirmed Entry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 5: Saved Discussions */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            {savedDiscussions.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No Saved Discussions</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Bookmark clinical pearls, case dilemmas, and trial insights in the Community Forum.
                </p>
              </div>
            ) : (
              savedDiscussions.map((post) => (
                <div
                  key={post.id}
                  className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 bg-teal-50 text-[#0E9384] font-bold rounded-md">
                      {post.category}
                    </span>
                    <span className="font-semibold text-slate-700">{post.specialty}</span>
                    <span className="text-slate-400">• {post.author.name}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{post.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{post.content}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 6: Following Faculty */}
        {activeTab === 'following' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {followingFacultyList.length === 0 ? (
              <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <Users className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Not Following Any Faculty Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Follow distinguished chairs and trial investigators in the Expert Directory to receive their updates.
                </p>
              </div>
            ) : (
              followingFacultyList.map((faculty) => (
                <div
                  key={faculty.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex items-center gap-4"
                >
                  <img
                    src={faculty.avatar}
                    alt={faculty.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-500/20"
                  />
                  <div className="min-w-0 flex-1 space-y-0.5 text-xs">
                    <h4 className="font-bold text-slate-900 truncate">{faculty.name}</h4>
                    <p className="text-slate-500 text-[11px] truncate">{faculty.title}</p>
                    <span className="text-[10px] font-bold text-[#0E9384] bg-teal-50 px-1.5 py-0.2 rounded-sm inline-block">
                      {faculty.specialty}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0A192F] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold text-white">Edit Professional Profile</h3>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name & Title *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Clinical Role / Rank *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.role}
                    onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hospital / Institution *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.institution}
                    onChange={(e) => setEditFormData({ ...editFormData, institution: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <input
                    type="text"
                    value={editFormData.department || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">State License #</label>
                  <input
                    type="text"
                    value={editFormData.licenseNumber}
                    onChange={(e) => setEditFormData({ ...editFormData, licenseNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">License State</label>
                  <input
                    type="text"
                    value={editFormData.licenseState}
                    onChange={(e) => setEditFormData({ ...editFormData, licenseState: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Annual CME Target (hrs)</label>
                  <input
                    type="number"
                    value={editFormData.targetCmeCredits || 50}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, targetCmeCredits: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                  />
                </div>
              </div>

              {/* Primary Specialty */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Primary Specialty Board</label>
                <select
                  value={editFormData.primarySpecialty}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, primarySpecialty: e.target.value as Specialty })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                >
                  {SPECIALTY_CATEGORIES.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
