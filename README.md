# May - The AI Platform for Medical Affairs

May is an AI-powered platform designed specifically for Medical Affairs teams, transforming months of work into days while maintaining scientific rigor and regulatory compliance.

## Overview

Medical Affairs professionals face overwhelming data volumes, lengthy content development cycles, and compliance bottlenecks. May addresses these challenges with a unified platform that streamlines research, content generation, and stakeholder engagement.

## Product Suite

### May Insights (Scientific Intelligence)
AI-powered research assistant that analyzes medical literature in seconds.
- Search across 35M+ publications
- Automated evidence synthesis and gap analysis
- Real-time competitive intelligence monitoring
- Smart citation management with context awareness

### May Comms (Scientific Communications + Publications)
Generate publication-ready materials with one click.
- Scientific manuscripts with proper methodology sections
- Congress abstracts and poster content
- Medical information letters
- Slide decks with speaker notes
- All outputs citation-linked to source data

### May Bridge (MSL ↔ KOL Engagement)
Transform every KOL interaction into strategic value.
- AI-generated briefing documents before meetings
- Real-time insight capture during conversations
- Automated CRM integration and follow-up tracking
- Strategic engagement recommendations

### May Signal (Data → Strategy)
Turn clinical data into strategic clarity.
- Automated subgroup analysis identification
- Statistical significance highlighting
- Competitive positioning matrices
- Strategic narrative development

### May Guard (Compliance)
Compliance built-in, not bolted on.
- Real-time regulatory guidance during content creation
- Automated MLR pre-check before submission
- Claim substantiation with linked references
- AI disclosure statements auto-generated
- Audit trail for every AI-generated element

## Features

- **Research Assistant**: Natural language queries return synthesized evidence with citations
- **Launch Suite**: Load clinical trial data and generate complete launch packages
- **AI Assistant "May"**: Conversational interface for navigating the platform
- **One-Click Deliverables**: Generate manuscripts, decks, and abstracts together
- **AI Transparency**: Clear disclosure of AI assistance in all generated content

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Lucide React
- **Build**: Vite with HMR

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/IamChandi/May.git
cd May

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── AIAssistant.jsx      # May AI assistant interface
│   ├── Header.jsx           # App header with navigation
│   ├── MetricsBar.jsx       # Research progress metrics
│   ├── ResearchInput.jsx    # Search interface
│   ├── ResearchResults.jsx  # Literature results display
│   ├── Visualizations.jsx   # Data visualization components
│   ├── ManuscriptPanel.jsx  # Document generation panel
│   └── launch/
│       ├── LaunchMaterialsTab.jsx  # Launch suite container
│       ├── TrialDataLoader.jsx     # Clinical trial data loader
│       ├── DeliverableHub.jsx      # Content generation hub
│       ├── SubgroupAnalysis.jsx    # Statistical analysis
│       └── ForestPlot.jsx          # Forest plot visualization
├── data/
│   ├── demoData.js          # Research demo data
│   └── launchDemoData.js    # Launch suite demo data
├── utils/
│   ├── pubmedApi.js         # PubMed integration
│   ├── clinicalTrialsApi.js # ClinicalTrials.gov integration
│   ├── manuscriptGenerator.js
│   ├── pptxGenerator.js
│   └── pdfFlyerGenerator.js
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
└── index.css                # Global styles
```

## Color Palette

The app uses a cohesive blue-indigo theme:

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#3B82F6` | Buttons, accents |
| Indigo | `#6366F1` | Gradients, highlights |
| Light Background | `#EFF6FF` | Card backgrounds |

## Demo

The prototype includes a complete demo workflow:

1. **Research Mode**: Search for medical literature and view AI-synthesized results
2. **Launch Suite**: Load the BEACON trial demo data to see the full launch materials workflow
3. **Deliverable Generation**: Generate manuscripts, slide decks, and abstracts with one click

## License

Proprietary - All rights reserved

## Contact

For more information, visit the repository at [github.com/IamChandi/May](https://github.com/IamChandi/May)
