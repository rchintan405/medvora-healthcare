import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPageView } from './components/LandingPageView';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { DashboardView } from './components/DashboardView';
import { CourseCatalogView } from './components/CourseCatalogView';
import { CourseDetailView } from './components/CourseDetailView';
import { VideoLearningPlayer } from './components/VideoLearningPlayer';
import { AssessmentQuizModal } from './components/AssessmentQuizModal';
import { CertificateModal } from './components/CertificateModal';
import { AIConsultAssistantModal } from './components/AIConsultAssistantModal';
import { GuidelinesView } from './components/GuidelinesView';
import { WebinarsEventsView } from './components/WebinarsEventsView';
import { CommunityForumView } from './components/CommunityForumView';
import { CertificatesVaultView } from './components/CertificatesVaultView';
import { OrganizationB2BView } from './components/OrganizationB2BView';
import { BookmarksView } from './components/BookmarksView';
import { ProfileView } from './components/ProfileView';
import { ExpertsDirectoryView } from './components/ExpertsDirectoryView';
import { SettingsView } from './components/SettingsView';
import { B2BLandingPageView } from './components/B2BLandingPageView';
import { OrganizationPortalView } from './components/OrganizationPortalView';
import { AdminPortalView } from './components/AdminPortalView';
import { RequestDemoModal } from './components/RequestDemoModal';

import {
  DEMO_USER_PROFILE,
  DEMO_USER_PERSONAS,
  DEMO_COURSES,
  DEMO_GUIDELINE_ALERTS,
  DEMO_WEBINARS,
  DEMO_COMMUNITY_CASES,
  DEMO_COMMUNITY_POSTS,
  DEMO_CERTIFICATES,
  DEMO_FACULTY,
  DEMO_NOTIFICATIONS,
} from './data/mockData';
import {
  Course,
  UserProfile,
  UserProgress,
  Certificate,
  WebinarEvent,
  CommunityCase,
  CommunityPost,
  Specialty,
  Faculty,
  ClinicalGuidelineAlert,
  NotificationItem,
  OnboardingPreferences,
  OnboardingRole,
} from './types';

