import { Navigate } from 'react-router-dom';
import ROUTES from '../config/routes';
import { useAuthStore } from '../stores/auth.store';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { checkAuth } = useAuthStore();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkAuth().then((result) => {
      setIsAuthorized(result);
      setIsAuthChecked(true);
    });
  }, []);

  if (!isAuthChecked) {
    return <div>Loading...</div>; 
  }

  return isAuthorized ? <>{children}</> : <Navigate to={ROUTES.AUTH} />;
}