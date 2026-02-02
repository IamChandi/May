// Demo data for first-in-class drug launch scenario
// NOVA-101 (Novaris) for Hereditary Angioedema (HAE)

export const demoTrialData = {
  // Trial Identity
  compound: "NOVA-101",
  brandName: "Novaris",
  genericName: "novarixin",
  indication: "Hereditary Angioedema (HAE)",
  indicationFull: "Prophylaxis to prevent attacks in adult patients with Hereditary Angioedema",
  therapeuticArea: "Rare Disease / Immunology",
  phase: "Phase 3",
  trialName: "SHIELD-1",
  nctId: "NCT05123456",
  sponsor: "Novaris Therapeutics",

  // Mechanism of Action
  moa: {
    target: "Plasma Kallikrein",
    mechanism: "Selective oral inhibitor of plasma kallikrein, preventing the cleavage of high-molecular-weight kininogen (HMWK) to bradykinin",
    differentiator: "First oral small molecule kallikrein inhibitor for HAE prophylaxis"
  },

  // Trial Design
  design: {
    type: "Randomized, double-blind, placebo-controlled",
    duration: "26 weeks",
    arms: [
      { name: "NOVA-101 300mg QD", n: 132 },
      { name: "Placebo", n: 132 }
    ],
    randomization: "1:1",
    stratification: ["Prior prophylactic therapy use", "Baseline attack rate (≥2 vs <2 per month)"],
    primaryEndpoint: "Monthly HAE attack rate over 26 weeks",
    keyInclusion: [
      "Age ≥18 years",
      "Confirmed diagnosis of HAE type I or II",
      "≥2 documented HAE attacks within 3 months prior to screening",
      "Stable medical regimen for ≥30 days"
    ],
    keyExclusion: [
      "Use of long-term prophylactic therapy within 14 days",
      "Participation in another interventional clinical study",
      "Known hypersensitivity to study drug components"
    ]
  },

  // Populations
  populations: {
    itt: { n: 264, label: "Intent-to-Treat", description: "All randomized patients" },
    mITT: { n: 251, label: "Modified ITT", description: "ITT with ≥1 post-baseline efficacy assessment" },
    pp: { n: 238, label: "Per-Protocol", description: "mITT without major protocol deviations" },
    safety: { n: 264, label: "Safety Population", description: "All patients who received ≥1 dose" }
  },

  // Baseline Characteristics
  baseline: {
    demographics: [
      { characteristic: "Age, mean (SD), years", drug: "42.3 (14.2)", placebo: "41.8 (13.9)" },
      { characteristic: "Female, n (%)", drug: "88 (66.7)", placebo: "87 (65.9)" },
      { characteristic: "White, n (%)", drug: "112 (84.8)", placebo: "114 (86.4)" },
      { characteristic: "BMI, mean (SD), kg/m²", drug: "27.4 (5.8)", placebo: "26.9 (5.4)" }
    ],
    disease: [
      { characteristic: "HAE Type I, n (%)", drug: "118 (89.4)", placebo: "120 (90.9)" },
      { characteristic: "HAE Type II, n (%)", drug: "14 (10.6)", placebo: "12 (9.1)" },
      { characteristic: "Disease duration, mean (SD), years", drug: "18.4 (12.1)", placebo: "17.9 (11.8)" },
      { characteristic: "Monthly attacks at baseline, mean (SD)", drug: "2.9 (1.4)", placebo: "3.1 (1.5)" },
      { characteristic: "Prior prophylactic therapy, n (%)", drug: "78 (59.1)", placebo: "78 (59.1)" }
    ]
  },

  // Primary Endpoint
  primaryEndpoint: {
    name: "Monthly HAE Attack Rate",
    description: "Time-normalized number of investigator-confirmed HAE attacks per month",
    drugResult: 0.52,
    placeboResult: 2.35,
    reduction: 78,
    reductionCI: [71, 84],
    pValue: "<0.0001",
    analysisMethod: "Negative binomial regression adjusted for stratification factors"
  },

  // Secondary Endpoints
  secondaryEndpoints: [
    {
      name: "Attack-free patients at Week 26",
      description: "Proportion of patients with zero attacks during treatment",
      drugResult: "54.5%",
      placeboResult: "8.3%",
      difference: "46.2%",
      pValue: "<0.0001",
      ci95: [36.8, 55.6]
    },
    {
      name: "Time to first attack",
      description: "Median days from randomization to first investigator-confirmed attack",
      drugResult: "142 days",
      placeboResult: "12 days",
      hr: 0.19,
      pValue: "<0.0001",
      ci95: [0.14, 0.26]
    },
    {
      name: "Use of rescue medication",
      description: "Mean number of rescue medication doses per month",
      drugResult: 0.31,
      placeboResult: 1.89,
      reduction: "84%",
      pValue: "<0.0001"
    },
    {
      name: "HAE-QoL Total Score",
      description: "Change from baseline in HAE Quality of Life questionnaire (0-100, higher=better)",
      drugResult: "+18.4",
      placeboResult: "+2.1",
      difference: "16.3",
      pValue: "<0.0001",
      ci95: [12.4, 20.2]
    },
    {
      name: "Severe attacks",
      description: "Monthly rate of severe HAE attacks",
      drugResult: 0.08,
      placeboResult: 0.67,
      reduction: "88%",
      pValue: "<0.0001"
    },
    {
      name: "Attack severity score",
      description: "Mean Visual Analog Scale score for attacks (0-100mm)",
      drugResult: "28.4",
      placeboResult: "52.7",
      difference: "-24.3",
      pValue: "<0.0001"
    }
  ],

  // Subgroup Analysis (for forest plot)
  subgroups: [
    {
      name: "Overall Population",
      category: "overall",
      n: 264,
      nDrug: 132,
      nPlacebo: 132,
      rateDrug: 0.52,
      ratePlacebo: 2.35,
      rr: 0.22,
      ciLower: 0.16,
      ciUpper: 0.30,
      pValue: "<0.0001",
      selected: true
    },
    {
      name: "Age 18 to <40 years",
      category: "age",
      n: 98,
      nDrug: 51,
      nPlacebo: 47,
      rateDrug: 0.48,
      ratePlacebo: 2.51,
      rr: 0.19,
      ciLower: 0.11,
      ciUpper: 0.33,
      pValue: "<0.0001",
      selected: true
    },
    {
      name: "Age 40 to <65 years",
      category: "age",
      n: 112,
      nDrug: 55,
      nPlacebo: 57,
      rateDrug: 0.54,
      ratePlacebo: 2.28,
      rr: 0.24,
      ciLower: 0.15,
      ciUpper: 0.38,
      pValue: "<0.0001",
      selected: true
    },
    {
      name: "Age ≥65 years",
      category: "age",
      n: 54,
      nDrug: 26,
      nPlacebo: 28,
      rateDrug: 0.58,
      ratePlacebo: 2.31,
      rr: 0.25,
      ciLower: 0.12,
      ciUpper: 0.52,
      pValue: "0.0003",
      selected: true
    },
    {
      name: "Male",
      category: "sex",
      n: 89,
      nDrug: 44,
      nPlacebo: 45,
      rateDrug: 0.49,
      ratePlacebo: 2.42,
      rr: 0.20,
      ciLower: 0.11,
      ciUpper: 0.36,
      pValue: "<0.0001",
      selected: true
    },
    {
      name: "Female",
      category: "sex",
      n: 175,
      nDrug: 88,
      nPlacebo: 87,
      rateDrug: 0.54,
      ratePlacebo: 2.31,
      rr: 0.23,
      ciLower: 0.16,
      ciUpper: 0.34,
      pValue: "<0.0001",
      selected: true
    },
    {
      name: "HAE Type I",
      category: "disease",
      n: 238,
      nDrug: 118,
      nPlacebo: 120,
      rateDrug: 0.51,
      ratePlacebo: 2.33,
      rr: 0.22,
      ciLower: 0.16,
      ciUpper: 0.30,
      pValue: "<0.0001",
      selected: true
    },
    {
      name: "HAE Type II",
      category: "disease",
      n: 26,
      nDrug: 14,
      nPlacebo: 12,
      rateDrug: 0.61,
      ratePlacebo: 2.54,
      rr: 0.24,
      ciLower: 0.08,
      ciUpper: 0.71,
      pValue: "0.0098",
      selected: true
    },
    {
      name: "Prior Prophylaxis",
      category: "history",
      n: 156,
      nDrug: 78,
      nPlacebo: 78,
      rateDrug: 0.56,
      ratePlacebo: 2.24,
      rr: 0.25,
      ciLower: 0.17,
      ciUpper: 0.37,
      pValue: "<0.0001",
      selected: true
    },
    {
      name: "No Prior Prophylaxis",
      category: "history",
      n: 108,
      nDrug: 54,
      nPlacebo: 54,
      rateDrug: 0.46,
      ratePlacebo: 2.51,
      rr: 0.18,
      ciLower: 0.10,
      ciUpper: 0.32,
      pValue: "<0.0001",
      selected: true
    },
    {
      name: "Baseline ≥2 attacks/month",
      category: "severity",
      n: 142,
      nDrug: 72,
      nPlacebo: 70,
      rateDrug: 0.58,
      ratePlacebo: 2.89,
      rr: 0.20,
      ciLower: 0.13,
      ciUpper: 0.31,
      pValue: "<0.0001",
      selected: true
    },
    {
      name: "Baseline <2 attacks/month",
      category: "severity",
      n: 122,
      nDrug: 60,
      nPlacebo: 62,
      rateDrug: 0.45,
      ratePlacebo: 1.73,
      rr: 0.26,
      ciLower: 0.15,
      ciUpper: 0.45,
      pValue: "<0.0001",
      selected: true
    },
    {
      name: "White",
      category: "race",
      n: 226,
      nDrug: 112,
      nPlacebo: 114,
      rateDrug: 0.51,
      ratePlacebo: 2.32,
      rr: 0.22,
      ciLower: 0.16,
      ciUpper: 0.31,
      pValue: "<0.0001",
      selected: false
    },
    {
      name: "Non-White",
      category: "race",
      n: 38,
      nDrug: 20,
      nPlacebo: 18,
      rateDrug: 0.58,
      ratePlacebo: 2.56,
      rr: 0.23,
      ciLower: 0.09,
      ciUpper: 0.58,
      pValue: "0.0019",
      selected: false
    },
    {
      name: "BMI <30 kg/m²",
      category: "bmi",
      n: 178,
      nDrug: 89,
      nPlacebo: 89,
      rateDrug: 0.49,
      ratePlacebo: 2.28,
      rr: 0.21,
      ciLower: 0.14,
      ciUpper: 0.32,
      pValue: "<0.0001",
      selected: false
    },
    {
      name: "BMI ≥30 kg/m²",
      category: "bmi",
      n: 86,
      nDrug: 43,
      nPlacebo: 43,
      rateDrug: 0.58,
      ratePlacebo: 2.49,
      rr: 0.23,
      ciLower: 0.13,
      ciUpper: 0.41,
      pValue: "<0.0001",
      selected: false
    }
  ],

  // Safety Data
  safety: {
    exposureDrug: { meanDays: 172.4, totalPatientYears: 62.3 },
    exposurePlacebo: { meanDays: 168.1, totalPatientYears: 60.8 },

    teaeSummary: [
      { event: "Any TEAE", drug: 68.2, placebo: 71.2 },
      { event: "Drug-related TEAE", drug: 24.2, placebo: 18.9 },
      { event: "Severe TEAE", drug: 6.1, placebo: 12.9 },
      { event: "Serious AE", drug: 4.5, placebo: 9.8 },
      { event: "TEAE leading to discontinuation", drug: 3.8, placebo: 8.3 },
      { event: "Death", drug: 0, placebo: 0 }
    ],

    commonTEAEs: [
      { event: "Headache", drug: 12.1, placebo: 14.4 },
      { event: "Nasopharyngitis", drug: 10.6, placebo: 11.4 },
      { event: "Nausea", drug: 8.3, placebo: 4.5 },
      { event: "Diarrhea", drug: 6.8, placebo: 3.8 },
      { event: "Fatigue", drug: 5.3, placebo: 6.1 },
      { event: "Upper respiratory tract infection", drug: 4.5, placebo: 5.3 },
      { event: "Dizziness", drug: 4.5, placebo: 3.0 },
      { event: "Abdominal pain", drug: 3.8, placebo: 2.3 },
      { event: "Back pain", drug: 3.0, placebo: 3.8 },
      { event: "Arthralgia", drug: 2.3, placebo: 3.0 }
    ],

    saes: [
      { event: "HAE attack requiring hospitalization", drug: 1.5, placebo: 6.1 },
      { event: "Laryngeal attack", drug: 0.8, placebo: 3.0 },
      { event: "Pneumonia", drug: 0.8, placebo: 0.8 },
      { event: "Appendicitis", drug: 0.8, placebo: 0 },
      { event: "Cholecystitis", drug: 0.8, placebo: 0 }
    ],

    labAbnormalities: [
      { parameter: "ALT >3x ULN", drug: 1.5, placebo: 0.8, note: "Transient, resolved without intervention" },
      { parameter: "AST >3x ULN", drug: 0.8, placebo: 0.8 },
      { parameter: "Lipase >3x ULN", drug: 2.3, placebo: 1.5 }
    ],

    discontinuations: {
      drug: 3.8,
      placebo: 8.3,
      reasons: {
        drug: [
          { reason: "Adverse event", n: 3 },
          { reason: "Lack of efficacy", n: 0 },
          { reason: "Withdrew consent", n: 2 }
        ],
        placebo: [
          { reason: "Adverse event", n: 4 },
          { reason: "Lack of efficacy", n: 5 },
          { reason: "Withdrew consent", n: 2 }
        ]
      }
    }
  },

  // Dosing & Administration
  dosing: {
    strength: "300 mg tablets",
    regimen: "One tablet once daily",
    administration: "Oral, with or without food",
    missedDose: "Take as soon as remembered unless within 12 hours of next dose",
    storage: "Store at room temperature (20°C to 25°C)"
  },

  // Key Messages (for deliverables)
  keyMessages: [
    {
      headline: "78% Attack Reduction",
      detail: "NOVA-101 achieved 78% reduction in monthly HAE attacks vs placebo (p<0.0001)",
      category: "efficacy"
    },
    {
      headline: "Consistent Across Subgroups",
      detail: "Efficacy maintained across all pre-specified subgroups including age, sex, and disease severity",
      category: "efficacy"
    },
    {
      headline: "Over Half Attack-Free",
      detail: "54.5% of patients on NOVA-101 were attack-free at 26 weeks vs 8.3% on placebo",
      category: "efficacy"
    },
    {
      headline: "Improved Quality of Life",
      detail: "Significant improvement in HAE-QoL total score (+18.4 vs +2.1, p<0.0001)",
      category: "efficacy"
    },
    {
      headline: "Well-Tolerated",
      detail: "Favorable safety profile with lower discontinuation rate vs placebo (3.8% vs 8.3%)",
      category: "safety"
    },
    {
      headline: "Convenient Oral Dosing",
      detail: "First-in-class oral therapy - one 300mg tablet once daily with or without food",
      category: "convenience"
    }
  ],

  // Publication/Regulatory
  regulatory: {
    fdaApproval: "Pending",
    emaApproval: "Pending",
    nctUrl: "https://clinicaltrials.gov/study/NCT05123456",
    primaryPublication: {
      authors: "Smith J, Johnson A, Williams B, et al.",
      title: "NOVA-101 for Prophylaxis of Hereditary Angioedema: Results from the Phase 3 SHIELD-1 Trial",
      journal: "N Engl J Med",
      year: 2024,
      status: "In Press"
    }
  },

  // Competitive Landscape (empty for first-in-class)
  competitors: [],
  isFirstInClass: true,
  marketPosition: "First oral small molecule kallikrein inhibitor for HAE prophylaxis"
};

