import React from 'react';
import {mount, ReactWrapper, shallow, ShallowWrapper} from "enzyme";
import {WritingAreaPresenter} from "./WritingArea.presenter";
import {WritingAreaContainer} from "./WritingArea.container";
import {WritingAreaProps} from "../GameWithHistory/GameWithHistory";
const globalAny:any = global;


describe('WritingAreaContainer', () => {
    const textToWrite = {name: 'title', text: 'hello'};
    it('should pass pressed keys to container', () => {
        const component: ShallowWrapper = shallow(<WritingAreaContainer textToWrite={textToWrite} />);
        const expectedProps: WritingAreaProps = {
            newKey: 'h',
            textToWrite: 'hello'
        };
        component.setState({ newKey: 'h', textToWrite: 'hello'});
        expect(component.find(WritingAreaPresenter).props()).toEqual(expectedProps);
    });

    it('should add keydown listener on mount and remove it on unmount ', () => {
        const addListener  = jest.fn();
        const removeListener = jest.fn();
        globalAny.document.addEventListener = addListener;
        globalAny.document.removeEventListener = removeListener;

        const onKeyPress = jest.fn();
        const component: ReactWrapper =
            mount(<WritingAreaContainer textToWrite={textToWrite} onKeyPress={onKeyPress} />);

        expect(addListener).toHaveBeenCalledWith('keydown', onKeyPress, false);
        component.unmount();
        expect(removeListener).toHaveBeenCalledWith('keydown', onKeyPress, false);
    });

});