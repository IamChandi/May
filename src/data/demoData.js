export const demoQuery = "Comparative efficacy of GLP-1 receptor agonists in elderly patients with Type 2 diabetes";

export const demoFindings = [
  {
    id: 1,
    title: "Semaglutide demonstrates superior HbA1c reduction vs comparators",
    summary: "In a meta-analysis of 8 RCTs (N=9,340), semaglutide 1.0mg weekly showed mean HbA1c reduction of 1.5% vs 1.1% for liraglutide and 0.9% for dulaglutide at 52 weeks.",
    source: {
      authors: "Lingvay I, Desouza CV, Engel SS, et al.",
      journal: "Lancet Diabetes Endocrinol",
      year: 2024,
      pmid: "38234567",
      doi: "10.1016/S2213-8587(24)00123-4"
    },
    evidenceLevel: "Meta-Analysis",
    sampleSize: 9340,
    confidence: "HIGH",
    isVerified: true
  },
  {
    id: 2,
    title: "Tirzepatide shows promising cardiovascular outcomes in elderly subgroup",
    summary: "Subgroup analysis of SURPASS-4 (N=892 patients ≥65 years) demonstrated 23% reduction in MACE vs insulin glargine, with maintained efficacy across age groups.",
    source: {
      authors: "Del Prato S, Kahn SE, Pavo I, et al.",
      journal: "N Engl J Med",
      year: 2023,
      pmid: "37845623",
      doi: "10.1056/NEJMoa2312456"
    },
    evidenceLevel: "RCT",
    sampleSize: 892,
    confidence: "HIGH",
    isVerified: true
  },
  {
    id: 3,
    title: "GI tolerability improves with gradual dose titration in older adults",
    summary: "Extended 8-week titration schedules reduced GI adverse events by 35% compared to standard 4-week titration in patients >65 years, without compromising efficacy.",
    source: {
      authors: "Pratley RE, Aroda VR, Lingvay I, et al.",
      journal: "Diabetes Obes Metab",
      year: 2024,
      pmid: "38456789",
      doi: "10.1111/dom.15234"
    },
    evidenceLevel: "RCT",
    sampleSize: 456,
    confidence: "MEDIUM",
    isVerified: true
  },
  {
    id: 4,
    title: "Renal outcomes favor GLP-1 RAs over DPP-4 inhibitors in elderly diabetics",
    summary: "Pooled analysis showed 18% slower eGFR decline with GLP-1 RAs vs DPP-4i over 3 years in patients ≥65 years with baseline CKD stage 2-3.",
    source: {
      authors: "Mann JFE, Ørsted DD, Brown-Frandsen K, et al.",
      journal: "Kidney Int",
      year: 2023,
      pmid: "37123456",
      doi: "10.1016/j.kint.2023.02.015"
    },
    evidenceLevel: "Meta-Analysis",
    sampleSize: 4521,
    confidence: "HIGH",
    isVerified: true
  },
  {
    id: 5,
    title: "Weight loss benefits maintained in elderly patients with reduced sarcopenia risk",
    summary: "Analysis of body composition data showed GLP-1 RA-induced weight loss preserved lean mass better than dietary intervention alone in patients ≥65 years (82% vs 71% lean mass retention).",
    source: {
      authors: "Wilding JPH, Batterham RL, Calanna S, et al.",
      journal: "Obesity",
      year: 2024,
      pmid: "38567890",
      doi: "10.1002/oby.23945"
    },
    evidenceLevel: "RCT",
    sampleSize: 1247,
    confidence: "MEDIUM",
    isVerified: true
  },
  {
    id: 6,
    title: "Cognitive function unaffected by GLP-1 RA treatment in elderly T2D patients",
    summary: "24-month follow-up of cognitive assessments (MMSE, MoCA) showed no deterioration and potential modest improvements in executive function with semaglutide treatment.",
    source: {
      authors: "Cukierman-Yaffe T, Gerstein HC, Colhoun HM, et al.",
      journal: "Lancet Neurol",
      year: 2024,
      pmid: "38678901",
      doi: "10.1016/S1474-4422(24)00089-7"
    },
    evidenceLevel: "RCT",
    sampleSize: 1840,
    confidence: "HIGH",
    isVerified: true
  }
];

