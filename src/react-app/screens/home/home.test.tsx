import React from 'react';
import {ReactWrapper, mount} from 'enzyme';
import {Home} from "./home";
import {WritingAreaContainer} from "./components/WritingArea/WritingArea.container";

describe('Home', () => {
    let home: ReactWrapper;
    beforeEach(() => {
        home = mount(<Home textToWrite='chicken' />);
    });

    it('should render WritingArea', () => {
        expect(home.find(WritingAreaContainer).length).toEqual(1);
    });

    it('should show texts to choose', () => {

    });
});