import { useState } from 'react';
import {
  FileText,
  FlaskConical,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Users
} from 'lucide-react';
import CitationCard from './CitationCard';
import ConfidenceBadge, { ConfidenceBar } from './ConfidenceBadge';

export default function ResearchResults({
  findings = [],
  trials = [],
  query = '',
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState('findings');

  // Calculate overall confidence based on findings
  const overallConfidence = calculateOverallConfidence(findings);
  const highConfidenceCount = findings.filter(f => f.confidence === 'HIGH').length;
  const totalSampleSize = findings.reduce((acc, f) => acc + (f.sampleSize || 0), 0);

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="bg-gradient-to-br from-white to-coral-50 rounded-2xl shadow-medium border border-coral-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-coral-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-coral-600" />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-xl text-slate-900 mb-2">Executive Summary</h2>
              <p className="text-gray-600 leading-relaxed">
                Analysis of <span className="font-semibold text-slate-800">{findings.length} peer-reviewed sources</span> and{' '}
                <span className="font-semibold text-slate-800">{trials.length} clinical trials</span> for:{' '}
                <span className="italic">&quot;{query}&quot;</span>
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Confidence:</span>
                  <ConfidenceBar level={overallConfidence} />
                  <ConfidenceBadge level={overallConfidence} size="small" showProgress={false} />
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {findings.length} sources
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    N={totalSampleSize.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="px-6 py-3 bg-white/50 border-t border-coral-100 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <span className="text-gray-600">
              <span className="font-semibold text-sage-600">{highConfidenceCount}</span> high-confidence findings
            </span>
            <span className="text-gray-600">
              <span className="font-semibold text-coral-600">{trials.length}</span> active/completed trials
            </span>
          </div>

          <button
            onClick={() => onNavigate?.('visualize')}
            className="inline-flex items-center gap-1 text-sm text-coral-600 hover:text-coral-700 font-medium"
          >
            View Visualizations
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        <TabButton
          active={activeTab === 'findings'}
          onClick={() => setActiveTab('findings')}
          icon={FileText}
          label="Key Findings"
          count={findings.length}
        />
        <TabButton
          active={activeTab === 'trials'}
          onClick={() => setActiveTab('trials')}
          icon={FlaskConical}
          label="Clinical Trials"
          count={trials.length}
        />
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {activeTab === 'findings' ? (
          <div className="space-y-4">
            {findings.map((finding, index) => (
              <CitationCard
                key={finding.id}
                {...finding}
                animationDelay={index * 100}
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {trials.map((trial, index) => (
              <TrialCard key={trial.nctId} trial={trial} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
        transition-all duration-200
        ${active
          ? 'bg-white text-slate-800 shadow-soft'
          : 'text-gray-500 hover:text-slate-800'
        }
      `}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      <span className={`
        px-1.5 py-0.5 rounded text-xs font-semibold
        ${active ? 'bg-coral-100 text-coral-700' : 'bg-gray-200 text-gray-600'}
      `}>
        {count}
      </span>
    </button>
  );
}

function TrialCard({ trial, index }) {
  const statusColors = {
    'Completed': 'bg-sage-100 text-sage-700 border-sage-200',
    'Active, not recruiting': 'bg-amber-100 text-amber-700 border-amber-200',
    'Recruiting': 'bg-coral-100 text-coral-700 border-coral-200',
    'Not yet recruiting': 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const statusColor = statusColors[trial.status] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <div
      className="bg-white rounded-xl shadow-card border border-gray-100 p-5
                 hover:shadow-medium transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded border text-xs font-medium ${statusColor}`}>
              {trial.status}
            </span>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium">
              {trial.phase}
            </span>
          </div>

          <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">
            {trial.title}
          </h3>

          <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
            <span className="font-mono text-coral-600">{trial.nctId}</span>
            <span>N={trial.enrollment.toLocaleString()}</span>
          </div>
        </div>

        <a
          href={`https://clinicaltrials.gov/study/${trial.nctId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-400 hover:text-coral-500 hover:bg-coral-50
                   rounded-lg transition-colors flex-shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-gray-400 uppercase tracking-wide">Sponsor</p>
          <p className="text-slate-800 font-medium mt-0.5">{trial.sponsor}</p>
        </div>
        <div>
          <p className="text-gray-400 uppercase tracking-wide">Timeline</p>
          <p className="text-slate-800 font-medium mt-0.5">
            {trial.startDate} — {trial.completionDate}
          </p>
        </div>
      </div>
    </div>
  );
}

function calculateOverallConfidence(findings) {
  if (findings.length === 0) return 'MEDIUM';

  const scores = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  const totalScore = findings.reduce((acc, f) => acc + (scores[f.confidence] || 2), 0);
  const avgScore = totalScore / findings.length;

  if (avgScore >= 2.5) return 'HIGH';
  if (avgScore >= 1.5) return 'MEDIUM';
  return 'LOW';
}
