import React, { FC } from 'react';
import styled from 'styled-components';

const Button = styled.button`
    border: none;
    outline: none;
    background-color: ${(props) => props.theme.fontColors.tinted};
    height: 100%;
    display: flex;
    width: 30px;
    align-items: center;
    justify-content: center;
`;

const InlineToolbarButton: FC<React.HTMLAttributes<HTMLButtonElement>> = (props) => {
    return <Button {...props}>1</Button>;
};

export { InlineToolbarButton };
