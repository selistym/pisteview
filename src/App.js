import React, {useEffect, useReducer} from 'react';
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

const App = props => {

  const initialStates = {  
    brandColor: null,
    language: 'en',
    locations: [],
    resortName: '',
    bannerLabel: '',
    banners: [],
    currentLocation: {},
    is360Active: false,
    startVideoEntryPoint: 0,
    currentScreen: props.history,
    currentFilter: 0,
  }

  const reducer = (state, action) => {
    switch (action.type) {      
      case 'change_brandcolor': return {...state, brandColor: action.value};
      case 'change_language': return {...state, language: action.value};
      case 'change_locations': return {...state, locations: action.value};
      case 'change_resortname':  return {...state, resortName: action.value};
      case 'change_bannerlabel': return {...state, bannerLabel: action.value};
      case 'change_banners':  return {...state, banners: action.value};
      case 'change_currentlocation': return {...state, currentLocation: action.value};
      case 'change_is360active': return {...state, is360Active: action.value};
      case 'change_startvideoentrypoint': return {...state, startVideoEntryPoint: action.value};
      case 'change_currentscreen': return {...state, currentScreen: action.value};
      case 'change_currentfilter': return {...state, currentFilter: action.value};      
      default: throw new Error('Unexpected action');
    }
  };

  const [state, dispatch] = useReducer(reducer, initialStates);

  useEffect(() => {
    const playerId = props.location.hash.slice(1) || '55b3c6fe41d68428cd934027006425959104a8f6';
    // get all data from api
    axios.get(`https://api.pisteview.com/v1/players/${playerId}/`)
      .then((response) => {
        console.log(response.data)
        const locations = response.data.resort.locations
          .filter(location => !!location.video)
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
          });
        
        // set initial values to state
        dispatch({type: 'change_bannerlabel', value: response.data.banner_label ? response.data.banner_label : ''});
        dispatch({type: 'change_banners', value: response.data.banners ? response.data.banners : []});
        dispatch({type: 'change_brandcolor', value: response.data.brand_color || '#3B3C41'});
        dispatch({type: 'change_resortname', value: response.data.resort.name});
        dispatch({type: 'change_locations', value: locations});
        dispatch({type: 'change_currentlocation', value: find(response.data.resort.locations, {id: response.data.resort.start_video.location}) || {}});        
      })
      .catch((error) => {
        console.log(error, 'from get api data');
      });
  }, []);
  
  const _getCurrentVideo = () => state.currentLocation.video || {};

  const setLanguage = newLanguage => dispatch({type: 'change_language', value: newLanguage});

  const changeVideoEntryPoint = time => {
    dispatch({type: 'change_startvideoentrypoint', value: time});
    dispatch({type: 'change_is360active', value: !state.is360Active});    
  };

  const switchToVideo = id => {
    const newVideo = state.locations.find((el) => el.video.id === id).video;
    const currentVideo = _getCurrentVideo();

    if (currentVideo.id !== id) {
      dispatch({type: 'change_currentlocation', value: find(state.locations, { id: newVideo.location }) || {}});
      dispatch({type: 'change_is360active', value: false});
      dispatch({type: 'change_startvideoentrypoint', value: 0});
    }
  };

  const changeFilter = (time, link, type) => {
    // set current filter option
    dispatch({type: 'change_currentfilter', value: type});

    // if we use 360 video, need also change playing video object
    if (type && +type === 5 && !state.is360Active || state.is360Active) {
      changeVideoEntryPoint(time);      
    } else {
      let new_currentlocation = state.currentLocation;
      new_currentlocation.video_id = link;
      dispatch({type:'change_currentlocation', value: new_currentlocation});      
    }
  };
  const currentVideo = _getCurrentVideo();

  return (
    <div className="app">
      {state.brandColor && 
        <div className="app-content" style={{ background: state.brandColor }}>
          <TopBar resortName={state.resortName}/>          
          <Route
            path="/"
            render={(props) => (
              <Player
                brandColor={state.brandColor}
                language={state.language}
                bannerLabel={state.bannerLabel}
                banners={state.banners}
                currentVideo={currentVideo}
                switchToVideo={switchToVideo}
                changeFilter={changeFilter}
                startVideoEntryPoint={state.startVideoEntryPoint}
                is360Active={state.is360Active}
                is360Available={!!currentVideo.video_id_vr && doesBrowserSupport360()}
                currentFilter={state.currentFilter}
                setLanguage={setLanguage}
                {...props}
              />
            )}
          />
          <Route
            exact
            path='/map'
            render={(props) => (
              <CustomMap
                locations={state.locations}
                switchToVideo={switchToVideo}
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
                language={state.language}
                locations={state.locations}
                switchToVideo={switchToVideo}
                history={props.history}
                currentVideoId={currentVideo.id}
              />
            )}
          />    
        </div>
      }
      <p className="footer">
        <a href="http://www.pisteview.com/terms" target="_blank" rel="noopener noreferrer">
          Privacy &amp; Terms
        </a>
      </p>        
    </div>
  );
}

export default withRouter(App);
