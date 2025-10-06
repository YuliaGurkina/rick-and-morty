import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Categories = () => {
	const location = useLocation();
	const pathname = location.pathname;

	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleClick = (id) => {
		navigate(`${pathname}/${id}`);
	};

	useEffect(() => {
		setIsLoading(true);

		fetch(`http://localhost:3000${pathname}`)
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setArticles(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, [pathname]);

	let title = '';

	switch (pathname) {
		case '/characters': {
			title = 'Персонажи';
			break;
		}
		case '/locations': {
			title = 'Локации';
			break;
		}
		case '/episodes': {
			title = 'Эпизоды';
			break;
		}
	}

	return (
		<>
			{isLoading ? (
				<div className="loader"></div>
			) : (
				<>
					<h1>{title}</h1>
					<div className="items-wrapper">
						{articles.map(
							({
								//created,
								//gender,
								id,
								image,
								name,
								//species,
								//status,
								//type,
							}) => (
								<div
									className="item"
									key={name}
									onClick={() => handleClick(id)}
								>
									<h4 className="item-name">{name}</h4>
									<div className="item-image">
										<img src={image} alt={name} />
									</div>
								</div>
							),
						)}
					</div>
				</>
			)}
		</>
	);
};
