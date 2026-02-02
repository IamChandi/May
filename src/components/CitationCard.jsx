import { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Users,
  BookOpen,
  FlaskConical,
  BarChart3
} from 'lucide-react';
import ConfidenceBadge from './ConfidenceBadge';

const evidenceIcons = {
  'Meta-Analysis': BarChart3,
  'RCT': FlaskConical,
  'Cohort': Users,
  'Case Study': BookOpen
};

const evidenceColors = {
  'Meta-Analysis': 'bg-sage-100 text-sage-700',
  'RCT': 'bg-coral-100 text-coral-700',
  'Cohort': 'bg-amber-100 text-amber-700',
  'Case Study': 'bg-slate-100 text-slate-700'
};

export default function CitationCard({
  title,
  summary,
  source,
  evidenceLevel,
  sampleSize,
  confidence,
  isVerified = false,
  animationDelay = 0
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const EvidenceIcon = evidenceIcons[evidenceLevel] || BookOpen;

  const handleCopy = async () => {
    const citation = `${source.authors} ${title}. ${source.journal}. ${source.year}. PMID: ${source.pmid}${source.doi ? `. DOI: ${source.doi}` : ''}`;
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confidenceBorderColors = {
    HIGH: 'border-l-sage-500',
    MEDIUM: 'border-l-amber-400',
    LOW: 'border-l-coral-500'
  };

  return (
    <div
      className={`
        bg-white rounded-xl shadow-card border border-gray-100
        border-l-4 ${confidenceBorderColors[confidence] || 'border-l-gray-300'}
        overflow-hidden transition-all duration-300 hover:shadow-medium
        animate-slide-up
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isVerified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sage-100 text-sage-700 rounded text-xs font-medium">
                  <Check className="w-3 h-3" />
                  Verified
                </span>
              )}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${evidenceColors[evidenceLevel]}`}>
                <EvidenceIcon className="w-3 h-3" />
                {evidenceLevel}
              </span>
              {sampleSize && (
                <span className="text-xs text-gray-500">
                  N={sampleSize.toLocaleString()}
                </span>
              )}
            </div>

            <h3 className="font-semibold text-slate-900 text-base leading-snug">
              {title}
            </h3>
          </div>

          <ConfidenceBadge level={confidence} size="small" showProgress={false} />
        </div>

        {/* Summary */}
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          {summary}
        </p>

        {/* Source */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 truncate">
                <span className="font-medium text-slate-800">{source.authors}</span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                <span className="font-medium">{source.journal}</span>
                <span className="mx-1">&bull;</span>
                <span>{source.year}</span>
                <span className="mx-1">&bull;</span>
                <span className="font-mono text-coral-600">PMID: {source.pmid}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 ml-3">
              <button
                onClick={handleCopy}
                className="p-1.5 text-gray-400 hover:text-slate-800 hover:bg-gray-100 rounded transition-colors"
                title="Copy citation"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-sage-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${source.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-400 hover:text-coral-500 hover:bg-coral-50 rounded transition-colors"
                title="View on PubMed"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1.5 text-gray-400 hover:text-slate-800 hover:bg-gray-100 rounded transition-colors"
              >
                {expanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100 animate-fade-in">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Full Citation</p>
              <p className="text-gray-700 font-mono text-xs leading-relaxed">
                {source.authors} {title}. {source.journal}. {source.year}.
                {source.doi && ` DOI: ${source.doi}`}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Study Identifiers</p>
              <div className="space-y-1">
                <p className="text-gray-700 font-mono text-xs">PMID: {source.pmid}</p>
                {source.doi && (
                  <p className="text-gray-700 font-mono text-xs">DOI: {source.doi}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <ConfidenceBadge level={confidence} showProgress showDescription size="small" />
          </div>
        </div>
      )}
    </div>
  );
}
