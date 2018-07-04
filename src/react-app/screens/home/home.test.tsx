import React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {Home} from "./home";
import {TextToType, TextToTypeProps} from "./components/TextToType/TextToType";
import {WritingAreaContainer} from "./components/WritingArea/WritingArea.container";

describe('Home', () => {
    let home: ShallowWrapper;
    beforeEach(() => {
        home = shallow(<Home textToWrite='chicken' />);
    });

    it('should render TextToType with correct props', () => {
        expect(home.find(TextToType).length).toEqual(1);
        const actualProps = home.find(TextToType).props();
        const expectedProps: TextToTypeProps = {text: 'chicken'};
        expect(actualProps).toEqual(expectedProps);
    });

    it('should render WritingArea', () => {
        expect(home.find(WritingAreaContainer).length).toEqual(1);
    });
});