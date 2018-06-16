import * as React from 'react';
import { Hello } from "./hello";
import { mount } from 'enzyme';

describe('hello', function () {
    it('should workd', function () {
        const component = mount(<Hello />);
        expect(component).toMatchSnapshot();
    });
});