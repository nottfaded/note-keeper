import GoogleButton from 'react-google-button';
import styles from './auth.module.scss';
import { useAuth } from '../../store/auth';

export default function Auth() {
  const { googleLogin } = useAuth();

  return (
    <div className={styles.authContainer}>
      <h1>Log in</h1>
      <GoogleButton onClick={googleLogin} />
    </div>
  );
} 