export default function App() {
  // Navigation & Page State
  // Default to false so user immediately gets to interact with the full app or toggle landing page smoothly
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);
  const [portalMode, setPortalMode] = useState<'clinician' | 'b2b-landing' | 'organization' | 'admin'>('clinician');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [requestDemoModalOpen, setRequestDemoModalOpen] = useState<boolean>(false);

  // User and Core Entities
  const [user, setUser] = useState<UserProfile>(DEMO_USER_PROFILE);
  const [courses, setCourses] = useState<Course[]>(DEMO_COURSES);
  const [facultyList, setFacultyList] = useState<Faculty[]>(DEMO_FACULTY);
  const [guidelineAlerts] = useState<ClinicalGuidelineAlert[]>(DEMO_GUIDELINE_ALERTS);
  const [webinars, setWebinars] = useState<WebinarEvent[]>(DEMO_WEBINARS);
  const [communityCases, setCommunityCases] = useState<CommunityCase[]>(DEMO_COMMUNITY_CASES);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(DEMO_COMMUNITY_POSTS);
  const [certificates, setCertificates] = useState<Certificate[]>(DEMO_CERTIFICATES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEMO_NOTIFICATIONS);

  // Active items
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // User Progress tracking & Bookmarks
  const [userProgress, setUserProgress] = useState<Record<string, UserProgress>>({
    'c-cardio-01': {
      courseId: 'c-cardio-01',
      completedChapters: ['ch-01'],
      notes: [
        {
          id: 'n1',
          timestamp: '04:15',
          text: 'SGLT2 inhibitors provide a 32% reduction in CV death or HF hospitalization independent of baseline ejection fraction or glycemic status.',
          createdAt: 'Yesterday',
        },
      ],
      currentVideoTime: 480,
      percentCompleted: 65,
      certificateEarned: false,
    },
  });

  const [bookmarks, setBookmarks] = useState<string[]>(['c-cardio-01', 'c-stroke-03']);

  // Modals State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');

  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingData, setOnboardingData] = useState<{
    name: string;
    email: string;
    role?: OnboardingRole;
  }>({
    name: 'Dr. Maya Patel',
    email: 'dr.maya.patel@hospital.org',
    role: 'Doctor',
  });

  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [activeAssessmentCourse, setActiveAssessmentCourse] = useState<Course | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [activeLiveWebinar, setActiveLiveWebinar] = useState<WebinarEvent | null>(null);
  const [aiConsultOpen, setAiConsultOpen] = useState(false);
  const [aiConsultSpecialty, setAiConsultSpecialty] = useState<Specialty | undefined>(undefined);
  const [aiConsultInitialPrompt, setAiConsultInitialPrompt] = useState<string | undefined>(undefined);

  // Global Keyboard shortcut (Cmd/Ctrl + K for Global Search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsLandingPage(false);
    setCurrentTab('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = (course: Course) => {
    setSelectedCourse(course);
    setIsLandingPage(false);
    setCurrentTab('lecture-player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (courseId: string) => {
    setBookmarks((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setAuthModalOpen(false);
    setIsLandingPage(false);
    setCurrentTab('dashboard');
  };

  const handleRegisterStartOnboarding = (name: string, email: string) => {
    setAuthModalOpen(false);
    setOnboardingData({ name, email });
    setOnboardingOpen(true);
  };

  const handleOnboardingComplete = (preferences: OnboardingPreferences) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: onboardingData.name || 'Dr. Alex Vance, MD',
      email: onboardingData.email || 'alex.vance@health.org',
      avatar:
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      role: (preferences.role as any) || 'Physician (MD/DO)',
      primarySpecialty: preferences.primarySpecialty,
      secondarySpecialties: preferences.secondarySpecialties || [],
      institution: preferences.institution || 'Mount Sinai Health System',
      licenseNumber: preferences.licenseNumber || 'CA-MD-984210',
      licenseState: preferences.licenseState || 'CA',
      npiNumber: preferences.npiNumber || '1948201948',
      department: 'Clinical Medicine',
      targetCmeCredits: preferences.targetCmeCredits || 50,
      completedCmeThisYear: 0,
      streakDays: 1,
      savedCourseIds: [],
      notificationPreferences: {
        emailDigest: true,
        guidelineAlerts: true,
        webinarReminders: true,
        communityMentions: true,
      },
    };

    setUser(newUser);
    setOnboardingOpen(false);
    setIsLandingPage(false);
    setCurrentTab('dashboard');
  };

  const handleSwitchPersona = (personaKey: 'physician' | 'nurse' | 'pharmacist') => {
    const persona = DEMO_USER_PERSONAS[personaKey];
    if (persona) {
      setUser(persona);
    }
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleAssessmentPassed = (course: Course, scorePercent: number) => {
    // Generate new verifiable certificate
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      courseId: course.id,
      courseTitle: course.title,
      recipientName: user.name,
      recipientLicense: user.licenseNumber || 'CA-948210',
      recipientSpecialty: user.primarySpecialty,
      creditsEarned: course.credits,
      accreditationType: course.accreditationType,
      accreditationBody: course.accreditationBody,
      issueDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      verificationCode: `MEDV-${Math.floor(100000 + Math.random() * 900000)}`,
      accreditationStatement: `Medvora designates this enduring educational activity for ${course.credits.toFixed(2)} ${course.accreditationType}. Physicians and healthcare practitioners should claim only the credit commensurate with the extent of their participation in the activity.`,
      facultyName: course.faculty.name,
      facultyTitle: course.faculty.title,
    };

    setCertificates((prev) => [newCert, ...prev]);

    // Update User Progress
    setUserProgress((prev) => ({
      ...prev,
      [course.id]: {
        ...(prev[course.id] || {
          courseId: course.id,
          completedChapters: course.chapters.map((c) => c.id),
          notes: [],
          currentVideoTime: 0,
        }),
        percentCompleted: 100,
        certificateEarned: true,
        score: scorePercent,
        passedAt: new Date().toISOString(),
      },
    }));

    // Update user earned credits
    setUser((prev) => ({
      ...prev,
      completedCmeThisYear: Number((prev.completedCmeThisYear + course.credits).toFixed(2)),
    }));

    // Push new notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'CME Certificate Issued & Verified',
        message: `You earned ${course.credits.toFixed(2)} credits for completing "${course.title}".`,
        type: 'cme_earned',
        timestamp: 'Just now',
        read: false,
        linkAction: 'certificates',
      },
      ...prev,
    ]);

    setActiveAssessmentCourse(null);
    setActiveCertificate(newCert);
  };

  const handleRegisterWebinar = (id: string) => {
    setWebinars((prev) =>
      prev.map((w) => (w.id === id ? { ...w, registered: !w.registered } : w))
    );
  };

  const handleAddCommunityCase = (newCase: CommunityCase) => {
    setCommunityCases((prev) => [newCase, ...prev]);
  };

  const handleVoteCommunityCase = (caseId: string) => {
    setCommunityCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          const isVoted = c.userVoted;
          return {
            ...c,
            votes: isVoted ? c.votes - 1 : c.votes + 1,
            userVoted: !isVoted,
          };
        }
        return c;
      })
    );
  };

  // Community Posts Handlers
  const handleAddCommunityPost = (
    postData: Omit<
      CommunityPost,
      'id' | 'likesCount' | 'commentsCount' | 'timestamp' | 'comments' | 'hasLiked' | 'saved'
    >
  ) => {
    const newPost: CommunityPost = {
      ...postData,
      id: `post-${Date.now()}`,
      timestamp: 'Just now',
      likesCount: 0,
      hasLiked: false,
      commentsCount: 0,
      saved: false,
      comments: [],
    };
    setCommunityPosts((prev) => [newPost, ...prev]);
  };

  const handleLikePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const liked = p.hasLiked;
          return {
            ...p,
            hasLiked: !liked,
            likesCount: liked ? p.likesCount - 1 : p.likesCount + 1,
          };
        }
        return p;
      })
    );
  };

  const handleSavePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, saved: !p.saved } : p))
    );
  };

  const handleFollowFacultyToggle = (facultyId: string) => {
    setFacultyList((prev) =>
      prev.map((f) => {
        if (f.id === facultyId) {
          const isFollowing = !f.isFollowing;
          return {
            ...f,
            isFollowing,
            followersCount: isFollowing ? f.followersCount + 1 : f.followersCount - 1,
          };
        }
        return f;
      })
    );
  };

  const handleFollowAuthor = (authorId: string) => {
    // Also toggle in community posts
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.author.id === authorId) {
          const isFollowing = !p.author.isFollowing;
          return {
            ...p,
            author: {
              ...p.author,
              isFollowing,
              followersCount: isFollowing ? (p.author.followersCount || 0) + 1 : (p.author.followersCount || 1) - 1,
            },
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (
    postId: string,
    commentText: string,
    isEvidenceBased?: boolean,
    citation?: string
  ) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      author: {
        id: user.id,
        name: user.name,
        role: user.role,
        credentials: user.role,
        specialty: user.primarySpecialty,
        institution: user.institution,
        avatar: user.avatar,
        verified: true,
      },
      content: commentText,
      timestamp: 'Just now',
      likesCount: 0,
      hasLiked: false,
      isEvidenceBased: Boolean(isEvidenceBased),
      citation: citation || undefined,
    };

    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...(p.comments || []), newComment],
          };
        }
        return p;
      })
    );
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: (p.comments || []).map((c) => {
              if (c.id === commentId) {
                const liked = c.hasLiked;
                return {
                  ...c,
                  hasLiked: !liked,
                  likesCount: liked ? c.likesCount - 1 : c.likesCount + 1,
                };
              }
              return c;
            }),
          };
        }
        return p;
      })
    );
  };

  const handleOpenAiConsult = (specialty?: Specialty, prompt?: string) => {
    setAiConsultSpecialty(specialty || user.primarySpecialty);
    setAiConsultInitialPrompt(prompt);
    setAiConsultOpen(true);
  };

  const bookmarkedCoursesList = courses.filter((c) => bookmarks.includes(c.id));

  // Check if viewing B2B Landing Page
  if (portalMode === 'b2b-landing') {
    return (
      <>
        <B2BLandingPageView
          onOpenRequestDemo={() => setRequestDemoModalOpen(true)}
          onLaunchOrgDemo={() => setPortalMode('organization')}
          onSwitchToClinicianPortal={() => setPortalMode('clinician')}
          onSwitchToSuperAdmin={() => setPortalMode('admin')}
        />
        <RequestDemoModal
          isOpen={requestDemoModalOpen}
          onClose={() => setRequestDemoModalOpen(false)}
        />
      </>
    );
  }

  // Check if viewing Organization B2B Portal
  if (portalMode === 'organization') {
    return (
      <>
        <OrganizationPortalView
          courses={courses}
          onSelectCourse={handleSelectCourse}
          onSwitchToClinician={() => setPortalMode('clinician')}
          onSwitchToSuperAdmin={() => setPortalMode('admin')}
          onOpenB2BLanding={() => setPortalMode('b2b-landing')}
        />
        <RequestDemoModal
          isOpen={requestDemoModalOpen}
          onClose={() => setRequestDemoModalOpen(false)}
        />
      </>
    );
  }

  // Check if viewing Super Admin Portal
  if (portalMode === 'admin') {
    return (
      <>
        <AdminPortalView
          onSwitchToClinician={() => setPortalMode('clinician')}
          onSwitchToOrgPortal={() => setPortalMode('organization')}
        />
        <RequestDemoModal
          isOpen={requestDemoModalOpen}
          onClose={() => setRequestDemoModalOpen(false)}
        />
      </>
    );
  }

  // Render Public Landing Page
  if (isLandingPage) {
    return (
      <>
        <LandingPageView
          courses={courses}
          onExploreLearning={() => {
            setIsLandingPage(false);
            setCurrentTab('courses');
          }}
          onSelectCourse={handleSelectCourse}
          onOpenAuth={handleOpenAuth}
          onQuickDemoLogin={() => {
            setUser(DEMO_USER_PROFILE);
            setIsLandingPage(false);
            setCurrentTab('dashboard');
          }}
        />

        {/* Global Modals for Landing Page */}
        <AuthModal
          isOpen={authModalOpen}
          initialMode={authInitialMode}
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onRegisterStartOnboarding={handleRegisterStartOnboarding}
        />

        <OnboardingModal
          isOpen={onboardingOpen}
          initialUserData={onboardingData}
          onComplete={handleOnboardingComplete}
          onClose={() => setOnboardingOpen(false)}
        />
      </>
    );
  }

  // Render Authenticated SaaS Application
  return (
    <div className="min-h-screen bg-[#F4F9F9] text-[#1A2B3B] flex flex-col font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Top Main Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'community' || tab === 'experts') {
            window.location.hash = '#';
            return;
          }
          if (tab === 'enterprise') {
            setPortalMode('organization');
            return;
          }
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        alerts={guidelineAlerts}
        notifications={notifications}
        savedCount={bookmarks.length}
        onOpenAiConsult={() => handleOpenAiConsult()}
        onOpenGlobalSearch={() => setGlobalSearchOpen(true)}
        onSwitchToLandingPage={() => setIsLandingPage(true)}
        onSwitchToB2BLanding={() => setPortalMode('b2b-landing')}
        onSwitchToOrgPortal={() => setPortalMode('organization')}
        onSwitchToSuperAdmin={() => setPortalMode('admin')}
        onOpenRequestDemo={() => setRequestDemoModalOpen(true)}
        onSwitchPersona={handleSwitchPersona}
        onMarkNotificationAsRead={handleMarkNotificationAsRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
      />

      {/* Subheader Breadcrumb & Multi-Persona Switcher Bar */}
      <div className="bg-white border-b border-teal-500/10 px-4 sm:px-8 py-2 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLandingPage(true)}
              className="text-slate-500 hover:text-[#0E9384] font-medium cursor-pointer transition-colors"
            >
              Medvora
            </button>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-800 capitalize">{currentTab.replace('-', ' ')}</span>
            <span className="text-[11px] text-[#0E9384] bg-teal-50 px-2.5 py-0.5 rounded-full font-semibold border border-teal-100 hidden md:inline-block">
              ACCME Provider #00094821
            </span>
          </div>

          {/* Quick Persona & Portal Switcher Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden lg:inline">
              Portals:
            </span>
            <button
              onClick={() => setPortalMode('clinician')}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#0E9384] text-white shadow-xs cursor-pointer flex items-center gap-1"
            >
              <span>🩺 Clinician</span>
            </button>
            <button
              onClick={() => setPortalMode('organization')}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 cursor-pointer flex items-center gap-1 transition-colors"
            >
              <span>🏢 Org Portal</span>
            </button>
            <button
              onClick={() => setPortalMode('admin')}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 cursor-pointer flex items-center gap-1 transition-colors"
            >
              <span>🛡️ Admin</span>
            </button>
            <button
              onClick={() => setPortalMode('b2b-landing')}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer flex items-center gap-1 transition-colors"
            >
              <span>🌐 B2B Page</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'dashboard' && (
          <DashboardView
            user={user}
            courses={courses}
            guidelineAlerts={guidelineAlerts}
            webinars={webinars}
            communityCases={communityCases}
            certificates={certificates}
            onSelectCourse={handleSelectCourse}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAiConsult={() => handleOpenAiConsult()}
            onOpenWebinarRoom={(webinar) => setActiveLiveWebinar(webinar)}
          />
        )}

        {currentTab === 'courses' && (
          <CourseCatalogView
            courses={courses}
            userProgress={userProgress}
            bookmarks={bookmarks}
            onSelectCourse={handleSelectCourse}
            onToggleBookmark={handleToggleBookmark}
            onOpenAiConsult={(spec) => handleOpenAiConsult(spec)}
          />
        )}

        {currentTab === 'experts' && (
          <ExpertsDirectoryView
            facultyList={facultyList}
            courses={courses}
            webinars={webinars}
            onSelectCourse={handleSelectCourse}
            onToggleFollowFaculty={handleFollowFacultyToggle}
            onFollowToggle={handleFollowFacultyToggle}
            onAskAiWithFacultyContext={(faculty) =>
              handleOpenAiConsult(
                faculty.specialty,
                `Can you provide a clinical case drill based on Dr. ${faculty.name}'s focus in ${faculty.specialty}?`
              )
            }
            onSelectWebinar={(w) => {
              setActiveLiveWebinar(w);
              setCurrentTab('webinars');
            }}
            onOpenWebinar={() => setCurrentTab('webinars')}
          />
        )}

        {currentTab === 'course-detail' && selectedCourse && (
          <CourseDetailView
            course={selectedCourse}
            user={user}
            isBookmarked={bookmarks.includes(selectedCourse.id)}
            onBookmarkToggle={() => handleToggleBookmark(selectedCourse.id)}
            onStartLearning={() => handleStartLearning(selectedCourse)}
            onOpenAssessment={() => setActiveAssessmentCourse(selectedCourse)}
            onBack={() => setCurrentTab('courses')}
          />
        )}

        {currentTab === 'lecture-player' && selectedCourse && (
          <VideoLearningPlayer
            course={selectedCourse}
            userProgress={userProgress[selectedCourse.id]}
            onProgressUpdate={(prog) => {
              setUserProgress((prev) => ({
                ...prev,
                [selectedCourse.id]: {
                  ...(prev[selectedCourse.id] || {
                    courseId: selectedCourse.id,
                    completedChapters: [],
                    notes: [],
                    currentVideoTime: 0,
                    percentCompleted: 0,
                    certificateEarned: false,
                  }),
                  ...prog,
                },
              }));
            }}
            onCompleteCourse={() => setActiveAssessmentCourse(selectedCourse)}
            onBack={() => setCurrentTab('course-detail')}
            onOpenAiConsult={(prompt) => handleOpenAiConsult(selectedCourse.specialty, prompt)}
          />
        )}

        {currentTab === 'guidelines' && (
          <GuidelinesView
            guidelineAlerts={guidelineAlerts}
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onOpenAiConsultWithPrompt={(prompt) => handleOpenAiConsult(undefined, prompt)}
          />
        )}

        {currentTab === 'webinars' && (
          <WebinarsEventsView
            webinars={webinars}
            onRegisterToggle={handleRegisterWebinar}
            activeLiveWebinar={activeLiveWebinar}
            onCloseLiveRoom={() => setActiveLiveWebinar(null)}
            onOpenLiveRoom={(w) => setActiveLiveWebinar(w)}
          />
        )}

        {currentTab === 'community' && (
          <CommunityForumView
            communityPosts={communityPosts}
            posts={communityPosts}
            user={user}
            facultyList={facultyList}
            onAddPost={handleAddCommunityPost}
            onToggleLike={handleLikePost}
            onLikePost={handleLikePost}
            onToggleSave={handleSavePost}
            onSavePost={handleSavePost}
            onToggleFollow={handleFollowAuthor}
            onFollowAuthor={handleFollowAuthor}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
            onOpenAiConsult={(spec, prompt) => handleOpenAiConsult(spec, prompt)}
          />
        )}

        {currentTab === 'certificates' && (
          <CertificatesVaultView
            certificates={certificates}
            user={user}
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
            onNavigateToCourses={() => setCurrentTab('courses')}
          />
        )}

        {currentTab === 'enterprise' && (
          <OrganizationB2BView
            courses={courses}
            onAssignCourse={(courseId, dept) => {
              console.log(`Course ${courseId} assigned to ${dept}`);
            }}
          />
        )}

        {currentTab === 'bookmarks' && (
          <BookmarksView
            bookmarkedCourses={bookmarkedCoursesList}
            allCourses={courses}
            userProgress={userProgress}
            certificates={certificates}
            communityPosts={communityPosts}
            webinars={webinars}
            guidelineAlerts={guidelineAlerts}
            user={user}
            onSelectCourse={handleSelectCourse}
            onRemoveBookmark={handleToggleBookmark}
            onBrowseCourses={() => setCurrentTab('courses')}
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
            onSelectWebinar={(w) => {
              setActiveLiveWebinar(w);
              setCurrentTab('webinars');
            }}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            user={user}
            courses={courses}
            userProgress={userProgress}
            certificates={certificates}
            webinars={webinars}
            facultyList={facultyList}
            communityPosts={communityPosts}
            onUpdateProfile={(u) => setUser(u)}
            onSelectCourse={handleSelectCourse}
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
            onSelectWebinar={(w) => {
              setActiveLiveWebinar(w);
              setCurrentTab('webinars');
            }}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsView
            user={user}
            onUpdateProfile={(u) => setUser((prev) => ({ ...prev, ...u }))}
          />
        )}
      </main>

      {/* Global Modals */}
      {/* Universal Search Modal */}
      <GlobalSearchModal
        isOpen={globalSearchOpen}
        onClose={() => setGlobalSearchOpen(false)}
        courses={courses}
        webinars={webinars}
        communityCases={communityCases}
        guidelines={guidelineAlerts}
        onSelectCourse={handleSelectCourse}
        onSelectWebinar={(w) => {
          setActiveLiveWebinar(w);
          setCurrentTab('webinars');
        }}
        onSelectCommunityCase={(c) => {
          setCurrentTab('community');
        }}
        onSelectGuideline={(g) => {
          setCurrentTab('guidelines');
        }}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authInitialMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onRegisterStartOnboarding={handleRegisterStartOnboarding}
      />

      {/* Onboarding Flow Wizard */}
      <OnboardingModal
        isOpen={onboardingOpen}
        initialUserData={onboardingData}
        onComplete={handleOnboardingComplete}
        onClose={() => setOnboardingOpen(false)}
      />

      {/* Interactive CME Assessment / Quiz */}
      {activeAssessmentCourse && (
        <AssessmentQuizModal
          course={activeAssessmentCourse}
          onClose={() => setActiveAssessmentCourse(null)}
          onPassed={(score) => handleAssessmentPassed(activeAssessmentCourse, score)}
        />
      )}

      {/* Verifiable CME Certificate Modal */}
      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* AI Clinical Consult Assistant Modal */}
      {aiConsultOpen && (
        <AIConsultAssistantModal
          isOpen={aiConsultOpen}
          onClose={() => setAiConsultOpen(false)}
          initialSpecialty={aiConsultSpecialty}
          initialPrompt={aiConsultInitialPrompt}
        />
      )}

      {/* Global Footer */}
      <footer className="bg-[#0A192F] border-t border-white/10 text-slate-400 text-xs py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-white font-bold text-sm tracking-tight flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#0E9384] inline-flex items-center justify-center text-[10px] text-white font-black">
                  M
                </span>
                Medvora
              </span>
              <p className="text-[11px] text-slate-400">
                Smarter Learning for Better Care. ACCME-Accredited Medical Education Platform.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-xs">
              <button
                onClick={() => setIsLandingPage(true)}
                className="hover:text-teal-300 cursor-pointer transition-colors"
              >
                Public Landing Page
              </button>
              <button
                onClick={() => setCurrentTab('courses')}
                className="hover:text-teal-300 cursor-pointer transition-colors"
              >
                CME Catalog
              </button>
              <button
                onClick={() => setCurrentTab('community')}
                className="hover:text-teal-300 cursor-pointer transition-colors"
              >
                Peer Community
              </button>
              <button
                onClick={() => setCurrentTab('experts')}
                className="hover:text-teal-300 cursor-pointer transition-colors"
              >
                Faculty Directory
              </button>
              <button
                onClick={() => setCurrentTab('webinars')}
                className="hover:text-teal-300 cursor-pointer transition-colors"
              >
                Grand Rounds
              </button>
              <button
                onClick={() => setCurrentTab('enterprise')}
                className="hover:text-teal-300 cursor-pointer transition-colors"
              >
                Hospital Enterprise
              </button>
              <button
                onClick={() => setCurrentTab('certificates')}
                className="hover:text-teal-300 cursor-pointer transition-colors"
              >
                State Board Sync
              </button>
              <button
                onClick={() => setPortalMode('organization')}
                className="text-teal-400 hover:text-teal-300 font-semibold cursor-pointer transition-colors"
              >
                Org Portal
              </button>
              {/* <button
                onClick={() => setPortalMode('admin')}
                className="text-purple-400 hover:text-purple-300 font-semibold cursor-pointer transition-colors"
              >
                Super Admin
              </button> */}
              <button
                onClick={() => setRequestDemoModalOpen(true)}
                className="px-2.5 py-1 rounded-md bg-[#0E9384] text-white hover:bg-[#0b7a6d] font-semibold cursor-pointer transition-colors"
              >
                Request B2B Demo
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Medvora Inc. All rights reserved. ACCME Provider #00094821.</p>
            <p>Designed for verified healthcare professionals and continuing medical education.</p>
          </div>
        </div>
      </footer>

      {/* Request Demo Modal */}
      <RequestDemoModal
        isOpen={requestDemoModalOpen}
        onClose={() => setRequestDemoModalOpen(false)}
      />
    </div>
  );
}
