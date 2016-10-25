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
import SummaryPanel from './SummaryPanel';

class Draw extends Component {

    constructor(props) {
        super(props);

        this.state = {
            map: {
                // Where the map to be centered
                center: {
                    lat: 43.220578,
                    lng: 27.9568336
                },
                // Zoom level
                zoom: 8,
                /**
                 * We track the mouse down event.
                 * Combined with mouse movement event,
                 * we know whether or not the drawing process
                 * is started.
                 */
                mouseDown: false
            },
            circle: {
                /**
                 * Center of the circle,
                 * once it's drawn
                 * @type {Leaflet/LatLng}
                 */
                center: null,
                /**
                 * Radius of the circle,
                 * stored in meters
                 * @type {Number}
                 */
                radius: null
            },
            /**
             * What type of drawing
             * mode is selected
             *
             * On "draw" mode - a circle is drawn by map dragging.
             * On "click" mode - a circle with predefined radius is drawn
             * where the user clicks.
             *
             * @type {String} - "draw" or "click"
             */
            option: 'draw',
            /**
             * We can start drawing,
             * only if "Start drawing" button
             * is explicitly clicked
             */
            isDrawingEnabled: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleSlide = this.handleSlide.bind(this);
    }

    /**
     * Handle radius slider
     * value changing
     *
     * @param {Object} e - It has the new slider value
     */
    handleSlide(e) {
        let { circle } = this.state;

        // Convert radius in meters
        circle.radius = e.target.value * 1000;
        this.setState({ circle: circle });
    }

    /**
     * Handle Drawing mode form submission
     *
     * @param {String} option - What drawing mode is selected
     */
    handleSubmit(option) {
        let { circle, isDrawingEnabled } = this.state;

        isDrawingEnabled = ( ! isDrawingEnabled);

        /**
         * If the drawing is enabled,
         * then disable map dragging and
         * remove previous drawn circle
         */
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

    /**
     * Handle map clicking
     *
     * Here we draw a circle,
     * if "Click" drawing mode is selected.
     *
     * @param {Leaflet/LatLng} e - Where it's clicked
     */
    handleMapClick(e) {
        let { circle, isDrawingEnabled, option } = this.state;

        /**
         * Continue only if the "Click" mode is selected and
         * drawing button is clicked
         */
        if ( ! (isDrawingEnabled && option === "click") ) return;

        // Enable map dragging
        this.refs.map.leafletElement.dragging.enable();

        // Set center and radius
        circle.center = e.latlng;
        // 100 km in meters
        circle.radius = 100000;

        this.setState({
            circle:circle,
            isDrawingEnabled: false
        });
    }

    /**
     * Handle map mouse down event
     *
     */
    handleMouseDown() {
        let { map, isDrawingEnabled, option } = this.state;

        /**
         * We track it only for "Draw" drawing mode,
         * because of the combination of mouse down and move events
         * result in circle drawing
         */
        if ( ! (isDrawingEnabled && option === "draw") ) return;

        map.mouseDown = true;
        this.setState({map: map});
    }

    /**
     * Handle map mouse up event
     *
     * Here we enable map dragging again
     * and disable the drawing (isDrawingEnabled === false)
     */
    handleMouseUp() {
        let { map, isDrawingEnabled, option } = this.state;

        /**
         * We track it only for "Draw" drawing mode
         */
        if ( ! (isDrawingEnabled && option === "draw") ) return;

        this.refs.map.leafletElement.dragging.enable();
        map.mouseDown = false;
        this.setState({
            map: map,
            isDrawingEnabled: false
        });
    }

    /**
     * Handle map mouse move event
     *
     * Here we draw a circle,
     * by mouse dragging
     *
     * @param {Leaflet/LatLng} e - Where it's clicked
     */
    handleMouseMove(e) {
        let { map, circle, isDrawingEnabled, option } = this.state;

        /**
         * Drawing happens, only if mouse is down and mouse movement occurs,
         * and drawing mode is "Draw"
         */
        if ( ! (map.mouseDown && isDrawingEnabled && option === "draw") ) return;

        // On the first drag we set the circle center
        if ( ! this.hasCircle() ) {
            circle.center = e.latlng;
        }

        circle.radius = e.latlng.distanceTo(circle.center);
        this.setState({circle:circle});
    }

    /**
     * Is the circle already drawn?
     *
     * @returns {boolean}
     */
    hasCircle() {
        const { circle } = this.state;

        return ( circle.radius !== null || circle.center !== null );
    }

    /**
     * Is the radius slider enabled?
     *
     * It's enabled if the drawing mode is "Click"
     * and the circle exists
     *
     * @returns {boolean}
     */
    isSliderEnabled() {
        const { option } = this.state;

        return ( option === 'click' && this.hasCircle() );
    }

    render() {
        const { map, circle, isDrawingEnabled, option } = this.state;
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
                                        option={option}
                                        options={ [{
                                            name: "Draw",
                                            value: "draw"
                                        }, {
                                            name: "Click",
                                            value: "click"
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
                    <SummaryPanel
                        heading="Drawing data"
                        data={ [ {
                            name: "Radius (km)",
                            value: radiusKM.toFixed(2)
                        }, {
                            name: "Latitude",
                            value: lat
                        }, {
                            name: "Longitude",
                            value: lng
                        } ] }
                    />
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
                            <Circle
                                center={circle.center}
                                radius={circle.radius}
                                fillColor="#f44242"
                                color="#f44242"
                            />
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
