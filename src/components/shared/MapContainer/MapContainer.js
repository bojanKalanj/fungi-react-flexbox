import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './MapContainer';
 
export class MapContainer extends Component {

    render() {        
        return (
            <div className="MapContainer">
                <Map
                    google={this.props.google}
                    zoom={10}
                    style={{ width: '700px', height: '400px', position: 'relative' }}
                    className={'map'}
                    initialCenter={{
                        lat: 45.2678024,
                        lng: 19.7552953
                    }}
                    scrollwheel={false}
                    keyboardShortcuts={false}
                    mapTypeControl={false}
                    streetViewControl={false}
                    fullscreenControl={false}
                >
            
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Trenutna lokacija'}
                    />
            
                </Map>
            </div>
        );
    }
}
 
export default GoogleApiWrapper({
    apiKey: "AIzaSyA-6n8DEeL1ff9oPSbXS2GbyWsrri53Mo0"
})(MapContainer);