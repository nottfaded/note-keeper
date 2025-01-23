import { atom, useSetAtom } from 'jotai';
import axios from 'axios';
import { API_URL } from '../config/URLs';

interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const authAtom = atom<AuthState>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});

export function useAuth() {
  const setAuthState = useSetAtom(authAtom);

  const checkAuth = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await axios.get(`${API_URL}/auth/check`, { withCredentials: true });
      setAuthState({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  };

  const logout = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const googleLogin = () => {
    window.location.href = `${API_URL}/auth/googleLogin`;
  };

  return { checkAuth, logout, googleLogin };
}
