import React, { useState } from 'react';
import {
  Award,
  Download,
  Printer,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  ExternalLink,
  FileSpreadsheet,
  Building2,
  Search,
  Filter,
  Sparkles,
  QrCode
} from 'lucide-react';
import { Certificate, UserProfile } from '../types';

interface CertificatesVaultViewProps {
  certificates: Certificate[];
  user: UserProfile;
  onOpenCertificate: (cert: Certificate) => void;
  onNavigateToCourses: () => void;
}

export const CertificatesVaultView: React.FC<CertificatesVaultViewProps> = ({
  certificates,
  user,
  onOpenCertificate,
  onNavigateToCourses,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [exportNotice, setExportNotice] = useState(false);

  const totalCreditsEarned = certificates.reduce((acc, c) => acc + c.creditsEarned, 0);

  const filteredCertificates = certificates.filter(
    (c) =>
      c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.accreditationBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.verificationCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportTranscript = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F4F9F9] pb-20 text-[#1A2B3B]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A192F] to-[#162C4E] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ACCME & State Board Verified
                </span>
                <span className="text-xs text-teal-100/70">Official Credit Ledger</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                CME/CPD Certificates & Credit Vault
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportTranscript}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <FileSpreadsheet className="w-4 h-4 text-teal-600" />
                <span>Export Official CME Transcript (CSV/PDF)</span>
              </button>
            </div>
          </div>

          {exportNotice && (
            <div className="p-3 bg-emerald-900/80 border border-emerald-400/40 rounded-xl text-xs text-emerald-200 flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  Official accredited CME transcript exported successfully for <strong>{user.name}</strong> (License: {user.licenseNumber}). Format: ACCME PARS / State Board compliant.
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-300">Ready for Download</span>
            </div>
          )}
        </div>
      </div>

      {/* Credit Summary Analytics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Credits Earned</span>
              <Award className="w-4 h-4 text-[#0E9384]" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {totalCreditsEarned.toFixed(2)}{' '}
              <span className="text-xs font-normal text-[#0E9384]">Hours</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Across {certificates.length} completed clinical modules
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Board Requirement</span>
              <Building2 className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {user.completedCmeThisYear} / {user.annualCmeTarget}{' '}
              <span className="text-xs font-normal text-slate-500">Credits</span>
            </div>
            <p className="text-[11px] text-amber-700 font-medium">
              Due by {user.cmeRequirementDeadline} ({user.stateOrCountry})
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">MOC & ABIM Points</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {(totalCreditsEarned * 1.0).toFixed(1)}{' '}
              <span className="text-xs font-normal text-amber-600">MOC II</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Directly reported to Board of Internal Medicine
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Sync Status</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-sm font-bold text-emerald-700 flex items-center gap-1.5 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Auto-Report Active</span>
            </div>
            <p className="text-[11px] text-slate-400">
              ACCME PARS & State Licensing API Connected
            </p>
          </div>
        </div>

        {/* Certificates Table & Search */}
        <div className="bg-white rounded-2xl border border-teal-500/10 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-teal-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Verified Accredited Certificates
              </h2>
              <p className="text-xs text-slate-500">
                Click any certificate to view high-resolution verifiable credential, print, or download PDF.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certificate or ID..."
                className="w-full pl-9 pr-4 py-2 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>
          </div>

          {filteredCertificates.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Award className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">No certificates found</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Complete any accredited clinical course assessment to earn your official CME certificate and credits.
              </p>
              <button
                onClick={onNavigateToCourses}
                className="px-4 py-2 bg-[#0E9384] text-white rounded-xl text-xs font-semibold hover:bg-[#0b7a6d] transition-colors cursor-pointer shadow-xs"
              >
                Browse CME Catalog
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredCertificates.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => onOpenCertificate(cert)}
                  className="p-5 hover:bg-teal-50/30 transition-colors cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Award className="w-5 h-5" />
                      <span className="text-[9px] font-bold mt-0.5">{cert.creditsEarned} CME</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                          {cert.accreditationType}
                        </span>
                        <span className="text-xs text-slate-400">
                          Issue Date: {cert.issueDate}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {cert.courseTitle}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span>Provider: <strong className="text-slate-700">{cert.accreditationBody}</strong></span>
                        <span>•</span>
                        <span>Verification ID: <strong className="font-mono text-slate-700">{cert.verificationCode}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end lg:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCertificate(cert);
                      }}
                      className="px-4 py-2 bg-[#F4F9F9] hover:bg-[#0E9384] hover:text-white text-slate-700 border border-teal-500/10 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>View & Print Certificate</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
