import React, { useState } from 'react';
import {
  Award,
  Clock,
  BookOpen,
  Calendar,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Play,
  CheckCircle2,
  Bookmark,
  Stethoscope,
  Users,
  Brain,
  ShieldCheck,
  Zap,
  ArrowRight,
  RefreshCw,
  Bell,
  Target,
  FileCheck,
  GraduationCap
} from 'lucide-react';
import {
  UserProfile,
  Course,
  ClinicalGuidelineAlert,
  WebinarEvent,
  CommunityCase,
  Certificate,
  DevelopmentGoal,
} from '../types';
import { DEMO_DEVELOPMENT_GOALS } from '../data/mockData';

interface DashboardViewProps {
  user: UserProfile;
  courses: Course[];
  guidelineAlerts: ClinicalGuidelineAlert[];
  webinars: WebinarEvent[];
  communityCases: CommunityCase[];
  certificates: Certificate[];
  onSelectCourse: (course: Course) => void;
  onNavigateTab: (tabId: string) => void;
  onOpenAiConsult: () => void;
  onOpenWebinarRoom: (webinar: WebinarEvent) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  courses,
  guidelineAlerts,
  webinars,
  communityCases,
  certificates,
  onSelectCourse,
  onNavigateTab,
  onOpenAiConsult,
  onOpenWebinarRoom,
}) => {
  // "Daily Clinical Dose" interactive state
  const [dailyDoseAnswered, setDailyDoseAnswered] = useState(false);
  const [dailySelectedOpt, setDailySelectedOpt] = useState<number | null>(null);
  const [goals, setGoals] = useState(DEMO_DEVELOPMENT_GOALS);
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);

  const cmePercentage = Math.min(
    100,
    Math.round((user.completedCmeThisYear / user.annualCmeTarget) * 100)
  );

  const inProgressCourse = courses[0]; // Active module
  const secondaryInProgress = courses[1];
  const specialtyRecommended = courses.filter(
    (c) => c.specialty === user.primarySpecialty || user.secondarySpecialties.includes(c.specialty)
  );

  return (
    <div className="min-h-screen bg-[#F4F9F9] pb-20 text-[#1A2B3B]">
      {/* Top Welcome Hero Banner - Clean Minimalism Dark Slate to Navy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-br from-[#0A192F] to-[#162C4E] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/5 shadow-sm">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20 rounded-lg flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                Verified Clinician Dashboard
              </span>
              <span className="text-xs text-slate-300/80">{user.role} • {user.primarySpecialty}</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Good morning, {user.name}
              </h1>
              <p className="text-teal-100/70 text-sm mt-0.5">
                Continue building your expertise. You've completed {cmePercentage}% of your annual state board target.
              </p>
            </div>

            {/* Core Learning Progress Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Courses Completed</span>
                <span className="text-xl font-bold text-white flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-teal-400" /> 14
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Learning Hours</span>
                <span className="text-xl font-bold text-teal-300 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-teal-400" /> {user.completedCmeThisYear} hrs
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Certificates</span>
                <span className="text-xl font-bold text-white flex items-center gap-1">
                  <Award className="w-4 h-4 text-teal-400" /> {certificates.length} Verified
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Learning Streak</span>
                <span className="text-xl font-bold text-amber-300 flex items-center gap-1">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" /> {user.streakDays} Days
                </span>
              </div>
            </div>
          </div>

          {/* Radial Progress Ring */}
          <div className="shrink-0 flex items-center justify-center p-2">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-teal-500/20 flex items-center justify-center relative">
              <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                <path
                  className="text-teal-500/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-400 transition-all duration-1000 ease-out"
                  strokeDasharray={`${cmePercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white leading-none">{cmePercentage}%</span>
                <span className="text-[9px] uppercase tracking-wider text-teal-300/80 font-bold mt-0.5">Target</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Continue Learning Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Play className="w-4 h-4 text-[#0E9384] fill-[#0E9384]" />
              Continue Learning
            </h2>
            <button
              onClick={() => onNavigateTab('courses')}
              className="text-xs font-semibold text-[#0E9384] hover:text-[#0b7a6d] flex items-center gap-1 cursor-pointer"
            >
              <span>View All In-Progress</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Active Card 1 */}
            {inProgressCourse && (
              <div className="bg-white rounded-2xl p-5 border border-teal-500/10 hover:border-teal-500/30 transition-all shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <img
                      src={inProgressCourse.thumbnail}
                      alt={inProgressCourse.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-teal-100 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#0E9384] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                          {inProgressCourse.specialty}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">Chapter 3 of 5 • 65%</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                        {inProgressCourse.title}
                      </h3>
                      <p className="text-[11px] text-slate-500">Faculty: {inProgressCourse.faculty.name}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                    <div className="bg-[#0E9384] h-full rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500 text-[11px]">Next: SGLT2i Endpoints</span>
                  <button
                    onClick={() => onSelectCourse(inProgressCourse)}
                    className="px-3.5 py-1.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Resume (12m left)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Active Card 2 */}
            {secondaryInProgress && (
              <div className="bg-white rounded-2xl p-5 border border-teal-500/10 hover:border-teal-500/30 transition-all shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <img
                      src={secondaryInProgress.thumbnail}
                      alt={secondaryInProgress.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-teal-100 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                          {secondaryInProgress.specialty}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">Chapter 2 of 4 • 40%</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                        {secondaryInProgress.title}
                      </h3>
                      <p className="text-[11px] text-slate-500">Faculty: {secondaryInProgress.faculty.name}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500 text-[11px]">Next: ADC Toxicity Grading</span>
                  <button
                    onClick={() => onSelectCourse(secondaryInProgress)}
                    className="px-3.5 py-1.5 bg-[#0A192F] hover:bg-[#162C4E] text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Resume (18m left)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Development Goals Matrix & Daily Clinical Dose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Development Goals (Left 6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-teal-500/10 p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#0E9384]" />
                  <h3 className="font-bold text-slate-800 text-sm">Clinical Development Goals</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-teal-50 text-[#0E9384] border border-teal-100 rounded-md font-bold">
                  BOARD ALIGNED
                </span>
              </div>

              <div className="space-y-4">
                {goals.map((g) => (
                  <div key={g.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="text-[#0A192F]">{g.title}</span>
                        <span className="text-[10px] text-slate-400">({g.category})</span>
                      </div>
                      <span className="text-[#0E9384] font-mono">{g.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0E9384] h-full rounded-full transition-all duration-500"
                        style={{ width: `${g.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                      <span>{g.targetLabel}</span>
                      <button
                        onClick={() => onNavigateTab('courses')}
                        className="text-[#0E9384] font-medium hover:underline cursor-pointer"
                      >
                        Target Modules →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-[11px]">
                <GraduationCap className="w-3.5 h-3.5 text-[#0E9384]" />
                Auto-updated upon CME module completions
              </span>
              <button
                onClick={() => onNavigateTab('profile')}
                className="font-bold text-[#0E9384] hover:underline cursor-pointer"
              >
                Edit Goals
              </button>
            </div>
          </div>

          {/* Daily Clinical Dose (Right 6 cols) */}
          <div className="lg:col-span-6 bg-[#0A192F] text-white rounded-2xl p-6 border border-white/10 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-teal-500/10 text-teal-300 border border-teal-500/20 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                  Daily Clinical Dose • 3-Min High-Yield Case
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Specialty: {user.primarySpecialty}</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                Case Decision: Acute Bradycardia & Hypothermia in a Patient on Verapamil and Metoprolol
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                A 67yo male presents to the ED with HR 34 bpm, BP 82/46 mmHg, and severe lethargy after accidental double-dosing of Verapamil ER 240mg and Metoprolol Succinate 100mg. Atropine 1mg produces no response. What is the definitive first-line antidote therapy?
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {[
                  'High-Dose Insulin Euglycemia Therapy (HIET) + IV Calcium Gluconate',
                  'Immediate IV Amiodarone 150mg infusion over 10 minutes',
                  'Transcutaneous pacing only with no pharmacological antidotes',
                  'Oral activated charcoal without airway protection'
                ].map((opt, idx) => {
                  const isSelected = dailySelectedOpt === idx;
                  const isCorrect = idx === 0;

                  let optStyle = 'bg-white/5 border-white/10 hover:border-teal-400/50 text-slate-200';
                  if (dailyDoseAnswered) {
                    if (isCorrect) {
                      optStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-100 font-semibold';
                    } else if (isSelected) {
                      optStyle = 'bg-rose-950/80 border-rose-400 text-rose-200 line-through';
                    } else {
                      optStyle = 'bg-white/5 border-transparent text-slate-500 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={dailyDoseAnswered}
                      onClick={() => {
                        setDailySelectedOpt(idx);
                        setDailyDoseAnswered(true);
                      }}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-colors flex items-start gap-2 cursor-pointer ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {dailyDoseAnswered && (
                <div className="p-3 bg-teal-950/60 rounded-xl border border-teal-500/30 text-xs space-y-1 animate-in fade-in">
                  <div className="font-bold text-teal-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Clinical Evidence Rationale:
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    HIET (regular insulin 1 unit/kg IV bolus + 0.5-1 unit/kg/h infusion with 10% dextrose) combined with IV calcium is the gold-standard therapy for beta-blocker/calcium channel blocker toxicity, restoring myocyte carbohydrate uptake and cardiac inotropy.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Clinical Guideline Alerts & Live Grand Rounds */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 cols: Practice-Changing Guideline & FDA Alerts */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                FDA Safety Alerts & Clinical Practice Updates
              </h2>
              <button
                onClick={() => onNavigateTab('guidelines')}
                className="text-xs font-semibold text-[#0E9384] hover:text-[#0b7a6d] cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {guidelineAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-teal-500/10 shadow-xs hover:border-teal-300 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            alert.severity === 'Practice Changing'
                              ? 'bg-rose-100 text-rose-800'
                              : alert.severity === 'Safety Alert'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-teal-100 text-teal-800'
                          }`}
                        >
                          {alert.severity}
                        </span>
                        <span className="text-[11px] text-slate-400">{alert.issuingBody}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">{alert.title}</h4>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0 font-medium">{alert.date}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{alert.summary}</p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <span className="text-[#0E9384] font-medium text-[11px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#0E9384]" /> Action: {alert.actionItem}
                    </span>
                    {alert.cmeModuleId && (
                      <button
                        onClick={() => {
                          const matching = courses.find((c) => c.id === alert.cmeModuleId);
                          if (matching) onSelectCourse(matching);
                        }}
                        className="font-bold text-[#0E9384] hover:text-[#0b7a6d] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Related CME Module</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 cols: Live Grand Rounds & Quick Actions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0E9384]" />
                Live Grand Rounds & Symposia
              </h2>
              <button
                onClick={() => onNavigateTab('webinars')}
                className="text-xs font-semibold text-[#0E9384] hover:text-[#0b7a6d] cursor-pointer"
              >
                Calendar
              </button>
            </div>

            <div className="space-y-3">
              {webinars.map((web) => (
                <div
                  key={web.id}
                  className="bg-white p-4 rounded-2xl border border-teal-500/10 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        web.status === 'Live Now'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {web.status}
                    </span>
                    <span className="text-xs font-bold text-[#0E9384]">+{web.credits} CME Credits</span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                    {web.title}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{web.date}</span>
                    <span>•</span>
                    <span>{web.timeString}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={web.speaker.avatar}
                        alt={web.speaker.name}
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs text-slate-700 font-medium truncate max-w-[140px]">
                        {web.speaker.name}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenWebinarRoom(web)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        web.status === 'Live Now'
                          ? 'bg-rose-600 hover:bg-rose-700 text-white'
                          : 'bg-teal-50 hover:bg-teal-100 text-[#0E9384] border border-teal-200'
                      }`}
                    >
                      {web.status === 'Live Now' ? 'Join Live Room' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}

              {/* Clean Minimalist Quick Report Card */}
              <div className="bg-teal-50/80 rounded-2xl border border-teal-100 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0E9384] shadow-2xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-teal-900 leading-none">Official CME Transcript</p>
                    <p className="text-[10px] text-teal-700 mt-1">Ready for State Board submission</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('certificates')}
                  className="px-3 py-1.5 bg-white hover:bg-teal-50 rounded-lg border border-teal-200 text-xs font-bold text-teal-800 transition-colors cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended for Your Specialty */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0E9384]" />
                Personalized for {user.name} ({user.primarySpecialty})
              </h2>
              <p className="text-xs text-slate-500">
                Curated based on your licensing requirements, clinical interests, and practice profile.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('courses')}
              className="text-xs font-semibold text-[#0E9384] hover:text-[#0b7a6d] flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialtyRecommended.slice(0, 3).map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="bg-white rounded-2xl border border-teal-500/10 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#0A192F]/80 backdrop-blur-xs text-teal-300 px-2 py-0.5 rounded-md text-[10px] font-bold border border-white/10">
                      {course.credits} CME Credits
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-[#0A192F]/80 backdrop-blur-xs text-slate-200 px-2 py-0.5 rounded-md text-[10px] font-mono border border-white/10">
                      {course.durationMinutes}m
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold text-[#0E9384] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                      {course.format}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#0E9384] transition-colors">
                      {course.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{course.subtitle}</p>
                  </div>
                </div>

                <div className="px-4 py-3 bg-[#F4F9F9] border-t border-teal-500/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium">{course.faculty.name}</span>
                  <span className="font-bold text-[#0E9384] flex items-center gap-1">
                    <span>Start</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
