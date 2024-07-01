import { ReactNode } from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
