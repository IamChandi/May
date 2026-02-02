import { jsPDF } from 'jspdf';

// Color constants matching the blue theme
const COLORS = {
  primary: [59, 130, 246],      // Blue RGB
  primaryDark: [29, 78, 216],
  secondary: [6, 182, 212],     // Teal
  accent: [96, 165, 250],
  dark: [15, 23, 42],
  text: [51, 65, 85],
  lightBg: [240, 249, 255],
  white: [255, 255, 255],
  gray: [107, 114, 128],
  lightGray: [229, 231, 235],
  success: [16, 185, 129],
  warning: [245, 158, 11]
};

// Helper to set color
const setColor = (doc, color, type = 'fill') => {
  if (type === 'fill') {
    doc.setFillColor(...color);
  } else if (type === 'text') {
    doc.setTextColor(...color);
  } else if (type === 'draw') {
    doc.setDrawColor(...color);
  }
};

export async function generateMarketingFlyer(trialData, selectedSubgroups, options = {}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  // Header background
  setColor(doc, COLORS.primary, 'fill');
  doc.rect(0, 0, pageWidth, 70, 'F');

  // First-in-class badge
  setColor(doc, COLORS.accent, 'fill');
  doc.roundedRect(margin, 12, 45, 8, 2, 2, 'F');
  doc.setFontSize(8);
  setColor(doc, COLORS.white, 'text');
  doc.setFont('helvetica', 'bold');
  doc.text('FIRST-IN-CLASS', margin + 22.5, 17.5, { align: 'center' });

  // Drug name
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.white, 'text');
  doc.text(trialData.compound, margin, 38);

  // Generic name
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  setColor(doc, COLORS.accent, 'text');
  doc.text(`(${trialData.genericName})`, margin, 47);

  // Tagline
  doc.setFontSize(16);
  setColor(doc, COLORS.lightGray, 'text');
  doc.text(trialData.moa.differentiator, margin, 60);

  // Hero stat section
  const heroY = 85;
  setColor(doc, COLORS.lightBg, 'fill');
  doc.rect(margin, heroY, contentWidth, 50, 'F');

  // Big number
  doc.setFontSize(64);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.primary, 'text');
  doc.text(`${trialData.primaryEndpoint.reduction}%`, margin + 10, heroY + 35);

  // Reduction label
  doc.setFontSize(14);
  setColor(doc, COLORS.dark, 'text');
  doc.text('Reduction in Monthly', margin + 70, heroY + 22);
  doc.text('HAE Attacks vs Placebo', margin + 70, heroY + 30);

  // P-value
  doc.setFontSize(12);
  setColor(doc, COLORS.success, 'text');
  doc.setFont('helvetica', 'bold');
  doc.text(`p${trialData.primaryEndpoint.pValue}`, margin + 70, heroY + 42);

  // Key benefits section
  const benefitsY = heroY + 60;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.dark, 'text');
  doc.text('KEY BENEFITS', margin, benefitsY);

  // Benefit items
  const benefits = [
    {
      icon: '●',
      title: 'Proven Efficacy',
      detail: `${trialData.primaryEndpoint.reduction}% reduction in HAE attack rate vs placebo`
    },
    {
      icon: '●',
      title: 'Attack-Free Patients',
      detail: `${trialData.secondaryEndpoints[0]?.drugResult} of patients attack-free at 26 weeks`
    },
    {
      icon: '●',
      title: 'Consistent Results',
      detail: 'Efficacy maintained across all pre-specified subgroups'
    },
    {
      icon: '●',
      title: 'Well-Tolerated',
      detail: `Low discontinuation rate (${trialData.safety.discontinuations.drug}%)`
    },
    {
      icon: '●',
      title: 'Convenient Dosing',
      detail: `${trialData.dosing.regimen} - ${trialData.dosing.administration}`
    }
  ];

  let currentY = benefitsY + 10;
  benefits.forEach((benefit, i) => {
    // Bullet
    setColor(doc, COLORS.primary, 'text');
    doc.setFontSize(10);
    doc.text('●', margin + 2, currentY);

    // Title
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    setColor(doc, COLORS.dark, 'text');
    doc.text(benefit.title, margin + 10, currentY);

    // Detail
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    setColor(doc, COLORS.gray, 'text');
    doc.text(benefit.detail, margin + 10, currentY + 5);

    currentY += 15;
  });

  // Trial info box
  const trialBoxY = currentY + 5;
  setColor(doc, COLORS.lightBg, 'fill');
  setColor(doc, COLORS.primary, 'draw');
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, trialBoxY, contentWidth, 25, 3, 3, 'FD');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.primary, 'text');
  doc.text(`${trialData.trialName} TRIAL`, margin + 5, trialBoxY + 8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  setColor(doc, COLORS.text, 'text');
  doc.text(`${trialData.design.type}`, margin + 5, trialBoxY + 14);
  doc.text(`N=${trialData.populations.itt.n} patients | ${trialData.design.duration}`, margin + 5, trialBoxY + 20);

  // Safety snapshot
  const safetyY = trialBoxY + 35;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.dark, 'text');
  doc.text('SAFETY SNAPSHOT', margin, safetyY);

  // Safety stats in columns
  const safetyStats = [
    { label: 'Any TEAE', drug: trialData.safety.teaeSummary[0].drug, placebo: trialData.safety.teaeSummary[0].placebo },
    { label: 'Serious AE', drug: trialData.safety.teaeSummary[3].drug, placebo: trialData.safety.teaeSummary[3].placebo },
    { label: 'Discontinuation', drug: trialData.safety.discontinuations.drug, placebo: trialData.safety.discontinuations.placebo }
  ];

  const colWidth = contentWidth / 3;
  safetyStats.forEach((stat, i) => {
    const colX = margin + (i * colWidth);

    setColor(doc, COLORS.lightBg, 'fill');
    doc.rect(colX, safetyY + 5, colWidth - 5, 20, 'F');

    doc.setFontSize(8);
    setColor(doc, COLORS.gray, 'text');
    doc.text(stat.label, colX + 3, safetyY + 11);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    setColor(doc, COLORS.primary, 'text');
    doc.text(`${stat.drug}%`, colX + 3, safetyY + 20);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    setColor(doc, COLORS.gray, 'text');
    doc.text(`vs ${stat.placebo}%`, colX + 20, safetyY + 20);
  });

  // Footer section
  const footerY = pageHeight - 45;

  // Divider line
  setColor(doc, COLORS.lightGray, 'draw');
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

  // Disclaimer box
  setColor(doc, COLORS.warning, 'fill');
  doc.rect(margin, footerY, contentWidth, 20, 'F');

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.dark, 'text');
  doc.text('IMPORTANT NOTICE', margin + 3, footerY + 5);

  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  const disclaimer = `${trialData.compound} is an investigational compound. Efficacy and safety have not been established by regulatory authorities. ` +
    'This information is intended for healthcare professionals only. Please refer to the full prescribing information (when available) for complete details.';
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth - 6);
  doc.text(disclaimerLines, margin + 3, footerY + 10);

  // AI disclosure
  setColor(doc, COLORS.lightBg, 'fill');
  doc.rect(margin, footerY + 22, contentWidth, 12, 'F');
  doc.setFontSize(6);
  setColor(doc, COLORS.gray, 'text');
  doc.text('AI-Generated Content: This flyer was created with AI assistance using Medical Affairs AI platform.', margin + 3, footerY + 27);
  doc.text(`Generated: ${new Date().toLocaleDateString()} | Source: ${trialData.trialName} clinical trial data`, margin + 3, footerY + 31);

  // Company/Reference
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.primary, 'text');
  doc.text(trialData.sponsor, pageWidth - margin, footerY + 40, { align: 'right' });

  // Save
  const filename = options.filename || `${trialData.compound}_Marketing_Flyer.pdf`;
  doc.save(filename);

  return filename;
}

