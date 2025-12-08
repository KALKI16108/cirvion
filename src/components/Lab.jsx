import React, { useState, useEffect } from 'react';
import { Play, Upload, Copy, Check } from 'lucide-react';

const Lab = () => {
  const [activeTab, setActiveTab] = useState('showcase');
  const [copied, setCopied] = useState(false);

  return (
    <section id="lab" className="relative py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden" aria-label="Automation Lab with live demos and interactive playground">
      {/* Matte black background */}
      <div className="absolute inset-0 bg-[#0B0B0B]"></div>

      {/* Subtle glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] md:w-[1000px] h-[400px] bg-[#10B981]/3 rounded-full blur-[160px] pointer-events-none" aria-hidden="true"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header with Tab Navigation */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
              <span className="text-white">Automation Lab</span>
            </h1>
            <p className="text-[#94A3B8] text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed font-light">
              Watch real-time automation in action. Mumbai-first solutions that save time, maximize accuracy, and multiply ROI.
            </p>
            <p className="sr-only">
              Explore live automation demos and an interactive playground featuring Lead Qualifier, Invoice Reader, and Hinglish Parser tools. See real-time processing, efficiency metrics, and business outcomes powered by AI.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 sm:gap-4 border-b border-slate-700" role="tablist">
            <button
              onClick={() => setActiveTab('showcase')}
              role="tab"
              aria-selected={activeTab === 'showcase'}
              aria-controls="showcase-panel"
              id="showcase-tab"
              className={`px-4 sm:px-6 py-3 font-mono text-sm sm:text-base font-semibold transition-all border-b-2 ${
                activeTab === 'showcase'
                  ? 'border-[#10B981] text-[#10B981]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Live Demos
            </button>
            <button
              onClick={() => setActiveTab('playground')}
              role="tab"
              aria-selected={activeTab === 'playground'}
              aria-controls="playground-panel"
              id="playground-tab"
              className={`px-4 sm:px-6 py-3 font-mono text-sm sm:text-base font-semibold transition-all border-b-2 ${
                activeTab === 'playground'
                  ? 'border-[#10B981] text-[#10B981]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Playground
            </button>
          </div>
        </div>

        {/* Showcase Tab */}
        <div
          id="showcase-panel"
          role="tabpanel"
          aria-labelledby="showcase-tab"
          hidden={activeTab !== 'showcase'}
        >
          {activeTab === 'showcase' && <AutomationShowcase />}
        </div>

        {/* Playground Tab */}
        <div
          id="playground-panel"
          role="tabpanel"
          aria-labelledby="playground-tab"
          hidden={activeTab !== 'playground'}
        >
          {activeTab === 'playground' && <AIPlayground />}
        </div>
      </div>

      {/* Scanlines animation keyframes */}
      <style>{`
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 49% { border-right-color: #10B981; }
          50%, 100% { border-right-color: transparent; }
        }
        @keyframes fillCircle {
          0% { 
            stroke-dasharray: 339.29, 339.29;
            stroke-dashoffset: 0;
          }
          100% { 
            stroke-dasharray: 339.29, 339.29;
            stroke-dashoffset: 339.29;
          }
        }
        .typing-cursor {
          animation: blink 1s infinite;
          border-right: 2px solid #10B981;
          padding-right: 2px;
        }
      `}</style>
    </section>
  );
};

const AutomationShowcase = () => {
  const demos = [
    {
      id: 1,
      title: 'Omni-Scraper',
      description: 'Scraping local Mumbai property listings into a WhatsApp-ready database in seconds.',
      metrics: { timeSaved: '95%', accuracy: '99.8%', roi: '10x' },
      icon: '📍',
    },
    {
      id: 2,
      title: 'Fin-Automation',
      description: 'AI Invoice Reader that extracts GST, vendor info, and line items into Google Sheets instantly.',
      metrics: { timeSaved: '98%', accuracy: '99.9%', roi: '15x' },
      icon: '📄',
    },
    {
      id: 3,
      title: 'Lead-Sync',
      description: 'Connecting Instagram DMs directly to a CRM with automated AI follow-ups.',
      metrics: { timeSaved: '90%', accuracy: '99.5%', roi: '12x' },
      icon: '💬',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Grid of Execution Modules */}
      <article className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
        {demos.map((demo) => (
          <article
            key={demo.id}
            className="group relative bg-black border border-slate-700 rounded-xl overflow-hidden hover:border-[#10B981] transition-all duration-300"
          >
            {/* Status Monitor Header */}
            <header className="bg-gradient-to-r from-slate-900 to-slate-800/50 px-4 sm:px-5 md:px-6 py-3 sm:py-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-lg sm:text-2xl" aria-hidden="true">{demo.icon}</span>
                <div>
                  <h3 className="text-sm sm:text-base font-mono font-bold text-white">{demo.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">LIVE</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-mono text-[#10B981] font-bold">UPTIME</p>
                <p className="text-xs sm:text-sm font-mono text-slate-300">100%</p>
              </div>
            </header>

            {/* Video Frame with Scanline Effect */}
            <div className="relative bg-black aspect-video overflow-hidden group" role="img" aria-label={`${demo.title} demo video`}>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
                <button 
                  className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#10B981] rounded-full hover:bg-[#059669] transition-all duration-300 shadow-lg shadow-[#10B981]/50"
                  aria-label={`Play ${demo.title} demo video`}
                >
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black fill-black" />
                </button>
                <p className="absolute bottom-4 left-4 text-xs sm:text-sm text-slate-500 font-mono">
                  Demo Video
                </p>
              </div>

              {/* Scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 1) 2px, rgba(0, 0, 0, 1) 4px)',
                  animation: 'scanlines 8s linear infinite',
                }}
                aria-hidden="true"
              ></div>

              <div className="absolute inset-0 border border-[#10B981]/10 group-hover:border-[#10B981]/30 transition-all duration-300 pointer-events-none rounded-lg" aria-hidden="true"></div>
            </div>

            {/* Description */}
            <section className="px-4 sm:px-5 md:px-6 py-4 sm:py-5 border-b border-slate-700">
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-light">
                {demo.description}
              </p>
            </section>

            {/* Metrics */}
            <footer className="px-4 sm:px-5 md:px-6 py-5 sm:py-6 space-y-3 sm:space-y-4">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Metrics</p>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 sm:p-4 text-center hover:border-slate-600 transition-all">
                  <p className="text-xs text-slate-400 font-mono mb-1">Time Saved</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#10B981]">{demo.metrics.timeSaved}</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 sm:p-4 text-center hover:border-slate-600 transition-all">
                  <p className="text-xs text-slate-400 font-mono mb-1">Accuracy</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#10B981]">{demo.metrics.accuracy}</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 sm:p-4 text-center hover:border-slate-600 transition-all">
                  <p className="text-xs text-slate-400 font-mono mb-1">ROI</p>
                  <p className="text-lg sm:text-2xl font-bold text-[#10B981]">{demo.metrics.roi}</p>
                </div>
              </div>
            </footer>

            <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/0 via-transparent to-[#10B981]/0 group-hover:from-[#10B981]/5 group-hover:to-[#10B981]/5 pointer-events-none transition-all duration-300" aria-hidden="true"></div>
          </article>
        ))}
      </article>

      {/* CTA */}
      <div className="text-center">
        <p className="text-[#94A3B8] text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
          Ready to automate your business workflow?
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-[#10B981]/10 border border-[#10B981] text-[#10B981] font-mono font-semibold rounded-lg hover:bg-[#10B981] hover:text-black transition-all duration-300 text-sm sm:text-base"
        >
          Schedule Demo
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
};

const AIPlayground = () => {
  const [activePlayground, setActivePlayground] = useState('lead-qualifier');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState('');

  const playgrounds = {
    'lead-qualifier': {
      title: 'Lead Qualifier',
      description: 'Automatically qualify incoming leads with AI-powered intent analysis.',
      placeholder: 'E.g., "Hi, I want a 3BHK in Worli"',
      mockResult: {
        status: 'URGENT',
        action: 'Forward to WhatsApp',
        budget: 'High',
        location: 'Worli',
      },
    },
    'invoice-reader': {
      title: 'Invoice Reader',
      description: 'Extract invoice data including GST, vendor info, and line items automatically.',
      placeholder: 'Upload invoice image or paste OCR text...',
      mockResult: {
        vendor: 'MH-Electric',
        gst: '27AABCM5678K1Z0',
        total: '₹14,500',
        items: 3,
      },
    },
    'hinglish-parser': {
      title: 'Hinglish Parser',
      description: 'Parse and understand Hinglish text to extract intent, time, and platform.',
      placeholder: 'E.g., "Bhai, meeting 4 baje rkhna"',
      mockResult: {
        intent: 'Schedule Meeting',
        time: '16:00 (4:00 PM)',
        platform: 'Calendar Entry',
        language: 'Hinglish',
      },
    },
  };

  const current = playgrounds[activePlayground];

  const handleRun = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setConsoleOutput('');
    setResult(null);

    // Simulate typing animation in console
    const messages = [
      `$ Processing: "${input}"...`,
      `> Initializing ${activePlayground}-v2.0...`,
      `> Scanning input patterns...`,
      `> Cross-referencing database...`,
      `✓ Complete!`,
    ];

    for (const msg of messages) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setConsoleOutput((prev) => prev + msg + '\n');
    }

    // Simulate loading progress
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setResult(current.mockResult);
  };

  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12">
      {/* Sandbox Mode Label */}
      <div className="inline-block px-3 sm:px-4 py-2 bg-[#10B981]/10 border border-[#10B981]/30 rounded-lg">
        <p className="text-xs sm:text-sm font-mono text-[#10B981] font-bold">
          ⚡ SANDBOX MODE - LIVE DATA PROCESSING ENABLED
        </p>
      </div>

      {/* Playground Selector */}
      <fieldset className="space-y-3 sm:space-y-4">
        <legend className="sr-only">Select automation playground tool</legend>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {Object.keys(playgrounds).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActivePlayground(key);
                setInput('');
                setResult(null);
                setConsoleOutput('');
              }}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-mono text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activePlayground === key
                  ? 'bg-[#10B981] text-black border border-[#10B981]'
                  : 'bg-slate-900/50 text-slate-300 border border-slate-700 hover:border-slate-600'
              }`}
              title={playgrounds[key].description}
            >
              {playgrounds[key].title}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Two-Pane Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Control Panel (Left) */}
        <form className="bg-black border border-slate-700 rounded-xl overflow-hidden" onSubmit={(e) => { e.preventDefault(); handleRun(); }}>
          {/* Header */}
          <header className="bg-gradient-to-r from-slate-900 to-slate-800/50 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700">
            <h3 className="text-sm sm:text-base font-mono font-bold text-[#10B981]">CONTROL PANEL</h3>
          </header>

          {/* Content */}
          <div className="p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="playground-input" className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-widest block mb-2 sm:mb-3">
                Input
              </label>
              <textarea
                id="playground-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={current.placeholder}
                disabled={isLoading}
                className="w-full h-24 sm:h-32 bg-slate-900 border border-slate-700 rounded-lg px-4 sm:px-5 py-3 sm:py-4 font-mono text-sm text-[#10B981] placeholder-slate-600 focus:outline-none focus:border-[#10B981] disabled:opacity-50 transition-all resize-none"
                aria-describedby="playground-description"
              />
              <p id="playground-description" className="sr-only">{current.description}</p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-[#10B981] text-black font-mono font-bold rounded-lg hover:bg-[#059669] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Run Automation</span>
              </button>
              <button type="button" className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-900 border border-slate-700 text-slate-300 font-mono rounded-lg hover:border-slate-600 transition-all flex items-center justify-center" aria-label="Upload file">
                <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </form>

        {/* Real-time Console (Right) */}
        <div className="bg-black border border-slate-700 rounded-xl overflow-hidden flex flex-col">
          {/* Header */}
          <header className="bg-gradient-to-r from-slate-900 to-slate-800/50 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700">
            <h3 className="text-sm sm:text-base font-mono font-bold text-[#10B981]">REAL-TIME CONSOLE</h3>
          </header>

          {/* Console Output */}
          <output className="flex-1 p-5 sm:p-6 md:p-8 bg-gradient-to-b from-slate-900/20 to-transparent overflow-y-auto">
            {isLoading || consoleOutput ? (
              <div className="font-mono text-xs sm:text-sm text-[#10B981] space-y-1 sm:space-y-2 whitespace-pre-wrap break-words">
                {consoleOutput}
                {isLoading && <span className="typing-cursor">█</span>}
              </div>
            ) : result ? (
              <div className="space-y-3 sm:space-y-4">
                <p className="font-mono text-xs sm:text-sm text-[#10B981] mb-4">✓ Process completed successfully</p>
                <div className="space-y-2 sm:space-y-3">
                  {Object.entries(result).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs sm:text-sm font-mono bg-slate-900/30 border border-slate-700 rounded px-3 sm:px-4 py-2 sm:py-3">
                      <span className="text-slate-400">{key}:</span>
                      <span className="text-[#10B981] font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-slate-600 font-mono text-xs sm:text-sm">
                {'>'} Waiting for input... Ready to process.
              </p>
            )}
          </output>

          {/* Scanline effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-3"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 1) 2px, rgba(0, 0, 0, 1) 4px)',
              animation: 'scanlines 8s linear infinite',
            }}
            aria-hidden="true"
          ></div>
        </div>
      </div>

      {/* Info */}
      <aside className="bg-slate-900/30 border border-slate-700 rounded-lg p-4 sm:p-6">
        <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
          <span className="text-[#10B981] font-mono font-bold">Note:</span> This is a sandbox environment with mocked responses for demo purposes. 
          Results are simulated to showcase the workflow and capabilities of our automation engine.
        </p>
      </aside>
    </div>
  );
};

export default Lab;


