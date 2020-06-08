import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { EditorState } from 'draft-js';
import moment from 'moment';
import readingTime from 'reading-time';

interface EditorHeaderProps {
    editorState: EditorState;
    lastSave: Date | null;
    onSave: () => void;
}

const SaveWrapper = styled.div``;

const SaveButton = styled.button`
    border: 1px solid ${(props) => props.theme.colors.green};
    background: none;
    padding: 0.5em 2em;
    border-radius: 3px;
    outline: none;
    font-weight: 600;
    color: ${(props) => props.theme.colors.green};
    transition: all 1s ease;

    &:hover {
        cursor: pointer;
        border: 1px solid ${(props) => darken('.1', props.theme.colors.green)};
    }

    &:active {
        cursor: pointer;
        border: 1px solid ${(props) => darken('.1', props.theme.colors.green)};
        background: ${(props) => darken('.1', props.theme.colors.green)};
        color: #fff;
    }
`;

const WordsCounter = styled.span`
    font-weight: 300;
    color: ${(props) => props.theme.fontColors.tinted};
`;

const Header = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`;

const LastSaveTitle = styled.span`
    font-weight: 300;
    color: ${(props) => props.theme.fontColors.tinted};
`;

const EditorHeader: FC<EditorHeaderProps> = ({ editorState, lastSave, onSave }) => {
    const [lastState, setLastState] = useState<EditorState>(editorState);
    const [lastSaveTitle, setLastSaveTitle] = useState<string>('');

    let lastSaveInterval: ReturnType<typeof setInterval> | null = null;

    useEffect((): void => {
        if (!lastSave) return;

        setLastState(editorState);
        if (lastSaveInterval) clearInterval(lastSaveInterval);
        setLastSaveTitle(`last save ${moment(lastSave).fromNow()}`);
        lastSaveInterval = setInterval((): void => {
            setLastSaveTitle(`last save ${moment(lastSave).fromNow()}`);
        }, 1000);
    }, [lastSave]);

    const newContent = editorState.getCurrentContent().getPlainText() !== lastState.getCurrentContent().getPlainText();

    const textReadingTime = readingTime(editorState.getCurrentContent().getPlainText());

    return (
        <Header>
            <SaveWrapper>
                {newContent && <SaveButton onClick={onSave}>Save</SaveButton>}
                {!newContent && <LastSaveTitle>{lastSaveTitle}</LastSaveTitle>}
            </SaveWrapper>
            {!!textReadingTime.time && <WordsCounter>{textReadingTime.text}</WordsCounter>}
        </Header>
    );
};

export { EditorHeader };
