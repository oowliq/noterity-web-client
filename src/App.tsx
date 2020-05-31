import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Store } from 'redux';
import { History } from 'history';
import { darkTheme, lightTheme } from 'theme';
import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { ApplicationState } from './store';
import Dashboard from './layouts/Dashboard';
import Root from './components/Root';

interface AppProps {
    store: Store<ApplicationState>;
    history: History;
}

const App: FC<AppProps> = ({ store, history }) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={lightTheme}>
                    <Root>
                        <Switch>
                            <Route path="/">
                                <Dashboard />
                            </Route>
                        </Switch>
                    </Root>
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
