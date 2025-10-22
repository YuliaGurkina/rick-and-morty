import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Article.module.css';

export const Article = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const pathname = location.pathname;
	const parts = pathname.split('/');

	const [article, setArticle] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch(`https://rickandmortyapi.com/api/${parts[2]}/${parts[3]}`)
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
				setArticle(loadedArticle);
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
		// dimension,
		air_date,
		// episode,
	} = article;

	return (
		<>
			{isLoading ? (
				<div className="loader"></div>
			) : (
				<div className={styles.article}>
					<div className={styles.articleImage}>
						<img src={image} alt={name} />
					</div>
					<div>
						<div>
							<button className="button" onClick={() => navigate(-1)}>
								{'<-'} Назад
							</button>
						</div>
						{!!name && <h2>{name}</h2>}
						{!!status && <p>Status: {status}</p>}
						{!!species && <p>Species: {species}</p>}
						{!!gender && <p>Gender: {gender}</p>}
						{!!created && <p>Created: {created}</p>}
						{!!type && <p>Type: {type}</p>}
						{/* {!!dimension && <p>Dimension: {dimension}</p>} */}
						{!!air_date && <p>Air date: {air_date}</p>}
						{/* {!!episode && <p>Episode: {episode}</p>} */}
					</div>
				</div>
			)}
		</>
	);
};
