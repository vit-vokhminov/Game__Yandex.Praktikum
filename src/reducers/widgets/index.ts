import { combineReducers } from 'redux-immer';
import produce from 'immer';
import { app } from './app';
import { forum } from './forum';

export const widgets = combineReducers(produce, {
	app,
	forum
});
