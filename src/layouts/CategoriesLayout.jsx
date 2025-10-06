import { NavLink, Outlet } from 'react-router-dom';
import { publicRoute } from '../constants/PublicRoute';

export const CategoriesLayout = () => {
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
			</ul>

			<Outlet />
		</div>
	);
};
