import { Navigate } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // Check if user is authenticated

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    console.log('Access token:', accessToken);

    if (accessToken) {
        localStorage.setItem('access_token', accessToken);
    }

    const isAuthenticated = !!localStorage.getItem('access_token');

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
};

export default ProtectedRoute;
