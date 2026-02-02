import { useState } from 'react';
import {
  Database,
  CheckCircle2,
  Users,
  Calendar,
  Building2,
  Pill,
  Target,
  ArrowRight,
  FileText,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

export default function TrialDataLoader({ trialData, isLoaded, onLoad, onContinue }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = async () => {
    setIsLoading(true);
    // Simulate loading for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onLoad();
  };

  if (!isLoaded) {
    return (
      <div className="text-center py-8">
        {/* Animated icon */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className={`absolute inset-0 bg-gradient-to-br from-coral-100 to-coral-200 rounded-2xl ${isLoading ? 'animate-pulse' : ''}`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Database className={`w-10 h-10 text-coral-500 ${isLoading ? 'animate-bounce' : ''}`} />
          </div>
          {!isLoading && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {isLoading ? 'Loading Trial Data...' : 'Ready to Transform Your Data'}
        </h3>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          {isLoading
            ? 'Analyzing endpoints, subgroups, and safety data...'
            : 'Load clinical trial data and generate professional launch materials in minutes, not weeks.'}
        </p>

        {/* Demo Dataset Card - Light theme */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 max-w-md mx-auto mb-8 text-left shadow-lg border border-blue-100">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Featured Demo Dataset</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">Phase 3</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">NOVA-101</h4>
                <p className="text-gray-500 text-sm">Novaris™</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center py-2 border-b border-blue-100">
                <span className="text-gray-500 text-sm">Indication</span>
                <span className="font-medium text-gray-900 text-sm">Hereditary Angioedema</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-blue-100">
                <span className="text-gray-500 text-sm">Trial</span>
                <span className="font-medium text-gray-900 text-sm">SHIELD-1</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-blue-100">
                <span className="text-gray-500 text-sm">Patients</span>
                <span className="font-medium text-gray-900 text-sm">N = 264</span>
              </div>
            </div>

            {/* Key Result Highlight */}
            <div className="bg-gradient-to-r from-coral-50 to-rose-50 border border-coral-200 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-coral-500" />
                <span className="text-coral-600 text-sm font-medium">Primary Endpoint</span>
              </div>
              <span className="text-lg font-bold text-coral-600">78% reduction in monthly HAE attack rate</span>
            </div>
          </div>
        </div>

        {/* CTA Button - Enhanced */}
        <button
          onClick={handleLoad}
          disabled={isLoading}
          className="relative inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-coral-500 to-coral-600 text-white font-semibold rounded-xl hover:from-coral-600 hover:to-coral-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed btn-glow"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <Database className="w-5 h-5" />
              Load Demo Data
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="mt-6 text-xs text-gray-400">
          Production: Connect to SDTM datasets, upload TLF PDFs, or integrate via API
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Success Banner - Enhanced */}
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center animate-success-pop">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-emerald-800">Trial Data Loaded Successfully</p>
          <p className="text-sm text-emerald-600">{trialData.populations.itt.n} patients • {trialData.subgroups?.length || 0} subgroups • Ready for analysis</p>
        </div>
        <Award className="w-8 h-8 text-emerald-400" />
      </div>

      {/* Trial Overview - Enhanced Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Left: Trial Identity Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200/30 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Pill className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{trialData.compound}</h3>
                <p className="text-gray-500">{trialData.brandName}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Target className="w-4 h-4 text-coral-500" />
                <span className="text-gray-700">{trialData.indication}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700">{trialData.trialName} ({trialData.phase})</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="w-4 h-4 text-purple-500" />
                <span className="text-gray-700">{trialData.sponsor}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-blue-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                First-in-Class Therapy
              </span>
            </div>
          </div>
        </div>

        {/* Right: Key Stats */}
        <div className="space-y-4">
          {/* Primary Endpoint - Hero Stat */}
          <div className="relative overflow-hidden bg-gradient-to-br from-coral-50 to-rose-50 border border-coral-200 rounded-xl p-5">
            <div className="absolute top-0 right-0 w-20 h-20 bg-coral-200/50 rounded-full blur-2xl" />
            <div className="relative z-10">
              <p className="text-xs font-semibold text-coral-600 uppercase tracking-wide mb-2">Primary Endpoint Result</p>
              <p className="text-sm text-gray-600 mb-3">{trialData.primaryEndpoint.name}</p>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold text-coral-600">
                  {trialData.primaryEndpoint.reduction}%
                </span>
                <div className="pb-2">
                  <span className="text-sm text-gray-600">reduction in monthly attack rate</span>
                  <p className="text-xs font-semibold text-coral-600">p{trialData.primaryEndpoint.pValue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Population Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <Users className="w-5 h-5 text-blue-500 mb-2" />
              <p className="text-2xl font-bold text-gray-900">{trialData.populations.itt.n}</p>
              <p className="text-xs text-gray-500">ITT Population</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <Calendar className="w-5 h-5 text-purple-500 mb-2" />
              <p className="text-2xl font-bold text-gray-900">{trialData.design.duration}</p>
              <p className="text-xs text-gray-500">Study Duration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trial Design */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Trial Design</h4>
        <div className="bg-gray-50 rounded-xl p-5">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Design</p>
              <p className="font-semibold text-gray-900">{trialData.design.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Randomization</p>
              <p className="font-semibold text-gray-900">{trialData.design.randomization}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Treatment Arms</p>
              <p className="font-semibold text-gray-900">{trialData.design.arms.map(a => a.name).join(' vs ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mechanism of Action */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Mechanism of Action</h4>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
          <p className="text-sm text-gray-700 leading-relaxed">{trialData.moa.mechanism}</p>
          <div className="mt-3 flex items-center gap-2 text-sm font-medium text-blue-600">
            <Sparkles className="w-4 h-4" />
            {trialData.moa.differentiator}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-coral-500 to-coral-600 text-white font-semibold rounded-xl hover:from-coral-600 hover:to-coral-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] btn-glow"
        >
          Continue to Analysis
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
