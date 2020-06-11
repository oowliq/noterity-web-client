import React, { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { EditorState } from 'draft-js';
import ClickOutHandler from 'react-onclickout';
import * as utils from 'draftjs-utils';
import { getSelectionCoords, getSelectionRange } from './utils';
import { blocks } from './styleSchema';
import { InlineToolbarButton } from './InlineToolbarButton';

interface InlineToolbarProps {
    editorState: EditorState;
}

const Wrapper = posed(styled.div<{ top: number; left: number }>`
    background-color: ${(props) => props.theme.colors.accent};
    z-index: 2;
    border-radius: 4px;
    height: 40px;
    padding: 2px;
    position: absolute;
    overflow: hidden;

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

const ButtonsWrapper = styled.div`
    height: 100%;
    display: flex;
`;

const InlineToolbar: FC<InlineToolbarProps> = ({ editorState }) => {
    const [showed, setShowed] = useState<boolean>(false);
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const currentBlock = utils.getSelectedBlocksType(editorState);

    const toggleToolbar = (): void => {
        const containerEl = document.querySelector('.DraftEditor-editorContainer');
        if (containerEl) {
            // const { left, top } = containerEl.getBoundingClientRect();
        }
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

    // const handleHide = (): void => {
    //     setShowed(false);
    // };

    const handleClick = (e: React.MouseEvent): void => {
        e.preventDefault();
    };

    const handleButtonClick = (e: React.MouseEvent): void => {
        alert();
    };

    useEffect((): void => {
        toggleToolbar();
    }, [editorState]);

    return (
        <PoseGroup>
            {showed && (
                <Wrapper key={Number(showed)} top={position.top} left={position.left} onMouseDown={handleClick}>
                    <ClickOutHandler>
                        <ButtonsWrapper key={Number(showed)}>
                            <InlineToolbarButton onClick={handleButtonClick} />
                            <InlineToolbarButton />
                            <InlineToolbarButton />
                        </ButtonsWrapper>
                    </ClickOutHandler>
                </Wrapper>
            )}
        </PoseGroup>
    );
};

export { InlineToolbar };
