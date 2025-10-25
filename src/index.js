import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import ChapterViewer from './components/ChapterViewer';

// Import Kendo UI theme
import '@progress/kendo-theme-default/dist/all.css';

function App() {
  const [randomTrigger, setRandomTrigger] = React.useState(0);
  const [copyStatus, setCopyStatus] = React.useState('');
  const lastClickRef = React.useRef(0);

  const handleRandomChapter = () => {
    const now = Date.now();
    // Prevent clicks faster than once per 500ms
    if (now - lastClickRef.current > 500) {
      lastClickRef.current = now;
      setRandomTrigger(prev => prev + 1);
    }
  };

  const copyToClipboard = async () => {
    try {
      const url = window.location.origin + '/tao.md';
      await navigator.clipboard.writeText(url);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.origin + '/tao.md';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus(''), 2000);
      } catch (fallbackErr) {
        setCopyStatus('Copy failed');
        setTimeout(() => setCopyStatus(''), 2000);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <main role="main" className="app-container">
      <header className="app-header">
        <h1 className="app-title">Tao Te Ching</h1>
        <button 
          className="app-subtitle app-subtitle-button" 
          onClick={handleRandomChapter}
          aria-label="Get random chapter"
          title="Click for a random chapter"
        >
          ☯️
        </button>
      </header>
      <div className="app-content">
        <ChapterViewer randomTrigger={randomTrigger} />
      </div>
      <footer className="app-footer">
        <div className="download-section">
          <div className="download-buttons">
            <a 
              href="/tao.md" 
              download="tao-te-ching.md"
              className="download-link"
              title="Download complete Tao Te Ching as Markdown file"
            >
              📄 Download Tao Te Ching (Markdown)
            </a>
            <button 
              onClick={copyToClipboard}
              className="copy-button"
              title="Copy URL to clipboard"
            >
              📋 Copy URL
            </button>
          </div>
          {copyStatus && (
            <p className="copy-status">{copyStatus}</p>
          )}
        </div>
      </footer>
    </main>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
