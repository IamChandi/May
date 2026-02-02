import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  ChevronRight,
  Search,
  Layers,
  Database,
  BarChart3,
  FileOutput,
  FileText,
  BarChart2,
  Bot,
  Zap,
  Lightbulb,
  Rocket,
  HelpCircle
} from 'lucide-react';

// Contextual help content based on app state
const getContextualHelp = (appMode, activeStep, hasResults) => {
  if (appMode === 'research') {
    if (!hasResults) {
      return {
        title: 'Research Assistant',
        description: 'Search medical literature and synthesize findings with verified citations.',
        suggestions: [
          { text: 'How do I search for clinical evidence?', icon: Search },
          { text: 'What types of queries work best?', icon: Sparkles },
          { text: 'How are citations verified?', icon: FileText }
        ],
        quickActions: [
          'Try searching for "GLP-1 agonists efficacy in elderly patients"',
          'Include clinical trials for comprehensive results',
          'Use specific drug names or conditions for better results'
        ]
      };
    }
    if (activeStep === 'research') {
      return {
        title: 'Research Results',
        description: 'Review synthesized findings from your search.',
        suggestions: [
          { text: 'How do I interpret confidence levels?', icon: Sparkles },
          { text: 'Can I export these findings?', icon: FileOutput },
          { text: 'How do I visualize the data?', icon: BarChart2 }
        ],
        quickActions: [
          'Click on any finding to see the full citation',
          'Use Visualize tab to see charts and graphs',
          'Export tab lets you generate a manuscript'
        ]
      };
    }
    if (activeStep === 'visualize') {
      return {
        title: 'Data Visualization',
        description: 'Explore your research findings visually.',
        suggestions: [
          { text: 'What charts are available?', icon: BarChart2 },
          { text: 'Can I customize the visualizations?', icon: Sparkles },
          { text: 'How do I export charts?', icon: FileOutput }
        ],
        quickActions: [
          'Hover over chart elements for details',
          'Switch between chart types using tabs',
          'Continue to Export when ready'
        ]
      };
    }
    if (activeStep === 'manuscript') {
      return {
        title: 'Manuscript Export',
        description: 'Generate publication-ready documents.',
        suggestions: [
          { text: 'What formats can I export?', icon: FileOutput },
          { text: 'Are citations formatted automatically?', icon: FileText },
          { text: 'Can I edit the manuscript?', icon: Sparkles }
        ],
        quickActions: [
          'Review the generated manuscript sections',
          'Citations are auto-formatted in APA style',
          'Download as Word or PDF'
        ]
      };
    }
  }

  if (appMode === 'launch') {
    if (activeStep === 'load') {
      return {
        title: 'Launch Suite - Data',
        description: 'Load clinical trial data to generate launch materials.',
        suggestions: [
          { text: 'What data formats are supported?', icon: Database },
          { text: 'How is the demo data structured?', icon: Sparkles },
          { text: 'Can I upload my own trial data?', icon: FileOutput }
        ],
        quickActions: [
          'Click "Load Demo Data" to see a sample dataset',
          'Demo uses NOVA-101 Phase 3 HAE trial data',
          'Production version supports SDTM datasets'
        ]
      };
    }
    if (activeStep === 'analyze') {
      return {
        title: 'Launch Suite - Analysis',
        description: 'Review subgroup analysis and select data for deliverables.',
        suggestions: [
          { text: 'What is a forest plot?', icon: BarChart3 },
          { text: 'How do I select subgroups?', icon: Sparkles },
          { text: 'What does rate ratio mean?', icon: FileText }
        ],
        quickActions: [
          'Toggle between Forest Plot and Table views',
          'Check/uncheck subgroups to include in materials',
          'Selected subgroups appear in all generated deliverables'
        ]
      };
    }
    if (activeStep === 'generate') {
      return {
        title: 'Launch Suite - Export',
        description: 'Generate professional materials from your trial data.',
        suggestions: [
          { text: 'What deliverables can I create?', icon: FileOutput },
          { text: 'What\'s in the Training Deck?', icon: Layers },
          { text: 'How is AI content disclosed?', icon: Sparkles }
        ],
        quickActions: [
          'Training Deck: ~20 slides for HCP education',
          'Podium Deck: Conference presentation format',
          'Marketing Flyer: 1-page key messages summary',
          'All outputs include AI disclosure'
        ]
      };
    }
  }

  // Default fallback
  return {
    title: 'How can I help?',
    description: 'I can guide you through the Medical Affairs AI platform.',
    suggestions: [
      { text: 'What can this platform do?', icon: Sparkles },
      { text: 'How do I get started?', icon: Search },
      { text: 'Tell me about the Launch Suite', icon: Layers }
    ],
    quickActions: [
      'Research tab: Search and synthesize medical literature',
      'Launch Suite: Generate materials from clinical trial data'
    ]
  };
};

