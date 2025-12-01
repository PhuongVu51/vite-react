// Manage Exams Component - Replaces manage_exams.php
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../services/database';
import { Exam } from '../types';
import '../styles/dashboard.css';

export const ManageExams: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [formData, setFormData] = useState({
    exam_title: '',
    subject: '',
    exam_date: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    loadExams();
  }, [session, navigate]);

  const loadExams = () => {
    const allExams = database.getExams();
    setExams(allExams);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // Update existing exam
      database.updateExam(editingId, formData);
      setEditingId(null);
    } else {
      // Add new exam
      database.addExam(formData);
    }

    setFormData({
      exam_title: '',
      subject: '',
      exam_date: '',
    });

    loadExams();
  };

  const handleEdit = (exam: Exam) => {
    setFormData({
      exam_title: exam.exam_title,
      subject: exam.subject || '',
      exam_date: exam.exam_date || '',
    });
    setEditingId(exam.id);
  };

  const handleDelete = (id: number) => {
    const exam = database.getExam(id);
    if (exam && window.confirm(`Are you sure you want to delete "${exam.exam_title}"?`)) {
      database.deleteExam(id);
      loadExams();
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
          <h1 className="page-title">Manage Exams</h1>

          <div className="crud-container">
            <div className="form-container">
              <h2 className="section-title">
                {editingId ? 'Edit Exam' : 'Create New Exam'}
              </h2>
              <form onSubmit={handleAddExam}>
                <div className="form-group">
                  <label>Exam Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="exam_title"
                    value={formData.exam_title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Subject:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Exam Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="exam_date"
                    value={formData.exam_date}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Exam' : 'Create Exam'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        exam_title: '',
                        subject: '',
                        exam_date: '',
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>

            <div className="table-container">
              <h2 className="section-title">Exam List</h2>
              {exams.length === 0 ? (
                <p>No exams found. Create one using the form above.</p>
              ) : (
                <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Exam Title</th>
                      <th>Subject</th>
                      <th>Exam Date</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((exam) => (
                      <tr key={exam.id}>
                        <td>{exam.id}</td>
                        <td>{exam.exam_title}</td>
                        <td>{exam.subject || '-'}</td>
                        <td>{exam.exam_date || '-'}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleEdit(exam)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(exam.id)}
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
