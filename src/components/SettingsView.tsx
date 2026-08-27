import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Award,
  Lock,
  Save,
  CheckCircle2,
  Building,
  Key,
  Globe,
  Sliders,
  Sparkles,
  RefreshCw,
  FileCheck
} from 'lucide-react';
import { UserProfile, Specialty } from '../types';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateProfile }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [institution, setInstitution] = useState(user.institution);
  const [licenseNumber, setLicenseNumber] = useState(user.licenseNumber);
  const [annualTarget, setAnnualTarget] = useState(user.annualCmeTarget);
  const [stateOrCountry, setStateOrCountry] = useState(user.stateOrCountry);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Notification toggles
  const [emailPracticeAlerts, setEmailPracticeAlerts] = useState(true);
  const [emailGrandRounds, setEmailGrandRounds] = useState(true);
  const [emailCmeDigest, setEmailCmeDigest] = useState(false);
  const [autoSyncStateBoard, setAutoSyncStateBoard] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      email,
      institution,
      licenseNumber,
      annualCmeTarget: Number(annualTarget),
      stateOrCountry,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F4F9F9] pb-20 text-[#1A2B3B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight">
            Account & Licensure Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your verified medical credentials, state board CME sync, and notification triggers.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile & Medical Licensure */}
          <div className="bg-white rounded-2xl p-6 border border-teal-500/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-5 h-5 text-[#0E9384]" />
              <h3 className="font-bold text-base text-[#0A192F]">Clinician Identity & Credentials</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name & Suffix</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Professional Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hospital / Institution</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full p-2.5 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Medical License / NPI Number</label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full p-2.5 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* CME Target & State Board Sync */}
          <div className="bg-white rounded-2xl p-6 border border-teal-500/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Award className="w-5 h-5 text-[#0E9384]" />
              <h3 className="font-bold text-base text-[#0A192F]">State Board CME Target & Reporting</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Annual CME Credit Target (Hours)</label>
                <input
                  type="number"
                  value={annualTarget}
                  onChange={(e) => setAnnualTarget(Number(e.target.value))}
                  min={10}
                  max={150}
                  className="w-full p-2.5 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Licensing Jurisdiction / State</label>
                <input
                  type="text"
                  value={stateOrCountry}
                  onChange={(e) => setStateOrCountry(e.target.value)}
                  className="w-full p-2.5 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="p-4 bg-teal-50/70 border border-teal-500/20 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck className="w-5 h-5 text-[#0E9384]" />
                <div>
                  <div className="font-bold text-xs text-[#0A192F]">Direct CME-Passport / PARS Reporting</div>
                  <div className="text-[11px] text-slate-500">Automatically transmit earned ACCME credits to state boards.</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoSyncStateBoard}
                onChange={(e) => setAutoSyncStateBoard(e.target.checked)}
                className="rounded text-[#0E9384] focus:ring-teal-500 h-4 w-4 cursor-pointer"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl p-6 border border-teal-500/10 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Bell className="w-5 h-5 text-[#0E9384]" />
              <h3 className="font-bold text-base text-[#0A192F]">Clinical Alert Preferences</h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 bg-[#F4F9F9] rounded-xl cursor-pointer">
                <div>
                  <div className="font-bold text-[#0A192F]">Practice-Changing FDA & Guideline Alerts</div>
                  <div className="text-slate-500 text-[11px]">Instant notifications for urgent drug safety updates in your specialty.</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailPracticeAlerts}
                  onChange={(e) => setEmailPracticeAlerts(e.target.checked)}
                  className="rounded text-[#0E9384] focus:ring-teal-500 h-4 w-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-[#F4F9F9] rounded-xl cursor-pointer">
                <div>
                  <div className="font-bold text-[#0A192F]">Live Grand Rounds & Webinar Reminders</div>
                  <div className="text-slate-500 text-[11px]">Reminders 1 hour before scheduled accredited live events.</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailGrandRounds}
                  onChange={(e) => setEmailGrandRounds(e.target.checked)}
                  className="rounded text-[#0E9384] focus:ring-teal-500 h-4 w-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-[#F4F9F9] rounded-xl cursor-pointer">
                <div>
                  <div className="font-bold text-[#0A192F]">Monthly CME Transcript Summary Digest</div>
                  <div className="text-slate-500 text-[11px]">A monthly PDF overview of all completed credits and hours.</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailCmeDigest}
                  onChange={(e) => setEmailCmeDigest(e.target.checked)}
                  className="rounded text-[#0E9384] focus:ring-teal-500 h-4 w-4 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Settings saved successfully!</span>
              </div>
            ) : <div />}

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
