import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import 'babel-polyfill';
import { create } from '../src/store';
import App from '../src/App';

const initialState = (window as any).__INITIAL_STATE__ || {};

const { store, history } = create(initialState);

loadableReady(() => {
    ReactDOM.hydrate(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root'),
    );
});
