import React, { FC } from 'react';
import styled from 'styled-components';

const Block = styled.div`
    background-color: ${(props) => props.theme.fontColors.backgroundMain};
    width: 50px;
    height: 50px;
    border-radius: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:last-child) {
        margin-right: 1em;
    }

    &:hover {
        cursor: pointer;
    }
`;

interface TopMenuItemProps {}

const TopMenuItem: FC<TopMenuItemProps> = ({ children }) => {
    return <Block>{children}</Block>;
};

export { TopMenuItem };
