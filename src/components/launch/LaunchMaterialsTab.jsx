import { useState } from 'react';
import {
  Database,
  BarChart3,
  FileOutput,
  ChevronRight,
  Sparkles,
  Layers,
  Rocket,
  Clock,
  FileText,
  Shield
} from 'lucide-react';

import TrialDataLoader from './TrialDataLoader';
import SubgroupAnalysis from './SubgroupAnalysis';
import DeliverableHub from './DeliverableHub';
import { demoTrialData } from '../../data/launchDemoData';

const WORKFLOW_STEPS = [
  { id: 'load', label: 'Data', icon: Database },
  { id: 'analyze', label: 'Analysis', icon: BarChart3 },
  { id: 'generate', label: 'Export', icon: FileOutput }
];

export default function LaunchMaterialsTab({ activeStep = 'load', onStepChange }) {
  const [internalStep, setInternalStep] = useState('load');

  // Use external state if provided, otherwise use internal
  const currentStep = onStepChange ? activeStep : internalStep;
  const setCurrentStep = onStepChange || setInternalStep;
  const [trialData, setTrialData] = useState(null);
  const [selectedSubgroups, setSelectedSubgroups] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleLoadData = () => {
    setTrialData(demoTrialData);
    setSelectedSubgroups(
      demoTrialData.subgroups
        .filter(sg => sg.selected)
        .map(sg => sg.name)
    );
    setIsDataLoaded(true);
  };

  const handleNavigate = (step) => {
    if (step === 'load' || isDataLoaded) {
      setCurrentStep(step);
    }
  };

  const handleSubgroupToggle = (subgroupName) => {
    setSelectedSubgroups(prev =>
      prev.includes(subgroupName)
        ? prev.filter(name => name !== subgroupName)
        : [...prev, subgroupName]
    );
  };

  const handleSelectAll = () => {
    setSelectedSubgroups(trialData.subgroups.map(sg => sg.name));
  };

  const handleDeselectAll = () => {
    setSelectedSubgroups(['Overall Population']);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section - matching Research tab style */}
      {!isDataLoaded && (
        <div className="text-center mb-10 max-w-2xl mx-auto animate-fade-in">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-coral-50 to-rose-50 text-coral-600 rounded-full text-sm font-medium mb-6 border border-coral-100">
            <Sparkles className="w-4 h-4 animate-pulse" />
            First-in-Class Drug Launch
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Launch Materials in <span className="gradient-text">Minutes</span>,
            <br />Not Months
          </h2>

          <p className="text-lg text-gray-500 leading-relaxed mb-8">
            Transform clinical trial data into presentation-ready training decks,
            podium presentations, and marketing flyers — all with AI.
          </p>

          {/* Value props */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 rounded-full bg-coral-50 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-coral-500" />
              </div>
              <span>4 Deliverables</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <span>Saves 4+ Weeks</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Shield className="w-4 h-4 text-purple-500" />
              </div>
              <span>MLR Compliant</span>
            </div>
          </div>
        </div>
      )}

      {/* Compact header when data is loaded */}
      {isDataLoaded && (
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Launch Suite
          </h2>
          <p className="text-gray-500 text-sm">
            Generate training decks, presentations, and marketing materials from clinical trial data.
          </p>
        </div>
      )}

      {/* Step Navigation - Enhanced */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center bg-white rounded-xl border border-gray-200 p-1.5 shadow-sm">
          {WORKFLOW_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isPast = WORKFLOW_STEPS.findIndex(s => s.id === currentStep) > index;
            const isAccessible = step.id === 'load' || isDataLoaded;

            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => handleNavigate(step.id)}
                  disabled={!isAccessible}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-coral-500 to-coral-600 text-white shadow-md'
                      : isPast
                        ? 'text-coral-600 hover:bg-coral-50'
                        : isAccessible
                          ? 'text-gray-600 hover:bg-gray-50'
                          : 'text-gray-300 cursor-not-allowed'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{step.label}</span>
                </button>
                {index < WORKFLOW_STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {currentStep === 'load' && (
          <TrialDataLoader
            trialData={trialData}
            isLoaded={isDataLoaded}
            onLoad={handleLoadData}
            onContinue={() => setCurrentStep('analyze')}
          />
        )}

        {currentStep === 'analyze' && trialData && (
          <SubgroupAnalysis
            trialData={trialData}
            selectedSubgroups={selectedSubgroups}
            onSubgroupToggle={handleSubgroupToggle}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onContinue={() => setCurrentStep('generate')}
            onBack={() => setCurrentStep('load')}
          />
        )}

        {currentStep === 'generate' && trialData && (
          <DeliverableHub
            trialData={trialData}
            selectedSubgroups={selectedSubgroups}
            onBack={() => setCurrentStep('analyze')}
          />
        )}
      </div>
    </div>
  );
}
