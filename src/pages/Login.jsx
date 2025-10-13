import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const auth = useAuth();

	const [formData, setFormData] = useState({ username: '', password: '' });

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		//const formData = new FormData(event.currentTarget);
		//const username = formData.get('username');

		const from = location.state?.from || '/';

		auth.singin(formData.username, () => {
			navigate(from, {
				replace: true,
			});
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit} onChange={handleChange} className="signin-form">
				<label>
					Username:
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={formData.username}
					/>
				</label>
				<label>
					Password:
					<input
						type="text"
						name="password"
						placeholder="Password"
						value={formData.password}
					/>
				</label>
				<button type="submit">Войти</button>
			</form>
		</>
	);
};
