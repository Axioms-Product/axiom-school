
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Users, Mail, Phone, User, BookOpen } from 'lucide-react';

const StudentsView = () => {
  const { currentUser } = useAuth();
  const { getStudentsForClass } = useData();

  // Only teachers should see this page
  const isTeacher = currentUser?.role === 'teacher';
  const students = getStudentsForClass(currentUser?.class || '');

  if (!isTeacher) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700">
          <CardContent className="p-4">
            <p>This page is only available for teachers.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Class Students</h1>
          <p className="text-muted-foreground mt-1">
            View and manage students in Class {currentUser?.class}
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          <Users className="h-4 w-4 mr-1" />
          {students.length} Students
        </Badge>
      </div>

      {students.length === 0 ? (
        <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
              <Users className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No students found</h3>
            <p className="mt-1 text-sm text-muted-foreground text-center max-w-md">
              There are currently no students assigned to Class {currentUser?.class}.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">@{student.username}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span className="truncate">{student.email}</span>
                </div>
                
                {student.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span>{student.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-purple-500" />
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
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <User className="h-4 w-4 mr-1" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{students.length}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Class {currentUser?.class}</div>
              <div className="text-sm text-muted-foreground">Your Class</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{currentUser?.subject}</div>
              <div className="text-sm text-muted-foreground">Your Subject</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsView;
