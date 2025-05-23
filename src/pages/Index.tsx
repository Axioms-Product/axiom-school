
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { UserRound, School, Calendar, BookOpen, GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

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
      
      <header className="relative z-10 px-4 sm:px-6 pt-6 md:px-10 md:pt-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-tr from-cgs-blue to-cgs-purple shadow-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue to-cgs-purple">
                Axioms School
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Excellence in Education</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative z-10 px-4 py-6 sm:px-6 sm:py-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4 sm:space-y-6">
                <motion.div 
                  className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs sm:text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  School Management System
                </motion.div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
                    Welcome to
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue via-cgs-purple to-cgs-pink">
                    Axioms School
                  </span>
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  A comprehensive platform connecting teachers, students, and administrators in one seamless experience.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/login')} 
                    className="w-full sm:w-auto bg-gradient-to-r from-cgs-blue to-cgs-purple hover:opacity-90 transition-all shadow-lg"
                  >
                    <UserRound className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Login as Student
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => navigate('/login')}
                    className="w-full sm:w-auto border-2 border-cgs-purple text-cgs-purple hover:bg-cgs-purple/10 transition-all"
                  >
                    <School className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Login as Teacher
                  </Button>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right Content - Hero Image */}
            <motion.div 
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cgs-blue/20 to-cgs-purple/20 rounded-3xl transform rotate-3"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
                  alt="Students in classroom"
                  className="w-full h-[400px] lg:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Excellence in Education</h3>
                  <p className="text-white/90 text-sm sm:text-base">Nurturing minds, building futures</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* School Information Card - Simplified for mobile */}
          <motion.div 
            className="mt-10 lg:mt-16 bg-white/90 backdrop-blur-md p-5 sm:p-8 rounded-2xl shadow-xl border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue to-cgs-purple">
              Contact Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-3 sm:p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">School Hours</h4>
                <p className="text-xs sm:text-sm text-gray-600">Mon-Sat, 7 AM - 4 PM</p>
              </div>
              <div className="text-center p-3 sm:p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Location</h4>
                <p className="text-xs sm:text-sm text-gray-600">Bhabua, Bihar 821101</p>
              </div>
              <div className="text-center p-3 sm:p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Phone</h4>
                <p className="text-xs sm:text-sm text-gray-600">+91 8092710478</p>
              </div>
              <div className="text-center p-3 sm:p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h4>
                <p className="text-xs sm:text-sm text-gray-600 truncate">axiomsproduct@gmail.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 bg-white/5 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-4 sm:py-6 px-4 sm:px-6 md:px-10">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
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
