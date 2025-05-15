import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './features/auth/pages/RegisterPage';
import LoginPage from './features/auth/pages/LoginPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
 
      </Routes>
    </Router>
  );
}

export default App