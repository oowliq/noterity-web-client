import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { History } from 'history';
import { defaultTheme } from 'theme';
import { ThemeProvider } from 'styled-components';
import { Root } from 'components';
import { Routes } from './Routes';

interface AppProps {
    history: History;
}

const App: FC<AppProps> = ({ history }) => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Root>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </Root>
        </ThemeProvider>
    );
};

export default App;
