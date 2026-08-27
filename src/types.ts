export type Specialty =
  | 'Cardiology'
  | 'Oncology'
  | 'Neurology'
  | 'Dermatology'
  | 'Pediatrics'
  | 'Emergency Medicine'
  | 'Radiology'
  | 'Psychiatry'
  | 'Primary Care'
  | 'Surgery'
  | 'Nursing'
  | 'Endocrinology'
  | 'Critical Care'
  | 'Nephrology'
  | 'Clinical Pharmacology'
  | 'Gastroenterology'
  | 'Infectious Disease'
  | 'Surgery & Anesthesia';

export type CourseCategory =
  | 'Recommended For You'
  | 'Trending This Week'
  | 'Newly Added'
  | 'Popular in Your Specialty'
  | 'Quick 10-Minute Learning'
  | 'Clinical Skills'
  | 'Leadership & Professional Development'
  | 'Emerging Technologies & AI'
  | 'Diagnostics & Imaging'
  | 'Pharmacology & Therapeutics';

export type ProfessionalRole =
  | 'Attending Physician (MD/DO)'
  | 'Fellow / Resident'
  | 'Nurse Practitioner / CNS (NP/APRN)'
  | 'Registered Nurse (RN/BSN)'
  | 'Clinical Pharmacist (PharmD)'
  | 'Medical Researcher / PhD'
  | 'Physician Assistant (PA-C)';

export type CourseFormat =
  | 'Micro-Capsule'
  | 'Clinical Masterclass'
  | 'Interactive Case Lab'
  | 'Grand Rounds'
  | 'Surgical Video Lab'
  | 'Guideline Update'
  | 'Rapid Case Simulation';

export type AccreditationType =
  | 'AMA PRA Category 1 Credit™'
  | 'EACCME European CME'
  | 'ANCC Nursing Contact Hours'
  | 'ACPE Pharmacy Credits'
  | 'AAFP Prescribed Credits'
  | 'Royal College CPD Credits';

export type CommunityCategory =
  | 'Discussions'
  | 'Clinical Insights'
  | 'Case Discussions'
  | 'Expert Conversations';

