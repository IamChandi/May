import { Dna } from 'lucide-react';

export default function Header({ onLogoClick }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-coral-500 to-coral-600 rounded-xl flex items-center justify-center">
              <Dna className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
                Medical Affairs AI
              </h1>
              <p className="text-xs text-gray-400">Evidence-based insights, verified citations</p>
            </div>
          </button>

          {/* Status Indicators */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span>Connected</span>
            </div>
            <div className="px-2.5 py-1 bg-gray-100 rounded-md">
              <span className="text-xs font-medium text-gray-500">Demo</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
