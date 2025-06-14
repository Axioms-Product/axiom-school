
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Optimized keyframes for better mobile performance
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(var(--tx, 5px), var(--ty, 5px));
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
      opacity: 0.15;
    }
  }
`;
document.head.appendChild(style);

// Optimize viewport for mobile
const viewport = document.createElement('meta');
viewport.name = 'viewport';
viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
document.head.appendChild(viewport);

// Add mobile-web-app-capable for better mobile experience
const webAppCapable = document.createElement('meta');
webAppCapable.name = 'mobile-web-app-capable';
webAppCapable.content = 'yes';
document.head.appendChild(webAppCapable);

createRoot(document.getElementById("root")!).render(<App />);
