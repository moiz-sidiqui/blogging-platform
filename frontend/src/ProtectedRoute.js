import { Navigate } from 'react-router-dom';
import { GlobalStateContext } from './contexts/GlobalStateContext';
import { useContext } from 'react';

const ProtectedRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useContext(GlobalStateContext);
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
