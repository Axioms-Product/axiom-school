
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from '@/components/ProtectedRoute';

import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';
import ProfilePage from '@/pages/ProfilePage';

import HomeView from '@/components/dashboard/HomeView';
import HomeworkView from '@/components/dashboard/HomeworkView';
import NoticesView from '@/components/dashboard/NoticesView';
import EventsView from '@/components/dashboard/EventsView';
import MarksView from '@/components/dashboard/MarksView';
import MessagesView from '@/components/dashboard/MessagesView';
import TeachersView from '@/components/dashboard/TeachersView';
import ExamScheduleView from '@/components/dashboard/ExamScheduleView';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                <Route path="" element={<Navigate to="home" replace />} />
                <Route path="home" element={<HomeView />} />
                <Route path="homework" element={<HomeworkView />} />
                <Route path="notices" element={<NoticesView />} />
                <Route path="events" element={<EventsView />} />
                <Route path="marks" element={<MarksView />} />
                <Route path="messages" element={<MessagesView />} />
                <Route path="teachers" element={<TeachersView />} />
                <Route path="exams" element={<ExamScheduleView />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
              
              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="top-right" />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
