// ProtectedRoute.jsx - a "guard" around private pages.
// If nobody is logged in, send the visitor to /login instead of showing the page.
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
