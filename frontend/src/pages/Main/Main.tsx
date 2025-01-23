import { useAtom } from 'jotai';
import styles from './main.module.scss';
import { authAtom, useAuth } from '../../store/auth';

export default function Main() {
    const [auth] = useAtom(authAtom);
    const { logout } = useAuth();

    return (
        <div className={styles.mainContainer}>
            <header className={styles.header}>
                <h1>Welcome!</h1>
                <div className={styles.userInfo}>
                    <span>{auth.user?.email}</span>
                    <button 
                        className={styles.logoutButton}
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </header>
        </div>
    );
}
