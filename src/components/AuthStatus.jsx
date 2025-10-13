import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

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
			<p className="auth-info">
				<span>You are not logged in.</span>
			</p>
		);
	}

	return (
		<p className="auth-info">
			Welcome user {auth.user}
			<button onClick={handleSignout} className="button">
				Sign out
			</button>
		</p>
	);
};
