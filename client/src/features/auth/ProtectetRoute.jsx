import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const {isAuthenticated,loading} = useSelector((state) => state.auth);

  if(loading) return null

  if (!isAuthenticated) {
    return <Navigate to="/" replace/>;
  }

    return children;
  

};

export default ProtectedRoute;
