import {
  Course,
  Faculty,
  ClinicalGuidelineAlert,
  WebinarEvent,
  CommunityCase,
  CommunityPost,
  Certificate,
  UserProfile,
  NotificationItem,
  OrgTeamMember,
} from '../types';
import { ALL_MOCK_COURSES } from './mockCoursesList';
import { EXTENDED_FACULTY, ALL_SPECIALTIES_DATA, DEMO_LEARNING_JOURNEY_PATH } from './coursesData';

export { ALL_SPECIALTIES_DATA, DEMO_LEARNING_JOURNEY_PATH };

export const DEMO_FACULTY: Faculty[] = EXTENDED_FACULTY;

export const DEMO_COURSES: Course[] = ALL_MOCK_COURSES;

export const DEMO_GUIDELINE_ALERTS: ClinicalGuidelineAlert[] = [
  {
    id: 'alert-1',
    title: 'FDA Drug Safety Alert: Semaglutide & GLP-1 RA Perioperative Aspiration Risks',
    issuingBody: 'US FDA & American Society of Anesthesiologists (ASA)',
    date: 'Aug 18, 2026',
    severity: 'Practice Changing',
    summary: 'Updated recommendations on holding GLP-1 agonists prior to elective surgical procedures under general anesthesia to mitigate delayed gastric emptying risks.',
    relatedSpecialty: 'Surgery & Anesthesia',
    actionItem: 'Review revised pre-op fasting and point-of-care gastric ultrasound protocol.',
    cmeModuleId: 'cme-cardio-101'
  },
  {
    id: 'alert-2',
    title: '2026 ACC/AHA Guideline Update: Non-Statin Lipid Lowering Therapies in High-Risk ASCVD',
    issuingBody: 'American College of Cardiology / AHA',
    date: 'Aug 10, 2026',
    severity: 'Updated Guidance',
    summary: 'Bempedoic acid and PCSK9 siRNA (Inclisiran) elevated in treatment hierarchy for statin-intolerant patients with LDL-C > 70 mg/dL.',
    relatedSpecialty: 'Cardiology',
    actionItem: 'Access new multi-pathway lipid lowering algorithm.',
    cmeModuleId: 'cme-cardio-101'
  },
  {
    id: 'alert-3',
    title: 'CDC & IDSA Alert: Emergence of Hypervirulent Klebsiella pneumoniae (hvKp) ST23',
    issuingBody: 'Centers for Disease Control and Prevention',
    date: 'Jul 28, 2026',
    severity: 'Safety Alert',
    summary: 'Increased reporting of invasive community-acquired hepatic abscesses and bacteremia caused by carbapenem-resistant hvKp isolates.',
    relatedSpecialty: 'Infectious Disease',
    actionItem: 'Implement genotypic wzi sequencing and enhanced contact precautions.',
    cmeModuleId: 'cme-pharm-505'
  }
];

export const DEMO_WEBINARS: WebinarEvent[] = [
  {
    id: 'webinar-1',
    title: 'Live Grand Rounds: Renal Denervation in Real-World Resistant Hypertension',
    description: 'Multi-disciplinary live debate between interventional cardiologists and nephrologists on patient selection, procedural durability, and medication burden reduction.',
    category: 'Webinars',
    specialty: 'Cardiology',
    speaker: DEMO_FACULTY[0],
    date: 'Tomorrow, Aug 28, 2026',
    timeString: '12:00 PM - 1:15 PM EST',
    timezone: 'EST (UTC-5)',
    durationMinutes: 75,
    credits: 1.25,
    attendeesCount: 840,
    maxCapacity: 1500,
    status: 'Upcoming',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    locationOrPlatform: 'Medvora Live Interactive Studio & CME Broadcast',
    learningObjectives: [
      'Review RADIANCE and SPYRAL clinical trial 3-year ambulatory blood pressure outcomes.',
      'Assess anatomical suitability on renal CTA/MRA with vessel diameter thresholds.',
      'Formulate post-denervation antihypertensive de-escalation and safety monitoring protocols.'
    ],
    agenda: [
      {
        time: '12:00 - 12:15 PM',
        title: 'Trial Evidence & 3-Year Ambulatory Blood Pressure Drops',
        speakerName: 'Dr. Sarah Jenkins, MD, FACC',
        speakerRole: 'Director of Interventional Cardiology, Johns Hopkins',
        description: 'Deep dive into long-term sham-controlled data and resistant hypertension registries.'
      },
      {
        time: '12:15 - 12:45 PM',
        title: 'Catheter Selection & Step-by-Step Radiofrequency vs Ultrasound Ablation',
        speakerName: 'Dr. Sarah Jenkins, MD, FACC',
        speakerRole: 'Director of Interventional Cardiology, Johns Hopkins',
        description: 'Bedside fluoroscopy video breakdown of main renal artery and branch vessel ablation.'
      },
      {
        time: '12:45 - 1:15 PM',
        title: 'Live Q&A, Case Panel & Medication De-Escalation Protocol',
        speakerName: 'Multidisciplinary Panel',
        speakerRole: 'Cardiology & Nephrology Chairs',
        description: 'Interactive audience polling on clinical dilemmas and post-procedure renal function.'
      }
    ],
    relatedCourseIds: ['cme-cardio-101'],
    registered: true
  },
  {
    id: 'webinar-3',
    title: 'Interactive Case Conference: CAR-T Cell Neurotoxicity & Immune Effector Cell-Associated Neurotoxicity Syndrome (ICANS)',
    description: 'Live case review with real-time audience polling: grading ICANS severity, immune-mediated seizure management, and Anakinra vs Corticosteroid protocols.',
    category: 'Live Sessions',
    specialty: 'Oncology',
    speaker: DEMO_FACULTY[1],
    date: 'Today',
    timeString: 'Ongoing (Live Stream Active)',
    timezone: 'EST (UTC-5)',
    durationMinutes: 60,
    credits: 1.0,
    attendeesCount: 650,
    maxCapacity: 1000,
    status: 'Live Now',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    locationOrPlatform: 'Medvora Ultra-HD Interactive Stream',
    learningObjectives: [
      'Accurately calculate ICE (Immune Effector Cell-Associated Encephalopathy) score.',
      'Differentiate cytokine release syndrome (CRS) from ICANS management pathways.',
      'Implement prompt Anakinra (IL-1 receptor antagonist) escalation when steroids stall.'
    ],
    agenda: [
      {
        time: '00:00 - 00:20',
        title: 'Case Vignette: 58yo with Relapsed DLBCL Developing Tremor & Dysgraphia',
        speakerName: 'Dr. Marcus Vance, MD, PhD',
        speakerRole: 'Chief of Thoracic & Precision Oncology, MSKCC',
        description: 'Initial presentation 5 days post-axicabtagene ciloleucel infusion.'
      },
      {
        time: '00:20 - 00:45',
        title: 'ICANS Severity Grading & Neuroimaging Protocol',
        speakerName: 'Dr. Marcus Vance, MD, PhD',
        speakerRole: 'Chief of Thoracic & Precision Oncology, MSKCC',
        description: 'MRI brain FLAIR findings, CSF opening pressure, and EEG background slowing.'
      },
      {
        time: '00:45 - 01:00',
        title: 'Interactive Case Debate & Steroid vs IL-1 Blockade Strategy',
        speakerName: 'Live Panel & Audience',
        speakerRole: 'Oncology & Neurocritical Care Faculty',
        description: 'Audience real-time poll on steroid dose timing and prophylactic levetiracetam.'
      }
    ],
    relatedCourseIds: ['cme-onco-202'],
    registered: true
  },
  {
    id: 'webinar-2',
    title: 'Next-Generation AI in Diagnostic Radiology: Real-World Clinical Integration & Medicolegal Boundaries',
    description: 'Expert panel exploring computer-aided nodule detection, stroke CTP automated analysis, and mitigating cognitive bias in AI-augmented clinical reads.',
    category: 'Expert Talks',
    specialty: 'Radiology',
    speaker: DEMO_FACULTY[4],
    date: 'Sep 04, 2026',
    timeString: '6:00 PM - 7:30 PM EST',
    timezone: 'EST (UTC-5)',
    durationMinutes: 90,
    credits: 1.5,
    attendeesCount: 1120,
    maxCapacity: 2000,
    status: 'Upcoming',
    locationOrPlatform: 'Stanford Medical Center Virtual Auditorium',
    learningObjectives: [
      'Evaluate false positive rates of AI algorithms in emergent intracranial hemorrhage.',
      'Understand liability frameworks for automated vs. physician-overread reports.',
      'Implement validation checklists before deploying new imaging AI models in hospital PACS.'
    ],
    agenda: [
      {
        time: '6:00 - 6:30 PM',
        title: 'Clinical Accuracy Benchmarks Across 10,000 Emergency CT Scans',
        speakerName: 'Dr. Rebecca Lin, MD, FACR',
        speakerRole: 'Chief of Thoracic & Emergency Imaging, Stanford',
        description: 'Where AI excels and where edge-case artifacts lead to misinterpretation.'
      },
      {
        time: '6:30 - 7:00 PM',
        title: 'Medicolegal Responsibilities & AMA Guidelines on Augmented Diagnostics',
        speakerName: 'Guest Legal & Clinical Ethics Panel',
        speakerRole: 'Healthcare Law & Clinical Informatics',
        description: 'Case law analysis of discrepancies between algorithmic detection and physician sign-off.'
      },
      {
        time: '7:00 - 7:30 PM',
        title: 'Open Faculty Fireside & Live Viewer Q&A',
        speakerName: 'Dr. Rebecca Lin & Panel',
        speakerRole: 'Clinical Radiology Leadership',
        description: 'Direct interactive Q&A answering workflow and implementation inquiries.'
      }
    ],
    relatedCourseIds: ['cme-rad-102'],
    registered: false
  },
  {
    id: 'webinar-4',
    title: 'Annual Cardiovascular Innovation Conference: Multi-Omics & Precision Cardiology Symposium',
    description: 'A 2-day virtual clinical conference bringing together world leaders to address complex coronary disease, cardiac amyloidosis, and dual-incretin therapeutic integration.',
    category: 'Conferences',
    specialty: 'Cardiology',
    speaker: DEMO_FACULTY[0],
    date: 'Sep 18 - 19, 2026',
    timeString: '9:00 AM - 4:00 PM EST Daily',
    timezone: 'EST (UTC-5)',
    durationMinutes: 480,
    credits: 8.0,
    attendeesCount: 2450,
    maxCapacity: 5000,
    status: 'Upcoming',
    locationOrPlatform: 'Medvora Virtual Global Conference Pavilion',
    learningObjectives: [
      'Examine single-cell genomics in atherosclerotic plaque vulnerability.',
      'Formulate guideline-directed medical therapy in HFpEF with cardiometabolic phenotype.',
      'Review structural heart transcatheter mitral and tricuspid valve innovations.'
    ],
    agenda: [
      {
        time: 'Day 1 (9:00 AM)',
        title: 'Keynote: The Changing Landscape of Cardiovascular Risk in the Incretin Era',
        speakerName: 'Dr. Jonathan Vance, MD, FACP',
        speakerRole: 'Director of Preventive Cardiology, Brigham & Women’s',
        description: 'Triple-agonist peptides and major adverse cardiovascular event (MACE) reductions.'
      },
      {
        time: 'Day 1 (1:00 PM)',
        title: 'Symposium: Structural Heart Interventions & Imaging Masterclass',
        speakerName: 'Dr. Sarah Jenkins, MD, FACC',
        speakerRole: 'Director of Interventional Cardiology, Johns Hopkins',
        description: 'TAVR, TEER, and tricuspid edge-to-edge repair clinical selection algorithms.'
      },
      {
        time: 'Day 2 (10:00 AM)',
        title: 'Grand Debate: Catheter Ablation vs Antiarrhythmic Drugs in Early AFib',
        speakerName: 'Electrophysiology Chairs',
        speakerRole: 'ACC/HRS Joint Panel',
        description: 'Pulsed-field ablation (PFA) clinical registry findings vs cryoballoon outcomes.'
      }
    ],
    relatedCourseIds: ['cme-cardio-101'],
    registered: false
  }
];

