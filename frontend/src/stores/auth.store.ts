import { atom, useSetAtom } from 'jotai';
import axios from 'axios';
import { AUTH_API } from '../config/URLs';
import { useUserStore } from './user.store';
import { STRING_EMPTY } from '../config/constants';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../config/routes';
import axiosToken from '../api/axiosToken';

interface AuthState {
  isLoading: boolean;
  errorMsg : string;
}

export const authAtom = atom<AuthState>({
  isLoading: true,
  errorMsg: STRING_EMPTY
});

export function useAuthStore() {
  const setAuthState = useSetAtom(authAtom);
  const userStore = useUserStore();
  const navigate = useNavigate();

  // const checkAuth = async () => {
  //   setAuthState((prev) => ({ ...prev, isLoading: true }));
  //   try {
  //     const response = await axios.get(`${AUTH_API}/auth/check`, { withCredentials: true });
  //     setAuthState({ isAuthenticated: true, isLoading: false });
  //     userStore.setData(response.data)
  //   } catch {
  //     setAuthState({ isAuthenticated: false, isLoading: false });
  //     userStore.resetData();
  //   }
  // };
  const checkAuth = async (): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    const token = localStorage.getItem("authToken");

    if (!token) {
      setAuthState({ 
        isLoading: false, 
        errorMsg: STRING_EMPTY
      });
      
      userStore.resetData();

      return false;
    }

    try {
      const response = await axiosToken.get(`${AUTH_API}/auth/check`);

      setAuthState({ 
        isLoading: false,
        errorMsg: STRING_EMPTY
      });

      userStore.setData(response.data);

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        localStorage.removeItem("authToken");

        setAuthState({  
          isLoading: false,
          errorMsg: error.response.data
        });

        userStore.resetData();
      }

      return false;
    }
  };

  // const logout = async () => {
  //   setAuthState((prev) => ({ ...prev, isLoading: true }));
  //   try {
  //     await axios.get(`${AUTH_API}/auth/logout`, { withCredentials: true });
  //     setAuthState({ isAuthenticated: false, isLoading: false });
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // };
  const logout = () => {
    localStorage.removeItem("authToken");
    
    setAuthState({ 
      isLoading: false,
      errorMsg: STRING_EMPTY,
    });

    userStore.resetData();

    navigate(ROUTES.AUTH)
  };

  const googleLogin = () => {
    window.location.href = `${AUTH_API}/auth/googleLogin`;
  };

  return { checkAuth, logout, googleLogin };
}
