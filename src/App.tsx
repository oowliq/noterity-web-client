import React, { FC } from 'react';
import { GlobalStyle, darkTheme, lightTheme } from 'theme';
import { ThemeProvider } from 'styled-components';

import Dashboard from 'views/Dashboard';

const App: FC = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                <GlobalStyle />
                <Dashboard />
            </div>
        </ThemeProvider>
    );
};

export default App;
