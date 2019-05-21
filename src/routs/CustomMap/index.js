import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapBadge from '../../components/MapBadge';
import './styles.css';
import mapOptionsConfig from "./mapOptionsConfig";

class CustomMap extends Component {
    state = {
        showMap: false,
    };
    static defaultProps = {
        zoom: 15,
    };

    componentDidMount() {
        this.setState({ showMap: true });
    }

    onLoadVideo = (id) => {
        this.props.switchToVideo(id);
        this.props.history.push('/');
    };

    render() {
        const { locations, currentVideoId } = this.props;
        const API_KEY = 'AIzaSyCaleB4M4xKnyVhdoncdOd8DJgTDvmedns';
        const center = { lat: this.props.currentVideoLat, lng: this.props.currentVideoLng };
        if (!this.props.currentVideoLat && !this.props.currentVideoLng) {
            return null;
        }
        return (
            <div className="map">
                <GoogleMapReact
                    style={{ display: this.state.showMap }}
                    bootstrapURLKeys={{
                        key: API_KEY,
                    }}
                    defaultCenter={center}
                    defaultZoom={this.props.zoom}
                    options={mapOptionsConfig}
                >
                    {
                        locations.map((location) => {
                            return (
                                <MapBadge
                                    key={location.id}
                                    lat={location.location_latitude}
                                    lng={location.location_longitude}
                                    location={location}
                                    onLoadVideo={this.onLoadVideo}
                                    currentVideoId={currentVideoId}
                                />
                            );
                        })
                    }
                </GoogleMapReact>
            </div>
        );
    }
}

export default CustomMap;
