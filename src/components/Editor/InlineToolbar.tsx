import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { EditorState } from 'draft-js';
import * as utils from 'draftjs-utils';
import { getSelectionCoords, getSelectionRange } from './utils';
import { blocks } from './style-schema';

interface InlineToolbarProps {
    editorState: EditorState;
}

const Wrapper = posed(styled.div<{ top: number; left: number }>`
    background-color: ${(props) => props.theme.colors.background};
    z-index: 2;
    border-radius: 4px;
    width: 50px;
    height: 50px;
    position: absolute;
    ${(props) =>
        css`
            top: ${props.top}px;
            left: ${props.left}px;
        `}
`)({
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            opacity: { velocity: 1000 },
            y: {
                type: 'spring',
                stiffness: 300,
                damping: 50,
            },
        },
    },
    exit: {
        y: '-100%',
        opacity: 0,
        transition: {
            opacity: { velocity: 1000 },
            y: {
                type: 'spring',
                stiffness: 300,
                damping: 50,
            },
        },
    },
});

const InlineToolbar: FC<InlineToolbarProps> = ({ editorState }) => {
    const [showed, setShowed] = useState<boolean>(false);
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const currentBlock = utils.getSelectedBlocksType(editorState);

    const toggleToolbar = (): void => {
        if (!editorState.getSelection().isCollapsed()) {
            const selectionRange = getSelectionRange();
            if (!selectionRange) {
                setShowed(false);
                return;
            }
            const selectionCoords = getSelectionCoords(selectionRange, 50, 60);
            if (currentBlock !== blocks.noteTitle) {
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

    useEffect((): void => {
        toggleToolbar();
    }, [editorState]);

    return <PoseGroup>{showed && <Wrapper key={Number(showed)} top={position.top} left={position.left} />}</PoseGroup>;
};

export { InlineToolbar };
