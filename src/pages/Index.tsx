
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedBackground from '@/components/AnimatedBackground';
import { ArrowRight, UserRound, School } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      
      <header className="relative z-10 px-6 pt-6 md:px-10 md:pt-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cgs-blue to-cgs-purple animate-pulse-glow"></div>
            <h1 className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue to-cgs-purple">
              Axioms School
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative z-10 px-6">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center py-12">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue via-cgs-purple to-cgs-pink">
              Welcome to Axioms School
            </h2>
            <p className="text-lg md:text-xl text-foreground/80">
              A modern school management system designed for teachers and students to
              collaborate seamlessly and stay on top of their academic journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')} 
                className="bg-gradient-to-r from-cgs-blue to-cgs-purple hover:opacity-90 transition-all"
              >
                <UserRound className="mr-2 h-5 w-5" />
                Login as Student
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-cgs-purple text-cgs-purple hover:bg-cgs-purple/10"
              >
                <School className="mr-2 h-5 w-5" />
                Login as Teacher
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="card-3d bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 animate-float">
              <CardContent className="p-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-cgs-blue/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cgs-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Homework Management</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Easily assign and manage homework for your class.
                </p>
              </CardContent>
            </Card>

            <Card className="card-3d bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 animate-float" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-cgs-purple/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cgs-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Notices & Announcements</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Stay updated with important school announcements.
                </p>
              </CardContent>
            </Card>

            <Card className="card-3d bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 animate-float" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-cgs-pink/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cgs-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Events Calendar</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Track important school events and activities.
                </p>
              </CardContent>
            </Card>

            <Card className="card-3d bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 animate-float" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-cgs-orange/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cgs-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Messaging</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Direct communication between students and teachers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="relative z-10 bg-white/5 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-6 px-6 md:px-10">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © 2025 Axioms School. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
