import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  Users,
  Send,
  HelpCircle
} from 'lucide-react';
import { OrgType, DemoRequestData } from '../types';

interface RequestDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RequestDemoModal: React.FC<RequestDemoModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<DemoRequestData>({
    companyName: '',
    companyType: 'Pharmaceutical Company',
    contactName: '',
    workEmail: '',
    jobTitle: '',
    phone: '',
    targetAudienceSize: '1,000 – 5,000 HCPs',
    primaryGoal: 'Launch CME-accredited digital medical education program',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const handleFinish = () => {
    setSubmitted(false);
    onClose();
    if (onSuccess) onSuccess();
  };

  const orgTypes: OrgType[] = [
    'Pharmaceutical Company',
    'Medical Device Company',
    'Hospital & Health System',
    'Medical Society / Association',
    'Healthcare Research Network',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/20 w-full max-w-xl overflow-hidden my-8 animate-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#0A192F] to-[#162C4E] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                <span>Request an Enterprise Demo</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  B2B Solutions
                </span>
              </h2>
              <p className="text-xs text-teal-100/70">
                Partner with Medvora to deploy accredited medical education programs.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 text-[#0E9384] flex items-center justify-center mx-auto shadow-inner animate-in zoom-in-50">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                Thank You, {formData.contactName || 'Colleague'}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your enterprise demo request for <strong className="text-slate-800">{formData.companyName || 'your organization'}</strong> has been received. Our Enterprise Solutions Director will contact you at <strong className="text-teal-700">{formData.workEmail}</strong> within 1 business day with a customized walkthrough.
              </p>
            </div>

            <div className="p-4 bg-teal-50/70 rounded-xl border border-teal-100 text-left text-xs space-y-2 text-slate-700">
              <div className="font-bold text-teal-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0E9384]" />
                <span>Next Steps in Your Evaluation:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 pl-1">
                <li>Custom learner engagement & physician reach simulation</li>
                <li>ACCME/EACCME accreditation alignment and joint-providership review</li>
                <li>Instant sandbox access to the Medvora Organization Portal</li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={handleFinish}
                className="w-full py-3 bg-[#0E9384] hover:bg-[#0b7a6d] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>Continue Exploring Medvora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Organization / Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Novartis, Boston Scientific, Mount Sinai"
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Organization Type *
                </label>
                <select
                  value={formData.companyType}
                  onChange={(e) => setFormData({ ...formData, companyType: e.target.value as OrgType })}
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                >
                  {orgTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="e.g. Dr. Kimberly Adams"
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Work / Institutional Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Job Title / Department *
                </label>
                <input
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="e.g. VP Medical Affairs, Director CME"
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Estimated Healthcare Target Audience
                </label>
                <select
                  value={formData.targetAudienceSize}
                  onChange={(e) => setFormData({ ...formData, targetAudienceSize: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                >
                  <option value="Under 500 HCPs">Under 500 Clinicians</option>
                  <option value="500 – 2,500 HCPs">500 – 2,500 Clinicians</option>
                  <option value="2,500 – 10,000 HCPs">2,500 – 10,000 Clinicians</option>
                  <option value="10,000+ Global HCPs">10,000+ Global Reach</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Primary Program Objective *
              </label>
              <select
                value={formData.primaryGoal}
                onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              >
                <option value="Launch CME-accredited digital medical education program">
                  Launch CME-accredited digital medical education program
                </option>
                <option value="Hospital staff compliance & licensing tracking">
                  Hospital staff compliance & licensing tracking
                </option>
                <option value="Medical device procedural training & surgical video labs">
                  Medical device procedural training & surgical video labs
                </option>
                <option value="Therapeutic guideline education & clinical trial awareness">
                  Therapeutic guideline education & clinical trial awareness
                </option>
                <option value="Society member education & live Grand Rounds symposia">
                  Society member education & live Grand Rounds symposia
                </option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Additional Notes or Specific Clinical Focus (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Seeking cardiology & oncology faculty recruitment and PARS sync."
                className="w-full px-3 py-2 bg-[#F4F9F9] border border-teal-500/15 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden resize-none"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-[11px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                Enterprise privacy guaranteed. HIPAA compliant and ACCME Standards for Integrity & Independence compliant.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Demo Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
