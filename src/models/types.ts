
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: number;
  read: boolean;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  assignedClass: string;
  createdBy: string;
  creatorName: string;
  dueDate: string;
  timestamp: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  assignedClass: string;
  createdBy: string;
  creatorName: string;
  timestamp: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  assignedClass: string;
  createdBy: string;
  creatorName: string;
  eventDate: string;
  timestamp: number;
}
