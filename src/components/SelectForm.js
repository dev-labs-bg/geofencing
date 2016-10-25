import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class SelectForm extends Component {

    constructor() {
        super();

        this.state = {
            option: "0"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            option: e.target.value
        });
    }

    handleSubmit(e) {
        const { option } = this.state;
        const { onSubmit } = this.props;

        e.preventDefault();
        onSubmit(option);
    }

    renderOptions() {
        let { options } = this.props;

        return options.map( (option) => {
            return <option key={option.value} value={option.value}> { option.name } </option>
        } )
    }

    render() {
        const { labelText, buttonText, buttonStyle } = this.props;

        return (
            <form onSubmit={ this.handleSubmit }>
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>{ labelText }</ControlLabel>
                    <FormControl onChange={this.handleChange} componentClass="select" placeholder="select">
                        {this.renderOptions()}
                    </FormControl>
                </FormGroup>

                <div className="pull-right">
                    <Button type="submit" bsStyle={buttonStyle}>
                        { buttonText }
                    </Button>
                </div>
            </form>
        )
    }
}

export default SelectForm;
