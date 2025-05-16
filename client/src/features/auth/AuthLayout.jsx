import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const { isAuthenticated,loading } = useSelector((state) => state.auth);

  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }


  return  <Outlet />;
};

export default AuthLayout;
