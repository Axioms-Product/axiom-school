
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Users, Mail, Phone, User, BookOpen, Search, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';

const StudentsView = () => {
  const { currentUser } = useAuth();
  const { getStudentsForClass } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const isTeacher = currentUser?.role === 'teacher';
  const allStudents = getStudentsForClass(currentUser?.class || '');

  const students = useMemo(() => {
    if (!searchTerm) return allStudents;
    return allStudents.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allStudents, searchTerm]);

  const handleViewProfile = (studentId: string) => {
    navigate(`/dashboard/profile?studentId=${studentId}`);
  };

  if (!isTeacher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
            <p className="text-gray-600">This page is only available for teachers.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Class {currentUser?.class} Students</h1>
                <p className="text-gray-600">Manage and view your students</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-lg font-semibold">
                <Users className="h-4 w-4 mr-2" />
                {students.length} Students
              </Badge>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {allStudents.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 border border-blue-100">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Students Grid */}
        {allStudents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-blue-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Students Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              There are currently no students assigned to Class {currentUser?.class}. 
              Students will appear here once they join your class.
            </p>
          </div>
        ) : students.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-blue-100">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Matching Students</h3>
            <p className="text-gray-600">No students found matching "{searchTerm}".</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <Card key={student.id} className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg rounded-2xl overflow-hidden group">
                <CardHeader className="pb-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg text-white truncate">{student.name}</CardTitle>
                      <p className="text-blue-100 text-sm truncate">@{student.username}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="truncate flex-1">{student.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                      </div>
                      <span>Class {student.class}</span>
                    </div>
                    
                    {student.joiningDate && (
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-green-600" />
                        </div>
                        <span>Joined {new Date(student.joiningDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => handleViewProfile(student.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl transition-all duration-200 group-hover:shadow-lg"
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Class Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Class Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">{allStudents.length}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">Class {currentUser?.class}</div>
              <div className="text-sm text-gray-600">Your Class</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">{currentUser?.subject}</div>
              <div className="text-sm text-gray-600">Your Subject</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsView;
