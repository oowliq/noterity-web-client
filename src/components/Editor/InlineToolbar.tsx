import React, { FC, useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import posed from 'react-pose';
import { EditorState, RichUtils } from 'draft-js';
import ClickOutHandler from 'react-onclickout';
import * as utils from 'draftjs-utils';
import * as EditorIcons from 'components/icons/Editor';
import { getSelectionCoords, getSelectionRange } from './utils';
import { stylesSchema } from './styleSchema';
import { InlineToolbarButton } from './InlineToolbarButton';
import { InlineToolbarButtonWithField } from './InlineToolbarButtonWIthField';
import { InlineToolbarField } from './InlineToolbarField';

interface InlineToolbarProps {
    editorState: EditorState;
    onChange: (state: EditorState) => void;
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

const InlineToolbar: FC<InlineToolbarProps> = ({ editorState, onChange }) => {
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

    const handleToolbarCheck = (
        type: 'block' | 'inline',
        styleName: string,
        clearOtherStyles: boolean,
        clearStyles: string[]
    ): void => {
        let newState = editorState;

        if (clearOtherStyles) {
            newState = utils.removeAllInlineStyles(editorState);
        } else if (clearStyles) {
            // eslint-disable-next-line no-restricted-syntax
            for (const style of clearStyles) {
                if (RichUtils.getCurrentBlockType(newState) === style) {
                    newState = RichUtils.toggleBlockType(editorState, style);
                }
                if (newState.getCurrentInlineStyle().has(style)) {
                    newState = RichUtils.toggleInlineStyle(editorState, style);
                }
            }
        }
        if (type === 'inline') {
            onChange(RichUtils.toggleInlineStyle(newState, styleName));
        }
        if (type === 'block') {
            onChange(RichUtils.toggleBlockType(newState, styleName));
        }
    };

    const handleFieldToggle = (title?: string): void => {
        if (!title) {
            setCurrentField(null);
            //  if (currentField?.editorState) onChange(currentField.editorState);
        } else setCurrentField({ title, style: '', editorState });
    };

    const handleClickOut = (): void => {
        if (currentField) {
            setCurrentField(null);
            setShowed(false);
        }
    };

    useEffect((): void => {
        toggleToolbar();
    }, [editorState]);

    return (
        <Wrapper
            pose={showed ? 'showed' : 'hidden'}
            ref={toolbar}
            top={position.top}
            left={position.left}
            onMouseDown={handleClick}
        >
            {/* <ClickOutHandler onClickOut={handleClickOut} className={'sss'}> */}
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
                    resetOtherStyles
                    styleName={stylesSchema.block.title.style}
                    onCheck={handleToolbarCheck}
                >
                    <EditorIcons.HeadOneIcon size={12} />
                </InlineToolbarButton>
                <InlineToolbarButton
                    editorState={editorState}
                    type="block"
                    resetOtherStyles
                    styleName={stylesSchema.block.subTitle.style}
                    onCheck={handleToolbarCheck}
                >
                    <EditorIcons.HeadTwoIcon size={12} />
                </InlineToolbarButton>
                <InlineToolbarButton
                    editorState={editorState}
                    type="block"
                    resetOtherStyles
                    styleName={stylesSchema.block.blockQuote.style}
                    onCheck={handleToolbarCheck}
                >
                    <EditorIcons.BlockquoteIcon size={12} />
                </InlineToolbarButton>
                <InlineToolbarButtonWithField
                    editorState={editorState}
                    resetOtherStyles
                    title="Paste link"
                    onToggle={handleFieldToggle}
                >
                    Link
                </InlineToolbarButtonWithField>
            </ButtonsWrapper>
            {/* </ClickOutHandler> */}
        </Wrapper>
    );
};

export { InlineToolbar };
