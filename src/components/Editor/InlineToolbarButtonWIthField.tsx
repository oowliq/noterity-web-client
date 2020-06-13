import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { EditorState, RichUtils } from 'draft-js';

interface ButtonStyledProps {
    active: boolean;
}

const Button = styled.button<ButtonStyledProps>`
    border: none;
    outline: none;
    background-color: #fff;
    height: 100%;
    display: flex;
    width: 40px;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
        svg {
            fill: ${(props) => props.theme.colors.accent};
        }
    }
    ${(props) =>
        props.active &&
        css`
            background: ${props.theme.fontColors.tinted};
            svg {
                fill: ${props.theme.colors.accent};
            }
        `}
`;

interface InlineToolbarButtonWithFieldProps {
    editorState: EditorState;
    title: string;
    resetOtherStyles?: boolean;
    clearStyles?: string[];
    onToggle: (title: string) => void;
}

const InlineToolbarButtonWithField: FC<InlineToolbarButtonWithFieldProps> = ({
    children,
    title,
    resetOtherStyles,
    editorState,
    clearStyles,
    onToggle,
}) => {
    const handleToggle = (): void => {
        onToggle(title);
    };

    return (
        <Button active={false} onClick={handleToggle}>
            {children}
        </Button>
    );
};

export { InlineToolbarButtonWithField };
