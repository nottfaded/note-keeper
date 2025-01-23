import { Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import ROUTES from '../config/routes';
import { authAtom } from '../store/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [{ isAuthenticated }] = useAtom(authAtom);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} />;
  }

  return <>{children}</>;
}