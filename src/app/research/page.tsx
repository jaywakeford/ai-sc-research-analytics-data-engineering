'use client';

import React from 'react';
import PdfViewer from '@/components/PdfViewer';
import AudioPlayer from '@/components/AudioPlayer';

type TabId = 'agents' | 'interpreter' | 'ml' | 'powerbi';

interface ResearchPaper {
  title: string;
  pdfPath: string;
  audioPath: string;
}

type Papers = {
  [K in TabId]: ResearchPaper;
};

const ResearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TabId>('agents');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true);
    // Simulate loading time for tab change
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const papers: Papers = {
    agents: {
      title: 'AI Agent Systems Research',
      pdfPath: 'agents-research-b.pdf',
      audioPath: 'ai-agent-systems-for-finance-and-macroeconomics.mp3'
    },
    interpreter: {
      title: 'Open Interpreter Integration',
      pdfPath: 'open-interpreter-c.pdf',
      audioPath: 'automating-workflows-with-open-interpreter.mp3'
    },
    ml: {
      title: 'Independent Machine Learning Research',
      pdfPath: 'independent-ml-learning-model-d.pdf',
      audioPath: 'independent-machine-learning-research-in-financial-trading.mp3'
    },
    powerbi: {
      title: 'PowerBI Analytics System Research',
      pdfPath: 'powerbi-analytics-development-a.pdf',
      audioPath: 'power-bi-analytics-for-at-the-money-trading.mp3'
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-indigo-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 gradient-text">Research Papers</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of research papers exploring AI innovation, machine learning applications,
            and advanced analytics in financial systems.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('agents')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'agents' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            AI Agent Systems Research
          </button>
          <button
            onClick={() => setActiveTab('interpreter')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'interpreter' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Open Interpreter Integration
          </button>
          <button
            onClick={() => setActiveTab('ml')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'ml' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            Independent Machine Learning Research
          </button>
          <button
            onClick={() => setActiveTab('powerbi')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'powerbi' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            PowerBI Analytics Research
          </button>
        </div>

        <div className="glass-card p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-white">{papers[activeTab].title}</h2>
          <div className="mb-8">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="loading-spinner" />
              </div>
            ) : (
              <PdfViewer src={papers[activeTab].pdfPath} />
            )}
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-white">Audio Summary</h3>
            <AudioPlayer
              src={papers[activeTab].audioPath}
              title={`${papers[activeTab].title} - Audio Summary`}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-left-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ResearchPage; 