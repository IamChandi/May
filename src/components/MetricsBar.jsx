import { useEffect, useState } from 'react';
import { FileText, FlaskConical, Quote, Clock, Zap, CheckCircle2, TrendingUp } from 'lucide-react';

export default function MetricsBar({
  papersScanned = 0,
  trialsFound = 0,
  citationsGenerated = 0,
  timeElapsed = 0,
  isSearching = false
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-5 shadow-lg border border-blue-100">
      {/* Animated background gradient */}
      {isSearching && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-transparent to-blue-100/50 animate-pulse" />
      )}

      {/* Scan line effect */}
      {isSearching && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"
               style={{ animation: 'scanLine 2s linear infinite' }} />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isSearching ? (
              <div className="flex items-center gap-2 text-blue-600">
                <div className="relative">
                  <Zap className="w-5 h-5 animate-pulse" />
                  <div className="absolute inset-0 animate-ping">
                    <Zap className="w-5 h-5 text-blue-500 opacity-50" />
                  </div>
                </div>
                <span className="text-sm font-semibold uppercase tracking-wide">Analyzing in Real-Time</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">Analysis Complete</span>
              </div>
            )}
          </div>

          {/* Time savings callout */}
          <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-white/60 rounded-lg border border-blue-100">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <div className="text-xs">
              <span className="text-gray-500">Saved </span>
              <span className="text-emerald-600 font-bold">4-6 weeks</span>
              <span className="text-gray-500"> of manual research</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricItem
            icon={FileText}
            label="Papers Analyzed"
            value={papersScanned}
            isAnimating={isSearching}
            color="coral"
          />
          <MetricItem
            icon={FlaskConical}
            label="Clinical Trials"
            value={trialsFound}
            isAnimating={isSearching}
            color="blue"
          />
          <MetricItem
            icon={Quote}
            label="Citations Ready"
            value={citationsGenerated}
            isAnimating={isSearching}
            color="emerald"
          />
          <MetricItem
            icon={Clock}
            label="Processing Time"
            value={formatTime(timeElapsed)}
            suffix=""
            isAnimating={isSearching}
            color="purple"
          />
        </div>
      </div>
    </div>
  );
}

function MetricItem({ icon: Icon, label, value, suffix = '', isAnimating = false, color = 'coral' }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const colorClasses = {
    coral: { bg: 'bg-coral-100', text: 'text-coral-500', glow: 'shadow-coral-200' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-500', glow: 'shadow-blue-200' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-500', glow: 'shadow-emerald-200' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-500', glow: 'shadow-purple-200' }
  };

  const colors = colorClasses[color];

  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 600;
      const steps = 30;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
          if (value > 0 && !hasAnimated) {
            setHasAnimated(true);
          }
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-3 group">
      <div className={`
        relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
        ${isAnimating ? `${colors.bg} shadow-lg ${colors.glow}` : 'bg-white/60'}
        ${!isAnimating && hasAnimated ? 'bg-white' : ''}
      `}>
        <Icon className={`w-5 h-5 transition-colors ${isAnimating ? colors.text : 'text-gray-400'} ${!isAnimating && hasAnimated ? 'text-gray-700' : ''}`} />
        {isAnimating && (
          <div className="absolute inset-0 rounded-xl animate-ping opacity-30">
            <div className={`w-full h-full rounded-xl ${colors.bg}`} />
          </div>
        )}
      </div>
      <div>
        <p className={`text-2xl font-bold text-gray-900 stat-number ${hasAnimated && !isAnimating ? 'animate-count-up' : ''}`}>
          {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
          {suffix}
        </p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

export function AnimatedMetricsBar({ isSearching, hasResults }) {
  const [metrics, setMetrics] = useState({
    papersScanned: 0,
    trialsFound: 0,
    citationsGenerated: 0,
    timeElapsed: 0
  });

  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          papersScanned: Math.min(prev.papersScanned + Math.floor(Math.random() * 50) + 10, 847),
          trialsFound: Math.min(prev.trialsFound + Math.floor(Math.random() * 3) + 1, 24),
          citationsGenerated: Math.min(prev.citationsGenerated + Math.floor(Math.random() * 5) + 1, 12),
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 200);

      return () => clearInterval(interval);
    } else if (hasResults) {
      setMetrics({
        papersScanned: 847,
        trialsFound: 24,
        citationsGenerated: 12,
        timeElapsed: metrics.timeElapsed
      });
    }
  }, [isSearching, hasResults]);

  return (
    <MetricsBar
      {...metrics}
      isSearching={isSearching}
    />
  );
}
