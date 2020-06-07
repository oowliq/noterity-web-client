import React, { FC } from 'react';
import { ItalicIcon } from 'components/icons/Editor';
import styled, { css } from 'styled-components';

enum inlineStyles {
    italic = 'I',
    bold = 'B',
    title = 'header-one',
    subTitle = 'blockquote',
}

const InlineToolbarButton = styled.button<{ enabled: boolean }>`
    border: 1px solid ${(props) => props.theme.fontColors.tinted};
    outline: none;
    background: none;
    font-weight: 600;
    padding: 0.5em;
    border-radius: 5px;

    &:hover {
        cursor: pointer;
    }

    &:not(:last-child) {
        margin-right: 0.5em;
    }

    ${(props) =>
        props.enabled &&
        css`
            color: ${props.theme.colors.accent};
            border: 1px solid ${props.theme.colors.accent};
        `}
`;

interface InlineToolbarButtonProps {
    toggled: (style: string) => boolean;
    onToggle: (style: string, type: 'inline' | 'block') => void;
}

const ItalicButton: FC<InlineToolbarButtonProps> = ({ toggled, onToggle }) => {
    const handleKeyDown = (): void => onToggle(inlineStyles.italic, 'inline');

    return (
        <InlineToolbarButton enabled={toggled(inlineStyles.italic)} onMouseDown={handleKeyDown}>
            Italic
        </InlineToolbarButton>
    );
};

const BoldButton: FC<InlineToolbarButtonProps> = ({ toggled, onToggle }) => {
    const handleKeyDown = (): void => onToggle(inlineStyles.bold, 'inline');

    return (
        <InlineToolbarButton enabled={toggled(inlineStyles.bold)} onMouseDown={handleKeyDown}>
            Bold
        </InlineToolbarButton>
    );
};

const TitleButton: FC<InlineToolbarButtonProps> = ({ toggled, onToggle }) => {
    const handleKeyDown = (): void => onToggle(inlineStyles.title, 'block');

    return (
        <InlineToolbarButton enabled={toggled(inlineStyles.title)} onMouseDown={handleKeyDown}>
            Title
        </InlineToolbarButton>
    );
};

const SubTitleButton: FC<InlineToolbarButtonProps> = ({ toggled, onToggle }) => {
    const handleKeyDown = (): void => onToggle(inlineStyles.subTitle, 'block');

    return (
        <InlineToolbarButton enabled={toggled(inlineStyles.subTitle)} onMouseDown={handleKeyDown}>
            Sub title
        </InlineToolbarButton>
    );
};

export { ItalicButton, BoldButton, TitleButton, SubTitleButton };
