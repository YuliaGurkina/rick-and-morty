import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

export const Card = ({ id, name, image, refNode, pathname }) => {
	const navigate = useNavigate();

	const handleClick = (id) => {
		navigate(`${pathname}/${id}`);
	};

	return (
		<div
			ref={refNode}
			className={styles.card}
			key={id}
			onClick={() => handleClick(id)}
		>
			<h4 className={styles.cardName}>{name}</h4>
			<div className={styles.cardImage}>
				<img src={image} alt={name} />
			</div>
		</div>
	);
};
