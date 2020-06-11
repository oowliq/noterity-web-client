import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NotePreviewMini } from 'components';
import posed from 'react-pose';

interface NotePreviewsProps {
    allItemsCount: number;
    items: { title: string; color: string }[];
}

const Wrapper = styled.div``;

const Title = styled.span`
    color: ${(props) => props.theme.fontColors.backgroundMain};
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 1px;
    margin-left: 1em;
    display: flex;
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

const PosedItemWrapper = posed(ItemWrapper)({
    open: { opacity: 1, y: '0%' },
    closed: { opacity: 0, y: '100%', delay: 300 },
});

const PosedTitle = posed(Title)({
    open: { opacity: 1, y: '0%' },
    closed: { opacity: 0, y: '-100%', delay: 300 },
});

const GrayBlockTitle = styled.span`
    font-size: 20px;
    color: ${(props) => props.theme.fontColors.backgroundMain};
`;

const NotePreviews: FC<NotePreviewsProps> = ({ allItemsCount, items }) => {
    const [open, setOpen] = useState<boolean>(false);

    useEffect((): void => {
        setOpen(true);
    }, []);

    return (
        <Wrapper>
            <PosedTitle pose={open ? 'open' : 'closed'}>
                Notes
                <TitleCount>
({allItemsCount.toString()}
)
</TitleCount>
            </PosedTitle>
            <Items>
                {items
                    .filter((item, idx) => idx < 5)
                    .map((item) => (
                        <PosedItemWrapper pose={open ? 'open' : 'closed'} key={item.title}>
                            <NotePreviewMini color={item.color} title={item.title} />
                        </PosedItemWrapper>
                    ))}

                {items.length > 5 && (
                    <PosedItemWrapper pose={open ? 'open' : 'closed'}>
                        <GrayBlock>
                            <GrayBlockTitle>{allItemsCount - 5}
+
</GrayBlockTitle>
                        </GrayBlock>
                    </PosedItemWrapper>
                )}
            </Items>
        </Wrapper>
    );
};

export { NotePreviews };
