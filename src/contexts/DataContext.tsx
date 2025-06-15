import React, { createContext, useContext, useState, useEffect } from 'react';
import { Homework, Notice, Event, Message, Mark, Subject, FeePayment, ExamSchedule } from '../models/types';
import { useAuth, User } from './AuthContext';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  timestamp: number;
  createdBy: string;
  responded?: boolean;
  studentResponse?: 'confirmed' | 'disputed';
}

interface AttendanceNotification {
  id: string;
  studentId: string;
  teacherId: string;
  teacherName: string;
  status: 'present' | 'absent' | 'late';
  timestamp: number;
  responded: boolean;
}

interface DataContextType {
  homeworks: Homework[];
  notices: Notice[];
  events: Event[];
  messages: Message[];
  marks: Mark[];
  fees: FeePayment[];
  examSchedules: ExamSchedule[];
  attendance: AttendanceRecord[];
  attendanceNotifications: AttendanceNotification[];
  addHomework: (homework: Omit<Homework, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => void;
  addNotice: (notice: Omit<Notice, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => void;
  addEvent: (event: Omit<Event, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => void;
  addMark: (mark: Omit<Mark, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => void;
  addFee: (fee: Omit<FeePayment, 'id' | 'timestamp' | 'createdBy'>) => void;
  addExamSchedule: (exam: Omit<ExamSchedule, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => void;
  addAttendance: (attendance: Omit<AttendanceRecord, 'id' | 'timestamp' | 'createdBy'>) => void;
  markAttendanceForClass: (studentIds: string[], status: 'present' | 'absent' | 'late', date: string) => void;
  respondToAttendance: (notificationId: string, response: 'confirmed' | 'disputed') => void;
  deleteHomework: (id: string) => void;
  deleteNotice: (id: string) => void;
  deleteEvent: (id: string) => void;
  deleteMark: (id: string) => void;
  deleteFee: (id: string) => void;
  deleteExamSchedule: (id: string) => void;
  updateFeeStatus: (id: string, isPaid: boolean) => void;
  markHomeworkComplete: (homeworkId: string) => void;
  sendMessage: (content: string, receiverId: string) => void;
  getTeacherForClass: (className: string) => User | undefined;
  getTeachersForClass: (className: string) => User[];
  getStudentsForClass: (className: string) => User[];
  getFilteredHomeworks: () => Homework[];
  getFilteredNotices: () => Notice[];
  getFilteredEvents: () => Event[];
  getFilteredMessages: () => Message[];
  getFilteredMarks: (studentId?: string) => Mark[];
  getFilteredFees: (studentId?: string) => FeePayment[];
  getFilteredExamSchedules: () => ExamSchedule[];
  getFilteredAttendance: () => AttendanceRecord[];
  markMessageAsRead: (id: string) => void;
  generatePDFReport: (type: 'attendance' | 'marks' | 'student-marks', studentId?: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [fees, setFees] = useState<FeePayment[]>([]);
  const [examSchedules, setExamSchedules] = useState<ExamSchedule[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [attendanceNotifications, setAttendanceNotifications] = useState<AttendanceNotification[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedHomeworks = localStorage.getItem('homeworks');
    const storedNotices = localStorage.getItem('notices');
    const storedEvents = localStorage.getItem('events');
    const storedMessages = localStorage.getItem('messages');
    const storedMarks = localStorage.getItem('marks');
    const storedFees = localStorage.getItem('fees');
    const storedExams = localStorage.getItem('examSchedules');
    const storedAttendance = localStorage.getItem('attendance');
    const storedUsers = localStorage.getItem('users');
    const storedNotifications = localStorage.getItem('attendanceNotifications');
    
    if (storedHomeworks) setHomeworks(JSON.parse(storedHomeworks));
    if (storedNotices) setNotices(JSON.parse(storedNotices));
    if (storedEvents) setEvents(JSON.parse(storedEvents));
    if (storedMessages) setMessages(JSON.parse(storedMessages));
    if (storedMarks) setMarks(JSON.parse(storedMarks));
    if (storedFees) setFees(JSON.parse(storedFees));
    if (storedExams) setExamSchedules(JSON.parse(storedExams));
    if (storedAttendance) setAttendance(JSON.parse(storedAttendance));
    if (storedNotifications) setAttendanceNotifications(JSON.parse(storedNotifications));
    
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        if (typeof parsedUsers === 'object' && parsedUsers !== null) {
          const extractedUsers = Object.values(parsedUsers)
            .map(record => (record as any).user)
            .filter(Boolean);
          
          setUsers(extractedUsers as User[]);
        }
      } catch (error) {
        console.error('Error parsing users:', error);
        const sampleUsers: User[] = [
          {
            id: 'teacher1',
            name: 'Ms. Sarah Johnson',
            username: 'sarah.johnson',
            email: 'sarah.johnson@axioms.edu',
            role: 'teacher' as const,
            class: '10A',
            subject: Subject.MATHEMATICS
          },
          {
            id: 'student1',
            name: 'Alex Kumar',
            username: 'alex.kumar',
            email: 'alex.kumar@student.axioms.edu',
            role: 'student' as const,
            class: '10A'
          },
          {
            id: 'student2',
            name: 'Emma Wilson',
            username: 'emma.wilson',
            email: 'emma.wilson@student.axioms.edu',
            role: 'student' as const,
            class: '10A'
          },
          {
            id: 'student3',
            name: 'David Chen',
            username: 'david.chen',
            email: 'david.chen@student.axioms.edu',
            role: 'student' as const,
            class: '10A'
          }
        ];
        setUsers(sampleUsers);
      }
    } else {
      const sampleUsers: User[] = [
        {
          id: 'teacher1',
          name: 'Ms. Sarah Johnson',
          username: 'sarah.johnson',
          email: 'sarah.johnson@axioms.edu',
          role: 'teacher' as const,
          class: '10A',
          subject: Subject.MATHEMATICS
        },
        {
          id: 'student1',
          name: 'Alex Kumar',
          username: 'alex.kumar',
          email: 'alex.kumar@student.axioms.edu',
          role: 'student' as const,
          class: '10A'
        },
        {
          id: 'student2',
          name: 'Emma Wilson',
          username: 'emma.wilson',
          email: 'emma.wilson@student.axioms.edu',
          role: 'student' as const,
          class: '10A'
        },
        {
          id: 'student3',
          name: 'David Chen',
          username: 'david.chen',
          email: 'david.chen@student.axioms.edu',
          role: 'student' as const,
          class: '10A'
        }
      ];
      setUsers(sampleUsers);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('homeworks', JSON.stringify(homeworks));
  }, [homeworks]);

  useEffect(() => {
    localStorage.setItem('notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('marks', JSON.stringify(marks));
  }, [marks]);

  useEffect(() => {
    localStorage.setItem('fees', JSON.stringify(fees));
  }, [fees]);

  useEffect(() => {
    localStorage.setItem('examSchedules', JSON.stringify(examSchedules));
  }, [examSchedules]);

  useEffect(() => {
    localStorage.setItem('attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('attendanceNotifications', JSON.stringify(attendanceNotifications));
  }, [attendanceNotifications]);

  // Function to get the teacher for a specific class
  const getTeacherForClass = (className: string) => {
    return users.find(user => user.role === 'teacher' && user.class === className);
  };

  // Function to get all teachers for a class
  const getTeachersForClass = (className: string) => {
    return users.filter(user => user.role === 'teacher' && user.class === className);
  };
  
  // Function to get all students for a class
  const getStudentsForClass = (className: string) => {
    return users.filter(user => user.role === 'student' && user.class === className);
  };

  const addHomework = (homework: Omit<Homework, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => {
    if (!currentUser) return;
    
    const newHomework: Homework = {
      ...homework,
      id: Date.now().toString(),
      timestamp: Date.now(),
      createdBy: currentUser.id,
      creatorName: currentUser.name,
      completedBy: []
    };
    
    setHomeworks(prev => [...prev, newHomework]);
    toast.success('Homework added successfully');
  };

  const markHomeworkComplete = (homeworkId: string) => {
    if (!currentUser) return;
    
    setHomeworks(prev => 
      prev.map(hw => {
        if (hw.id === homeworkId) {
          const completedBy = hw.completedBy || [];
          const isAlreadyCompleted = completedBy.includes(currentUser.id);
          
          return {
            ...hw,
            completedBy: isAlreadyCompleted
              ? completedBy.filter(id => id !== currentUser.id)
              : [...completedBy, currentUser.id]
          };
        }
        return hw;
      })
    );
    
    const homework = homeworks.find(hw => hw.id === homeworkId);
    const isCompleted = homework?.completedBy?.includes(currentUser.id);
    toast.success(isCompleted ? 'Homework marked as incomplete' : 'Homework marked as complete');
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => {
    if (!currentUser) return;
    
    const newNotice: Notice = {
      ...notice,
      id: Date.now().toString(),
      timestamp: Date.now(),
      createdBy: currentUser.id,
      creatorName: currentUser.name
    };
    
    setNotices(prev => [...prev, newNotice]);
    toast.success('Notice added successfully');
  };

  const addEvent = (event: Omit<Event, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => {
    if (!currentUser) return;
    
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      timestamp: Date.now(),
      createdBy: currentUser.id,
      creatorName: currentUser.name
    };
    
    setEvents(prev => [...prev, newEvent]);
    toast.success('Event added successfully');
  };

  const addMark = (mark: Omit<Mark, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => {
    if (!currentUser) return;
    
    const newMark: Mark = {
      ...mark,
      id: Date.now().toString(),
      timestamp: Date.now(),
      createdBy: currentUser.id,
      creatorName: currentUser.name
    };
    
    setMarks(prev => [...prev, newMark]);
    toast.success('Mark added successfully');
  };

  const addFee = (fee: Omit<FeePayment, 'id' | 'timestamp' | 'createdBy'>) => {
    if (!currentUser) return;
    
    const newFee: FeePayment = {
      ...fee,
      id: Date.now().toString(),
      timestamp: Date.now(),
      createdBy: currentUser.id
    };
    
    setFees(prev => [...prev, newFee]);
    toast.success('Fee added successfully');
  };

  const addExamSchedule = (exam: Omit<ExamSchedule, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => {
    if (!currentUser) return;
    
    const newExam: ExamSchedule = {
      ...exam,
      id: Date.now().toString(),
      timestamp: Date.now(),
      createdBy: currentUser.id,
      creatorName: currentUser.name
    };
    
    setExamSchedules(prev => [...prev, newExam]);
    toast.success('Exam schedule added successfully');
  };

  // Function to add attendance record
  const addAttendance = (attendanceData: Omit<AttendanceRecord, 'id' | 'timestamp' | 'createdBy'>) => {
    if (!currentUser) return;
    
    const newAttendance: AttendanceRecord = {
      ...attendanceData,
      id: Date.now().toString(),
      timestamp: Date.now(),
      createdBy: currentUser.id
    };
    
    setAttendance(prev => [...prev, newAttendance]);
    toast.success('Attendance recorded successfully');
  };

  // New function to mark attendance for multiple students
  const markAttendanceForClass = (studentIds: string[], status: 'present' | 'absent' | 'late', date: string) => {
    if (!currentUser || currentUser.role !== 'teacher') return;

    const newAttendanceRecords: AttendanceRecord[] = studentIds.map(studentId => ({
      id: `${Date.now()}-${studentId}`,
      studentId,
      date,
      status,
      timestamp: Date.now(),
      createdBy: currentUser.id,
      responded: false
    }));

    const newNotifications: AttendanceNotification[] = studentIds.map(studentId => ({
      id: `${Date.now()}-${studentId}-notification`,
      studentId,
      teacherId: currentUser.id,
      teacherName: currentUser.name,
      status,
      timestamp: Date.now(),
      responded: false
    }));

    setAttendance(prev => [...prev, ...newAttendanceRecords]);
    setAttendanceNotifications(prev => [...prev, ...newNotifications]);
    
    toast.success(`Attendance marked for ${studentIds.length} students`);
  };

  // Function for students to respond to attendance notifications
  const respondToAttendance = (notificationId: string, response: 'confirmed' | 'disputed') => {
    if (!currentUser || currentUser.role !== 'student') return;

    setAttendanceNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, responded: true }
          : notification
      )
    );

    setAttendance(prev => 
      prev.map(record => 
        record.studentId === currentUser.id && 
        new Date(record.timestamp).toDateString() === new Date().toDateString()
          ? { ...record, responded: true, studentResponse: response }
          : record
      )
    );

    toast.success(response === 'confirmed' ? 'Attendance confirmed' : 'Attendance disputed');
  };

  const deleteHomework = (id: string) => {
    setHomeworks(prev => prev.filter(hw => hw.id !== id));
    toast.success('Homework deleted successfully');
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    toast.success('Notice deleted successfully');
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    toast.success('Event deleted successfully');
  };

  const deleteMark = (id: string) => {
    setMarks(prev => prev.filter(m => m.id !== id));
    toast.success('Mark deleted successfully');
  };

  const deleteFee = (id: string) => {
    setFees(prev => prev.filter(f => f.id !== id));
    toast.success('Fee deleted successfully');
  };

  const deleteExamSchedule = (id: string) => {
    setExamSchedules(prev => prev.filter(e => e.id !== id));
    toast.success('Exam schedule deleted successfully');
  };

  const updateFeeStatus = (id: string, isPaid: boolean) => {
    setFees(prev => 
      prev.map(fee => 
        fee.id === id 
          ? { ...fee, isPaid, paidDate: isPaid ? new Date().toISOString() : undefined }
          : fee
      )
    );
    toast.success(isPaid ? 'Fee marked as paid' : 'Fee marked as unpaid');
  };

  // Enhanced message sending function
  const sendMessage = (content: string, receiverId: string) => {
    if (!currentUser) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId,
      content,
      timestamp: Date.now(),
      read: false
    };
    
    setMessages(prev => [...prev, newMessage]);
    toast.success('Message sent successfully');
  };

  const markMessageAsRead = (id: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
  };

  // Enhanced filtered messages function
  const getFilteredMessages = () => {
    if (!currentUser) return [];
    
    return messages.filter(msg => {
      // For class messages - all students in the same class can see them
      if (msg.receiverId === `class-${currentUser.class}`) {
        return true;
      }
      // For direct messages
      return msg.senderId === currentUser.id || msg.receiverId === currentUser.id;
    }).sort((a, b) => b.timestamp - a.timestamp);
  };

  const getFilteredHomeworks = () => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'teacher') {
      return homeworks.filter(hw => 
        hw.assignedClass === currentUser.class && 
        hw.subject === currentUser.subject
      );
    } else {
      return homeworks.filter(hw => hw.assignedClass === currentUser.class);
    }
  };

  const getFilteredNotices = () => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'teacher') {
      return notices.filter(n => n.assignedClass === currentUser.class);
    } else {
      return notices.filter(n => n.assignedClass === currentUser.class);
    }
  };

  const getFilteredEvents = () => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'teacher') {
      return events.filter(e => e.assignedClass === currentUser.class);
    } else {
      return events.filter(e => e.assignedClass === currentUser.class);
    }
  };

  const getFilteredMarks = (studentId?: string) => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'teacher') {
      const studentsInClass = users.filter(
        user => user.role === 'student' && user.class === currentUser.class
      );
      
      const studentIds = studentsInClass.map(s => s.id);
      
      return marks.filter(m => 
        studentIds.includes(m.studentId) && 
        m.subject === currentUser.subject
      );
    } else {
      const targetId = studentId || currentUser.id;
      return marks.filter(m => m.studentId === targetId);
    }
  };

  const getFilteredFees = (studentId?: string) => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'teacher') {
      const studentsInClass = users.filter(
        user => user.role === 'student' && user.class === currentUser.class
      );
      
      const studentIds = studentsInClass.map(s => s.id);
      return fees.filter(f => studentIds.includes(f.studentId));
    } else {
      return fees.filter(f => f.studentId === currentUser.id);
    }
  };

  const getFilteredExamSchedules = () => {
    if (!currentUser) return [];
    
    return examSchedules.filter(e => e.assignedClass === currentUser.class);
  };

  const getFilteredAttendance = () => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'teacher') {
      const studentsInClass = users.filter(
        user => user.role === 'student' && user.class === currentUser.class
      );
      
      const studentIds = studentsInClass.map(s => s.id);
      return attendance.filter(a => studentIds.includes(a.studentId));
    } else {
      return attendance.filter(a => a.studentId === currentUser.id);
    }
  };

  // PDF Report generation function
  const generatePDFReport = (type: 'attendance' | 'marks' | 'student-marks', studentId?: string) => {
    if (!currentUser) return;

    try {
      const doc = new jsPDF();
      
      // Set up document styling
      doc.setFontSize(20);
      doc.setTextColor(40, 116, 240);
      doc.text('AXIOMS SCHOOL', 105, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Excellence in Digital Education', 105, 30, { align: 'center' });
      doc.text('www.axiomsschool.edu | contact@axiomsschool.edu', 105, 40, { align: 'center' });
      
      // Add a line separator
      doc.setDrawColor(40, 116, 240);
      doc.line(20, 45, 190, 45);
      
      let yPosition = 60;
      
      switch (type) {
        case 'attendance':
          if (currentUser.role === 'teacher') {
            doc.setFontSize(16);
            doc.text('ATTENDANCE REPORT', 105, yPosition, { align: 'center' });
            yPosition += 20;
            
            doc.setFontSize(12);
            doc.text(`Class: ${currentUser.class}`, 20, yPosition);
            yPosition += 10;
            doc.text(`Teacher: ${currentUser.name}`, 20, yPosition);
            yPosition += 10;
            doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPosition);
            yPosition += 20;
            
            const classAttendance = getFilteredAttendance();
            const students = getStudentsForClass(currentUser.class || '');
            
            doc.text('ATTENDANCE SUMMARY:', 20, yPosition);
            yPosition += 15;
            
            students.forEach(student => {
              const studentRecords = classAttendance.filter(r => r.studentId === student.id);
              const present = studentRecords.filter(r => r.status === 'present').length;
              const total = studentRecords.length;
              const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
              
              doc.text(`${student.name}: ${present}/${total} days (${percentage}%)`, 20, yPosition);
              yPosition += 8;
              
              if (yPosition > 280) {
                doc.addPage();
                yPosition = 20;
              }
            });
          }
          break;
          
        case 'marks':
          if (currentUser.role === 'teacher') {
            doc.setFontSize(16);
            doc.text('MARKS REPORT', 105, yPosition, { align: 'center' });
            yPosition += 20;
            
            doc.setFontSize(12);
            doc.text(`Class: ${currentUser.class}`, 20, yPosition);
            yPosition += 10;
            doc.text(`Teacher: ${currentUser.name}`, 20, yPosition);
            yPosition += 10;
            doc.text(`Subject: ${currentUser.subject}`, 20, yPosition);
            yPosition += 10;
            doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPosition);
            yPosition += 20;
            
            const classMarks = getFilteredMarks();
            const students = getStudentsForClass(currentUser.class || '');
            
            doc.text('MARKS SUMMARY:', 20, yPosition);
            yPosition += 15;
            
            students.forEach(student => {
              const studentMarks = classMarks.filter(m => m.studentId === student.id);
              const average = studentMarks.length > 0 ? 
                Math.round(studentMarks.reduce((sum, m) => sum + (m.score / m.totalScore * 100), 0) / studentMarks.length) : 0;
              
              doc.text(`${student.name}: Average ${average}%`, 20, yPosition);
              yPosition += 8;
              
              if (yPosition > 280) {
                doc.addPage();
                yPosition = 20;
              }
            });
          }
          break;
          
        case 'student-marks':
          doc.setFontSize(16);
          doc.text('STUDENT REPORT', 105, yPosition, { align: 'center' });
          yPosition += 20;
          
          doc.setFontSize(12);
          doc.text(`Student: ${currentUser.name}`, 20, yPosition);
          yPosition += 10;
          doc.text(`Class: ${currentUser.class}`, 20, yPosition);
          yPosition += 10;
          doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPosition);
          yPosition += 20;
          
          const studentMarks = getFilteredMarks(studentId);
          const studentAttendance = getFilteredAttendance().filter(a => a.studentId === (studentId || currentUser.id));
          
          doc.text('ACADEMIC PERFORMANCE:', 20, yPosition);
          yPosition += 15;
          
          studentMarks.forEach(m => {
            const percentage = Math.round((m.score / m.totalScore) * 100);
            doc.text(`${m.subject}: ${percentage}% (${new Date(m.timestamp).toLocaleDateString()})`, 20, yPosition);
            yPosition += 8;
            
            if (yPosition > 280) {
              doc.addPage();
              yPosition = 20;
            }
          });
          
          const overallAverage = studentMarks.length > 0 ? 
            Math.round(studentMarks.reduce((sum, m) => sum + (m.score / m.totalScore * 100), 0) / studentMarks.length) : 0;
          
          yPosition += 10;
          doc.text(`Overall Average: ${overallAverage}%`, 20, yPosition);
          yPosition += 20;
          
          doc.text('ATTENDANCE RECORD:', 20, yPosition);
          yPosition += 15;
          
          const totalDays = studentAttendance.length;
          const presentDays = studentAttendance.filter(r => r.status === 'present').length;
          const absentDays = studentAttendance.filter(r => r.status === 'absent').length;
          const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
          
          doc.text(`Total Days: ${totalDays}`, 20, yPosition);
          yPosition += 8;
          doc.text(`Present: ${presentDays}`, 20, yPosition);
          yPosition += 8;
          doc.text(`Absent: ${absentDays}`, 20, yPosition);
          yPosition += 8;
          doc.text(`Attendance Percentage: ${attendancePercentage}%`, 20, yPosition);
          
          break;
      }
      
      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
        doc.text('Generated by Axioms School Management System', 105, 295, { align: 'center' });
      }

      // Generate filename and save
      let fileName = '';
      switch (type) {
        case 'attendance':
          fileName = `Axioms_School_Attendance_Report_Class_${currentUser.class}_${new Date().toISOString().split('T')[0]}.pdf`;
          break;
        case 'marks':
          fileName = `Axioms_School_Marks_Report_Class_${currentUser.class}_${new Date().toISOString().split('T')[0]}.pdf`;
          break;
        case 'student-marks':
          fileName = `Axioms_School_Student_Report_${currentUser.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
          break;
      }
      
      doc.save(fileName);
      toast.success('PDF Report generated successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF report');
      console.error('PDF generation error:', error);
    }
  };

  const value = {
    homeworks,
    notices,
    events,
    messages,
    marks,
    fees,
    examSchedules,
    attendance,
    attendanceNotifications,
    addHomework,
    addNotice,
    addEvent,
    addMark,
    addFee,
    addExamSchedule,
    addAttendance,
    markAttendanceForClass,
    respondToAttendance,
    deleteHomework,
    deleteNotice,
    deleteEvent,
    deleteMark,
    deleteFee,
    deleteExamSchedule,
    updateFeeStatus,
    markHomeworkComplete,
    sendMessage,
    getTeacherForClass,
    getTeachersForClass,
    getStudentsForClass,
    getFilteredHomeworks,
    getFilteredNotices,
    getFilteredEvents,
    getFilteredMessages,
    getFilteredMarks,
    getFilteredFees,
    getFilteredExamSchedules,
    getFilteredAttendance,
    markMessageAsRead,
    generatePDFReport
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
