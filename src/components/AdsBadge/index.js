import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const AdsBadge = ({bannersInfo, bannerLabel}) => (
	<div className="ads-badge-container">
		<div style={{width:'17%'}}>
			<h2 className='banner-label' >{bannerLabel}</h2>
		</div>
		<div style={{width:'83%', textAlign: 'center'}}>
			<a href={bannersInfo.url}>
				<img src={bannersInfo.image} height='90px' alt="banner"/>
			</a>
		</div>
	</div>
);


AdsBadge.propTypes = {
	bannersInfo: PropTypes.array.isRequired,
	bannerLabel: PropTypes.string.isRequired	
};

export default AdsBadge;
