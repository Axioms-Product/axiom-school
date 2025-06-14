
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Welcome from '@/pages/Welcome';
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
import ClassMembersView from '@/components/dashboard/ClassMembersView';
import AttendanceView from '@/components/dashboard/AttendanceView';
import ProfilePage from '@/pages/ProfilePage';
import HelpSupportPage from '@/pages/HelpSupportPage';
import NotFound from '@/pages/NotFound';

function App() {
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
            <Routes>
              <Route path="/" element={<Welcome />} />
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
            <Toaster />
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
