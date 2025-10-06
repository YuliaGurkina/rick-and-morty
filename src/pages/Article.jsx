import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Article = () => {
	const location = useLocation();
	const pathname = location.pathname;
	const parts = pathname.split('/');

	const [article, setArticle] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch(`http://localhost:3000/${parts[1]}?id=${parts[2]}`)
			.then((res) => {
				if (res.ok) {
					return res;
				}

				const error =
					res.status === 404
						? 'Такая страница не существует'
						: 'Что-то пошло не так. Попробуйте ещё раз позднее';

				return Promise.reject(error);
			})
			.then((loadedArticle) => loadedArticle.json())
			.then((loadedArticle) => {
				setArticle(loadedArticle[0]);
			})
			.finally(() => setIsLoading(false));
	}, []);

	if (!article) {
		return null;
	}

	const {
		name,
		status,
		species,
		gender,
		image,
		created,
		type,
		dimension,
		air_date,
		episode,
	} = article;

	return (
		<>
			{isLoading ? (
				<div className="loader"></div>
			) : (
				<div className="article">
					<div className="article-image">
						<img src={image} alt={name} />
					</div>
					<div>
						{!!name && <h2>{name}</h2>}
						{!!status && <p>Status: {status}</p>}
						{!!species && <p>Species: {species}</p>}
						{!!gender && <p>Gender: {gender}</p>}
						{!!created && <p>Created: {created}</p>}
						{!!type && <p>Type: {type}</p>}
						{!!dimension && <p>Dimension: {dimension}</p>}
						{!!air_date && <p>Dimension: {air_date}</p>}
						{!!episode && <p>Dimension: {episode}</p>}
					</div>
				</div>
			)}
		</>
	);
};
