import React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {Home} from "./home";
import {WritingAreaContainer} from "./components/WritingArea/WritingArea.container";

describe('Home', () => {
    let home: ShallowWrapper;
    beforeEach(() => {
        home = shallow(<Home textToWrite='chicken' />);
    });

    it('should render WritingArea', () => {
        expect(home.find(WritingAreaContainer).length).toEqual(1);
    });
});