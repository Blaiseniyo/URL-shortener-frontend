import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import URLAnalytics from './pages/URLAnalytics';
import URLEdit from './pages/URLEdit';
import ProtectedRoute from './components/ProtectedRoute';
import UserURLs from './pages/UserURLs';

function App() {
  // const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/urls" element={
        <ProtectedRoute>
          <UserURLs />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/analytics/:id" element={
        <ProtectedRoute>
          <URLAnalytics />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/analytics/:id/edit" element={
        <ProtectedRoute>
          <URLEdit />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
