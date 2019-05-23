import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const AdsBadge = ({bannersInfo, bannerLabel}) => {
	
	return (
		<div className="ads-badge-container">
			<h2 className='banner-label' >{bannerLabel}</h2>
			<a href={bannersInfo.url}>
				<img src={bannersInfo.image} height='90px' alt="banner"/>
			</a>
		</div>
	);
};

AdsBadge.propTypes = {
	bannersInfo: PropTypes.array,
	bannerLabel: PropTypes.string	
};

export default AdsBadge;
