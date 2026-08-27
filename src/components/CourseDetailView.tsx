import React from 'react';
import {
  Award,
  Clock,
  BookOpen,
  Calendar,
  Users,
  Star,
  CheckCircle2,
  FileText,
  Download,
  Share2,
  Bookmark,
  Play,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { Course, UserProfile } from '../types';

interface CourseDetailViewProps {
  course: Course;
  user: UserProfile;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onStartLearning: () => void;
  onOpenAssessment: () => void;
  onBack: () => void;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  user,
  isBookmarked,
  onBookmarkToggle,
  onStartLearning,
  onOpenAssessment,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-[#F4F9F9] pb-24 text-[#1A2B3B]">
      {/* Breadcrumb & Navigation */}
      <div className="bg-white border-b border-teal-500/10 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={onBack}
              className="font-medium text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              ← All Courses
            </button>
            <span>/</span>
            <span className="font-semibold text-slate-700">{course.specialty}</span>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-xs">{course.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBookmarkToggle}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-teal-50 border-teal-300 text-teal-700'
                  : 'bg-white border-teal-500/10 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-teal-600 text-teal-600' : ''}`} />
              <span>{isBookmarked ? 'Saved in Protocols' : 'Bookmark'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0A192F] to-[#162C4E] text-white py-12 relative overflow-hidden border-b border-white/10">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-lg text-xs font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  {course.credits} {course.accreditationType}
                </span>
                <span className="px-3 py-1 bg-white/10 text-white rounded-lg text-xs font-medium backdrop-blur-xs">
                  {course.specialty}
                </span>
                <span className="px-3 py-1 bg-white/10 text-white rounded-lg text-xs font-medium backdrop-blur-xs">
                  Level: {course.difficulty}
                </span>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 rounded-lg text-xs font-semibold">
                  {course.format}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-base text-teal-100/80 leading-relaxed max-w-3xl">
                {course.subtitle}
              </p>

              {/* Meta stats */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span>{course.durationMinutes} minutes learning time</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{course.rating}</span>
                  <span>({course.ratingsCount} peer reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-teal-400" />
                  <span>{course.enrolledCount.toLocaleString()} clinicians enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>Valid through {course.expiresDate}</span>
                </div>
              </div>

              {/* Lead Faculty mini card */}
              <div className="pt-4 flex items-center gap-4 bg-white/5 border border-white/10 p-3.5 rounded-2xl max-w-xl">
                <img
                  src={course.faculty.avatar}
                  alt={course.faculty.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-teal-400"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-white text-sm">
                      {course.faculty.name}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-1">{course.faculty.title}</p>
                  <p className="text-[11px] text-teal-300 font-medium">{course.faculty.institution}</p>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Action Preview */}
            <div className="lg:col-span-4 bg-white text-slate-900 rounded-2xl p-6 shadow-md border border-teal-500/10">
              <div className="relative rounded-xl overflow-hidden mb-5 group cursor-pointer" onClick={onStartLearning}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#0A192F]/40 flex items-center justify-center group-hover:bg-[#0A192F]/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#0E9384] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2.5 right-2.5 bg-[#0A192F]/80 text-white text-[11px] font-mono px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {course.durationMinutes}m HD Video
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <button
                  onClick={onStartLearning}
                  className="w-full py-3.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Learning Now</span>
                </button>

                <button
                  onClick={onOpenAssessment}
                  className="w-full py-3 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-teal-200"
                >
                  <Award className="w-4 h-4 text-teal-700" />
                  <span>Direct to Assessment & Claim CME</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Accredited by</span>
                  <span className="font-semibold text-slate-800">{course.accreditationBody}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Included Material</span>
                  <span className="font-semibold text-slate-800">Transcript, Notes, Protocols</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Certificate Delivery</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Instant PDF & QR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Learning Objectives */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-teal-600" />
                Clinical Learning Objectives
              </h2>
              <p className="text-xs text-slate-500">
                Upon successful completion of this activity, participants should be able to:
              </p>
              <div className="grid grid-cols-1 gap-3 pt-2">
                {course.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[#F4F9F9] rounded-xl border border-teal-500/10">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 leading-snug">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Syllabus / Chapters Breakdown */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-teal-500/10 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-teal-600" />
                    Curriculum & Clinical Modules
                  </h2>
                  <p className="text-xs text-slate-500">
                    {course.chapters.length} structured clinical modules • Total {course.durationMinutes} mins
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {course.chapters.map((ch, idx) => (
                  <div key={ch.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 text-xs font-bold flex items-center justify-center shrink-0 border border-teal-100">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{ch.title}</h4>
                          <p className="text-xs text-slate-600 mt-0.5">{ch.summary}</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                        {ch.timestamp}
                      </span>
                    </div>

                    {ch.keyTakeaways && ch.keyTakeaways.length > 0 && (
                      <div className="pl-10 space-y-1">
                        {ch.keyTakeaways.map((takeaway, tIdx) => (
                          <div key={tIdx} className="text-xs text-slate-500 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            <span>{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Case Vignette Spotlight */}
            {course.caseVignette && (
              <div className="bg-[#0A192F] text-white p-6 sm:p-8 rounded-2xl shadow-xs border border-white/10 relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5" /> Interactive Patient Case Included
                    </span>
                    <span className="text-xs text-teal-200 font-mono">
                      {course.caseVignette.patientAge}yo {course.caseVignette.patientGender}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {course.caseVignette.chiefComplaint}
                  </h3>

                  <p className="text-xs text-teal-100 line-clamp-3 leading-relaxed">
                    {course.caseVignette.historyOfPresentIllness}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-teal-200">
                      Includes full hemodynamic labs & guideline decision questions.
                    </span>
                    <button
                      onClick={onOpenAssessment}
                      className="px-4 py-2 bg-white text-teal-950 hover:bg-teal-50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Review Patient Case</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Downloadable Bedside Protocols */}
            {course.downloadableProtocols.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  Downloadable Clinical Protocols & Practice Algorithms
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.downloadableProtocols.map((proto, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#F4F9F9] border border-teal-500/10 rounded-xl flex items-start justify-between gap-3 hover:border-teal-300 transition-colors"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                          {proto.type}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{proto.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-snug">{proto.description}</p>
                        <span className="text-[10px] text-slate-400 block pt-1">{proto.size}</span>
                      </div>
                      <button
                        title="Download protocol"
                        className="p-2.5 bg-white hover:bg-[#0E9384] hover:text-white text-slate-700 border border-teal-500/10 rounded-xl transition-colors cursor-pointer shadow-2xs"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Faculty Bio Card */}
            <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Featured Faculty
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={course.faculty.avatar}
                  alt={course.faculty.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-teal-500"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{course.faculty.name}</h4>
                  <p className="text-xs text-slate-600">{course.faculty.title}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {course.faculty.bio}
              </p>
              {course.faculty.publicationsCount && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Peer-Reviewed Papers</span>
                  <span className="font-bold text-slate-800">{course.faculty.publicationsCount}+ Publications</span>
                </div>
              )}
            </div>

            {/* Target Audience & Accreditation Body Card */}
            <div className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Accreditation & Target Audience
              </h3>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">Target Specialties:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.targetAudience.map((aud, i) => (
                      <span key={i} className="text-xs bg-[#F4F9F9] text-slate-700 px-2.5 py-1 rounded-md border border-teal-500/10">
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-700 block mb-1">Accrediting Provider:</span>
                  <p className="text-xs text-slate-600">{course.accreditationBody}</p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-700 block mb-1">Commercial Support:</span>
                  <p className="text-xs text-slate-500">
                    This activity is funded through independent medical educational grants adhering strictly to ACCME Standards for Integrity and Independence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
