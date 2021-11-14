import { combineReducers } from 'redux-immer';
import produce from 'immer';
import {
    signup,
    signin,
    user,
    logout,
} from './auth';
import { serviceId } from './oauth'

export const collections = combineReducers(produce, {
    signup,
    signin,
    user,
    logout,
    serviceId,
});
