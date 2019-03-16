import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  map: {
    position: 'relative',
    width: '100%',
    height: '400px'
  }
};

export class CurrentLocation extends Component {
    constructor(props) {
        super(props);
    
        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }

    loadMap() {
        if (this.props && this.props.google) {
            // checks if google is available

            const { google } = this.props;
            const maps = google.maps;
        
            const mapRef = this.refs.map;
        
            // reference to the actual DOM element
            const node = ReactDOM.findDOMNode(mapRef);
        
            let { zoom, keyboardShortcuts, mapTypeControl, streetViewControl, fullscreenControl } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom,
                    keyboardShortcuts: keyboardShortcuts,
                    mapTypeControl: mapTypeControl,
                    streetViewControl: streetViewControl,
                    fullscreenControl: fullscreenControl

                }
            );
        
            // maps.Map() is constructor that instantiates the map
            this.map = new maps.Map(node, mapConfig);
        }
    }

    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;
    
        const google = this.props.google;
        const maps = google.maps;
    
        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }

    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;

                    this.setState({
                        currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                        }
                    });
                });
            }
        }
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    renderChildren() {
        const { children } = this.props;
    
        if (!children) return;
    
        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    render() {
        const style = Object.assign({}, mapStyles.map);
        return (
            <div>
                <div style={style} ref="map">
                    Loading map...
                </div>
                {this.renderChildren()}
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyA-6n8DEeL1ff9oPSbXS2GbyWsrri53Mo0"
})(CurrentLocation);

CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: 45.2434,
        lng: 20.1152
    },
    centerAroundCurrentLocation: false,
    visible: true,
    keyboardShortcuts: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
}