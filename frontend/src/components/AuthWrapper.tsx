import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { authAtom, useAuth } from '../store/auth';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [{ isLoading }] = useAtom(authAtom);
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}