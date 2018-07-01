import React from 'react';

interface TexToTypeProps {
    text: string;
}

export const TextToType: React.SFC<TexToTypeProps> = ({text}) =>
    <div data-test-id="text-to-type">{text}</div>;