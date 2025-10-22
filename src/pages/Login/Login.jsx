import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import styles from './Login.module.css';

export const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const auth = useAuth();

	const [formData, setFormData] = useState({ username: '', password: '' });

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		try {
			const from = location.state?.from || '/';

			if (!formData.username || !formData.password) {
				console.error('Поля не могут быть пустыми');
				return;
			}

			auth.signin(formData.username, navigate(from, { replace: true }));
		} catch (error) {
			console.error('Ошибка входа:', error.message);
		}
	};

	return (
		<ErrorBoundary>
			<form onSubmit={handleSubmit} className={styles.signinForm}>
				<label>
					Username:
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={formData.username}
						onChange={handleChange}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Войти</button>
			</form>
		</ErrorBoundary>
	);
};
