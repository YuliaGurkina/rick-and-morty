import { publicRoute } from './PublicRoute';

export const mainMenu = [
	{
		path: publicRoute.main,
		title: 'Главная',
		component: 'Main',
	},
	{
		path: publicRoute.categories,
		title: 'Категории',
		component: 'Categories',
	},
	{
		path: publicRoute.login,
		title: 'Войти',
		component: 'Login',
	},
];
