import { NavLink, Outlet } from 'react-router-dom';
import { publicRoute } from '../constants/PublicRoute';
import { AuthStatus } from '../components';
import { useAuth } from '../context/AuthProvider';

export const CategoriesLayout = () => {
	const auth = useAuth();

	return (
		<div className="container">
			<ul className="menu">
				<li>
					<NavLink to={publicRoute.main}>На главную</NavLink>
				</li>
				<li>
					<NavLink
						to={publicRoute.characters}
						className={({ isActive }) => (isActive ? 'active' : null)}
					>
						Герои
					</NavLink>
				</li>
				<li>
					<NavLink to={publicRoute.locations}>Локации</NavLink>
				</li>
				<li>
					<NavLink to={publicRoute.episodes}>Эпизоды</NavLink>
				</li>
				{!auth.user && (
					<li>
						<NavLink to={publicRoute.login}>Войти</NavLink>
					</li>
				)}
				<hr />
				<li>
					<AuthStatus />
				</li>
			</ul>

			<Outlet />
		</div>
	);
};
