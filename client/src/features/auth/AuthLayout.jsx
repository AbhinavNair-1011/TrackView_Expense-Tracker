import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { verifyUserCookie } from './authSlice';

const AuthLayout = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [verifiedOnce, setVerifiedOnce] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
  console.log('AuthLayout mounted');
}, []);


  useEffect(() => {
    if (!isAuthenticated && !verifiedOnce) {
      dispatch(verifyUserCookie()).finally(() => setVerifiedOnce(true));
    }
  }, [isAuthenticated, verifiedOnce, dispatch]);

  if (loading || !verifiedOnce) return null;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
