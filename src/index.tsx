import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import configureStore from './store/configure';
import App from './App';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'));

serviceWorker.unregister();
