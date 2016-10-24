import React, { Component } from 'react';
import { Map, CircleMarker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = {
            map: {
                center: {
                    lat: 43.220578,
                    lng: 27.9568336
                },
                zoom: 13
            },
            option: "0",
            isDrawingEnabled: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.setState({
            option: e.target.value
        });
    }

    handleClick(e) {
        const { isDrawingEnabled } = this.state;

        this.setState({
            isDrawingEnabled: ! isDrawingEnabled
        });
    }

    render() {
        const { map, option, isDrawingEnabled } = this.state;

        return (
            <div>
                Enable drawing by selecting an option of the list:
                <select value={option} onChange={this.handleChange}>
                    <option value="0">Draw CircleMarker</option>
                    <option value="1">Create CircleMarker by a click</option>
                </select>
                <button type="submit" onClick={this.handleClick}>{isDrawingEnabled ? 'Stop drawing' : 'Start drawing'}</button>

                <Map
                    ref='map'
                    center={map.center}
                    zoom={map.zoom} >

                    <TileLayer
                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                </Map>
            </div>
        )
    }
}

export default App;