export const demoTrials = [
  {
    nctId: "NCT05260021",
    title: "SURPASS-6: Tirzepatide vs Insulin Degludec in T2D",
    status: "Completed",
    phase: "Phase 3",
    enrollment: 1428,
    startDate: "2022-03",
    completionDate: "2024-06",
    sponsor: "Eli Lilly"
  },
  {
    nctId: "NCT04774276",
    title: "SUSTAIN FORTE: High-dose Semaglutide in T2D",
    status: "Completed",
    phase: "Phase 3",
    enrollment: 961,
    startDate: "2021-04",
    completionDate: "2023-09",
    sponsor: "Novo Nordisk"
  },
  {
    nctId: "NCT05394519",
    title: "REDEFINE 1: Orforglipron vs Semaglutide",
    status: "Active, not recruiting",
    phase: "Phase 3",
    enrollment: 1800,
    startDate: "2023-01",
    completionDate: "2025-12",
    sponsor: "Eli Lilly"
  },
  {
    nctId: "NCT04842396",
    title: "PIONEER PLUS: Oral Semaglutide High Dose",
    status: "Completed",
    phase: "Phase 3",
    enrollment: 1606,
    startDate: "2021-06",
    completionDate: "2023-12",
    sponsor: "Novo Nordisk"
  },
  {
    nctId: "NCT05259449",
    title: "STEP HFpEF: Semaglutide in Heart Failure",
    status: "Completed",
    phase: "Phase 3",
    enrollment: 529,
    startDate: "2022-02",
    completionDate: "2024-03",
    sponsor: "Novo Nordisk"
  }
];

export const demoChartData = {
  efficacy: [
    { drug: "Semaglutide 2.4mg", hba1cReduction: 2.1, weightLoss: 15.3, source: "STEP trials", color: "#3B82F6" },
    { drug: "Tirzepatide 15mg", hba1cReduction: 2.4, weightLoss: 20.9, source: "SURPASS trials", color: "#06B6D4" },
    { drug: "Liraglutide 1.8mg", hba1cReduction: 1.2, weightLoss: 5.4, source: "LEADER trial", color: "#60A5FA" },
    { drug: "Dulaglutide 4.5mg", hba1cReduction: 1.6, weightLoss: 5.1, source: "AWARD trials", color: "#0F172A" }
  ],
  safety: [
    { drug: "Semaglutide", nausea: 20, vomiting: 9, diarrhea: 8, hypoglycemia: 2 },
    { drug: "Tirzepatide", nausea: 24, vomiting: 12, diarrhea: 13, hypoglycemia: 1 },
    { drug: "Liraglutide", nausea: 15, vomiting: 6, diarrhea: 9, hypoglycemia: 3 },
    { drug: "Dulaglutide", nausea: 12, vomiting: 5, diarrhea: 8, hypoglycemia: 2 }
  ],
  trialTimeline: [
    { name: "SURPASS-6", startYear: 2022, endYear: 2024, phase: 3, enrollment: 1428, sponsor: "Eli Lilly" },
    { name: "SUSTAIN FORTE", startYear: 2021, endYear: 2023, phase: 3, enrollment: 961, sponsor: "Novo Nordisk" },
    { name: "REDEFINE 1", startYear: 2023, endYear: 2025, phase: 3, enrollment: 1800, sponsor: "Eli Lilly" },
    { name: "PIONEER PLUS", startYear: 2021, endYear: 2023, phase: 3, enrollment: 1606, sponsor: "Novo Nordisk" },
    { name: "STEP HFpEF", startYear: 2022, endYear: 2024, phase: 3, enrollment: 529, sponsor: "Novo Nordisk" }
  ],
  demographics: [
    { name: "65-74 years", value: 45, color: "#3B82F6" },
    { name: "75-84 years", value: 35, color: "#06B6D4" },
    { name: "≥85 years", value: 12, color: "#60A5FA" },
    { name: "<65 years", value: 8, color: "#0F172A" }
  ]
};

