// App.js - Example setup with routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard'; // You'll create this

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('hrms_auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Login = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        {/* Add more protected routes as needed */}
      </Routes>
    </Router>
  );
};

export default Login;