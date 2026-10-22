import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Automatically recover from stale chunks caused by new deployments or CDN cache updates
window.addEventListener('vite:preloadError', (event) => {
  console.warn('Vite preload error detected. Reloading to fetch latest deployment chunks...', event);
  const reloadKey = 'aiflowix_chunk_reload';
  const lastReload = sessionStorage.getItem(reloadKey);
  const now = Date.now();
  // Throttle reload to prevent infinite loops (max once per 15 seconds)
  if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
    sessionStorage.setItem(reloadKey, String(now));
    window.location.reload();
  }
});

// Catch unhandled dynamic module fetch errors globally to ensure users are never left on a broken screen
window.addEventListener('error', (event) => {
  const msg = event?.message || '';
  if (/Failed to fetch dynamically imported module/i.test(msg)) {
    console.warn('Dynamic import module error detected:', msg);
    const reloadKey = 'aiflowix_chunk_reload';
    const lastReload = sessionStorage.getItem(reloadKey);
    const now = Date.now();
    if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
      sessionStorage.setItem(reloadKey, String(now));
      window.location.reload();
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
