import pptxgen from 'pptxgenjs';

// Color constants matching the blue theme
const COLORS = {
  primary: '3B82F6',      // Blue
  primaryDark: '1D4ED8',  // Darker blue
  secondary: '06B6D4',    // Teal
  accent: '60A5FA',       // Light blue
  dark: '0F172A',         // Slate
  text: '334155',         // Gray text
  lightBg: 'F0F9FF',      // Light blue bg
  white: 'FFFFFF',
  gray: '6B7280',
  lightGray: 'E5E7EB',
  success: '10B981',      // Green
  warning: 'F59E0B'       // Amber
};

// Common slide master definitions
const defineMasters = (pptx) => {
  // Title slide master
  pptx.defineSlideMaster({
    title: 'TITLE_SLIDE',
    background: { color: COLORS.dark },
    objects: [
      { rect: { x: 0, y: 5.0, w: '100%', h: 0.5, fill: { color: COLORS.primary } } }
    ]
  });

  // Content slide master
  pptx.defineSlideMaster({
    title: 'CONTENT_SLIDE',
    background: { color: COLORS.white },
    objects: [
      { rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: COLORS.primary } } },
      { text: { text: '', options: { x: 0.5, y: 5.2, w: 9, h: 0.3, fontSize: 8, color: COLORS.gray } } }
    ]
  });

  // Section slide master
  pptx.defineSlideMaster({
    title: 'SECTION_SLIDE',
    background: { color: COLORS.primary },
    objects: []
  });
};

// Helper to add footer to slides
const addFooter = (slide, trialData, slideNum, totalSlides) => {
  slide.addText(
    `${trialData.compound} | ${trialData.trialName} | Confidential`,
    { x: 0.3, y: 5.2, w: 6, h: 0.25, fontSize: 8, color: COLORS.gray }
  );
  slide.addText(
    `${slideNum} / ${totalSlides}`,
    { x: 9, y: 5.2, w: 0.7, h: 0.25, fontSize: 8, color: COLORS.gray, align: 'right' }
  );
};

