import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { ManageStudents } from './pages/ManageStudents';
import { ManageExams } from './pages/ManageExams';
import { ManageClasses } from './pages/ManageClasses';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-students"
            element={
              <ProtectedRoute>
                <ManageStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-exams"
            element={
              <ProtectedRoute>
                <ManageExams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-classes"
            element={
              <ProtectedRoute>
                <ManageClasses />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
