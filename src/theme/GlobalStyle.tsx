import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-family: 'Hammersmith One', sans-serif;
        background: ${(props) => props.theme.colors.primary};
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

`;

const Style: FC = () => (
    <>
        <Reset />
        <GlobalStyle />
    </>
);

export { Style as GlobalStyle };
