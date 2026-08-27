import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  XCircle,
  Award,
  AlertTriangle,
  FileText,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { Course, UserProfile, Certificate } from '../types';

interface AssessmentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  user: UserProfile;
  onCompleteCme: (certificate: Certificate) => void;
}

export const AssessmentQuizModal: React.FC<AssessmentQuizModalProps> = ({
  isOpen,
  onClose,
  course,
  user,
  onCompleteCme,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'case' | 'quiz'>('case');
  const [claimed, setClaimed] = useState(false);

  if (!isOpen) return null;

  const totalQuestions = course.quiz.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    course.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100),
    };
  };

  const score = calculateScore();
  const passed = submitted && score.percentage >= 70;

  const handleSubmit = () => {
    setSubmitted(true);
    const result = calculateScore();
    if (result.percentage >= 70) {
      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0d9488', '#0284c7', '#6366f1', '#10b981'],
      });
    }
  };

  const handleClaimCertificate = () => {
    const newCert: Certificate = {
      id: `cert-med-${Date.now()}`,
      courseId: course.id,
      courseTitle: course.title,
      recipientName: user.name,
      recipientLicense: user.licenseNumber || 'MD-CA-948210',
      recipientSpecialty: user.primarySpecialty,
      creditsEarned: course.credits,
      accreditationType: course.accreditationType,
      accreditationBody: course.accreditationBody,
      issueDate: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      verificationCode: `MED-CME-${Math.floor(1000 + Math.random() * 9000)}-VERIFIED`,
      accreditationStatement: `Medvora is accredited by the ${course.accreditationBody} to provide continuing medical education for healthcare professionals. Medvora designates this enduring material for a maximum of ${course.credits.toFixed(2)} ${course.accreditationType}.`,
      facultyName: course.faculty.name,
      facultyTitle: course.faculty.title,
    };

    setClaimed(true);
    onCompleteCme(newCert);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setClaimed(false);
    setActiveTab('quiz');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/10 w-full max-w-3xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0A192F] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg">
                Accredited CME Assessment
              </span>
              <span className="text-xs text-teal-100/70">
                Passing Score: 70% • {course.credits} Credits
              </span>
            </div>
            <h2 className="text-base font-semibold line-clamp-1 text-white">
              {course.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-teal-100/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-teal-500/10 bg-[#F4F9F9] px-6 shrink-0">
          {course.caseVignette && (
            <button
              onClick={() => setActiveTab('case')}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'case'
                  ? 'border-[#0E9384] text-[#0E9384] font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-[#0E9384]" />
              Patient Case Vignette & Lab Panel
            </button>
          )}
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-[#0E9384] text-[#0E9384] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-[#0E9384]" />
            Board-Style Questions ({answeredCount}/{totalQuestions})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[#1A2B3B]">
          {activeTab === 'case' && course.caseVignette && (
            <div className="space-y-6">
              {/* Patient Banner */}
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0E9384] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {course.caseVignette.patientGender === 'Female' ? 'F' : 'M'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {course.caseVignette.patientAge}-Year-Old {course.caseVignette.patientGender}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">
                      Chief Complaint: {course.caseVignette.chiefComplaint}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-white text-slate-700 px-2.5 py-1 rounded-md border border-teal-500/10 font-medium">
                    Simulated Clinical Chart
                  </span>
                </div>
              </div>

              {/* HPI */}
              <div className="bg-[#F4F9F9] p-4 rounded-xl border border-teal-500/10">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  History of Present Illness (HPI)
                </h5>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {course.caseVignette.historyOfPresentIllness}
                </p>
              </div>

              {/* Vitals Grid */}
              <div>
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Admission Vital Signs
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="p-3 bg-white border border-teal-500/10 rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-400 block font-medium">BP</span>
                    <span className="text-sm font-bold text-slate-800">
                      {course.caseVignette.vitals.bloodPressure}
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-teal-500/10 rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-400 block font-medium">Heart Rate</span>
                    <span className="text-sm font-bold text-slate-800">
                      {course.caseVignette.vitals.heartRate}
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-teal-500/10 rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-400 block font-medium">Resp Rate</span>
                    <span className="text-sm font-bold text-slate-800">
                      {course.caseVignette.vitals.respiratoryRate}
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-teal-500/10 rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-400 block font-medium">SpO2</span>
                    <span className="text-sm font-bold text-slate-800">
                      {course.caseVignette.vitals.spO2}
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-teal-500/10 rounded-xl shadow-2xs">
                    <span className="text-[11px] text-slate-400 block font-medium">Temp</span>
                    <span className="text-sm font-bold text-slate-800">
                      {course.caseVignette.vitals.temperature}
                    </span>
                  </div>
                </div>
              </div>

              {/* Labs Table */}
              <div>
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Diagnostic Laboratories & Imaging Panel
                </h5>
                <div className="border border-teal-500/10 rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#F4F9F9] text-slate-700 text-xs font-semibold border-b border-teal-500/10">
                      <tr>
                        <th className="p-3">Investigation / Diagnostic</th>
                        <th className="p-3">Reported Value</th>
                        <th className="p-3">Reference Range</th>
                        <th className="p-3 text-right">Interpretation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {course.caseVignette.labsAndImaging.map((lab, i) => (
                        <tr key={i} className="hover:bg-[#F4F9F9]/70">
                          <td className="p-3 font-medium text-slate-800">{lab.test}</td>
                          <td className="p-3 font-semibold text-slate-900">{lab.result}</td>
                          <td className="p-3 text-xs text-slate-500">{lab.referenceRange}</td>
                          <td className="p-3 text-right">
                            <span
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg ${
                                lab.status === 'Critical'
                                  ? 'bg-rose-100 text-rose-800'
                                  : lab.status === 'Abnormal'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {lab.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Button to Jump to Quiz */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="px-5 py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl font-medium text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Proceed to Board Assessment Questions</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-8">
              {course.quiz.map((q, qIndex) => {
                const selectedOpt = selectedAnswers[q.id];
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      submitted
                        ? isCorrect
                          ? 'bg-emerald-50/40 border-emerald-300'
                          : 'bg-rose-50/40 border-rose-300'
                        : 'bg-white border-teal-500/10 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#0A192F] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {qIndex + 1}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0E9384] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                          {q.conceptTag}
                        </span>
                      </div>
                      {submitted && (
                        <div>
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1)
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-lg">
                              <XCircle className="w-3.5 h-3.5" /> Incorrect
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold text-slate-900 mb-4 leading-relaxed">
                      {q.question}
                    </h4>

                    {/* Options */}
                    <div className="space-y-2.5">
                      {q.options.map((opt, optIndex) => {
                        const isThisSelected = selectedOpt === optIndex;
                        const isThisCorrectAnswer = q.correctIndex === optIndex;

                        let optClasses = 'border-teal-500/10 hover:border-[#0E9384] bg-white text-slate-700';

                        if (submitted) {
                          if (isThisCorrectAnswer) {
                            optClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                          } else if (isThisSelected && !isCorrect) {
                            optClasses = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                          } else {
                            optClasses = 'border-teal-500/10 bg-[#F4F9F9] text-slate-400 opacity-60';
                          }
                        } else if (isThisSelected) {
                          optClasses = 'border-[#0E9384] bg-teal-50/80 text-teal-950 font-medium ring-2 ring-teal-500/20';
                        }

                        return (
                          <button
                            key={optIndex}
                            disabled={submitted}
                            onClick={() => handleSelect(q.id, optIndex)}
                            className={`w-full text-left p-3.5 rounded-xl border text-sm flex items-center justify-between transition-all cursor-pointer ${optClasses}`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                                  isThisSelected
                                    ? 'bg-[#0E9384] text-white'
                                    : 'bg-[#F4F9F9] border border-teal-500/10 text-slate-600'
                                }`}
                              >
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <span className="leading-snug">{opt}</span>
                            </div>
                            {submitted && isThisCorrectAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if submitted */}
                    {submitted && (
                      <div className="mt-4 pt-3.5 border-t border-teal-500/10 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                          <BookOpen className="w-3.5 h-3.5 text-[#0E9384]" />
                          <span>Clinical Rationale & Evidence:</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {q.explanation}
                        </p>
                        <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1 pt-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#0E9384]" />
                          <span>Guideline Citation: {q.guidelineCitation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with actions */}
        <div className="px-6 py-4 bg-[#F4F9F9] border-t border-teal-500/10 flex items-center justify-between shrink-0">
          {!submitted ? (
            <div className="flex items-center justify-between w-full">
              <div className="text-xs text-slate-500">
                Answered <span className="font-bold text-slate-800">{answeredCount}</span> of{' '}
                <span className="font-bold text-slate-800">{totalQuestions}</span> questions
              </div>
              <button
                onClick={handleSubmit}
                disabled={answeredCount < totalQuestions}
                className="px-6 py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] disabled:opacity-40 text-white rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <span>Submit Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    Your Score: {score.percentage}% ({score.correct}/{score.total})
                  </span>
                  {passed ? (
                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-lg flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Passed
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2 py-0.5 bg-rose-100 text-rose-800 rounded-lg flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Did Not Pass (&lt;70%)
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {passed
                    ? `Eligible for ${course.credits} ${course.accreditationType}.`
                    : 'Review the rationale and retake the assessment to earn your CME credits.'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {!passed && (
                  <button
                    onClick={handleRetake}
                    className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-teal-500/10 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Assessment</span>
                  </button>
                )}

                {passed && !claimed && (
                  <button
                    onClick={handleClaimCertificate}
                    className="px-5 py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl font-medium text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-teal-200" />
                    <span>Claim & Issue Official CME Certificate</span>
                  </button>
                )}

                {claimed && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#0E9384]" />
                      Certificate Saved to CME Vault
                    </span>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-[#0A192F] hover:bg-[#162C4E] text-white rounded-xl text-xs font-medium cursor-pointer"
                    >
                      Close & Return
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
