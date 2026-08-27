import React, { useState } from 'react';
import {
  AlertTriangle,
  FileText,
  Building2,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  ShieldCheck,
  Stethoscope,
  ArrowRight
} from 'lucide-react';
import { ClinicalGuidelineAlert, Course } from '../types';

interface GuidelinesViewProps {
  guidelineAlerts: ClinicalGuidelineAlert[];
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onOpenAiConsultWithPrompt: (prompt: string) => void;
}

export const GuidelinesView: React.FC<GuidelinesViewProps> = ({
  guidelineAlerts,
  courses,
  onSelectCourse,
  onOpenAiConsultWithPrompt,
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = guidelineAlerts.filter((a) => {
    if (selectedSeverity !== 'All' && a.severity !== selectedSeverity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.issuingBody.toLowerCase().includes(q) ||
        a.actionItem.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F4F9F9] pb-20 text-[#1A2B3B]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A192F] to-[#162C4E] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Practice-Changing Evidence Radar
            </span>
            <span className="text-xs text-teal-100/70">ACC/AHA • ESC • FDA • NCCN Updates</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Clinical Practice Guidelines & Safety Alerts
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/80 max-w-2xl">
            Real-time digest of practice-changing randomized controlled trial results, society consensus statements, and FDA safety communications paired directly with accredited CME modules.
          </p>

          <div className="relative max-w-2xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guidelines by society, drug name, or condition..."
              className="w-full pl-11 pr-4 py-3 bg-[#0A192F]/90 border border-white/10 rounded-2xl text-xs text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Main Alerts List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const relatedCourse = alert.cmeModuleId
              ? courses.find((c) => c.id === alert.cmeModuleId)
              : null;

            return (
              <div
                key={alert.id}
                className="bg-white rounded-2xl border border-teal-500/10 p-6 shadow-xs hover:border-teal-500/30 transition-all space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg ${
                          alert.severity === 'Practice Changing'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : alert.severity === 'Safety Alert'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-teal-100 text-teal-800 border border-teal-200'
                        }`}
                      >
                        {alert.severity}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {alert.issuingBody}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {alert.title}
                    </h3>
                  </div>

                  <span className="text-xs text-slate-400 font-medium">{alert.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {alert.summary}
                </p>

                {/* Bedside Action Box */}
                <div className="p-3.5 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-teal-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
                    Bedside Action Item & Practice Recommendation:
                  </span>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {alert.actionItem}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <button
                    onClick={() =>
                      onOpenAiConsultWithPrompt(
                        `Explain the clinical application and evidence behind the latest guideline update: "${alert.title}" by ${alert.issuingBody}.`
                      )
                    }
                    className="text-[#0E9384] hover:text-[#0b7a6d] font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0E9384]" />
                    <span>Ask AI Clinical Rationale & Dosing</span>
                  </button>

                  {relatedCourse && (
                    <button
                      onClick={() => onSelectCourse(relatedCourse)}
                      className="px-4 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Take CME Course ({relatedCourse.credits} Credits)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