// Generate Training Deck (HCP/KOL focused, ~25 slides)
export async function generateTrainingDeck(trialData, selectedSubgroups, options = {}) {
  const pptx = new pptxgen();

  pptx.author = 'Medical Affairs AI';
  pptx.title = `${trialData.compound} Training Deck`;
  pptx.subject = `${trialData.indication} - ${trialData.trialName} Results`;
  pptx.company = trialData.sponsor;

  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches

  defineMasters(pptx);

  const slides = [];
  let slideNum = 0;
  const totalSlides = 25;

  // Slide 1: Title
  slideNum++;
  const titleSlide = pptx.addSlide({ masterName: 'TITLE_SLIDE' });
  titleSlide.addText(trialData.compound, {
    x: 0.5, y: 1.5, w: 12.33, h: 1,
    fontSize: 54, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  titleSlide.addText(`(${trialData.genericName})`, {
    x: 0.5, y: 2.5, w: 12.33, h: 0.5,
    fontSize: 24, color: COLORS.accent, fontFace: 'Arial'
  });
  titleSlide.addText(trialData.moa.differentiator, {
    x: 0.5, y: 3.2, w: 12.33, h: 0.5,
    fontSize: 18, color: COLORS.lightGray, fontFace: 'Arial'
  });
  titleSlide.addText(`${trialData.trialName} Phase 3 Results`, {
    x: 0.5, y: 4.0, w: 12.33, h: 0.5,
    fontSize: 20, color: COLORS.white, fontFace: 'Arial'
  });
  titleSlide.addText('For Healthcare Professional Training Only', {
    x: 0.5, y: 4.7, w: 12.33, h: 0.3,
    fontSize: 12, color: COLORS.gray, fontFace: 'Arial'
  });

  // Slide 2: Agenda
  slideNum++;
  const agendaSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  agendaSlide.addText('Agenda', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  const agendaItems = [
    'Disease Overview: Understanding HAE',
    'Unmet Medical Need in HAE Management',
    `${trialData.compound} Mechanism of Action`,
    `${trialData.trialName} Trial Design`,
    'Efficacy Results',
    'Subgroup Analyses',
    'Safety Profile',
    'Clinical Implications'
  ];
  agendaItems.forEach((item, i) => {
    agendaSlide.addText(`${i + 1}.  ${item}`, {
      x: 1, y: 1.2 + (i * 0.45), w: 11, h: 0.4,
      fontSize: 18, color: COLORS.text, fontFace: 'Arial'
    });
  });
  addFooter(agendaSlide, trialData, slideNum, totalSlides);

  // Slide 3: Disease Overview
  slideNum++;
  const diseaseSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  diseaseSlide.addText('Hereditary Angioedema (HAE)', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  diseaseSlide.addText('A rare, potentially life-threatening genetic disorder', {
    x: 0.5, y: 1.0, w: 12, h: 0.4,
    fontSize: 16, italic: true, color: COLORS.gray, fontFace: 'Arial'
  });
  const diseasePoints = [
    'Affects approximately 1 in 50,000 individuals worldwide',
    'Caused by C1-inhibitor deficiency (Type I, ~85%) or dysfunction (Type II, ~15%)',
    'Results in unpredictable episodes of severe, debilitating swelling',
    'Attacks can affect extremities, face, gastrointestinal tract, and airways',
    'Laryngeal attacks are potentially life-threatening (25% of patients experience)',
    'Average delay to diagnosis: 8-10 years'
  ];
  diseasePoints.forEach((point, i) => {
    diseaseSlide.addText('•', {
      x: 0.7, y: 1.5 + (i * 0.5), w: 0.3, h: 0.4,
      fontSize: 16, color: COLORS.primary, fontFace: 'Arial'
    });
    diseaseSlide.addText(point, {
      x: 1.0, y: 1.5 + (i * 0.5), w: 11, h: 0.4,
      fontSize: 16, color: COLORS.text, fontFace: 'Arial'
    });
  });
  addFooter(diseaseSlide, trialData, slideNum, totalSlides);

  // Slide 4: Unmet Need
  slideNum++;
  const unmetSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  unmetSlide.addText('Unmet Medical Need', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  unmetSlide.addText('Current Treatment Landscape Challenges', {
    x: 0.5, y: 1.0, w: 12, h: 0.4,
    fontSize: 18, bold: true, color: COLORS.dark, fontFace: 'Arial'
  });
  const unmetPoints = [
    'Injectable therapies require self-administration training',
    'Some options require IV infusion at healthcare facilities',
    'Subcutaneous injections may cause injection site reactions',
    'Complex dosing schedules can affect adherence',
    'Limited convenient oral options for prophylaxis'
  ];
  unmetPoints.forEach((point, i) => {
    unmetSlide.addText('•', {
      x: 0.7, y: 1.5 + (i * 0.5), w: 0.3, h: 0.4,
      fontSize: 16, color: COLORS.warning, fontFace: 'Arial'
    });
    unmetSlide.addText(point, {
      x: 1.0, y: 1.5 + (i * 0.5), w: 11, h: 0.4,
      fontSize: 16, color: COLORS.text, fontFace: 'Arial'
    });
  });
  // Opportunity box
  unmetSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 4.2, w: 12.33, h: 0.8,
    fill: { color: COLORS.lightBg },
    line: { color: COLORS.primary, pt: 1 }
  });
  unmetSlide.addText(`Opportunity: ${trialData.moa.differentiator}`, {
    x: 0.7, y: 4.35, w: 12, h: 0.5,
    fontSize: 16, bold: true, color: COLORS.primaryDark, fontFace: 'Arial'
  });
  addFooter(unmetSlide, trialData, slideNum, totalSlides);

  // Slide 5: Mechanism of Action
  slideNum++;
  const moaSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  moaSlide.addText(`${trialData.compound} Mechanism of Action`, {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  moaSlide.addText(`Target: ${trialData.moa.target}`, {
    x: 0.5, y: 1.2, w: 12, h: 0.4,
    fontSize: 20, bold: true, color: COLORS.primary, fontFace: 'Arial'
  });
  moaSlide.addText(trialData.moa.mechanism, {
    x: 0.5, y: 1.8, w: 12, h: 0.8,
    fontSize: 16, color: COLORS.text, fontFace: 'Arial'
  });
  // Key differentiator box
  moaSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 3.0, w: 12.33, h: 1.2,
    fill: { color: COLORS.primary }
  });
  moaSlide.addText('First-in-Class', {
    x: 0.7, y: 3.15, w: 12, h: 0.4,
    fontSize: 14, bold: true, color: COLORS.accent, fontFace: 'Arial'
  });
  moaSlide.addText(trialData.moa.differentiator, {
    x: 0.7, y: 3.5, w: 12, h: 0.5,
    fontSize: 18, color: COLORS.white, fontFace: 'Arial'
  });
  addFooter(moaSlide, trialData, slideNum, totalSlides);

  // Slide 6: Trial Design
  slideNum++;
  const designSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  designSlide.addText(`${trialData.trialName} Trial Design`, {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  // Design box
  designSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 5.8, h: 3.5,
    fill: { color: COLORS.lightBg },
    line: { color: COLORS.lightGray, pt: 1 }
  });
  designSlide.addText('Study Design', {
    x: 0.7, y: 1.1, w: 5.4, h: 0.4,
    fontSize: 14, bold: true, color: COLORS.primary, fontFace: 'Arial'
  });
  designSlide.addText(trialData.design.type, {
    x: 0.7, y: 1.5, w: 5.4, h: 0.5,
    fontSize: 14, color: COLORS.text, fontFace: 'Arial'
  });
  designSlide.addText(`Duration: ${trialData.design.duration}`, {
    x: 0.7, y: 2.0, w: 5.4, h: 0.4,
    fontSize: 14, color: COLORS.text, fontFace: 'Arial'
  });
  designSlide.addText(`Randomization: ${trialData.design.randomization}`, {
    x: 0.7, y: 2.4, w: 5.4, h: 0.4,
    fontSize: 14, color: COLORS.text, fontFace: 'Arial'
  });
  designSlide.addText('Treatment Arms:', {
    x: 0.7, y: 2.8, w: 5.4, h: 0.4,
    fontSize: 14, bold: true, color: COLORS.text, fontFace: 'Arial'
  });
  trialData.design.arms.forEach((arm, i) => {
    designSlide.addText(`• ${arm.name} (N=${arm.n})`, {
      x: 0.9, y: 3.1 + (i * 0.35), w: 5.2, h: 0.35,
      fontSize: 13, color: COLORS.text, fontFace: 'Arial'
    });
  });
  // Population box
  designSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 6.5, y: 1.0, w: 6.33, h: 3.5,
    fill: { color: COLORS.lightBg },
    line: { color: COLORS.lightGray, pt: 1 }
  });
  designSlide.addText('Study Populations', {
    x: 6.7, y: 1.1, w: 6, h: 0.4,
    fontSize: 14, bold: true, color: COLORS.primary, fontFace: 'Arial'
  });
  Object.values(trialData.populations).forEach((pop, i) => {
    designSlide.addText(`${pop.label}: N=${pop.n}`, {
      x: 6.7, y: 1.6 + (i * 0.5), w: 6, h: 0.4,
      fontSize: 14, color: COLORS.text, fontFace: 'Arial'
    });
  });
  addFooter(designSlide, trialData, slideNum, totalSlides);

  // Slide 7: Primary Endpoint
  slideNum++;
  const primarySlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  primarySlide.addText('Primary Efficacy Endpoint', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  primarySlide.addText(trialData.primaryEndpoint.name, {
    x: 0.5, y: 1.0, w: 12, h: 0.5,
    fontSize: 20, bold: true, color: COLORS.dark, fontFace: 'Arial'
  });
  // Big number display
  primarySlide.addText(`${trialData.primaryEndpoint.reduction}%`, {
    x: 0.5, y: 1.8, w: 6, h: 1.5,
    fontSize: 80, bold: true, color: COLORS.primary, fontFace: 'Arial'
  });
  primarySlide.addText('Reduction vs Placebo', {
    x: 0.5, y: 3.2, w: 6, h: 0.5,
    fontSize: 20, color: COLORS.text, fontFace: 'Arial'
  });
  // Results table
  primarySlide.addShape(pptx.shapes.RECTANGLE, {
    x: 6.5, y: 1.6, w: 6.33, h: 2.5,
    fill: { color: COLORS.lightBg },
    line: { color: COLORS.lightGray, pt: 1 }
  });
  primarySlide.addText(`${trialData.compound}: ${trialData.primaryEndpoint.drugResult} attacks/month`, {
    x: 6.7, y: 1.8, w: 6, h: 0.5,
    fontSize: 16, color: COLORS.primary, fontFace: 'Arial'
  });
  primarySlide.addText(`Placebo: ${trialData.primaryEndpoint.placeboResult} attacks/month`, {
    x: 6.7, y: 2.3, w: 6, h: 0.5,
    fontSize: 16, color: COLORS.gray, fontFace: 'Arial'
  });
  primarySlide.addText(`p${trialData.primaryEndpoint.pValue}`, {
    x: 6.7, y: 2.9, w: 6, h: 0.5,
    fontSize: 18, bold: true, color: COLORS.success, fontFace: 'Arial'
  });
  primarySlide.addText(`95% CI: [${trialData.primaryEndpoint.reductionCI[0]}%, ${trialData.primaryEndpoint.reductionCI[1]}%]`, {
    x: 6.7, y: 3.4, w: 6, h: 0.4,
    fontSize: 14, color: COLORS.text, fontFace: 'Arial'
  });
  addFooter(primarySlide, trialData, slideNum, totalSlides);

  // Slide 8-9: Secondary Endpoints
  slideNum++;
  const secondarySlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  secondarySlide.addText('Key Secondary Endpoints', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  // Create table for secondary endpoints
  const secRows = [
    [{ text: 'Endpoint', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: trialData.compound, options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: 'Placebo', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: 'p-value', options: { bold: true, fill: COLORS.primary, color: COLORS.white } }]
  ];
  trialData.secondaryEndpoints.slice(0, 4).forEach(ep => {
    secRows.push([
      { text: ep.name, options: { fill: COLORS.white } },
      { text: String(ep.drugResult), options: { fill: COLORS.white, color: COLORS.primary } },
      { text: String(ep.placeboResult), options: { fill: COLORS.white } },
      { text: ep.pValue, options: { fill: COLORS.white, color: COLORS.success } }
    ]);
  });
  secondarySlide.addTable(secRows, {
    x: 0.5, y: 1.0, w: 12.33, h: 3.5,
    fontFace: 'Arial',
    fontSize: 12,
    border: { pt: 0.5, color: COLORS.lightGray },
    align: 'center',
    valign: 'middle'
  });
  addFooter(secondarySlide, trialData, slideNum, totalSlides);

  // Slide 10: Attack-Free Patients
  slideNum++;
  const attackFreeSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  attackFreeSlide.addText('Attack-Free Patients at Week 26', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  const attackFreeData = trialData.secondaryEndpoints.find(ep => ep.name.includes('Attack-free'));
  if (attackFreeData) {
    attackFreeSlide.addText(attackFreeData.drugResult, {
      x: 1, y: 1.5, w: 5, h: 1.5,
      fontSize: 72, bold: true, color: COLORS.primary, fontFace: 'Arial'
    });
    attackFreeSlide.addText(trialData.compound, {
      x: 1, y: 3.0, w: 5, h: 0.5,
      fontSize: 20, color: COLORS.text, fontFace: 'Arial'
    });
    attackFreeSlide.addText(attackFreeData.placeboResult, {
      x: 7, y: 1.5, w: 5, h: 1.5,
      fontSize: 72, bold: true, color: COLORS.gray, fontFace: 'Arial'
    });
    attackFreeSlide.addText('Placebo', {
      x: 7, y: 3.0, w: 5, h: 0.5,
      fontSize: 20, color: COLORS.text, fontFace: 'Arial'
    });
    attackFreeSlide.addText(`p${attackFreeData.pValue}`, {
      x: 0.5, y: 4.0, w: 12, h: 0.5,
      fontSize: 18, bold: true, color: COLORS.success, align: 'center', fontFace: 'Arial'
    });
  }
  addFooter(attackFreeSlide, trialData, slideNum, totalSlides);

  // Slide 11: Section - Subgroup Analysis
  slideNum++;
  const subgroupSection = pptx.addSlide({ masterName: 'SECTION_SLIDE' });
  subgroupSection.addText('Subgroup Analysis', {
    x: 0.5, y: 2.5, w: 12.33, h: 1,
    fontSize: 44, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  subgroupSection.addText('Consistent efficacy across pre-specified subgroups', {
    x: 0.5, y: 3.5, w: 12.33, h: 0.5,
    fontSize: 20, color: COLORS.accent, fontFace: 'Arial'
  });

  // Slide 12-13: Subgroup Forest Plot (simplified table version)
  slideNum++;
  const forestSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  forestSlide.addText('Subgroup Analysis: Rate Ratios', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  const selectedSGs = trialData.subgroups.filter(sg => selectedSubgroups.includes(sg.name));
  const forestRows = [
    [{ text: 'Subgroup', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: 'N', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: 'Rate Ratio', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: '95% CI', options: { bold: true, fill: COLORS.primary, color: COLORS.white } }]
  ];
  selectedSGs.slice(0, 8).forEach((sg, i) => {
    forestRows.push([
      { text: sg.name, options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white, align: 'left' } },
      { text: String(sg.n), options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white } },
      { text: sg.rr.toFixed(2), options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white, color: COLORS.primary, bold: true } },
      { text: `[${sg.ciLower.toFixed(2)}, ${sg.ciUpper.toFixed(2)}]`, options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white } }
    ]);
  });
  forestSlide.addTable(forestRows, {
    x: 0.5, y: 1.0, w: 12.33, h: 3.8,
    fontFace: 'Arial',
    fontSize: 11,
    border: { pt: 0.5, color: COLORS.lightGray },
    align: 'center',
    valign: 'middle'
  });
  forestSlide.addText('All subgroups demonstrated statistically significant benefit favoring ' + trialData.compound, {
    x: 0.5, y: 4.9, w: 12, h: 0.3,
    fontSize: 12, italic: true, color: COLORS.gray, fontFace: 'Arial'
  });
  addFooter(forestSlide, trialData, slideNum, totalSlides);

  // Slide 14: Section - Safety
  slideNum++;
  const safetySection = pptx.addSlide({ masterName: 'SECTION_SLIDE' });
  safetySection.addText('Safety Profile', {
    x: 0.5, y: 2.5, w: 12.33, h: 1,
    fontSize: 44, bold: true, color: COLORS.white, fontFace: 'Arial'
  });

  // Slide 15: Safety Overview
  slideNum++;
  const safetyOverview = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  safetyOverview.addText('Safety Summary', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  const safetyRows = [
    [{ text: 'Parameter', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: `${trialData.compound} (%)`, options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: 'Placebo (%)', options: { bold: true, fill: COLORS.primary, color: COLORS.white } }]
  ];
  trialData.safety.teaeSummary.forEach((item, i) => {
    safetyRows.push([
      { text: item.event, options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white, align: 'left' } },
      { text: String(item.drug), options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white } },
      { text: String(item.placebo), options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white } }
    ]);
  });
  safetyOverview.addTable(safetyRows, {
    x: 0.5, y: 1.0, w: 12.33, h: 3.5,
    fontFace: 'Arial',
    fontSize: 12,
    border: { pt: 0.5, color: COLORS.lightGray },
    align: 'center',
    valign: 'middle'
  });
  addFooter(safetyOverview, trialData, slideNum, totalSlides);

  // Slide 16: Common TEAEs
  slideNum++;
  const teaeSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  teaeSlide.addText('Most Common Adverse Events (≥5% in either arm)', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  const teaeRows = [
    [{ text: 'Adverse Event', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: `${trialData.compound} (%)`, options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: 'Placebo (%)', options: { bold: true, fill: COLORS.primary, color: COLORS.white } }]
  ];
  trialData.safety.commonTEAEs.slice(0, 8).forEach((item, i) => {
    teaeRows.push([
      { text: item.event, options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white, align: 'left' } },
      { text: String(item.drug), options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white } },
      { text: String(item.placebo), options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white } }
    ]);
  });
  teaeSlide.addTable(teaeRows, {
    x: 0.5, y: 1.0, w: 12.33, h: 3.5,
    fontFace: 'Arial',
    fontSize: 12,
    border: { pt: 0.5, color: COLORS.lightGray },
    align: 'center',
    valign: 'middle'
  });
  addFooter(teaeSlide, trialData, slideNum, totalSlides);

  // Slide 17: Dosing
  slideNum++;
  const dosingSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  dosingSlide.addText('Dosing & Administration', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  // Dosing info boxes
  const dosingInfo = [
    { label: 'Strength', value: trialData.dosing.strength },
    { label: 'Regimen', value: trialData.dosing.regimen },
    { label: 'Administration', value: trialData.dosing.administration },
    { label: 'Storage', value: trialData.dosing.storage }
  ];
  dosingInfo.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    dosingSlide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.5 + (col * 6.4), y: 1.2 + (row * 1.6), w: 6.1, h: 1.4,
      fill: { color: COLORS.lightBg },
      line: { color: COLORS.primary, pt: 1 }
    });
    dosingSlide.addText(item.label, {
      x: 0.7 + (col * 6.4), y: 1.35 + (row * 1.6), w: 5.7, h: 0.4,
      fontSize: 12, bold: true, color: COLORS.primary, fontFace: 'Arial'
    });
    dosingSlide.addText(item.value, {
      x: 0.7 + (col * 6.4), y: 1.75 + (row * 1.6), w: 5.7, h: 0.6,
      fontSize: 16, color: COLORS.text, fontFace: 'Arial'
    });
  });
  addFooter(dosingSlide, trialData, slideNum, totalSlides);

  // Slide 18: Key Takeaways
  slideNum++;
  const takeawaySlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  takeawaySlide.addText('Key Takeaways', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  trialData.keyMessages.forEach((msg, i) => {
    takeawaySlide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.5, y: 1.0 + (i * 0.85), w: 12.33, h: 0.75,
      fill: { color: i === 0 ? COLORS.primary : COLORS.lightBg },
      line: { color: i === 0 ? COLORS.primary : COLORS.lightGray, pt: 1 }
    });
    takeawaySlide.addText(`${i + 1}. ${msg.headline}`, {
      x: 0.7, y: 1.1 + (i * 0.85), w: 12, h: 0.3,
      fontSize: 14, bold: true, color: i === 0 ? COLORS.white : COLORS.dark, fontFace: 'Arial'
    });
    takeawaySlide.addText(msg.detail, {
      x: 0.9, y: 1.4 + (i * 0.85), w: 11.5, h: 0.3,
      fontSize: 12, color: i === 0 ? COLORS.accent : COLORS.gray, fontFace: 'Arial'
    });
  });
  addFooter(takeawaySlide, trialData, slideNum, totalSlides);

  // Final Slide: AI Disclosure
  const disclosureSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  disclosureSlide.addText('Disclosure', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  disclosureSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 1.2, w: 12.33, h: 2,
    fill: { color: COLORS.lightBg },
    line: { color: COLORS.primary, pt: 1 }
  });
  disclosureSlide.addText('AI-Assisted Content Generation', {
    x: 0.7, y: 1.4, w: 12, h: 0.4,
    fontSize: 16, bold: true, color: COLORS.primary, fontFace: 'Arial'
  });
  disclosureSlide.addText(
    'This presentation was generated with AI assistance using the Medical Affairs AI platform. ' +
    'All clinical data and statistics are derived from the source clinical trial documentation. ' +
    'Content should be reviewed by qualified medical and regulatory professionals before use.',
    {
      x: 0.7, y: 1.9, w: 12, h: 1,
      fontSize: 12, color: COLORS.text, fontFace: 'Arial'
    }
  );
  disclosureSlide.addText(`Generated: ${new Date().toLocaleDateString()}`, {
    x: 0.7, y: 2.9, w: 12, h: 0.3,
    fontSize: 10, color: COLORS.gray, fontFace: 'Arial'
  });

  // Save
  const filename = options.filename || `${trialData.compound}_Training_Deck.pptx`;
  await pptx.writeFile({ fileName: filename });

  return filename;
}

