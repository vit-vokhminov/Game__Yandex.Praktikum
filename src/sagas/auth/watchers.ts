import { takeLatest, ForkEffect } from 'redux-saga/effects';
import { FETCH_SIGNUP } from '../../actions/auth/signup';
import { FETCH_SIGNIN } from '../../actions/auth/signin';
import { FETCH_USER } from '../../actions/auth/user';
import { FETCH_LOGOUT } from '../../actions/auth/logout';
import {
    workerSignup,
    workerSignin,
    workerUser,
    workerLogout,
} from './workers';

export function* watchAuth(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(FETCH_SIGNUP, workerSignup);
    yield takeLatest(FETCH_SIGNIN, workerSignin);
    yield takeLatest(FETCH_USER, workerUser);
    yield takeLatest(FETCH_LOGOUT, workerLogout);
}
