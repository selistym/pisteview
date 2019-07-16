import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { convertColor, getRotatedMarkerCoordinate } from "../../utils";
import getIcon from "../../utils/getIcon";
import './styles.css';

class VideoMarker extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			bgColor: convertColor(this.props.link.video_info.video_type.icon_color, .5)
		};
	}
	
	changeOpacity = (hex, opacity) => {
		this.setState({bgColor: convertColor(hex, opacity)})		
	};
	
	handleOnMouseEnter = (hex) => this.changeOpacity(hex, 1);
	handleOnMouseLeave = (hex) => this.changeOpacity(hex, .5);
	
	render() {
		const {link, played, duration, switchToVideo, dx, dy, cameraAngle, is360Active} = this.props;		
		
		const {bgColor} = this.state;
		let _left, _bottom;
		
		if(is360Active === true)
		{
			_left = getRotatedMarkerCoordinate(60 * Math.PI/360, link.x_position_on_video_v5, dx * Math.PI/360);
			_bottom = getRotatedMarkerCoordinate(44 * Math.PI/360, link.y_position_on_video_v5, -dy * Math.PI/360);
		}else{
			_left = getRotatedMarkerCoordinate(60 * Math.PI/360, link.x_position_on_video_v5, 1 * Math.PI/360);
			_bottom = getRotatedMarkerCoordinate(44 * Math.PI/360, link.y_position_on_video_v5, 1 * Math.PI/360);
		}
		
		const videoMark = {
			position: 'absolute',
			bottom: `${_bottom}%`,
			left: `${_left}%`,
		};
		if (_left < 4 || _left > 97) {
			videoMark.display = 'none';
		}
		if (_bottom < 25 || _bottom > 97) {
			videoMark.display = 'none';
		}		
	
		const visibleCondition  = () => {
			console.log(link, 'link')
			if(link.timeframe_link_entry_point <= (played * (duration - 1.2)) && link.timeframe_link_exit_point > (played * (duration - 1.2))){
				if(!is360Active && link.category === 'video'){					
					console.log(is360Active, link.category, 'non 360')
					return true;
				}
				if(is360Active && link.category !== 'video'){
					console.log(is360Active, link.category, 'is 360')
					return true;
				}
			}
		};
		
		return (
			<div
				className={`player__overlay
					${link.icon_size === "near-field" && 'player__overlay--near'}
					${visibleCondition() ? 'visible' : 'hidden'}`
				}
				style={videoMark}
				onClick={() => switchToVideo(link.links_to_video)}
				onMouseEnter={() => this.handleOnMouseEnter(link.video_info.video_type.icon_color)}
				onMouseLeave={() => this.handleOnMouseLeave(link.video_info.video_type.icon_color)}
			>				
				<svg
					width={link.icon_size === "near-field" ? "150" : "100"}
					height={link.icon_size === "near-field" ? "150" : "100"}
					xmlns="http://www.w3.org/2000/svg"
				>
					<g>
						<g id="svg_8" transform={link.svg_transformation}>
							<g id="svg_6">
								<circle
									className="circle"
									stroke="#ffffff"
									fill={bgColor}
									strokeWidth="2"
									strokeLinejoin="null"
									strokeLinecap="null"
									cx={link.icon_size === "near-field" ? "73.99457" : "49.07639"}
									cy={link.icon_size === "near-field" ? "76.17151" : "50.92355"}
									r={link.icon_size === "near-field" ? "36.66566" : "22.35367"}
									id="svg_2"
								/>
							</g>
							<path
								fill="#ffffff"
								strokeLinejoin="null"
								strokeLinecap="null"
								d={
									link.icon_size === "near-field"
										? "m40.3802,61.6703l-15.7182,16.2449l16.8228,15.3073l-1.5156,-3.9403l-1.0612,-2.7281l-0.909,-3.3344l-0.4544,-3.1827l-0.1523,-3.6374l0.1523,-2.5765l0.3029,-3.03101l0.4545,-2.425l0.7574,-2.4249l0.7583,-2.425l0.5625,-1.8469l0,0l0,0l0,0l0,0z"
										: "m28.5832,42.0827l-9.5832,9.9039l10.2563,9.3323l-0.924,-2.4023l-0.6468,-1.6632l-0.5544,-2.0328l-0.2771,-1.9404l-0.0925,-2.2176l0.0925,-1.5708l0.1847,-1.8479l0.2772,-1.4784l0.462,-1.4784l0.462,-1.4784l0.3433,-1.126l0,0l0,0z"
								}
								id="svg_7"
							/>
						</g>
						
						{
							link.video_info.video_type.image_icon
								? (
									<image
										xlinkHref={`${getIcon(link.video_info.video_type.icon)}`}
										height={link.icon_size === "near-field" ? "68" : "40"}
										width={link.icon_size === "near-field" ? "68" : "40"}
										clipPath="url(#svg_2)"
										x={link.svg_image_x}
										y={link.svg_image_y}
									/>
								)
								: (
									<text
										className="label"
										fill="#fff"
										strokeWidth="0"
										strokeLinejoin="null"
										strokeLinecap="null"
										fontSize={link.icon_size === "near-field" ? "40" : "25"}
										id="svg_9"
										textAnchor="middle"
										x={link.svg_text_x}
										y={link.svg_text_y}
									>
										{link.label}
									</text>
								)
						}
					
					</g>
				</svg>
			</div>
		)
	}
}

VideoMarker.propTypes = {
	link: PropTypes.object.isRequired,
	played: PropTypes.number.isRequired,
	duration: PropTypes.number.isRequired,
	switchToVideo: PropTypes.func.isRequired,
	dx: PropTypes.number,
	dy: PropTypes.number,
	cameraAngle: PropTypes.number,
};

VideoMarker.defaultProps = {
	dx: 0,
	dy: 0,
	cameraAngle: 100,
};

export default VideoMarker;
