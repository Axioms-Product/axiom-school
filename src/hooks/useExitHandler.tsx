
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
      console.log('PopState event triggered');
      event.preventDefault();
      setShowExitDialog(true);
      // Push the current state back to prevent navigation
      window.history.pushState(null, '', window.location.pathname);
    };

    // Handle browser/tab close
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      console.log('BeforeUnload event triggered');
      event.preventDefault();
      event.returnValue = 'Are you sure you want to leave?';
      return 'Are you sure you want to leave?';
    };

    // Handle Android back button
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        console.log('Escape key pressed');
        setShowExitDialog(true);
      }
    };

    // Add initial history state to enable back button detection
    window.history.pushState(null, '', window.location.pathname);

    // Add event listeners
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [location.pathname]);

  const handleConfirmExit = () => {
    console.log('Exit confirmed');
    setShowExitDialog(false);
    // Navigate to login
    navigate('/login', { replace: true });
  };

  const handleCancelExit = () => {
    console.log('Exit cancelled');
    setShowExitDialog(false);
  };

  return {
    showExitDialog,
    setShowExitDialog,
    handleConfirmExit,
    handleCancelExit,
  };
};