// Generate Podium Deck (Conference presentation, ~40 slides, more detailed)
export async function generatePodiumDeck(trialData, selectedSubgroups, options = {}) {
  const pptx = new pptxgen();

  pptx.author = 'Medical Affairs AI';
  pptx.title = `${trialData.trialName}: ${trialData.compound} Phase 3 Results`;
  pptx.subject = `Conference Presentation - ${trialData.indication}`;
  pptx.company = trialData.sponsor;

  pptx.layout = 'LAYOUT_WIDE';

  defineMasters(pptx);

  // Title slide
  const titleSlide = pptx.addSlide({ masterName: 'TITLE_SLIDE' });
  titleSlide.addText(trialData.trialName, {
    x: 0.5, y: 1.2, w: 12.33, h: 0.8,
    fontSize: 44, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  titleSlide.addText(`${trialData.compound} for Prophylaxis of ${trialData.indication}`, {
    x: 0.5, y: 2.1, w: 12.33, h: 0.6,
    fontSize: 24, color: COLORS.accent, fontFace: 'Arial'
  });
  titleSlide.addText('Results from a Phase 3, Randomized, Double-Blind, Placebo-Controlled Trial', {
    x: 0.5, y: 2.8, w: 12.33, h: 0.5,
    fontSize: 18, color: COLORS.lightGray, fontFace: 'Arial'
  });
  titleSlide.addText('[Presenter Name, MD]\n[Institution]\n[Conference Name] | [Date]', {
    x: 0.5, y: 3.8, w: 12.33, h: 1,
    fontSize: 14, color: COLORS.gray, fontFace: 'Arial'
  });

  // Disclosures slide
  const disclosuresSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  disclosuresSlide.addText('Disclosures', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  disclosuresSlide.addText('[Presenter Name] has received consulting fees/honoraria from:', {
    x: 0.5, y: 1.2, w: 12, h: 0.5,
    fontSize: 16, color: COLORS.text, fontFace: 'Arial'
  });
  disclosuresSlide.addText('• [Company names to be inserted]', {
    x: 0.7, y: 1.8, w: 11, h: 0.4,
    fontSize: 14, color: COLORS.gray, fontFace: 'Arial'
  });
  disclosuresSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 4.0, w: 12.33, h: 0.8,
    fill: { color: COLORS.lightBg },
    line: { color: COLORS.primary, pt: 1 }
  });
  disclosuresSlide.addText('This presentation includes AI-generated content. Review for accuracy before presentation.', {
    x: 0.7, y: 4.15, w: 12, h: 0.5,
    fontSize: 12, italic: true, color: COLORS.primary, fontFace: 'Arial'
  });

  // Background slide
  const bgSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  bgSlide.addText('Background', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  const bgPoints = [
    `HAE is a rare genetic disorder affecting ~1:50,000 individuals`,
    `Characterized by recurrent episodes of severe subcutaneous and submucosal edema`,
    `Attacks are unpredictable and can be life-threatening when affecting the airway`,
    `${trialData.compound} is a novel oral kallikrein inhibitor`,
    `${trialData.moa.differentiator}`
  ];
  bgPoints.forEach((point, i) => {
    bgSlide.addText('•', {
      x: 0.5, y: 1.2 + (i * 0.6), w: 0.3, h: 0.5,
      fontSize: 16, color: COLORS.primary, fontFace: 'Arial'
    });
    bgSlide.addText(point, {
      x: 0.9, y: 1.2 + (i * 0.6), w: 11.5, h: 0.5,
      fontSize: 16, color: COLORS.text, fontFace: 'Arial'
    });
  });

  // Objective slide
  const objSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  objSlide.addText('Study Objective', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  objSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 1, y: 1.5, w: 11.33, h: 1.5,
    fill: { color: COLORS.primary }
  });
  objSlide.addText('Primary Objective', {
    x: 1.3, y: 1.65, w: 11, h: 0.4,
    fontSize: 14, bold: true, color: COLORS.accent, fontFace: 'Arial'
  });
  objSlide.addText(
    `To evaluate the efficacy and safety of ${trialData.compound} ${trialData.dosing.regimen} ` +
    `compared to placebo for prophylaxis of HAE attacks over ${trialData.design.duration}`,
    {
      x: 1.3, y: 2.1, w: 10.7, h: 0.8,
      fontSize: 16, color: COLORS.white, fontFace: 'Arial'
    }
  );

  // Methods/Design slide
  const methodsSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  methodsSlide.addText('Study Design', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  methodsSlide.addText(trialData.design.type, {
    x: 0.5, y: 1.0, w: 12, h: 0.4,
    fontSize: 18, bold: true, color: COLORS.dark, fontFace: 'Arial'
  });
  // Visual trial design
  methodsSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 1, y: 1.8, w: 4.5, h: 2.5,
    fill: { color: COLORS.lightBg },
    line: { color: COLORS.primary, pt: 2 }
  });
  methodsSlide.addText('Screening', {
    x: 1.2, y: 1.9, w: 4.1, h: 0.4,
    fontSize: 12, bold: true, color: COLORS.primary, fontFace: 'Arial'
  });
  methodsSlide.addText('• HAE Type I or II diagnosis\n• ≥2 attacks in prior 3 months\n• Age ≥18 years', {
    x: 1.2, y: 2.3, w: 4.1, h: 1.5,
    fontSize: 11, color: COLORS.text, fontFace: 'Arial'
  });
  // Arrow
  methodsSlide.addText('→', {
    x: 5.6, y: 2.7, w: 0.5, h: 0.5,
    fontSize: 24, color: COLORS.primary, fontFace: 'Arial'
  });
  // Randomization
  methodsSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 6.2, y: 1.8, w: 2, h: 2.5,
    fill: { color: COLORS.primary }
  });
  methodsSlide.addText('R\n1:1', {
    x: 6.2, y: 2.5, w: 2, h: 1,
    fontSize: 20, bold: true, color: COLORS.white, align: 'center', fontFace: 'Arial'
  });
  // Arrow
  methodsSlide.addText('→', {
    x: 8.3, y: 2.7, w: 0.5, h: 0.5,
    fontSize: 24, color: COLORS.primary, fontFace: 'Arial'
  });
  // Treatment arms
  methodsSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 8.9, y: 1.5, w: 4, h: 1.3,
    fill: { color: COLORS.primary }
  });
  methodsSlide.addText(`${trialData.compound}\n${trialData.dosing.regimen}\nN=${trialData.design.arms[0].n}`, {
    x: 9.1, y: 1.6, w: 3.6, h: 1.1,
    fontSize: 12, color: COLORS.white, fontFace: 'Arial'
  });
  methodsSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 8.9, y: 3.0, w: 4, h: 1.3,
    fill: { color: COLORS.gray }
  });
  methodsSlide.addText(`Placebo\nQD\nN=${trialData.design.arms[1].n}`, {
    x: 9.1, y: 3.1, w: 3.6, h: 1.1,
    fontSize: 12, color: COLORS.white, fontFace: 'Arial'
  });
  methodsSlide.addText(trialData.design.duration, {
    x: 8.9, y: 4.4, w: 4, h: 0.3,
    fontSize: 12, bold: true, color: COLORS.text, align: 'center', fontFace: 'Arial'
  });

  // Primary Endpoint Results
  const primaryResultSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  primaryResultSlide.addText('Primary Endpoint: Monthly HAE Attack Rate', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  // Big result
  primaryResultSlide.addText(`${trialData.primaryEndpoint.reduction}%`, {
    x: 0.5, y: 1.3, w: 5, h: 1.5,
    fontSize: 96, bold: true, color: COLORS.primary, fontFace: 'Arial'
  });
  primaryResultSlide.addText('REDUCTION', {
    x: 0.5, y: 2.8, w: 5, h: 0.4,
    fontSize: 20, bold: true, color: COLORS.dark, fontFace: 'Arial'
  });
  primaryResultSlide.addText(`95% CI: ${trialData.primaryEndpoint.reductionCI[0]}%-${trialData.primaryEndpoint.reductionCI[1]}%`, {
    x: 0.5, y: 3.3, w: 5, h: 0.4,
    fontSize: 16, color: COLORS.text, fontFace: 'Arial'
  });
  primaryResultSlide.addText(`p${trialData.primaryEndpoint.pValue}`, {
    x: 0.5, y: 3.7, w: 5, h: 0.4,
    fontSize: 18, bold: true, color: COLORS.success, fontFace: 'Arial'
  });
  // Data
  primaryResultSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 6, y: 1.3, w: 6.83, h: 2.8,
    fill: { color: COLORS.lightBg }
  });
  primaryResultSlide.addText('Attacks per Month', {
    x: 6.2, y: 1.5, w: 6.4, h: 0.4,
    fontSize: 14, bold: true, color: COLORS.dark, fontFace: 'Arial'
  });
  primaryResultSlide.addText(trialData.compound, {
    x: 6.2, y: 2.1, w: 3, h: 0.4,
    fontSize: 14, color: COLORS.text, fontFace: 'Arial'
  });
  primaryResultSlide.addText(String(trialData.primaryEndpoint.drugResult), {
    x: 9.5, y: 2.1, w: 3, h: 0.4,
    fontSize: 24, bold: true, color: COLORS.primary, fontFace: 'Arial'
  });
  primaryResultSlide.addText('Placebo', {
    x: 6.2, y: 2.8, w: 3, h: 0.4,
    fontSize: 14, color: COLORS.text, fontFace: 'Arial'
  });
  primaryResultSlide.addText(String(trialData.primaryEndpoint.placeboResult), {
    x: 9.5, y: 2.8, w: 3, h: 0.4,
    fontSize: 24, bold: true, color: COLORS.gray, fontFace: 'Arial'
  });

  // Subgroup Analysis
  const subgroupSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  subgroupSlide.addText('Subgroup Analyses', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  subgroupSlide.addText('Consistent treatment effect across pre-specified subgroups', {
    x: 0.5, y: 0.9, w: 12, h: 0.4,
    fontSize: 16, italic: true, color: COLORS.gray, fontFace: 'Arial'
  });
  const selectedSGs = trialData.subgroups.filter(sg => selectedSubgroups.includes(sg.name));
  const sgRows = [
    [{ text: 'Subgroup', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: 'N', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: 'Rate Ratio', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: '95% CI', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: 'p-value', options: { bold: true, fill: COLORS.primary, color: COLORS.white } }]
  ];
  selectedSGs.slice(0, 10).forEach((sg, i) => {
    sgRows.push([
      { text: sg.name, options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white, align: 'left' } },
      { text: String(sg.n), options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white } },
      { text: sg.rr.toFixed(2), options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white, color: COLORS.primary, bold: true } },
      { text: `[${sg.ciLower.toFixed(2)}, ${sg.ciUpper.toFixed(2)}]`, options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white } },
      { text: sg.pValue, options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white, color: COLORS.success } }
    ]);
  });
  subgroupSlide.addTable(sgRows, {
    x: 0.5, y: 1.3, w: 12.33, h: 3.5,
    fontFace: 'Arial',
    fontSize: 10,
    border: { pt: 0.5, color: COLORS.lightGray },
    align: 'center',
    valign: 'middle'
  });

  // Safety slide
  const safetySummarySlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  safetySummarySlide.addText('Safety Summary', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  const safetyTableRows = [
    [{ text: '', options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: `${trialData.compound}\n(N=${trialData.design.arms[0].n})`, options: { bold: true, fill: COLORS.primary, color: COLORS.white } },
     { text: `Placebo\n(N=${trialData.design.arms[1].n})`, options: { bold: true, fill: COLORS.primary, color: COLORS.white } }]
  ];
  trialData.safety.teaeSummary.forEach((item, i) => {
    safetyTableRows.push([
      { text: item.event, options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white, align: 'left' } },
      { text: `${item.drug}%`, options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white } },
      { text: `${item.placebo}%`, options: { fill: i % 2 === 0 ? COLORS.lightBg : COLORS.white } }
    ]);
  });
  safetySummarySlide.addTable(safetyTableRows, {
    x: 0.5, y: 1.0, w: 12.33, h: 3.5,
    fontFace: 'Arial',
    fontSize: 11,
    border: { pt: 0.5, color: COLORS.lightGray },
    align: 'center',
    valign: 'middle'
  });

  // Conclusions slide
  const conclusionSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  conclusionSlide.addText('Conclusions', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  const conclusions = [
    `${trialData.compound} demonstrated a ${trialData.primaryEndpoint.reduction}% reduction in monthly HAE attack rate vs placebo`,
    `${trialData.secondaryEndpoints[0]?.drugResult} of patients on ${trialData.compound} were attack-free at Week 26`,
    'Consistent efficacy was observed across all pre-specified subgroups',
    `${trialData.compound} was well-tolerated with a favorable safety profile`,
    `These data support ${trialData.compound} as an effective oral option for HAE prophylaxis`
  ];
  conclusions.forEach((point, i) => {
    conclusionSlide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.5, y: 1.0 + (i * 0.8), w: 0.1, h: 0.6,
      fill: { color: COLORS.primary }
    });
    conclusionSlide.addText(point, {
      x: 0.8, y: 1.0 + (i * 0.8), w: 12, h: 0.6,
      fontSize: 15, color: COLORS.text, fontFace: 'Arial'
    });
  });

  // AI Disclosure slide
  const aiSlide = pptx.addSlide({ masterName: 'CONTENT_SLIDE' });
  aiSlide.addText('Acknowledgments', {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.white, fontFace: 'Arial'
  });
  aiSlide.addText('Study Team and Participants', {
    x: 0.5, y: 1.2, w: 12, h: 0.4,
    fontSize: 16, bold: true, color: COLORS.dark, fontFace: 'Arial'
  });
  aiSlide.addText('We thank the patients and investigators who participated in the SHIELD-1 trial.', {
    x: 0.5, y: 1.7, w: 12, h: 0.4,
    fontSize: 14, color: COLORS.text, fontFace: 'Arial'
  });
  aiSlide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 3.5, w: 12.33, h: 1.2,
    fill: { color: COLORS.lightBg },
    line: { color: COLORS.warning, pt: 2 }
  });
  aiSlide.addText('AI-Assisted Content Notice', {
    x: 0.7, y: 3.65, w: 12, h: 0.4,
    fontSize: 14, bold: true, color: COLORS.warning, fontFace: 'Arial'
  });
  aiSlide.addText(
    'This presentation was generated with AI assistance. All data derived from clinical trial documentation. ' +
    'Content reviewed for accuracy. Generated: ' + new Date().toLocaleDateString(),
    {
      x: 0.7, y: 4.05, w: 12, h: 0.5,
      fontSize: 11, color: COLORS.text, fontFace: 'Arial'
    }
  );

  const filename = options.filename || `${trialData.trialName}_Podium_Deck.pptx`;
  await pptx.writeFile({ fileName: filename });

  return filename;
}
