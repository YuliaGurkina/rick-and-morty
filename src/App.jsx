import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { CategoriesLayout } from './layouts/CategoriesLayout/CategoriesLayout';
import { publicRoute } from './constants';
import { AuthProvider } from './context/AuthProvider';
import { PrivateRoute } from './components';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

const Login = lazy(() =>
	import('./pages/Login/Login').then((module) => ({
		default: module.Login,
	})),
);

const Main = lazy(() =>
	import('./pages/Main/Main').then((module) => ({
		default: module.Main,
	})),
);

const Categories = lazy(() =>
	import('./pages/Categories/Categories').then((module) => ({
		default: module.Categories,
	})),
);

const Category = lazy(() =>
	import('./pages/Category/Category').then((module) => ({
		default: module.Category,
	})),
);

const Article = lazy(() =>
	import('./pages/Article/Article').then((module) => ({
		default: module.Article,
	})),
);

const NotFound = lazy(() =>
	import('./pages/NotFound/NotFound').then((module) => ({
		default: module.NotFound,
	})),
);

export const App = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Main />} />
					<Route path={publicRoute.categories} element={<CategoriesLayout />}>
						<Route index element={<Categories />} />
						<Route
							path=":category"
							element={
								<PrivateRoute>
									<ErrorBoundary>
										<Category />
									</ErrorBoundary>
								</PrivateRoute>
							}
						/>
						<Route
							path=":category/:id"
							element={
								<PrivateRoute>
									<ErrorBoundary>
										<Article />
									</ErrorBoundary>
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