// Simulated AI responses
const getAIResponse = (question, appMode) => {
  const q = question.toLowerCase();

  // Research-related questions
  if (q.includes('search') || q.includes('query')) {
    return "To search effectively, enter your research question in the search bar. Use specific terms like drug names, conditions, or patient populations. For example: \"GLP-1 agonists efficacy in elderly patients with type 2 diabetes\". Toggle 'Include Clinical Trials' for comprehensive results.";
  }
  if (q.includes('citation') || q.includes('verified')) {
    return "All citations are verified against PubMed and clinical trial registries. Each finding shows a confidence level (High/Medium/Low) based on source quality, recency, and consistency across multiple sources. Green checkmarks indicate fully verified citations.";
  }
  if (q.includes('confidence')) {
    return "Confidence levels indicate how reliable a finding is:\n\n• **High**: Multiple high-quality sources agree\n• **Medium**: Good evidence with some variation\n• **Low**: Limited sources or conflicting data\n\nAlways review low-confidence findings carefully.";
  }
  if (q.includes('export') || q.includes('format')) {
    return "You can export your research as:\n\n• **Word Document**: Editable manuscript with formatted citations\n• **PDF**: Print-ready document\n• **Citations**: BibTeX or RIS format for reference managers\n\nAll exports include proper attribution and AI disclosure.";
  }
  if (q.includes('visualiz') || q.includes('chart')) {
    return "The Visualize tab offers several chart types:\n\n• **Timeline**: Publication trends over time\n• **Comparison**: Side-by-side efficacy data\n• **Distribution**: Study population demographics\n\nHover over elements for details. Charts can be exported as images.";
  }
  if (q.includes('edit') && q.includes('manuscript')) {
    return "Yes! The generated manuscript is fully editable. You can:\n\n• **Review sections**: Introduction, Methods, Results, Discussion\n• **Modify text**: Edit any section directly before exporting\n• **Adjust citations**: Add, remove, or reorder references\n• **Download**: Export as Word (.docx) for further editing in your preferred tool\n\nAll changes are reflected in the final export.";
  }

  // Launch Suite questions
  if (q.includes('forest plot')) {
    return "A forest plot visualizes treatment effects across subgroups. Each line shows:\n\n• **Diamond**: Point estimate (rate ratio)\n• **Horizontal line**: 95% confidence interval\n• **Vertical line at 1.0**: No effect reference\n\nResults to the left of 1.0 favor treatment.";
  }
  if (q.includes('rate ratio') || q.includes('rr')) {
    return "Rate Ratio (RR) compares event rates between treatment and placebo:\n\n• **RR < 1**: Treatment reduces events (good)\n• **RR = 1**: No difference\n• **RR > 1**: Treatment increases events\n\nFor example, RR=0.22 means 78% fewer events with treatment.";
  }
  if (q.includes('subgroup')) {
    return "Subgroup analysis shows if treatment works consistently across different patient populations (age, sex, disease severity, etc.). Select which subgroups to include in your deliverables by checking the boxes. The Overall Population is always included.";
  }
  if (q.includes('training deck') || q.includes('training')) {
    return "The Training Deck is a ~20 slide PowerPoint for HCP/KOL education. It includes:\n\n• Disease overview and unmet need\n• Mechanism of action\n• Trial design and methodology\n• Efficacy results with forest plot\n• Safety profile\n• Key takeaways";
  }
  if (q.includes('podium') || q.includes('conference')) {
    return "The Podium Deck is designed for scientific conferences. It includes detailed methodology slides, statistical analysis, and comprehensive results. The format follows standard medical conference presentation guidelines.";
  }
  if (q.includes('flyer') || q.includes('marketing')) {
    return "The Marketing Flyer is a 1-page PDF summary with:\n\n• Key efficacy headline\n• Main benefits bullet points\n• Mini forest plot\n• Safety highlights\n• Call to action\n\nPerfect for quick reference or leave-behind materials.";
  }
  if (q.includes('ai disclosure') || q.includes('disclosure') || q.includes('ai content')) {
    return "All generated materials include an AI disclosure statement indicating the content was created with AI assistance. This ensures transparency and compliance with regulatory guidelines. Always review outputs for accuracy before distribution.";
  }
  if (q.includes('demo data') || q.includes('structured')) {
    return "The demo dataset is a complete Phase 3 clinical trial for NOVA-101 (Novaris™), a first-in-class oral therapy for Hereditary Angioedema (HAE). It includes:\n\n• **Trial identity**: SHIELD-1, N=264, randomized controlled\n• **Primary endpoint**: Monthly HAE attack rate (78% reduction)\n• **Secondary endpoints**: Quality of life, rescue medication use\n• **Subgroup analysis**: 16 subgroups across age, sex, disease type, severity, and more\n• **Safety data**: TEAEs, SAEs, discontinuation rates";
  }
  if (q.includes('upload') && q.includes('data')) {
    return "In the current demo, data is pre-loaded for quick demonstration. In production, May will support:\n\n• **SDTM datasets**: Upload standardized clinical data directly\n• **TLF PDFs**: Parse tables, listings, and figures from PDF outputs\n• **API integration**: Connect to your clinical data warehouse\n• **Manual entry**: Input key endpoints and subgroup results manually\n\nContact your admin to enable data upload for your organization.";
  }
  if (q.includes('deliverable') && q.includes('create')) {
    return "The Launch Suite generates four professional deliverables:\n\n1. **Training Deck** (PPTX): ~20 slides for HCP/KOL education covering disease, MOA, efficacy, and safety\n2. **Podium Deck** (PPTX): ~15 slides for scientific conferences with detailed methodology\n3. **Marketing Flyer** (PDF): 1-page summary with key efficacy messages and visuals\n4. **Clinical Summary** (PDF): Detailed data summary with subgroup analysis table\n\nAll outputs include AI disclosure and are ready for MLR review.";
  }

  // General questions
  if (q.includes('what can') || q.includes('platform')) {
    return "Medical Affairs AI helps you:\n\n**Research Tab:**\n• Search medical literature with AI synthesis\n• Generate verified citations\n• Create publication-ready manuscripts\n\n**Launch Suite:**\n• Analyze clinical trial data\n• Generate training decks and presentations\n• Create marketing materials";
  }
  if (q.includes('get started') || q.includes('how do i')) {
    return appMode === 'research'
      ? "To get started:\n\n1. Enter your research question in the search bar\n2. Toggle 'Include Clinical Trials' if needed\n3. Click Search to find and synthesize literature\n4. Review findings, then Visualize or Export"
      : "To get started:\n\n1. Click 'Load Demo Data' to load sample trial data\n2. Review the trial overview and continue\n3. Select which subgroups to include\n4. Generate your deliverables (Training Deck, etc.)";
  }
  if (q.includes('launch suite')) {
    return "The Launch Suite helps teams with first-in-class drugs create professional materials from clinical trial data:\n\n• **Training Decks**: For HCP/KOL education\n• **Podium Decks**: For scientific conferences\n• **Marketing Flyers**: Quick-reference summaries\n\nAll outputs include proper AI disclosure.";
  }

  // Default response
  return "Hi, I'm May! I can help you navigate the Medical Affairs AI platform. Try asking about:\n\n• How to search for research\n• Understanding confidence levels\n• What the Launch Suite can do\n• Generating deliverables\n• Interpreting forest plots";
};

