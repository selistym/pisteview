import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import ReactPlayer from 'react-player';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import PlayerInfoBar from '../../components/PlayerInfoBar';
import PlayerToolBar from '../../components/PlayerToolBar';
import SocialShare from '../../components/SocialShare';
import VideoMarkerList from '../../components/VideoMarkerList';
import {Link} from 'react-router-dom';
import './styles.css';

const tempLink = [{
  belongs_to_video: 202,
  icon_size: "near-field",
  id: 541,
  label: "36",
  links_to_video: 122,
  locked: false,
  short_label: "36",
  show: false,
  svg_image_x: 32,
  svg_image_y: 45,
  svg_text_x: 63,
  svg_text_y: 96,
  svg_transformation: "rotate(135 67.66111755371095,76.1715087890625)",
  timeframe_link_entry_point: 13,
  timeframe_link_exit_point: 121,
  timeframe_video_entry_point: 0,
  video_info:{
    id: 122,
    internal_name: "Red 36",
    video_type: {
      category: {
        id: 3,
        name: "Pistes"
      },
      color_class: "icon-piste-9",
      icon: "piste",
      icon_color: "#e42222",
      id: 9,
      image_icon: false
    },
  },  
  x_position_on_video_v5: 32,
  y_position_on_video_v5: 45
}];
const initialState = {
  playing: true,
  volume: 1,
  muted: false,
  played: 0,
  duration: 0,
  playbackRate: 1.0,
  playedSeconds: 0,
  hasSettings: false,
  socialShare: false,
  paused: true,
  hidden: false,
  directionObj: { yaw: 0, pitch: 0, fov: 100 },
  links: [
    {
      id: '1',
      label: 'map',
      icon: 'fas fa-map-marker-alt',
      link: '/map',
      titleEn: 'Find location',
      titleDe: 'Karte',
    },
    {
      id: '2',
      label: 'menu',
      icon: 'fas fa-bars',
      link: '/menu',
      titleEn: 'See all films',
      titleDe: 'Alle Filme',
    }
  ]
};

const playerConfig = {
  youtube: {
    playerVars: {
      ref: 0,
      controls: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      showinfo: 0,
      enablejsapi: 1,
    },
  },
};

