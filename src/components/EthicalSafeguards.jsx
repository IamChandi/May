import { ShieldCheck, FileText, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

export default function EthicalSafeguards({
  sourcesVerified = { verified: 0, total: 0 },
  citationsGenerated = 0,
  confidenceLevel = 'HIGH',
  lastUpdated = new Date()
}) {
  const allVerified = sourcesVerified.verified === sourcesVerified.total && sourcesVerified.total > 0;

  const confidenceConfig = {
    HIGH: { color: 'text-emerald-600', bgColor: 'bg-emerald-50', label: 'High' },
    MEDIUM: { color: 'text-amber-600', bgColor: 'bg-amber-50', label: 'Medium' },
    LOW: { color: 'text-red-600', bgColor: 'bg-red-50', label: 'Low' }
  };

  const config = confidenceConfig[confidenceLevel] || confidenceConfig.MEDIUM;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200/60 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-11 flex items-center justify-between">
          {/* Left Section - Source Verification */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              {allVerified ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-xs text-gray-600">
                <span className="font-medium">{sourcesVerified.verified}</span>
                <span className="text-gray-400">/{sourcesVerified.total} verified</span>
              </span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-gray-200" />

            <div className="hidden sm:flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-600">
                <span className="font-medium">{citationsGenerated}</span>
                <span className="text-gray-400"> citations</span>
              </span>
            </div>

            <div className="hidden md:block w-px h-4 bg-gray-200" />

            <div className="hidden md:flex items-center">
              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${config.bgColor} ${config.color}`}>
                {config.label}
              </span>
            </div>
          </div>

          {/* Right Section - Warnings and Timestamp */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 border border-amber-100 rounded">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs text-amber-700">
                AI-Generated
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDate(lastUpdated)}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function formatDate(date) {
  if (!date) return 'N/A';

  const now = new Date();
  const d = new Date(date);

  // If today, show time
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  // Otherwise show date
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
