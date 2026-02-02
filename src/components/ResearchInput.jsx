import { useState } from 'react';
import { Search, FlaskConical, Sparkles, Loader2, ChevronDown } from 'lucide-react';
import { exampleQueries } from '../data/demoData';

export default function ResearchInput({
  onSearch,
  isSearching = false,
  includeTrials = true,
  onIncludeTrialsChange
}) {
  const [query, setQuery] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isSearching) {
      onSearch(query.trim());
    }
  };

  const handleExampleClick = (example) => {
    setQuery(example);
    setShowExamples(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-5">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your research question..."
              className="w-full pl-12 pr-4 py-3.5 text-base border border-gray-200 rounded-lg
                       focus:border-coral-400 focus:ring-2 focus:ring-coral-100 focus:outline-none
                       transition-all placeholder-gray-400"
              disabled={isSearching}
            />
          </div>

          {/* Options Row */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Example Queries Toggle */}
              <button
                type="button"
                onClick={() => setShowExamples(!showExamples)}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-coral-600 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Examples</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
              </button>

              {/* Include Trials Checkbox */}
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeTrials}
                  onChange={(e) => onIncludeTrialsChange?.(e.target.checked)}
                  className="w-4 h-4 text-coral-500 rounded border-gray-300 focus:ring-coral-400 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-600 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-sage-600" />
                  Include trials
                </span>
              </label>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={!query.trim() || isSearching}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral-500 text-white
                       font-medium rounded-lg shadow-sm hover:bg-coral-600
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-150"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>

          {/* Example Queries Dropdown */}
          {showExamples && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {exampleQueries.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleExampleClick(example)}
                    className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-coral-50
                             text-gray-700 hover:text-coral-700 rounded-md transition-colors
                             border border-transparent hover:border-coral-200"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>

        {/* Loading State */}
        {isSearching && (
          <div className="px-5 pb-5">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-coral-200 border-t-coral-500 rounded-full animate-spin" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Searching databases</p>
                  <p className="text-xs text-gray-500">
                    PubMed{includeTrials ? ' • ClinicalTrials.gov' : ''}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <ProgressStep label="Connecting to sources" done />
                <ProgressStep label="Retrieving articles" active />
                {includeTrials && <ProgressStep label="Fetching trials" />}
                <ProgressStep label="Synthesizing results" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressStep({ label, done = false, active = false }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`
        w-1.5 h-1.5 rounded-full
        ${done ? 'bg-emerald-500' : active ? 'bg-coral-500 animate-pulse' : 'bg-gray-300'}
      `} />
      <span className={`text-xs ${done ? 'text-emerald-600' : active ? 'text-coral-600' : 'text-gray-400'}`}>
        {label}
      </span>
      {done && <span className="text-emerald-500 text-xs">✓</span>}
    </div>
  );
}
