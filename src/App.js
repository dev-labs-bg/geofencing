import React, { Component } from 'react';
import { Map, CircleMarker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

class App extends Component {

    constructor () {
        super();

        this.state = {
            map: {
                center: {
                    lat: 43.220578,
                    lng: 27.9568336
                },
                zoom: 13
            }
        };

    }

    render() {
        const { map } = this.state;

        return (
            <Map
                ref='map'
                center={map.center}
                zoom={map.zoom}
            >

                <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
            </Map>
        )
    }
}

export default App;
