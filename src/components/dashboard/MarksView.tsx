
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Award, BookOpen, TrendingUp, User, Calendar } from 'lucide-react';

const MarksView = () => {
  const { currentUser } = useAuth();
  const { getFilteredMarks } = useData();
  
  const marks = getFilteredMarks();
  const isStudent = currentUser?.role === 'student';

  const calculateAverage = () => {
    if (marks.length === 0) return 0;
    const total = marks.reduce((sum, mark) => sum + mark.marks, 0);
    return Math.round(total / marks.length);
  };

  const getGrade = (marks: number) => {
    if (marks >= 90) return { grade: 'A+', color: 'bg-green-500' };
    if (marks >= 80) return { grade: 'A', color: 'bg-green-400' };
    if (marks >= 70) return { grade: 'B+', color: 'bg-blue-500' };
    if (marks >= 60) return { grade: 'B', color: 'bg-blue-400' };
    if (marks >= 50) return { grade: 'C', color: 'bg-yellow-500' };
    return { grade: 'F', color: 'bg-red-500' };
  };

  const average = calculateAverage();
  const averageGrade = getGrade(average);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isStudent ? 'My Marks' : 'Student Marks'}
          </h1>
          <p className="text-gray-600">
            {isStudent ? 'Track your academic performance' : 'View and manage student grades'}
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-0 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Subjects</p>
                  <p className="text-2xl font-bold text-gray-900">{marks.length}</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{average}%</p>
                </div>
                <div className="bg-green-100 rounded-lg p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Overall Grade</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-gray-900">{averageGrade.grade}</p>
                    <div className={`w-3 h-3 rounded-full ${averageGrade.color}`}></div>
                  </div>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Marks Table */}
        <Card className="bg-white shadow-lg border-0 rounded-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Subject-wise Marks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {marks.length === 0 ? (
              <div className="text-center py-12">
                <Award className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No marks available</h3>
                <p className="text-gray-600">
                  {isStudent ? 'Your marks will appear here once teachers publish them.' : 'Start adding marks for your students.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Subject</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Exam Type</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Marks</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Grade</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      {!isStudent && <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((mark) => {
                      const gradeInfo = getGrade(mark.marks);
                      return (
                        <tr key={mark.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">{mark.subject}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline">{mark.examType}</Badge>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-lg font-bold">{mark.marks}</span>
                            <span className="text-gray-500 ml-1">/ {mark.totalMarks}</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <Badge className={`${gradeInfo.color} text-white`}>
                              {gradeInfo.grade}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-3 w-3" />
                              {new Date(mark.date).toLocaleDateString()}
                            </div>
                          </td>
                          {!isStudent && (
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <span>{mark.studentId}</span>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Summary */}
        {marks.length > 0 && (
          <Card className="bg-white shadow-lg border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {marks.filter(m => m.marks >= 80).length}
                  </div>
                  <div className="text-sm text-gray-600">Excellent (80+)</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {marks.filter(m => m.marks >= 60 && m.marks < 80).length}
                  </div>
                  <div className="text-sm text-gray-600">Good (60-79)</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {marks.filter(m => m.marks >= 40 && m.marks < 60).length}
                  </div>
                  <div className="text-sm text-gray-600">Average (40-59)</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {marks.filter(m => m.marks < 40).length}
                  </div>
                  <div className="text-sm text-gray-600">Needs Improvement (<40)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MarksView;
