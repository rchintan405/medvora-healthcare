import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  Target,
  Award,
  Stethoscope,
  BookOpen,
  Brain,
  Zap,
  ShieldCheck,
  Activity,
  HeartPulse,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MedvoraLogo } from './MedvoraLogo';
import {
  OnboardingRole,
  OnboardingSpecialty,
  OnboardingInterest,
  OnboardingGoal,
  PreferredLearningTime,
  OnboardingPreferences,
  UserProfile,
} from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  initialUserData: {
    name: string;
    email: string;
    role?: OnboardingRole;
  };
  onComplete: (preferences: OnboardingPreferences) => void;
  onClose?: () => void;
}

const ROLES: { id: OnboardingRole; label: string; desc: string; icon: string }[] = [
  { id: 'Doctor', label: 'Doctor (MD / DO)', desc: 'Attending, fellow, resident, or general practitioner', icon: '🩺' },
  { id: 'Nurse', label: 'Nurse / NP (RN / DNP)', desc: 'Registered nurse, nurse practitioner, or CNS', icon: '💉' },
  { id: 'Pharmacist', label: 'Clinical Pharmacist', desc: 'PharmD, BCPS, clinical specialist', icon: '💊' },
  { id: 'Researcher', label: 'Medical Researcher', desc: 'PhD, clinical trialist, translational scientist', icon: '🔬' },
  { id: 'Allied Health', label: 'Allied Health / PA', desc: 'Physician assistant, technologist, therapist', icon: '📋' },
];

const SPECIALTIES: { id: OnboardingSpecialty; label: string; icon: string }[] = [
  { id: 'Cardiology', label: 'Cardiology', icon: '❤️' },
  { id: 'Oncology', label: 'Oncology', icon: '🧬' },
  { id: 'Neurology', label: 'Neurology', icon: '🧠' },
  { id: 'Dermatology', label: 'Dermatology', icon: '🔬' },
  { id: 'Pediatrics', label: 'Pediatrics', icon: '👶' },
  { id: 'Emergency Medicine', label: 'Emergency Medicine', icon: '⚡' },
  { id: 'Radiology', label: 'Radiology', icon: '🩻' },
  { id: 'Psychiatry', label: 'Psychiatry', icon: '🌱' },
  { id: 'Primary Care', label: 'Primary Care', icon: '🏥' },
  { id: 'Surgery', label: 'Surgery', icon: '✂️' },
];

const INTERESTS: { id: OnboardingInterest; label: string; desc: string }[] = [
  { id: 'Clinical Skills', label: 'Clinical Skills', desc: 'Bedside diagnostics, physical exams, and procedural acumen.' },
  { id: 'Digital Health', label: 'Digital Health', desc: 'Telemedicine, EHR optimizations, and remote patient monitoring.' },
  { id: 'Leadership', label: 'Leadership', desc: 'Healthcare management, interdisciplinary team dynamics, and quality improvement.' },
  { id: 'Research', label: 'Research', desc: 'Clinical trial design, statistical interpretation, and translational benchwork.' },
  { id: 'Patient Communication', label: 'Patient Communication', desc: 'Shared decision-making, health literacy, and empathy.' },
  { id: 'AI in Healthcare', label: 'AI in Healthcare', desc: 'Clinical LLMs, computer vision in radiology, and AI-assisted workflows.' },
];

const GOALS: { id: OnboardingGoal; label: string }[] = [
  { id: 'Improve clinical knowledge', label: 'Improve clinical knowledge' },
  { id: 'Stay current', label: 'Stay current with practice-changing trials' },
  { id: 'Earn professional credits', label: 'Earn accredited CME / CPD credits' },
  { id: 'Develop leadership skills', label: 'Develop healthcare leadership skills' },
  { id: 'Explore emerging healthcare technology', label: 'Explore emerging healthcare technology' },
];

