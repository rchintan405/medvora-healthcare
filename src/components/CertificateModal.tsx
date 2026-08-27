import React from 'react';
import {
  X,
  Download,
  Printer,
  ShieldCheck,
  Share2,
  CheckCircle2,
  Award,
  QrCode,
  Sparkles,
  Building2
} from 'lucide-react';
import { Certificate } from '../types';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Action Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-400" />
            <span className="font-semibold text-sm">Official CME/CPD Credit Certificate</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Area */}
        <div className="p-8 sm:p-12 bg-gradient-to-b from-slate-50 to-teal-50/20 text-slate-900 print:p-0">
          <div className="border-4 border-double border-teal-800/30 p-8 sm:p-10 rounded-2xl bg-white relative shadow-lg">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-teal-700" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-teal-700" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-teal-700" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-teal-700" />

            {/* Header / Brand */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Accredited Medical Education Verification
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-serif pt-2">
                Certificate of Continuing Medical Education
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                Issued by Medvora Institute of Clinical Excellence & {certificate.accreditationBody}
              </p>
            </div>

            {/* Recipient info */}
            <div className="text-center space-y-3 my-8">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                This is to certify that
              </p>
              <div className="text-2xl sm:text-3xl font-bold text-teal-900 font-serif underline decoration-teal-300 underline-offset-8">
                {certificate.recipientName}
              </div>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-600 font-medium pt-1">
                <span>License: <strong className="text-slate-800">{certificate.recipientLicense}</strong></span>
                <span>•</span>
                <span>Specialty: <strong className="text-slate-800">{certificate.recipientSpecialty}</strong></span>
              </div>
            </div>

            {/* Activity Completion info */}
            <div className="text-center max-w-2xl mx-auto space-y-4 my-8">
              <p className="text-sm text-slate-600">
                has successfully participated and fulfilled all educational requirements and passed the comprehensive clinical competency assessment for:
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-semibold text-base sm:text-lg">
                "{certificate.courseTitle}"
              </div>
              <div className="inline-block bg-teal-600 text-white font-bold text-sm px-6 py-2 rounded-xl shadow-xs">
                Awarded: {certificate.creditsEarned.toFixed(2)} {certificate.accreditationType}
              </div>
            </div>

            {/* Accreditation Statement */}
            <div className="text-center text-[11px] text-slate-500 max-w-xl mx-auto leading-relaxed border-t border-b border-slate-100 py-4 my-6">
              {certificate.accreditationStatement}
            </div>

            {/* Signatures & Verification Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-6">
              {/* Faculty Signature */}
              <div className="text-center space-y-1">
                <div className="font-serif italic text-lg text-slate-800 font-bold border-b border-slate-300 pb-1">
                  {certificate.facultyName}
                </div>
                <div className="text-xs font-semibold text-slate-800">{certificate.facultyName}</div>
                <div className="text-[10px] text-slate-500">{certificate.facultyTitle}</div>
              </div>

              {/* Gold Verification Seal & QR */}
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 border-2 border-amber-500 flex flex-col items-center justify-center text-amber-950 shadow-md mb-2">
                  <Award className="w-6 h-6 text-amber-900" />
                  <span className="text-[8px] font-bold uppercase tracking-wider">Verified</span>
                </div>
                <span className="text-[10px] font-mono text-slate-600 font-semibold">
                  {certificate.verificationCode}
                </span>
                <span className="text-[10px] text-slate-400">Date Issued: {certificate.issueDate}</span>
              </div>

              {/* Medical Director Signature */}
              <div className="text-center space-y-1">
                <div className="font-serif italic text-lg text-slate-800 font-bold border-b border-slate-300 pb-1">
                  Dr. Marcus Vance, MD, PhD
                </div>
                <div className="text-xs font-semibold text-slate-800">Dr. Marcus Vance, MD, PhD</div>
                <div className="text-[10px] text-slate-500">Chief Medical Officer, Medvora Education</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Electronically verified & synchronized with State Licensing Board reporting portals.</span>
          </div>
          <span className="font-mono text-[11px]">ID: {certificate.id}</span>
        </div>
      </div>
    </div>
  );
};