// 1.2 seconds is a minimal duration when Youtube player starts to show related videos
const stopBeforeEndDuration = 1.2;

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.intervalHandler = null;
  }

  // panStarted = false;

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevProps.currentVideo.video_id !== this.props.currentVideo.video_id)
      || (prevProps.is360Active !== this.props.is360Active)
    ) {
      this.setState({
        playing: true,
        played: 0,
        duration: 0,
        playbackRate: 1.0,
        playedSeconds: this.props.startVideoEntryPoint,
      });
    }
   
  }

  static getDerivedStateFromProps(props) {
    return { hidden: props.location.pathname !== '/' };
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (!prevProps.is360Active && this.props.is360Active) {

      // watch camera direction to change markers position
      this.intervalHandler = setInterval(() => {
        const directionObj = this.player && this.player.getInternalPlayer && this.player.getInternalPlayer()
          && typeof(this.player.getInternalPlayer().getSphericalProperties) === 'function'
          && this.player.getInternalPlayer().getSphericalProperties()
          || { yaw: 0, pitch: 0, fov: 100 };
        this.setState({ directionObj });
      }, 20);
    } else if (prevProps.is360Active && !this.props.is360Active) {
      if (this.intervalHandler) {
        clearInterval(this.intervalHandler);
        this.intervalHandler = null;
      }
    }
    return null;
  }

  componentDidMount() {
    console.log('player', this.player)
  } 
  componentWillUnmount() {
    if (this.intervalHandler) {
      clearInterval(this.intervalHandler);
    }
  }

  _getCurrentVideoId = () => {
    return this.props.is360Active && this.props.currentVideo.video_id_vr || this.props.currentVideo.video_id || '';
  };
  _getNewDuration = duration => (duration - stopBeforeEndDuration > 0 ? duration - stopBeforeEndDuration : 0);

  playPause = () => {
    if (this.state.playedSeconds <= this.state.duration) {
      this.setState({ playing: !this.state.playing });
    }
  };
  stepBackward = () => {
    this.player.seekTo(this.state.playedSeconds - 11);
  };
  setOnPause = (playedSeconds) => {
    if (playedSeconds >= this.state.duration) {
      this.setState({ playing: false });
    }
  };
  rePlay = () => {
    this.player.seekTo(0);
    this.setState({ playing: true });
  };

  calcTime = (time) => {
    
    if (time > this.state.duration) {
      time = this.state.duration;
    }
    const ceilTime = Math.ceil(time);

    const minutes = ~~(ceilTime / 60);
    const seconds = ceilTime - minutes * 60;

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  toggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };
  setPlaybackRate = (value) => {
    this.setState({ playbackRate: parseFloat(value) });
  };
  onSeekMouseDown = () => {
    this.setState({ seeking: true });
  };
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value), playing: true });
  };
  onSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };
  onProgress = state => {    
    
    state.played = state.played * (this.state.duration + stopBeforeEndDuration) / this.state.duration;
    this.setOnPause(state.playedSeconds);    
    // this.props.changeVideoEntryPoint(state.playedSeconds);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
    if(this.state.playedSeconds + stopBeforeEndDuration >= this.state.duration){
      this.setState({ playing: false });
    }
  };
  onDuration = (duration) => {    
    this.setState({ duration: this._getNewDuration(duration) });
  };
  ref = player => {
    this.player = player;
  };
  onShowSettings = () => {
    this.setState({ hasSettings: !this.state.hasSettings });
  };
  onShowSocialShare = () => {
    this.setState({ socialShare: true });
  };
  onFadeSocialShare = () => {
    this.setState({ socialShare: false });
  };
  // seekOnReady = () => {
  // this.player.seekTo(this.props.startVideoEntryPoint);
  // };
  onPlay = () => {
    // if (!this.panStarted && this.props.is360Active) {
    // 	requestAnimationFrame(this.panVideo);
    // 	this.panStarted = true;
    // }

    this.setState({ playing: true }, () => {
      const e = new MouseEvent('click');
      document.getElementById('widget2').dispatchEvent(e);
    });

  };
  // panVideo = () => {
  // // 20 seconds per rotation.
  // const yaw = (performance.now() / 1000 / 20 * 360) % 360;
  // // 2 up-down cycle per rotation.
  // const pitch = 20 * Math.sin(2 * yaw / 360 * 2 * Math.PI);
  // this.player.getInternalPlayer().setSphericalProperties({ yaw, pitch });
  // requestAnimationFrame(this.panVideo);
  // };
  onPause = () => {
    this.setState({ playing: false });
  };

  onResetDirectionPress = () => {
    if (this.props.is360Active) {
      this.player.getInternalPlayer().setSphericalProperties({ yaw: 0, pitch: 0 });
    }
  };

  render() {
    const {
      video_id,
      info_bottom_height,
      info_top_height,
      info_length,
      label,
      name,
      video_type,
      filtervideos,
      // video_id_vr,
    } = this.props.currentVideo;
    const {
      playing,
      played,
      playedSeconds,
      playbackRate,
      volume,
      muted,
      duration,
      hasSettings,
      socialShare,
      hidden,
      directionObj,
    } = this.state;
    const url = `https://www.youtube.com/watch?v=${this._getCurrentVideoId()}`;
    const isPlaying = !hidden && playing;
    console.log(this.props.currentVideo.links, 'links')
    return (
      <div className="player">
        <PlayerInfoBar
          bottomHeight={info_bottom_height}
          topHeight={info_top_height}
          length={info_length}
          label={label}
          name={name}
          video_type={video_type}
        />
        <YouTubePlayer
          ref={this.ref}
          className='react-player'
          width='100%'
          height={'100%'}
          url={`${url}&t=${this.props.startVideoEntryPoint}&vq=hd720`}
          playing={isPlaying}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          config={playerConfig}
          progressInterval={300}
          onError={e => console.log('onError', e)}
          onReady={this.onPlay}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
          // onStart={this.onStart}
          onPlay={this.onPlay}
          onPause={this.onPause}
        />
        {
          playedSeconds >= duration
          &&
          <div className="player-overlay"/>
        }
        {
          !video_id && <div className="player-placeholder"/>
        }
        <div className={`buttons-transparent-video-overlay`}/>
        
        {console.log('onplaying?', this.state.playedSeconds, this.state.duration)}
        <div
          className={`suggested-video-overlay ${(!isPlaying || !playing) ? 'visible' : ''}`}
          style={{ background: this.props.brandColor }}
        >
          {this.state.links.map((item) => (
            <div key={item.id}>
              <Link to={item.link} className={`${this.props.location.pathname === item.link ? 'active' : ''}`}>
                <span><i className={item.icon}/></span>
                <span className={'link-text'} >{this.props.language === 'en' ? item.titleEn : item.titleDe}</span>
              </Link>
            </div>
          ))}
        </div>
        <PlayerToolBar
          playing={isPlaying}
          played={played}
          playedSeconds={playedSeconds}
          // add '- stopBeforeEndDuration' to see that the video ends
          duration={duration}
          muted={muted}

          hasSettings={hasSettings}
          videoId={this._getCurrentVideoId()}
          filtervideos={filtervideos || []}

          calcTime={this.calcTime}
          playPause={this.playPause}
          stepBackward={this.stepBackward}
          rePlay={this.rePlay}
          toggleMuted={this.toggleMuted}
          is360Active={this.props.is360Active}
          is360Available={this.props.is360Available}
          onSeekMouseDown={this.onSeekMouseDown}
          onSeekMouseUp={this.onSeekMouseUp}
          onSeekChange={this.onSeekChange}
          onShowSettings={this.onShowSettings}
          onShowSocialShare={this.onShowSocialShare}
          onFadeSocialShare={this.onFadeSocialShare}
          onLanguageChange={this.props.setLanguage}
          on360Switch={this.props.changeFilter.bind(null, playedSeconds, '', (!this.props.is360Active && 5 || 0))}
          onResetDirectionPress={this.onResetDirectionPress}
          setPlaybackRate={this.setPlaybackRate}
          changeFilter={this.props.changeFilter.bind(null, playedSeconds)}
          currentFilter={this.props.currentFilter}
        >
          <SocialShare
            socialShare={socialShare}
            onFadeSocialShare={this.onFadeSocialShare}
          />
        </PlayerToolBar>

        <VideoMarkerList
          links={tempLink}
          played={played}
          duration={duration}
          switchToVideo={this.props.switchToVideo}
          dx={directionObj.yaw}
          dy={directionObj.pitch}
          cameraAngle={directionObj.fov}
        />
      </div>
    );
  }
}

Player.propTypes = {
  brandColor: PropTypes.string.isRequired,
  currentVideo: PropTypes.object.isRequired,
  startVideoEntryPoint: PropTypes.number.isRequired,
  // changeVideoEntryPoint: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  switchToVideo: PropTypes.func.isRequired,
  is360Active: PropTypes.bool.isRequired,
  is360Available: PropTypes.bool.isRequired,
  currentFilter: PropTypes.number.isRequired,
};

export default Player;
