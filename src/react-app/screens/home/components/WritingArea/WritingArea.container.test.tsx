import React from 'react';
import {mount, ReactWrapper, shallow, ShallowWrapper} from "enzyme";
import {WritingAreaPresenter, WritingAreaProps} from "./WritingArea.presenter";
import {WritingAreaContainer} from "./WritingArea.container";

describe('WritingAreaContainer', () => {
    it('should pass pressed keys to container', () => {
        const component: ShallowWrapper = shallow(<WritingAreaContainer />);
        const expectedProps: WritingAreaProps = {
            typedText: 'hello'
        };
        component.setState({typedText: 'hello'});
        expect(component.find(WritingAreaPresenter).props()).toEqual(expectedProps);
    });
});