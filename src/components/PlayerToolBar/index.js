import React from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import './styles.css';
import SettingsButton from './SettingsButton';

const PlayerToolBar = (props) => {
	const {
		playing,
		played,
		playedSeconds = 0,
		duration,
		muted,
		playPause,
		stepBackward,
		rePlay,
		calcTime,
		toggleMuted,
		is360Active,
		is360Available,
		onSeekMouseDown,
		onSeekMouseUp,
		onSeekChange,
		onShowSettings,
		onShowSocialShare,
		onFadeSocialShare,
		on360Switch,
		onResetDirectionPress,
    onLanguageChange,

		hasSettings,
		videoId,
		filtervideos,
		setPlaybackRate,
		changeFilter,
		currentFilter,
	} = props;
	const progressBarWidth = played * 100 + '%';
	return (
		<div className="player-tool-bar">
			<ul className="player__controls">
				<li>
					<span className="player__icon" onClick={stepBackward}>
						<i className="fas fa-step-backward"></i>
					</span>
				</li>
				<li>
					<span className="player__icon" onClick={playPause}>
						<i className={`fas ${playing ? 'fa-pause' : 'fa-play'}`}></i>
					</span>
				</li>
				<li>
					<span className="player__icon" onClick={rePlay}>
						<i className="fas fa-redo-alt"></i>
					</span>
				</li>
				<li className="player__progress-wrapper">
					<div className="progress-bar">
						<div className="progress-bar-bar" style={{ width: progressBarWidth }}></div>
						<input
							type='range'
							min={0}
							max={1}
							step='any'
							value={played}
							onMouseDown={onSeekMouseDown}
							onChange={onSeekChange}
							onMouseUp={onSeekMouseUp}
						/>
					</div>
				</li>
				<li className="player__time">
					{calcTime(playedSeconds)} / {calcTime(duration)}
				</li>
				<li>
					<span className="player__icon" onClick={toggleMuted}>
						<i className={`fas ${muted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
					</span>
				</li>
				<li>
					<SettingsButton
						onShowSettings={onShowSettings}
						onLanguageChange={onLanguageChange}
						hasSettings={hasSettings}
						videoId={videoId}
						filtervideos={filtervideos}
						setPlaybackRate={setPlaybackRate}
						changeFilter={changeFilter} // with binded playedSeconds
						is360Available={is360Available}
						onChange360FIlter={on360Switch} // with binded playedSeconds
						currentFilter={currentFilter}
					/>
				</li>
				{
					is360Available
					&&
					<li className="rowLi">
						<div className="switch_label">1080</div>
						<Switch
							onChange={on360Switch} // with binded playedSeconds
							checked={is360Active}
							onColor="#86d3ff"
							onHandleColor="#2693e6"
							handleDiameter={20}
							uncheckedIcon={false}
							checkedIcon={false}
							boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
							activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
							height={10}
							width={30}
							className="react-switch"
							id="material-switch"
						/>
						<div className="switch_label">360&#176;</div>
					</li>
				}
				{
					is360Active
					&&
					<li>
						<span className="player__icon" onClick={onResetDirectionPress}>
							<i className={`fas fa-bullseye`}></i>
						</span>
					</li>
				}
			</ul>
			<ul className="player__social">
				<li className="player__subscribe">
					<div
						className="g-ytsubscribe"
						data-channelid="UCNWwJvahERx-rDinTjAgQSQ"
						data-layout="default"
						data-count="hidden"
					>
					</div>
				</li>
				<li>
					<span
						className="player__icon"
						onMouseEnter={onShowSocialShare}
						onMouseLeave={onFadeSocialShare}
					>
						<i className="fas fa-share-alt"></i>
					</span>
				</li>
			</ul>
			
			{props.children}
		</div>
	);
};

PlayerToolBar.propTypes = {
	playing: PropTypes.bool.isRequired,
	playedSeconds: PropTypes.number.isRequired,
	currentFilter: PropTypes.number.isRequired,
};

export default PlayerToolBar;