export interface CommunityComment {
  id: string;
  author: {
    id?: string;
    name: string;
    role: string;
    credentials?: string;
    specialty?: string;
    institution: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  likesCount: number;
  hasLiked?: boolean;
  isEvidenceBased?: boolean;
  citation?: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: CommunityCategory;
  specialty: Specialty;
  author: {
    id: string;
    name: string;
    role: string;
    credentials: string;
    specialty: Specialty | string;
    institution: string;
    avatar: string;
    verified: boolean;
    followersCount: number;
    isFollowing?: boolean;
  };
  timestamp: string;
  likesCount: number;
  hasLiked?: boolean;
  commentsCount: number;
  saved?: boolean;
  tags: string[];
  citation?: string;
  comments: CommunityComment[];
  patientVignette?: {
    ageGender: string;
    vitals?: string;
    keyLabs?: string;
  };
}

export interface ExpertArticle {
  id: string;
  title: string;
  journal: string;
  year: string;
  citation: string;
  doi?: string;
  readMinutes: number;
}

export interface ExpertSessionRequest {
  id: string;
  expertId: string;
  expertName: string;
  requesterName: string;
  requesterEmail: string;
  sessionType: 'Clinical Mentorship' | 'Case Review & Diagnostic Dilemma' | 'Research & Fellowship Advisory';
  selectedDate: string;
  selectedTimeSlot: string;
  clinicalNotes: string;
  status: 'Pending Confirmation' | 'Confirmed';
}

export interface Faculty {
  id: string;
  name: string;
  title: string;
  credentials?: string;
  institution: string;
  avatar: string;
  bio: string;
  verified: boolean;
  specialty: Specialty;
  publicationsCount?: number;
  followersCount?: number;
  isFollowing?: boolean;
  coursesCount?: number;
  articles?: ExpertArticle[];
  consultationTopics?: string[];
}

export type EventCategory = 'Webinars' | 'Live Sessions' | 'Expert Talks' | 'Conferences';
export type WebinarCategory = 'Webinars' | 'Live Sessions' | 'Expert Talks' | 'Conferences' | 'All Categories';

export interface EventAgendaItem {
  time: string;
  title: string;
  speakerName: string;
  speakerRole: string;
  description: string;
}

export interface WebinarEvent {
  id: string;
  title: string;
  description: string;
  category?: EventCategory;
  specialty: Specialty;
  speaker: Faculty;
  date: string;
  timeString: string;
  timezone?: string;
  durationMinutes: number;
  credits: number;
  attendeesCount: number;
  maxCapacity: number;
  status: 'Upcoming' | 'Live Now' | 'On-Demand';
  streamUrl?: string;
  learningObjectives: string[];
  agenda?: EventAgendaItem[];
  relatedCourseIds?: string[];
  registered?: boolean;
  locationOrPlatform?: string;
}

export type LessonType = 'video' | 'lecture' | 'case' | 'knowledge_check' | 'assessment' | 'reading';
export type LessonState = 'completed' | 'current' | 'locked';

export interface CourseLesson {
  id: string;
  title: string;
  type: LessonType;
  durationMinutes: number;
  videoTimestamp?: string;
  summary?: string;
  keyTakeaways?: string[];
  resources?: {
    title: string;
    type: 'PDF Guideline' | 'Clinical Calculator' | 'Trial Reprints' | 'Slides';
    size: string;
  }[];
  transcript?: { time: string; speaker: string; text: string }[];
  checkpointQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export interface CourseReview {
  id: string;
  reviewerName: string;
  reviewerRole: string;
  reviewerInstitution: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
}

export interface VideoChapter {
  id: string;
  title: string;
  timestamp: string;
  durationSeconds: number;
  summary: string;
  keyTakeaways: string[];
  checkpointQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface ClinicalCaseVignette {
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  chiefComplaint: string;
  historyOfPresentIllness: string;
  vitals: {
    bloodPressure: string;
    heartRate: string;
    respiratoryRate: string;
    spO2: string;
    temperature: string;
  };
  labsAndImaging: {
    test: string;
    result: string;
    referenceRange: string;
    status: 'Normal' | 'Abnormal' | 'Critical';
  }[];
  clinicalQuestion: string;
  options: string[];
  correctIndex: number;
  clinicalRationale: string;
  guidelineReference: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  guidelineCitation: string;
  conceptTag: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  specialty: Specialty;
  category?: CourseCategory;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced' | 'Fellowship Master';
  credits: number;
  accreditationType: AccreditationType;
  accreditationBody: string;
  expiresDate: string;
  durationMinutes: number;
  format: CourseFormat;
  faculty: Faculty;
  coFaculty?: Faculty[];
  rating: number;
  ratingsCount: number;
  enrolledCount: number;
  thumbnail: string;
  bannerImage: string;
  previewVideoUrl: string;
  fullVideoUrl: string;
  objectives: string[];
  prerequisites: string[];
  targetAudience: string[];
  chapters: VideoChapter[];
  modules?: CourseModule[];
  reviews?: CourseReview[];
  caseVignette?: ClinicalCaseVignette;
  quiz: QuizQuestion[];
  clinicalPearls: string[];
  downloadableProtocols: {
    title: string;
    size: string;
    type: string;
    description: string;
  }[];
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  tags: string[];
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  recipientName: string;
  recipientLicense: string;
  recipientSpecialty: Specialty;
  creditsEarned: number;
  accreditationType: AccreditationType;
  accreditationBody: string;
  issueDate: string;
  verificationCode: string;
  accreditationStatement: string;
  facultyName: string;
  facultyTitle: string;
}

export interface UserProgress {
  courseId: string;
  percentCompleted: number;
  lastChapterId?: string;
  lastLessonId?: string;
  completedLessonIds?: string[];
  completedChapters: string[];
  lastWatchTimeSeconds?: number;
  currentVideoTime?: number;
  quizPassed?: boolean;
  quizScore?: number;
  score?: number;
  passedAt?: string;
  certificateEarned?: boolean;
  certificateId?: string;
  notes: {
    id: string;
    timestamp: string;
    text: string;
    createdAt: string;
  }[];
  bookmarked?: boolean;
  startedAt?: string;
  completedAt?: string;
}

export interface SpecialtyCardItem {
  id: string;
  specialty: Specialty;
  iconName: string;
  courseCount: number;
  shortDescription: string;
  colorTheme: string;
  popularTopics: string[];
}

export interface LearningPathMilestone {
  id: string;
  weekNumber: number;
  phaseName: 'Clinical Foundations' | 'Advanced Practice' | 'Emerging Technologies' | 'Professional Skills';
  title: string;
  description: string;
  estimatedHours: number;
  competencies: string[];
  courseIds: string[];
  completed: boolean;
}

export interface LearningJourneyPath {
  id: string;
  title: string;
  subtitle: string;
  specialtyFocus: Specialty;
  totalWeeks: number;
  totalCmeCredits: number;
  milestones: LearningPathMilestone[];
  aiAssistantInsight: {
    headline: string;
    recommendationText: string;
    suggestedCourseId: string;
    justification: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: ProfessionalRole;
  primarySpecialty: Specialty;
  secondarySpecialties: Specialty[];
  institution: string;
  licenseNumber: string;
  licenseState?: string;
  stateOrCountry?: string;
  npiNumber?: string;
  department?: string;
  annualCmeTarget?: number;
  targetCmeCredits?: number;
  completedCmeThisYear: number;
  cmeRequirementDeadline?: string;
  streakDays: number;
  isProMember?: boolean;
  memberSince?: string;
  preferredFormats?: CourseFormat[];
  hospitalDepartment?: string;
  isAdmin?: boolean;
  savedCourseIds?: string[];
  notificationPreferences?: {
    emailDigest: boolean;
    guidelineAlerts: boolean;
    webinarReminders: boolean;
    communityMentions: boolean;
  };
}

export interface ClinicalGuidelineAlert {
  id: string;
  title: string;
  issuingBody: string;
  date: string;
  severity: 'Practice Changing' | 'Safety Alert' | 'Updated Guidance';
  summary: string;
  relatedSpecialty: Specialty;
  actionItem: string;
  cmeModuleId?: string;
}

export interface CommunityCase {
  id: string;
  title: string;
  author: {
    name: string;
    role: string;
    institution: string;
    avatar: string;
    verified: boolean;
  };
  specialty: Specialty;
  patientAgeGender: string;
  presentingSymptoms: string;
  initialWorkup: string;
  challengeQuestion: string;
  votes: number;
  userVoted?: boolean;
  repliesCount: number;
  status: 'Open for Discussion' | 'Consensus Reached' | 'Expert Summary Added';
  tags: string[];
  createdAt: string;
  replies: {
    id: string;
    author: {
      name: string;
      role: string;
      institution: string;
      avatar: string;
      verified: boolean;
    };
    content: string;
    timestamp: string;
    upvotes: number;
    isEvidenceBased: boolean;
    citation?: string;
  }[];
}

export type NotificationType =
  | 'cme_earned'
  | 'fda_alert'
  | 'webinar_live'
  | 'community_reply'
  | 'guideline_update';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  linkAction?: string;
}

export interface OrgTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  creditsEarned: number;
  targetCredits: number;
  complianceRate: number;
  status: 'Compliant' | 'At Risk' | 'Overdue';
  lastActive: string;
}

export type OnboardingRole = 'Doctor' | 'Nurse' | 'Pharmacist' | 'Researcher' | 'Allied Health';
export type OnboardingSpecialty =
  | 'Cardiology'
  | 'Oncology'
  | 'Neurology'
  | 'Dermatology'
  | 'Pediatrics'
  | 'Emergency Medicine'
  | 'Radiology'
  | 'Psychiatry'
  | 'Primary Care'
  | 'Surgery';

export type OnboardingInterest =
  | 'Clinical Skills'
  | 'Digital Health'
  | 'Leadership'
  | 'Research'
  | 'Patient Communication'
  | 'AI in Healthcare';

export type OnboardingGoal =
  | 'Improve clinical knowledge'
  | 'Stay current'
  | 'Earn professional credits'
  | 'Develop leadership skills'
  | 'Explore emerging healthcare technology';

export type PreferredLearningTime = '5–10 min' | '15–30 min' | '30–60 min' | '1+ hour';

export interface OnboardingPreferences {
  role: OnboardingRole;
  specialty: OnboardingSpecialty;
  primarySpecialty?: Specialty;
  secondarySpecialties?: Specialty[] | OnboardingSpecialty[];
  institution?: string;
  licenseNumber?: string;
  licenseState?: string;
  npiNumber?: string;
  targetCmeCredits?: number;
  interests: OnboardingInterest[];
  goals: OnboardingGoal[];
  preferredLearningTime: PreferredLearningTime;
  completedAt?: string;
}

export interface DevelopmentGoal {
  id: string;
  title: string;
  progress: number;
  category: string;
  targetLabel: string;
  recommendedCourseId?: string;
}

// ==========================================
// B2B ORGANIZATION & ENTERPRISE PORTAL TYPES
// ==========================================

export type OrgType =
  | 'Pharmaceutical Company'
  | 'Medical Device Company'
  | 'Hospital & Health System'
  | 'Medical Society / Association'
  | 'Healthcare Research Network';

export type ProgramStatus = 'Draft' | 'Active' | 'Completed' | 'Archived';
export type OrgContentStatus = 'Draft' | 'In Review' | 'Published' | 'Archived';
export type OrgContentType = 'Courses' | 'Videos' | 'Articles' | 'Assessments' | 'Events';
export type OrgUserRole = 'Admin' | 'Editor' | 'Analyst' | 'Viewer';

export interface OrgLearningProgram {
  id: string;
  title: string;
  description: string;
  targetSpecialty: Specialty | 'Multi-Specialty';
  audienceCount: number;
  enrolledCount: number;
  completedCount: number;
  completionRate: number;
  avgEngagementMinutes: number;
  status: ProgramStatus;
  coursesCount: number;
  courseIds: string[];
  courseNames?: string[];
  audienceType: string;
  startDate: string;
  endDate: string;
  sponsoredBy?: string;
  bannerImage?: string;
  accreditedCredits?: number;
  keyLearningObjectives?: string[];
}

export interface OrgContentItem {
  id: string;
  title: string;
  type: 'Course' | 'Video' | 'Article' | 'Assessment' | 'Event';
  specialty: Specialty;
  status: 'Published' | 'In Review' | 'Draft' | 'Archived';
  views: number;
  completionRate: number;
  durationOrCredits: string;
  updatedAt: string;
  authorOrFaculty: string;
  category?: string;
}

export interface AudienceMember {
  id: string;
  name: string;
  email: string;
  role: string;
  specialty: Specialty | string;
  institution: string;
  country: string;
  program: string;
  engagementMinutes: number;
  status: 'Active' | 'Enrolled' | 'Completed' | 'Invited';
  completionRate: number;
  lastActive: string;
  avatar: string;
  verifiedLicense?: boolean;
}

export interface OrgTeamMemberRole {
  id: string;
  name: string;
  email: string;
  role: OrgUserRole;
  department: string;
  avatar: string;
  status: 'Active' | 'Invited' | 'Suspended';
  lastLogin: string;
}

export interface OrganizationProfile {
  id: string;
  name: string;
  type: OrgType;
  logo: string;
  bannerUrl: string;
  website: string;
  primaryContact: string;
  contactEmail: string;
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  seatLimit: number;
  seatsOccupied: number;
  contractTier: 'Enterprise Global' | 'Health System Pro' | 'Specialty Society Partner';
  renewalDate: string;
}

export interface DemoRequestData {
  companyName: string;
  companyType: OrgType | string;
  contactName: string;
  workEmail: string;
  jobTitle: string;
  phone?: string;
  targetAudienceSize: string;
  primaryGoal: string;
  notes?: string;
}

// ==========================================
// SUPER ADMIN DASHBOARD TYPES
// ==========================================

export type AdminCourseStatus = 'Draft' | 'Under Review' | 'Published' | 'Archived';

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  specialty: string;
  institution: string;
  country: string;
  licenseStatus: 'Verified' | 'Pending Verification' | 'Expired';
  licenseNumber: string;
  registeredDate: string;
  lastLogin: string;
  creditsEarned: number;
  status: 'Active' | 'Suspended' | 'Pending Approval';
}

export interface AdminCourseRecord {
  id: string;
  title: string;
  specialty: Specialty;
  facultyName: string;
  credits: number;
  enrolledTotal: number;
  completionsTotal: number;
  status: AdminCourseStatus;
  submittedDate: string;
  reviewScore?: number;
  accreditationBody: string;
}

export interface AdminOrgRecord {
  id: string;
  name: string;
  type: OrgType;
  contractTier: string;
  activeProgramsCount: number;
  professionalsReached: number;
  seatsUsed: number;
  seatsTotal: number;
  mrrOrValue: string;
  status: 'Active Contract' | 'Trial' | 'Renewal Pending';
}

export interface AdminCertificateRecord {
  id: string;
  certificateCode: string;
  courseTitle: string;
  recipientName: string;
  recipientEmail: string;
  specialty: string;
  credits: number;
  issuedAt: string;
  parsSyncStatus: 'Synced to ACCME PARS' | 'Pending Sync' | 'Failed Validation';
  boardReportingId?: string;
}

