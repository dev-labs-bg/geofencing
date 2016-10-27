import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectForm from './../../components/SelectForm';

describe('<SelectForm />', () => {
    it('Should have 1 form', () => {
        const wrapper = shallow(<SelectForm
            labelText="Please select an option:"
            buttonText="Submit"
            buttonStyle="primary"
            option="one"
            options={ [ {
                name: "one",
                value: "one"
            }, {
                name: "two",
                value: "two"
            } ] }
        />);

        expect(wrapper.find('form').length).toBe(1);
    });

    it('Should have 1 select', () => {
        const wrapper = mount(<SelectForm
            labelText="Please select an option:"
            buttonText="Submit"
            buttonStyle="primary"
            option="one"
            options={ [ {
                name: "one",
                value: "one"
            }, {
                name: "two",
                value: "two"
            } ] }
        />);

        expect(wrapper.find('select').length).toBe(1);
    });

    it('Should set state according the selected option', () => {
        const wrapper = mount(<SelectForm
            labelText="Please select an option:"
            buttonText="Submit"
            buttonStyle="primary"
            option="one"
            options={ [ {
                name: "one",
                value: "one"
            }, {
                name: "two",
                value: "two"
            } ] }
        />);

        wrapper.find('select').simulate('change', {target: { value : 'two'}});
        expect(wrapper.state('option')).toBe('two');
    });

    it('Should set correct default value', () => {
        const wrapper = mount(<SelectForm
            labelText="Please select an option:"
            buttonText="Submit"
            buttonStyle="primary"
            option="two"
            options={ [ {
                name: "one",
                value: "one"
            }, {
                name: "two",
                value: "two"
            } ] }
        />);

        expect(wrapper.state('option')).toBe('two');
    });

});