export const DEMO_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'How are you adapting clinical workflows to AI-assisted documentation?',
    content: 'We recently piloted ambient clinical intelligence in our outpatient cardiology and internal medicine clinics. While draft note completion time dropped by ~35 minutes per clinic session, our clinicians have noted subtle cognitive traps: verbatim transcription of conversational tangents, occasional hallucination of normal physical exam findings that were only implied, and billing coding discrepancies. \n\nHow are your health systems designing guardrails and physician review workflows? Are you mandating specific attestation checkboxes before note sign-off?',
    category: 'Discussions',
    specialty: 'Primary Care',
    author: {
      id: 'author-1',
      name: 'Dr. Jonathan Vance, MD, FACP',
      role: 'Director of Preventive Medicine',
      credentials: 'MD, FACP, FNLA',
      specialty: 'Primary Care',
      institution: 'Brigham and Women’s Hospital',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      verified: true,
      followersCount: 4600,
      isFollowing: false,
    },
    timestamp: '3 hours ago',
    likesCount: 54,
    hasLiked: true,
    commentsCount: 18,
    saved: true,
    tags: ['ClinicalAI', 'HealthInformatics', 'WorkflowOptimization', 'PhysicianWellbeing'],
    citation: 'Tierney AA et al. Ambient Artificial Intelligence for Clinical Documentation. JAMA. 2024; 332(11):921-928.',
    comments: [
      {
        id: 'comm-101',
        author: {
          name: 'Dr. Sarah Chen, MD',
          role: 'Attending Physician',
          credentials: 'MD',
          specialty: 'Cardiology',
          institution: 'Pacific Heart & Vascular Institute',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
          verified: true,
        },
        content: 'We implemented a strict "Red Flag Review" standard. The ambient scribe drafts the HPI and Medical Decision Making, but physical exam findings and medication changes require manual 1-click confirmation by the attending. This eliminated 100% of the phantom lung sound entries in our ICU stepdown clinic.',
        timestamp: '2 hours ago',
        likesCount: 22,
        hasLiked: true,
      },
      {
        id: 'comm-102',
        author: {
          name: 'Elena Rostova, DNP, AGACNP-BC',
          role: 'Critical Care NP',
          credentials: 'DNP, AGACNP-BC',
          specialty: 'Critical Care',
          institution: 'Cleveland Clinic',
          avatar: 'https://images.unsplash.com/photo-1594824813576-13a8904724a8?auto=format&fit=crop&q=80&w=400',
          verified: true,
        },
        content: 'Crucially, make sure you train the AI model on your institution-specific dot phrases and clinical protocol pathways. Once we customized our sepsis resuscitation and ventilator weaning note templates, accuracy jumped to over 96%.',
        timestamp: '1 hour ago',
        likesCount: 14,
        hasLiked: false,
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Interesting approaches to managing treatment adherence in complex multimorbid patients?',
    content: 'In patients taking 8+ daily medications for combined heart failure with preserved ejection fraction (HFpEF), stage 3b CKD, and type 2 diabetes, we frequently see adherence drop below 50% within 6 months of hospital discharge. \n\nWe have tested simplified once-daily fixed-dose co-formulations, pharmacist-led telephone titration check-ins at day 7/14, and connected digital pill organizers. What evidence-based interventions or multidisciplinary care pathways have produced the most tangible drop in 30-day readmissions in your practice?',
    category: 'Discussions',
    specialty: 'Clinical Pharmacology',
    author: {
      id: 'author-2',
      name: 'Dr. Tariq Hassan, PharmD, BCPS',
      role: 'Lead Clinical Pharmacy Specialist',
      credentials: 'PharmD, BCPS, BCGP',
      specialty: 'Clinical Pharmacology',
      institution: 'Northwestern Memorial Hospital',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
      verified: true,
      followersCount: 3120,
      isFollowing: true,
    },
    timestamp: '6 hours ago',
    likesCount: 41,
    hasLiked: false,
    commentsCount: 12,
    saved: false,
    tags: ['Polypharmacy', 'MedicationAdherence', 'CareTransitions', 'Cardiorenal'],
    citation: 'Nieuwlaat R et al. Interventions for enhancing medication adherence. Cochrane Database of Systematic Reviews 2014; (11):CD000011.',
    comments: [
      {
        id: 'comm-201',
        author: {
          name: 'Dr. Maya Patel, MD, FAAP',
          role: 'Chief of Pediatric Endocrinology',
          credentials: 'MD, FAAP',
          specialty: 'Pediatrics',
          institution: 'Boston Children’s Hospital',
          avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
          verified: true,
        },
        content: 'While my focus is pediatrics, the behavioral psychology is identical: transition from "list of pills" to "event-triggered routines" (e.g. morning toothbrushing trigger). Combining this with a unified clinical portal that syncs with family caregivers produced a 40% jump in compliance.',
        timestamp: '4 hours ago',
        likesCount: 16,
        hasLiked: false,
      }
    ]
  },
  {
    id: 'post-3',
    title: 'Latest developments in cardiovascular care: Dual-Pathway Inhibition & Incretin Cardiometabolic Rollouts',
    content: 'The 2026 ACC scientific sessions highlighted a pivotal transition in cardiovascular therapeutics: the shift from isolated risk factor reduction toward integrated cardiometabolic organ protection. \n\nThree key clinical pearls all practitioners should integrate into bedside practice this quarter: \n1. Combined SGLT2i + GLP-1/GIP receptor co-agonists demonstrate additive cardiorenal risk reduction without increased hypoglycemia. \n2. Non-statin lipid therapies (Bempedoic acid + PCSK9 siRNA Inclisiran) show robust 60%+ LDL-C reductions in statin-associated muscle symptom cohorts. \n3. Routine early initiation of Finerenone in T2D with persistent microalbuminuria (UACR > 30 mg/g) significantly delays progression to end-stage kidney disease.',
    category: 'Clinical Insights',
    specialty: 'Cardiology',
    author: {
      id: 'author-3',
      name: 'Dr. Sarah Jenkins, MD, FACC',
      role: 'Director of Interventional Cardiology',
      credentials: 'MD, FACC, FSCAI',
      specialty: 'Cardiology',
      institution: 'Johns Hopkins Medicine',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      verified: true,
      followersCount: 3840,
      isFollowing: true,
    },
    timestamp: '1 day ago',
    likesCount: 89,
    hasLiked: true,
    commentsCount: 24,
    saved: true,
    tags: ['Cardiology', 'HeartFailure', 'SGLT2i', 'Lipidology', 'Finerenone'],
    citation: 'ACC/AHA 2026 Guideline Update on the Management of Heart Failure and Cardiometabolic Risk. J Am Coll Cardiol. 2026; 87(5):610-642.',
    comments: [
      {
        id: 'comm-301',
        author: {
          name: 'Dr. Kevin Zhao, MD, FHRS',
          role: 'Cardiac Electrophysiologist',
          credentials: 'MD, FHRS',
          specialty: 'Cardiology',
          institution: 'Stanford Health Care',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
          verified: true,
        },
        content: 'Fascinatingly, SGLT2 inhibitors also reduce atrial fibrillation recurrence post-catheter ablation by 22% in our registry cohort, likely due to left atrial reverse remodeling and decreased left ventricular end-diastolic pressures.',
        timestamp: '18 hours ago',
        likesCount: 19,
        hasLiked: true,
      }
    ]
  },
  {
    id: 'post-4',
    title: '64yo Male with Refractory Ventricular Tachycardia Storm: Ablation vs Bedside Neuromodulation',
    content: 'Patient presentation: 64yo male, history of anterior STEMI with ischemic cardiomyopathy (LVEF 28%), presenting to CCU with 12 ICD shocks in 6 hours. Currently on continuous Amiodarone infusion + Lidocaine drip with persistent monomorphic VT bursts (CL 360ms). Serum K+ is 4.8 mEq/L, Mg2+ 2.4 mg/dL. \n\nWhile preparing the electrophysiology lab for emergent catheter ablation, bedside left percutaneous stellate ganglion block (PSGB) with 10 mL 0.5% Bupivacaine under ultrasound guidance was performed, achieving immediate hemodynamic stabilization and suppression of ventricular arrhythmias.',
    category: 'Case Discussions',
    specialty: 'Cardiology',
    author: {
      id: 'author-4',
      name: 'Dr. Kevin Zhao, MD, FHRS',
      role: 'Cardiac Electrophysiologist',
      credentials: 'MD, FHRS',
      specialty: 'Cardiology',
      institution: 'Stanford Health Care',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      verified: true,
      followersCount: 2480,
      isFollowing: false,
    },
    timestamp: '2 days ago',
    likesCount: 68,
    hasLiked: false,
    commentsCount: 15,
    saved: true,
    tags: ['VTStorm', 'StellateGanglionBlock', 'Electrophysiology', 'CriticalCare'],
    citation: 'Savastano S et al. Percutaneous Left Stellate Ganglion Block in Refractory Ventricular Arrhythmias. JACC: Clin Electrophysiol. 2021; 7(12):1561-1570.',
    patientVignette: {
      ageGender: '64yo Male, Ischemic Cardiomyopathy',
      vitals: 'BP 92/58, HR 168 (VT), SpO2 94% on 4L NC',
      keyLabs: 'K+ 4.8 mEq/L, Mg2+ 2.4 mg/dL, Troponin I 0.84 ng/mL'
    },
    comments: [
      {
        id: 'comm-401',
        author: {
          name: 'Elena Rostova, DNP, AGACNP-BC',
          role: 'Critical Care NP',
          credentials: 'DNP, AGACNP-BC',
          specialty: 'Critical Care',
          institution: 'Cleveland Clinic',
          avatar: 'https://images.unsplash.com/photo-1594824813576-13a8904724a8?auto=format&fit=crop&q=80&w=400',
          verified: true,
        },
        content: 'We also initiate deep sedation with Propofol/Dexmedetomidine immediately to extinguish central sympathetic outflow. Excellent demonstration of ultrasound-guided PSGB as an indispensable emergency bridge.',
        timestamp: '1 day ago',
        likesCount: 27,
        hasLiked: true,
      }
    ]
  },
  {
    id: 'post-5',
    title: 'Expert Panel Conversation: Overcoming Diagnostic Pitfalls in CAR-T Neurotoxicity (ICANS)',
    content: 'Key insights from our multidisciplinary oncology and neurocritical care consensus: \n\n• Early ICANS often presents as handwriting impairment (dysgraphia) and subtle expressive aphasia before any gross motor deficit or obtundation occurs. Daily bedside writing tests are mandatory. \n• Unlike CRS (which is driven by IL-6 and responds rapidly to Tocilizumab), ICANS is predominantly mediated by IL-1 and GM-CSF trafficking across the blood-brain barrier. Tocilizumab monotherapy in isolated ICANS may exacerbate neurotoxicity due to temporary increases in circulating unbound serum IL-6. \n• Corticosteroids (Dexamethasone 10 mg IV q6h) remain first-line, with rapid transition to Anakinra if progression continues within 12-24 hours.',
    category: 'Expert Conversations',
    specialty: 'Oncology',
    author: {
      id: 'author-5',
      name: 'Dr. Marcus Vance, MD, PhD, FASCO',
      role: 'Chief of Thoracic & Precision Oncology',
      credentials: 'MD, PhD, FASCO',
      specialty: 'Oncology',
      institution: 'Memorial Sloan Kettering Cancer Center',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      verified: true,
      followersCount: 5120,
      isFollowing: false,
    },
    timestamp: '3 days ago',
    likesCount: 76,
    hasLiked: true,
    commentsCount: 20,
    saved: true,
    tags: ['ICANS', 'Oncology', 'CellularTherapy', 'NeurocriticalCare', 'ImmunotherapyToxicity'],
    citation: 'Neelapu SS et al. Chimeric antigen receptor T-cell therapy — assessment and management of toxicities. Nat Rev Clin Oncol. 2018; 15(1):47-62.',
    comments: [
      {
        id: 'comm-501',
        author: {
          name: 'Dr. Aris Thorne, MD, FAAN',
          role: 'Director of Stroke & Neuro ICU',
          credentials: 'MD, FAAN',
          specialty: 'Neurology',
          institution: 'Massachusetts General Hospital',
          avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
          verified: true,
        },
        content: 'From the neurocritical perspective, continuous video EEG is essential if ICE score drops below 5 to detect non-convulsive status epilepticus. We start prophylactic Levetiracetam (750 mg BID) for all grade 2+ ICANS patients.',
        timestamp: '2 days ago',
        likesCount: 31,
        hasLiked: true,
      }
    ]
  }
];

