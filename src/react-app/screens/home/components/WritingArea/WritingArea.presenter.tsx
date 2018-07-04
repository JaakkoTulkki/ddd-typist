import React from 'react';

export interface WritingAreaProps {
    typedText: string;
}

export const WritingAreaPresenter: React.SFC<WritingAreaProps> = ({typedText}) => <div>{typedText}</div>;
