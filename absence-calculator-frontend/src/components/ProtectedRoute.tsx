import { useAuth } from '@/hooks/use-auth';
import Unauthorized from '@/pages/Unathorized';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();

  if (!auth?.user) {
    return <Unauthorized />;
  }

  return children;
};

export default ProtectedRoute;