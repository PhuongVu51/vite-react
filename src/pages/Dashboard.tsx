// Dashboard Component - Replaces home.php
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

export const Dashboard: React.FC = () => {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!session) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <nav className="header-nav">
        <a href="/dashboard" className="logo">
          CourseMS🐝
        </a>
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </nav>

      <div className="main-container">
        <div className="content-box">
          <h1 className="page-title">Welcome, {session.username}!</h1>
          <p>This is your teacher dashboard. Please choose an action:</p>
          <hr />

          <div className="text-center dashboard-buttons">
            <a href="/manage-students" className="btn btn-dashboard">
              🎓 Manage Students
            </a>
            <a href="/manage-exams" className="btn btn-dashboard">
              📝 Manage Exams
            </a>
            <a href="/manage-classes" className="btn btn-dashboard">
              🏫 Manage Classes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