export const DEMO_COMMUNITY_CASES: CommunityCase[] = [
  {
    id: 'case-1',
    title: '64yo Male with Refractory Ventricular Tachycardia Storm on Dual Antiarrhythmics: Catheter Ablation vs. Stellate Ganglion Block?',
    author: {
      name: 'Dr. Kevin Zhao, MD, FHRS',
      role: 'Cardiac Electrophysiologist',
      institution: 'Stanford Health Care',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      verified: true
    },
    specialty: 'Cardiology',
    patientAgeGender: '64yo Male, Post-Anterior STEMI (LVEF 28%)',
    presentingSymptoms: '12 ICD shocks in the preceding 6 hours despite Amiodarone IV infusion and Lidocaine continuous gtt.',
    initialWorkup: 'Serum K+ 4.8 mEq/L, Mg2+ 2.4 mg/dL. 12-lead ECG shows monomorphic VT with CL 360ms originating from the anterior scarred border zone.',
    challengeQuestion: 'In the acute emergency setting while preparing the EP lab, what neuromodulatory bedside procedure rapidly dampens sympathetic overdrive?',
    votes: 42,
    userVoted: true,
    repliesCount: 9,
    status: 'Open for Discussion',
    tags: ['VT Storm', 'Electrophysiology', 'Stellate Ganglion Block', 'ICD'],
    createdAt: '3 hours ago',
    replies: [
      {
        id: 'rep-1',
        author: {
          name: 'Dr. Sarah Jenkins, MD, FACC',
          role: 'Professor of Cardiovascular Medicine',
          institution: 'Johns Hopkins Medicine',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
          verified: true
        },
        content: 'Bedside left percutaneous stellate ganglion block (PSGB) with 10 mL 0.5% Bupivacaine under ultrasound guidance can immediately abort VT storm in over 60% of refractory cases, providing a vital hemodynamic bridge to catheter ablation.',
        timestamp: '2 hours ago',
        upvotes: 28,
        isEvidenceBased: true,
        citation: 'Savastano S et al. JACC: Clinical Electrophysiology 2021; 7(12):1561-1570.'
      },
      {
        id: 'rep-2',
        author: {
          name: 'Elena Rostova, DNP, AGACNP-BC',
          role: 'Critical Care NP',
          institution: 'Cleveland Clinic',
          avatar: 'https://images.unsplash.com/photo-1594824813576-13a8904724a8?auto=format&fit=crop&q=80&w=200',
          verified: true
        },
        content: 'Remember to also consider deep sedation and intubation with Propofol/Dexmedetomidine to abolish endogenous catecholamine surges while the anesthesiology/EP team organizes.',
        timestamp: '1 hour ago',
        upvotes: 14,
        isEvidenceBased: true
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Atypical Meningitis in an Immunocompromised Renal Transplant Recipient: Rapid Multiplex PCR Diagnostic Dilemma',
    author: {
      name: 'Dr. Priya Nair, MD, FIDSA',
      role: 'Infectious Disease Attending',
      institution: 'UCSF Medical Center',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
      verified: true
    },
    specialty: 'Infectious Disease',
    patientAgeGender: '52yo Female, Kidney Transplant 2 years ago (on Tacrolimus + MMF)',
    presentingSymptoms: 'Subacute headache for 10 days, low-grade fevers, mild cranial nerve VI palsy without marked nuchal rigidity.',
    initialWorkup: 'CSF WBC 140 (82% lymphocytes), Glucose 24 mg/dL (serum 110), Protein 185 mg/dL. BioFire ME Panel is negative for common bacterial pathogens.',
    challengeQuestion: 'Which high-yield diagnostic fungal/atypical test is critical before initiating empiric steroids?',
    votes: 38,
    repliesCount: 6,
    status: 'Consensus Reached',
    tags: ['Cryptococcus', 'Transplant ID', 'CSF Diagnostics', 'Neuroinfections'],
    createdAt: '1 day ago',
    replies: [
      {
        id: 'rep-3',
        author: {
          name: 'Dr. Tariq Al-Mansoor, PharmD',
          role: 'Lead Clinical Pharmacy Specialist',
          institution: 'Mayo Clinic',
          avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
          verified: true
        },
        content: 'CSF Cryptococcal Antigen (CrAg) lateral flow assay and fungal culture are paramount. In transplant recipients, Cryptococcus neoformans can present indolently. If positive, induction with Liposomal Amphotericin B + Flucytosine is the gold standard.',
        timestamp: '18 hours ago',
        upvotes: 25,
        isEvidenceBased: true,
        citation: 'Perfect JR et al. Clinical Infectious Diseases (IDSA Guidelines for Cryptococcal Disease)'
      }
    ]
  }
];

export const DEMO_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-med-2026-8819',
    courseId: 'cme-cardio-101',
    courseTitle: 'Modern Approaches to Heart Failure Management',
    recipientName: 'Dr. Sarah Chen, MD',
    recipientLicense: 'MD-CA-948210',
    recipientSpecialty: 'Cardiology',
    creditsEarned: 1.5,
    accreditationType: 'AMA PRA Category 1 Credit™',
    accreditationBody: 'Accreditation Council for Continuing Medical Education (ACCME)',
    issueDate: 'August 24, 2026',
    verificationCode: 'MEDV-881942',
    accreditationStatement: 'Medvora designates this enduring educational activity for 1.50 AMA PRA Category 1 Credit™. Physicians and healthcare practitioners should claim only the credit commensurate with the extent of their participation in the activity.',
    facultyName: 'Dr. Sarah Jenkins, MD, FACC',
    facultyTitle: 'Professor of Cardiovascular Medicine, Johns Hopkins Medicine'
  },
  {
    id: 'cert-med-2026-7241',
    courseId: 'cme-neuro-303',
    courseTitle: 'Acute Ischemic Stroke: Extended Window Thrombectomy & Tenecteplase Protocols',
    recipientName: 'Dr. Sarah Chen, MD',
    recipientLicense: 'MD-CA-948210',
    recipientSpecialty: 'Cardiology',
    creditsEarned: 1.5,
    accreditationType: 'AMA PRA Category 1 Credit™',
    accreditationBody: 'American Heart Association / ASA & ACCME',
    issueDate: 'August 12, 2026',
    verificationCode: 'MEDV-724190',
    accreditationStatement: 'Medvora designates this clinical educational activity for 1.50 AMA PRA Category 1 Credits™. Physicians should claim only the credit commensurate with the extent of their participation in the activity.',
    facultyName: 'Dr. Aris Thorne, MD, FAAN',
    facultyTitle: 'Director of Comprehensive Stroke Center, Massachusetts General Hospital'
  }
];

