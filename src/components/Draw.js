import React, { Component } from 'react';
import { Map, Circle, TileLayer } from 'react-leaflet';
import { Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import 'bootstrap-slider/dist/css/bootstrap-slider.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
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
                zoom: 8,
                mouseDown: false
            },
            circle: {
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
        this.handleSlide = this.handleSlide.bind(this);
    }

    handleChange(e) {
        this.setState({ option: e.target.value });
    }

    handleSlide(e) {
        let { circle } = this.state;

        circle.radius = e.target.value * 1000;
        this.setState({ circle: circle });
    }

    handleSubmit(option) {
        let { circle, isDrawingEnabled } = this.state;

        isDrawingEnabled = ( ! isDrawingEnabled);

        if ( isDrawingEnabled ) {
            this.refs.map.leafletElement.dragging.disable();
            circle = {
                center: null,
                radius: null
            };
        }

        this.setState({
            circle: circle,
            isDrawingEnabled: isDrawingEnabled,
            option: option
        });
    }

    handleMapClick(e) {
        let { circle, isDrawingEnabled, option } = this.state;

        if ( ! (isDrawingEnabled && option === "1") ) return;

        this.refs.map.leafletElement.dragging.enable();
        circle.center = e.latlng;
        circle.radius = 100000;
        this.setState({
            circle:circle,
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
        let { map, circle, isDrawingEnabled, option } = this.state;

        if ( ! (map.mouseDown && isDrawingEnabled && option === "0") ) return;

        if ( ! this.hasCircle() ) {
            circle.center = e.latlng;
        }

        circle.radius = e.latlng.distanceTo(circle.center);
        this.setState({circle:circle});
    }

    hasCircle() {
        const { circle } = this.state;

        return ( circle.radius !== null || circle.center !== null );
    }

    isSliderEnabled() {
        const { option } = this.state;

        return ( option === '1' && this.hasCircle());
    }

    render() {
        const { map, circle, isDrawingEnabled } = this.state;
        const radiusKM = ( circle.radius / 1000 );
        const lat = ( this.hasCircle() ? circle.center.lat : 'N/A' );
        const lng = ( this.hasCircle() ? circle.center.lng : 'N/A' );

        return (
            <Row>
                <Col md={2}>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <span className="glyphicon glyphicon-cog"></span> Drawing options </div>
                        <div className="panel-body">
                            <Row>
                                <Col lg={12} >
                                    <SelectForm
                                        labelText="Mode"
                                        buttonText={isDrawingEnabled ? 'Stop drawing' : 'Start drawing'}
                                        options={ [{
                                            name: "Draw",
                                            value: "0"
                                        }, {
                                            name: "Click",
                                            value: "1"
                                        }] }
                                        onSubmit={this.handleSubmit}
                                        buttonStyle={isDrawingEnabled ? 'danger' : 'primary'}
                                    />
                                 </Col>
                            </Row>

                            <Row>
                                <Col lg={12} >
                                    <FormGroup>
                                        <ControlLabel>Radius (km)</ControlLabel>
                                        <div className="form-control">
                                            <ReactBootstrapSlider
                                                value={radiusKM}
                                                step={1}
                                                max={100}
                                                min={0}
                                                orientation="horizontal"
                                                change={this.handleSlide}
                                                disabled={this.isSliderEnabled() ? 'false' : 'disabled'}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <Row>
                        <Col lg={12} >
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <span className="glyphicon glyphicon-pushpin"></span> Drawing data</div>
                                <div className="panel-body">
                                    Radius: { radiusKM.toFixed(2) } km <br />
                                    Latitude: { lat } <br />
                                    Longitude: { lng } <br />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={10}>
                    <Map
                        ref='map'
                        center={map.center}
                        zoom={map.zoom}
                        onclick={this.handleMapClick}
                        onmousedown={this.handleMouseDown}
                        onmouseup={this.handleMouseUp}
                        onmousemove={this.handleMouseMove}
                    >
                        { this.hasCircle() ?
                            <Circle center={circle.center} radius={circle.radius} />
                        : null}

                        <TileLayer
                            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                    </Map>
                </Col>
            </Row>
        )
    }
}

export default Draw;
