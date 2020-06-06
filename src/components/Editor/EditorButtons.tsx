import React, { FC } from 'react';
import { ItalicIcon } from 'components/icons/Editor';
import { createInlineStyleButton } from 'draft-js-buttons';
import { css } from 'styled-components';

const ItalicButton = createInlineStyleButton({
    style: 'BOLD',
    children: <ItalicIcon size={20} />,
});

const InlineButtonStyle = css`
    display: none;
    color: 'red';
`;

export { InlineButtonStyle, ItalicButton };
