import React, { Component } from 'react';
import { Map, Circle, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';

import SelectForm from './SelectForm';

class Draw extends Component {

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
                center: null,
                radius: null
            },
            option: null,
            isDrawingEnabled: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleChange(e) {
        this.setState({ option: e.target.value });
    }

    handleSubmit(option) {
        let { circleMarker, isDrawingEnabled } = this.state;

        isDrawingEnabled = ( ! isDrawingEnabled);

        if ( isDrawingEnabled ) {
            this.refs.map.leafletElement.dragging.disable();
            circleMarker = {
                center: null,
                radius: null
            };
        }

        this.setState({
            circleMarker: circleMarker,
            isDrawingEnabled: isDrawingEnabled,
            option: option
        });
    }

    handleMapClick(e) {
        let { circleMarker, isDrawingEnabled, option } = this.state;

        if ( ! (isDrawingEnabled && option === "1") ) return;

        this.refs.map.leafletElement.dragging.enable();
        circleMarker.center = e.latlng;
        circleMarker.radius = 10000;
        this.setState({
            circleMarker:circleMarker,
            isDrawingEnabled: false
        });
    }

    handleMouseDown() {
        let { map, isDrawingEnabled, option } = this.state;

        if ( ! (isDrawingEnabled && option === "0") ) return;

        map.mouseDown = true;
        this.setState({map: map});
    }

    handleMouseUp() {
        let { map } = this.state;

        if ( map.mouseDown === false ) return;

        this.refs.map.leafletElement.dragging.enable();
        map.mouseDown = false;
        this.setState({
            map: map,
            isDrawingEnabled: false
        });
    }

    handleMouseMove(e) {
        let { map, circleMarker, isDrawingEnabled, option } = this.state;

        if ( ! (map.mouseDown && isDrawingEnabled && option === "0") ) return;

        if ( ! this.hasCircleMarker() ) {
            circleMarker.center = e.latlng;
        }

        circleMarker.radius = e.latlng.distanceTo(circleMarker.center);
        this.setState({circleMarker:circleMarker});
    }

    hasCircleMarker() {
        const { circleMarker } = this.state;

        return ( circleMarker.radius !== null || circleMarker.radius !== null );
    }

    render() {
        const { map, circleMarker, isDrawingEnabled } = this.state;

        return (
            <div>
                <SelectForm
                    labelText="Enable drawing by selecting an option of the list:"
                    buttonText={isDrawingEnabled ? 'Stop drawing' : 'Start drawing'}
                    options={ [{
                        name: "Draw CircleMarker",
                        value: "0"
                    }, {
                        name: "Create CircleMarker by a click",
                        value: "1"
                    }] }
                    onSubmit={this.handleSubmit}
                />

                <Map
                    ref='map'
                    center={map.center}
                    zoom={map.zoom}
                    onclick={this.handleMapClick}
                    onmousedown={this.handleMouseDown}
                    onmouseup={this.handleMouseUp}
                    onmousemove={this.handleMouseMove}
                >
                    { this.hasCircleMarker() ?
                        <Circle center={circleMarker.center} radius={circleMarker.radius} />
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

export default Draw;
