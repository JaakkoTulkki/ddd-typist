import React from 'react';
import {ReactWrapper, mount} from 'enzyme';
import {Home, TextToType} from "./home";
import {WritingAreaContainer} from "./components/WritingArea/WritingArea.container";

describe('Home', () => {
    let home: ReactWrapper;
    const texts: TextToType[] = [
        {name: 'Chicken Story', text: 'Once upon a chicken'},
        {name: 'Poultry Story', text: 'Once upon a poultry'},
        {name: 'Hen Story', text: 'Once upon a hen'},
    ];
    beforeEach(() => {
        home = mount(<Home texts={texts}/>);
    });

    it('should render WritingArea', () => {
        expect(home.find(WritingAreaContainer).length).toEqual(0);
    });

    it('should show texts to choose', () => {
        expect(home.find('[data-test-id="choose-text"] li').length).toEqual(3);
        home.find('li').at(1).simulate('click');
        const textTitle = home.find('[data-test-id="chosen-text"]').text();
        expect(textTitle).toEqual('Poultry Story');
    });
});