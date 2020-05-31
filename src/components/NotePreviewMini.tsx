import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { adjustHue } from 'polished';

interface NotePreviewMiniProps {
    color: string;
    title: string;
}

const Block = styled(Link)`
    text-decoration: none;
    color: ${(props) => props.theme.fontColors.tinted};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const BlockPic = styled.div<{ color: string }>`
    background-color: ${(props) => adjustHue(10, props.color)};
    background: linear-gradient(45deg, ${(props) => props.color} 0%, ${(props) => adjustHue(30, props.color)} 100%);
    width: 100px;
    height: 100px;
    border-radius: 1.5em;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
        transition: all 0.1s ease;
        content: '';
        border-radius: 2.1em;
        position: absolute;
        top: 0px;
        left: 0px;
        border: 0px solid ${(props) => props.color};
        width: 100%;
        height: 100%;
    }

    &:hover {
        &::after {
            top: -10px;
            left: -10px;
            border: 3px solid ${(props) => adjustHue(10, props.color)};
            width: calc(100% + 20px);
            height: calc(100% + 20px);
        }
    }
`;

const BlockTitle = styled.span`
    display: flex;
    margin-top: 2em;
    font-weight: 500;
`;

const BlockLetters = styled.span`
    font-size: 30px;
    color: ${(props) => props.theme.fontColors.main};
`;

const NotePreviewMini: FC<NotePreviewMiniProps> = ({ color, title }) => {
    const getFirstLetters = (): string => {
        const words: string[] = title.split(' ');
        let letters = '';

        for (let i = 0; i < words.length; i++) {
            letters += words[i][0];
        }

        return letters.toUpperCase();
    };

    return (
        <Block to="/">
            <BlockPic color={color}>
                <BlockLetters>{getFirstLetters()}</BlockLetters>
            </BlockPic>
            <BlockTitle>{title}</BlockTitle>
        </Block>
    );
};

export { NotePreviewMini };
