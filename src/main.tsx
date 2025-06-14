
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Minimal optimized keyframes for better mobile performance
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(2px, 2px); }
  }
  
  @keyframes pulse {
    0%, 100% { 
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.1;
    }
    50% { 
      transform: translate(-50%, -50%) scale(1.02);
      opacity: 0.15;
    }
  }
`;
document.head.appendChild(style);

// Optimize viewport for mobile with minimal settings
const viewport = document.createElement('meta');
viewport.name = 'viewport';
viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
document.head.appendChild(viewport);

// Add minimal mobile optimizations
const webAppCapable = document.createElement('meta');
webAppCapable.name = 'mobile-web-app-capable';
webAppCapable.content = 'yes';
document.head.appendChild(webAppCapable);

// Preload critical resources
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
preloadLink.as = 'style';
document.head.appendChild(preloadLink);

// Create root and render with minimal delay
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
