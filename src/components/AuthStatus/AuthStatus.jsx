import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import styles from './AuthStatus.module.css';

export const AuthStatus = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	const handleSignout = () => {
		auth.signout(() => {
			navigate('/');
		});
	};

	if (auth.user === null) {
		return (
			<p className={styles.authInfo}>
				<span>You are not logged in.</span>
			</p>
		);
	}

	return (
		<p className={styles.authInfo}>
			Welcome user {auth.user}
			<button onClick={handleSignout} className={styles.button}>
				Sign out
			</button>
		</p>
	);
};
