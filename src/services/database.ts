// Mock Database Service - Simulates MySQL database
import { Teacher, Student, Exam, Class } from '../types';

const DB_KEY = 'coursems_db';

interface DatabaseStore {
  teachers: Teacher[];
  students: Student[];
  exams: Exam[];
  classes: Class[];
}

// Initialize with some sample data
const initializeDatabase = (): DatabaseStore => {
  const existingDb = localStorage.getItem(DB_KEY);
  if (existingDb) {
    return JSON.parse(existingDb);
  }

  const defaultDb: DatabaseStore = {
    teachers: [],
    students: [],
    exams: [],
    classes: [],
  };

  localStorage.setItem(DB_KEY, JSON.stringify(defaultDb));
  return defaultDb;
};

const getDatabase = (): DatabaseStore => {
  const db = localStorage.getItem(DB_KEY);
  return db ? JSON.parse(db) : initializeDatabase();
};

const saveDatabase = (db: DatabaseStore): void => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const database = {
  initializeDatabase,
  getDatabase,
  saveDatabase,

  // Teacher operations
  addTeacher: (teacher: Omit<Teacher, 'id'>): Teacher => {
    const db = getDatabase();
    const newTeacher: Teacher = {
      ...teacher,
      id: Date.now(),
    };
    db.teachers.push(newTeacher);
    saveDatabase(db);
    return newTeacher;
  },

  getTeacher: (email: string, password: string): Teacher | null => {
    const db = getDatabase();
    return (
      db.teachers.find((t) => t.email === email && t.password === password) ||
      null
    );
  },

  getTeacherById: (id: number): Teacher | null => {
    const db = getDatabase();
    return db.teachers.find((t) => t.id === id) || null;
  },

  teacherExists: (email: string): boolean => {
    const db = getDatabase();
    return db.teachers.some((t) => t.email === email);
  },

  // Student operations
  addStudent: (student: Omit<Student, 'id'>): Student => {
    const db = getDatabase();
    const newStudent: Student = {
      ...student,
      id: Date.now(),
    };
    db.students.push(newStudent);
    saveDatabase(db);
    return newStudent;
  },

  getStudents: (): Student[] => {
    const db = getDatabase();
    return db.students;
  },

  getStudent: (id: number): Student | null => {
    const db = getDatabase();
    return db.students.find((s) => s.id === id) || null;
  },

  updateStudent: (id: number, updates: Partial<Student>): Student | null => {
    const db = getDatabase();
    const student = db.students.find((s) => s.id === id);
    if (student) {
      Object.assign(student, updates);
      saveDatabase(db);
    }
    return student || null;
  },

  deleteStudent: (id: number): boolean => {
    const db = getDatabase();
    const index = db.students.findIndex((s) => s.id === id);
    if (index !== -1) {
      db.students.splice(index, 1);
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // Exam operations
  addExam: (exam: Omit<Exam, 'id'>): Exam => {
    const db = getDatabase();
    const newExam: Exam = {
      ...exam,
      id: Date.now(),
    };
    db.exams.push(newExam);
    saveDatabase(db);
    return newExam;
  },

  getExams: (): Exam[] => {
    const db = getDatabase();
    return db.exams;
  },

  getExam: (id: number): Exam | null => {
    const db = getDatabase();
    return db.exams.find((e) => e.id === id) || null;
  },

  updateExam: (id: number, updates: Partial<Exam>): Exam | null => {
    const db = getDatabase();
    const exam = db.exams.find((e) => e.id === id);
    if (exam) {
      Object.assign(exam, updates);
      saveDatabase(db);
    }
    return exam || null;
  },

  deleteExam: (id: number): boolean => {
    const db = getDatabase();
    const index = db.exams.findIndex((e) => e.id === id);
    if (index !== -1) {
      db.exams.splice(index, 1);
      saveDatabase(db);
      return true;
    }
    return false;
  },

  // Class operations
  addClass: (classData: Omit<Class, 'id'>): Class => {
    const db = getDatabase();
    const newClass: Class = {
      ...classData,
      id: Date.now(),
    };
    db.classes.push(newClass);
    saveDatabase(db);
    return newClass;
  },

  getClasses: (teacherId: number): Class[] => {
    const db = getDatabase();
    return db.classes.filter((c) => c.teacher_id === teacherId);
  },

  getClass: (id: number): Class | null => {
    const db = getDatabase();
    return db.classes.find((c) => c.id === id) || null;
  },

  deleteClass: (id: number): boolean => {
    const db = getDatabase();
    const index = db.classes.findIndex((c) => c.id === id);
    if (index !== -1) {
      db.classes.splice(index, 1);
      saveDatabase(db);
      return true;
    }
    return false;
  },
};
