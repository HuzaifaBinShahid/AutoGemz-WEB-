import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated && user) {
    // If authenticated and trying to access a public route (like /login),
    // redirect to the appropriate dashboard.
    // If Admin, go to dashboard by default (or we could check for an 'intent').
    if (user.role === 'inspector') {
      return <Navigate to="/inspector" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
