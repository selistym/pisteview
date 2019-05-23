import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const AdsBadge = ({bannersInfo, bannerLabel}) => {
	
	return (
		<div className="ads-badge-container">
			<h2 className='banner-label'>{bannerLabel}</h2>
			{bannersInfo.map(banner => 
				<a href={banner.url}>
					<img src={banner.image} height='150' alt=""/>		
				</a>
			)}			
		</div>
	);
};

AdsBadge.propTypes = {
	bannersInfo: PropTypes.array,
	bannerLabel: PropTypes.string	
};

export default AdsBadge;
