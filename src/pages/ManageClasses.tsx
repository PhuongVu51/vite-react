// Manage Classes Component - Replaces manage_classes.php
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../services/database';
import { Class } from '../types';
import '../styles/dashboard.css';

export const ManageClasses: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Class[]>([]);
  const [className, setClassName] = useState('');

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    loadClasses();
  }, [session, navigate]);

  const loadClasses = () => {
    if (session) {
      const teacherClasses = database.getClasses(session.teacher_id);
      setClasses(teacherClasses);
    }
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();

    if (className.trim() !== '' && session) {
      database.addClass({
        name: className,
        teacher_id: session.teacher_id,
      });

      setClassName('');
      loadClasses();
    }
  };

  const handleDeleteClass = (id: number) => {
    const classItem = database.getClass(id);
    if (classItem && window.confirm(`Are you sure you want to delete class "${classItem.name}"?`)) {
      database.deleteClass(id);
      loadClasses();
    }
  };

  if (!session) return null;

  return (
    <div>
      <nav className="header-nav">
        <a href="/dashboard" className="logo">
          CourseMS🐝
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
          <h1 className="page-title">Manage Classes</h1>

          <div className="crud-container">
            <div className="form-container">
              <h2 className="section-title">Create New Class</h2>
              <form onSubmit={handleCreateClass}>
                <div className="form-group">
                  <label>Class Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Class
                </button>
              </form>
            </div>

            <div className="table-container">
              <h2 className="section-title">Your Classes</h2>
              {classes.length === 0 ? (
                <p>No classes found. Create one using the form at left.</p>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Class ID</th>
                      <th>Class Name</th>
                      <th>Teacher ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((classItem) => (
                      <tr key={classItem.id}>
                        <td>{classItem.id}</td>
                        <td>{classItem.name}</td>
                        <td>{classItem.teacher_id}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => navigate(`/manage-students?class_id=${classItem.id}`)}
                          >
                            Student List
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteClass(classItem.id)}
                            style={{ marginLeft: '5px' }}
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
