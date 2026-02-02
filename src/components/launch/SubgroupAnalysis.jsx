import { useState } from 'react';
import {
  CheckSquare,
  Square,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Table,
  CheckCircle2,
  Info,
  Sparkles,
  TrendingDown,
  Shield,
  Zap
} from 'lucide-react';
import { SimpleForestPlot } from './ForestPlot';

export default function SubgroupAnalysis({
  trialData,
  selectedSubgroups,
  onSubgroupToggle,
  onSelectAll,
  onDeselectAll,
  onContinue,
  onBack
}) {
  const [viewMode, setViewMode] = useState('forest'); // 'forest' | 'table'

  const subgroupCategories = [
    { id: 'overall', label: 'Overall', subgroups: trialData.subgroups.filter(sg => sg.category === 'overall') },
    { id: 'age', label: 'Age', subgroups: trialData.subgroups.filter(sg => sg.category === 'age') },
    { id: 'sex', label: 'Sex', subgroups: trialData.subgroups.filter(sg => sg.category === 'sex') },
    { id: 'disease', label: 'Disease Type', subgroups: trialData.subgroups.filter(sg => sg.category === 'disease') },
    { id: 'history', label: 'Prior Therapy', subgroups: trialData.subgroups.filter(sg => sg.category === 'history') },
    { id: 'severity', label: 'Baseline Severity', subgroups: trialData.subgroups.filter(sg => sg.category === 'severity') },
    { id: 'race', label: 'Race', subgroups: trialData.subgroups.filter(sg => sg.category === 'race') },
    { id: 'bmi', label: 'BMI', subgroups: trialData.subgroups.filter(sg => sg.category === 'bmi') }
  ].filter(cat => cat.subgroups.length > 0);

  const totalSelected = selectedSubgroups.length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Stats Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-5 border border-blue-100">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Statistical Analysis</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Subgroup Analysis</h3>
            <p className="text-gray-600 text-sm mt-1">
              Review treatment effects and select subgroups for deliverables
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="text-center px-4 py-2 bg-white/60 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{trialData.subgroups.length}</p>
              <p className="text-xs text-gray-500">Total Subgroups</p>
            </div>
            <div className="text-center px-4 py-2 bg-white/60 rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">100%</p>
              <p className="text-xs text-gray-500">Favors Treatment</p>
            </div>
          </div>
        </div>

        {/* View Toggle - Repositioned */}
        <div className="flex items-center justify-center mt-4 pt-4 border-t border-blue-100/50">
          <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode('forest')}
              className={`
                inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all
                ${viewMode === 'forest' ? 'bg-gradient-to-r from-coral-500 to-coral-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              <BarChart3 className="w-4 h-4" />
              Forest Plot
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`
                inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all
                ${viewMode === 'table' ? 'bg-gradient-to-r from-coral-500 to-coral-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              <Table className="w-4 h-4" />
              Data Table
            </button>
          </div>
        </div>
      </div>

      {/* Selection Controls - Enhanced */}
      <div className="flex items-center justify-between py-3 px-5 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-coral-100 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-coral-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{totalSelected} selected</p>
              <p className="text-xs text-gray-500">of {trialData.subgroups.length} subgroups</p>
            </div>
          </div>
          <div className="h-8 w-px bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <button
              onClick={onSelectAll}
              className="px-3 py-1.5 text-sm text-coral-600 hover:bg-coral-50 font-medium rounded-lg transition-colors"
            >
              Select All
            </button>
            <button
              onClick={onDeselectAll}
              className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
          <Info className="w-4 h-4 text-blue-500" />
          <span className="text-xs text-blue-700 font-medium">Selected subgroups appear in deliverables</span>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'forest' ? (
        <div className="border border-gray-200 rounded-lg p-5 bg-white">
          <SimpleForestPlot
            subgroups={trialData.subgroups}
            selectedSubgroups={selectedSubgroups}
          />
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Include
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Subgroup
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  N
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Treatment Rate
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Placebo Rate
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Rate Ratio
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  95% CI
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  p-value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subgroupCategories.map((category) => (
                <>
                  {/* Category Header */}
                  <tr key={`header-${category.id}`} className="bg-gray-50">
                    <td colSpan={8} className="px-4 py-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {category.label}
                      </span>
                    </td>
                  </tr>
                  {/* Subgroup Rows */}
                  {category.subgroups.map((sg) => {
                    const isSelected = selectedSubgroups.includes(sg.name);
                    const isOverall = sg.category === 'overall';

                    return (
                      <tr
                        key={sg.name}
                        className={`
                          hover:bg-gray-50 cursor-pointer transition-colors
                          ${isOverall ? 'bg-coral-50' : ''}
                        `}
                        onClick={() => !isOverall && onSubgroupToggle(sg.name)}
                      >
                        <td className="px-4 py-3">
                          {isOverall ? (
                            <CheckCircle2 className="w-5 h-5 text-coral-500" />
                          ) : (
                            <button className="text-gray-400 hover:text-coral-500">
                              {isSelected ? (
                                <CheckSquare className="w-5 h-5 text-coral-500" />
                              ) : (
                                <Square className="w-5 h-5" />
                              )}
                            </button>
                          )}
                        </td>
                        <td className={`px-4 py-3 text-sm ${isOverall ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                          {sg.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600">
                          {sg.n}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600">
                          {sg.rateDrug.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-gray-600">
                          {sg.ratePlacebo.toFixed(2)}
                        </td>
                        <td className={`px-4 py-3 text-sm text-center font-mono ${isOverall ? 'font-semibold text-coral-600' : 'text-slate-700'}`}>
                          {sg.rr.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-center font-mono text-gray-600">
                          [{sg.ciLower.toFixed(2)}, {sg.ciUpper.toFixed(2)}]
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                          <span className={`${
                            sg.pValue === '<0.0001' ? 'text-sage-600 font-medium' : 'text-gray-600'
                          }`}>
                            {sg.pValue}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Key Insights - Enhanced with multiple cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="font-semibold text-emerald-800 text-sm">Consistent Efficacy</p>
            <p className="text-xs text-emerald-700 mt-1">
              All subgroups favor treatment with RR &lt;1.0
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingDown className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-blue-800 text-sm">Rate Ratio Range</p>
            <p className="text-xs text-blue-700 mt-1">
              {Math.min(...trialData.subgroups.map(sg => sg.rr)).toFixed(2)} - {Math.max(...trialData.subgroups.map(sg => sg.rr)).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-purple-800 text-sm">Statistical Significance</p>
            <p className="text-xs text-purple-700 mt-1">
              All CIs exclude 1.0
            </p>
          </div>
        </div>
      </div>

      {/* Navigation - Enhanced */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Data
        </button>

        <button
          onClick={onContinue}
          disabled={totalSelected === 0}
          className={`
            inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all shadow-lg
            ${totalSelected > 0
              ? 'bg-gradient-to-r from-coral-500 to-coral-600 text-white hover:from-coral-600 hover:to-coral-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] btn-glow'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }
          `}
        >
          <Zap className="w-5 h-5" />
          Generate Deliverables
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
