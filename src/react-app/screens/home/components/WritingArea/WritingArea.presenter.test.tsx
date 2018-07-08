import React from 'react';
import {mount} from "enzyme";
import {WritingAreaPresenter} from "./WritingArea.presenter";

describe('WritingArea', () => {
    it('should show text as new text written and deleted', () => {
        const component = mount(<WritingAreaPresenter textToWrite='hello world' newKey='' />);
        expect(component.text()).toEqual('');

        component.setProps({newKey: 'H'});
        component.setProps({newKey: 'e'});
        component.setProps({newKey: ' '});
        component.setProps({newKey: 'l'});
        component.setProps({newKey: 'l'});
        component.setProps({newKey: 'delete'});
        component.setProps({newKey: 'l'});
        component.setProps({newKey: 'o'});

         expect(component.text()).toEqual('He llo');
    });

    it('should show results once completed', () => {
        const component = mount(<WritingAreaPresenter textToWrite='he' newKey='' />);
        component.setProps({newKey: 'h'});
        component.setProps({newKey: 'e'});
        expect(component.text()).toContain('Game is finished');
    });
});