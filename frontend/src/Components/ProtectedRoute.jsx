import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Import your auth utility

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the requested component
  return children;
}

export default ProtectedRoute;