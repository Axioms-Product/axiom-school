
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Users, UserCheck, GraduationCap } from 'lucide-react';
import ClassSelector from './ClassSelector';

const ClassMembersView = () => {
  const { currentUser } = useAuth();
  const { getStudentsForClass } = useData();
  
  // State for selected class (for teachers managing multiple classes)
  const [selectedClass, setSelectedClass] = useState<string>(
    currentUser?.role === 'teacher' && currentUser.classes 
      ? currentUser.classes[0] 
      : currentUser?.class || ''
  );

  // Get the current class to display
  const currentClass = currentUser?.role === 'student' 
    ? currentUser.class 
    : selectedClass;

  // Get students for the current class
  const students = getStudentsForClass(currentClass || '');
  
  // Mock teachers data (since we don't have getTeachersForClass in the context)
  const teachers = currentUser?.role === 'teacher' ? [currentUser] : [];
  const allMembers = [...teachers, ...students];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Class Selector for Teachers */}
        {currentUser?.role === 'teacher' && (
          <ClassSelector 
            selectedClass={selectedClass}
            onClassChange={setSelectedClass}
          />
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-2">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Class {currentClass} Members</h1>
              <p className="text-sm text-gray-600">{allMembers.length} total members</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Badge className="bg-blue-100 text-blue-700">
              {teachers.length} Teachers
            </Badge>
            <Badge className="bg-green-100 text-green-700">
              {students.length} Students
            </Badge>
          </div>
        </div>

        {/* Teachers Section */}
        {teachers.length > 0 && (
          <Card className="bg-white shadow-lg border-0 rounded-xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-xl p-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <UserCheck className="h-4 w-4" />
                Teachers ({teachers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher.id}`} />
                        <AvatarFallback className="bg-purple-200 text-purple-700">
                          {teacher.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate text-sm">{teacher.name}</p>
                        <p className="text-xs text-gray-500">{teacher.subject || 'Subject Teacher'}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge className="bg-purple-100 text-purple-700 text-xs">Teacher</Badge>
                          {teacher.classes && teacher.classes.length > 1 && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              {teacher.classes.length} Classes
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Students Section */}
        <Card className="bg-white shadow-lg border-0 rounded-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-t-xl p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4" />
              Students ({students.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {students.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {students.map((student) => (
                  <div key={student.id} className="bg-blue-50 rounded-lg p-3 border border-blue-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.id}`} />
                        <AvatarFallback className="bg-blue-200 text-blue-700">
                          {student.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate text-sm">{student.name}</p>
                        <p className="text-xs text-gray-500">Student ID: {student.id?.slice(0, 8)}</p>
                        <Badge className="bg-blue-100 text-blue-700 text-xs mt-1">Student</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <GraduationCap className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 text-lg">No students in this class yet</p>
                <p className="text-gray-400 text-sm mt-2">Students will appear here once they join the class</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClassMembersView;
