import React from 'react';
import {mount, ReactWrapper, shallow, ShallowWrapper} from "enzyme";
import {WritingAreaPresenter, WritingAreaProps} from "./WritingArea.presenter";
import {WritingAreaContainer} from "./WritingArea.container";
const globalAny:any = global;


describe('WritingAreaContainer', () => {
    it('should pass pressed keys to container', () => {
        const component: ShallowWrapper = shallow(<WritingAreaContainer />);
        const expectedProps: WritingAreaProps = {
            typedText: 'hello'
        };
        component.setState({typedText: 'hello'});
        expect(component.find(WritingAreaPresenter).props()).toEqual(expectedProps);
    });

    it('should add keydown listener on mount and remove it on unmount ', () => {
        const addListener  = jest.fn();
        const removeListener = jest.fn();
        globalAny.document.addEventListener = addListener;
        globalAny.document.removeEventListener = removeListener;

        const onKeyPress = jest.fn();
        const component: ReactWrapper = mount(<WritingAreaContainer onKeyPress={onKeyPress}/>);

        expect(addListener).toHaveBeenCalledWith('keydown', onKeyPress, false);
        component.unmount();
        expect(removeListener).toHaveBeenCalledWith('keydown', onKeyPress, false);
    });

});