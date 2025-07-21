
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
preloadFont.addEventListener('load', function() { 
  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.href = this.href;
  document.head.appendChild(styleLink);
});
document.head.appendChild(preloadFont);

// Enhanced styles with new animations
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

  @keyframes float {
    0%, 100% { 
      transform: translateY(0px) rotate(0deg); 
    }
    50% { 
      transform: translateY(-10px) rotate(5deg); 
    }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .animate-gradient {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
  }
`;
document.head.appendChild(style);

// Create root and render
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
