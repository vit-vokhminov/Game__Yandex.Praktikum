import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { rootReducer } from '../reducers';
import rootSaga from '../sagas';
import { isServer } from '../utilities/isServer';
import type { AppStore } from './types';

function getComposeEnhancers() {
	if (process.env.NODE_ENV !== 'production' && !isServer) {
		return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	}

	return compose;
}

export const create = <T>(initialState: T, url = '/') => {
	const composeEnhancers = getComposeEnhancers();
	const sagaMiddleware = createSagaMiddleware();

	const history = isServer
		? createMemoryHistory({ initialEntries: [url] })
		: createBrowserHistory();

	const middlewares = [routerMiddleware(history), sagaMiddleware];

	const store: AppStore = createStore(
		rootReducer(history),
		initialState,
		composeEnhancers(applyMiddleware(...middlewares)),
	);

	store.runSaga = sagaMiddleware.run;
	store.close = () => store.dispatch(END);

	if (!isServer) {
		sagaMiddleware.run(rootSaga);
	}

	return { store, history };
};
