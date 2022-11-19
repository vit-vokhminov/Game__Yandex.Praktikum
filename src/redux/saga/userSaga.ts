import { AxiosError } from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import {
    LOGIN,
    REGISTRATION,
    LOGOUT,
    setUser,
    setUserAuth,
    setLoading,
    setServerMessage,
    CHECK_AUTH,
} from '../store/userReducer';
import { API } from 'api';
import { API_AUTH } from 'api/auth';

import { ActionType, SignInPayloadType, SignUpPayloadType } from 'types/reduxUserReducerTypes';

function* sagaFetchLogin(props: ActionType<SignInPayloadType>) {
    const { values } = props.payload;

    yield put(setLoading(true));
    try {
        // TODO typescript
        const response = yield call(API_AUTH.login, values);
        if (response.status === 200) {
            yield localStorage.setItem('token', response.data.accessToken);
            yield put(setUser(response.data.user));
            yield put(setUserAuth(true));
            yield put(setLoading(false));
        }
    } catch (e: AxiosError<any | unknown>) {
        console.log('Error', e);
        yield put(setLoading(false));
        // TODO typescript e
        yield put(setServerMessage(e.response?.data?.message));
    }
}

function* sagaFetchRegistration(props: ActionType<SignUpPayloadType>) {
    const { values } = props.payload;

    yield put(setLoading(true));
    try {
        const response = yield call(API_AUTH.registration, values);
        if (response.status === 200) {
            yield localStorage.setItem('token', response.data.accessToken);
            yield put(setUser(response.data.user));
            yield put(setUserAuth(true));
            yield put(setLoading(false));
            yield put(setServerMessage('На ваш email отправлено письмо для подтверждения почты'));

            yield new Promise<void>((resolve) =>
                setTimeout(() => {
                    put(setServerMessage(''));
                    resolve();
                }, 3000)
            );
            //yield window.location.href === '/signup' && navigate('/');
        }
    } catch (e) {
        console.log('Error', e);
        yield put(setLoading(false));
        yield put(setServerMessage(e.response?.data?.message));
    }
}

function* sagaFetchLogout() {
    yield put(setLoading(true));
    try {
        const response = yield call(API_AUTH.logout);
        if (response.status === 200) {
            yield localStorage.removeItem('token');
            yield put(setUser(null));
            yield put(setUserAuth(false));
            yield put(setLoading(false));
        }
    } catch (e) {
        console.log('Error', e);
        yield put(setLoading(false));
        yield put(setServerMessage(e.response?.data?.message));
    } finally {
        yield put(setLoading(false));
    }
}

function* sagaFetchCheckAuth() {
    yield put(setLoading(true));
    try {
        const response = yield call(API_AUTH.checkAuth);
        if (response.status === 200) {
            yield localStorage.setItem('token', response.data.accessToken);
            yield put(setUser(response.data.user));
            yield put(setUserAuth(true));
            yield put(setLoading(false));
        }
    } catch (e) {
        console.log('Error', e);
        yield put(setServerMessage(e.response?.data?.message));
    } finally {
        yield put(setLoading(false));
    }
}

export function* userWatcher() {
    yield takeEvery(LOGIN, sagaFetchLogin);
    yield takeEvery(REGISTRATION, sagaFetchRegistration);
    yield takeEvery(LOGOUT, sagaFetchLogout);
    yield takeEvery(CHECK_AUTH, sagaFetchCheckAuth);
}