export const demoManuscript = {
  title: "Comparative Efficacy and Safety of GLP-1 Receptor Agonists in Elderly Patients with Type 2 Diabetes: A Systematic Review",
  authors: "[Author names to be added]",
  abstract: `Background: GLP-1 receptor agonists (GLP-1 RAs) represent a cornerstone of Type 2 diabetes management, yet evidence specifically addressing their use in elderly populations (≥65 years) remains fragmented. We conducted a systematic review to compare the efficacy and safety of available GLP-1 RAs in this vulnerable population.

Methods: We searched PubMed, EMBASE, and Cochrane databases for randomized controlled trials and observational studies published through December 2024. Studies were included if they reported outcomes specific to patients aged ≥65 years.

Results: Twelve studies met inclusion criteria (N=14,567 patients). Semaglutide and tirzepatide demonstrated superior HbA1c reduction compared to first-generation GLP-1 RAs. Cardiovascular outcomes favored newer agents, with tirzepatide showing a 23% MACE reduction in elderly subgroups. Gastrointestinal tolerability improved with extended titration protocols.

Conclusion: Newer GLP-1 RAs offer enhanced glycemic control and cardiovascular protection in elderly patients with T2D. Extended titration schedules should be considered to optimize tolerability.`,
  sections: {
    introduction: `Type 2 diabetes mellitus affects approximately 25% of adults aged 65 years and older, representing a significant clinical and public health challenge. The management of diabetes in elderly patients requires careful consideration of multiple factors, including cognitive function, polypharmacy, and increased vulnerability to hypoglycemia.

GLP-1 receptor agonists have emerged as a preferred therapeutic class for Type 2 diabetes due to their favorable efficacy profile, cardiovascular benefits, and low risk of hypoglycemia. However, the bulk of clinical trial evidence derives from populations with mean ages below 65 years, leaving uncertainty about the optimal use of these agents in elderly patients.

This systematic review aims to synthesize the available evidence on the comparative efficacy and safety of GLP-1 RAs specifically in elderly populations with Type 2 diabetes.`,
    methods: `This systematic review was conducted following PRISMA guidelines. Electronic databases (PubMed, EMBASE, Cochrane Central) were searched using predefined terms including "GLP-1 receptor agonist," "elderly," "aged," "older adult," and "Type 2 diabetes."

Inclusion criteria:
• Randomized controlled trials or observational studies
• Patients aged ≥65 years with Type 2 diabetes
• Reporting of glycemic and/or safety outcomes
• Published between January 2015 and December 2024

Two independent reviewers screened titles, abstracts, and full texts. Quality assessment was performed using the Cochrane Risk of Bias tool for RCTs and the Newcastle-Ottawa Scale for observational studies.`,
    results: `Our search identified 847 potentially relevant articles. After screening, 12 studies met inclusion criteria, comprising 8 randomized controlled trials and 4 observational studies with a combined enrollment of 14,567 patients.

Glycemic Efficacy:
Semaglutide 1.0mg weekly demonstrated mean HbA1c reductions of 1.5% (95% CI: 1.3-1.7%) at 52 weeks. Tirzepatide 15mg showed the largest reductions at 2.4% (95% CI: 2.1-2.7%). Both significantly outperformed first-generation agents.

Cardiovascular Outcomes:
Subgroup analyses of cardiovascular outcome trials showed tirzepatide associated with 23% MACE reduction (HR 0.77, 95% CI: 0.62-0.96) in patients ≥65 years. Semaglutide demonstrated similar cardiovascular benefits.

Safety Profile:
Gastrointestinal adverse events were the most common side effects. Extended titration protocols (8 weeks vs 4 weeks) reduced nausea incidence by 35% without compromising efficacy.`,
    discussion: `Our findings demonstrate that GLP-1 RAs, particularly semaglutide and tirzepatide, offer superior glycemic control in elderly patients compared to first-generation agents. The cardiovascular benefits observed in overall trial populations appear to be maintained in elderly subgroups.

The improved gastrointestinal tolerability with extended titration schedules has important clinical implications. Given that elderly patients may be more susceptible to adverse effects and treatment discontinuation, starting with lower doses and slower titration may improve treatment adherence.

Limitations of this review include the post-hoc nature of most elderly subgroup analyses and the relatively short follow-up periods in some studies. Future research should prioritize trials designed specifically for elderly populations.

In conclusion, newer GLP-1 RAs represent effective and well-tolerated options for elderly patients with Type 2 diabetes, with potential cardiovascular benefits extending to this population.`
  },
  references: [
    {
      id: 1,
      text: "Lingvay I, Desouza CV, Engel SS, et al. Semaglutide vs comparators in older adults with Type 2 diabetes: a systematic review and meta-analysis. Lancet Diabetes Endocrinol. 2024;12(3):189-201."
    },
    {
      id: 2,
      text: "Del Prato S, Kahn SE, Pavo I, et al. Tirzepatide cardiovascular outcomes in elderly patients: SURPASS-4 subgroup analysis. N Engl J Med. 2023;389(12):1092-1105."
    },
    {
      id: 3,
      text: "Pratley RE, Aroda VR, Lingvay I, et al. Extended titration improves tolerability of GLP-1 RAs in older adults. Diabetes Obes Metab. 2024;26(2):456-467."
    },
    {
      id: 4,
      text: "Mann JFE, Ørsted DD, Brown-Frandsen K, et al. GLP-1 RAs and renal outcomes in elderly patients with CKD. Kidney Int. 2023;104(4):789-801."
    },
    {
      id: 5,
      text: "Wilding JPH, Batterham RL, Calanna S, et al. Body composition changes with GLP-1 RAs in elderly T2D patients. Obesity. 2024;32(1):112-124."
    },
    {
      id: 6,
      text: "Cukierman-Yaffe T, Gerstein HC, Colhoun HM, et al. Cognitive outcomes with semaglutide in elderly diabetes patients. Lancet Neurol. 2024;23(5):445-456."
    }
  ]
};

export const exampleQueries = [
  "GLP-1 receptor agonists efficacy in elderly Type 2 diabetes patients",
  "Cardiovascular outcomes semaglutide vs tirzepatide",
  "SGLT2 inhibitors heart failure outcomes",
  "JAK inhibitors rheumatoid arthritis safety profile",
  "CAR-T cell therapy relapsed lymphoma efficacy"
];

export const journalFormats = [
  { id: "diabetes-care", name: "Diabetes Care", style: "ADA" },
  { id: "nejm", name: "New England Journal of Medicine", style: "NEJM" },
  { id: "lancet", name: "The Lancet", style: "Vancouver" },
  { id: "jama", name: "JAMA", style: "AMA" }
];
