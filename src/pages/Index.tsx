
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { UserRound, School, Settings, BookOpen, GraduationCap, Users, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <AnimatedBackground />
      
      <header className="relative z-10 px-6 pt-6 md:px-10 md:pt-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-cgs-blue to-cgs-purple shadow-lg flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue to-cgs-purple">
                Axioms School
              </h1>
              <p className="text-sm text-muted-foreground">Excellence in Education</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative z-10 px-6 py-10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Modern School Management System
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
                    Welcome to
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue via-cgs-purple to-cgs-pink">
                    Axioms School
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Empowering education through technology. A comprehensive platform connecting teachers, students, and administrators in one seamless experience.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/login')} 
                  className="bg-gradient-to-r from-cgs-blue to-cgs-purple hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                >
                  <UserRound className="mr-2 h-5 w-5" />
                  Login as Student
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="border-2 border-cgs-purple text-cgs-purple hover:bg-cgs-purple/10 transition-all transform hover:scale-105"
                >
                  <School className="mr-2 h-5 w-5" />
                  Login as Teacher
                </Button>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
                <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-white/20">
                  <Users className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Student Portal</h3>
                  <p className="text-sm text-gray-600">Access homework, marks & more</p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-white/20">
                  <BookOpen className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Teacher Tools</h3>
                  <p className="text-sm text-gray-600">Manage classes efficiently</p>
                </div>
                <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 col-span-2 md:col-span-1">
                  <Calendar className="h-8 w-8 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Real-time Updates</h3>
                  <p className="text-sm text-gray-600">Stay connected always</p>
                </div>
              </div>
            </div>
            
            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cgs-blue/20 to-cgs-purple/20 rounded-3xl transform rotate-3"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
                  alt="Students in classroom"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Excellence in Education</h3>
                  <p className="text-white/90">Nurturing minds, building futures</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
          
          {/* School Information Card */}
          <div className="mt-16 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20">
            <h3 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue to-cgs-purple">
              School Information
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">School Hours</h4>
                <p className="text-sm text-gray-600">Mon-Sat, 7 AM to 4 PM</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Location</h4>
                <p className="text-sm text-gray-600">Bhabua, Bihar 821101</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Phone</h4>
                <p className="text-sm text-gray-600">+91 8092710478</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="text-sm text-gray-600">axiomsproduct@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 bg-white/5 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-8 px-6 md:px-10">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              © 2025 Axioms School. All rights reserved.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs">
              Developed with ❤️ by <span className="font-semibold">Satyam Rojha</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
