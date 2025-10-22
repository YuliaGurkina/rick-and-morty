import { useEffect, useState } from 'react';

export const useLoadingItems = (query, pageNumber) => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState(false);
	const [hasMore, setHasMore] = useState(false);

	let url = `https://rickandmortyapi.com/api/${query}`;
	if (pageNumber > 1) {
		url += `?page=${pageNumber}`;
	}

	useEffect(() => {
		setArticles([]);
	}, [query]);

	useEffect(() => {
		setIsLoading(true);
		setError(false);

		fetch(url)
			.then((res) => {
				if (res.ok) {
					return res;
				}

				const error =
					res.status === 404
						? 'Такая страница не существует'
						: 'Что-то пошло не так. Попробуйте ещё раз позднее';
				setError(true);

				return Promise.reject(error);
			})
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setArticles((prevState) => {
					return [
						...new Set(
							[...prevState, ...loadedTodos.results].map(JSON.stringify),
						),
					].map(JSON.parse);
				});
				setHasMore(!!loadedTodos.info.next);
			})
			.finally(() => {
				setIsLoading(false);
				return null;
			});
	}, [query, pageNumber, url]);

	return { articles, isLoading, error, hasMore };
};
