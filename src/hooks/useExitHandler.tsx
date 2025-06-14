
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useExitHandler = () => {
  const [showExitDialog, setShowExitDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isDashboard = location.pathname.startsWith('/dashboard');
    
    if (!isDashboard) return;

    // Handle browser back button
    const handlePopState = (event: PopStateEvent) => {
      console.log('PopState event triggered - showing exit dialog');
      event.preventDefault();
      setShowExitDialog(true);
      // Push the current state back to prevent actual navigation
      window.history.pushState(null, '', window.location.pathname);
    };

    // Handle browser/tab close attempt
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      console.log('BeforeUnload event triggered');
      const message = 'Are you sure you want to leave? Your progress may be lost.';
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    // Handle Escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('Escape key pressed - showing exit dialog');
        event.preventDefault();
        setShowExitDialog(true);
      }
    };

    // Add initial history state to enable back button detection
    window.history.pushState(null, '', window.location.pathname);

    // Add event listeners
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('keydown', handleKeyDown);

    console.log('Exit handler initialized for dashboard');

    // Cleanup function
    return () => {
      console.log('Cleaning up exit handler');
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [location.pathname]);

  const handleConfirmExit = () => {
    console.log('Exit confirmed - attempting to close app');
    setShowExitDialog(false);
    
    // Try multiple methods to exit the app
    try {
      // Method 1: Try to close the window (works if opened by script)
      window.close();
      
      // Method 2: If it's a PWA or mobile app, try navigation
      if (window.navigator && 'app' in window.navigator) {
        // @ts-ignore
        window.navigator.app.exitApp();
      }
      
      // Method 3: Navigate to about:blank as fallback
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 100);
      
    } catch (error) {
      console.log('Could not close app automatically, navigating to login');
      // Fallback: navigate to login
      navigate('/login', { replace: true });
    }
  };

  const handleCancelExit = () => {
    console.log('Exit cancelled');
    setShowExitDialog(false);
    // Ensure we maintain the history state for future back button presses
    window.history.pushState(null, '', window.location.pathname);
  };

  return {
    showExitDialog,
    setShowExitDialog,
    handleConfirmExit,
    handleCancelExit,
  };
};
