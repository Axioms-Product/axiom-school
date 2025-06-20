
import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import SplashScreen from '@/components/SplashScreen';
import { ExitConfirmDialog } from '@/components/ExitConfirmDialog';
import { useExitHandler } from '@/hooks/useExitHandler';
import { Skeleton, SkeletonCard } from '@/components/ui/skeleton';

// Lazy load components for better performance
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const HomeView = lazy(() => import('@/components/dashboard/HomeView'));
const HomeworkView = lazy(() => import('@/components/dashboard/HomeworkView'));
const NoticesView = lazy(() => import('@/components/dashboard/NoticesView'));
const EventsView = lazy(() => import('@/components/dashboard/EventsView'));
const MarksView = lazy(() => import('@/components/dashboard/MarksView'));
const MessagesView = lazy(() => import('@/components/dashboard/MessagesView'));
const ExamScheduleView = lazy(() => import('@/components/dashboard/ExamScheduleView'));
const TeachersView = lazy(() => import('@/components/dashboard/TeachersView'));
const StudentsView = lazy(() => import('@/components/dashboard/StudentsView'));
const ClassMembersView = lazy(() => import('@/components/dashboard/ClassMembersView'));
const AttendanceView = lazy(() => import('@/components/dashboard/AttendanceView'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const HelpSupportPage = lazy(() => import('@/pages/HelpSupportPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Enhanced loading fallback component with skeleton UI
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div className="max-w-4xl mx-auto">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600 font-medium">Loading content...</p>
        </div>
      </div>
    </div>
  </div>
);

function AppContent() {
  const { showExitDialog, handleConfirmExit, handleCancelExit } = useExitHandler();

  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
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
            <Route path="class-members" element={<ClassMembersView />} />
            <Route path="attendance" element={<AttendanceView />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="/help" element={<HelpSupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      
      <ExitConfirmDialog
        open={showExitDialog}
        onOpenChange={handleCancelExit}
        onConfirm={handleConfirmExit}
      />
      
      <Toaster />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Extended loading to 5 seconds with smooth progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Keep splash screen for 5 seconds total
          setTimeout(() => setIsLoading(false), 5000);
          return 100;
        }
        return prev + Math.random() * 20; // Slower progress for 5 second duration
      });
    }, 100); // More frequent updates for smoother animation

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <SplashScreen progress={progress} />;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <DataProvider>
          <Router>
            <AppContent />
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
