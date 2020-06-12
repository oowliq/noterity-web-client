import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import moment from 'moment';
import { useInterval } from 'helpers';

interface EditorHeaderProps {
    lastSave: Date | null;
    readingTime: { mins: number; text: string };
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
    margin-left: 1em;
`;

const EditorHeader: FC<EditorHeaderProps> = ({ lastSave, readingTime }) => {
    const [lastSaveTitle, setLastSaveTitle] = useState<string>('');

    useInterval((): void => {
        let title = '';
        if (lastSave) title = `last save ${moment(lastSave).fromNow()}`;
        if (lastSaveTitle !== title) setLastSaveTitle(title);
    }, 1000);

    return (
        <Header>
            <SaveWrapper>
                <SaveButton>Publish</SaveButton>
                <LastSaveTitle>{lastSaveTitle}</LastSaveTitle>
            </SaveWrapper>
            {!!readingTime.mins && <WordsCounter>{readingTime.text}</WordsCounter>}
        </Header>
    );
};

export { EditorHeader };
