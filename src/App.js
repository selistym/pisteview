import React, {Component} from 'react';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import axios from 'axios';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import Player from './routs/Player';
import CustomMap from './routs/CustomMap';
import Menu from './routs/Menu';
import TopBar from './components/TopBar';
import {doesBrowserSupport360} from './utils';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandColor: null,
      language: 'en',
      locations: [],
      resortName: '',
      currentLocation: {},
      is360Active: false,
      startVideoEntryPoint: 0,
      currentScreen: props.history,
      currentFilter: 0,
    };
  }

  componentDidMount() {
    const playerId = this.props.location.hash.slice(1) || '55b3c6fe41d68428cd934027006425959104a8f6';
    // get all data from api
    axios.get(`https://api.pisteview.com/v1/players/${playerId}/`)
      .then((response) => {
        console.log('resort', response.data);
        const locations = response.data.resort.locations
          .filter((location) => !!location.video)
          .map(location => {
            // add Off filter to each location.video if it is not empty
            if (location.video.filtervideos && location.video.filtervideos.length) {
              location.video.filtervideos.push({
                filter_name: "Off",
                filter_type: 0,
                youtube_video_id: location.video.video_id,
              });
            }

            return location;

            // // add location.video_360 if it is present in locations
            // const filter360 = find(location.video.filtervideos, { filter_name: "360" });
            // if (filter360) {
            // 	let video360 = find(response.data.resort.videos, { video_id: filter360.youtube_video_id });
            //
            // 	if (video360) {
            // 		const _video360 = cloneDeep(video360);
            // 		_video360.filtervideos = location.video.filtervideos; // add link to THE SAME filters object
            // 		location.video_360 = _video360;
            // 	}
            // }
          });

        // set initial values to state
        this.setState({
          brandColor: response.data.brand_color || '#3B3C41',
          resortName: response.data.resort.name,
          locations: locations,
          currentLocation: find(response.data.resort.locations, {
            id: response.data.resort.start_video.location
          }) || {},
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _getCurrentVideo = () => {
    const { is360Active, currentLocation } = this.state;
    // return is360Active && currentLocation.video_360 || currentLocation.video || {};
    return currentLocation.video || {};
  };

  setLanguage = newLanguage => {
    this.setState({ ...this.state, language: newLanguage });
  };

  changeVideoEntryPoint = (time) => {
    this.setState({ startVideoEntryPoint: time, is360Active: !this.state.is360Active });
  };

  switchToVideo = (id) => {
    const newVideo = (this.state.locations.find((el) => el.video.id === id)).video;
    const currentVideo = this._getCurrentVideo();

    if (currentVideo.id !== id) {
      this.setState({
        currentLocation: find(this.state.locations, { id: newVideo.location }) || {},
        is360Active: false
      });
      this.setState({ startVideoEntryPoint: 0 });
    }
  };

  changeFilter = (time, link, type) => {
    const { is360Active } = this.state;

    // set current filter option
    this.setState({ currentFilter: type });

    // if we use 360 video, need also change playing video object
    if (type && +type === 5 && !is360Active || is360Active) {
      this.changeVideoEntryPoint(time);
    } else {
      this.setState(prevState => ({
        ...prevState,
        currentLocation: {
          ...prevState.currentLocation,
          video: {
            ...(prevState.currentLocation.video || {}),
            video_id: link,
          },
        },
      }));
    }
  };

  render() {
    const currentVideo = this._getCurrentVideo();

    return (
      <div className="app">
        <div className="app-content" style={{ background: this.state.brandColor }}>
          <TopBar resortName={this.state.resortName}/>
          {/*<Switch>*/}
          <Route
            path="/"
            render={(props) => (
              <Player
                brandColor={this.state.brandColor}
                language={this.state.language}
                currentVideo={currentVideo}
                switchToVideo={this.switchToVideo}
                changeFilter={this.changeFilter}
                startVideoEntryPoint={this.state.startVideoEntryPoint}
                is360Active={this.state.is360Active}
                is360Available={!!this._getCurrentVideo().video_id_vr && doesBrowserSupport360()}
                currentFilter={this.state.currentFilter}
                setLanguage={this.setLanguage}
                {...props}
              />
            )}
          />
          <Route
            exact
            path='/map'
            render={(props) => (
              <CustomMap
                locations={this.state.locations}
                switchToVideo={this.switchToVideo}
                history={props.history}
                currentVideoId={currentVideo.id}
                currentVideoLat={currentVideo.location_latitude}
                currentVideoLng={currentVideo.location_longitude}
              />
            )}
          />
          <Route
            exact
            path='/menu'
            render={(props) => (
              <Menu
                language={this.state.language}
                locations={this.state.locations}
                switchToVideo={this.switchToVideo}
                history={props.history}
                currentVideoId={currentVideo.id}
              />
            )}
          />
          {/*<Redirect to={{pathname: '/'}} />*/}
          {/*</Switch>*/}
        </div>
        <p className="footer">
          <a href="http://www.pisteview.com/terms" target="_blank" rel="noopener noreferrer">
            Privacy &amp; Terms
          </a>
        </p>
      </div>
    );
  }
}

export default withRouter(App);
