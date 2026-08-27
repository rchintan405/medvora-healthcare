import React, { useState } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  BookOpen,
  Award,
  Calendar,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Building,
  GraduationCap,
  UserPlus,
  UserCheck,
  Video,
  FileText,
  Clock,
  Send,
  X,
  Mail,
  HelpCircle,
  Layers
} from 'lucide-react';
import { Faculty, Course, WebinarEvent, ExpertSessionRequest } from '../types';
import { SPECIALTY_CATEGORIES } from '../data/mockData';

interface ExpertsDirectoryViewProps {
  facultyList?: Faculty[];
  courses?: Course[];
  webinars?: WebinarEvent[];
  onSelectCourse: (course: Course) => void;
  onAskAiWithFacultyContext: (faculty: Faculty) => void;
  onToggleFollowFaculty?: (facultyId: string) => void;
  onFollowToggle?: (facultyId: string) => void;
  onSelectWebinar?: (webinar: WebinarEvent) => void;
  onOpenWebinar?: () => void;
}

export const ExpertsDirectoryView: React.FC<ExpertsDirectoryViewProps> = ({
  facultyList = [],
  courses = [],
  webinars = [],
  onSelectCourse,
  onAskAiWithFacultyContext,
  onToggleFollowFaculty,
  onFollowToggle,
  onSelectWebinar,
  onOpenWebinar,
}) => {
  const handleFollowFaculty = onToggleFollowFaculty || onFollowToggle || (() => {});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [selectedFacultyForDetail, setSelectedFacultyForDetail] = useState<Faculty | null>(null);

  // Consultation Request Modal State
  const [consultModalFaculty, setConsultModalFaculty] = useState<Faculty | null>(null);
  const [sessionTopic, setSessionTopic] = useState('');
  const [sessionFormat, setSessionFormat] = useState<'Case Review & Second Opinion' | 'Clinical Research Advisory' | 'Fellowship & Career Mentorship'>('Case Review & Second Opinion');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [consultSuccessMessage, setConsultSuccessMessage] = useState<string | null>(null);

  const specialties = ['All', ...SPECIALTY_CATEGORIES];

  const filteredFaculty = facultyList.filter((f) => {
    if (!f) return false;
    const matchQuery =
      !searchQuery ||
      f.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.institution?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.specialty?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSpecialty = selectedSpecialty === 'All' || f.specialty === selectedSpecialty;
    return matchQuery && matchSpecialty;
  });

  const handleOpenConsultModal = (faculty: Faculty, defaultTopic?: string) => {
    setConsultModalFaculty(faculty);
    setSessionTopic(defaultTopic || (faculty.consultationTopics ? faculty.consultationTopics[0] : 'Clinical Case Protocol Review'));
    setSessionNotes('');
    setSessionDate('2026-09-02');
  };

  const handleSubmitConsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultModalFaculty) return;

    setConsultSuccessMessage(`Consultation request for Dr. ${consultModalFaculty.name} has been submitted. The academic office will confirm availability.`);
    setConsultModalFaculty(null);
    setTimeout(() => setConsultSuccessMessage(null), 4000);
  };

  return (
    <div id="experts-view" className="min-h-screen bg-[#F4F9F9] pb-24 text-[#1A2B3B]">
      {/* Toast */}
      {consultSuccessMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A192F] text-white px-4 py-3 rounded-xl shadow-xl border border-teal-500/30 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{consultSuccessMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-[#0A192F] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>World-Class Academic Faculty & Clinical Chairs</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Expert Directory & Academic Faculty
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/70 max-w-2xl">
            Connect directly with leading clinical investigators, trial authors, and department chairs developing accredited CME curriculum and peer discussions on Medvora.
          </p>

          {/* Search & Filter Bar */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by faculty name, title, medical specialty, or university hospital..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-teal-100/40 focus:outline-hidden focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {specialties.slice(0, 7).map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    selectedSpecialty === spec
                      ? 'bg-[#0E9384] text-white shadow-xs'
                      : 'bg-white/10 text-teal-100/80 hover:bg-white/20'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Faculty Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs text-slate-500 font-semibold">
            Showing <span className="font-bold text-slate-900">{filteredFaculty.length}</span> distinguished medical faculty
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((faculty) => {
            const facultyCourses = courses.filter(
              (c) => c.faculty.id === faculty.id || c.faculty.name === faculty.name
            );
            const followersCount = faculty.followersCount || 2400;

            return (
              <div
                key={faculty.id}
                id={`faculty-card-${faculty.id}`}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  {/* Top Avatar & Name Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={faculty.avatar}
                        alt={faculty.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-teal-500/20 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="text-sm font-bold text-slate-900 leading-snug">
                            {faculty.name}
                          </h3>
                          {faculty.verified && (
                            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                          )}
                        </div>
                        {faculty.credentials && (
                          <span className="text-[11px] font-semibold text-[#0E9384]">
                            {faculty.credentials}
                          </span>
                        )}
                        <p className="text-[11px] text-slate-500 line-clamp-1">{faculty.institution}</p>
                      </div>
                    </div>

                    {/* Follow Button */}
                    <button
                      onClick={() => handleFollowFaculty(faculty.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0 ${
                        faculty.isFollowing
                          ? 'bg-teal-50 text-[#0E9384] border border-teal-200'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {faculty.isFollowing ? (
                        <>
                          <UserCheck className="w-3 h-3 text-[#0E9384]" />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3 h-3 text-slate-500" />
                          <span>Follow</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Specialty & Title */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-50 text-[#0E9384] border border-teal-100">
                        {faculty.specialty}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {followersCount.toLocaleString()} clinician followers
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium line-clamp-2">
                      {faculty.title}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {faculty.bio}
                  </p>

                  {/* Key Stats Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">CME Courses</span>
                      <span className="font-bold text-slate-900">{facultyCourses.length} Accredited</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Publications</span>
                      <span className="font-bold text-slate-900">{faculty.publicationsCount || 40}+ Indexed</span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedFacultyForDetail(faculty)}
                    className="flex-1 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleOpenConsultModal(faculty)}
                    className="flex-1 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer text-center shadow-xs flex items-center justify-center gap-1"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Request Session</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expert Profile Detail Modal */}
      {selectedFacultyForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
            {/* Modal Top Header */}
            <div className="px-6 py-5 bg-[#0A192F] text-white flex items-start justify-between relative">
              <div className="flex items-start gap-4">
                <img
                  src={selectedFacultyForDetail.avatar}
                  alt={selectedFacultyForDetail.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-teal-400 shadow-md"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-xl font-bold text-white">
                      {selectedFacultyForDetail.name}
                    </h2>
                    {selectedFacultyForDetail.credentials && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-teal-500/20 text-teal-300 rounded-md border border-teal-500/30">
                        {selectedFacultyForDetail.credentials}
                      </span>
                    )}
                    {selectedFacultyForDetail.verified && (
                      <ShieldCheck className="w-4 h-4 text-teal-400" />
                    )}
                  </div>
                  <p className="text-xs text-teal-100/90 font-medium">
                    {selectedFacultyForDetail.title}
                  </p>
                  <p className="text-xs text-teal-100/60 flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    <span>{selectedFacultyForDetail.institution}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedFacultyForDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              {/* Bio & Academic Credentials */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#0E9384]" />
                  <span>Academic Background & Clinical Scope</span>
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedFacultyForDetail.bio}
                </p>
              </div>

              {/* Consultation Topics */}
              {selectedFacultyForDetail.consultationTopics && selectedFacultyForDetail.consultationTopics.length > 0 && (
                <div className="p-4 bg-teal-50/60 border border-teal-100 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#0E9384]" />
                    <span>Available Consultation & Case Review Topics</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedFacultyForDetail.consultationTopics.map((topic) => (
                      <li key={topic} className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0E9384]" />
                          <span>{topic}</span>
                        </span>
                        <button
                          onClick={() => {
                            setSelectedFacultyForDetail(null);
                            handleOpenConsultModal(selectedFacultyForDetail, topic);
                          }}
                          className="text-[11px] text-[#0E9384] hover:underline font-bold cursor-pointer"
                        >
                          Request Review →
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Published Articles & Trial Citations */}
              {selectedFacultyForDetail.articles && selectedFacultyForDetail.articles.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#0E9384]" />
                    <span>Selected Publications & Evidence Citations</span>
                  </h3>
                  <div className="space-y-2">
                    {selectedFacultyForDetail.articles.map((art) => (
                      <div
                        key={art.id}
                        className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1"
                      >
                        <h4 className="font-bold text-slate-900 text-xs">{art.title}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 flex-wrap">
                          <span className="font-semibold text-slate-700">{art.journal}</span>
                          <span>•</span>
                          <span>{art.year}</span>
                          {art.doi && (
                            <>
                              <span>•</span>
                              <span className="text-[#0E9384]">DOI: {art.doi}</span>
                            </>
                          )}
                          {art.readMinutes && (
                            <span className="ml-auto text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {art.readMinutes} min read
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Taught by Faculty */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#0E9384]" />
                  <span>Accredited Courses Led by {selectedFacultyForDetail.name}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {courses
                    .filter(
                      (c) =>
                        c.faculty.id === selectedFacultyForDetail.id ||
                        c.faculty.name === selectedFacultyForDetail.name
                    )
                    .map((course) => (
                      <div
                        key={course.id}
                        onClick={() => {
                          setSelectedFacultyForDetail(null);
                          onSelectCourse(course);
                        }}
                        className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-teal-500/50 hover:shadow-xs transition-all cursor-pointer space-y-2 group"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="px-2 py-0.5 rounded-sm bg-teal-50 text-[#0E9384] font-bold">
                            {course.credits} CME Credits
                          </span>
                          <span className="text-slate-400">{course.durationMinutes} mins</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs group-hover:text-[#0E9384] transition-colors line-clamp-2">
                          {course.title}
                        </h4>
                        <div className="text-[11px] text-[#0E9384] font-semibold flex items-center gap-1">
                          <span>View Course</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => handleFollowFaculty(selectedFacultyForDetail.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  selectedFacultyForDetail.isFollowing
                    ? 'bg-teal-50 text-[#0E9384] border border-teal-200'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {selectedFacultyForDetail.isFollowing ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-[#0E9384]" />
                    <span>Following Faculty</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Follow for Guideline Updates</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  const f = selectedFacultyForDetail;
                  setSelectedFacultyForDetail(null);
                  handleOpenConsultModal(f);
                }}
                className="px-5 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Request Consultation Session</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Consultation Session Modal */}
      {consultModalFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-[#0A192F] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Request Consultation Session</h3>
                  <p className="text-[11px] text-teal-100/70">With {consultModalFaculty.name}</p>
                </div>
              </div>
              <button
                onClick={() => setConsultModalFaculty(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitConsult} className="p-6 space-y-4 text-xs overflow-y-auto">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Consultation Topic / Scope</label>
                <input
                  type="text"
                  required
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  placeholder="e.g. Hemodynamic Shock Protocol Optimization"
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384] text-xs font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Session Format</label>
                <select
                  value={sessionFormat}
                  onChange={(e) => setSessionFormat(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                >
                  <option value="Case Review & Second Opinion">Case Review & Second Opinion (30 mins)</option>
                  <option value="Clinical Research Advisory">Clinical Research Advisory (45 mins)</option>
                  <option value="Fellowship & Career Mentorship">Fellowship & Career Mentorship (30 mins)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Preferred Date Window</label>
                <input
                  type="date"
                  required
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384] text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Clinical Context & Objectives</label>
                <textarea
                  rows={3}
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Briefly describe the clinical dilemmas or learning goals you wish to discuss..."
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384] text-xs leading-relaxed"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0E9384]" />
                  <span>Academic Consultation Policy</span>
                </div>
                <p>Sessions are conducted for educational & peer advisory purposes via Medvora Secure Video.</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setConsultModalFaculty(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
