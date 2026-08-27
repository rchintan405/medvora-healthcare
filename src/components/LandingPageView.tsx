import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Play,
  Calendar,
  Stethoscope,
  TrendingUp,
  Brain,
  Star,
  Activity,
  Zap,
  Globe,
  Clock,
  Building2,
  ChevronRight,
  HeartPulse,
  Dna,
  Lock,
  Layers,
  ChevronDown
} from 'lucide-react';
import { MedvoraLogo } from './MedvoraLogo';
import { Course, Specialty } from '../types';
import { DEMO_TESTIMONIALS, SPECIALTY_CATEGORIES } from '../data/mockData';

interface LandingPageViewProps {
  courses: Course[];
  onExploreLearning: () => void;
  onSelectCourse: (course: Course) => void;
  onOpenAuth: (initialMode: 'login' | 'register') => void;
  onQuickDemoLogin: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  courses,
  onExploreLearning,
  onSelectCourse,
  onOpenAuth,
  onQuickDemoLogin,
}) => {
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState<string>('All');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const featuredCourses = selectedSpecialtyFilter === 'All'
    ? courses.slice(0, 4)
    : courses.filter((c) => c.specialty === selectedSpecialtyFilter).slice(0, 4);

  const stats = [
    { value: '50K+', label: 'Healthcare Professionals', icon: Users },
    { value: '1,200+', label: 'Accredited CME Modules', icon: BookOpen },
    { value: '40+', label: 'Medical Specialties', icon: Stethoscope },
    { value: '25+', label: 'Countries Represented', icon: Globe },
  ];

  const whyMedvoraPoints = [
    {
      icon: ShieldCheck,
      title: 'ACCME-Accredited Rigor',
      description: 'Every module undergoes multi-disciplinary peer review and fulfills state medical board licensure and recertification requirements.',
      color: 'text-teal-600 bg-teal-50 border-teal-100',
    },
    {
      icon: Clock,
      title: 'High-Yield Micro-Capsules',
      description: 'Designed for busy clinical schedules: 10–20 minute hyper-focused video lessons that extract core trial takeaways with zero fluff.',
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      icon: Brain,
      title: 'AI Clinical Case Assistant',
      description: 'Interactive evidence-grounded AI tutor that drills case vignettes, answers pharmacology questions, and cites published guidelines.',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      icon: TrendingUp,
      title: 'Personalized Skill Paths',
      description: 'Dynamic learning trajectories tailored to your subspecialty, clinical gaps, and annual CME target with verifiable instant certificates.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
  ];

  const faqs = [
    {
      q: 'Are Medvora courses accredited for CME / CE credit?',
      a: 'Yes. Medvora is an accredited provider offering AMA PRA Category 1 Credit™, EACCME, ANCC Nursing Contact Hours, and ACPE Pharmacy credits. Certificates are verifiable online with cryptographic audit IDs.',
    },
    {
      q: 'How does personalized learning work on Medvora?',
      a: 'During onboarding, you specify your role, specialty, practice interests, and available time budget (e.g. 5–10 min). Medvora curates high-yield updates and monitors your clinical development goals automatically.',
    },
    {
      q: 'Can hospitals and health systems track team compliance?',
      a: 'Yes. Our enterprise health system portal provides real-time departmental dashboards, automated credential sync, and audit-ready reporting for entire clinical departments.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F9F9] text-[#1A2B3B] font-sans antialiased">
      {/* Public Header */}
      <header className="sticky top-0 z-50 bg-[#0A192F] border-b border-white/10 text-white backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-10">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="cursor-pointer focus:outline-hidden"
              >
                <MedvoraLogo variant="light" size="lg" />
              </button>

              {/* Public Nav links */}
              <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-teal-100/80">
                <a href="#why-medvora" className="hover:text-white transition-colors">Platform</a>
                <a href="#featured-learning" className="hover:text-white transition-colors">Courses</a>
                <a href="#specialties" className="hover:text-white transition-colors">Specialties</a>
                <a href="#personalized" className="hover:text-white transition-colors">Personalized Learning</a>
                <a href="#organizations" className="hover:text-white transition-colors">For Organizations</a>
                <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
              </nav>
            </div>

            {/* Auth Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-teal-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0E9384] hover:bg-[#0b7a6d] text-white shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onQuickDemoLogin}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-xl text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-teal-300 border border-teal-500/30 transition-all cursor-pointer"
                title="Instantly preview authenticated clinician experience"
              >
                <Zap className="w-3 h-3 fill-teal-300" />
                <span>Quick Demo</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0E2340] to-[#0A192F] text-white pt-14 pb-24 border-b border-teal-500/20">
        {/* Subtle grid accent background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#0E9384_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Next-Generation Continuing Medical Education</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Smarter Learning for <br className="hidden sm:inline" />
              <span className="text-[#0E9384]">Better Care</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-teal-100/80 leading-relaxed font-normal max-w-2xl mx-auto">
              Stay current with trusted medical education, expert insights, and personalized learning designed around your professional goals.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={onExploreLearning}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-[#0E9384] hover:bg-[#0b7a6d] text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Learning</span>
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Join Medvora</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust badge line */}
            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-teal-100/60 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0E9384]" /> ACCME-Accredited Provider
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0E9384]" /> Peer-Reviewed Clinical Evidence
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0E9384]" /> Verifiable CME Transcripts
              </span>
            </div>
          </div>

          {/* SaaS Learning Dashboard Visual Representation */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="bg-[#071324] rounded-2xl p-2 sm:p-3 border border-teal-500/20 shadow-2xl">
              <div className="bg-[#0A192F] rounded-xl overflow-hidden border border-white/10">
                {/* Browser top-bar */}
                <div className="px-4 py-3 bg-[#071324] border-b border-white/10 flex items-center justify-between text-xs text-teal-100/70">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[11px] text-teal-100/50">app.medvora.com/dashboard/maya-patel-md</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-md font-medium border border-teal-500/30">
                      Live Telemetry
                    </span>
                  </div>
                </div>

                {/* Dashboard Showcase Mock */}
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Greeting & Quick metrics */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md">
                          Cardiology Track
                        </span>
                        <span className="text-xs text-teal-100/70">AMA PRA Category 1 Credit™</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">Good morning, Dr. Maya Patel</h3>
                      <p className="text-xs text-teal-100/70">3.5 credits earned this month • 72% toward annual board target</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-center">
                        <div className="text-[10px] text-teal-100/60 uppercase">Completed</div>
                        <div className="text-sm font-bold text-teal-300">14 Modules</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-center">
                        <div className="text-[10px] text-teal-100/60 uppercase">Streak</div>
                        <div className="text-sm font-bold text-amber-300 flex items-center gap-1 justify-center">
                          <Zap className="w-3.5 h-3.5 fill-amber-300" /> 12 Days
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Continue Learning Card in mockup */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 bg-gradient-to-r from-teal-950/60 to-slate-900/80 border border-teal-500/30 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-bold text-teal-400">Continue Learning</span>
                          <span className="text-teal-200 font-mono text-[11px]">65% Completed</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">
                          Heart Failure with Preserved Ejection Fraction (HFpEF): 2025 Guideline Dual Pathway
                        </h4>
                        <p className="text-xs text-teal-100/70 mb-3">
                          Chapter 3: SGLT2i & GLP-1 RA Clinical Trial Endpoint Titration
                        </p>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-3">
                          <div className="bg-[#0E9384] h-full rounded-full" style={{ width: '65%' }} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                        <span className="text-slate-300">Faculty: Dr. Sarah Jenkins (Johns Hopkins)</span>
                        <button
                          onClick={onExploreLearning}
                          className="px-3 py-1.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Resume (12m left)</span>
                        </button>
                      </div>
                    </div>

                    {/* AI Assistant Callout in mockup */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center">
                            <Brain className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-white">Medvora AI Tutor</span>
                        </div>
                        <p className="text-xs text-teal-100/80 leading-relaxed mb-2">
                          "Dr. Patel, a new practice guideline was released today on SGLT2i perioperative hold times."
                        </p>
                        <span className="text-[10px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md inline-block border border-teal-500/20">
                          Evidence Citation: ACC 2025
                        </span>
                      </div>
                      <button
                        onClick={onQuickDemoLogin}
                        className="mt-3 w-full py-1.5 bg-white/10 hover:bg-white/20 text-teal-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Drill Clinical Vignette</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/10">
            {stats.map((st, i) => {
              const Icon = st.icon;
              return (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center transition-transform hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 mx-auto flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {st.value}
                  </div>
                  <div className="text-xs text-teal-100/70 font-medium mt-1">
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Why Medvora */}
      <section id="why-medvora" className="py-20 bg-white border-b border-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#0E9384] bg-teal-50 px-3 py-1 rounded-full border border-teal-100 uppercase tracking-wider">
              The Medvora Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0A192F] mt-3 tracking-tight">
              Designed for Clinicians by Leading Faculty
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Traditional CME is outdated, generic, and time-consuming. Medvora reimagines clinical learning with precision micro-courses and verified outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyMedvoraPoints.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F4F9F9] rounded-2xl p-6 border border-teal-500/10 hover:border-teal-500/30 transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${pt.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#0A192F] mb-2">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Featured Learning */}
      <section id="featured-learning" className="py-20 bg-[#F4F9F9] border-b border-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#0E9384] bg-teal-50 px-3 py-1 rounded-full border border-teal-100 uppercase tracking-wider">
                Curated Curriculum
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0A192F] mt-2 tracking-tight">
                Featured Clinical Masterclasses
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore evidence-grounded modules taught by renowned chairs and leading investigators.
              </p>
            </div>

            {/* Specialty Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Cardiology', 'Oncology', 'Neurology', 'Critical Care'].map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialtyFilter(spec)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedSpecialtyFilter === spec
                      ? 'bg-[#0E9384] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-teal-50 border border-teal-500/10'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="bg-white rounded-2xl overflow-hidden border border-teal-500/10 hover:border-teal-500/30 hover:shadow-lg transition-all cursor-pointer flex flex-col group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A192F]/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/20">
                    {course.specialty}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#0E9384] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs">
                    {course.credits} CME
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1 font-semibold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {course.rating.toFixed(2)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.durationMinutes} min
                      </span>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-[#0A192F] line-clamp-2 mb-2 group-hover:text-[#0E9384] transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                      {course.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.faculty.avatar}
                        alt={course.faculty.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover border border-teal-500/20"
                      />
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[130px]">
                        {course.faculty.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#0E9384] flex items-center gap-0.5">
                      Start <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={onExploreLearning}
              className="px-6 py-3 bg-[#0A192F] hover:bg-[#162C4E] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
            >
              <span>Browse All {courses.length} Accredited Modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Section: Healthcare Specialties */}
      <section id="specialties" className="py-20 bg-white border-b border-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#0E9384] bg-teal-50 px-3 py-1 rounded-full border border-teal-100 uppercase tracking-wider">
              Comprehensive Coverage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0A192F] mt-3 tracking-tight">
              40+ Healthcare Specialties
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From subspecialty clinical cardiology to pediatric emergency protocols, find targeted education for your exact scope of practice.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SPECIALTY_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                onClick={onExploreLearning}
                className="bg-[#F4F9F9] hover:bg-teal-50/70 border border-teal-500/10 hover:border-[#0E9384]/40 rounded-2xl p-4 transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-teal-500/10 flex items-center justify-center text-[#0E9384] mb-3 group-hover:bg-[#0E9384] group-hover:text-white transition-colors">
                  <Activity className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#0A192F] group-hover:text-[#0E9384] transition-colors mb-1">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mb-2 leading-relaxed">
                  {cat.description}
                </p>
                <span className="text-[10px] font-bold text-[#0E9384] bg-teal-500/10 px-2 py-0.5 rounded-md">
                  {cat.count} Modules
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Personalized Learning */}
      <section id="personalized" className="py-20 bg-[#F4F9F9] border-b border-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-[#0E9384] bg-teal-50 px-3 py-1 rounded-full border border-teal-100 uppercase tracking-wider">
                Intelligent Personalization
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight leading-tight">
                Education Tailored to Your Role, Schedule & Practice Gaps
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                No two clinician schedules are alike. Medvora constantly calibrates your personalized feed based on your specialty, self-declared practice goals, and clinical trial updates.
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    title: 'Adaptive Micro-Dosing (5–10 min)',
                    desc: 'Quick clinical pearls and trial syntheses optimized for between-patient consults.',
                  },
                  {
                    title: 'Interactive Clinical Checkpoint Quizzes',
                    desc: 'Real-time decision branching that reinforces clinical trial evidence retention.',
                  },
                  {
                    title: 'Automated State Board CME Auditing',
                    desc: 'Track exact hours required by your medical licensing board with single-click transcript export.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-teal-500/10">
                    <div className="w-6 h-6 rounded-md bg-[#0E9384] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A192F]">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-6 py-3 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Build Your Personalized Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Skill Tracker */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-teal-500/10 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="font-bold text-base text-[#0A192F]">Clinical Development Matrix</h3>
                  <p className="text-xs text-slate-500">Dr. Maya Patel • Cardiology Track</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold bg-teal-50 text-[#0E9384] border border-teal-100 rounded-lg">
                  72% Overall Target
                </span>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Cardiology Knowledge (HFpEF & TAVR)', progress: 72, color: 'bg-[#0E9384]' },
                  { name: 'Evidence-Based Pharmacology', progress: 58, color: 'bg-teal-600' },
                  { name: 'Clinical Communication & Shared Decisions', progress: 45, color: 'bg-blue-600' },
                  { name: 'Digital Health & AI in Medicine', progress: 30, color: 'bg-indigo-600' },
                ].map((skill, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#0A192F]">{skill.name}</span>
                      <span className="text-slate-600">{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`${skill.color} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#F4F9F9] rounded-xl border border-teal-500/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0E9384]" />
                  <span className="font-semibold text-slate-700">Next Milestone: Fellow Master Certificate</span>
                </div>
                <span className="text-[11px] font-bold text-[#0E9384]">2 Modules Away</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: For Organizations */}
      <section id="organizations" className="py-20 bg-[#0A192F] text-white border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-teal-300 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/30 uppercase tracking-wider">
                Enterprise Health Systems
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Empower Hospital Networks & Clinical Departments
              </h2>
              <p className="text-sm sm:text-base text-teal-100/70 leading-relaxed">
                Streamline institutional CME compliance, assign protocol updates, and verify staff credentialing across thousands of physicians, nurses, and pharmacists in real-time.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                  <Building2 className="w-5 h-5 text-teal-300 mb-2" />
                  <h4 className="font-bold text-sm text-white">Centralized Compliance</h4>
                  <p className="text-xs text-teal-100/60 mt-1">Audit-ready reporting for Joint Commission & hospital boards.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                  <Layers className="w-5 h-5 text-teal-300 mb-2" />
                  <h4 className="font-bold text-sm text-white">Custom Hospital Pathways</h4>
                  <p className="text-xs text-teal-100/60 mt-1">Upload institutional protocols alongside accredited CME courses.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onQuickDemoLogin}
                  className="px-6 py-3 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Explore Enterprise Portal</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Org Dashboard Preview */}
            <div className="bg-[#071324] border border-white/10 rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
                <div>
                  <div className="font-bold text-white">Pacific Northwest Health System</div>
                  <div className="text-teal-100/60 text-[11px]">Cardiology & ICU Departments (148 Clinicians)</div>
                </div>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg">
                  88.4% Compliant
                </span>
              </div>

              <div className="space-y-3 mt-4">
                {[
                  { name: 'Dr. Sarah Chen, MD', dept: 'Cardiology', credits: '38.5 / 50', status: 'Compliant', statusColor: 'text-emerald-400' },
                  { name: 'Elena Garcia, APRN', dept: 'Coronary ICU', credits: '31.0 / 40', status: 'Compliant', statusColor: 'text-emerald-400' },
                  { name: 'Dr. David Zhang, MD', dept: 'Fellowship', credits: '18.0 / 50', status: 'At Risk', statusColor: 'text-amber-400' },
                ].map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-xs border border-white/5">
                    <div>
                      <div className="font-semibold text-slate-200">{member.name}</div>
                      <div className="text-[10px] text-teal-100/50">{member.dept}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-teal-300 font-bold">{member.credits} CME</div>
                      <div className={`text-[10px] font-bold ${member.statusColor}`}>{member.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Testimonials */}
      <section id="testimonials" className="py-20 bg-white border-b border-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#0E9384] bg-teal-50 px-3 py-1 rounded-full border border-teal-100 uppercase tracking-wider">
              Trusted by Clinicians
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0A192F] mt-3 tracking-tight">
              What Healthcare Leaders Are Saying
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Over 50,000 physicians, advanced practice providers, and researchers trust Medvora for daily evidence updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-[#F4F9F9] rounded-2xl p-6 border border-teal-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(test.rating)].map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-teal-500/10">
                  <img
                    src={test.avatar}
                    alt={test.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#0E9384]/30"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0A192F]">{test.author}</h4>
                    <p className="text-[11px] text-slate-500">{test.role}</p>
                    <p className="text-[10px] text-[#0E9384] font-semibold">{test.institution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#F4F9F9] border-b border-teal-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0A192F]">Frequently Asked Questions</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Everything you need to know about Medvora CME accreditation and access.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-teal-500/10 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#0A192F] hover:text-[#0E9384] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === i ? 'transform rotate-180 text-[#0E9384]' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-[#0A192F] to-[#162C4E] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Elevate Your Clinical Practice Today
          </h2>
          <p className="text-sm sm:text-base text-teal-100/80 max-w-xl mx-auto">
            Join over 50,000 healthcare professionals building clinical mastery with accredited micro-learning and evidence-grounded simulations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenAuth('register')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-[#0E9384] hover:bg-[#0b7a6d] text-white shadow-lg transition-all cursor-pointer"
            >
              Get Started for Free
            </button>
            <button
              onClick={onQuickDemoLogin}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
            >
              Experience Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="bg-[#071324] border-t border-white/10 text-slate-400 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-1">
              <MedvoraLogo variant="light" size="md" />
              <p className="text-[11px] text-teal-100/60 leading-relaxed">
                Smarter learning for better care. ACCME-accredited medical education platform.
              </p>
            </div>

            <div>
              <h5 className="text-white font-bold text-xs mb-3">Platform</h5>
              <ul className="space-y-2 text-[11px] text-slate-400">
                <li className="hover:text-teal-300 cursor-pointer" onClick={onExploreLearning}>CME Module Catalog</li>
                <li className="hover:text-teal-300 cursor-pointer" onClick={onExploreLearning}>Grand Rounds & Webinars</li>
                <li className="hover:text-teal-300 cursor-pointer" onClick={onExploreLearning}>Clinical Case Forum</li>
                <li className="hover:text-teal-300 cursor-pointer" onClick={onExploreLearning}>Verifiable Certificates</li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold text-xs mb-3">Specialties</h5>
              <ul className="space-y-2 text-[11px] text-slate-400">
                <li className="hover:text-teal-300 cursor-pointer" onClick={onExploreLearning}>Cardiology</li>
                <li className="hover:text-teal-300 cursor-pointer" onClick={onExploreLearning}>Oncology</li>
                <li className="hover:text-teal-300 cursor-pointer" onClick={onExploreLearning}>Neurology</li>
                <li className="hover:text-teal-300 cursor-pointer" onClick={onExploreLearning}>Critical Care</li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold text-xs mb-3">Accreditation & Compliance</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
                Medvora designates enduring materials for AMA PRA Category 1 Credits™.
              </p>
              <div className="text-[10px] text-teal-300 bg-teal-500/10 p-2 rounded-lg border border-teal-500/20">
                ACCME Provider #00094821
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <p>© {new Date().getFullYear()} Medvora Inc. All rights reserved.</p>
            <p>For accredited healthcare professional educational use only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
