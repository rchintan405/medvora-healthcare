import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  BookOpen,
  Calendar,
  AlertTriangle,
  Building2,
  Bookmark,
  User,
  Bell,
  Search,
  CheckCircle2,
  Menu,
  X,
  Stethoscope,
  ChevronDown,
  Users,
  Settings,
  LogOut,
  Globe,
  Zap,
  Check,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { MedvoraLogo } from './MedvoraLogo';
import { UserProfile, ClinicalGuidelineAlert, NotificationItem } from '../types';
import { NotificationCenterModal } from './NotificationCenterModal';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  user: UserProfile;
  alerts: ClinicalGuidelineAlert[];
  notifications: NotificationItem[];
  savedCount: number;
  onOpenAiConsult: () => void;
  onOpenGlobalSearch: () => void;
  onSwitchToLandingPage: () => void;
  onSwitchToB2BLanding?: () => void;
  onSwitchToOrgPortal?: () => void;
  onSwitchToSuperAdmin?: () => void;
  onOpenRequestDemo?: () => void;
  onSwitchPersona: (personaKey: 'physician' | 'nurse' | 'pharmacist') => void;
  onMarkNotificationAsRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  user,
  alerts,
  notifications,
  savedCount,
  onOpenAiConsult,
  onOpenGlobalSearch,
  onSwitchToLandingPage,
  onSwitchToB2BLanding,
  onSwitchToOrgPortal,
  onSwitchToSuperAdmin,
  onOpenRequestDemo,
  onSwitchPersona,
  onMarkNotificationAsRead,
  onMarkAllNotificationsRead,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleTabClick = (itemId: string, e?: React.MouseEvent) => {
    if (itemId === 'community' || itemId === 'experts') {
      if (e) {
        e.preventDefault();
      }
      window.location.hash = '#';
      return;
    }
    onSelectTab(itemId);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
    { id: 'courses', label: 'CME Catalog', icon: BookOpen },
    { id: 'community', label: 'Case Forum', icon: Stethoscope, badge: 'Active', isHashOnly: true },
    { id: 'experts', label: 'Faculty & Experts', icon: Users, isHashOnly: true },
    { id: 'webinars', label: 'Grand Rounds', icon: Calendar, live: true },
    { id: 'guidelines', label: 'Practice Updates', icon: AlertTriangle, badge: 'New' },
    { id: 'certificates', label: 'Certificates Vault', icon: Award },
    { id: 'enterprise', label: 'Hospital B2B', icon: Building2 },
    { id: 'bookmarks', label: 'Saved Protocols', icon: Bookmark, count: savedCount },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Mobile Bottom Navigation Bar items
  const mobileBottomItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
    { id: 'courses', label: 'Explore', icon: BookOpen },
    { id: 'community', label: 'Community', icon: MessageSquare, isHashOnly: true },
    { id: 'experts', label: 'Experts', icon: Users, isHashOnly: true },
    { id: 'webinars', label: 'Events', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      <header className="bg-[#0A192F] border-b border-white/10 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div className="flex items-center gap-6 lg:gap-8">
              <button
                onClick={() => {
                  onSelectTab('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 cursor-pointer focus:outline-hidden"
              >
                <MedvoraLogo variant="light" size="md" />
              </button>

              {/* Desktop Navigation Links */}
              <nav className="hidden xl:flex items-center gap-1">
                {navItems.slice(0, 5).map((item) => {
                  const isActive = currentTab === item.id;
                  const Icon = item.icon;

                  if (item.isHashOnly) {
                    return (
                      <a
                        key={item.id}
                        href="#"
                        onClick={(e) => handleTabClick(item.id, e)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer relative ${
                          isActive
                            ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                            : 'text-slate-300/80 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                        {item.live && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        )}
                        {item.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={(e) => handleTabClick(item.id, e)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer relative ${
                        isActive
                          ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                          : 'text-slate-300/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                      {item.live && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      )}
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* More Dropdown for secondary tabs on desktop */}
                <div className="relative group">
                  <button
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                      ['guidelines', 'certificates', 'enterprise', 'bookmarks', 'settings'].includes(currentTab)
                        ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                        : 'text-slate-300/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>More</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  <div className="absolute left-0 mt-1 w-52 bg-[#0A192F] border border-white/10 rounded-xl shadow-2xl py-2 hidden group-hover:block animate-in fade-in z-50">
                    {navItems.slice(5).map((item) => {
                      const Icon = item.icon;
                      if (item.isHashOnly) {
                        return (
                          <a
                            key={item.id}
                            href="#"
                            onClick={(e) => handleTabClick(item.id, e)}
                            className={`w-full px-4 py-2 text-left text-xs font-medium flex items-center justify-between transition-colors ${
                              currentTab === item.id ? 'text-teal-300 bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5 text-teal-400" />
                              <span>{item.label}</span>
                            </div>
                            {item.count !== undefined && item.count > 0 && (
                              <span className="text-[10px] bg-teal-500/10 px-1.5 py-0.5 rounded-md font-mono text-teal-300">
                                {item.count}
                              </span>
                            )}
                          </a>
                        );
                      }
                      return (
                        <button
                          key={item.id}
                          onClick={(e) => handleTabClick(item.id, e)}
                          className={`w-full px-4 py-2 text-left text-xs font-medium flex items-center justify-between transition-colors ${
                            currentTab === item.id ? 'text-teal-300 bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5 text-teal-400" />
                            <span>{item.label}</span>
                          </div>
                          {item.count !== undefined && item.count > 0 && (
                            <span className="text-[10px] bg-teal-500/10 px-1.5 py-0.5 rounded-md font-mono text-teal-300">
                              {item.count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </nav>
            </div>

            {/* Right Action Tools */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Universal Search Trigger */}
              <button
                onClick={onOpenGlobalSearch}
                className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-teal-100/70 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
                title="Search courses, experts, guidelines (Ctrl+K)"
              >
                <Search className="w-4 h-4 text-teal-400" />
                <span className="hidden md:inline">Search...</span>
                <kbd className="hidden lg:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded-sm font-mono text-teal-300">
                  ⌘K
                </kbd>
              </button>

              {/* AI Clinical Assistant Trigger Pill */}
              <button
                onClick={onOpenAiConsult}
                className="px-3 py-1.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-white/20" />
                <span className="hidden sm:inline">AI Consult</span>
                <span className="sm:hidden">AI</span>
              </button>

              {/* Notification Center Trigger */}
              <button
                id="navbar-notification-btn"
                onClick={() => setNotificationCenterOpen(true)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors relative cursor-pointer"
                title="Notifications & Clinical Alerts"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse border-2 border-[#0A192F]" />
                )}
              </button>

              {/* Profile Avatar Pill & Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                  }}
                  className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer border border-white/10"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-teal-400/50"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-xs font-semibold text-slate-200 leading-tight truncate max-w-[100px]">
                      {user?.name?.split(',')[0]}
                    </div>
                    <div className="text-[10px] text-teal-400 leading-none">
                      {user.completedCmeThisYear} CME
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#0A192F] border border-white/10 rounded-2xl shadow-2xl p-3 text-xs space-y-2 z-50 animate-in fade-in">
                    <div className="p-2 bg-white/5 rounded-xl border border-white/5 space-y-1">
                      <div className="font-bold text-white text-xs">{user.name}</div>
                      <div className="text-[11px] text-teal-300 font-medium">{user.role} • {user.primarySpecialty}</div>
                      <div className="text-[10px] text-slate-400 truncate">{user.institution}</div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <button
                        onClick={() => {
                          onSelectTab('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-teal-400" />
                        <span>Clinician Profile & CME Target</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectTab('bookmarks');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-teal-400" />
                        <span>Saved Protocols ({savedCount})</span>
                      </button>
                      <button
                        onClick={() => {
                          onSelectTab('settings');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Settings className="w-3.5 h-3.5 text-teal-400" />
                        <span>Account & Licensure</span>
                      </button>
                      <button
                        onClick={() => {
                          if (onSwitchToOrgPortal) onSwitchToOrgPortal();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-teal-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Building2 className="w-3.5 h-3.5 text-teal-400" />
                        <span>Organization Portal (B2B)</span>
                      </button>
                      {/* <button
                        onClick={() => {
                          if (onSwitchToSuperAdmin) onSwitchToSuperAdmin();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-purple-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                        <span>Platform Super Admin</span>
                      </button> */}
                      <button
                        onClick={() => {
                          if (onSwitchToB2BLanding) onSwitchToB2BLanding();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5 text-teal-400" />
                        <span>B2B Enterprise Solutions</span>
                      </button>
                      <button
                        onClick={() => {
                          onSwitchToLandingPage();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5 text-teal-400" />
                        <span>Public Landing Page</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-white/10 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Switch Demo Clinician</span>
                      <div className="grid grid-cols-3 gap-1 pt-1">
                        <button
                          onClick={() => {
                            onSwitchPersona('physician');
                            setProfileDropdownOpen(false);
                          }}
                          className="p-1.5 bg-white/5 hover:bg-teal-600 rounded-md text-[10px] font-bold text-center transition-colors cursor-pointer"
                        >
                          MD
                        </button>
                        <button
                          onClick={() => {
                            onSwitchPersona('nurse');
                            setProfileDropdownOpen(false);
                          }}
                          className="p-1.5 bg-white/5 hover:bg-teal-600 rounded-md text-[10px] font-bold text-center transition-colors cursor-pointer"
                        >
                          NP
                        </button>
                        <button
                          onClick={() => {
                            onSwitchPersona('pharmacist');
                            setProfileDropdownOpen(false);
                          }}
                          className="p-1.5 bg-white/5 hover:bg-teal-600 rounded-md text-[10px] font-bold text-center transition-colors cursor-pointer"
                        >
                          PharmD
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <button
                        onClick={() => {
                          onSwitchToLandingPage();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-rose-400 hover:bg-rose-950/40 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0A192F] border-b border-white/10 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;

              if (item.isHashOnly) {
                return (
                  <a
                    key={item.id}
                    href="#"
                    onClick={(e) => {
                      handleTabClick(item.id, e);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-teal-400" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="text-[10px] bg-teal-500/10 px-2 py-0.5 rounded-md font-mono text-teal-300">
                        {item.count}
                      </span>
                    )}
                  </a>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={(e) => {
                    handleTabClick(item.id, e);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-teal-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-[10px] bg-teal-500/10 px-2 py-0.5 rounded-md font-mono text-teal-300">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  onSwitchToLandingPage();
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 rounded-lg text-xs font-semibold text-teal-300 bg-white/5 flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Back to Public Landing Page</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (Fixed for high touch ergonomics) */}
      <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A192F]/95 backdrop-blur-md border-t border-white/10 px-2 py-1.5 flex items-center justify-around">
        {mobileBottomItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          if (item.isHashOnly) {
            return (
              <a
                key={item.id}
                href="#"
                onClick={(e) => handleTabClick(item.id, e)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                  isActive ? 'text-teal-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </a>
            );
          }

          return (
            <button
              key={item.id}
              onClick={(e) => handleTabClick(item.id, e)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                isActive ? 'text-teal-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Notification Center Modal */}
      <NotificationCenterModal
        isOpen={notificationCenterOpen}
        onClose={() => setNotificationCenterOpen(false)}
        notifications={notifications}
        onMarkAsRead={onMarkNotificationAsRead}
        onMarkAllAsRead={onMarkAllNotificationsRead}
        onNavigateToItem={(link) => {
          if (link) onSelectTab(link);
        }}
      />
    </>
  );
};
