import { NavLink } from 'react-router-dom';
import { publicRoute, mainMenu } from '../../constants';
import { AuthStatus } from '..';
import { useAuth } from '../../context/AuthProvider';
import styles from './Header.module.css';

export const Header = () => {
	const auth = useAuth();

	return (
		<ul className={styles.menu}>
			{mainMenu.map((item) => {
				if (
					item.path !== publicRoute.login ||
					(item.path === publicRoute.login && !auth.user)
				) {
					return (
						<li key={item.path}>
							<NavLink
								to={item.path}
								className={({ isActive }) =>
									isActive ? styles.active : styles.navLink
								}
							>
								{item.title}
							</NavLink>
						</li>
					);
				}
			})}

			<hr />

			<li>
				<AuthStatus />
			</li>
		</ul>
	);
};
