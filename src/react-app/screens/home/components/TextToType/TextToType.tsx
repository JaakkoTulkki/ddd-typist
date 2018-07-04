import React from 'react';

export interface OwnProps {
    text: string;
}

export type TextToTypeProps = OwnProps;

export class TextToType extends React.Component<TextToTypeProps, {}> {
    public render() {
        return <div data-test-id="text-to-type">{this.props.text}</div>;
    }
}