export default function AIAssistant({ appMode, activeStep, hasResults }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const contextHelp = getContextualHelp(appMode, activeStep, hasResults);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = { role: 'assistant', content: getAIResponse(text, appMode) };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion.text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button - Enhanced with pulse animation */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-16 right-6 z-50 w-14 h-14 rounded-2xl
          bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl
          flex items-center justify-center transition-all
          hover:scale-110 active:scale-95 hover:shadow-2xl
          ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        <span className="font-bold text-xl">M</span>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-2xl bg-blue-400 animate-ping opacity-30" />
        {/* Help badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
          <HelpCircle className="w-3 h-3 text-blue-500" />
        </span>
      </button>

      {/* Chat Panel - Enhanced */}
      <div
        className={`
          fixed bottom-16 right-6 z-50 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-100
          transition-all duration-300 origin-bottom-right overflow-hidden
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
        style={{ maxHeight: 'calc(100vh - 120px)' }}
      >
        {/* Header - Enhanced with gradient */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">May</h3>
                <p className="text-xs text-white/70">Medical Affairs AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-white/80" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[420px]">
          {messages.length === 0 ? (
            // Welcome state - Enhanced
            <div className="flex-1 p-4 overflow-y-auto">
              {/* Contextual description */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-sm text-gray-700">{contextHelp.description}</p>
              </div>

              {/* Suggestions - Enhanced cards */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-3.5 h-3.5 text-blue-500" />
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Ask Me Anything</p>
                </div>
                {contextHelp.suggestions.map((suggestion, i) => {
                  const Icon = suggestion.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center gap-3 p-3.5 bg-white border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 rounded-xl text-left transition-all group shadow-sm hover:shadow-md"
                    >
                      <div className="w-9 h-9 bg-gray-50 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                      </div>
                      <span className="text-sm text-gray-700 flex-1 font-medium">{suggestion.text}</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </button>
                  );
                })}
              </div>

              {/* Quick Tips - Enhanced */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-3.5 h-3.5 text-gray-500" />
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Quick Tips</p>
                </div>
                <ul className="space-y-2">
                  {contextHelp.quickActions.map((tip, i) => (
                    <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold">{i + 1}</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            // Chat messages - Enhanced
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                      <span className="text-white font-bold text-xs">M</span>
                    </div>
                  )}
                  <div
                    className={`
                      max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm
                      ${msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md'
                        : 'bg-white border border-gray-100 text-gray-700 rounded-bl-md'
                      }
                    `}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                    <span className="text-white font-bold text-xs">M</span>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input - Enhanced */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-200 disabled:to-gray-200 text-white disabled:text-gray-400 rounded-xl transition-all shadow-md hover:shadow-lg disabled:shadow-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="mt-2 text-xs text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear conversation
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
