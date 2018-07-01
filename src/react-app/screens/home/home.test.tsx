import React from 'react';
import { mount } from 'enzyme';
import {Home} from "./home";
import { TextToType } from "./components/TextToType/TextToType";

describe('Home', () => {
    it('should render TextToType', () => {
        const home = mount(<Home />);
        expect(home.find(TextToType).length).toEqual(1);
    });
});