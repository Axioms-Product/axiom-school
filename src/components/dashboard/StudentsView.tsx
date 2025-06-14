
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Users, Mail, Phone, User, BookOpen, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';

const StudentsView = () => {
  const { currentUser } = useAuth();
  const { getStudentsForClass } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Only teachers should see this page
  const isTeacher = currentUser?.role === 'teacher';
  const allStudents = getStudentsForClass(currentUser?.class || '');

  // Memoized filtered students for performance
  const students = useMemo(() => {
    if (!searchTerm) return allStudents;
    return allStudents.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allStudents, searchTerm]);

  const handleViewProfile = (studentId: string) => {
    // Navigate to profile with student ID as query parameter
    navigate(`/dashboard/profile?studentId=${studentId}`);
  };

  if (!isTeacher) {
    return (
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Students</h1>
        <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700">
          <CardContent className="p-4">
            <p className="text-sm sm:text-base">This page is only available for teachers.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Class Students</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            View and manage students in Class {currentUser?.class}
          </p>
        </div>
        <Badge variant="secondary" className="text-sm sm:text-lg px-3 py-1 sm:py-2 self-start sm:self-center">
          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          {students.length} Students
        </Badge>
      </div>

      {/* Search Bar */}
      {allStudents.length > 0 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
      )}

      {allStudents.length === 0 ? (
        <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
            <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
              <Users className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
            </div>
            <h3 className="mt-4 text-base sm:text-lg font-medium">No students found</h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground text-center max-w-md">
              There are currently no students assigned to Class {currentUser?.class}.
            </p>
          </CardContent>
        </Card>
      ) : students.length === 0 ? (
        <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
            <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
            </div>
            <h3 className="mt-4 text-base sm:text-lg font-medium">No matching students</h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground text-center max-w-md">
              No students found matching "{searchTerm}".
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-all duration-200 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium text-xs sm:text-sm">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-sm sm:text-lg truncate">{student.name}</CardTitle>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">@{student.username}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                  <span className="truncate">{student.email}</span>
                </div>
                
                {student.phone && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                    <span className="truncate">{student.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 flex-shrink-0" />
                  <span>Class {student.class}</span>
                </div>
                
                {student.joiningDate && (
                  <div className="text-xs text-muted-foreground">
                    Joined: {new Date(student.joiningDate).toLocaleDateString()}
                  </div>
                )}
                
                <div className="pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 text-xs sm:text-sm transition-all duration-200"
                    onClick={() => handleViewProfile(student.id)}
                  >
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Class Information Summary */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Class Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{allStudents.length}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Students</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-green-600">Class {currentUser?.class}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Your Class</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">{currentUser?.subject}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Your Subject</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsView;
