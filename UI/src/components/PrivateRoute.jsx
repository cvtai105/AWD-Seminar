import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../AppContext';  // Import the hook

const PrivateRoute = () => {
  const { isAuthenticated } = useAppContext();  // Get authentication state from context

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child components
  return <Outlet />;
};

export default PrivateRoute;
