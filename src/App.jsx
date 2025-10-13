import { Route, Routes } from 'react-router-dom';
import { Categories, Article, Main, NotFound, Login } from './pages';
import { CategoriesLayout } from './layouts/CategoriesLayout';
import './App.css';
import { publicRoute } from './constants/PublicRoute';
import { AuthProvider } from './context/AuthProvider';
import { PrivateRoute } from './components';

export const App = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<CategoriesLayout />}>
					<Route path={publicRoute.main} element={<Main />} />
					<Route path={publicRoute.characters}>
						<Route
							index
							element={
								<PrivateRoute>
									<Categories />
								</PrivateRoute>
							}
						/>
						<Route
							path=":id"
							element={
								<PrivateRoute>
									<Article />
								</PrivateRoute>
							}
						/>
					</Route>
					<Route path={publicRoute.locations}>
						<Route
							index
							element={
								<PrivateRoute>
									<Categories />
								</PrivateRoute>
							}
						/>
						<Route
							path=":id"
							element={
								<PrivateRoute>
									<Article />
								</PrivateRoute>
							}
						/>
					</Route>
					<Route path={publicRoute.episodes}>
						<Route
							index
							element={
								<PrivateRoute>
									<Categories />
								</PrivateRoute>
							}
						/>
						<Route
							path=":id"
							element={
								<PrivateRoute>
									<Article />
								</PrivateRoute>
							}
						/>
					</Route>
					<Route path={publicRoute.login} element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
};
