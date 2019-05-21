import React from 'react';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			errorMessage: null,
		};
	}
	
	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true, errorMessage: error });
	}
	
	render() {
		if (this.state.hasError) {
			return (
				<div>
					<div>Oups, something went wrong :(</div>
					<div>
						If you see this, that means Video Player catched an error.&nbsp;
						Please, try to reload webbrowser page. If you get this again, please, write to support
					</div>
					<div>
						{this.state.errorMessage}
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}
