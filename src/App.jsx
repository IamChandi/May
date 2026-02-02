import { useState } from 'react';
import {
  Search,
  BarChart3,
  FileText,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

// Components
import Header from './components/Header';
import ResearchInput from './components/ResearchInput';
import ResearchResults from './components/ResearchResults';
import Visualizations from './components/Visualizations';
import ManuscriptPanel from './components/ManuscriptPanel';
import EthicalSafeguards from './components/EthicalSafeguards';
import { AnimatedMetricsBar } from './components/MetricsBar';
import LaunchMaterialsTab from './components/launch/LaunchMaterialsTab';
import AIAssistant from './components/AIAssistant';

// Data
import {
  demoFindings,
  demoTrials,
  demoChartData,
  demoManuscript
} from './data/demoData';

const APP_MODES = [
  { id: 'research', label: 'Research', icon: Search, description: 'Literature search & synthesis', color: 'blue' },
  { id: 'launch', label: 'Launch Suite', icon: Layers, description: 'Generate launch materials', color: 'coral', badge: 'New' }
];

function App() {
  const [appMode, setAppMode] = useState('research');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [activeStep, setActiveStep] = useState('research');
  const [launchStep, setLaunchStep] = useState('load');
  const [includeTrials, setIncludeTrials] = useState(true);

  // Handle logo click - go to Research mode home
  const handleLogoClick = () => {
    setAppMode('research');
    setActiveStep('research');
    setHasResults(false);
    setQuery('');
    setResults({ findings: [], trials: [], manuscript: null });
  };

  const [results, setResults] = useState({
    findings: [],
    trials: [],
    manuscript: null
  });

  const [metrics, setMetrics] = useState({
    papersScanned: 0,
    trialsFound: 0,
    citationsGenerated: 0,
    timeElapsed: 0
  });

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setIsSearching(true);
    setHasResults(false);

    setMetrics({
      papersScanned: 0,
      trialsFound: 0,
      citationsGenerated: 0,
      timeElapsed: 0
    });

    const startTime = Date.now();

    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        papersScanned: Math.min(prev.papersScanned + Math.floor(Math.random() * 80) + 20, 847),
        trialsFound: Math.min(prev.trialsFound + Math.floor(Math.random() * 4) + 1, demoTrials.length),
        citationsGenerated: Math.min(prev.citationsGenerated + Math.floor(Math.random() * 2) + 1, demoFindings.length),
        timeElapsed: Math.floor((Date.now() - startTime) / 1000)
      }));
    }, 300);

    await new Promise(resolve => setTimeout(resolve, 2500));

    clearInterval(metricsInterval);

    setResults({
      findings: demoFindings,
      trials: includeTrials ? demoTrials : [],
      manuscript: {
        ...demoManuscript,
        title: generateTitle(searchQuery)
      }
    });

    setMetrics({
      papersScanned: 847,
      trialsFound: includeTrials ? demoTrials.length : 0,
      citationsGenerated: demoFindings.length,
      timeElapsed: Math.floor((Date.now() - startTime) / 1000)
    });

    setIsSearching(false);
    setHasResults(true);
  };

  const handleNavigate = (step) => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setQuery('');
    setHasResults(false);
    setActiveStep('research');
    setResults({ findings: [], trials: [], manuscript: null });
  };

  const sourcesVerified = {
    verified: results.findings.filter(f => f.isVerified).length,
    total: results.findings.length
  };

  const overallConfidence = results.findings.length > 0
    ? (results.findings.filter(f => f.confidence === 'HIGH').length / results.findings.length) > 0.5
      ? 'HIGH'
      : 'MEDIUM'
    : 'MEDIUM';

  const steps = [
    { id: 'research', label: 'Search', icon: Search },
    { id: 'visualize', label: 'Visualize', icon: BarChart3 },
    { id: 'manuscript', label: 'Export', icon: FileText }
  ];

  // Get current step for AI Assistant context
  const currentActiveStep = appMode === 'launch' ? launchStep : activeStep;

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <Header onLogoClick={handleLogoClick} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* Mode Selector - Enhanced with descriptions */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center bg-white rounded-2xl border border-gray-200 p-1.5 shadow-lg">
            {APP_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = appMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setAppMode(mode.id)}
                  className={`
                    relative flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium
                    transition-all duration-300
                    ${isActive
                      ? 'bg-gradient-to-r from-coral-500 to-coral-600 text-white shadow-lg scale-[1.02]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{mode.label}</span>
                      {mode.badge && !isActive && (
                        <span className="px-1.5 py-0.5 bg-coral-100 text-coral-600 text-xs font-semibold rounded-full">
                          {mode.badge}
                        </span>
                      )}
                    </div>
                    <span className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                      {mode.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Launch Materials Mode */}
        {appMode === 'launch' && (
          <LaunchMaterialsTab
            activeStep={launchStep}
            onStepChange={setLaunchStep}
          />
        )}

        {/* Research Assistant Mode */}
        {appMode === 'research' && (
          <>
            {/* Workflow Steps */}
            {hasResults && (
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-coral-600 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>New search</span>
                  </button>

                  <div className="flex items-center">
                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = activeStep === step.id;
                      const isPast = steps.findIndex(s => s.id === activeStep) > index;

                      return (
                        <div key={step.id} className="flex items-center">
                          <button
                            onClick={() => handleNavigate(step.id)}
                            className={`
                              flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                              transition-all duration-150
                              ${isActive
                                ? 'bg-coral-500 text-white'
                                : isPast
                                  ? 'text-coral-600 hover:bg-coral-50'
                                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                              }
                            `}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{step.label}</span>
                          </button>
                          {index < steps.length - 1 && (
                            <ChevronRight className="w-4 h-4 text-gray-300 mx-0.5" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Metrics Bar */}
            {(isSearching || hasResults) && (
              <div className="mb-6">
                <AnimatedMetricsBar
                  isSearching={isSearching}
                  hasResults={hasResults}
                />
              </div>
            )}

            {/* Main Content */}
            <div className="space-y-6">
              {/* Hero + Search */}
              {(activeStep === 'research' || !hasResults) && (
                <div className="flex flex-col items-center">
                  {!hasResults && !isSearching && (
                    <div className="text-center mb-10 max-w-2xl animate-fade-in">
                      {/* Animated badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-coral-50 to-rose-50 text-coral-600 rounded-full text-sm font-medium mb-6 border border-coral-100">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                        AI-Powered Medical Research
                      </div>

                      <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                        Research in <span className="gradient-text">Seconds</span>,
                        <br />Not Hours
                      </h2>

                      <p className="text-lg text-gray-500 leading-relaxed mb-8">
                        Search 35M+ medical papers, synthesize findings with verified citations,
                        and generate publication-ready manuscripts instantly.
                      </p>

                      {/* Value props */}
                      <div className="flex items-center justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-emerald-500" />
                          </div>
                          <span>10x Faster</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-blue-500" />
                          </div>
                          <span>100% Verified</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-purple-500" />
                          </div>
                          <span>Always Current</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <ResearchInput
                    onSearch={handleSearch}
                    isSearching={isSearching}
                    includeTrials={includeTrials}
                    onIncludeTrialsChange={setIncludeTrials}
                  />
                </div>
              )}

              {/* Results */}
              {hasResults && activeStep === 'research' && (
                <ResearchResults
                  findings={results.findings}
                  trials={results.trials}
                  query={query}
                  onNavigate={handleNavigate}
                />
              )}

              {/* Visualizations */}
              {hasResults && activeStep === 'visualize' && (
                <Visualizations
                  chartData={demoChartData}
                  onNavigate={handleNavigate}
                />
              )}

              {/* Manuscript */}
              {hasResults && activeStep === 'manuscript' && (
                <ManuscriptPanel
                  manuscript={results.manuscript}
                  findings={results.findings}
                />
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <EthicalSafeguards
        sourcesVerified={sourcesVerified}
        citationsGenerated={results.findings.length}
        confidenceLevel={overallConfidence}
        lastUpdated={hasResults ? new Date() : null}
      />

      {/* AI Assistant */}
      <AIAssistant
        appMode={appMode}
        activeStep={currentActiveStep}
        hasResults={hasResults}
      />
    </div>
  );
}

function generateTitle(query) {
  const keywords = query.toLowerCase();

  if (keywords.includes('glp-1') || keywords.includes('semaglutide') || keywords.includes('tirzepatide')) {
    return 'Comparative Efficacy and Safety of GLP-1 Receptor Agonists in Elderly Patients with Type 2 Diabetes: A Systematic Review';
  }

  if (keywords.includes('sglt2') || keywords.includes('heart failure')) {
    return 'SGLT2 Inhibitors in Heart Failure: A Comprehensive Analysis of Cardiovascular Outcomes';
  }

  if (keywords.includes('cardiovascular')) {
    return 'Cardiovascular Outcomes with Novel Diabetes Therapies: A Systematic Review and Meta-Analysis';
  }

  return `${query.charAt(0).toUpperCase() + query.slice(1)}: A Systematic Review`;
}

export default App;
