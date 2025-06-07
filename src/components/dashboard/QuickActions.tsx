
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
      try {
        const students = getStudentsForClass(currentUser.class);
        const studentIds = students.map(s => s.id);
        const today = new Date().toISOString().split('T')[0];
        
        markAttendanceForClass(studentIds, 'present', today);
        toast.success(`Attendance marked for ${students.length} students`);
      } catch (error) {
        toast.error('Failed to mark attendance');
        console.error('Attendance error:', error);
      }
    } else {
      toast.error('Unable to mark attendance');
    }
  };

  const generatePDFReport = async (title: string, content: string) => {
    try {
      // Dynamic import for better mobile compatibility
      const { default: jsPDF } = await import('jspdf');
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const maxWidth = pageWidth - (margin * 2);
      let yPosition = 20;

      // Header with school branding
      doc.setFillColor(59, 130, 246);
      doc.rect(0, 0, pageWidth, 35, 'F');
      
      // School name
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text('AXIOMS SCHOOL', pageWidth / 2, 18, { align: 'center' });
      
      // School tagline
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text('Excellence in Digital Education', pageWidth / 2, 26, { align: 'center' });
      
      yPosition = 50;
      
      // Contact information
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.text('Email: axiomsproduct@gmail.com', margin, yPosition);
      doc.text('Website: www.axiomschool.netlify.app', pageWidth - margin, yPosition, { align: 'right' });
      
      yPosition += 15;
      
      // Separator line
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      
      yPosition += 15;
      
      // Report title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(59, 130, 246);
      doc.text(title, pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;
      
      // Report content
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      
      const lines = content.split('\n');
      lines.forEach((line) => {
        if (yPosition > doc.internal.pageSize.getHeight() - 25) {
          doc.addPage();
          yPosition = 20;
        }
        
        if (line.includes(':') && !line.includes('Generated:')) {
          doc.setFont("helvetica", "bold");
        } else {
          doc.setFont("helvetica", "normal");
        }
        
        const splitLines = doc.splitTextToSize(line, maxWidth);
        doc.text(splitLines, margin, yPosition);
        yPosition += splitLines.length * 4;
      });
      
      // Footer
      const footerY = doc.internal.pageSize.getHeight() - 15;
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(0.5);
      doc.line(margin, footerY - 8, pageWidth - margin, footerY - 8);
      
      doc.setFontSize(7);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(100, 100, 100);
      doc.text('This is a computer generated report from Axioms School Management System', pageWidth / 2, footerY, { align: 'center' });
      
      return doc;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    }
  };

  const handleDownloadReport = async () => {
    try {
      if (currentUser?.role === 'teacher') {
        const students = getStudentsForClass(currentUser.class || '');
        
        const reportContent = `ATTENDANCE & MARKS REPORT
Class: ${currentUser.class}
Teacher: ${currentUser.name}
Generated: ${new Date().toLocaleDateString()}
Report Date: ${new Date().toISOString().split('T')[0]}

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
    Math.round(marks.reduce((sum: number, m: any) => sum + m.score, 0) / marks.length) : 0;
  
  return `${student.name}: Average ${average}%`;
}).join('\n')}

DETAILED STUDENT RECORDS:
${students.map(student => {
  const marks = JSON.parse(localStorage.getItem('studentMarks') || '[]')
    .filter((m: any) => m.studentId === student.id);
  const attendance = JSON.parse(localStorage.getItem('attendanceRecords') || '[]')
    .filter((r: any) => r.studentId === student.id);
  
  return `\n--- ${student.name.toUpperCase()} ---
Subject-wise Marks:
${marks.map((m: any) => `  ${m.subject}: ${m.score}% (${new Date(m.timestamp).toLocaleDateString()})`).join('\n') || '  No marks recorded'}

Attendance History:
  Total Days: ${attendance.length}
  Present: ${attendance.filter((r: any) => r.isPresent).length}
  Absent: ${attendance.filter((r: any) => !r.isPresent).length}
  Attendance Percentage: ${attendance.length > 0 ? Math.round((attendance.filter((r: any) => r.isPresent).length / attendance.length) * 100) : 0}%`;
}).join('\n')}`;
        
        const doc = await generatePDFReport(`Class ${currentUser.class} Report`, reportContent);
        doc.save(`Axioms_School_Class_${currentUser.class}_Report_${new Date().toISOString().split('T')[0]}.pdf`);
        
        toast.success('PDF Report downloaded successfully');
      } else {
        const marks = JSON.parse(localStorage.getItem('studentMarks') || '[]')
          .filter((m: any) => m.studentId === currentUser?.id);
        const attendance = JSON.parse(localStorage.getItem('attendanceRecords') || '[]')
          .filter((r: any) => r.studentId === currentUser?.id);
        
        const reportContent = `STUDENT PROGRESS REPORT
Student: ${currentUser?.name}
Class: ${currentUser?.class}
Student ID: ${currentUser?.id}
Generated: ${new Date().toLocaleDateString()}
Report Date: ${new Date().toISOString().split('T')[0]}

ACADEMIC PERFORMANCE:
Subject-wise Marks:
${marks.map((m: any) => `${m.subject}: ${m.score}% (${new Date(m.timestamp).toLocaleDateString()})`).join('\n') || 'No marks recorded yet'}

Overall Average: ${marks.length > 0 ? Math.round(marks.reduce((sum: number, m: any) => sum + m.score, 0) / marks.length) : 0}%

ATTENDANCE RECORD:
Total School Days: ${attendance.length}
Days Present: ${attendance.filter((r: any) => r.isPresent).length}
Days Absent: ${attendance.filter((r: any) => !r.isPresent).length}
Attendance Percentage: ${attendance.length > 0 ? Math.round((attendance.filter((r: any) => r.isPresent).length / attendance.length) * 100) : 0}%

PERFORMANCE ANALYSIS:
${marks.length > 0 ? 
  `Highest Score: ${Math.max(...marks.map((m: any) => m.score))}%
Lowest Score: ${Math.min(...marks.map((m: any) => m.score))}%
Total Subjects Evaluated: ${marks.length}
Recent Performance Trend: ${marks.slice(-3).map((m: any) => `${m.subject}: ${m.score}%`).join(', ')}` :
  'No academic evaluations completed yet'
}

REMARKS:
${marks.length > 0 && attendance.length > 0 ?
  `Student shows ${attendance.length > 0 && (attendance.filter((r: any) => r.isPresent).length / attendance.length) > 0.8 ? 'excellent' : 'good'} attendance record and ${marks.reduce((sum: number, m: any) => sum + m.score, 0) / marks.length > 75 ? 'outstanding' : marks.reduce((sum: number, m: any) => sum + m.score, 0) / marks.length > 60 ? 'good' : 'needs improvement'} academic performance.` :
  'Evaluation in progress. Please check back for detailed analysis.'
}`;
        
        const doc = await generatePDFReport(`Student Report - ${currentUser?.name}`, reportContent);
        doc.save(`Axioms_School_${currentUser?.name}_Report_${new Date().toISOString().split('T')[0]}.pdf`);
        
        toast.success('PDF Report downloaded successfully');
      }
    } catch (error) {
      toast.error('Failed to generate PDF report');
      console.error('PDF generation error:', error);
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