// Generate a more detailed clinical summary flyer
export async function generateClinicalSummaryFlyer(trialData, selectedSubgroups, options = {}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;
  const contentWidth = pageWidth - (margin * 2);

  // Header
  setColor(doc, COLORS.primary, 'fill');
  doc.rect(0, 0, pageWidth, 45, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  setColor(doc, COLORS.accent, 'text');
  doc.text('CLINICAL SUMMARY', margin, 12);

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.white, 'text');
  doc.text(`${trialData.trialName}: ${trialData.compound}`, margin, 28);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  setColor(doc, COLORS.lightGray, 'text');
  doc.text(`${trialData.phase} | ${trialData.indication}`, margin, 38);

  // Study Design section
  let currentY = 55;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.dark, 'text');
  doc.text('STUDY DESIGN', margin, currentY);

  currentY += 7;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  setColor(doc, COLORS.text, 'text');
  const designText = `${trialData.design.type}, ${trialData.design.duration}, ${trialData.design.randomization} randomization`;
  doc.text(designText, margin, currentY);

  currentY += 5;
  doc.text(`• ${trialData.design.arms[0].name} (N=${trialData.design.arms[0].n})`, margin + 3, currentY);
  currentY += 4;
  doc.text(`• ${trialData.design.arms[1].name} (N=${trialData.design.arms[1].n})`, margin + 3, currentY);

  // Primary Endpoint section
  currentY += 12;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.dark, 'text');
  doc.text('PRIMARY ENDPOINT', margin, currentY);

  currentY += 7;
  setColor(doc, COLORS.lightBg, 'fill');
  doc.rect(margin, currentY - 3, contentWidth, 25, 'F');

  doc.setFontSize(10);
  setColor(doc, COLORS.text, 'text');
  doc.text(trialData.primaryEndpoint.name, margin + 3, currentY + 3);

  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.primary, 'text');
  doc.text(`${trialData.primaryEndpoint.reduction}%`, margin + 3, currentY + 17);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  setColor(doc, COLORS.text, 'text');
  doc.text(`reduction (95% CI: ${trialData.primaryEndpoint.reductionCI[0]}-${trialData.primaryEndpoint.reductionCI[1]}%)`, margin + 35, currentY + 17);

  doc.setFontSize(9);
  setColor(doc, COLORS.success, 'text');
  doc.text(`p${trialData.primaryEndpoint.pValue}`, margin + 3, currentY + 22);

  // Secondary Endpoints
  currentY += 32;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.dark, 'text');
  doc.text('KEY SECONDARY ENDPOINTS', margin, currentY);

  currentY += 5;
  trialData.secondaryEndpoints.slice(0, 4).forEach((ep, i) => {
    currentY += 6;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    setColor(doc, COLORS.dark, 'text');
    doc.text(`${i + 1}. ${ep.name}`, margin, currentY);

    currentY += 4;
    doc.setFont('helvetica', 'normal');
    setColor(doc, COLORS.text, 'text');
    doc.text(`${trialData.compound}: ${ep.drugResult} | Placebo: ${ep.placeboResult} | p${ep.pValue}`, margin + 5, currentY);
  });

  // Subgroup Analysis
  currentY += 12;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.dark, 'text');
  doc.text('SUBGROUP ANALYSIS', margin, currentY);

  currentY += 3;
  setColor(doc, COLORS.lightGray, 'draw');
  doc.setLineWidth(0.2);

  // Table header
  currentY += 5;
  setColor(doc, COLORS.primary, 'fill');
  doc.rect(margin, currentY - 3, contentWidth, 6, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.white, 'text');
  doc.text('Subgroup', margin + 2, currentY);
  doc.text('N', margin + 55, currentY);
  doc.text('RR', margin + 70, currentY);
  doc.text('95% CI', margin + 85, currentY);
  doc.text('p-value', margin + 115, currentY);

  // Table rows
  const selectedSGs = trialData.subgroups.filter(sg => selectedSubgroups.includes(sg.name));
  selectedSGs.slice(0, 8).forEach((sg, i) => {
    currentY += 5;
    if (i % 2 === 0) {
      setColor(doc, COLORS.lightBg, 'fill');
      doc.rect(margin, currentY - 3, contentWidth, 5, 'F');
    }
    doc.setFontSize(7);
    doc.setFont('helvetica', sg.category === 'overall' ? 'bold' : 'normal');
    setColor(doc, sg.category === 'overall' ? COLORS.primary : COLORS.text, 'text');
    doc.text(sg.name, margin + 2, currentY);
    doc.text(String(sg.n), margin + 55, currentY);
    doc.text(sg.rr.toFixed(2), margin + 70, currentY);
    doc.text(`[${sg.ciLower.toFixed(2)}, ${sg.ciUpper.toFixed(2)}]`, margin + 85, currentY);
    setColor(doc, COLORS.success, 'text');
    doc.text(sg.pValue, margin + 115, currentY);
  });

  // Safety
  currentY += 12;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.dark, 'text');
  doc.text('SAFETY SUMMARY', margin, currentY);

  currentY += 5;
  // Safety table header
  setColor(doc, COLORS.primary, 'fill');
  doc.rect(margin, currentY - 3, contentWidth, 6, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.white, 'text');
  doc.text('Parameter', margin + 2, currentY);
  doc.text(`${trialData.compound}`, margin + 70, currentY);
  doc.text('Placebo', margin + 100, currentY);

  trialData.safety.teaeSummary.slice(0, 5).forEach((item, i) => {
    currentY += 5;
    if (i % 2 === 0) {
      setColor(doc, COLORS.lightBg, 'fill');
      doc.rect(margin, currentY - 3, contentWidth, 5, 'F');
    }
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    setColor(doc, COLORS.text, 'text');
    doc.text(item.event, margin + 2, currentY);
    doc.text(`${item.drug}%`, margin + 70, currentY);
    doc.text(`${item.placebo}%`, margin + 100, currentY);
  });

  // Footer
  const footerY = pageHeight - 25;
  setColor(doc, COLORS.lightBg, 'fill');
  doc.rect(0, footerY - 5, pageWidth, 30, 'F');

  doc.setFontSize(6);
  setColor(doc, COLORS.gray, 'text');
  doc.text('AI-Generated Clinical Summary | Medical Affairs AI Platform', margin, footerY);
  doc.text(`Source: ${trialData.trialName} (${trialData.nctId}) | Generated: ${new Date().toLocaleDateString()}`, margin, footerY + 4);

  doc.setFontSize(5);
  const disclaimer = `${trialData.compound} is an investigational compound. This summary is for educational purposes only and should not be used for medical decision-making.`;
  doc.text(disclaimer, margin, footerY + 10);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  setColor(doc, COLORS.primary, 'text');
  doc.text(trialData.sponsor, pageWidth - margin, footerY + 15, { align: 'right' });

  const filename = options.filename || `${trialData.compound}_Clinical_Summary.pdf`;
  doc.save(filename);

  return filename;
}