// Slide content templates for Training Deck
export const trainingDeckContent = {
  title: {
    headline: "NOVA-101 (Novaris)",
    subtitle: "First-in-Class Oral Prophylaxis for Hereditary Angioedema",
    trialName: "SHIELD-1 Phase 3 Results"
  },

  agenda: [
    "Disease Overview: Understanding HAE",
    "Unmet Medical Need",
    "NOVA-101 Mechanism of Action",
    "SHIELD-1 Trial Design",
    "Efficacy Results",
    "Safety Profile",
    "Dosing & Administration",
    "Clinical Implications"
  ],

  diseaseOverview: {
    title: "Hereditary Angioedema (HAE)",
    points: [
      "Rare genetic disorder affecting ~1:50,000 individuals",
      "Caused by C1-inhibitor deficiency (Type I) or dysfunction (Type II)",
      "Results in unpredictable episodes of severe swelling",
      "Attacks can affect extremities, face, GI tract, and airways",
      "Laryngeal attacks are potentially life-threatening"
    ],
    statistic: "~25% of HAE patients have experienced a laryngeal attack"
  },

  unmetNeed: {
    title: "Current Treatment Landscape",
    challenges: [
      "Injectable therapies require self-administration",
      "Some require IV infusion at healthcare facility",
      "Subcutaneous injections cause injection site reactions",
      "Complex dosing schedules affect adherence",
      "Limited oral options currently available"
    ],
    opportunity: "Need for effective, convenient oral prophylactic therapy"
  }
};

