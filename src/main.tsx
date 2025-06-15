
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Minimal essential viewport meta tag
const viewport = document.createElement('meta');
viewport.name = 'viewport';
viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover';
document.head.appendChild(viewport);

// Essential mobile web app meta
const webAppCapable = document.createElement('meta');
webAppCapable.name = 'mobile-web-app-capable';
webAppCapable.content = 'yes';
document.head.appendChild(webAppCapable);

// Preload critical font
const preloadFont = document.createElement('link');
preloadFont.rel = 'preload';
preloadFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
preloadFont.as = 'style';
preloadFont.onload = function() { this.rel = 'stylesheet'; };
document.head.appendChild(preloadFont);

// Performance optimization styles
const style = document.createElement('style');
style.textContent = `
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .optimized-scroll {
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }
  
  .gpu-accelerated {
    transform: translateZ(0);
    will-change: transform;
  }
  
  .will-change-transform {
    will-change: transform;
  }
  
  .will-change-auto {
    will-change: auto;
  }
`;
document.head.appendChild(style);

// Create root and render immediately
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
