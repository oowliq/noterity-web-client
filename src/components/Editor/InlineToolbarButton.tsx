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

interface InlineToolbarButtonProps {
    editorState: EditorState;
    type: 'block' | 'inline';
    styleName: string;
    onCheck: (type: 'block' | 'inline', styleName: string, clearStyles: string[]) => void;
    clearStyles?: string[];
}

const InlineToolbarButton: FC<InlineToolbarButtonProps> = ({
    children,
    editorState,
    type,
    styleName,
    clearStyles,
    onCheck,
}) => {
    const handleCheck = (): void => {
        onCheck(type, styleName, clearStyles || []);
    };

    const inlineActiveCheck =
        type === 'inline'
            ? editorState.getCurrentInlineStyle().has(styleName)
            : RichUtils.getCurrentBlockType(editorState) === styleName;

    return (
        <Button active={inlineActiveCheck} onClick={handleCheck}>
            {children}
        </Button>
    );
};

export { InlineToolbarButton };
