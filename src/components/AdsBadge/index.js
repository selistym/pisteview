import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const AdsBadge = props => {
	
	return (
		<div className="ads-badge-container">
			<h1>Ads goes here!</h1>
		</div>
	);
};

AdsBadge.propTypes = {
	playing: PropTypes.bool.isRequired,
	playedSeconds: PropTypes.number.isRequired,
	currentFilter: PropTypes.number.isRequired,
};

export default AdsBadge;
