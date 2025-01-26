import GoogleButton from 'react-google-button';
import styles from './auth.module.scss';
import { useAuth } from '../../store/auth';

export default function Auth() {
  const { googleLogin } = useAuth();

  return (
    <div className={styles.authContainer}>
      <GoogleButton type='light' className='google-button' onClick={googleLogin} />
    </div>
  );
} 