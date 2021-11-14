import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { collections } from './collections';
import { widgets } from './widgets';

export const rootReducer = (history: History) => combineReducers({
	collections,
	widgets,
	router: connectRouter(history),
});
