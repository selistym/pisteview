import React from 'react'
import VideoMarker from '../../components/VideoMarker'

const VideoMarkerList = ({links = [], played, duration, switchToVideo, dx, dy, cameraAngle}) => {
  
  return (
    links.map((link) => {
      return (
        <>{console.log('marker')}
        <VideoMarker
          key={link.id}
          link={link}
          played={played}
          duration={duration}
          switchToVideo={switchToVideo}
          dx={dx}
          dy={dy}
          cameraAngle={cameraAngle}
        /></>
      )
    })
  )
};

export default VideoMarkerList;
