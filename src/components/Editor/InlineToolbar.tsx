import React, { FC, useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import posed from 'react-pose';
import { EditorState, RichUtils } from 'draft-js';
import ClickOutHandler from 'react-onclickout';
import * as utils from 'draftjs-utils';
import * as EditorIcons from 'components/icons/Editor';
import { getSelectionCoords, getSelectionRange } from './utils';
import { blocksSchema, inlineSchema } from './styleSchema';
import { InlineToolbarButton } from './InlineToolbarButton';

interface InlineToolbarProps {
    editorState: EditorState;
    onChange: (state: EditorState) => void;
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
    const currentBlock = utils.getSelectedBlocksType(editorState);

    const toggleToolbar = (): void => {
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
                setShowed(false);
                return;
            }

            const selectionCoords = getSelectionCoords(selectionRange, 50, 60);
            if (!utils.getSelectedBlock(editorState).toArray().includes(blocksSchema.noteTitle)) {
                setShowed(true);
                if (selectionCoords)
                    setPosition({
                        top: selectionCoords.offsetTop,
                        left: selectionCoords.offsetLeft,
                    });
            }
        } else {
            setShowed(false);
        }
    };

    const handleClick = (e: React.MouseEvent): void => {
        e.preventDefault();
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
            <ClickOutHandler>
                <ButtonsWrapper key={Number(showed)}>
                    <InlineToolbarButton
                        editorState={editorState}
                        type="inline"
                        styleName={inlineSchema.bold}
                        clearStyles={[blocksSchema.title, blocksSchema.subTitle]}
                        onCheck={handleToolbarCheck}
                    >
                        <EditorIcons.BoldIcon size={12} />
                    </InlineToolbarButton>
                    <InlineToolbarButton
                        editorState={editorState}
                        type="inline"
                        clearStyles={[blocksSchema.title, blocksSchema.subTitle]}
                        styleName={inlineSchema.italic}
                        onCheck={handleToolbarCheck}
                    >
                        <EditorIcons.ItalicIcon size={12} />
                    </InlineToolbarButton>
                    <InlineToolbarButton
                        editorState={editorState}
                        type="block"
                        resetOtherStyles
                        styleName={blocksSchema.title}
                        onCheck={handleToolbarCheck}
                    >
                        <EditorIcons.HeadOneIcon size={12} />
                    </InlineToolbarButton>
                    <InlineToolbarButton
                        editorState={editorState}
                        type="block"
                        resetOtherStyles
                        styleName={blocksSchema.subTitle}
                        onCheck={handleToolbarCheck}
                    >
                        <EditorIcons.HeadTwoIcon size={12} />
                    </InlineToolbarButton>
                    <InlineToolbarButton
                        editorState={editorState}
                        type="block"
                        resetOtherStyles
                        styleName={blocksSchema.blockQuote}
                        onCheck={handleToolbarCheck}
                    >
                        <EditorIcons.BlockquoteIcon size={12} />
                    </InlineToolbarButton>
                </ButtonsWrapper>
            </ClickOutHandler>
        </Wrapper>
    );
};

export { InlineToolbar };