export const DEMO_USER_PERSONAS: Record<string, UserProfile> = {
  physician: {
    id: 'user-doc-sarah',
    name: 'Dr. Sarah Chen, MD',
    email: 'sarah.chen@medvora.demo',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    role: 'Attending Physician (MD/DO)',
    primarySpecialty: 'Cardiology',
    secondarySpecialties: ['Critical Care', 'Clinical Pharmacology'],
    institution: 'Pacific Heart & Vascular Institute',
    licenseNumber: 'MD-CA-948210',
    stateOrCountry: 'California, USA',
    annualCmeTarget: 50,
    completedCmeThisYear: 38.5,
    cmeRequirementDeadline: 'Dec 31, 2026',
    streakDays: 14,
    isProMember: true,
    memberSince: 'March 2024',
    preferredFormats: ['Clinical Masterclass', 'Micro-Capsule', 'Grand Rounds'],
    hospitalDepartment: 'Cardiology & Intensive Coronary Care Unit',
    isAdmin: false
  },
  nurse: {
    id: 'user-np-elena',
    name: 'Elena Garcia, MSN, AGACNP-BC',
    email: 'elena.garcia@medvora.demo',
    avatar: 'https://images.unsplash.com/photo-1594824813576-13a8904724a8?auto=format&fit=crop&q=80&w=400',
    role: 'Nurse Practitioner / CNS (NP/APRN)',
    primarySpecialty: 'Critical Care',
    secondarySpecialties: ['Emergency Medicine', 'Cardiology'],
    institution: 'Memorial Health University Medical Center',
    licenseNumber: 'APRN-TX-849102',
    stateOrCountry: 'Texas, USA',
    annualCmeTarget: 40,
    completedCmeThisYear: 31.0,
    cmeRequirementDeadline: 'Nov 30, 2026',
    streakDays: 9,
    isProMember: true,
    memberSince: 'January 2024',
    preferredFormats: ['Clinical Masterclass', 'Interactive Case Lab'],
    hospitalDepartment: 'Medical ICU',
    isAdmin: false
  },
  pharmacist: {
    id: 'user-pharm-tariq',
    name: 'Dr. Tariq Hassan, PharmD, BCPS',
    email: 'tariq.hassan@medvora.demo',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    role: 'Clinical Pharmacist (PharmD)',
    primarySpecialty: 'Clinical Pharmacology',
    secondarySpecialties: ['Infectious Disease', 'Oncology'],
    institution: 'Northwestern Memorial Hospital',
    licenseNumber: 'RPh-IL-339182',
    stateOrCountry: 'Illinois, USA',
    annualCmeTarget: 30,
    completedCmeThisYear: 24.5,
    cmeRequirementDeadline: 'Oct 31, 2026',
    streakDays: 21,
    isProMember: true,
    memberSince: 'June 2023',
    preferredFormats: ['Micro-Capsule', 'Guideline Update'],
    hospitalDepartment: 'Inpatient Pharmacy & Antimicrobial Stewardship',
    isAdmin: false
  },
  admin: {
    id: 'user-admin-marcus',
    name: 'Dr. Marcus Vance, MD (Chief Medical Officer & Admin)',
    email: 'marcus.vance@medvora.demo',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    role: 'Attending Physician (MD/DO)',
    primarySpecialty: 'Oncology',
    secondarySpecialties: ['Surgery & Anesthesia'],
    institution: 'MetroHealth University Health System',
    licenseNumber: 'MD-NY-771890',
    stateOrCountry: 'New York, USA',
    annualCmeTarget: 50,
    completedCmeThisYear: 48.0,
    cmeRequirementDeadline: 'Dec 31, 2026',
    streakDays: 45,
    isProMember: true,
    memberSince: 'September 2022',
    preferredFormats: ['Clinical Masterclass', 'Grand Rounds'],
    hospitalDepartment: 'Executive Leadership & Cancer Center',
    isAdmin: true
  }
};

export const DEMO_USER_PROFILE: UserProfile = DEMO_USER_PERSONAS.physician;

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Your certificate is ready.',
    message: 'Your official accredited CME certificate for "Modern Approaches to Heart Failure Management" (1.50 AMA PRA Cat 1 Credits™) is verified and ready for download.',
    type: 'cme_earned',
    timestamp: '20 minutes ago',
    read: false,
    linkAction: 'certificates'
  },
  {
    id: 'notif-2',
    title: 'New course available in Cardiology.',
    message: 'New clinical course "Advances in Cardiometabolic Therapies & Dual Incretin Agonists" has just been added with 2.0 AMA PRA Category 1 Credits™.',
    type: 'cme_earned',
    timestamp: '2 hours ago',
    read: false,
    linkAction: 'courses'
  },
  {
    id: 'notif-3',
    title: 'Dr. Sarah Chen replied to your discussion.',
    message: 'Dr. Sarah Chen commented on your clinical post "Adapting clinical workflows to AI-assisted documentation" with bedside review guidelines.',
    type: 'community_reply',
    timestamp: '4 hours ago',
    read: false,
    linkAction: 'community'
  },
  {
    id: 'notif-4',
    title: 'Your webinar starts tomorrow.',
    message: '"Live Grand Rounds: Renal Denervation in Real-World Resistant Hypertension" with Dr. Sarah Jenkins starts tomorrow at 12:00 PM EST.',
    type: 'webinar_live',
    timestamp: '1 day ago',
    read: true,
    linkAction: 'webinars'
  },
  {
    id: 'notif-5',
    title: 'New learning recommendation available.',
    message: 'Based on your interest in Critical Care & Hemodynamics, a 10-minute micro-capsule on Sepsis Phenotyping is ready in your learning path.',
    type: 'guideline_update',
    timestamp: '2 days ago',
    read: true,
    linkAction: 'courses'
  },
  {
    id: 'notif-6',
    title: 'FDA Practice-Changing Drug Safety Alert',
    message: 'New clinical guidance issued for GLP-1 RA perioperative management in anesthesia and delayed gastric emptying protocols.',
    type: 'fda_alert',
    timestamp: '3 days ago',
    read: true,
    linkAction: 'guidelines'
  }
];

