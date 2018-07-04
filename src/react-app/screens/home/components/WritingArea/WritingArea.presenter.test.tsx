import React from 'react';
import {mount} from "enzyme";
import {WritingAreaPresenter} from "./WritingArea.presenter";

describe('WritingArea', () => {
    it('should render keys', () => {
        const component = mount(<WritingAreaPresenter typedText='blaah' />);
        expect(component.text()).toEqual('blaah');
    });
});