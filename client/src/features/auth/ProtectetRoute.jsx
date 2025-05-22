import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logoutUser, verifyUserCookie } from './authSlice';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [verifying, setVerifying] = useState(true);

  const handleVerificationFailed = () => {
    dispatch(logoutUser())
  }

  useEffect(() => {
    dispatch(verifyUserCookie()).finally(() => setVerifying(false));
    window.addEventListener("logout", handleVerificationFailed)
    return () => window.removeEventListener('logout', handleVerificationFailed);
  }, [dispatch]);

  // if (loading) return null
  if (verifying) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;


};

export default ProtectedRoute;
