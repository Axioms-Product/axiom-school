
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Users, ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ClassSelectorProps {
  selectedClass?: string;
  onClassChange: (classId: string) => void;
}

const ClassSelector = ({ selectedClass, onClassChange }: ClassSelectorProps) => {
  const { currentUser } = useAuth();
  
  if (currentUser?.role !== 'teacher' || !currentUser.classes || currentUser.classes.length <= 1) {
    return null;
  }

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Managing Class</h3>
              <p className="text-xs text-gray-500">Select class to manage</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Badge variant="secondary">
                  Class {selectedClass || currentUser.classes[0]}
                </Badge>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {currentUser.classes.map((classId) => (
                <DropdownMenuItem
                  key={classId}
                  onClick={() => onClassChange(classId)}
                  className="flex items-center justify-between"
                >
                  <span>Class {classId}</span>
                  {(selectedClass || currentUser.classes![0]) === classId && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassSelector;
