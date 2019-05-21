import React from 'react';
import getIcon from '../../utils/getIcon';
import './styles.css';


const PlayerInfoBar = ({ bottomHeight, topHeight, length, label, name, video_type }) => {
  return (
    <div className="player-info-bar">
      <div className="piste__info">
        <div className="piste__badge-icon"
             style={
               {
                 backgroundColor: video_type && video_type.icon_color,
                 backgroundImage: video_type && video_type.image_icon ?
                   `url(${getIcon(video_type && video_type.icon)})`
                   : ''
               }
             }
        >
          {video_type && !video_type.image_icon && (<span className="piste__badge-text">{name}</span>)}
        </div>
        <span className="piste__name">{label}</span>
      </div>
      <ul className="piste__attrs">
        <li className="item">
          <i className="fas fa-long-arrow-alt-up icon"></i>
          <span className="count">{topHeight} m</span>
        </li>
        <li className="item">
          <i className="fas fa-long-arrow-alt-down icon"></i>
          <span className="count">{bottomHeight} m</span>
        </li>
        <li className="item">
          <i className="fas fa-exchange-alt icon"></i>
          <span className="count">{length} km</span>
        </li>
      </ul>
    </div>
  )
};

export default PlayerInfoBar;