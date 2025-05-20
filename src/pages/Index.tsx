
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { UserRound, School, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard/home');
    }
  }, [isAuthenticated, navigate]);

  // Auto-advance slides
  useEffect(() => {
    if (!autoplayEnabled) return;
    
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [currentSlide, autoplayEnabled]);

  const slides = [
    {
      title: "Welcome to Axioms School",
      description: "A modern school management system designed for teachers, students and administrators.",
      image: "https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Complete Student Management",
      description: "Track academics, homework, fees and communicate with teachers easily.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Advanced Teacher Tools",
      description: "Manage homework, mark attendance and grades, and stay in touch with your students.",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=2069&auto=format&fit=crop"
    },
    {
      title: "Administrative Controls",
      description: "Comprehensive tools for school administrators to handle operations efficiently.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const handleSkip = () => {
    setCurrentSlide(slides.length - 1);
    setAutoplayEnabled(false);
  };

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
          
          {currentSlide < slides.length - 1 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSkip} 
              className="text-sm"
            >
              Skip
            </Button>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative z-10 px-6 py-10">
        <div className="container mx-auto max-w-6xl items-center">
          <div className="relative overflow-hidden rounded-xl">
            {slides.map((slide, index) => (
              <div 
                key={index} 
                className={`transition-all duration-500 ease-in-out absolute inset-0 ${
                  index === currentSlide 
                    ? "opacity-100 translate-x-0" 
                    : index < currentSlide 
                      ? "opacity-0 -translate-x-full" 
                      : "opacity-0 translate-x-full"
                }`}
                style={{
                  zIndex: index === currentSlide ? 10 : 0,
                  display: Math.abs(index - currentSlide) <= 1 ? 'block' : 'none'
                }}
              >
                <div className="md:grid md:grid-cols-2 gap-4 p-2 md:p-0">
                  <div className="p-6 md:p-10 flex flex-col justify-center order-2 md:order-1">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue via-cgs-purple to-cgs-pink mb-4 animate-fade-in">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-foreground/80 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      {slide.description}
                    </p>
                    
                    {index === slides.length - 1 && (
                      <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
                        <Button 
                          size="lg" 
                          variant="secondary" 
                          onClick={() => navigate('/login')}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                          <Settings className="mr-2 h-5 w-5" />
                          Login as Admin
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="rounded-xl overflow-hidden relative h-64 md:h-auto order-1 md:order-2 animate-scale-in">
                    <div 
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ 
                        backgroundImage: `url(${slide.image})`,
                        filter: 'brightness(0.9)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent md:bg-gradient-to-l" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Slide indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-6 bg-cgs-purple" : "w-2 bg-gray-300 dark:bg-gray-700"
                }`}
                onClick={() => {
                  setCurrentSlide(index);
                  setAutoplayEnabled(false);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {currentSlide === slides.length - 1 && (
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="font-medium mb-2">School Information:</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="font-medium">Hours:</span> Monday to Saturday, 7 AM to 4 PM</li>
                <li><span className="font-medium">Location:</span> Bhabua, Bihar 821101</li>
                <li><span className="font-medium">Phone:</span> +91 8092710478</li>
                <li><span className="font-medium">Email:</span> axiomsproduct@gmail.com</li>
              </ul>
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 bg-white/5 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-6 px-6 md:px-10">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © 2025 Axioms School. All rights reserved. <span className="block sm:inline">Developed with ❤️ by Satyam Rojha</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