export const DEMO_ORG_TEAM: OrgTeamMember[] = [
  {
    id: 'tm-1',
    name: 'Dr. Sarah Chen, MD',
    email: 'sarah.chen@pacificheart.org',
    role: 'Interventional Cardiologist',
    department: 'Cardiology',
    creditsEarned: 38.5,
    targetCredits: 50,
    complianceRate: 77,
    status: 'Compliant',
    lastActive: 'Today, 2 hours ago'
  },
  {
    id: 'tm-2',
    name: 'Dr. Robert Miller, MD',
    email: 'robert.miller@pacificheart.org',
    role: 'Staff Cardiologist & Echo Lab',
    department: 'Cardiology',
    creditsEarned: 46.0,
    targetCredits: 50,
    complianceRate: 92,
    status: 'Compliant',
    lastActive: 'Yesterday'
  },
  {
    id: 'tm-3',
    name: 'Elena Garcia, MSN, APRN',
    email: 'elena.garcia@pacificheart.org',
    role: 'Lead Critical Care NP',
    department: 'Intensive Coronary Care Unit',
    creditsEarned: 31.0,
    targetCredits: 40,
    complianceRate: 77.5,
    status: 'Compliant',
    lastActive: '3 hours ago'
  },
  {
    id: 'tm-4',
    name: 'Dr. David Zhang, MD',
    email: 'david.zhang@pacificheart.org',
    role: 'Cardiology Fellow PGY-5',
    department: 'Fellowship Program',
    creditsEarned: 18.0,
    targetCredits: 50,
    complianceRate: 36,
    status: 'At Risk',
    lastActive: '4 days ago'
  },
  {
    id: 'tm-5',
    name: 'Dr. Jennifer Scott, MD',
    email: 'jennifer.scott@pacificheart.org',
    role: 'Cardiac Electrophysiologist',
    department: 'Cardiology',
    creditsEarned: 52.0,
    targetCredits: 50,
    complianceRate: 104,
    status: 'Compliant',
    lastActive: 'Today, 10 mins ago'
  },
  {
    id: 'tm-6',
    name: 'Markus Lindholm, PharmD',
    email: 'm.lindholm@pacificheart.org',
    role: 'Cardiology Clinical Pharmacist',
    department: 'Pharmacy Services',
    creditsEarned: 12.0,
    targetCredits: 30,
    complianceRate: 40,
    status: 'Overdue',
    lastActive: '9 days ago'
  }
];

export const SPECIALTY_CATEGORIES = ALL_SPECIALTIES_DATA.map(s => ({
  name: s.specialty,
  count: s.courseCount,
  iconName: s.iconName,
  description: s.shortDescription
}));

export const DEMO_DEVELOPMENT_GOALS = [
  {
    id: 'goal-1',
    title: 'Cardiology Knowledge',
    progress: 72,
    category: 'Clinical Core',
    targetLabel: 'Target: 80% Mastery',
    recommendedCourseId: 'cme-cardio-101'
  },
  {
    id: 'goal-2',
    title: 'Clinical Communication',
    progress: 45,
    category: 'Patient Care',
    targetLabel: 'Target: 60% Mastery',
    recommendedCourseId: 'cme-comm-104'
  },
  {
    id: 'goal-3',
    title: 'Digital Health & AI',
    progress: 30,
    category: 'Emerging Tech',
    targetLabel: 'Target: 50% Mastery',
    recommendedCourseId: 'cme-ai-105'
  },
  {
    id: 'goal-4',
    title: 'Evidence-Based Pharmacology',
    progress: 58,
    category: 'Therapeutics',
    targetLabel: 'Target: 75% Mastery',
    recommendedCourseId: 'cme-cardio-101'
  }
];

export const DEMO_TESTIMONIALS = [
  {
    id: 't-1',
    quote: 'Medvora transformed how our clinical team stays updated on trial evidence. The 10-minute micro-capsules fit effortlessly into between-consult breaks.',
    author: 'Dr. Sarah Jenkins, MD, FACC',
    role: 'Director of Interventional Cardiology',
    institution: 'Johns Hopkins Medicine',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    verifiedCmeUser: true
  },
  {
    id: 't-2',
    quote: 'The case simulations and verifiable CME credit logging save me over 30 hours of administrative tracking every re-licensure cycle. Unmatched clinical rigor.',
    author: 'Elena Rostova, DNP, AGACNP-BC',
    role: 'Lead Critical Care Nurse Practitioner',
    institution: 'Cleveland Clinic',
    avatar: 'https://images.unsplash.com/photo-1594824813576-13a8904724a8?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    verifiedCmeUser: true
  },
  {
    id: 't-3',
    quote: 'Having real-time guideline alerts mapped directly to interactive pharmacology drills has elevated our antimicrobial stewardship across the entire health system.',
    author: 'Dr. Tariq Al-Mansoor, PharmD, BCPS',
    role: 'Chief Clinical Pharmacist',
    institution: 'Mayo Clinic',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    verifiedCmeUser: true
  }
];

// ==========================================
// B2B ORGANIZATIONS MOCK DATA
// ==========================================

export const DEMO_ORGANIZATION_PROFILE = {
  id: 'org-novartis-cv',
  name: 'Novartis Cardiovascular & Metabolic Care',
  type: 'Pharmaceutical Company' as const,
  logo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=200',
  bannerUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
  website: 'https://novartis.medvora-enterprise.com',
  primaryContact: 'Dr. Kimberly Adams, VP Medical Affairs',
  contactEmail: 'kimberly.adams@novartis-medical.com',
  brandColors: {
    primary: '#0E9384',
    secondary: '#0A192F',
    accent: '#38BDF8',
  },
  seatLimit: 15000,
  seatsOccupied: 12480,
  contractTier: 'Enterprise Global' as const,
  renewalDate: 'Dec 31, 2026',
};

export const DEMO_ORGANIZATIONS_LIST = [
  {
    id: 'org-1',
    name: 'Novartis Cardiovascular Education',
    type: 'Pharmaceutical Company' as const,
    contractTier: 'Enterprise Global',
    activeProgramsCount: 6,
    professionalsReached: 12480,
    seatsUsed: 12480,
    seatsTotal: 15000,
    mrrOrValue: '$185,000 / yr',
    status: 'Active Contract' as const,
  },
  {
    id: 'org-2',
    name: 'Boston Scientific Interventional Academy',
    type: 'Medical Device Company' as const,
    contractTier: 'Enterprise Global',
    activeProgramsCount: 4,
    professionalsReached: 8750,
    seatsUsed: 8750,
    seatsTotal: 10000,
    mrrOrValue: '$140,000 / yr',
    status: 'Active Contract' as const,
  },
  {
    id: 'org-3',
    name: 'Mount Sinai Health System',
    type: 'Hospital & Health System' as const,
    contractTier: 'Health System Pro',
    activeProgramsCount: 8,
    professionalsReached: 6420,
    seatsUsed: 6420,
    seatsTotal: 8000,
    mrrOrValue: '$95,000 / yr',
    status: 'Active Contract' as const,
  },
  {
    id: 'org-4',
    name: 'American College of Cardiology (Chapter)',
    type: 'Medical Society / Association' as const,
    contractTier: 'Specialty Society Partner',
    activeProgramsCount: 5,
    professionalsReached: 14200,
    seatsUsed: 14200,
    seatsTotal: 20000,
    mrrOrValue: '$120,000 / yr',
    status: 'Active Contract' as const,
  },
  {
    id: 'org-5',
    name: 'AstraZeneca Oncology Medical Education',
    type: 'Pharmaceutical Company' as const,
    contractTier: 'Enterprise Global',
    activeProgramsCount: 3,
    professionalsReached: 7190,
    seatsUsed: 7190,
    seatsTotal: 10000,
    mrrOrValue: '$110,000 / yr',
    status: 'Active Contract' as const,
  }
];

