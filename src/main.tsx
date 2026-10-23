import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

declare global {
  interface Window {
    __BARNABY_BUSTER_MOUNTED__?: boolean;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  window.__BARNABY_BUSTER_MOUNTED__ = true;
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
} else {
  console.error('Fatal: Failed to find #root element in document.');
}