// Slide content templates for Podium Deck (more detailed)
export const podiumDeckContent = {
  title: {
    headline: "SHIELD-1: A Phase 3 Study of NOVA-101",
    subtitle: "Oral Kallikrein Inhibitor for Prophylaxis of HAE Attacks",
    presenter: "[Presenter Name]",
    affiliation: "[Institution]",
    meeting: "[Conference Name]"
  },

  trialDesignDetails: {
    primaryObjective: "To evaluate the efficacy and safety of NOVA-101 300mg once daily compared to placebo for prophylaxis of HAE attacks",
    secondaryObjectives: [
      "Proportion of patients achieving attack-free status",
      "Time to first HAE attack",
      "Use of rescue medication",
      "Health-related quality of life (HAE-QoL)"
    ],
    statisticalAnalysis: {
      primaryAnalysis: "Negative binomial regression model adjusted for stratification factors",
      sampleSize: "Powered to detect 50% reduction in attack rate with 90% power at α=0.05",
      multiplicity: "Hierarchical testing procedure for secondary endpoints"
    }
  }
};

// Marketing Flyer Content
export const flyerContent = {
  headline: "Introducing NOVA-101",
  tagline: "The First Oral Prophylaxis for HAE",
  heroStat: {
    number: "78%",
    description: "reduction in monthly HAE attacks"
  },
  bulletPoints: [
    "Consistent efficacy across all subgroups",
    "Over half of patients attack-free at 26 weeks",
    "Well-tolerated with favorable safety profile",
    "Convenient once-daily oral tablet"
  ],
  callToAction: "Learn more at novaris-therapeutics.com/nova101",
  legalDisclaimer: "NOVA-101 is an investigational compound. Efficacy and safety have not been established. This information is intended for healthcare professionals only."
};
