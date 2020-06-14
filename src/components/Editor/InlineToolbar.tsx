import React, { FC, useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import posed from 'react-pose';
import { EditorState } from 'draft-js';
import * as utils from 'draftjs-utils';
import * as EditorIcons from 'components/icons/Editor';
import { getSelectionCoords, getSelectionRange } from './utils';
import { stylesSchema } from './styleSchema';
import { InlineToolbarButton } from './InlineToolbarButton';
import { InlineToolbarButtonWithField } from './InlineToolbarButtonWIthField';
import { InlineToolbarField } from './InlineToolbarField';

interface InlineToolbarProps {
    editorState: EditorState;
    onStyling: (type: 'inline' | 'block', styleName: string, clearStyles?: string[]) => void;
}

interface FieldData {
    style: string;
    title: string;
    editorState: EditorState;
}

const Wrapper = posed(styled.div<{ top: number; left: number }>`
    z-index: 2;
    border-radius: 4px;
    height: 40px;
    position: absolute;
    overflow: hidden;
    background: #fff;
    border: 1px solid ${(props) => props.theme.fontColors.tinted};
    ${(props) =>
        css`
            top: ${props.top}px;
            left: ${props.left}px;
        `};
`)({
    showed: {
        y: 0,
        opacity: 1,
        transition: {
            y: {
                type: 'spring',
                stiffness: 1000,
                damping: 500,
            },
        },
    },
    hidden: {
        y: '10%',
        opacity: 0,
        transition: {
            y: {
                type: 'spring',
                stiffness: 1000,
                damping: 500,
            },
        },
    },
});

const ButtonsWrapper = styled.div`
    height: 100%;
    display: flex;
    background: #fff;
    border-radius: 5px;
`;

const InlineToolbar: FC<InlineToolbarProps> = ({ editorState, onStyling }) => {
    const [showed, setShowed] = useState<boolean>(false);
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const toolbar = useRef<HTMLDivElement>(null);
    const [currentField, setCurrentField] = useState<FieldData | null>(null);

    const handleClose = (): void => {
        setCurrentField(null);
        setShowed(false);
    };

    const toggleToolbar = (): void => {
        if (currentField) return;
        if (
            !editorState.getSelection().isCollapsed() &&
            editorState.getSelection().getHasFocus() &&
            !!window
                .getSelection()
                ?.toString()
                .replace(/\r\n|\r|\n|\s+/g, '')
        ) {
            const selectionRange = getSelectionRange();
            if (!selectionRange) {
                handleClose();
                return;
            }

            const selectionCoords = getSelectionCoords(selectionRange, 50, 60);
            if (!utils.getSelectedBlock(editorState).toArray().includes(stylesSchema.block.noteTitle.style)) {
                setShowed(true);
                if (selectionCoords)
                    setPosition({
                        top: selectionCoords.offsetTop,
                        left: selectionCoords.offsetLeft,
                    });
            }
        } else {
            handleClose();
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if ((e.target as HTMLDivElement).tagName !== 'INPUT') e.preventDefault();
    };

    const handleFieldToggle = (title?: string): void => {
        if (!title) {
            setCurrentField(null);
        } else setCurrentField({ title, style: '', editorState });
    };

    useEffect((): void => {
        toggleToolbar();
    }, [editorState]);

    const handleToolbarCheck = (type: 'block' | 'inline', styleName: string, clearStyles: string[]): void => {
        onStyling(type, styleName, clearStyles);
    };

    return (
        <Wrapper
            pose={showed ? 'showed' : 'hidden'}
            ref={toolbar}
            top={position.top}
            left={position.left}
            onMouseDown={handleClick}
        >
            <InlineToolbarField showed={!!currentField} title={currentField?.title} onClose={handleFieldToggle} />
            <ButtonsWrapper key={Number(showed)}>
                <InlineToolbarButton
                    editorState={editorState}
                    type="inline"
                    styleName={stylesSchema.inline.bold.style}
                    clearStyles={[stylesSchema.block.title.style, stylesSchema.block.subTitle.style]}
                    onCheck={handleToolbarCheck}
                >
                    <EditorIcons.BoldIcon size={12} />
                </InlineToolbarButton>
                <InlineToolbarButton
                    editorState={editorState}
                    type="inline"
                    clearStyles={[stylesSchema.block.title.style, stylesSchema.block.subTitle.style]}
                    styleName={stylesSchema.inline.italic.style}
                    onCheck={handleToolbarCheck}
                >
                    <EditorIcons.ItalicIcon size={12} />
                </InlineToolbarButton>
                <InlineToolbarButton
                    editorState={editorState}
                    type="block"
                    clearStyles={['all']}
                    styleName={stylesSchema.block.title.style}
                    onCheck={handleToolbarCheck}
                >
                    <EditorIcons.HeadOneIcon size={12} />
                </InlineToolbarButton>
                <InlineToolbarButton
                    editorState={editorState}
                    type="block"
                    clearStyles={['all']}
                    styleName={stylesSchema.block.subTitle.style}
                    onCheck={handleToolbarCheck}
                >
                    <EditorIcons.HeadTwoIcon size={12} />
                </InlineToolbarButton>
                <InlineToolbarButton
                    editorState={editorState}
                    type="block"
                    clearStyles={['all']}
                    styleName={stylesSchema.block.blockQuote.style}
                    onCheck={handleToolbarCheck}
                >
                    <EditorIcons.BlockquoteIcon size={12} />
                </InlineToolbarButton>
                <InlineToolbarButtonWithField
                    editorState={editorState}
                    clearStyles={['all']}
                    title="Paste link"
                    onToggle={handleFieldToggle}
                >
                    Link
                </InlineToolbarButtonWithField>
            </ButtonsWrapper>
        </Wrapper>
    );
};

export { InlineToolbar };