export const DEMO_ORG_PROGRAMS = [
  {
    id: 'prog-1',
    title: 'Global Heart Failure GDMT Masterclass & Guideline Implementation',
    description: 'Evidence-based education series focusing on quadruplet therapy initiation in HFrEF and early biomarker-guided management for high-risk patients.',
    targetSpecialty: 'Cardiology' as const,
    audienceCount: 4800,
    enrolledCount: 3620,
    completedCount: 2940,
    completionRate: 81.2,
    avgEngagementMinutes: 28,
    status: 'Active' as const,
    coursesCount: 4,
    courseIds: ['cme-cardio-101', 'cme-cardio-102', 'cme-cardio-103'],
    courseNames: [
      'Quadruplet GDMT in HFrEF 2026',
      'Advanced SGLT2i & MRA Synergy',
      'Point-of-Care Echocardiography'
    ],
    audienceType: 'Cardiologists, Heart Failure Specialists, Clinical Pharmacists',
    startDate: 'Jan 15, 2026',
    endDate: 'Dec 31, 2026',
    sponsoredBy: 'Novartis Medical Affairs',
    accreditedCredits: 4.5,
    keyLearningObjectives: [
      'Optimize simultaneous vs sequenced GDMT initiation in inpatient settings',
      'Manage hyperkalemia during mineralocorticoid receptor antagonist titration',
      'Interpret NT-proBNP trajectories for outpatient decompensation prevention'
    ]
  },
  {
    id: 'prog-2',
    title: 'Precision Immuno-Oncology & Antibody-Drug Conjugate (ADC) Lab',
    description: 'Comprehensive program on biomarker interpretation, sequencing novel ADCs, and toxicity management in metastatic solid tumors.',
    targetSpecialty: 'Oncology' as const,
    audienceCount: 3200,
    enrolledCount: 2480,
    completedCount: 1910,
    completionRate: 77.0,
    avgEngagementMinutes: 32,
    status: 'Active' as const,
    coursesCount: 3,
    courseIds: ['cme-onco-201', 'cme-onco-202'],
    courseNames: [
      'Next-Gen ADC Mechanisms & Safety',
      'HER2-Low and Trop-2 Diagnostics'
    ],
    audienceType: 'Medical Oncologists, Oncology Nurse Navigators, Pathologists',
    startDate: 'Feb 01, 2026',
    endDate: 'Nov 30, 2026',
    sponsoredBy: 'Global Oncology Medical Affairs',
    accreditedCredits: 3.5,
    keyLearningObjectives: [
      'Evaluate target antigen expression thresholds for ADC candidates',
      'Recognize early interstitial lung disease (ILD) and pneumonitis symptoms',
      'Design tailored premedication regimens for payload hypersensitivity'
    ]
  },
  {
    id: 'prog-3',
    title: 'Acute Ischemic Stroke Revascularization & Extended Window Protocol',
    description: 'Rapid decision-making protocols for automated CT perfusion, mechanical thrombectomy, and secondary prevention antiplatelet strategies.',
    targetSpecialty: 'Neurology' as const,
    audienceCount: 2500,
    enrolledCount: 1840,
    completedCount: 1490,
    completionRate: 80.9,
    avgEngagementMinutes: 22,
    status: 'Active' as const,
    coursesCount: 3,
    courseIds: ['cme-neuro-301'],
    courseNames: [
      '24-Hour Stroke Window & AI Perfusion Imaging'
    ],
    audienceType: 'Emergency Physicians, Vascular Neurologists, Neuro-interventionalists',
    startDate: 'Mar 10, 2026',
    endDate: 'Oct 31, 2026',
    sponsoredBy: 'MedTech Stroke Coalition',
    accreditedCredits: 2.75,
    keyLearningObjectives: [
      'Read RAPID automated mismatch ratios accurately in real time',
      'Determine bridge thrombolysis versus direct transfer protocols',
      'Implement blood pressure targets post-successful TICI 2b/3 reperfusion'
    ]
  },
  {
    id: 'prog-4',
    title: 'Antimicrobial Stewardship in Resistant Gram-Negative Hospital Pathogens',
    description: 'Addressing carbapenem-resistant Enterobacterales (CRE) and Pseudomonas infections with newer beta-lactamase inhibitor combinations.',
    targetSpecialty: 'Infectious Disease' as const,
    audienceCount: 1980,
    enrolledCount: 980,
    completedCount: 580,
    completionRate: 59.2,
    avgEngagementMinutes: 18,
    status: 'Draft' as const,
    coursesCount: 2,
    courseIds: ['cme-pharm-505'],
    courseNames: ['Targeted CRE & CRPA Therapeutics'],
    audienceType: 'Infectious Disease Specialists, Hospitalists, Clinical Microbiologists',
    startDate: 'Sep 01, 2026',
    endDate: 'Dec 15, 2026',
    sponsoredBy: 'Hospital Stewardship Consortium',
    accreditedCredits: 2.0,
    keyLearningObjectives: [
      'Interpret rapid molecular syndromic PCR panels in bacteremic sepsis',
      'Dose optimize cefiderocol, ceftazidime-avibactam, and meropenem-vaborbactam'
    ]
  },
  {
    id: 'prog-5',
    title: '2025 SGLT2i Cardiorenal Protection in Type 2 Diabetes (Completed)',
    description: 'Foundational dual-endpoint education that trained primary care and endocrinology teams on preserving eGFR and mitigating heart failure events.',
    targetSpecialty: 'Endocrinology' as const,
    audienceCount: 4200,
    enrolledCount: 3950,
    completedCount: 3410,
    completionRate: 86.3,
    avgEngagementMinutes: 26,
    status: 'Completed' as const,
    coursesCount: 4,
    courseIds: ['cme-endo-401'],
    courseNames: ['Cardiorenal Protection Masterclass'],
    audienceType: 'Endocrinologists, Primary Care Physicians, Diabetes Educators',
    startDate: 'Jan 01, 2025',
    endDate: 'Dec 31, 2025',
    sponsoredBy: 'Cardiometabolic Care Society',
    accreditedCredits: 4.0,
    keyLearningObjectives: [
      'Differentiate hemodynamic eGFR dips from acute kidney injury',
      'Prevent euglycemic DKA through proper sick-day management protocols'
    ]
  },
  {
    id: 'prog-6',
    title: 'Advanced Lipid Lowering & PCSK9 Monoclonal Antibodies Archive',
    description: 'Archived legacy program for retrospective audit and accreditation compliance records.',
    targetSpecialty: 'Cardiology' as const,
    audienceCount: 2100,
    enrolledCount: 1980,
    completedCount: 1620,
    completionRate: 81.8,
    avgEngagementMinutes: 20,
    status: 'Archived' as const,
    coursesCount: 2,
    courseIds: ['cme-cardio-legacy'],
    courseNames: ['Monoclonal PCSK9 Titration'],
    audienceType: 'Preventive Cardiologists',
    startDate: 'Jan 01, 2024',
    endDate: 'Dec 31, 2024',
    sponsoredBy: 'Novartis Medical Affairs',
    accreditedCredits: 2.5,
  }
];

export const DEMO_ORG_CONTENT_ITEMS = [
  {
    id: 'cnt-1',
    title: 'Quadruplet GDMT in HFrEF: 2026 Trial Evidence & Rapid Titration',
    type: 'Course' as const,
    specialty: 'Cardiology' as const,
    status: 'Published' as const,
    views: 4820,
    completionRate: 84.5,
    durationOrCredits: '45 mins • 1.5 CME',
    updatedAt: '2 days ago',
    authorOrFaculty: 'Dr. Michael Chen, MD, FACC',
    category: 'Interactive Masterclass'
  },
  {
    id: 'cnt-2',
    title: 'Surgical Lab: Structural TAVR Valve-in-Valve Video Demonstration',
    type: 'Video' as const,
    specialty: 'Cardiology' as const,
    status: 'Published' as const,
    views: 3610,
    completionRate: 78.2,
    durationOrCredits: '22 mins • 0.75 CME',
    updatedAt: 'Aug 14, 2026',
    authorOrFaculty: 'Dr. Sarah Jenkins, MD',
    category: 'Procedural Video'
  },
  {
    id: 'cnt-3',
    title: 'Clinical Case Vignette: 68-Year-Old Female with Resistant HTN & eGFR 42',
    type: 'Assessment' as const,
    specialty: 'Cardiology' as const,
    status: 'Published' as const,
    views: 2940,
    completionRate: 91.0,
    durationOrCredits: '15 mins • 0.5 CME',
    updatedAt: 'Aug 19, 2026',
    authorOrFaculty: 'Medvora Editorial Board',
    category: 'Diagnostic Dilemma'
  },
  {
    id: 'cnt-4',
    title: 'Live Symposium: Renal Denervation vs Multi-Drug Regimens Grand Rounds',
    type: 'Event' as const,
    specialty: 'Cardiology' as const,
    status: 'Published' as const,
    views: 1850,
    completionRate: 72.0,
    durationOrCredits: '75 mins • 1.25 CME',
    updatedAt: 'Yesterday',
    authorOrFaculty: 'Multi-Faculty Panel',
    category: 'Live Broadcast'
  },
  {
    id: 'cnt-5',
    title: 'Executive Guideline Summary: 2026 Non-Statin Lipid Lowering Therapies',
    type: 'Article' as const,
    specialty: 'Cardiology' as const,
    status: 'Published' as const,
    views: 5120,
    completionRate: 88.3,
    durationOrCredits: '8 mins read',
    updatedAt: 'Aug 10, 2026',
    authorOrFaculty: 'Dr. Elena Rostova, DNP',
    category: 'Practice Protocol'
  },
  {
    id: 'cnt-6',
    title: 'Next-Gen ADC Sequencing in HER2-Low Metastatic Breast Cancer',
    type: 'Course' as const,
    specialty: 'Oncology' as const,
    status: 'Published' as const,
    views: 3100,
    completionRate: 76.4,
    durationOrCredits: '50 mins • 1.75 CME',
    updatedAt: 'Aug 05, 2026',
    authorOrFaculty: 'Dr. Priya Balasubramanian, MD',
    category: 'Masterclass'
  },
  {
    id: 'cnt-7',
    title: 'Interactive Case Simulation: Recognizing Early Drug-Induced Interstitial Lung Disease',
    type: 'Assessment' as const,
    specialty: 'Oncology' as const,
    status: 'In Review' as const,
    views: 420,
    completionRate: 65.0,
    durationOrCredits: '20 mins • 0.5 CME',
    updatedAt: 'Aug 22, 2026',
    authorOrFaculty: 'Dr. Kimberly Adams, MD',
    category: 'Safety Assessment'
  },
  {
    id: 'cnt-8',
    title: 'AI Perfusion Imaging Interpretation in Extended 24h Stroke Window',
    type: 'Video' as const,
    specialty: 'Neurology' as const,
    status: 'Draft' as const,
    views: 120,
    completionRate: 0,
    durationOrCredits: '18 mins • 0.5 CME',
    updatedAt: 'Today',
    authorOrFaculty: 'Dr. Aris Thorne, MD',
    category: 'Neuro-imaging'
  }
];

