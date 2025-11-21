import { lazy, Suspense, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { categoriesMenu } from '../../constants';
import { useLoadingItems } from '../../hooks/useLoadingItems';
import styles from './Category.module.css';

const Card = lazy(() =>
	import('../../components/Card/Card').then((module) => ({
		default: module.Card,
	})),
);

export const Category = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const location = useLocation();
	const pathname = location.pathname;
	const parts = pathname.split('/');
	const category = parts[2] || '';

	const { articles, isLoading, error, hasMore } = useLoadingItems(category, pageNumber);

	const observer = useRef();

	const lastNodeRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasMore) {
						setPageNumber((prevState) => prevState + 1);
					}
				},
				{ threshold: 0.1 },
			);
			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, hasMore],
	);

	const title = categoriesMenu.find((item) => item.path === category)?.title || '';

	if (!articles || articles.length === 0) {
		return null;
	}

	return (
		<>
			<div className={styles.title}>{title}</div>
			<div className={styles.itemsWrapper}>
				{articles.map(({ id, ...rest }, index) => {
					return (
						<Suspense key={id} fallback={<h3>Loading...</h3>}>
							<Card
								key={id}
								id={id}
								{...rest}
								// image={image}
								// name={name}
								refNode={
									articles.length === index + 1 ? lastNodeRef : null
								}
								pathname={pathname}
							/>
						</Suspense>
					);
				})}
			</div>
			{isLoading && <div className={styles.loading}>Loading...</div>}
			{error && <div className={styles.error}>Error...</div>}
		</>
	);
};