const LEARNING_TIMES: { id: PreferredLearningTime; label: string; desc: string; icon: string }[] = [
  { id: '5–10 min', label: '5–10 min', desc: 'Micro-Capsules (Quick trial pearls between patients)', icon: '⚡' },
  { id: '15–30 min', label: '15–30 min', desc: 'Focused Case Labs (Interactive decision branching)', icon: '⏱️' },
  { id: '30–60 min', label: '30–60 min', desc: 'Clinical Masterclasses (Comprehensive deep dives)', icon: '📚' },
  { id: '1+ hour', label: '1+ hour', desc: 'Grand Rounds & Surgical Labs (Full symposiums)', icon: '🎓' },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  initialUserData,
  onComplete,
}) => {
  const [step, setStep] = useState<number>(1);

  // Selections
  const [role, setRole] = useState<OnboardingRole>(initialUserData.role || 'Doctor');
  const [specialty, setSpecialty] = useState<OnboardingSpecialty>('Cardiology');
  const [interests, setInterests] = useState<OnboardingInterest[]>([
    'Clinical Skills',
    'AI in Healthcare',
  ]);
  const [goals, setGoals] = useState<OnboardingGoal[]>([
    'Improve clinical knowledge',
    'Stay current',
    'Earn professional credits',
  ]);
  const [learningTime, setLearningTime] = useState<PreferredLearningTime>('15–30 min');

  if (!isOpen) return null;

  const toggleInterest = (item: OnboardingInterest) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleGoal = (item: OnboardingGoal) => {
    setGoals((prev) =>
      prev.includes(item) ? prev.filter((g) => g !== item) : [...prev, item]
    );
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else if (step === 5) {
      // Trigger celebratory confetti on reaching step 6 (Completion)
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0E9384', '#0A192F', '#38BDF8', '#34D399'],
        });
      } catch (e) {
        // Safe fallback
      }
      setStep(6);
    }
  };

  const handleFinish = () => {
    onComplete({
      role,
      specialty,
      interests,
      goals,
      preferredLearningTime: learningTime,
      completedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/10 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#1A2B3B]">
        {/* Header with Progress Steps */}
        <div className="bg-[#0A192F] px-6 py-5 text-white border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <MedvoraLogo variant="light" size="sm" />
            <span className="text-xs font-mono text-teal-300 bg-teal-500/20 px-2.5 py-0.5 rounded-lg border border-teal-500/30">
              {step <= 5 ? `Step ${step} of 5` : 'Complete'}
            </span>
          </div>

          {/* Step Progress Bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#0E9384] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (step / 5) * 100)}%` }}
            />
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
          {/* STEP 1: Professional Role */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h2 className="text-xl font-bold text-[#0A192F]">What is your primary professional role?</h2>
                <p className="text-xs text-slate-500 mt-1">
                  We'll customize your credit accreditation types and clinical complexity accordingly.
                </p>
              </div>

              <div className="space-y-2.5">
                {ROLES.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      role === r.id
                        ? 'bg-teal-50/80 border-[#0E9384] shadow-xs'
                        : 'bg-[#F4F9F9] border-teal-500/10 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{r.icon}</span>
                      <div>
                        <div className="font-bold text-sm text-[#0A192F]">{r.label}</div>
                        <div className="text-xs text-slate-500">{r.desc}</div>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        role === r.id ? 'border-[#0E9384] bg-[#0E9384] text-white' : 'border-slate-300'
                      }`}
                    >
                      {role === r.id && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Specialty */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h2 className="text-xl font-bold text-[#0A192F]">Select your primary specialty</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Your feed and daily clinical pearls will focus on current trials in this domain.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SPECIALTIES.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSpecialty(s.id)}
                    className={`p-3.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                      specialty === s.id
                        ? 'bg-teal-50/80 border-[#0E9384] shadow-xs'
                        : 'bg-[#F4F9F9] border-teal-500/10 hover:border-teal-300'
                    }`}
                  >
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-bold text-xs sm:text-sm text-[#0A192F] truncate">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Interests */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h2 className="text-xl font-bold text-[#0A192F]">Select your clinical interests</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Choose all topics you'd like to explore in your personalized development track.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTERESTS.map((item) => {
                  const isSelected = interests.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleInterest(item.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-teal-50/80 border-[#0E9384] shadow-xs'
                          : 'bg-[#F4F9F9] border-teal-500/10 hover:border-teal-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs sm:text-sm text-[#0A192F]">{item.label}</span>
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isSelected ? 'border-[#0E9384] bg-[#0E9384] text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Goals */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h2 className="text-xl font-bold text-[#0A192F]">What are your core learning goals?</h2>
                <p className="text-xs text-slate-500 mt-1">
                  We'll configure milestone alerts and automated reporting to match your objectives.
                </p>
              </div>

              <div className="space-y-2.5">
                {GOALS.map((g) => {
                  const isSelected = goals.includes(g.id);
                  return (
                    <div
                      key={g.id}
                      onClick={() => toggleGoal(g.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-teal-50/80 border-[#0E9384] shadow-xs'
                          : 'bg-[#F4F9F9] border-teal-500/10 hover:border-teal-300'
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-sm text-[#0A192F]">{g.label}</span>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#0E9384] bg-[#0E9384] text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Preferred learning time */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h2 className="text-xl font-bold text-[#0A192F]">What is your preferred learning time?</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Select your typical study window so we deliver formats that fit your clinical routine.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LEARNING_TIMES.map((lt) => (
                  <div
                    key={lt.id}
                    onClick={() => setLearningTime(lt.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      learningTime === lt.id
                        ? 'bg-teal-50/80 border-[#0E9384] shadow-xs'
                        : 'bg-[#F4F9F9] border-teal-500/10 hover:border-teal-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{lt.icon}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            learningTime === lt.id ? 'border-[#0E9384] bg-[#0E9384] text-white' : 'border-slate-300'
                          }`}
                        >
                          {learningTime === lt.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                      <div className="font-bold text-sm text-[#0A192F]">{lt.label}</div>
                      <p className="text-[11px] text-slate-500 mt-1">{lt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: Completion Screen */}
          {step === 6 && (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#0E9384] border border-teal-100 flex items-center justify-center mx-auto shadow-sm">
                <Sparkles className="w-8 h-8 text-[#0E9384]" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-[#0A192F]">
                  Your personalized learning experience is ready.
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  We've assembled a personalized curriculum for your role as <strong>{role}</strong> in{' '}
                  <strong className="text-[#0E9384]">{specialty}</strong> with {learningTime} micro-modules.
                </p>
              </div>

              {/* Summary Pill Matrix */}
              <div className="bg-[#F4F9F9] rounded-2xl p-4 border border-teal-500/10 max-w-md mx-auto text-left space-y-2.5">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-teal-500/10">
                  <span className="text-slate-500">Track:</span>
                  <span className="font-bold text-[#0A192F]">{specialty} Specialist</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-teal-500/10">
                  <span className="text-slate-500">Key Interests:</span>
                  <span className="font-bold text-[#0E9384]">{interests.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Pacing:</span>
                  <span className="font-bold text-slate-800">{learningTime} / day</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full max-w-md py-3.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2 mx-auto"
              >
                <span>Launch My Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {step <= 5 && (
          <div className="px-6 py-4 bg-[#F4F9F9] border-t border-teal-500/10 flex items-center justify-between">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{step === 5 ? 'Generate My Plan' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
