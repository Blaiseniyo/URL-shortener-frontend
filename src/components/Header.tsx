import React from 'react';
import { Link } from 'react-router-dom';
import Log from './Log';

const Header: React.FC = () => {
  return (
    <header className="container mx-auto py-4 px-4 flex justify-between items-center">
      <div className="flex items-center">
        <Log />
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/login" className="hover:text-cyan-300 transition-colors">Log in</Link>
        <Link to="/register" className="bg-cyan-500 text-white hover:bg-cyan-600 px-4 py-2 rounded-md transition-all duration-200">
          Sign up Free
        </Link>
      </div>
    </header>
  );
};

export default Header;
