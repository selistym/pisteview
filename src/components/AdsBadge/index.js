import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const AdsBadge = ({bannersInfo, bannerLabel}) => (
	<div className="ads-badge-container">
		<div style={{width:'25%'}}>
			<p className='banner-label' style={{fontSize:'10pt', color: 'white'}}>{bannerLabel}</p>
		</div>
		<div style={{width:'75%', textAlign: 'center', height: '90px'}}>
			<a href={bannersInfo.url}>
				<img src={bannersInfo.image} height='100%' width='100%' alt="banner"/>
			</a>
		</div>
	</div>
);


AdsBadge.propTypes = {
	bannersInfo: PropTypes.array.isRequired,
	bannerLabel: PropTypes.string.isRequired	
};

export default AdsBadge;
