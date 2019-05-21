import React, {Component} from "react";
import {convertColor} from "../../utils";
import getIcon from '../../utils/getIcon';

import './styles.css';

class MenuBadge extends Component {
  constructor(props) {
    super(props);
    this.badge = React.createRef();
  }

  changeOpacity = (id, hex, opacity) => {
    const {current} = this.badge;

    if(id !== this.props.currentVideoId) {
      current.style.backgroundColor = convertColor(hex, opacity);
    }

  };

  handleOnMouseEnter = (id, hex) => this.changeOpacity(id, hex, 1);
  handleOnMouseLeave = (id, hex) => this.changeOpacity(id, hex, .5);

  render() {
    const {location, switchToVideo, currentVideoId} = this.props;

    const onLoadVideo = (id) => {
		switchToVideo(id);
      this.props.history.push('/');
    };

    let iconUrl = getIcon(location.location_type.icon);

    return (
      <li key={location.id}
          onClick={() => onLoadVideo(location.video.id)}
      >
        <div className="menu__badge"
             ref={this.badge}
             style={
               {
                 backgroundColor: currentVideoId ===  location.video.id ?
                 convertColor(location.location_type.icon_color, 1) :
                 convertColor(location.location_type.icon_color, .5),
                 backgroundImage: location.location_type.image_icon ?
                   `url(${iconUrl})`
                   : ''
               }
             }
             onMouseEnter={() => this.handleOnMouseEnter(location.video.id, location.location_type.icon_color)}
             onMouseLeave={() => this.handleOnMouseLeave(location.video.id, location.location_type.icon_color)}
        >
          {!location.location_type.image_icon && (<span className="menu__badge-text">{location.name}</span>)}
        </div>
        <span className="menu__badge-title">{location.label}</span>
      </li>
    )
  }
}

export default MenuBadge;
