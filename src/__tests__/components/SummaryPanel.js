import React from 'react';
import { shallow, mount } from 'enzyme';
import SummaryPanel from './../../components/SummaryPanel';

describe('<SummaryPanel />', () => {

    it('Should set correct default value', () => {
        const wrapper = mount(<SummaryPanel
            heading="Statistics"
            data={ [ {
                name: "Radius in meters",
                value: "1000"
            }, {
                name: "Latitude",
                value: "45.45"
            }, {
                name: "Longitude",
                value: "52.52"
            } ] }
        />);

        expect(wrapper.find('strong').length).toBe(3);
    });

});