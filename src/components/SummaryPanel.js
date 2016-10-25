import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

class SummaryPanel extends Component {

    /**
     * Construct and render
     * passed in data
     *
     * @returns {*}
     */
    renderData() {
        let { data } = this.props;

        return data.map( (d) => {
            return <div key={d.name}>
                <strong>{d.name}</strong>: {d.value}
            </div>
        } )
    }

    render() {
        const { heading } = this.props;

        return (
            <Row>
                <Col lg={12} >
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <span className="glyphicon glyphicon-pushpin"></span> { heading }</div>
                        <div className="panel-body">{ this.renderData() }</div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default SummaryPanel;
