import './error-boundary.scss';
import React from 'react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.error("UI Crash:", error, info);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className={`fallback-wrapper`}>
					<div className={`fallback-container`}>
						<div className={`fallback-message`}>Something went wrong</div>

						<button
							className={`fallback-reload-button`}
							onClick={() => window.location.reload()}
						>
							Reload App
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;