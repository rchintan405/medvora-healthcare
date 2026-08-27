import { Course } from '../types';
import { EXTENDED_FACULTY } from './coursesData';

export const ALL_MOCK_COURSES: Course[] = [
  {
    id: 'cme-cardio-101',
    title: 'Modern Approaches to Heart Failure Management',
    slug: 'modern-approaches-heart-failure-management',
    subtitle: 'Guideline-directed medical therapy (GDMT), SGLT2i, GLP-1 RA, non-steroidal MRAs, and hemodynamic phenotyping.',
    specialty: 'Cardiology',
    category: 'Recommended For You',
    difficulty: 'Advanced',
    credits: 1.5,
    accreditationType: 'AMA PRA Category 1 Credit™',
    accreditationBody: 'Accreditation Council for Continuing Medical Education (ACCME) & ACC',
    expiresDate: 'Dec 31, 2026',
    durationMinutes: 42,
    format: 'Clinical Masterclass',
    faculty: EXTENDED_FACULTY[0],
    rating: 4.94,
    ratingsCount: 1248,
    enrolledCount: 4890,
    featured: true,
    trending: true,
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1600',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    fullVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    tags: ['Heart Failure', 'HFpEF', 'SGLT2 Inhibitors', 'Hemodynamics', 'Cardiometabolic'],
    objectives: [
      'Evaluate diagnostic criteria for heart failure with preserved ejection fraction (HFpEF) using H2FPEF and HFA-PEFF risk scores.',
      'Formulate guideline-directed medical therapy integrating SGLT2 inhibitors and non-steroidal MRAs (Finerenone).',
      'Manage cardio-renal-metabolic synergies in patients with concomitant CKD Stage 3b and Type 2 Diabetes.',
      'Calibrate diuretic stewardship with non-invasive Doppler echocardiographic indices (E/e’ ratio).'
    ],
    prerequisites: ['Basic echocardiography interpretation skills', 'Familiarity with ACC/AHA Heart Failure Staging'],
    targetAudience: ['Cardiologists', 'Hospitalists', 'Internal Medicine Attending', 'Advanced Practice NPs/PAs', 'Clinical Pharmacists'],
    clinicalPearls: [
      'Do not hold SGLT2 inhibitors for mild initial eGFR drops (<30%) in the first 4 weeks; this hemodynamic dip reflects restored tubuloglomerular feedback and preserves long-term renal function.',
      'Elevated E/e’ > 14 coupled with resting TR peak velocity > 2.8 m/s confirms elevated left ventricular filling pressures in non-obese patients.',
      'GLP-1 receptor agonists provide substantial symptom relief and physical limitation improvements in HFpEF patients with obesity (STEP-HFpEF trial).'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 01: Diagnostic Architecture & Biomarker Nuances',
        description: 'Comprehensive diagnostic algorithms, HFA-PEFF scoring, and avoiding common biomarker misinterpretations in obesity and renal disease.',
        lessons: [
          {
            id: 'les-1-1',
            title: '1. Introduction & Epidemiological Shift in Heart Failure',
            type: 'lecture',
            durationMinutes: 6,
            videoTimestamp: '00:00',
            summary: 'Understanding the rising prevalence of HFpEF and cardiometabolic syndrome in aging patient cohorts.',
            keyTakeaways: ['HFpEF now accounts for over 50% of all heart failure admissions in patients aged 65 and older.'],
            transcript: [
              { time: '00:00', speaker: 'Dr. Sarah Jenkins', text: 'Welcome to this Medvora Masterclass on Modern Approaches to Heart Failure Management.' },
              { time: '01:15', speaker: 'Dr. Sarah Jenkins', text: 'Historically, heart failure trials focused predominantly on reduced ejection fraction (HFrEF). However, today over half of our patients present with preserved or mildly reduced EF.' },
              { time: '03:40', speaker: 'Dr. Sarah Jenkins', text: 'In HFpEF, systemic inflammation from visceral adiposity drives microvascular endothelial dysfunction, leading to myocardial fibrosis and impaired diastolic relaxation.' }
            ]
          },
          {
            id: 'les-1-2',
            title: '2. Expert Lecture: HFA-PEFF vs H2FPEF Scoring Systems',
            type: 'video',
            durationMinutes: 10,
            videoTimestamp: '06:00',
            summary: 'Stepwise diagnostic algorithms for differentiating cardiac from non-cardiac causes of dyspnea.',
            keyTakeaways: ['Biomarker threshold: NT-proBNP > 125 pg/mL (sinus) or > 365 pg/mL (atrial fibrillation). Obesity suppresses levels by up to 50%.'],
            resources: [
              { title: 'H2FPEF & HFA-PEFF Score Bedside Calculator Card', type: 'PDF Guideline', size: '1.2 MB' }
            ]
          },
          {
            id: 'les-1-3',
            title: '3. Clinical Case Drill: The Obese Dyspneic Patient',
            type: 'case',
            durationMinutes: 8,
            summary: 'Interactive case drill of a 68-year-old female with BMI 38 kg/m² and NT-proBNP 95 pg/mL.',
            checkpointQuestion: {
              question: 'A 68-year-old female with BMI 38 kg/m² presents with progressive exertional dyspnea. Her NT-proBNP is 95 pg/mL. What should be considered?',
              options: [
                'Rule out heart failure completely because NT-proBNP is < 125 pg/mL.',
                'Adiposity suppresses circulating natriuretic peptides; perform echocardiography for structural diastolic dysfunction.',
                'Immediately initiate high-dose intravenous furosemide.',
                'Discontinue all antihypertensive agents.'
              ],
              correctIndex: 1,
              explanation: 'In severely obese patients, natriuretic peptide clearance is accelerated by adipose tissue; therefore, lower cutoff thresholds apply, and echocardiographic confirmation is required.'
            }
          },
          {
            id: 'les-1-4',
            title: '4. Knowledge Check: Diagnostic Biomarkers',
            type: 'knowledge_check',
            durationMinutes: 4,
            summary: 'Quick 3-question diagnostic checkpoint before advancing to pharmacology.'
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 02: Guideline-Directed Medical Therapy (GDMT) & Multi-Pathway Titration',
        description: 'Translating EMPEROR-Preserved, DELIVER, STEP-HFpEF, and FINEARTS-HF into pragmatic clinical prescribing workflows.',
        lessons: [
          {
            id: 'les-2-1',
            title: '1. Core Concepts: The Four Pillars Applied to Preserved EF',
            type: 'lecture',
            durationMinutes: 7,
            videoTimestamp: '16:00',
            summary: 'SGLT2 inhibitors as Class 1 foundational therapy, non-steroidal MRAs, and GLP-1 RA metabolic benefits.'
          },
          {
            id: 'les-2-2',
            title: '2. Expert Lecture: Managing the Acute eGFR Dip & Hyperkalemia',
            type: 'video',
            durationMinutes: 11,
            videoTimestamp: '23:00',
            summary: 'Managing hemodynamics, renal safety parameters, and potassium monitoring during SGLT2i + MRA co-titration.'
          },
          {
            id: 'les-2-3',
            title: '3. Case Discussion: Concomitant Atrial Fibrillation & CKD Stage 3',
            type: 'case',
            durationMinutes: 8,
            summary: 'Navigating rate vs rhythm control, anticoagulation, and diuretic stewardship in multimorbid HFpEF.'
          },
          {
            id: 'les-2-4',
            title: '4. Post-Module Assessment & Clinical Pearls Summary',
            type: 'assessment',
            durationMinutes: 6,
            summary: 'Comprehensive mastery assessment validating clinical readiness and earning CME accreditation.'
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'ch-1',
        title: 'Diagnostic Architecture: HFA-PEFF vs. H2FPEF Scores in Ambiguous Dyspnea',
        timestamp: '00:00',
        durationSeconds: 480,
        summary: 'Stepwise diagnostic algorithm for differentiating pulmonary vs cardiac etiologies of exertional dyspnea in preserved EF.',
        keyTakeaways: [
          'Biomarker threshold: NT-proBNP > 125 pg/mL (sinus) or > 365 pg/mL (atrial fibrillation).',
          'Obesity can falsely suppress NT-proBNP levels by up to 50%.'
        ]
      },
      {
        id: 'ch-2',
        title: 'The Modern Quadruple/Dual Pillar: SGLT2i, MRAs & Semaglutide in Clinical Practice',
        timestamp: '08:00',
        durationSeconds: 720,
        summary: 'Translating EMPEROR-Preserved, DELIVER, and STEP-HFpEF trials into day-to-day prescribing protocols.',
        keyTakeaways: [
          'Empagliflozin 10mg or Dapagliflozin 10mg reduces CV death and HF hospitalizations regardless of diabetic status.',
          'Finerenone significantly reduces total worsening HF events with lower hyperkalemia incidence than spironolactone.'
        ]
      },
      {
        id: 'ch-3',
        title: 'Diuretic Stewardship & Remote Hemodynamic Pressure Monitoring',
        timestamp: '20:00',
        durationSeconds: 600,
        summary: 'Preventing over-diuresis and prerenal azotemia while maintaining euvolemia.',
        keyTakeaways: ['Decongestion targets: Absence of orthopnea, JVD < 8 cm H2O, stable renal panel.']
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which of the following echocardiographic parameters is the most sensitive indicator of elevated left ventricular filling pressures in HFpEF?',
        options: [
          'Left ventricular ejection fraction (LVEF)',
          'Average E/e’ ratio > 14 and tricuspid regurgitation (TR) peak velocity > 2.8 m/s',
          'Aortic root diameter',
          'Mitral valve deceleration time < 100 ms in isolation'
        ],
        correctIndex: 1,
        explanation: 'An elevated E/e’ ratio (>14) along with peak TR velocity (>2.8 m/s) correlates strongly with elevated pulmonary capillary wedge pressure (PCWP) during both rest and exercise.',
        guidelineCitation: 'ASE/EACVI Diastolic Function Assessment Consensus Recommendations',
        conceptTag: 'Echocardiographic Hemodynamics'
      },
      {
        id: 'q2',
        question: 'When initiating an SGLT2 inhibitor in a patient with HFpEF and baseline eGFR of 45 mL/min, what should you anticipate regarding renal function during the first month?',
        options: [
          'A mandatory increase in eGFR above baseline within 72 hours.',
          'An acceptable acute dip in eGFR of up to 30% that stabilizes and confers long-term nephroprotection.',
          'Permanent drug-induced acute tubular necrosis requiring dialysis.',
          'Immediate discontinuation if serum creatinine rises by 0.1 mg/dL.'
        ],
        correctIndex: 1,
        explanation: 'The initial hemodynamic "eGFR dip" is caused by restored tubuloglomerular feedback and afferent arteriolar constriction, relieving intraglomerular hypertension and preserving nephron survival long-term.',
        guidelineCitation: 'KDIGO 2024 Clinical Practice Guideline for Diabetes and CKD Management',
        conceptTag: 'Renal Pharmacodynamics'
      },
      {
        id: 'q3',
        question: 'According to the STEP-HFpEF trial results, which outcome was demonstrated with once-weekly Semaglutide 2.4 mg in patients with obesity-related HFpEF?',
        options: [
          'No significant difference in Kansas City Cardiomyopathy Questionnaire (KCCQ) scores.',
          'Significant improvements in KCCQ-Clinical Summary Score, 6-minute walk distance, and weight loss compared to placebo.',
          'Increased rates of cardiovascular death compared to standard care.',
          'Requirement for routine cardiac catheterization prior to initiation.'
        ],
        correctIndex: 1,
        explanation: 'Semaglutide 2.4 mg produced a substantial 16.6-point improvement in KCCQ physical limitation score and +21.5 meters on 6-minute walk distance in obese HFpEF patients.',
        guidelineCitation: 'Kosiborod MN et al. NEJM 2023; 389:1069-1084 (STEP-HFpEF Trial)',
        conceptTag: 'Cardiometabolic Innovation'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        reviewerName: 'Dr. Michael Chang, MD',
        reviewerRole: 'Attending Cardiologist',
        reviewerInstitution: 'Cedars-Sinai Medical Center',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '3 days ago',
        comment: 'The clearest breakdown of H2FPEF score vs biomarker thresholds in obese patients I have encountered. The practical titration guidance for Finerenone was immediately applicable in my outpatient clinic.',
        helpfulCount: 42
      },
      {
        id: 'rev-2',
        reviewerName: 'Karen Miller, DNP, FNP-C',
        reviewerRole: 'Heart Failure Specialist NP',
        reviewerInstitution: 'Northwestern Medicine',
        avatar: 'https://images.unsplash.com/photo-1594824813576-13a8904724a8?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '1 week ago',
        comment: 'Exceptional visual layout and high-yield pearls. The discussion of the acute eGFR dip helped reassure our advanced practice team when titrating SGLT2 inhibitors.',
        helpfulCount: 29
      }
    ],
    downloadableProtocols: [
      {
        title: 'Medvora Pocket Protocol: HFpEF Diagnostic & Titration Algorithm 2025',
        size: '1.4 MB',
        type: 'Clinical PDF & Pocket Card',
        description: 'Complete bedside reference with eGFR safety tables, MRA potassium thresholds, and Doppler echo diagnostic checklist.'
      },
      {
        title: 'SGLT2i & GLP-1 RA Co-Prescribing Patient Education Guide',
        size: '850 KB',
        type: 'Printable Patient Handout',
        description: 'Plain-language guide for patients covering hydration, sick-day management rules, and ketone awareness.'
      }
    ]
  },
  {
    id: 'cme-rad-102',
    title: 'Interpreting Chest CT Patterns',
    slug: 'interpreting-chest-ct-patterns',
    subtitle: 'Systematic approach to interstitial lung patterns, ground glass opacities, tree-in-bud, honeycombing, and pulmonary embolism.',
    specialty: 'Radiology',
    category: 'Diagnostics & Imaging',
    difficulty: 'Intermediate',
    credits: 1.5,
    accreditationType: 'AMA PRA Category 1 Credit™',
    accreditationBody: 'American College of Radiology (ACR) & ACCME',
    expiresDate: 'Nov 30, 2026',
    durationMinutes: 38,
    format: 'Clinical Masterclass',
    faculty: EXTENDED_FACULTY[4],
    rating: 4.96,
    ratingsCount: 890,
    enrolledCount: 3420,
    featured: true,
    trending: true,
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=1600',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    fullVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tags: ['Radiology', 'Chest CT', 'Interstitial Lung Disease', 'Pulmonology', 'Pneumonia'],
    objectives: [
      'Differentiate Usual Interstitial Pneumonia (UIP) from Non-Specific Interstitial Pneumonia (NSIP) using axial and coronal high-resolution CT.',
      'Classify distribution patterns (centrilobular, perilymphatic, random) of pulmonary nodules and micronodular opacities.',
      'Identify subtle secondary signs of acute pulmonary embolism, including right ventricular strain (RV/LV diameter ratio > 1.0).',
      'Recognize halo and reverse halo (atoll sign) findings in invasive fungal infections and organizing pneumonia.'
    ],
    prerequisites: ['Basic thoracic cross-sectional anatomy'],
    targetAudience: ['Radiologists', 'Pulmonologists', 'Emergency Physicians', 'Hospitalists', 'Critical Care Fellows'],
    clinicalPearls: [
      'Subpleural, basilar-predominant honeycombing with traction bronchiectasis in the absence of inconsistent features is diagnostic of UIP pattern (idiopathic pulmonary fibrosis) without requiring surgical lung biopsy.',
      'Tree-in-bud opacities signify endobronchial impaction and acute infection (bacterial, mycobacterial, or aspiration), virtually excluding hematogenous dissemination.'
    ],
    modules: [
      {
        id: 'rad-mod-1',
        title: 'Module 01: The Anatomical Secondary Pulmonary Lobule & HRCT Basics',
        description: 'Mastering the core anatomical unit of chest CT: centrilobular structures, interlobular septa, and distribution matrices.',
        lessons: [
          {
            id: 'rad-les-1-1',
            title: '1. High-Resolution CT Acquisition Protocols & Windowing',
            type: 'video',
            durationMinutes: 8,
            summary: 'Thin-collimation (1mm) reconstruction, inspiratory vs expiratory air-trapping scans, and prone positioning.'
          },
          {
            id: 'rad-les-1-2',
            title: '2. Ground-Glass vs Consolidation: Differential Matrix',
            type: 'lecture',
            durationMinutes: 10,
            summary: 'Vascular visibility distinctions, alveolar proteinosis, acute eosinophilic pneumonia, and opportunistic viral infections.'
          },
          {
            id: 'rad-les-1-3',
            title: '3. Interactive CT Case: The Reticular Interstitial Pattern',
            type: 'case',
            durationMinutes: 8,
            checkpointQuestion: {
              question: 'A 64-year-old male former smoker presents with chronic dry cough. HRCT chest shows subpleural, basilar-predominant reticulation, honeycombing, and traction bronchiectasis without ground glass opacities. What pattern is this?',
              options: [
                'Non-Specific Interstitial Pneumonia (NSIP)',
                'Definite Usual Interstitial Pneumonia (UIP)',
                'Hypersensitivity Pneumonitis',
                'Cryptogenic Organizing Pneumonia'
              ],
              correctIndex: 1,
              explanation: 'Subpleural and basilar honeycombing with traction bronchiectasis and absence of inconsistent features meets the official ATS/ERS guideline criteria for Definite UIP pattern.'
            }
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'rad-ch-1',
        title: 'The Secondary Pulmonary Lobule: Diagnostic Framework',
        timestamp: '00:00',
        durationSeconds: 600,
        summary: 'Stepwise algorithm for classifying chest CT abnormalities by anatomical compartment.',
        keyTakeaways: ['Centrilobular vs perilymphatic vs random nodule distribution eliminates 70% of differentials instantly.']
      }
    ],
    quiz: [
      {
        id: 'rad-q1',
        question: 'Which chest CT finding is most specific for invasive pulmonary aspergillosis in a severely neutropenic patient?',
        options: [
          'Diffuse perilymphatic nodules in the upper lobes',
          'A nodule or consolidation surrounded by a perimeter of ground-glass opacity (CT Halo Sign)',
          'Isolated bibasilar pleural effusions',
          'Tracheobronchial wall calcification'
        ],
        correctIndex: 1,
        explanation: 'The CT Halo sign in neutropenic patients represents a focus of angioinvasive infarction surrounded by alveolar hemorrhage and is highly specific for invasive mold infections like Aspergillus.',
        guidelineCitation: 'IDSA Practice Guidelines for the Diagnosis and Management of Aspergillosis',
        conceptTag: 'Thoracic Infection Imaging'
      }
    ],
    reviews: [
      {
        id: 'rad-rev-1',
        reviewerName: 'Dr. Arthur Sterling, MD',
        reviewerRole: 'Pulmonary Critical Care Attending',
        reviewerInstitution: 'Mayo Clinic',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Brilliant interactive case scrolls. The side-by-side comparison of UIP vs NSIP and hypersensitivity pneumonitis is the gold standard for clinical training.',
        helpfulCount: 35
      }
    ],
    downloadableProtocols: [
      {
        title: 'Medvora Chest CT Pattern Classification Matrix 2026',
        size: '2.4 MB',
        type: 'Diagnostic Flowchart PDF',
        description: 'Comprehensive high-resolution chest CT decision tree covering interstitial patterns, nodules, and vascular syndromes.'
      }
    ]
  },
  {
    id: 'cme-endo-103',
    title: 'Advances in Diabetes Care',
    slug: 'advances-in-diabetes-care',
    subtitle: 'Dual & triple incretin agonists (GLP-1/GIP/Glucagon), automated insulin delivery (AID) loops, and cardio-renal protection.',
    specialty: 'Endocrinology',
    category: 'Trending This Week',
    difficulty: 'Intermediate',
    credits: 1.5,
    accreditationType: 'AMA PRA Category 1 Credit™',
    accreditationBody: 'American Diabetes Association (ADA) & ACCME',
    expiresDate: 'Jan 15, 2027',
    durationMinutes: 36,
    format: 'Clinical Masterclass',
    faculty: EXTENDED_FACULTY[9],
    rating: 4.95,
    ratingsCount: 1120,
    enrolledCount: 4600,
    featured: true,
    trending: true,
    thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    fullVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    tags: ['Diabetes', 'GLP-1 RA', 'Tirzepatide', 'Cardiometabolic', 'Continuous Glucose Monitoring'],
    objectives: [
      'Select and titrate modern multi-agonist incretin therapies (Tirzepatide, Retatrutide) for glycemic control and visceral weight reduction.',
      'Interpret Ambulatory Glucose Profile (AGP) reports, targeting Time in Range (TIR 70-180 mg/dL) > 70% and Time Below Range < 4%.',
      'Optimize cardio-renal protection in Type 2 Diabetes with concomitant albuminuric chronic kidney disease.',
      'Prevent and manage gastrointestinal adverse effects during rapid incretin dose escalation.'
    ],
    prerequisites: ['Foundational understanding of endocrine pathophysiology and oral antidiabetic agents'],
    targetAudience: ['Endocrinologists', 'Primary Care Physicians', 'Hospitalists', 'Nurse Practitioners', 'Certified Diabetes Care Specialists'],
    clinicalPearls: [
      'Dual GIP/GLP-1 receptor agonists deliver average HbA1c reductions of up to 2.4% and total body weight reductions exceeding 20% in clinical trials (SURPASS paradigm).',
      'Prioritize Time in Range (TIR) from continuous glucose monitoring over solitary HbA1c in patients with hemoglobinopathies, anemia, or frequent hypoglycemic unawareness.'
    ],
    modules: [
      {
        id: 'endo-mod-1',
        title: 'Module 01: Incretin Poly-Agonist Therapeutics',
        description: 'Mechanism of dual GIP/GLP-1 and triple agonists, SURPASS/SURMOUNT trial data, and safe initiation protocols.',
        lessons: [
          {
            id: 'endo-les-1-1',
            title: '1. Incretin Synergy: Dual GIP & GLP-1 Receptor Activation',
            type: 'video',
            durationMinutes: 9,
            summary: 'Why dual receptor co-agonism surpasses mono-agonists in adipose tissue lipolysis and islet insulin secretion.'
          },
          {
            id: 'endo-les-1-2',
            title: '2. AGP Metric Mastery: Beyond HbA1c',
            type: 'lecture',
            durationMinutes: 8,
            summary: 'Standardized 14-day CGM analysis: Time in Range, Glucose Management Indicator (GMI), and coefficient of variation.'
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'endo-ch-1',
        title: 'Modern Incretin Architecture & Metabolic Target Setting',
        timestamp: '00:00',
        durationSeconds: 540,
        summary: 'Translating ADA 2025 Standards of Care into personalized clinical treatment regimens.',
        keyTakeaways: ['Initiate SGLT2i and GLP-1/GIP receptor agonists independent of baseline HbA1c in patients with established ASCVD, HF, or CKD.']
      }
    ],
    quiz: [
      {
        id: 'endo-q1',
        question: 'According to the ADA Standards of Care, what is the primary target for Time in Range (70–180 mg/dL) on continuous glucose monitoring in most non-pregnant adults with diabetes?',
        options: [
          'Greater than 50% Time in Range',
          'Greater than 70% Time in Range, with less than 4% Time Below Range (< 70 mg/dL)',
          'Greater than 95% Time in Range with 0% variability',
          'Solitary morning fasting glucose < 100 mg/dL regardless of postprandial excursions'
        ],
        correctIndex: 1,
        explanation: 'The internationally consensus-recommended target is > 70% Time in Range (70–180 mg/dL), with < 4% in Level 1 hypoglycemia (<70 mg/dL) and < 1% in Level 2 hypoglycemia (<54 mg/dL).',
        guidelineCitation: 'ADA Standards of Care in Diabetes 2025 (Diabetes Technology & Glycemic Targets)',
        conceptTag: 'Continuous Glucose Monitoring Metrics'
      }
    ],
    reviews: [
      {
        id: 'endo-rev-1',
        reviewerName: 'Dr. Patricia Hall, MD',
        reviewerRole: 'Primary Care Director',
        reviewerInstitution: 'Emory Healthcare',
        avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '5 days ago',
        comment: 'Super practical guide to interpreting AGP sensor reports. The patient hydration tips for incretin titration eliminated our clinic’s drop-out rate.',
        helpfulCount: 22
      }
    ],
    downloadableProtocols: [
      {
        title: 'ADA 2025 Incretin & SGLT2i Cardiorenal Algorithm Flowsheet',
        size: '1.6 MB',
        type: 'Clinical Algorithm PDF',
        description: 'Bedside guideline mapping eGFR cutoffs, GLP-1 RA titration schedules, and CGM target optimization.'
      }
    ]
  },
  {
    id: 'cme-comm-104',
    title: 'Clinical Communication Essentials',
    slug: 'clinical-communication-essentials',
    subtitle: 'High-stakes discussions, breaking bad news (SPIKES protocol), shared decision making, and de-escalating clinical conflict.',
    specialty: 'Primary Care',
    category: 'Leadership & Professional Development',
    difficulty: 'Foundational',
    credits: 1.0,
    accreditationType: 'AMA PRA Category 1 Credit™',
    accreditationBody: 'American College of Physicians (ACP) & ACCME',
    expiresDate: 'Dec 15, 2026',
    durationMinutes: 28,
    format: 'Clinical Masterclass',
    faculty: EXTENDED_FACULTY[7],
    rating: 4.97,
    ratingsCount: 980,
    enrolledCount: 3950,
    featured: true,
    trending: false,
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1600',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    fullVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    tags: ['Communication', 'SPIKES Protocol', 'Leadership', 'Empathy', 'Shared Decision Making'],
    objectives: [
      'Execute the 6-step SPIKES protocol when delivering serious, life-altering clinical diagnoses.',
      'Deploy open-ended inquiry and NURSE empathetic statements to de-escalate patient and family distress.',
      'Facilitate structured goals-of-care conversations and align treatment options with patient values.',
      'Practice closed-loop communication during critical multidisciplinary handoffs and resuscitations.'
    ],
    prerequisites: ['Clinical patient care experience in inpatient or outpatient settings'],
    targetAudience: ['All Healthcare Professionals', 'Physicians', 'Nurses', 'Social Workers', 'Fellows / Residents'],
    clinicalPearls: [
      'When breaking difficult news, never follow empathetic acknowledgment with the word "but"; replace it with "and" to validate emotions without negating the connection.',
      'The "Ask-Tell-Ask" framework ensures clinicians establish what the patient already knows before delivering dense medical information.'
    ],
    modules: [
      {
        id: 'comm-mod-1',
        title: 'Module 01: The SPIKES Protocol & Empathetic Statements',
        description: 'Setting, Perception, Invitation, Knowledge, Emotions (NURSE statements), and Strategy & Summary.',
        lessons: [
          {
            id: 'comm-les-1-1',
            title: '1. The Psychology of Serious Illness Communication',
            type: 'video',
            durationMinutes: 7,
            summary: 'Why clinician empathy improves patient treatment adherence and reduces clinician burnout.'
          },
          {
            id: 'comm-les-1-2',
            title: '2. The SPIKES Step-by-Step Simulated Walkthrough',
            type: 'lecture',
            durationMinutes: 9,
            summary: 'Real-world video examples of difficult oncologic and critical care prognosis discussions.'
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'comm-ch-1',
        title: 'Mastering the 6-Step SPIKES Framework',
        timestamp: '00:00',
        durationSeconds: 420,
        summary: 'Pragmatic phrases and body language techniques for difficult consultations.',
        keyTakeaways: ['Pause and allow silence after delivering significant medical news; silence allows emotional processing.']
      }
    ],
    quiz: [
      {
        id: 'comm-q1',
        question: 'In the SPIKES protocol for delivering difficult medical news, what does the "E" stand for, and how is it best addressed?',
        options: [
          'Estimation of survival; give exact numeric months immediately.',
          'Emotions and Empathy; acknowledge and respond to patient emotions with NURSE statements (Naming, Understanding, Respecting, Supporting, Exploring).',
          'Exit strategy; end the conversation within 5 minutes.',
          'Electronic health record documentation.'
        ],
        correctIndex: 1,
        explanation: 'The "E" in SPIKES represents addressing the patient\'s Emotions with Empathy, utilizing validated NURSE tools to build therapeutic alliance and reduce patient isolation.',
        guidelineCitation: 'Baile WF et al. The Oncologist 2000; 5(4):302-311 (SPIKES Protocol)',
        conceptTag: 'Clinical Empathy & Communication'
      }
    ],
    reviews: [
      {
        id: 'comm-rev-1',
        reviewerName: 'Dr. Laura Sanchez, MD',
        reviewerRole: 'Hospital Medicine Attending',
        reviewerInstitution: 'UCSF Health',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '4 days ago',
        comment: 'Transformative for any practicing physician. The NURSE statements provide exact phrasing that immediately de-escalated a difficult family meeting the very next day.',
        helpfulCount: 31
      }
    ],
    downloadableProtocols: [
      {
        title: 'SPIKES & NURSE Clinical Communication Pocket Guide',
        size: '720 KB',
        type: 'Pocket Reference Card',
        description: 'Laminated card reference with exact dialogue prompts for goals-of-care, code status, and difficult prognosis conversations.'
      }
    ]
  },
  {
    id: 'cme-ai-105',
    title: 'AI Tools for Modern Healthcare Professionals',
    slug: 'ai-tools-for-modern-healthcare-professionals',
    subtitle: 'Ambient clinical documentation, generative AI differential diagnosis, radiology/pathology copilots, and medicolegal safety.',
    specialty: 'Emerging Technologies & AI' as any,
    category: 'Emerging Technologies & AI',
    difficulty: 'Intermediate',
    credits: 1.5,
    accreditationType: 'AMA PRA Category 1 Credit™',
    accreditationBody: 'American Medical Informatics Association (AMIA) & ACCME',
    expiresDate: 'Feb 28, 2027',
    durationMinutes: 35,
    format: 'Clinical Masterclass',
    faculty: EXTENDED_FACULTY[2],
    rating: 4.98,
    ratingsCount: 1540,
    enrolledCount: 6200,
    featured: true,
    trending: true,
    thumbnail: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    fullVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    tags: ['AI in Medicine', 'Clinical Copilot', 'Ambient AI', 'Medical Informatics', 'Diagnostics'],
    objectives: [
      'Evaluate clinical validation metrics (sensitivity, specificity, AUROC) of FDA-cleared generative AI diagnostic software.',
      'Deploy ambient listening scribe technology to reduce electronic health record (EHR) documentation burden while safeguarding PHI/HIPAA.',
      'Formulate effective prompt engineering structures for complex multi-system clinical differential synthesis.',
      'Mitigate cognitive automation bias and understand clinician legal liability in AI-assisted medical decision making.'
    ],
    prerequisites: ['Active clinical practice or healthcare operations experience'],
    targetAudience: ['All Clinicians', 'Chief Medical Officers', 'Informatics Specialists', 'Residents & Fellows'],
    clinicalPearls: [
      'Clinicians remain 100% legally and ethically liable for all documented medical notes and orders generated with AI assistance; always perform structured line-by-line verification.',
      'Prompting clinical AI with structured chain-of-thought instructions ("Analyze vitals first, then lab trends, then suggest 3 tiered differentials") increases diagnostic concordance by up to 28%.'
    ],
    modules: [
      {
        id: 'ai-mod-1',
        title: 'Module 01: Clinical AI Architecture & Medicolegal Boundaries',
        description: 'How transformer architectures and medical LLMs reason, FDA clearance pathways, and HIPAA compliance.',
        lessons: [
          {
            id: 'ai-les-1-1',
            title: '1. Foundation Models in Clinical Workflow: Scribes to Copilots',
            type: 'video',
            durationMinutes: 8,
            summary: 'Overview of ambient acoustic models, clinical NLP, and multi-modal radiology/ECG AI.'
          },
          {
            id: 'ai-les-1-2',
            title: '2. Prompt Engineering for Complex Patient Differentials',
            type: 'lecture',
            durationMinutes: 10,
            summary: 'Using structured EHR data inputs to generate evidence-grounded differential diagnoses.'
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'ai-ch-1',
        title: 'AI in Daily Practice: Efficiency, Accuracy, and Liability',
        timestamp: '00:00',
        durationSeconds: 520,
        summary: 'Real-world benchmarks and workflows saving 2+ hours of administrative EHR charting per day.',
        keyTakeaways: ['Never input direct un-anonymized PHI into public non-BAA AI platforms.']
      }
    ],
    quiz: [
      {
        id: 'ai-q1',
        question: 'Under prevailing medical malpractice and healthcare legal standards, who bears ultimate responsibility for a diagnostic omission or incorrect medication dose suggested by an AI clinical decision support system?',
        options: [
          'The software vendor who engineered the model.',
          'The attending physician / licensed practitioner who approved the order or note.',
          'The hospital IT department.',
          'The regulatory agency that cleared the software.'
        ],
        correctIndex: 1,
        explanation: 'Licensed healthcare practitioners maintain non-delegable fiduciary responsibility for patient care. AI decision support is an assistive tool, and the clinician must independently review and validate all outputs.',
        guidelineCitation: 'AMA Policy H-480.940: Augmented Intelligence in Healthcare',
        conceptTag: 'Healthcare AI Ethics & Medicolegal Governance'
      }
    ],
    reviews: [
      {
        id: 'ai-rev-1',
        reviewerName: 'Dr. Gregory Vance, MD, MS',
        reviewerRole: 'Chief Medical Information Officer',
        reviewerInstitution: 'Stanford Health Care',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '1 day ago',
        comment: 'Essential curriculum for every modern hospitalist and attending. The practical prompt templates for differential synthesis are extraordinary.',
        helpfulCount: 48
      }
    ],
    downloadableProtocols: [
      {
        title: 'Hospital Enterprise Clinical AI Deployment & Safety Framework',
        size: '1.9 MB',
        type: 'Policy & Prompt Template PDF',
        description: 'Standard operating guidelines for deploying ambient AI documentation, evaluating model hallucinations, and EHR integration.'
      }
    ]
  },
  {
    id: 'cme-neuro-303',
    title: 'Acute Ischemic Stroke: Extended Window Thrombectomy & Tenecteplase Protocols',
    slug: 'acute-ischemic-stroke-tenecteplase-thrombectomy',
    subtitle: 'CT perfusion mismatch criteria, DEFUSE-3/DAWN application, blood pressure targets, and post-thrombectomy critical care.',
    specialty: 'Neurology',
    category: 'Clinical Skills',
    difficulty: 'Advanced',
    credits: 1.5,
    accreditationType: 'AMA PRA Category 1 Credit™',
    accreditationBody: 'American Heart Association (AHA/ASA) & ACCME',
    expiresDate: 'Oct 01, 2026',
    durationMinutes: 38,
    format: 'Interactive Case Lab',
    faculty: EXTENDED_FACULTY[2],
    rating: 4.96,
    ratingsCount: 1650,
    enrolledCount: 5200,
    featured: true,
    trending: true,
    thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    fullVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    tags: ['Stroke', 'Tenecteplase', 'Endovascular Thrombectomy', 'Neurocritical Care', 'CT Perfusion'],
    objectives: [
      'Identify patients eligible for mechanical thrombectomy in the 6-24 hour window using RAPID automated CT perfusion criteria.',
      'Differentiate Tenecteplase (TNK) 0.25 mg/kg bolus administration from traditional Alteplase infusions in door-to-needle optimization.',
      'Manage strict hemodynamic parameters (<180/105 mmHg pre-lytic, <140/90 mmHg post-successful TICI 2b/3 recanalization).'
    ],
    prerequisites: ['Basic neuroanatomy and NIH Stroke Scale certification'],
    targetAudience: ['Neurologists', 'Emergency Physicians', 'Neuro-interventionalists', 'ICU Nurses'],
    clinicalPearls: [
      'Tenecteplase 0.25 mg/kg administered as a 5-10 second IV push reduces door-to-needle and door-to-groin times by an average of 22 minutes compared to 1-hour alteplase infusion.',
      'Ischemic core volume < 70 mL with mismatch ratio > 1.8 and mismatch volume > 15 mL remains the golden eligibility standard in the late window.'
    ],
    modules: [
      {
        id: 'stroke-mod-1',
        title: 'Module 01: Hyperacute Neurovascular Decision Algorithms',
        description: 'Door-to-needle workflows, single bolus TNK, and late-window perfusion mismatch triage.',
        lessons: [
          {
            id: 'stroke-les-1-1',
            title: '1. TNK Single Bolus vs Alteplase Infusion Protocols',
            type: 'video',
            durationMinutes: 9,
            summary: 'Trial evidence from AcT and EXTEND-IA TNK supporting rapid single-bolus thrombolysis.'
          },
          {
            id: 'stroke-les-1-2',
            title: '2. Interpreting Automated Perfusion Imaging (CBF < 30% vs Tmax > 6s)',
            type: 'lecture',
            durationMinutes: 10,
            summary: 'Stepwise guide to reading RAPID automated perfusion maps in unknown time of onset strokes.'
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'neuro-ch-1',
        title: 'Door-to-Needle Re-imagined: The TNK Single-Bolus Transition',
        timestamp: '00:00',
        durationSeconds: 540,
        summary: 'Evidence from AcT and EXTEND-IA TNK trials: efficacy, safety, and hospital system workflows.',
        keyTakeaways: ['Single bolus TNK allows immediate patient transfer to angiography suite without running infusion pumps.']
      }
    ],
    quiz: [
      {
        id: 'neuro-q1',
        question: 'A 64-year-old male was last known well at 22:00. At 07:00 (9 hours later), his family finds him with right hemiplegia and global aphasia (NIHSS 18). CTP shows an ischemic core (CBF < 30%) of 18 mL and hypoperfusion (Tmax > 6s) of 95 mL. CTA confirms left M1 occlusion. What is the standard of care?',
        options: [
          'No acute intervention because time exceeds the 4.5-hour intravenous lytic window.',
          'Emergent mechanical thrombectomy under DEFUSE-3 / DAWN trial criteria.',
          'Start Aspirin 325 mg and observe in the telemetry unit.',
          'Immediate decompressive craniectomy.'
        ],
        correctIndex: 1,
        explanation: 'The patient meets DEFUSE-3 criteria in the 6-16h window (small core of 18 mL, large penumbra of 77 mL mismatch, mismatch ratio > 5), conferring dramatic functional independence benefit with endovascular thrombectomy.',
        guidelineCitation: '2024 AHA/ASA Guidelines for the Early Management of Patients with Acute Ischemic Stroke',
        conceptTag: 'Hyperacute Neurovascular Intervention'
      }
    ],
    reviews: [
      {
        id: 'neuro-rev-1',
        reviewerName: 'Dr. James Lin, MD',
        reviewerRole: 'Neuro-Interventional Fellow',
        reviewerInstitution: 'Mass General Brigham',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '1 week ago',
        comment: 'The CTP mismatch visual explanations made late-window triage completely intuitive. Essential training for our stroke code team.',
        helpfulCount: 37
      }
    ],
    downloadableProtocols: [
      {
        title: 'Hospital Acute Stroke Code Rapid TNK & EVT Order Set',
        size: '1.2 MB',
        type: 'Clinical Order Set & Checklist',
        description: 'Standardized order set including inclusion/exclusion criteria, TNK weight-based dosing chart, and post-TICI hemodynamic protocol.'
      }
    ]
  },
  {
    id: 'cme-micro-quick-1',
    title: 'Rapid 10-Minute Clinical Capsule: Managing Anaphylaxis in the Outpatient Setting',
    slug: 'rapid-anaphylaxis-outpatient-management',
    subtitle: 'Immediate intramuscular epinephrine dosing, positioning, avoiding delayed administration, and biphasic reaction monitoring.',
    specialty: 'Emergency Medicine',
    category: 'Quick 10-Minute Learning',
    difficulty: 'Foundational',
    credits: 0.25,
    accreditationType: 'AMA PRA Category 1 Credit™',
    accreditationBody: 'American College of Emergency Physicians (ACEP) & ACCME',
    expiresDate: 'Dec 31, 2026',
    durationMinutes: 10,
    format: 'Micro-Capsule',
    faculty: EXTENDED_FACULTY[6],
    rating: 4.99,
    ratingsCount: 2310,
    enrolledCount: 8400,
    featured: true,
    trending: true,
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1600',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    fullVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    tags: ['Anaphylaxis', 'Epinephrine', 'Emergency Medicine', 'Micro-Learning', 'Resuscitation'],
    objectives: [
      'Administer intramuscular epinephrine (0.3 - 0.5 mg 1:1000) into the anterolateral mid-thigh without delaying for antihistamines.',
      'Maintain recumbent or trendelenburg positioning to prevent empty ventricle syndrome.'
    ],
    prerequisites: ['Basic clinical life support'],
    targetAudience: ['All Healthcare Professionals', 'Clinic Staff', 'Nurses', 'Physicians'],
    clinicalPearls: [
      'Intramuscular epinephrine into the vastus lateralis achieves peak plasma levels 4x faster than subcutaneous or deltoid injection.',
      'Antihistamines and corticosteroids do NOT treat upper airway obstruction or shock; they must never delay repeat epinephrine.'
    ],
    modules: [
      {
        id: 'micro-mod-1',
        title: 'Module 01: 10-Minute Emergency Resuscitation Drill',
        description: 'Vastus lateralis injection, autoinjector use, and biphasic observation windows.',
        lessons: [
          {
            id: 'micro-les-1',
            title: '1. First-Line Epinephrine Administration: Zero-Delay Protocol',
            type: 'video',
            durationMinutes: 6,
            summary: 'Why delay in epinephrine is the #1 risk factor for fatal anaphylaxis.'
          },
          {
            id: 'micro-les-2',
            title: '2. Rapid Case Check: The Biphasic Threat',
            type: 'case',
            durationMinutes: 4,
            checkpointQuestion: {
              question: 'A 24-year-old receives IM epinephrine for peanut anaphylaxis. Symptoms completely resolve in 10 minutes. What is the recommended observation window?',
              options: [
                'Discharge immediately with no observation needed.',
                'Observe in clinic or ED for at least 4 to 8 hours due to the risk of biphasic reaction in up to 20% of cases.',
                'Administer oral diphenhydramine and discharge in 15 minutes.',
                'Prescribe bed rest for 7 days.'
              ],
              correctIndex: 1,
              explanation: 'Biphasic anaphylaxis can recur 1 to 72 hours after initial symptom resolution; observation of 4 to 8 hours is recommended based on initial severity.'
            }
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'micro-ch-1',
        title: 'Immediate First-Line Epinephrine Protocol',
        timestamp: '00:00',
        durationSeconds: 300,
        summary: 'Emergency bedside algorithm for severe allergic reactions.',
        keyTakeaways: ['Dose: 0.3 mg (adult) or 0.15 mg (pediatric < 25kg) IM into anterolateral thigh.']
      }
    ],
    quiz: [
      {
        id: 'micro-q1',
        question: 'Which route of administration for epinephrine achieves the fastest therapeutic peak plasma concentrations in acute anaphylaxis?',
        options: [
          'Subcutaneous deltoid injection',
          'Intramuscular injection into the anterolateral mid-thigh (vastus lateralis)',
          'Sublingual spray',
          'Intramuscular injection into the gluteus maximus'
        ],
        correctIndex: 1,
        explanation: 'Due to extensive vascularity, IM injection into the vastus lateralis produces peak serum epinephrine concentrations significantly faster than subcutaneous or other muscular sites.',
        guidelineCitation: 'World Allergy Organization (WAO) Anaphylaxis Guidelines 2020/2024',
        conceptTag: 'Emergency Resuscitation Pharmacology'
      }
    ],
    reviews: [
      {
        id: 'micro-rev-1',
        reviewerName: 'Dr. Emily Watson, MD',
        reviewerRole: 'Urgent Care Medical Director',
        reviewerInstitution: 'Banner Health',
        avatar: 'https://images.unsplash.com/photo-1594824813576-13a8904724a8?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: 'Yesterday',
        comment: 'The perfect 10-minute micro-learning module. We mandated this across our entire clinic staff during morning huddle.',
        helpfulCount: 54
      }
    ],
    downloadableProtocols: [
      {
        title: 'Outpatient Anaphylaxis Rapid Response Action Flowchart',
        size: '640 KB',
        type: 'Bedside Emergency Chart',
        description: 'Laminated clinic wall poster detailing dosing, injection angles, and 911 dispatch triggers.'
      }
    ]
  },
  {
    id: 'cme-micro-quick-2',
    title: 'Rapid 10-Minute Clinical Capsule: Sepsis Bundle Execution in the First Hour',
    slug: 'rapid-sepsis-first-hour-bundle',
    subtitle: 'Lactate measurement, blood cultures prior to antibiotics, broad-spectrum empiric coverage, and initial vasopressor timing.',
    specialty: 'Critical Care',
    category: 'Quick 10-Minute Learning',
    difficulty: 'Intermediate',
    credits: 0.25,
    accreditationType: 'ANCC Nursing Contact Hours',
    accreditationBody: 'American Nurses Credentialing Center & SCCM',
    expiresDate: 'Dec 31, 2026',
    durationMinutes: 10,
    format: 'Micro-Capsule',
    faculty: EXTENDED_FACULTY[3],
    rating: 4.96,
    ratingsCount: 1890,
    enrolledCount: 7100,
    featured: false,
    trending: true,
    thumbnail: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1600',
    previewVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    fullVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tags: ['Sepsis', 'Critical Care', 'Nursing', 'First Hour Bundle', 'Vasopressors'],
    objectives: [
      'Complete the Surviving Sepsis 1-Hour Bundle elements (Lactate, Blood Cultures, IV Antibiotics, Fluid/Vasopressor).',
      'Recognize septic shock when MAP < 65 mmHg or serum lactate > 2 mmol/L persists despite initial fluid challenge.'
    ],
    prerequisites: ['Basic vital signs and intravenous access skills'],
    targetAudience: ['ICU Nurses', 'Emergency Nurses', 'Hospitalists', 'Rapid Response Teams'],
    clinicalPearls: [
      'Every 1-hour delay in antibiotic administration in septic shock increases in-hospital mortality by 7.6%.',
      'Start peripheral Norepinephrine immediately if MAP remains < 65 mmHg during ongoing fluid resuscitation.'
    ],
    modules: [
      {
        id: 'sepsis-mod-1',
        title: 'Module 01: Hour-1 Surviving Sepsis Bundle Drill',
        description: 'Executing five simultaneous nursing and physician actions within 60 minutes.',
        lessons: [
          {
            id: 'sepsis-les-1',
            title: '1. The 60-Minute Sepsis Checklist',
            type: 'video',
            durationMinutes: 6,
            summary: 'Stepwise orchestration between pharmacy, nursing, laboratory, and physician attending.'
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'sepsis-ch-1',
        title: 'Hour-1 Sepsis Resuscitation Checklist',
        timestamp: '00:00',
        durationSeconds: 300,
        summary: 'Stepwise orchestration between pharmacy, nursing, laboratory, and physician attending.',
        keyTakeaways: ['Target MAP >= 65 mmHg; re-measure lactate within 2-4 hours if initially elevated.']
      }
    ],
    quiz: [
      {
        id: 'sepsis-q1',
        question: 'Which vasopressor is recommended as the first-line agent to target a mean arterial pressure (MAP) >= 65 mmHg in septic shock?',
        options: [
          'Dopamine',
          'Norepinephrine',
          'Phenylephrine',
          'Epinephrine'
        ],
        correctIndex: 1,
        explanation: 'Norepinephrine is the first-line vasopressor recommended by Surviving Sepsis Guidelines due to superior survival and lower tachyarrhythmia rates compared to dopamine.',
        guidelineCitation: 'Surviving Sepsis Campaign International Guidelines 2021/2023',
        conceptTag: 'Hemodynamic Resuscitation'
      }
    ],
    reviews: [
      {
        id: 'sepsis-rev-1',
        reviewerName: 'Maria Santos, BSN, RN, CCRN',
        reviewerRole: 'ICU Charge Nurse',
        reviewerInstitution: 'Rush University Medical Center',
        avatar: 'https://images.unsplash.com/photo-1594824813576-13a8904724a8?auto=format&fit=crop&q=80&w=200',
        rating: 5,
        date: '3 days ago',
        comment: 'Short, powerful, and practical. We use this in our new ICU nurse orientation.',
        helpfulCount: 19
      }
    ],
    downloadableProtocols: [
      {
        title: 'Surviving Sepsis 1-Hour Bundle Nursing Checklist',
        size: '520 KB',
        type: 'Clinical Flowsheet',
        description: 'Time-stamped checklist for blood cultures, antibiotic delivery, and peripheral vasopressor titration.'
      }
    ]
  }
];
