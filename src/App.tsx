import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Store } from 'redux';
import { History } from 'history';
import { GlobalStyle, darkTheme, lightTheme } from 'theme';
import { ThemeProvider } from 'styled-components';
import { ApplicationState } from './store';

import Dashboard from './layouts/Dashboard';

interface AppProps {
    store: Store<ApplicationState>;
    history: History;
}

const App: FC<AppProps> = ({ store, history }) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={darkTheme}>
                    <div>
                        <GlobalStyle />
                        <Dashboard />
                    </div>
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
