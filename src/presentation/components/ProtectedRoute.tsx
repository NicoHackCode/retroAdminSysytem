import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../domain/usecases/getCurrentUser';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}; 