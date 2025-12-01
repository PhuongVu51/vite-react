// Register Component - Replaces register.php
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [subjects, setSubjects] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const success_result = await register(
      fullName,
      email,
      password,
      dob,
      gender,
      subjects
    );

    if (success_result) {
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError('Email already exists. Please use a different email.');
    }
  };

  return (
    <div className="login-container">
      <div
        className="login-form-box"
        style={{ marginTop: '50px', marginBottom: '50px' }}
      >
        <h2>Teacher Sign Up</h2>
        <p>Please fill in the details below.</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Subject(s)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Math, English..."
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit">
            Sign Up
          </button>
        </form>

        <div className="register-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};
