import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Store } from 'redux';
import { History } from 'history';
import { defaultTheme } from 'theme';
import { ThemeProvider } from 'styled-components';
import { Root } from 'components';
import { Routes } from './Routes';
import { ApplicationState } from './store';

interface AppProps {
    store: Store<ApplicationState>;
    history: History;
}

const App: FC<AppProps> = ({ store, history }) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={defaultTheme}>
                    <Root>
                        <Routes />
                    </Root>
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
