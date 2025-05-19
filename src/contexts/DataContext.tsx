
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Homework, Notice, Event, Message, Mark, Subject } from '../models/types';
import { useAuth, User } from './AuthContext';
import { toast } from 'sonner';

interface DataContextType {
  homeworks: Homework[];
  notices: Notice[];
  events: Event[];
  messages: Message[];
  marks: Mark[];
  addHomework: (homework: Omit<Homework, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => void;
  addNotice: (notice: Omit<Notice, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => void;
  addEvent: (event: Omit<Event, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => void;
  addMark: (mark: Omit<Mark, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => void;
  deleteHomework: (id: string) => void;
  deleteNotice: (id: string) => void;
  deleteEvent: (id: string) => void;
  deleteMark: (id: string) => void;
  sendMessage: (content: string, receiverId: string) => void;
  getTeacherForClass: (className: string) => User | undefined;
  getTeachersForClass: (className: string) => User[];
  getFilteredHomeworks: () => Homework[];
  getFilteredNotices: () => Notice[];
  getFilteredEvents: () => Event[];
  getFilteredMessages: () => Message[];
  getFilteredMarks: (studentId?: string) => Mark[];
  markMessageAsRead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedHomeworks = localStorage.getItem('homeworks');
    const storedNotices = localStorage.getItem('notices');
    const storedEvents = localStorage.getItem('events');
    const storedMessages = localStorage.getItem('messages');
    const storedMarks = localStorage.getItem('marks');
    const storedUsers = localStorage.getItem('users');
    
    if (storedHomeworks) setHomeworks(JSON.parse(storedHomeworks));
    if (storedNotices) setNotices(JSON.parse(storedNotices));
    if (storedEvents) setEvents(JSON.parse(storedEvents));
    if (storedMessages) setMessages(JSON.parse(storedMessages));
    if (storedMarks) setMarks(JSON.parse(storedMarks));
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        // Extract users from the structure in localStorage
        if (typeof parsedUsers === 'object' && parsedUsers !== null) {
          const extractedUsers = Object.values(parsedUsers)
            .map(record => (record as any).user)
            .filter(Boolean);
          
          setUsers(extractedUsers as User[]);
        }
      } catch (error) {
        console.error('Error parsing users:', error);
      }
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

  // Function to get the teacher for a specific class
  const getTeacherForClass = (className: string) => {
    return users.find(user => user.role === 'teacher' && user.class === className);
  };

  // Function to get all teachers for a class
  const getTeachersForClass = (className: string) => {
    return users.filter(user => user.role === 'teacher' && user.class === className);
  };

  // Function to add a new homework
  const addHomework = (homework: Omit<Homework, 'id' | 'timestamp' | 'createdBy' | 'creatorName'>) => {
    if (!currentUser) return;
    
    const newHomework: Homework = {
      ...homework,
      id: Date.now().toString(),
      timestamp: Date.now(),
      createdBy: currentUser.id,
      creatorName: currentUser.name
    };
    
    setHomeworks(prev => [...prev, newHomework]);
    toast.success('Homework added successfully');
  };

  // Function to add a new notice
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

  // Function to add a new event
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

  // Function to add a new mark
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

  // Function to delete a homework
  const deleteHomework = (id: string) => {
    setHomeworks(prev => prev.filter(hw => hw.id !== id));
    toast.success('Homework deleted successfully');
  };

  // Function to delete a notice
  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    toast.success('Notice deleted successfully');
  };

  // Function to delete an event
  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    toast.success('Event deleted successfully');
  };

  // Function to delete a mark
  const deleteMark = (id: string) => {
    setMarks(prev => prev.filter(m => m.id !== id));
    toast.success('Mark deleted successfully');
  };

  // Function to send a message
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

  // Function to mark a message as read
  const markMessageAsRead = (id: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
  };

  // Filtered data based on user role and class
  const getFilteredHomeworks = () => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'teacher') {
      // Teacher should only see homeworks for their class and subject
      return homeworks.filter(hw => 
        hw.assignedClass === currentUser.class && 
        (!currentUser.subject || hw.createdBy === currentUser.id)
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

  const getFilteredMessages = () => {
    if (!currentUser) return [];
    
    // For teachers: Show messages where they are the receiver
    if (currentUser.role === 'teacher') {
      return messages.filter(m => m.receiverId === currentUser.id || m.senderId === currentUser.id);
    } 
    // For students: Show messages they sent and received
    else {
      return messages.filter(m => 
        m.senderId === currentUser.id || m.receiverId === currentUser.id
      );
    }
  };

  // Function to get marks filtered by student ID or current user
  const getFilteredMarks = (studentId?: string) => {
    if (!currentUser) return [];
    
    // For teachers: Show marks for their class and subject
    if (currentUser.role === 'teacher') {
      const studentsInClass = users.filter(
        user => user.role === 'student' && user.class === currentUser.class
      );
      
      const studentIds = studentsInClass.map(s => s.id);
      
      return marks.filter(m => 
        studentIds.includes(m.studentId) && 
        (!currentUser.subject || m.subject === currentUser.subject)
      );
    } 
    // For students: Show only their marks
    else {
      const targetId = studentId || currentUser.id;
      return marks.filter(m => m.studentId === targetId);
    }
  };

  const value = {
    homeworks,
    notices,
    events,
    messages,
    marks,
    addHomework,
    addNotice,
    addEvent,
    addMark,
    deleteHomework,
    deleteNotice,
    deleteEvent,
    deleteMark,
    sendMessage,
    getTeacherForClass,
    getTeachersForClass,
    getFilteredHomeworks,
    getFilteredNotices,
    getFilteredEvents,
    getFilteredMessages,
    getFilteredMarks,
    markMessageAsRead
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
