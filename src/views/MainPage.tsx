import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchNotesField, NotePreviews } from 'components';
import { media } from 'theme';
import posed from 'react-pose';

const Wrapper = styled.div`
    display: flex;
    width: 100%;

    ${media.lessThan('medium')`
       flex-direction: column;
    `}
`;

const SideDiv = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${media.lessThan('medium')`
       width: 100%;
    `}
`;

const LeftSide = styled(SideDiv)``;

const RightSide = styled(SideDiv)``;

const Welcome = styled.div`
    min-width: 400px;
    margin-bottom: 1em;
    ${media.lessThan('medium')`
       width: 100%;
       display: flex;
       align-items: center;
       justify-content: center;
       flex-direction: column;
       margin-top: 6em;
    `}
`;

const WelcomeMessage = styled.h1`
    color: ${(props) => props.theme.fontColors.backgroundMain};
    font-size: 50px;
`;

const WelcomeDescription = styled.p`
    margin-top: 1em;
    color: ${(props) => props.theme.fontColors.description};
    font-weight: 300;
    font-size: 18px;
`;

const PosedWelcome = posed(Welcome)({ open: { opacity: 1 }, closed: { opacity: 0, delay: 300 } });

const PosedSearchNotesField = posed.div({ open: { y: 0, opacity: 1 }, closed: { y: '-100%', opacity: 0, delay: 300 } });

const items: { title: string; color: string }[] = [
    {
        title: 'Game keys',
        color: '#ee5253',
    },
    {
        title: 'Config',
        color: '#0abde3',
    },
    {
        title: 'Playlist',
        color: '#10ac84',
    },
    {
        title: 'Offsets In',
        color: '#5f27cd',
    },
    {
        title: 'Landing Page',
        color: '#01a3a4',
    },
    {
        title: 'Secret code',
        color: '#feca57',
    },
];

const NotePreviewsWrapper = styled.div`
    ${media.lessThan('medium')`
       width: 100%;
       display: flex;
       align-items: center;
       justify-content: center;
       flex-direction: column;
       margin-top: 6em;
    `}
`;

const MainPage: FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    useEffect((): void => {
        setOpen(true);
    }, []);

    return (
        <Wrapper>
            <LeftSide>
                <PosedWelcome pose={open ? 'open' : 'closed'}>
                    <WelcomeMessage>Hi, Konstantin</WelcomeMessage>
                    <WelcomeDescription>Welcome to Noterity</WelcomeDescription>
                    <PosedSearchNotesField pose={open ? 'open' : 'closed'}>
                        <SearchNotesField />
                    </PosedSearchNotesField>
                </PosedWelcome>
            </LeftSide>
            <RightSide>
                <NotePreviewsWrapper>
                    <NotePreviews items={items} allItemsCount={120} />
                </NotePreviewsWrapper>
            </RightSide>
        </Wrapper>
    );
};

export { MainPage };
