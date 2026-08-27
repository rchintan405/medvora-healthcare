import React, { useState } from 'react';
import {
  Building2,
  Users,
  Award,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Globe2,
  Stethoscope,
  BookOpen,
  Target,
  LineChart,
  Video,
  FileCheck2,
  Play,
  Zap,
  TrendingUp,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { MedvoraLogo } from './MedvoraLogo';
import { RequestDemoModal } from './RequestDemoModal';

interface B2BLandingPageViewProps {
  onOpenRequestDemo: () => void;
  onLaunchOrgDemo: () => void;
  onSwitchToClinicianPortal: () => void;
  onSwitchToSuperAdmin: () => void;
}

export const B2BLandingPageView: React.FC<B2BLandingPageViewProps> = ({
  onOpenRequestDemo,
  onLaunchOrgDemo,
  onSwitchToClinicianPortal,
  onSwitchToSuperAdmin,
}) => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedAudienceCategory, setSelectedAudienceCategory] = useState<string>('Pharma');

  // ROI Calculator State
  const [physicianCount, setPhysicianCount] = useState<number>(3500);
  const [cmeCreditValue, setCmeCreditValue] = useState<number>(2.5);

  const estimatedEngagedHours = Math.round(physicianCount * 0.78 * cmeCreditValue * 1.2);
  const estimatedCompletionRate = 78.4;
  const estimatedCostSavingVsInPerson = Math.round(physicianCount * 320);

  const targetSectors = [
    {
      id: 'Pharma',
      title: 'Pharmaceutical Companies',
      badge: 'Therapeutic Education',
      desc: 'Deliver independent, accredited medical education on novel mechanisms of action, clinical trial endpoints, and guideline updates.',
      icon: '💊',
      keyMetrics: '12,400+ targeted specialists reached per curriculum'
    },
    {
      id: 'MedTech',
      title: 'Medical Device Companies',
      badge: 'Procedural Excellence',
      desc: 'Train surgeons and interventionalists with multi-angle surgical video masterclasses, anatomical 3D simulations, and device case labs.',
      icon: '🔬',
      keyMetrics: '86% procedural confidence improvement verified'
    },
    {
      id: 'Hospitals',
      title: 'Hospitals & Health Systems',
      badge: 'Institutional Compliance',
      desc: 'Centralize departmental CME tracking, credentialing compliance, and rapid protocol dissemination across hospital networks.',
      icon: '🏥',
      keyMetrics: '99.4% Joint Commission audit readiness'
    },
    {
      id: 'Societies',
      title: 'Medical Societies & Associations',
      badge: 'Member Engagement',
      desc: 'Host interactive Grand Rounds, digital annual symposia, and offer year-round micro-learning credits to your global membership.',
      icon: '🏛️',
      keyMetrics: '3.8x increase in digital member participation'
    },
    {
      id: 'Research',
      title: 'Healthcare Organizations & CROs',
      badge: 'Trial Awareness',
      desc: 'Engage clinical investigators and study site coordinators with protocol education and good clinical practice training.',
      icon: '🌐',
      keyMetrics: '24-minute average session depth across cohorts'
    }
  ];

  const benefitsList = [
    {
      title: 'Reach Targeted Professionals',
      desc: 'Target verified cardiologists, oncologists, neurologists, surgeons, pharmacists, and nurse practitioners across 45+ sub-specialties.',
      icon: Target,
      tag: 'Precision Targeting',
      color: 'from-teal-500/10 to-emerald-500/10 border-teal-500/20'
    },
    {
      title: 'Deliver Educational Content',
      desc: 'Deploy interactive micro-capsules, Grand Rounds live streams, clinical case simulations, and ACCME-accredited video masterclasses.',
      icon: BookOpen,
      tag: 'Interactive Formats',
      color: 'from-sky-500/10 to-indigo-500/10 border-sky-500/20'
    },
    {
      title: 'Measure Engagement',
      desc: 'Real-time telemetry on video drop-off, case quiz choice distributions, replay frequencies, and clinical note bookmarks.',
      icon: LineChart,
      tag: 'Real-Time Telemetry',
      color: 'from-amber-500/10 to-orange-500/10 border-amber-500/20'
    },
    {
      title: 'Track Completion & Compliance',
      desc: 'Automated ACCME PARS synchronization, verifiable cryptographic certificate issuance, and institutional audit export logs.',
      icon: FileCheck2,
      tag: 'Automated Audit Sync',
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20'
    },
    {
      title: 'Understand Audience Interests',
      desc: 'Deep specialty heatmaps and diagnostic question gap analyses to uncover unmet educational needs and practice discrepancies.',
      icon: BarChart3,
      tag: 'Clinical Intelligence',
      color: 'from-purple-500/10 to-pink-500/10 border-purple-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F9F9] text-[#1A2B3B] font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Top Header */}
      <header className="bg-[#0A192F] border-b border-white/10 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <MedvoraLogo variant="light" size="md" />
              <span className="hidden sm:inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Enterprise & Organizations
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onSwitchToClinicianPortal}
                className="hidden md:flex text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                Clinician Portal ↗
              </button>

              <button
                onClick={onLaunchOrgDemo}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-teal-300 border border-teal-400/30 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Open Org Portal</span>
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="px-4 py-1.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0E203C] to-[#122A4E] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          {/* Target Audience Pills */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner max-w-full">
            <span className="text-[11px] font-bold text-teal-300 px-3 py-1 bg-teal-500/20 rounded-xl">
              Engineered For:
            </span>
            {[
              'Pharmaceutical Companies',
              'Medical Device Companies',
              'Hospitals & Health Systems',
              'Medical Societies',
              'Healthcare Organizations',
            ].map((sector) => (
              <span
                key={sector}
                className="text-[11px] font-medium text-slate-200 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 hover:border-teal-400/40 transition-colors"
              >
                {sector}
              </span>
            ))}
          </div>

          {/* Main Headline & Supporting Message */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Build Better Healthcare <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-100 to-sky-300">
                Learning Programs
              </span>
            </h1>
            <p className="text-base sm:text-xl text-teal-100/80 font-normal max-w-2xl mx-auto leading-relaxed">
              Create, deliver, and measure professional education programs for healthcare audiences.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-sm font-bold shadow-lg shadow-teal-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-teal-200" />
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLaunchOrgDemo}
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs"
            >
              <Building2 className="w-4 h-4 text-teal-300" />
              <span>Explore Live Organization Portal</span>
            </button>
          </div>

          {/* Trust Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/10 max-w-4xl mx-auto text-left">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">48,290+</div>
              <div className="text-xs text-teal-200/80 font-medium">Verified Healthcare Professionals</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">78.4%</div>
              <div className="text-xs text-teal-200/80 font-medium">Average Course Completion Rate</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">24 Mins</div>
              <div className="text-xs text-teal-200/80 font-medium">Average Deep Engagement Session</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-300">ACCME</div>
              <div className="text-xs text-teal-200/80 font-medium">Standards for Integrity & Independence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Sectors Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0E9384] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Tailored B2B Healthcare Solutions
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Every Healthcare Education Stakeholder
          </h2>
          <p className="text-sm text-slate-600">
            Whether accelerating therapeutic awareness, procedural competence, or hospital-wide compliance.
          </p>
        </div>

        {/* Sector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {targetSectors.map((sector) => (
            <div
              key={sector.id}
              className="bg-white p-6 rounded-2xl border border-teal-500/10 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="text-3xl">{sector.icon}</div>
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200/60">
                    {sector.badge}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{sector.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{sector.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-[#0E9384] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{sector.keyMetrics}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Core Benefits Grid */}
      <section className="bg-white py-16 border-y border-teal-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Enterprise Benefits & Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Five Pillars of Medvora Enterprise Learning
            </h2>
            <p className="text-sm text-slate-600">
              Transform static medical slides and fragmented webinars into measurable, high-impact digital learning programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsList.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className={`bg-[#F4F9F9]/60 p-6 rounded-2xl border ${benefit.color} space-y-4 hover:bg-white hover:shadow-md transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-teal-500/15 flex items-center justify-center text-[#0E9384]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                      {benefit.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900">{benefit.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{benefit.desc}</p>
                  </div>

                  <div className="pt-2 flex items-center text-xs font-bold text-[#0E9384]">
                    <span>Explore in demo</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              );
            })}

            {/* Custom CTA Card */}
            <div className="bg-gradient-to-br from-[#0A192F] to-[#162C4E] text-white p-6 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Ready for a Custom Program?</h3>
                <p className="text-xs text-teal-100/70 leading-relaxed">
                  Our medical education architects will structure a compliant accredited curriculum tailored to your therapeutic priorities.
                </p>
              </div>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Enterprise Impact / ROI Estimator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="bg-white rounded-3xl border border-teal-500/15 shadow-sm p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-teal-50 text-[#0E9384]">
                  <Sliders className="w-4 h-4" />
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Interactive Healthcare Learning Reach & ROI Calculator
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Estimate verified clinician reach, active learning hours, and cost efficiency versus traditional advisory boards.
              </p>
            </div>

            <button
              onClick={onLaunchOrgDemo}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer self-start"
            >
              See Real Analytics Demo ↗
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Target Healthcare Audience</span>
                  <span className="text-[#0E9384] font-black">{physicianCount.toLocaleString()} Specialists</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="20000"
                  step="500"
                  value={physicianCount}
                  onChange={(e) => setPhysicianCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0E9384]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>500 HCPs</span>
                  <span>10,000 HCPs</span>
                  <span>20,000+ Global</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">Curriculum Accredited CME Value</span>
                  <span className="text-[#0E9384] font-black">{cmeCreditValue.toFixed(1)} AMA PRA Credits</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6.0"
                  step="0.5"
                  value={cmeCreditValue}
                  onChange={(e) => setCmeCreditValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0E9384]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0.5 Credits (Micro)</span>
                  <span>3.0 Credits (Modular)</span>
                  <span>6.0 Credits (Masterclass)</span>
                </div>
              </div>

              <div className="p-4 bg-[#F4F9F9] rounded-xl border border-teal-500/10 text-xs space-y-1.5 text-slate-600">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0E9384]" />
                  <span>Verified Credentials & License Verification Included</span>
                </div>
                <p className="text-[11px]">
                  All enrolled clinicians are verified via state medical board databases, NPI registries, and institutional emails before issuing ACCME PARS credits.
                </p>
              </div>
            </div>

            {/* Calculated Results */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0A192F] to-[#162C4E] text-white p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-500/20 px-2.5 py-0.5 rounded-full">
                  Estimated Program Outcomes
                </span>
                <h4 className="text-xl font-bold text-white">Projected Enterprise Impact</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-xs text-teal-100/70">Engaged Clinicians</span>
                  <div className="text-2xl font-black text-white">
                    {Math.round(physicianCount * 0.784).toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">78.4% benchmark</span>
                </div>

                <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-xs text-teal-100/70">Total Learning Hours</span>
                  <div className="text-2xl font-black text-teal-300">
                    {estimatedEngagedHours.toLocaleString()} hrs
                  </div>
                  <span className="text-[10px] text-teal-200 font-semibold">Verified clinical depth</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">Cost Savings vs In-Person Symposia</span>
                <span className="text-base font-extrabold text-emerald-400">
                  ~${estimatedCostSavingVsInPerson.toLocaleString()} USD
                </span>
              </div>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full py-3 bg-[#0E9384] hover:bg-[#0b7a6d] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>Request Custom Program Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-[#0A192F] to-[#162C4E] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Build Better Healthcare Learning Programs?
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/80 max-w-xl mx-auto leading-relaxed">
            Join leading pharmaceutical companies, health systems, and specialty medical societies partnering with Medvora.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="px-8 py-3.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLaunchOrgDemo}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer border border-white/20"
            >
              Open Organization Dashboard Demo
            </button>
          </div>
        </div>
      </section>

      {/* Request Demo Modal */}
      <RequestDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onSuccess={() => {
          // Keep user informed
        }}
      />
    </div>
  );
};
