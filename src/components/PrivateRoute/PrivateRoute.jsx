import { Navigate, useLocation } from 'react-router-dom';
import { publicRoute } from '../../constants/PublicRoute';
import { useAuth } from '../../context/AuthProvider';

export const PrivateRoute = ({ children }) => {
	const auth = useAuth();
	const location = useLocation();

	if (auth.user === null) {
		return (
			<Navigate
				to={publicRoute.login}
				state={{ from: location.pathname }}
				replace
			/>
		);
	}

	return children;
};
