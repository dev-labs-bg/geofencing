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
                zoom: 13,
                mouseDown: false
            },
            circleMarker: {
                center: {
                    latlng: null,
                    point: null
                },
                radius: {
                    px: null,
                    metres: null
                }
            },
            option: "0",
            isDrawingEnabled: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleChange(e) {
        this.setState({
            option: e.target.value
        });
    }

    handleClick(e) {
        let { circleMarker, isDrawingEnabled } = this.state;

        isDrawingEnabled = ( ! isDrawingEnabled);

        if ( isDrawingEnabled ) {
            this.refs.map.leafletElement.dragging.disable();
            circleMarker = {
                center: {
                    latlng: null,
                    point: null
                },
                radius: {
                    px: null,
                    metres: null
                }
            };
        }

        this.setState({
            circleMarker: circleMarker,
            isDrawingEnabled: isDrawingEnabled
        });
    }

    handleMouseDown() {
        let { map } = this.state;

        map.mouseDown = true;
        this.setState({map: map});
    }

    handleMouseUp() {
        let { map } = this.state;

        this.refs.map.leafletElement.dragging.enable();
        map.mouseDown = false;
        this.setState({
            map: map,
            isDrawingEnabled: false
        });
    }

    handleMouseMove(e) {
        let { map, circleMarker, isDrawingEnabled } = this.state;

        if ( ! (map.mouseDown && isDrawingEnabled) ) return;

        let point = this.refs.map.leafletElement.latLngToLayerPoint(e.latlng);

        if ( ! this.hasCircleMarker() ) {
            circleMarker.center.point = point;
            circleMarker.center.latlng = e.latlng;
        }

        circleMarker.radius.px = point.distanceTo(circleMarker.center.point);
        this.setState({circleMarker:circleMarker});
    }

    hasCircleMarker() {
        const { circleMarker } = this.state;

        return ( circleMarker.center.point !== null && circleMarker.radius.px !== null );
    }

    render() {
        const { map, circleMarker, option, isDrawingEnabled } = this.state;

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
                    zoom={map.zoom}
                    onmousedown={this.handleMouseDown.bind(this)}
                    onmouseup={this.handleMouseUp.bind(this)}
                    onmousemove={this.handleMouseMove.bind(this)}
                >
                    { this.hasCircleMarker() ?
                        <CircleMarker center={circleMarker.center.latlng} radius={circleMarker.radius.px} />
                    : null}

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
