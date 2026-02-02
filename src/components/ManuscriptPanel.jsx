import { useState } from 'react';
import {
  FileDown,
  FileText,
  ChevronDown,
  ChevronUp,
  Edit3,
  Loader2,
  Check,
  BookOpen,
  List,
  FlaskConical,
  BarChart3,
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { generateManuscript } from '../utils/manuscriptGenerator';
import { journalFormats } from '../data/demoData';

export default function ManuscriptPanel({ manuscript, findings }) {
  const [selectedJournal, setSelectedJournal] = useState('diabetes-care');
  const [expandedSections, setExpandedSections] = useState(['abstract']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [editableTitle, setEditableTitle] = useState(manuscript?.title || '');

  const sections = [
    { id: 'abstract', label: 'Abstract', icon: FileText, content: manuscript?.abstract },
    { id: 'introduction', label: 'Introduction', icon: BookOpen, content: manuscript?.sections?.introduction },
    { id: 'methods', label: 'Methods', icon: FlaskConical, content: manuscript?.sections?.methods },
    { id: 'results', label: 'Results', icon: BarChart3, content: manuscript?.sections?.results },
    { id: 'discussion', label: 'Discussion', icon: MessageSquare, content: manuscript?.sections?.discussion },
    { id: 'references', label: 'References', icon: List, content: null, isReferences: true }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateManuscript({
        ...manuscript,
        title: editableTitle || manuscript?.title
      }, selectedJournal);
      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 3000);
    } catch (error) {
      console.error('Error generating manuscript:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const selectedJournalInfo = journalFormats.find(j => j.id === selectedJournal);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-slate-900">Manuscript Draft</h2>
          <p className="text-gray-500 mt-1">AI-generated manuscript following IMRaD format</p>
        </div>
      </div>

      {/* Journal Selection & Download */}
      <div className="bg-white rounded-2xl shadow-medium border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          {/* Journal Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Journal Format
            </label>
            <div className="relative">
              <select
                value={selectedJournal}
                onChange={(e) => setSelectedJournal(e.target.value)}
                className="w-full appearance-none px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl
                         focus:border-coral-400 focus:ring-4 focus:ring-coral-100 focus:outline-none
                         text-slate-800 font-medium bg-white"
              >
                {journalFormats.map(journal => (
                  <option key={journal.id} value={journal.id}>
                    {journal.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {selectedJournalInfo && (
              <p className="mt-1 text-xs text-gray-500">
                Citation style: {selectedJournalInfo.style}
              </p>
            )}
          </div>

          {/* Download Button */}
          <div className="lg:flex-shrink-0">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className={`
                w-full lg:w-auto inline-flex items-center justify-center gap-2
                px-6 py-3 rounded-xl font-semibold shadow-soft
                transition-all duration-200
                ${downloadComplete
                  ? 'bg-sage-500 hover:bg-sage-600 text-white'
                  : 'bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : downloadComplete ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <FileDown className="w-5 h-5" />
                  <span>Download as Word</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Title Editor */}
      <div className="bg-white rounded-2xl shadow-medium border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Edit3 className="w-4 h-4 text-gray-400" />
          <label className="text-sm font-medium text-gray-700">Manuscript Title</label>
        </div>
        <textarea
          value={editableTitle}
          onChange={(e) => setEditableTitle(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl
                   focus:border-coral-400 focus:ring-4 focus:ring-coral-100 focus:outline-none
                   text-lg font-serif text-slate-800 resize-none"
          placeholder="Enter manuscript title..."
        />
      </div>

      {/* Section Previews */}
      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.includes(section.id);

          return (
            <div
              key={section.id}
              className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-coral-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-coral-600" />
                  </div>
                  <span className="font-semibold text-slate-800">{section.label}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="pl-11">
                    {section.isReferences ? (
                      <div className="space-y-3">
                        {manuscript?.references?.map((ref, index) => (
                          <div
                            key={ref.id}
                            className="flex gap-3 text-sm text-gray-700 py-2 border-b border-gray-100 last:border-0"
                          >
                            <span className="font-mono text-coral-600 flex-shrink-0">{index + 1}.</span>
                            <span className="leading-relaxed">{ref.text}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                        {section.content?.split('\n\n').map((para, i) => (
                          <p key={i} className="mb-3 last:mb-0">{para}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Disclosure Notice */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <FileCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-medium">AI Assistance Disclosure</p>
          <p className="mt-1 text-amber-700">
            This manuscript was drafted with AI assistance. All findings and citations have been
            verified against primary sources. Authors are responsible for the accuracy and integrity
            of all content before submission.
          </p>
        </div>
      </div>
    </div>
  );
}
