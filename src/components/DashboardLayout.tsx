import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Log from './Log';
// import { get} from '../api/axiosApi';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleLogout = async() => {
    // Clear auth tokens
    localStorage.removeItem('access_token');
    // await get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`);
    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900">
      {/* Mobile menu toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-40 w-full bg-slate-800/90 backdrop-blur-sm px-4 py-3 border-b border-slate-700 shadow-lg">
        <div className="flex items-center justify-between">
          <Log />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-slate-800 border-r border-slate-700 transition duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:flex lg:flex-shrink-0 shadow-xl`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex flex-shrink-0 items-center justify-center px-4 h-16 border-b border-slate-700">
            <Link to="/dashboard" className="block">
              <Log />
            </Link>
          </div>
          <div className="flex-1 flex flex-col px-3 py-4">
            <nav className="flex-1 space-y-2">
              <Link
                to="/dashboard"
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive('/dashboard') && !isActive('/dashboard/profile') && !isActive('/dashboard/settings')
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                    : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 transition-colors ${
                    isActive('/dashboard') && !isActive('/dashboard.profile') && !isActive('/dashboard/settings') ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </Link>

              <Link
                to="/dashboard/urls"
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive('/dashboard/urls')
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                    : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 transition-colors ${
                    isActive('/dashboard/urls') ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"
                  />
                </svg>
                My URLs
              </Link>

              <Link
                to="/dashboard"
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive('/dashboard/profile')
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
                    : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
                }`}
              >
                <svg
                  className={`mr-3 h-5 w-5 transition-colors ${
                    isActive('/dashboard/profile') ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </Link>

              <div className="pt-4 mt-4 border-t border-slate-700">
                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-slate-300 hover:bg-red-600/20 hover:text-red-400"
                >
                  <svg
                    className="mr-3 h-5 w-5 text-slate-400 group-hover:text-red-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 pt-16 lg:pt-6">{children}</main>
      </div>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
