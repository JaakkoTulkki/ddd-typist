import React from 'react';
import {MapStateProps, OwnProps, TextToType} from "./components/TextToType/TextToType";
import {createStore, combineReducers} from 'redux';
import { Provider, connect } from 'react-redux';

interface AppState {
    hello: string;
}

function hello(): string {
    return 'hello world';
}

const store = createStore(combineReducers({hello}));

function mapStateToProps (state: AppState): MapStateProps {
    return {helloThere: state.hello}
}


const Connected =
    connect<MapStateProps, {}, OwnProps>(mapStateToProps)(TextToType);

export const Home = () =>
    <Provider store={store}>
        <Connected text='hello' />
    </Provider>;
