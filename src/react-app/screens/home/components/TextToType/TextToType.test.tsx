import React from 'react';
import { mount } from 'enzyme';
import {TextToType} from "./TextToType";


describe('TextToType', () => {
    it('should show text passed in props', () => {
        const text = 'Long Live, Elvis!';
        const component = mount(<TextToType text={text} />);
        expect(component.find('[data-test-id="text-to-type"]').text()).toEqual(text);
    });
});
