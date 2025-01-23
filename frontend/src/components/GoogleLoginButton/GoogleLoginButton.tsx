import { useAuth } from '../../store/auth';
import styles from './GoogleLoginButton.module.scss';

const GoogleLoginButton = () => {
  const { googleLogin } = useAuth();

  return (
    <button className={styles.googleButton} onClick={googleLogin}>
      Log in with Google
    </button>
  )
};

export default GoogleLoginButton;
