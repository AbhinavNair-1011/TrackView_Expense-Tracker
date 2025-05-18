import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RegisterPage from './features/auth/pages/RegisterPage';
import LoginPage from './features/auth/pages/LoginPage';
import DashboardLayout from './features/dashboard/DashboardLayout';
import DashboardHome from './features/dashboard/pages/DashboardHome';
import ProfilePage from './features/profile/pages/ProfilePage';
import AuthLayout from './features/auth/AuthLayout';
import ProtectedRoute from './features/auth/ProtectetRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserCookie } from './features/auth/authSlice';
import { useState } from 'react';
import ResetPasswordPage from './features/auth/pages/ResetPasswordPage';
import ExpensePage from './features/expense/pages/ExpensePage';



function App() {
  const dispatch = useDispatch();


  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    dispatch(verifyUserCookie()).finally(() => setVerifying(false));


  }, [dispatch]);

  if (verifying) return null;



  return (
    <Router>
      <Routes>

        <Route path="/" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />

        </Route>

        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="expenses" element={<ExpensePage/>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App


