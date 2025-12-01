// Authentication Context
import { createContext, useState, useContext, useEffect } from 'react';
import { Session } from '../types';
import { database } from '../services/database';

interface AuthContextType {
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    fullName: string,
    email: string,
    password: string,
    dob: string,
    gender: string,
    subjects: string
  ) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedSession = sessionStorage.getItem('coursems_session');
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
  }, []);

  const hashPassword = (password: string): string => {
    // Simple base64 hash (simulates MD5 from PHP)
    let binary = '';
    for (let i = 0; i < password.length; i++) {
      binary += String.fromCharCode(password.charCodeAt(i));
    }
    return btoa(binary);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const hashedPassword = hashPassword(password);
    const teacher = database.getTeacher(email, hashedPassword);

    if (teacher) {
      const newSession: Session = {
        username: teacher.full_name,
        email: teacher.email,
        teacher_id: teacher.id,
      };
      setSession(newSession);
      sessionStorage.setItem('coursems_session', JSON.stringify(newSession));
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setSession(null);
    sessionStorage.removeItem('coursems_session');
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    dob: string,
    gender: string,
    subjects: string
  ): Promise<boolean> => {
    // Check if email already exists
    if (database.teacherExists(email)) {
      return false;
    }

    const hashedPassword = hashPassword(password);
    const newTeacher = database.addTeacher({
      full_name: fullName,
      email,
      password: hashedPassword,
      dob,
      gender,
      subjects,
    });

    return !!newTeacher;
  };

  const value: AuthContextType = {
    session,
    login,
    logout,
    register,
    isAuthenticated: !!session,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
