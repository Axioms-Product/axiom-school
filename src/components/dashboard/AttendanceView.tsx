
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { 
  ClipboardList, 
  Users, 
  Calendar as CalendarIcon, 
  Check, 
  X,
  TrendingUp,
  UserCheck,
  UserX
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  isPresent: boolean;
  createdBy: string;
}

const AttendanceView = () => {
  const { currentUser } = useAuth();
  const { getStudentsForClass } = useData();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<{ [key: string]: boolean }>({});

  const isStudent = currentUser?.role === 'student';
  const studentsInClass = getStudentsForClass(currentUser?.class || '');
  const today = format(new Date(), 'yyyy-MM-dd');

  // Load attendance data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('attendanceRecords');
    if (stored) {
      const records = JSON.parse(stored);
      setAttendanceRecords(records);
      
      // Set today's attendance state
      const todayRecords = records.filter((r: AttendanceRecord) => r.date === today);
      const todayState: { [key: string]: boolean } = {};
      todayRecords.forEach((r: AttendanceRecord) => {
        todayState[r.studentId] = r.isPresent;
      });
      setTodayAttendance(todayState);
    }
  }, [today]);

  // Save attendance data to localStorage
  const saveAttendance = (records: AttendanceRecord[]) => {
    localStorage.setItem('attendanceRecords', JSON.stringify(records));
    setAttendanceRecords(records);
  };

  // Mark attendance for a student
  const markAttendance = (studentId: string, studentName: string, isPresent: boolean) => {
    if (!currentUser) return;

    const existingIndex = attendanceRecords.findIndex(
      r => r.studentId === studentId && r.date === today
    );

    let newRecords = [...attendanceRecords];

    if (existingIndex >= 0) {
      newRecords[existingIndex] = {
        ...newRecords[existingIndex],
        isPresent
      };
    } else {
      newRecords.push({
        id: Date.now().toString(),
        studentId,
        studentName,
        date: today,
        isPresent,
        createdBy: currentUser.id
      });
    }

    saveAttendance(newRecords);
    setTodayAttendance(prev => ({ ...prev, [studentId]: isPresent }));
  };

  // Get attendance for selected date
  const getAttendanceForDate = (date: string) => {
    return attendanceRecords.filter(r => r.date === date);
  };

  // Calculate attendance statistics
  const calculateStats = () => {
    const totalStudents = studentsInClass.length;
    const presentToday = Object.values(todayAttendance).filter(Boolean).length;
    const attendancePercentage = totalStudents > 0 ? (presentToday / totalStudents) * 100 : 0;
    
    return {
      totalStudents,
      presentToday,
      absentToday: totalStudents - presentToday,
      attendancePercentage: Math.round(attendancePercentage)
    };
  };

  const stats = calculateStats();

  if (isStudent) {
    // Student view - show their attendance history
    const studentAttendance = attendanceRecords.filter(r => r.studentId === currentUser?.id);
    const totalDays = studentAttendance.length;
    const presentDays = studentAttendance.filter(r => r.isPresent).length;
    const attendanceRate = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-100">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <ClipboardList className="h-8 w-8 text-blue-600" />
              My Attendance
            </h1>
            <p className="text-gray-600">Track your attendance record for Class {currentUser?.class}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className="bg-blue-100 text-blue-800">
                Class {currentUser?.class}
              </Badge>
              <Badge className="bg-green-100 text-green-800">
                {Math.round(attendanceRate)}% Attendance
              </Badge>
            </div>
          </div>

          {/* Student Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-xl border-0 rounded-2xl">
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 rounded-full p-4 inline-flex mb-4">
                  <UserCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{presentDays}</h3>
                <p className="text-gray-600">Days Present</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl border-0 rounded-2xl">
              <CardContent className="p-6 text-center">
                <div className="bg-red-100 rounded-full p-4 inline-flex mb-4">
                  <UserX className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalDays - presentDays}</h3>
                <p className="text-gray-600">Days Absent</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl border-0 rounded-2xl">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{Math.round(attendanceRate)}%</h3>
                <p className="text-gray-600">Attendance Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Attendance History */}
          <Card className="bg-white shadow-xl border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Attendance History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                {studentAttendance.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <ClipboardList className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>No attendance records yet</p>
                  </div>
                ) : (
                  studentAttendance.slice().reverse().map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-full p-2 ${
                          record.isPresent ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {record.isPresent ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <X className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {format(new Date(record.date), 'MMMM d, yyyy')}
                          </p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(record.date), 'EEEE')}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        className={
                          record.isPresent 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {record.isPresent ? 'Present' : 'Absent'}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Teacher view - manage attendance
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <ClipboardList className="h-8 w-8 text-blue-600" />
                Attendance Management
              </h1>
              <p className="text-gray-600">
                Mark and track attendance for Class {currentUser?.class}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-blue-100 text-blue-800">
                  Class {currentUser?.class}
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  {stats.presentToday}/{stats.totalStudents} Present Today
                </Badge>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {format(selectedDate, 'MMM d, yyyy')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="bg-white shadow-xl border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
                </div>
                <div className="bg-blue-100 rounded-xl p-3">
                  <Users className="h-7 w-7 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Present Today</p>
                  <p className="text-3xl font-bold text-green-600">{stats.presentToday}</p>
                </div>
                <div className="bg-green-100 rounded-xl p-3">
                  <UserCheck className="h-7 w-7 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Absent Today</p>
                  <p className="text-3xl font-bold text-red-600">{stats.absentToday}</p>
                </div>
                <div className="bg-red-100 rounded-xl p-3">
                  <UserX className="h-7 w-7 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Attendance Rate</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.attendancePercentage}%</p>
                </div>
                <div className="bg-purple-100 rounded-xl p-3">
                  <TrendingUp className="h-7 w-7 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Marking */}
        <Card className="bg-white shadow-xl border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Mark Attendance - {format(new Date(), 'MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {studentsInClass.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>No students found in this class</p>
                </div>
              ) : (
                studentsInClass.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">Student ID: {student.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">
                          {todayAttendance[student.id] ? 'Present' : 'Absent'}
                        </label>
                        <Switch
                          checked={todayAttendance[student.id] || false}
                          onCheckedChange={(checked) => 
                            markAttendance(student.id, student.name, checked)
                          }
                        />
                      </div>
                      <Badge 
                        className={
                          todayAttendance[student.id] 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {todayAttendance[student.id] ? 'Present' : 'Absent'}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceView;
