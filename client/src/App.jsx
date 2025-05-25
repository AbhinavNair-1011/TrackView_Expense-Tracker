import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import AuthLayout from "./features/auth/AuthLayout";
import ProtectedRoute from "./features/auth/ProtectetRoute";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import ExpensePage from "./features/expense/pages/ExpensePage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import NotFoundPage from "./features/404/NotFoundPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ExpensePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
