import React, { FC } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }
    html {
        box-sizing: border-box;
        font-family: 'Ubuntu', sans-serif;
        background: ${(props) => props.theme.colors.background};
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
    body {

        &::-webkit-scrollbar-track
        {
            background-color: #252A41;
        }

        &::-webkit-scrollbar
        {
            width: 3px;
            background-color: #252A41;
        }

        &::-webkit-scrollbar-thumb
        {
            background-color: #894EC7;
        }
    }
`;

const Style: FC = () => (
    <>
        <Reset />
        <GlobalStyle />
    </>
);

export { Style as GlobalStyle };
