import React, { FC } from 'react';
import styled from 'styled-components';
import { NotePreviewMini } from 'components';

interface NotePreviewsProps {
    items: { title: string; color: string }[];
}

const Wrapper = styled.div``;

const Title = styled.span`
    color: ${(props) => props.theme.fontColors.backgroundMain};
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 1px;
    margin-left: 1em;
`;

const TitleCount = styled.span`
    margin-left: 0.5em;
    font-weight: 300;
    font-size: 16px;
    position: relative;
    bottom: 4px;
    letter-spacing: 0;
    color: ${(props) => props.theme.fontColors.description};
`;

const Items = styled.div`
    display: flex;
    margin-top: 2em;
    max-width: 400px;
    flex-wrap: wrap;
`;

const ItemWrapper = styled.div`
    margin: 20px 5px;
    flex: 1 1 auto;
`;

const GrayBlock = styled.div`
    background-color: ${(props) => props.theme.colors.backgroundAccent};
    width: 100px;
    height: 100px;
    border-radius: 1.5em;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 10px;
    &:hover {
        cursor: pointer;
    }
`;

const GrayBlockTitle = styled.span`
    font-size: 40px;
    color: ${(props) => props.theme.fontColors.backgroundMain};
`;

const NotePreviews: FC<NotePreviewsProps> = ({ items }) => {
    return (
        <Wrapper>
            <Title>
                Notes
                <TitleCount>(10)</TitleCount>
            </Title>
            <Items>
                {items
                    .filter((item, idx) => idx < 5)
                    .map((item) => (
                        <ItemWrapper>
                            <NotePreviewMini color={item.color} title={item.title} />
                        </ItemWrapper>
                    ))}
                {items.length > 5 && (
                    <ItemWrapper>
                        <GrayBlock>
                            <GrayBlockTitle>{items.length - 5}+</GrayBlockTitle>
                        </GrayBlock>
                    </ItemWrapper>
                )}
            </Items>
        </Wrapper>
    );
};

export { NotePreviews };
