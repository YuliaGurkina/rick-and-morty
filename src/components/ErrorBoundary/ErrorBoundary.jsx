import { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);

		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		console.log('###: error', error.message);
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.log('###: error', error);
		console.log('###: errorInfo', errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h3>Что-то пошло не так.</h3>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
