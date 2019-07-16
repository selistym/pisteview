import React from 'react'
import VideoMarker from '../../components/VideoMarker'

const VideoMarkerList = ({links = [], played, duration, switchToVideo, dx, dy, cameraAngle, is360Active}) => {
  
  return (
    links.map((link) => {      
      return (
        <VideoMarker
          key={link.id}
          link={link}
          played={played}
          duration={duration}
          switchToVideo={switchToVideo}
          dx={dx}
          dy={dy}
          cameraAngle={cameraAngle}
          is360Active={is360Active}
        />
      )
    })
  )
};

export default VideoMarkerList;
