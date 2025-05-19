
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Subject } from '../models/types';

export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  class: string;
  subject?: Subject;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole, assignedClass: string, subject?: Subject) => Promise<void>;
  logout: () => void;
  updateUserProfile?: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = currentUser !== null;

  // Check if there's a logged-in user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    try {
      // Simulated API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const userRecord = Object.values(users).find(
        (u: any) => u.user.email === email && u.password === password
      ) as { user: User, password: string } | undefined;
      
      if (!userRecord) {
        throw new Error('Invalid email or password');
      }
      
      const user = userRecord.user;
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Mock registration function
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole, 
    assignedClass: string, 
    subject?: Subject
  ) => {
    try {
      // Simulated API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const userExists = Object.values(users).some(
        (u: any) => u.user.email === email
      );
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const userId = Date.now().toString();
      const newUser: User = {
        id: userId,
        name,
        email,
        role,
        class: assignedClass,
        ...(role === 'teacher' && subject ? { subject } : {})
      };
      
      // Store user in localStorage
      users[userId] = {
        user: newUser,
        password
      };
      
      localStorage.setItem('users', JSON.stringify(users));
      
      return;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Mock logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Mock update user profile function
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    try {
      // Simulated API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const userRecord = users[currentUser.id];
      
      if (!userRecord) {
        throw new Error('User not found');
      }
      
      const updatedUser = {
        ...currentUser,
        ...updates
      };
      
      userRecord.user = updatedUser;
      users[currentUser.id] = userRecord;
      
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