export const DEMO_AUDIENCE_MEMBERS = [
  {
    id: 'aud-1',
    name: 'Dr. Julian Thorne, MD, FACC',
    email: 'j.thorne@hopkinsmedicine.org',
    role: 'Attending Cardiologist',
    specialty: 'Cardiology',
    institution: 'Johns Hopkins Medicine',
    country: 'United States',
    program: 'Global Heart Failure GDMT Masterclass',
    engagementMinutes: 94,
    status: 'Completed' as const,
    completionRate: 100,
    lastActive: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    verifiedLicense: true,
  },
  {
    id: 'aud-2',
    name: 'Dr. Sophia Lindqvist, MD',
    email: 'sophia.l@karolinska.se',
    role: 'Cardiologist / Researcher',
    specialty: 'Cardiology',
    institution: 'Karolinska University Hospital',
    country: 'Sweden',
    program: 'Global Heart Failure GDMT Masterclass',
    engagementMinutes: 82,
    status: 'Active' as const,
    completionRate: 75,
    lastActive: '5 hours ago',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    verifiedLicense: true,
  },
  {
    id: 'aud-3',
    name: 'Marcus Sterling, PharmD, BCPS',
    email: 'm.sterling@mayoclinic.org',
    role: 'Clinical Specialist Pharmacist',
    specialty: 'Clinical Pharmacology',
    institution: 'Mayo Clinic',
    country: 'United States',
    program: 'Global Heart Failure GDMT Masterclass',
    engagementMinutes: 110,
    status: 'Completed' as const,
    completionRate: 100,
    lastActive: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    verifiedLicense: true,
  },
  {
    id: 'aud-4',
    name: 'Dr. Claire Dubois, MD',
    email: 'c.dubois@aphp.fr',
    role: 'Medical Oncologist',
    specialty: 'Oncology',
    institution: 'AP-HP Pitié-Salpêtrière',
    country: 'France',
    program: 'Precision Immuno-Oncology & ADC Lab',
    engagementMinutes: 65,
    status: 'Active' as const,
    completionRate: 60,
    lastActive: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1594824813576-13a8904724a8?auto=format&fit=crop&q=80&w=200',
    verifiedLicense: true,
  },
  {
    id: 'aud-5',
    name: 'Dr. Hiroshi Tanaka, MD, PhD',
    email: 'h.tanaka@u-tokyo.ac.jp',
    role: 'Vascular Neurologist',
    specialty: 'Neurology',
    institution: 'University of Tokyo Hospital',
    country: 'Japan',
    program: 'Acute Stroke Revascularization Protocol',
    engagementMinutes: 78,
    status: 'Completed' as const,
    completionRate: 100,
    lastActive: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    verifiedLicense: true,
  },
  {
    id: 'aud-6',
    name: 'Elena Rostova, DNP, AGACNP-BC',
    email: 'e.rostova@ccf.org',
    role: 'Lead Acute Care NP',
    specialty: 'Critical Care',
    institution: 'Cleveland Clinic',
    country: 'United States',
    program: 'Global Heart Failure GDMT Masterclass',
    engagementMinutes: 92,
    status: 'Completed' as const,
    completionRate: 100,
    lastActive: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    verifiedLicense: true,
  },
  {
    id: 'aud-7',
    name: 'Dr. Alejandro Mendez, MD',
    email: 'a.mendez@hospitalmadrid.es',
    role: 'Emergency Medicine Fellow',
    specialty: 'Emergency Medicine',
    institution: 'Hospital Universitario La Paz',
    country: 'Spain',
    program: 'Acute Stroke Revascularization Protocol',
    engagementMinutes: 44,
    status: 'Active' as const,
    completionRate: 45,
    lastActive: '4 days ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    verifiedLicense: true,
  },
  {
    id: 'aud-8',
    name: 'Dr. David Greenfield, MD',
    email: 'd.greenfield@utoronto.ca',
    role: 'Chief of Endocrinology',
    specialty: 'Endocrinology',
    institution: 'Toronto General Hospital',
    country: 'Canada',
    program: '2025 SGLT2i Cardiorenal Protection',
    engagementMinutes: 125,
    status: 'Completed' as const,
    completionRate: 100,
    lastActive: '5 days ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    verifiedLicense: true,
  },
  {
    id: 'aud-9',
    name: 'Dr. Fatima Al-Khatib, MD',
    email: 'f.alkhatib@kfshrc.edu.sa',
    role: 'Pediatric Oncologist',
    specialty: 'Pediatrics',
    institution: 'King Faisal Specialist Hospital',
    country: 'Saudi Arabia',
    program: 'Precision Immuno-Oncology & ADC Lab',
    engagementMinutes: 20,
    status: 'Enrolled' as const,
    completionRate: 15,
    lastActive: '6 days ago',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    verifiedLicense: false,
  },
  {
    id: 'aud-10',
    name: 'Dr. Oliver Schmidt, MD',
    email: 'o.schmidt@charite.de',
    role: 'Interventional Fellow',
    specialty: 'Cardiology',
    institution: 'Charité – Universitätsmedizin Berlin',
    country: 'Germany',
    program: 'Global Heart Failure GDMT Masterclass',
    engagementMinutes: 60,
    status: 'Active' as const,
    completionRate: 65,
    lastActive: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    verifiedLicense: true,
  }
];

export const DEMO_ORG_TEAM_MEMBERS = [
  {
    id: 'team-1',
    name: 'Dr. Kimberly Adams, MD',
    email: 'kimberly.adams@novartis-medical.com',
    role: 'Admin' as const,
    department: 'Global Medical Affairs',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    status: 'Active' as const,
    lastLogin: 'Today, 08:30 AM',
  },
  {
    id: 'team-2',
    name: 'David Vance, MS',
    email: 'david.vance@novartis-medical.com',
    role: 'Editor' as const,
    department: 'Scientific Content & Digital Learning',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    status: 'Active' as const,
    lastLogin: 'Yesterday, 04:15 PM',
  },
  {
    id: 'team-3',
    name: 'Rachel Sterling, MPH',
    email: 'rachel.sterling@novartis-medical.com',
    role: 'Analyst' as const,
    department: 'Medical Insights & Health Economics',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    status: 'Active' as const,
    lastLogin: 'Aug 24, 2026',
  },
  {
    id: 'team-4',
    name: 'Alexander Ross, JD',
    email: 'alexander.ross@novartis-medical.com',
    role: 'Viewer' as const,
    department: 'Compliance & Regulatory Audit',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    status: 'Active' as const,
    lastLogin: 'Aug 19, 2026',
  }
];

export const DEMO_ENTERPRISE_ANALYTICS = {
  monthlyEnrollmentTrend: [
    { month: 'Mar', enrollments: 620, completions: 480, reach: 980 },
    { month: 'Apr', enrollments: 890, completions: 690, reach: 1340 },
    { month: 'May', enrollments: 1240, completions: 990, reach: 1950 },
    { month: 'Jun', enrollments: 1680, completions: 1320, reach: 2450 },
    { month: 'Jul', enrollments: 2190, completions: 1720, reach: 2890 },
    { month: 'Aug', enrollments: 2300, completions: 1820, reach: 2870 }
  ],
  specialtyDistribution: [
    { specialty: 'Cardiology', count: 5280, percent: 42.3, color: '#0E9384' },
    { specialty: 'Oncology', count: 2840, percent: 22.8, color: '#6366F1' },
    { specialty: 'Neurology', count: 1890, percent: 15.1, color: '#38BDF8' },
    { specialty: 'Primary Care / GP', count: 1420, percent: 11.4, color: '#F59E0B' },
    { specialty: 'Pharmacy & Others', count: 1050, percent: 8.4, color: '#10B981' }
  ],
  geographicReach: [
    { country: 'United States', code: 'US', count: 6420, percent: 51.4 },
    { country: 'Germany', code: 'DE', count: 1680, percent: 13.5 },
    { country: 'United Kingdom', code: 'UK', count: 1450, percent: 11.6 },
    { country: 'Japan', code: 'JP', count: 980, percent: 7.9 },
    { country: 'France', code: 'FR', count: 820, percent: 6.6 },
    { country: 'Canada', code: 'CA', count: 610, percent: 4.9 },
    { country: 'Other Nations', code: 'ROW', count: 520, percent: 4.1 }
  ],
  contentPerformanceRanking: [
    {
      title: 'Quadruplet GDMT in HFrEF Masterclass',
      views: 4820,
      completions: 3620,
      completionRate: '84.5%',
      avgTime: '28m',
      rating: 4.9
    },
    {
      title: 'Structural TAVR Valve-in-Valve Video Lab',
      views: 3610,
      completions: 2820,
      completionRate: '78.2%',
      avgTime: '22m',
      rating: 4.8
    },
    {
      title: 'Next-Gen ADC Sequencing in Metastatic Breast Cancer',
      views: 3100,
      completions: 2360,
      completionRate: '76.4%',
      avgTime: '31m',
      rating: 4.9
    },
    {
      title: 'Resistant HTN Diagnostic Dilemma Vignette',
      views: 2940,
      completions: 2680,
      completionRate: '91.0%',
      avgTime: '15m',
      rating: 4.7
    },
    {
      title: '2026 Non-Statin Lipid Lowering Guidelines Digest',
      views: 5120,
      completions: 4520,
      completionRate: '88.3%',
      avgTime: '8m',
      rating: 4.9
    }
  ]
};

