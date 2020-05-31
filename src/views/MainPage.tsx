import React, { FC } from 'react';
import styled from 'styled-components';
import { SearchNotesField, NotePreviews } from 'components';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;

const LeftSide = styled.div`
    height: 100vh;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RightSide = styled.div`
    height: 100vh;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Welcome = styled.div`
    min-width: 400px;
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

const MainPage: FC = () => {
    return (
        <Wrapper>
            <LeftSide>
                <Welcome>
                    <WelcomeMessage>Hi, Konstantin</WelcomeMessage>
                    <WelcomeDescription>Welcome to Noterity</WelcomeDescription>
                    <SearchNotesField />
                </Welcome>
            </LeftSide>
            <RightSide>
                <NotePreviews items={items} />
            </RightSide>
        </Wrapper>
    );
};

export { MainPage };
