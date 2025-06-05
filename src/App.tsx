
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import SplashScreen from '@/components/SplashScreen';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import HomeView from '@/components/dashboard/HomeView';
import HomeworkView from '@/components/dashboard/HomeworkView';
import NoticesView from '@/components/dashboard/NoticesView';
import EventsView from '@/components/dashboard/EventsView';
import MarksView from '@/components/dashboard/MarksView';
import MessagesView from '@/components/dashboard/MessagesView';
import ExamScheduleView from '@/components/dashboard/ExamScheduleView';
import TeachersView from '@/components/dashboard/TeachersView';
import StudentsView from '@/components/dashboard/StudentsView';
import ProfilePage from '@/pages/ProfilePage';
import HelpSupportPage from '@/pages/HelpSupportPage';
import NotFound from '@/pages/NotFound';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashProgress, setSplashProgress] = useState(0);

  useEffect(() => {
    // Simulate loading with progress
    const progressInterval = setInterval(() => {
      setSplashProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Hide splash screen after reaching 100%
          setTimeout(() => setShowSplash(false), 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Minimum splash screen duration of 5 seconds
    const splashTimer = setTimeout(() => {
      setSplashProgress(100);
    }, 4000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(splashTimer);
    };
  }, []);

  if (showSplash) {
    return <SplashScreen progress={splashProgress} />;
  }

  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard/home" replace />} />
              <Route path="home" element={<HomeView />} />
              <Route path="homework" element={<HomeworkView />} />
              <Route path="notices" element={<NoticesView />} />
              <Route path="events" element={<EventsView />} />
              <Route path="marks" element={<MarksView />} />
              <Route path="messages" element={<MessagesView />} />
              <Route path="exams" element={<ExamScheduleView />} />
              <Route path="teachers" element={<TeachersView />} />
              <Route path="students" element={<StudentsView />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="/help" element={<HelpSupportPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
