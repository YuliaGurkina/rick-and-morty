import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => localStorage.getItem('user') || null);

	const singin = (newUser, callback) => {
		setUser(newUser);
		localStorage.setItem('user', newUser);
		callback();
	};

	const signout = (callback) => {
		setUser(null);
		localStorage.removeItem('user');
		callback();
	};

	const value = {
		user,
		singin,
		signout,
	};

	return <AuthContext value={value}>{children}</AuthContext>;
};
