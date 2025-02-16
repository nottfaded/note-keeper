import GoogleButton from 'react-google-button';
import styles from './auth.module.scss';
import { authAtom, useAuthStore } from '../../stores/auth.store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { STRING_EMPTY } from '../../config/constants';

export default function Auth() {
  const { googleLogin } = useAuthStore();
  const [{ errorMsg }] = useAtom(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);

      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className={styles.authContainer}>
      <GoogleButton type='light' className='google-button' onClick={googleLogin} />
      {
        errorMsg !== STRING_EMPTY &&
        (
          <div className={styles.alertComponent}>
            ⚠️{errorMsg}
          </div>
        )
      }

    </div>
  );
}