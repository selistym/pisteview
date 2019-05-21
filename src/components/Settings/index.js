import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import Setting from './Setting';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			speed: {
				label: {
					en: 'Speed',
					de: 'Geschwindigkeit'
				},
				current: 0,
				options: [
					{
						id: 0,
						string: '1x',
						value: '1'
					},
					{
						id: 1,
						string: '1.5x',
						value: '1.5'
					},
					{
						id: 2,
						string: '2x',
						value: '2'
					}
				]
			},
			
			filter: {
				label: {
					en: 'Filter',
					de: 'Filter'
				},
			},
			
			language: {
				label: {
					en: 'Language',
					de: 'Sprache'
				},
				current: 0,
				options: [
					{
						id: 0,
						string: 'EN',
						value: 'en'
					},
					{
						id: 1,
						string: 'DE',
						value: 'de'
					}
				]
			}
		};
	}
	
	onChangeActive = (key, id, value) => {
		this.setState(prevState => ({
			...prevState,
			[key]: {
				...prevState[key],
				current: +id,
			}
		}));
		
		if(key === 'speed') {
			this.props.setPlaybackRate(value);
		} else if (key === 'filter') {
			this.props.changeFilter(value, id);
		} else if (key === 'language') {
      this.props.onLanguageChange(value)
		}
	};
	
	
	render() {
		const {speed, filter, language} = this.state;
		const {hasSettings, onShowSettings, filtervideos, videoId, is360Available, currentFilter} = this.props;
		
		let _filterOptions = [];
		filtervideos.map(filter => {
			// if browser not supports 360 video or if 360 video is not available then hide '360' filter
			if (filter.filter_type === 5 && is360Available || filter.filter_type !== 5) {
				_filterOptions.push(
					{
						id: filter.filter_type,
						string: filter.filter_name,
						value: filter.youtube_video_id
					}
				)
			}
		});
		
		return (
			<div className={`settings popup-menu ${hasSettings ? 'visible' : 'hidden'}`}
				 onMouseLeave={onShowSettings}
			>
				<h3 className="popup-menu__title">
					{language.options[language.current].value === 'en' ? 'Settings' : 'Sprache'}
				</h3>
				<ul>
					<Setting name="speed"
						 label={speed.label[language.options[language.current].value]}
						 currentValue={speed.current}
						 options={speed.options}
						 handleOnClick={this.onChangeActive}
					/>
					{
						!!filtervideos.length
						&&
						<Setting name="filter"
							 label={filter.label[language.options[language.current].value]}
							 currentValue={currentFilter}
							 options={_filterOptions}
							 handleOnClick={this.onChangeActive}
						/>
					}
					<Setting name="language"
						 label={language.label[language.options[language.current].value]}
						 currentValue={language.current}
						 options={language.options}
						 handleOnClick={this.onChangeActive}
					/>
				</ul>
			</div>
		)
	}
}

Settings.propTypes = {
	hasSettings: PropTypes.bool.isRequired,
	onShowSettings: PropTypes.func.isRequired,
	filtervideos: PropTypes.array.isRequired,
	videoId: PropTypes.string.isRequired,
	setPlaybackRate: PropTypes.func.isRequired,
	changeFilter: PropTypes.func.isRequired,
	currentFilter: PropTypes.number.isRequired,
};

export default Settings;
