
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserCheck, Download } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';

interface QuickActionsProps {
  currentUser: any;
}

export const QuickActions = ({ currentUser }: QuickActionsProps) => {
  const { markAttendanceForClass, getStudentsForClass } = useData();

  const handleMarkAttendance = () => {
    if (currentUser?.role === 'teacher' && currentUser.class) {
      const students = getStudentsForClass(currentUser.class);
      const studentIds = students.map(s => s.id);
      const today = new Date().toISOString().split('T')[0];
      
      markAttendanceForClass(studentIds, 'present', today);
      toast.success('Attendance marked successfully');
    }
  };

  const handleDownloadReport = async () => {
    try {
      if (currentUser?.role === 'teacher') {
        const students = getStudentsForClass(currentUser.class || '');
        
        const reportContent = `AXIOMS SCHOOL - ATTENDANCE REPORT
Class: ${currentUser.class}
Teacher: ${currentUser.name}
Generated: ${new Date().toLocaleDateString()}

STUDENT ATTENDANCE SUMMARY:
${students.map(student => {
  const attendance = JSON.parse(localStorage.getItem('attendanceRecords') || '[]')
    .filter((r: any) => r.studentId === student.id);
  const present = attendance.filter((r: any) => r.isPresent).length;
  const total = attendance.length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
  
  return `${student.name}: ${present}/${total} days (${percentage}%)`;
}).join('\n')}

MARKS SUMMARY:
${students.map(student => {
  const marks = JSON.parse(localStorage.getItem('studentMarks') || '[]')
    .filter((m: any) => m.studentId === student.id);
  const average = marks.length > 0 ? 
    Math.round(marks.reduce((sum: number, m: any) => sum + m.marks, 0) / marks.length) : 0;
  
  return `${student.name}: Average ${average}%`;
}).join('\n')}`;
        
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Axioms_School_Class_${currentUser.class}_Report_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast.success('Report downloaded successfully');
      } else {
        const marks = JSON.parse(localStorage.getItem('studentMarks') || '[]')
          .filter((m: any) => m.studentId === currentUser?.id);
        const attendance = JSON.parse(localStorage.getItem('attendanceRecords') || '[]')
          .filter((r: any) => r.studentId === currentUser?.id);
        
        const reportContent = `AXIOMS SCHOOL - STUDENT REPORT
Student: ${currentUser?.name}
Class: ${currentUser?.class}
Generated: ${new Date().toLocaleDateString()}

MARKS RECORD:
${marks.map((m: any) => `${m.subject}: ${m.marks}% (${new Date(m.date).toLocaleDateString()})`).join('\n')}

Average: ${marks.length > 0 ? Math.round(marks.reduce((sum: number, m: any) => sum + m.marks, 0) / marks.length) : 0}%

ATTENDANCE RECORD:
Total Days: ${attendance.length}
Present: ${attendance.filter((r: any) => r.isPresent).length}
Absent: ${attendance.filter((r: any) => !r.isPresent).length}
Percentage: ${attendance.length > 0 ? Math.round((attendance.filter((r: any) => r.isPresent).length / attendance.length) * 100) : 0}%`;
        
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Axioms_School_${currentUser?.name}_Report_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast.success('Report downloaded successfully');
      }
    } catch (error) {
      toast.error('Failed to download report');
      console.error('Download error:', error);
    }
  };

  if (currentUser?.role === 'teacher') {
    return (
      <div className="mt-6 space-y-2">
        <Separator className="my-4 bg-sidebar-border/50" />
        <p className="text-xs font-medium text-sidebar-foreground/70 px-3">Quick Actions</p>
        <Button
          onClick={handleMarkAttendance}
          variant="outline"
          size="sm"
          className="w-full justify-start bg-sidebar hover:bg-sidebar-accent text-sidebar-foreground border-sidebar-border"
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Mark Attendance
        </Button>
        <Button
          onClick={handleDownloadReport}
          variant="outline"
          size="sm"
          className="w-full justify-start bg-sidebar hover:bg-sidebar-accent text-sidebar-foreground border-sidebar-border"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>
    );
  }

  if (currentUser?.role === 'student') {
    return (
      <div className="mt-6 space-y-2">
        <Separator className="my-4 bg-sidebar-border/50" />
        <p className="text-xs font-medium text-sidebar-foreground/70 px-3">Quick Actions</p>
        <Button
          onClick={handleDownloadReport}
          variant="outline"
          size="sm"
          className="w-full justify-start bg-sidebar hover:bg-sidebar-accent text-sidebar-foreground border-sidebar-border"
        >
          <Download className="h-4 w-4 mr-2" />
          My Report
        </Button>
      </div>
    );
  }

  return null;
};
