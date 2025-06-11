
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Award, BookOpen, TrendingUp, User, Calendar } from 'lucide-react';
import AddMarks from './AddMarks';

const MarksView = () => {
  const { currentUser } = useAuth();
  const { getFilteredMarks } = useData();
  
  const marks = getFilteredMarks();
  const isStudent = currentUser?.role === 'student';

  const calculateAverage = () => {
    if (marks.length === 0) return 0;
    const total = marks.reduce((sum, mark) => sum + (mark.score / mark.totalScore * 100), 0);
    return Math.round(total / marks.length);
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'bg-green-500' };
    if (percentage >= 80) return { grade: 'A', color: 'bg-green-400' };
    if (percentage >= 70) return { grade: 'B+', color: 'bg-blue-500' };
    if (percentage >= 60) return { grade: 'B', color: 'bg-blue-400' };
    if (percentage >= 50) return { grade: 'C', color: 'bg-yellow-500' };
    return { grade: 'F', color: 'bg-red-500' };
  };

  const average = calculateAverage();
  const averageGrade = getGrade(average);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 md:p-4 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {isStudent ? 'My Marks' : 'Student Marks'}
          </h1>
          <p className="text-gray-600 text-sm">
            {isStudent ? 'Track your academic performance' : 'View and manage student grades'}
          </p>
        </div>

        {/* Add Marks Button for Teachers */}
        {!isStudent && (
          <AddMarks />
        )}

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white shadow-lg border-0 rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Total Subjects</p>
                  <p className="text-xl font-bold text-gray-900">{marks.length}</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Average Score</p>
                  <p className="text-xl font-bold text-gray-900">{average}%</p>
                </div>
                <div className="bg-green-100 rounded-lg p-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 rounded-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Overall Grade</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold text-gray-900">{averageGrade.grade}</p>
                    <div className={`w-2 h-2 rounded-full ${averageGrade.color}`}></div>
                  </div>
                </div>
                <div className="bg-purple-100 rounded-lg p-2">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Marks Table */}
        <Card className="bg-white shadow-lg border-0 rounded-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-4 w-4" />
              Subject-wise Marks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {marks.length === 0 ? (
              <div className="text-center py-8">
                <Award className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <h3 className="text-base font-medium text-gray-900 mb-1">No marks available</h3>
                <p className="text-gray-600 text-sm">
                  {isStudent ? 'Your marks will appear here once teachers publish them.' : 'Start adding marks for your students.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-medium text-gray-900">Subject</th>
                      <th className="text-center py-2 px-3 font-medium text-gray-900">Marks</th>
                      <th className="text-center py-2 px-3 font-medium text-gray-900">Grade</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-900">Date</th>
                      {!isStudent && <th className="text-left py-2 px-3 font-medium text-gray-900">Student</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((mark) => {
                      const percentage = Math.round((mark.score / mark.totalScore) * 100);
                      const gradeInfo = getGrade(percentage);
                      return (
                        <tr key={mark.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-3 w-3 text-blue-600" />
                              <span className="font-medium text-sm">{mark.subject}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="text-base font-bold">{mark.score}</span>
                            <span className="text-gray-500 ml-1 text-sm">/ {mark.totalScore}</span>
                            <div className="text-xs text-gray-600">({percentage}%)</div>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <Badge className={`${gradeInfo.color} text-white text-xs`}>
                              {gradeInfo.grade}
                            </Badge>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1 text-gray-600 text-xs">
                              <Calendar className="h-2 w-2" />
                              {new Date(mark.timestamp).toLocaleDateString()}
                            </div>
                          </td>
                          {!isStudent && (
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2 text-xs">
                                <User className="h-3 w-3 text-gray-400" />
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
          <Card className="bg-white shadow-lg border-0 rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {marks.filter(m => (m.score / m.totalScore * 100) >= 80).length}
                  </div>
                  <div className="text-xs text-gray-600">Excellent (80+)</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {marks.filter(m => {
                      const percentage = (m.score / m.totalScore * 100);
                      return percentage >= 60 && percentage < 80;
                    }).length}
                  </div>
                  <div className="text-xs text-gray-600">Good (60-79)</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">
                    {marks.filter(m => {
                      const percentage = (m.score / m.totalScore * 100);
                      return percentage >= 40 && percentage < 60;
                    }).length}
                  </div>
                  <div className="text-xs text-gray-600">Average (40-59)</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-lg font-bold text-red-600">
                    {marks.filter(m => (m.score / m.totalScore * 100) < 40).length}
                  </div>
                  <div className="text-xs text-gray-600">Needs Improvement (&lt;40)</div>
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
