
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add keyframes for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translate(0, 0);
    }
    25%, 75% {
      transform: translate(var(--tx, 10px), var(--ty, 10px));
    }
    50% {
      transform: translate(var(--tx2, -10px), var(--ty2, -10px));
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.15;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
      opacity: 0.2;
    }
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
