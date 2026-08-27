import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  Sparkles,
  Building,
  KeyRound,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';
import { MedvoraLogo } from './MedvoraLogo';
import { OnboardingRole, ProfessionalRole, UserProfile } from '../types';
import { DEMO_USER_PERSONAS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess: (userProfile: UserProfile) => void;
  onRegisterStartOnboarding: (userData: { name: string; email: string; role: OnboardingRole }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLoginSuccess,
  onRegisterStartOnboarding,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotSent, setForgotSent] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Form states
  const [name, setName] = useState('Dr. Maya Patel');
  const [email, setEmail] = useState('dr.maya.patel@hospital.org');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<OnboardingRole>('Doctor');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      // Find or default to demo physician
      const demoUser = DEMO_USER_PERSONAS.physician;
      onLoginSuccess({
        ...demoUser,
        name: name || demoUser.name,
        email: email || demoUser.email,
      });
      onClose();
    } else {
      // Register -> trigger onboarding
      onRegisterStartOnboarding({
        name: name || 'Dr. Maya Patel',
        email: email || 'clinician@medvora.com',
        role: selectedRole,
      });
      onClose();
    }
  };

  const handleDemoSignIn = (personaKey: 'physician' | 'nurse' | 'pharmacist') => {
    const persona = DEMO_USER_PERSONAS[personaKey];
    onLoginSuccess(persona);
    onClose();
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setShowForgotModal(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/10 w-full max-w-md overflow-hidden text-[#1A2B3B]">
        {/* Header with Medvora Logo */}
        <div className="bg-[#0A192F] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-teal-100/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <MedvoraLogo variant="light" size="md" />
          <p className="text-xs text-teal-100/70 mt-2">
            {mode === 'login'
              ? 'Sign in to access your accredited CME transcript & personalized feed'
              : 'Create your clinician account and start earning CME credits'}
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex bg-white/10 rounded-xl p-1 mt-4 border border-white/10">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#0E9384] text-white shadow-xs'
                  : 'text-teal-100/70 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-[#0E9384] text-white shadow-xs'
                  : 'text-teal-100/70 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {showForgotModal ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0E9384] flex items-center justify-center mx-auto mb-2 border border-teal-100">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#0A192F]">Reset Clinician Password</h4>
                <p className="text-xs text-slate-500">
                  Enter your verified medical email to receive a secure recovery token.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dr.smith@hospital.org"
                    className="w-full pl-9 pr-3 py-2 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {forgotSent ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs text-center flex items-center justify-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Password reset link sent to your inbox!
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Send Reset Link
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 cursor-pointer pt-1"
              >
                Back to Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Register: Full Name */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name & Credentials
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Maya Patel, MD"
                      className="w-full pl-9 pr-3 py-2 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Professional Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@hospital.org"
                    className="w-full pl-9 pr-3 py-2 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Register: Professional Role Selector */}
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Professional Role
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {(['Doctor', 'Nurse', 'Pharmacist', 'Researcher', 'Allied Health'] as OnboardingRole[]).map(
                      (role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSelectedRole(role)}
                          className={`p-2 rounded-xl text-[11px] font-bold border transition-all text-center cursor-pointer ${
                            selectedRole === role
                              ? 'bg-[#0E9384] text-white border-[#0E9384] shadow-xs'
                              : 'bg-[#F4F9F9] text-slate-700 border-teal-500/10 hover:border-teal-300'
                          }`}
                        >
                          {role}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] text-[#0E9384] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-9 py-2 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me checkbox */}
              {mode === 'login' && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#0E9384] focus:ring-teal-500 h-4 w-4 border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer">
                    Remember my credentials for 30 days
                  </label>
                </div>
              )}

              {/* Primary Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Continue to Onboarding'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Social Logins Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400 bg-white px-2">
              Or Connect With Verified Provider ID
            </div>
          </div>

          {/* Fictional Social Logins */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoSignIn('physician')}
              className="px-3 py-2 bg-[#F4F9F9] hover:bg-teal-50/70 border border-teal-500/10 rounded-xl text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0E9384]" />
              <span>Doximity SSO</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoSignIn('nurse')}
              className="px-3 py-2 bg-[#F4F9F9] hover:bg-teal-50/70 border border-teal-500/10 rounded-xl text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span>Hospital SSO</span>
            </button>
          </div>

          {/* Quick Demo Clinician Presets (Instant 1-Click test) */}
          <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-500/20 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#0A192F] flex items-center gap-1 text-[11px]">
                <Zap className="w-3 h-3 text-[#0E9384] fill-[#0E9384]" /> Quick Demo Personas
              </span>
              <span className="text-[10px] text-[#0E9384] font-medium">1-Click Sign In</span>
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleDemoSignIn('physician')}
                className="flex-1 py-1.5 bg-white hover:bg-teal-600 hover:text-white border border-teal-200 rounded-lg text-[10px] font-bold text-slate-700 transition-colors cursor-pointer shadow-2xs"
              >
                Dr. Maya (MD)
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('nurse')}
                className="flex-1 py-1.5 bg-white hover:bg-teal-600 hover:text-white border border-teal-200 rounded-lg text-[10px] font-bold text-slate-700 transition-colors cursor-pointer shadow-2xs"
              >
                Elena (DNP)
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('pharmacist')}
                className="flex-1 py-1.5 bg-white hover:bg-teal-600 hover:text-white border border-teal-200 rounded-lg text-[10px] font-bold text-slate-700 transition-colors cursor-pointer shadow-2xs"
              >
                Dr. Tariq (PharmD)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
