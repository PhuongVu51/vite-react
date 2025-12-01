// Manage Students Component - Replaces manage_students.php
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../services/database';
import { Student, Class } from '../types';
import '../styles/dashboard.css';

export const ManageStudents: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [formData, setFormData] = useState({
    student_id_code: '',
    full_name: '',
    email: '',
    class_name: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    loadData();
  }, [session, navigate]);

  const loadData = () => {
    const allStudents = database.getStudents();
    setStudents(allStudents);

    const teacherClasses = database.getClasses(session?.teacher_id || 0);
    setClasses(teacherClasses);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // Update existing student
      database.updateStudent(editingId, formData);
      setEditingId(null);
    } else {
      // Add new student
      database.addStudent(formData);
    }

    setFormData({
      student_id_code: '',
      full_name: '',
      email: '',
      class_name: '',
    });

    loadData();
  };

  const handleEdit = (student: Student) => {
    setFormData({
      student_id_code: student.student_id_code,
      full_name: student.full_name,
      email: student.email || '',
      class_name: student.class_name || '',
    });
    setEditingId(student.id);
  };

  const handleDelete = (id: number) => {
    const student = database.getStudent(id);
    if (
      student &&
      window.confirm(`Are you sure you want to delete ${student.full_name}?`)
    ) {
      database.deleteStudent(id);
      loadData();
    }
  };

  if (!session) return null;

  return (
    <div>
      <nav className="header-nav">
        <a href="/dashboard" className="logo">
          Teacher Bee 🐝
        </a>
        <a href="/dashboard" className="logout-btn">
          Back
        </a>
      </nav>

      <div className="main-container">
        <div className="content-box">
          <a href="/dashboard" className="btn btn-info" style={{ marginBottom: '20px' }}>
            ⬅️ Back to Dashboard
          </a>
          <h1 className="page-title">Manage Students</h1>

          <div className="crud-container">
            <div className="form-container">
              <h2 className="section-title">
                {editingId ? 'Edit Student' : 'Create New Student'}
              </h2>
              <form onSubmit={handleAddStudent}>
                <div className="form-group">
                  <label>Student ID Code:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="student_id_code"
                    value={formData.student_id_code}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Class:</label>
                  {classes.length > 0 ? (
                    <select
                      className="form-control"
                      name="class_name"
                      value={formData.class_name}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a class</option>
                      {classes.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      name="class_name"
                      value={formData.class_name}
                      onChange={handleInputChange}
                      placeholder="Enter class name"
                    />
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Student' : 'Create Student'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        student_id_code: '',
                        full_name: '',
                        email: '',
                        class_name: '',
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>

            <div className="table-container">
              <h2 className="section-title">Student List</h2>
              {students.length === 0 ? (
                <p>No students found. Create one using the form above.</p>
              ) : (
                <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Student Code</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Class</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.student_id_code}</td>
                        <td>{student.full_name}</td>
                        <td>{student.email || '-'}</td>
                        <td>{student.class_name || '-'}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleEdit(student)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(student.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