// ==========================================
// SUPER ADMIN DASHBOARD MOCK DATA
// ==========================================

export const DEMO_ADMIN_SYSTEM_STATS = {
  totalProfessionals: 48290,
  activeUsersMonthly: 19420,
  publishedCourses: 312,
  certificatesIssued: 28940,
  registeredOrganizations: 84,
  monthlyEngagementMinutes: '1.42M mins',
  platformComplianceRate: '99.4%',
  accmeParsStatus: '100% Operational',
  serverHealth: 'Optimal (99.99% uptime)'
};

export const DEMO_ADMIN_USERS: import('../types').AdminUserRecord[] = [
  {
    id: 'adm-usr-1',
    name: 'Dr. Michael Chen, MD, FACC',
    email: 'm.chen@stanfordmedicine.edu',
    role: 'Attending Cardiologist / Faculty',
    specialty: 'Cardiology',
    institution: 'Stanford University School of Medicine',
    country: 'United States',
    licenseStatus: 'Verified',
    licenseNumber: 'CA-MD-49821',
    registeredDate: 'Jan 12, 2024',
    lastLogin: 'Today, 07:15 AM',
    creditsEarned: 84.5,
    status: 'Active'
  },
  {
    id: 'adm-usr-2',
    name: 'Dr. Maya Patel, MD',
    email: 'dr.maya.patel@hospital.org',
    role: 'Fellow / Interventional Cardiology',
    specialty: 'Cardiology',
    institution: 'Mount Sinai Health System',
    country: 'United States',
    licenseStatus: 'Verified',
    licenseNumber: 'NY-MD-89210',
    registeredDate: 'Feb 03, 2025',
    lastLogin: 'Today, 09:20 AM',
    creditsEarned: 44.0,
    status: 'Active'
  },
  {
    id: 'adm-usr-3',
    name: 'Elena Rostova, DNP, AGACNP-BC',
    email: 'e.rostova@ccf.org',
    role: 'Nurse Practitioner',
    specialty: 'Critical Care',
    institution: 'Cleveland Clinic',
    country: 'United States',
    licenseStatus: 'Verified',
    licenseNumber: 'OH-NP-33921',
    registeredDate: 'Mar 15, 2024',
    lastLogin: 'Yesterday',
    creditsEarned: 52.0,
    status: 'Active'
  },
  {
    id: 'adm-usr-4',
    name: 'Dr. Tariq Al-Mansoor, PharmD',
    email: 't.almansoor@mayo.edu',
    role: 'Clinical Pharmacist',
    specialty: 'Clinical Pharmacology',
    institution: 'Mayo Clinic',
    country: 'United States',
    licenseStatus: 'Verified',
    licenseNumber: 'MN-RPH-19482',
    registeredDate: 'Jun 22, 2024',
    lastLogin: 'Aug 25, 2026',
    creditsEarned: 61.5,
    status: 'Active'
  },
  {
    id: 'adm-usr-5',
    name: 'Dr. Hiroshi Tanaka, MD, PhD',
    email: 'h.tanaka@u-tokyo.ac.jp',
    role: 'Professor of Neurology',
    specialty: 'Neurology',
    institution: 'University of Tokyo Hospital',
    country: 'Japan',
    licenseStatus: 'Verified',
    licenseNumber: 'JP-MED-7741',
    registeredDate: 'Nov 08, 2024',
    lastLogin: 'Aug 24, 2026',
    creditsEarned: 38.0,
    status: 'Active'
  },
  {
    id: 'adm-usr-6',
    name: 'Dr. Sarah Jenkins, MD, FACC',
    email: 's.jenkins@jhmi.edu',
    role: 'Vice Chair of Interventional Cardiology',
    specialty: 'Cardiology',
    institution: 'Johns Hopkins Medicine',
    country: 'United States',
    licenseStatus: 'Verified',
    licenseNumber: 'MD-MED-55021',
    registeredDate: 'Dec 01, 2023',
    lastLogin: 'Aug 26, 2026',
    creditsEarned: 95.0,
    status: 'Active'
  },
  {
    id: 'adm-usr-7',
    name: 'Dr. Klaus Becker, MD',
    email: 'klaus.becker@charite-health.de',
    role: 'Cardiology Resident',
    specialty: 'Cardiology',
    institution: 'Charité Berlin',
    country: 'Germany',
    licenseStatus: 'Pending Verification',
    licenseNumber: 'DE-AE-99120',
    registeredDate: 'Aug 21, 2026',
    lastLogin: 'Aug 22, 2026',
    creditsEarned: 4.5,
    status: 'Pending Approval'
  }
];

export const DEMO_ADMIN_COURSES: import('../types').AdminCourseRecord[] = [
  {
    id: 'cme-cardio-101',
    title: 'Quadruplet GDMT in HFrEF: 2026 Trial Evidence & Rapid Titration',
    specialty: 'Cardiology',
    facultyName: 'Dr. Michael Chen, MD, FACC',
    credits: 1.5,
    enrolledTotal: 4820,
    completionsTotal: 3620,
    status: 'Published',
    submittedDate: 'Jun 10, 2026',
    reviewScore: 98,
    accreditationBody: 'ACCME / AMA PRA Category 1'
  },
  {
    id: 'cme-onco-201',
    title: 'Next-Generation Antibody-Drug Conjugates in Solid Tumors',
    specialty: 'Oncology',
    facultyName: 'Dr. Priya Balasubramanian, MD',
    credits: 1.75,
    enrolledTotal: 3100,
    completionsTotal: 2360,
    status: 'Published',
    submittedDate: 'Jul 04, 2026',
    reviewScore: 96,
    accreditationBody: 'ACCME / AMA PRA Category 1'
  },
  {
    id: 'cme-neuro-301',
    title: 'Extended Window Endovascular Thrombectomy Protocols in Acute Stroke',
    specialty: 'Neurology',
    facultyName: 'Dr. Aris Thorne, MD, PhD',
    credits: 1.25,
    enrolledTotal: 2450,
    completionsTotal: 1980,
    status: 'Published',
    submittedDate: 'Jul 18, 2026',
    reviewScore: 95,
    accreditationBody: 'ACCME / AMA PRA Category 1'
  },
  {
    id: 'cme-pharm-505',
    title: 'Carbapenem-Resistant Enterobacterales (CRE) & Stewardship',
    specialty: 'Infectious Disease',
    facultyName: 'Dr. Tariq Al-Mansoor, PharmD',
    credits: 1.5,
    enrolledTotal: 1250,
    completionsTotal: 840,
    status: 'Under Review',
    submittedDate: 'Aug 15, 2026',
    reviewScore: 92,
    accreditationBody: 'ACPE / ACCME'
  },
  {
    id: 'cme-derm-601',
    title: 'Dermatoscopy Patterns of Amelanotic Melanoma in Skin of Color',
    specialty: 'Dermatology',
    facultyName: 'Dr. Camille Laurent, MD',
    credits: 1.0,
    enrolledTotal: 0,
    completionsTotal: 0,
    status: 'Draft',
    submittedDate: 'Aug 23, 2026',
    accreditationBody: 'ACCME / AMA PRA Category 1'
  }
];

export const DEMO_ADMIN_CERTIFICATES: import('../types').AdminCertificateRecord[] = [
  {
    id: 'cert-rec-1',
    certificateCode: 'MEDV-849201',
    courseTitle: 'Quadruplet GDMT in HFrEF: 2026 Trial Evidence & Rapid Titration',
    recipientName: 'Dr. Maya Patel, MD',
    recipientEmail: 'dr.maya.patel@hospital.org',
    specialty: 'Cardiology',
    credits: 1.5,
    issuedAt: 'Aug 26, 2026',
    parsSyncStatus: 'Synced to ACCME PARS',
    boardReportingId: 'ABIM-840921'
  },
  {
    id: 'cert-rec-2',
    certificateCode: 'MEDV-391024',
    courseTitle: 'Extended Window Endovascular Thrombectomy Protocols',
    recipientName: 'Dr. Hiroshi Tanaka, MD, PhD',
    recipientEmail: 'h.tanaka@u-tokyo.ac.jp',
    specialty: 'Neurology',
    credits: 1.25,
    issuedAt: 'Aug 24, 2026',
    parsSyncStatus: 'Synced to ACCME PARS',
    boardReportingId: 'JBM-99210'
  },
  {
    id: 'cert-rec-3',
    certificateCode: 'MEDV-509122',
    courseTitle: 'Carbapenem-Resistant Enterobacterales (CRE) & Stewardship',
    recipientName: 'Elena Rostova, DNP',
    recipientEmail: 'e.rostova@ccf.org',
    specialty: 'Critical Care',
    credits: 1.5,
    issuedAt: 'Aug 22, 2026',
    parsSyncStatus: 'Synced to ACCME PARS',
    boardReportingId: 'ANCC-448102'
  },
  {
    id: 'cert-rec-4',
    certificateCode: 'MEDV-771920',
    courseTitle: 'Next-Generation Antibody-Drug Conjugates in Solid Tumors',
    recipientName: 'Dr. Claire Dubois, MD',
    recipientEmail: 'c.dubois@aphp.fr',
    specialty: 'Oncology',
    credits: 1.75,
    issuedAt: 'Aug 20, 2026',
    parsSyncStatus: 'Synced to ACCME PARS',
    boardReportingId: 'CNOM-88129'
  }
];

