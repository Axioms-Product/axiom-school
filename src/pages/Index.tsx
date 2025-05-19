
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { UserRound, School } from 'lucide-react';

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
        <div className="container mx-auto max-w-6xl items-center py-12">
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
            
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
              <h3 className="font-medium mb-2">School Information:</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="font-medium">Hours:</span> Monday to Saturday, 7 AM to 4 PM</li>
                <li><span className="font-medium">Location:</span> Bhabua, Bihar 821101</li>
                <li><span className="font-medium">Phone:</span> +91 8092710478</li>
                <li><span className="font-medium">Email:</span> axiomsproduct@gmail.com</li>
              </ul>
            </div>
          </div>
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
