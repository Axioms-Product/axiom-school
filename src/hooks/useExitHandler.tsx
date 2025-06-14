
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useExitHandler = () => {
  const [showExitDialog, setShowExitDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let blockNavigation = false;

    // Handle browser back button
    const handlePopState = (event: PopStateEvent) => {
      if (location.pathname.startsWith('/dashboard')) {
        event.preventDefault();
        setShowExitDialog(true);
        blockNavigation = true;
        // Push the current state back to prevent navigation
        window.history.pushState(null, '', location.pathname);
      }
    };

    // Handle browser/tab close
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (location.pathname.startsWith('/dashboard')) {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to leave?';
        return 'Are you sure you want to leave?';
      }
    };

    // Add initial history state
    if (location.pathname.startsWith('/dashboard')) {
      window.history.pushState(null, '', location.pathname);
    }

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);

  const handleConfirmExit = () => {
    setShowExitDialog(false);
    // Navigate to login or close app
    navigate('/login', { replace: true });
  };

  const handleCancelExit = () => {
    setShowExitDialog(false);
  };

  return {
    showExitDialog,
    setShowExitDialog,
    handleConfirmExit,
    handleCancelExit,
  };
};
