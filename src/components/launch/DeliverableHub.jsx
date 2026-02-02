import { useState, useEffect } from 'react';
import {
  Presentation,
  FileText,
  Download,
  ArrowLeft,
  Check,
  Loader2,
  GraduationCap,
  Mic2,
  Newspaper,
  Sparkles,
  AlertCircle,
  Rocket,
  Zap,
  Clock,
  Package,
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';
import { generateTrainingDeck, generatePodiumDeck } from '../../utils/pptxGenerator';
import { generateMarketingFlyer, generateClinicalSummaryFlyer } from '../../utils/pdfFlyerGenerator';

const deliverables = [
  {
    id: 'training',
    title: 'Training Deck',
    description: 'HCP/KOL training presentation with disease overview, MOA, efficacy, and safety data',
    icon: GraduationCap,
    format: 'PPTX',
    slides: '~20 slides',
    audience: 'Healthcare Professionals',
    color: 'coral',
    timeSaved: '2 weeks'
  },
  {
    id: 'podium',
    title: 'Podium Deck',
    description: 'Conference-style presentation with detailed methodology and results',
    icon: Mic2,
    format: 'PPTX',
    slides: '~15 slides',
    audience: 'Scientific Conferences',
    color: 'sage',
    timeSaved: '1.5 weeks'
  },
  {
    id: 'flyer',
    title: 'Marketing Flyer',
    description: 'One-page summary highlighting key efficacy and safety messages',
    icon: Newspaper,
    format: 'PDF',
    slides: '1 page',
    audience: 'Commercial Teams',
    color: 'amber',
    timeSaved: '3 days'
  },
  {
    id: 'clinical',
    title: 'Clinical Summary',
    description: 'Detailed clinical data summary with subgroup analysis table',
    icon: FileText,
    format: 'PDF',
    slides: '1 page',
    audience: 'Medical Affairs',
    color: 'slate',
    timeSaved: '4 days'
  }
];

export default function DeliverableHub({ trialData, selectedSubgroups, onBack }) {
  const [generating, setGenerating] = useState({});
  const [generated, setGenerated] = useState({});
  const [error, setError] = useState(null);
  const [generationProgress, setGenerationProgress] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);

  // Check if all deliverables are generated for celebration
  useEffect(() => {
    const generatedCount = Object.keys(generated).length;
    if (generatedCount === deliverables.length && generatedCount > 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [generated]);

  const handleGenerate = async (deliverableId) => {
    setGenerating(prev => ({ ...prev, [deliverableId]: true }));
    setGenerationProgress(prev => ({ ...prev, [deliverableId]: 0 }));
    setError(null);

    // Simulate progress updates for dramatic effect
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => ({
        ...prev,
        [deliverableId]: Math.min((prev[deliverableId] || 0) + Math.random() * 15, 90)
      }));
    }, 200);

    try {
      let filename;

      switch (deliverableId) {
        case 'training':
          filename = await generateTrainingDeck(trialData, selectedSubgroups);
          break;
        case 'podium':
          filename = await generatePodiumDeck(trialData, selectedSubgroups);
          break;
        case 'flyer':
          filename = await generateMarketingFlyer(trialData, selectedSubgroups);
          break;
        case 'clinical':
          filename = await generateClinicalSummaryFlyer(trialData, selectedSubgroups);
          break;
        default:
          throw new Error('Unknown deliverable type');
      }

      clearInterval(progressInterval);
      setGenerationProgress(prev => ({ ...prev, [deliverableId]: 100 }));

      // Small delay to show 100% before transitioning
      await new Promise(resolve => setTimeout(resolve, 300));
      setGenerated(prev => ({ ...prev, [deliverableId]: filename }));
    } catch (err) {
      console.error('Generation error:', err);
      setError(`Failed to generate ${deliverableId}: ${err.message}`);
      clearInterval(progressInterval);
    } finally {
      setGenerating(prev => ({ ...prev, [deliverableId]: false }));
    }
  };

  const handleGenerateAll = async () => {
    for (const deliverable of deliverables) {
      if (!generated[deliverable.id]) {
        await handleGenerate(deliverable.id);
      }
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      coral: {
        bg: 'bg-gradient-to-br from-coral-50 to-rose-50',
        border: 'border-coral-200',
        icon: 'text-coral-500',
        iconBg: 'bg-gradient-to-br from-coral-400 to-coral-600',
        button: 'bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700',
        progress: 'bg-coral-500',
        glow: 'shadow-coral-200'
      },
      sage: {
        bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
        border: 'border-emerald-200',
        icon: 'text-emerald-600',
        iconBg: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
        button: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
        progress: 'bg-emerald-500',
        glow: 'shadow-emerald-200'
      },
      amber: {
        bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
        border: 'border-amber-200',
        icon: 'text-amber-500',
        iconBg: 'bg-gradient-to-br from-amber-400 to-amber-600',
        button: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
        progress: 'bg-amber-500',
        glow: 'shadow-amber-200'
      },
      slate: {
        bg: 'bg-gradient-to-br from-slate-50 to-gray-100',
        border: 'border-gray-200',
        icon: 'text-slate-600',
        iconBg: 'bg-gradient-to-br from-slate-500 to-slate-700',
        button: 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800',
        progress: 'bg-slate-600',
        glow: 'shadow-slate-200'
      }
    };
    return colors[color] || colors.coral;
  };

  const totalGenerated = Object.keys(generated).length;
  const allGenerated = totalGenerated === deliverables.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4 animate-success-pop shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">All Materials Ready!</h3>
            <p className="text-gray-600 mb-4">Your complete launch package is ready for download.</p>
            <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
              <TrendingUp className="w-5 h-5" />
              <span>Saved ~4 weeks of work</span>
            </div>
          </div>
        </div>
      )}

      {/* Header with Generate All CTA */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="w-5 h-5 text-blue-500" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Launch Package</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Generate Deliverables</h3>
            <p className="text-gray-500 text-sm">
              Create professional materials in seconds, not weeks
            </p>
          </div>

          {!allGenerated && (
            <button
              onClick={handleGenerateAll}
              disabled={Object.values(generating).some(v => v)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-coral-500 to-coral-600 text-white font-semibold rounded-xl hover:from-coral-600 hover:to-coral-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
            >
              <Zap className="w-5 h-5" />
              Generate All
            </button>
          )}

          {allGenerated && (
            <div className="flex items-center gap-3 px-5 py-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <div>
                <p className="font-semibold text-emerald-700">All Complete</p>
                <p className="text-xs text-emerald-600">{deliverables.length} deliverables ready</p>
              </div>
            </div>
          )}
        </div>

        {/* Progress Summary */}
        {totalGenerated > 0 && !allGenerated && (
          <div className="mt-4 pt-4 border-t border-blue-100">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-500">Progress</span>
              <span className="text-gray-900 font-medium">{totalGenerated} of {deliverables.length}</span>
            </div>
            <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${(totalGenerated / deliverables.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
          <p className="text-2xl font-bold text-gray-900">{trialData.compound}</p>
          <p className="text-xs text-gray-500">{trialData.trialName}</p>
        </div>
        <div className="bg-gradient-to-br from-coral-50 to-rose-50 rounded-xl border border-coral-200 p-4 text-center hover:shadow-md transition-shadow">
          <p className="text-2xl font-bold text-coral-600">{trialData.primaryEndpoint.reduction}%</p>
          <p className="text-xs text-gray-500">Reduction in Monthly Attack Rate</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
          <p className="text-2xl font-bold text-gray-900">{selectedSubgroups.length}</p>
          <p className="text-xs text-gray-500">Subgroups</p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl animate-slide-down">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Deliverable Cards - Enhanced Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {deliverables.map((deliverable, index) => {
          const Icon = deliverable.icon;
          const colors = getColorClasses(deliverable.color);
          const isGenerating = generating[deliverable.id];
          const isGenerated = generated[deliverable.id];
          const progress = generationProgress[deliverable.id] || 0;

          return (
            <div
              key={deliverable.id}
              className={`
                relative rounded-xl border p-5 transition-all duration-300 hover:shadow-lg
                ${colors.bg} ${colors.border}
                ${isGenerated ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}
                ${isGenerating ? `shadow-lg ${colors.glow}` : ''}
                animate-slide-up
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Generated badge with animation */}
              {isGenerated && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-success-pop">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Time saved badge */}
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-white/80 rounded-full text-xs">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-500">Saves {deliverable.timeSaved}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${colors.iconBg} ${isGenerating ? 'animate-pulse' : ''}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{deliverable.title}</h4>
                    <span className="px-2 py-0.5 bg-white/80 rounded-full text-xs font-medium text-gray-600">
                      {deliverable.format}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{deliverable.description}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Package className="w-3.5 h-3.5" />
                      {deliverable.slides}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span>{deliverable.audience}</span>
                  </div>

                  {/* Progress bar when generating */}
                  {isGenerating && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-500">Generating...</span>
                        <span className="font-medium text-gray-700">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors.progress} rounded-full transition-all duration-200`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => handleGenerate(deliverable.id)}
                    disabled={isGenerating}
                    className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold
                      transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                      ${colors.button}
                      ${isGenerated ? 'btn-glow' : ''}
                    `}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : isGenerated ? (
                      <>
                        <Download className="w-4 h-4" />
                        Download Again
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Disclosure Notice - Enhanced */}
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className="font-semibold text-amber-800 mb-1">AI-Generated Content Notice</p>
          <p className="text-sm text-amber-700">
            All outputs include proper AI disclosure and require MLR/regulatory review before external distribution.
          </p>
        </div>
      </div>

      {/* Navigation - Enhanced */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Analysis
        </button>

        <div className="flex items-center gap-4">
          {totalGenerated > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-700">
                {totalGenerated} of {deliverables.length} ready
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
