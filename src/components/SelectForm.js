import React, { Component } from 'react';

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
        const { option } = this.state;
        const { labelText, buttonText } = this.props;

        return (
            <form onSubmit={ this.handleSubmit }>
                <label>{ labelText }</label>
                <select value={ option } onChange={ this.handleChange }>
                    {this.renderOptions()}
                </select>
                <button type="submit">{ buttonText }</button>
            </form>
        )
    }
}

export default SelectForm;
