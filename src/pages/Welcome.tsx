
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Get Detailed Analytics",
      subtitle: "Complete the quiz to get a detailed report of your performance and challenge yourself to achieve more.",
      image: "/lovable-uploads/a04b2cf5-ff1c-4eb2-ae57-585579c75e47.png"
    },
    {
      id: 2,
      title: "Track Your Progress",
      subtitle: "Monitor your learning journey with comprehensive analytics and personalized insights.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Interactive Learning",
      subtitle: "Engage with interactive content designed to enhance your educational experience.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Personalized Education",
      subtitle: "Get customized learning paths tailored to your individual needs and goals.",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Collaborative Learning",
      subtitle: "Connect with peers and teachers in a collaborative learning environment.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      navigate('/login');
    } else {
      nextSlide();
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200/30 rounded-full blur-xl"></div>
      </div>

      <div className="w-full max-w-sm mx-auto relative z-10">
        {/* Phone-like container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 py-2 text-xs font-medium">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black/50 rounded-full"></div>
              </div>
              <svg className="w-4 h-3 ml-1" viewBox="0 0 24 18" fill="currentColor">
                <path d="M2 4.5h20v9H2z"/>
                <path d="M23 7.5h1v3h-1z"/>
              </svg>
              <div className="w-6 h-3 bg-black rounded-sm ml-1"></div>
            </div>
          </div>

          {/* Content area */}
          <div className="px-8 py-8 h-full flex flex-col">
            {/* Main illustration */}
            <div className="flex-1 flex items-center justify-center mb-8">
              <div className="relative w-64 h-64">
                <img 
                  src={slides[currentSlide].image} 
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* Page indicators */}
            <div className="flex justify-center gap-2 mb-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gray-900 w-6' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Skip
              </Button>
              
              <Button
                onClick={handleNext}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-medium"
              >
                {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
