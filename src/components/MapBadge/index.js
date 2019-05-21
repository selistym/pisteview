import React, {Component} from "react";
import {convertColor} from "../../utils";
import getIcon from '../../utils/getIcon';

import './styles.css';

class MapBadge extends Component {
  constructor(props) {
    super(props);
    this.badge = React.createRef();
  }

  changeOpacity = (id, hex, opacity) => {
    const {current} = this.badge;

    if (id !== this.props.currentVideoId) {
      current.style.fill = convertColor(hex, opacity);
    }

  };

  handleOnMouseEnter = (id, hex) => this.changeOpacity(id, hex, 1);
  handleOnMouseLeave = (id, hex) => this.changeOpacity(id, hex, .3);

  render() {
    const {location, onLoadVideo, currentVideoId} = this.props;

    return (
      <div className="map__badge"
           style={{
        width: currentVideoId === location.video.id ? '60px' : '40px',
        height: currentVideoId === location.video.id ? '60px' : '40px',
        top: currentVideoId === location.video.id ? '-30px' : '-20px',
      }}
           onClick={() => onLoadVideo(location.video.id)}
           onMouseEnter={() => this.handleOnMouseEnter(location.video.id, location.location_type.icon_color)}
           onMouseLeave={() => this.handleOnMouseLeave(location.video.id, location.location_type.icon_color)}
      >
        <svg className="map__badge-marker" xmlns="http://www.w3.org/2000/svg" id="svg4413" version="1.1" viewBox="0 0 113.0311 169.21875">
          <g id="layer1" transform="translate(-250,-509.125)">
            <path fill="white" d="m 306.5,509.125 c -31.14922,0 -56.5,25.35078 -56.5,56.5 0,0.37083 0.025,0.55698 0.0312,0.71875 0.002,0.0492 -4.3e-4,0.18862 0,0.21875 -0.007,0.0685 -0.0312,0.0448 -0.0312,0.375 0,19.63745 13.44091,45.21399 26.46875,66.9375 13.02784,21.72351 26.03125,39.0625 26.03125,39.0625 l 4.0625,5.40625 4,-5.4375 c 0,0 10.21359,-13.98375 21.59375,-32.40625 11.13375,-18.0236 23.38382,-40.14979 28.46875,-58.6875 l 0.1875,0 0.6875,-3.21875 0.0312,-0.0937 0.0312,-0.0937 0,-0.0625 c 3.7e-4,-0.002 0.0378,-0.17831 0.0937,-0.4375 0.009,-0.0395 0.0214,-0.0156 0.0312,-0.0625 l -0.0312,0 c 0.19401,-0.87429 0.38428,-1.74224 0.53125,-2.59375 0.002,-0.01 -0.002,-0.0214 0,-0.0312 0.51077,-2.83391 0.84375,-5.59068 0.84375,-8.28125 0,-0.242 -0.0246,-0.20329 -0.0312,-0.3125 10e-4,-0.0423 -0.002,-0.16376 0,-0.21875 -0.001,-0.006 -6.4e-4,-0.14075 0,-0.125 0.007,-0.18707 0.0312,-0.35342 0.0312,-0.65625 0,-31.14934 -25.38294,-56.5 -56.53125,-56.5 z m 0,10 c 25.74369,0 46.53125,20.75534 46.53125,46.5 0,0.11278 -0.022,0.3696 -0.0312,0.75 l 0,0.15625 0,0.15625 c 0.0154,0.37688 0.0312,0.45894 0.0312,0.25 0,1.89738 -0.24963,4.10825 -0.6875,6.53125 l 0,0.0312 0,0.0312 c -0.13036,0.75721 -0.27964,1.48064 -0.4375,2.1875 l 0,0.0625 c -0.004,0.0187 -0.0753,0.26623 -0.125,0.5 -0.0183,0.0861 -0.01,0.0751 -0.0312,0.1875 -0.12018,0.51308 -0.26946,1.01004 -0.40625,1.5 l 0,0.0312 0,0.0625 c -4.28623,16.54037 -16.52741,39.12125 -27.6875,57.1875 -7.67209,12.41978 -13.47909,20.80768 -17.1875,26.0625 -4.2076,-5.82093 -11.90204,-16.74578 -21.40625,-32.59375 C 272.33633,607.49826 260,581.56405 260,566.9375 c 0,0.21397 0.0197,0.12717 0.0312,-0.3125 l 0,-0.125 0,-0.0937 C 260.02508,565.96951 260,565.70947 260,565.625 c 0,-25.74478 20.75522,-46.5 46.5,-46.5 z" id="path3764"/>
            <path ref={this.badge} fill={currentVideoId === location.video.id ? convertColor(location.location_type.icon_color, 1) : convertColor(location.location_type.icon_color, .3)} d="m 356.79195,576.80351 c 0.18,-0.806 0.336,-1.62 0.477,-2.439 0.476,-2.634 0.753,-5.135 0.753,-7.434 0,-0.149 -0.016,-0.292 -0.022,-0.439 0.007,-0.287 0.022,-0.572 0.022,-0.859 0,-28.447 -23.062,-51.508 -51.508,-51.508 -28.447,0 -51.50801,23.061 -51.50801,51.508 0,0.284 0.017,0.563 0.021,0.846 -0.004,0.152 -0.021,0.299 -0.021,0.453 0,34.264 51.50801,103.02 51.50801,103.02 0,0 40.504,-55.317 49.657,-90.638 0.177,-0.634 0.338,-1.275 0.486,-1.92 0.04,-0.21 0.09,-0.4 0.13,-0.59 z" id="path13-0"/>
          </g>
        </svg>
        {location.location_type.image_icon ?
          (<img className="map__badge-img" src={getIcon(location.location_type.icon)}
                height={currentVideoId === location.video.id ? '60' : '40'}
                width={currentVideoId === location.video.id ? '60' : '40'}
                alt={location.location_type.name}
          />) :
          (<span className="map__badge-text"
                 style={{fontSize: currentVideoId === location.video.id ? '16px' : '12px'}}
          >
            {location.name}
          </span>)}
      </div>

    )
  }
}

export default MapBadge;
