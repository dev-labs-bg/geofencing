import React from 'react';
import { shallow } from 'enzyme';
import App from './../App';
import Draw from './../components/Draw';

describe('<App />', () => {
    it('Should render 1 `.container-fluid`', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('.container-fluid').length).toBe(1);
    });

    it('Should render 1 `Draw`', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Draw).length).toBe(1);
    });
});