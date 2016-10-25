import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class SelectForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            option: props.option || null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * On select change,
     * update the state's option value
     *
     * @param {Object} e - It has the new select value
     */
    handleChange(e) {
        this.setState({
            option: e.target.value
        });
    }

    /**
     * Handle form submission
     *
     * Here we call the submit callback
     *
     * @param {Object} e
     */
    handleSubmit(e) {
        const { option } = this.state;
        const { onSubmit } = this.props;

        e.preventDefault();
        onSubmit(option);
    }

    /**
     * Construct and render
     * passed in select's options
     *
     * @returns {*}
     */
    renderOptions() {
        let { options } = this.props;

        return options.map( (option) => {
            return <option key={option.value} value={option.value}> { option.name } </option>
        } )
    }

    render() {
        const { labelText, buttonText, buttonStyle } = this.props;
        const { option } = this.props;

        return (
            <form onSubmit={ this.handleSubmit }>
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>{ labelText }</ControlLabel>
                    <FormControl onChange={this.handleChange} componentClass="select" defaultValue={option}>
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
