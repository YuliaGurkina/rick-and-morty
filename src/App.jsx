import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { Categories, Article, Main, NotFound } from './pages';
import { CategoriesLayout } from './layouts/CategoriesLayout';
import './App.css';
import { publicRoute } from './constants/PublicRoute';

export const App = () => {
	return (
		<>
			<Routes>
				<Route element={<CategoriesLayout />}>
					<Route path={publicRoute.main} element={<Main />} />
					<Route path={publicRoute.characters}>
						<Route index element={<Categories />} />
						<Route path=":id" element={<Article />} />
					</Route>
					<Route path={publicRoute.locations}>
						<Route index element={<Categories />} />
						<Route path=":id" element={<Article />} />
					</Route>
					<Route path={publicRoute.episodes}>
						<Route index element={<Categories />} />
						<Route path=":id" element={<Article />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
};
