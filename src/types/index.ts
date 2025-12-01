// Type definitions for the Course Management System

export interface Teacher {
  id: number;
  full_name: string;
  email: string;
  password: string;
  dob?: string;
  gender?: string;
  subjects?: string;
}

export interface Student {
  id: number;
  student_id_code: string;
  full_name: string;
  email?: string;
  class_name?: string;
  class_id?: number;
}

export interface Exam {
  id: number;
  exam_title: string;
  subject?: string;
  exam_date?: string;
}

export interface Class {
  id: number;
  name: string;
  teacher_id: number;
}

export interface Session {
  username: string;
  email: string;
  teacher_id: number;
}
