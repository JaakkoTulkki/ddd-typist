import React from 'react';

export interface MapStateProps {
    helloThere: string;
}

export interface OwnProps {
    text: string;
}

export type TextToTypeProps = MapStateProps & OwnProps;

export class TextToType extends React.Component<TextToTypeProps, {}> {
    public render() {
        return <div data-test-id="text-to-type">{this.props.text} - {this.props.helloThere}</div>;
    }
}
