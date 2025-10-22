import { NavLink, Outlet } from 'react-router-dom';
import { categoriesMenu } from '../../constants';
import styles from './CategoriesLayout.module.css';

export const CategoriesLayout = () => {
	return (
		<div className={styles.categoriesPage}>
			<aside>
				<ul className={styles.categoriesMenu}>
					{categoriesMenu.map((item) => (
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
					))}
				</ul>
			</aside>
			<main className={styles.categoriesContent}>
				<Outlet />
			</main>
		</div>
	);
};
