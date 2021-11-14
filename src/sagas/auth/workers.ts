import {
    put,
    call,
    CallEffect,
    PutEffect,
} from 'redux-saga/effects';
import {
    signup,
    signin,
    user,
    logout,
} from '../../../app/api/auth';
import { signupFilfilldAction, signupFailedAction, signupResetAction } from '../../actions/auth/signup';
import { signinFilfilldAction, signinFailedAction, signinResetAction } from '../../actions/auth/signin';
import { logoutFilfilldAction, logoutResetAction } from '../../actions/auth/logout';
import { fetchUserFulfilled } from '../../actions/auth/user';
import {
    setLoading,
    setAuthorized,
    setUnauthorized,
    setUnexpectedError,
} from '../../actions/app';
import type { Action, ActionPayload } from '../../actions/types';
import type {
    LogoutResponse,
    SigninProps,
    SigninResponse,
    SignupProps,
    SignupResponse,
    UserResponse,
} from '../../../app/api/auth/types';
import type { ErrorType } from '../../../app/utils/axios-instance/types';
import { isServer } from '../../utilities/isServer';

export function* workerSignup(
    action: ActionPayload<SignupProps>,
): Generator<CallEffect<SignupResponse> | PutEffect<Action>, void, SignupResponse> {
    try {
        const response: SignupResponse = yield call(signup, action.payload);

        yield put(signupFilfilldAction(response));
        yield put(setAuthorized(true));
        yield put(signupResetAction());
    } catch (error) {
        const { response } = error as ErrorType;

        switch (response?.status) {
            case 400:
                yield put(signupFailedAction(response.data.reason));
                break;

            case 401:
                yield put(signupFailedAction(response.data.reason));
                break;

            default:
                yield put(setUnexpectedError(true));
                break;
        }
    }
}

export function* workerSignin(action: ActionPayload<SigninProps>) {
    try {
        const response: SigninResponse = yield call(signin, action.payload);

        yield put(setUnauthorized(false));

        yield put(signinFilfilldAction(response));
        yield put(setAuthorized(true));

        yield put(signinResetAction());
    } catch (error) {
        const { response } = error as ErrorType;

        switch (response?.status) {
            case 400:
                yield put(signinFailedAction(response.data.reason));
                break;

            case 401:
                yield put(signinFailedAction(response.data.reason));
                break;

            default:
                yield put(setUnexpectedError(true));
                break;
        }
    }
}

export function* workerUser({ config }) {
    yield put(setLoading(true));

    try {
        const response: UserResponse = yield call(user, config);

        if (isServer) {
            yield put(fetchUserFulfilled(response.data));
        } else {
            yield put(fetchUserFulfilled(response));
        }
        yield put(setAuthorized(true));
        yield put(setUnauthorized(false));
    } catch (error) {
        const { response } = error as ErrorType;

        switch (response?.status) {
            case 401:
                yield put(setUnauthorized(true));
                break;

            default:
                yield put(setUnexpectedError(true));
                break;
        }
    }

    yield put(setLoading(false));
}

export function* workerLogout() {
    try {
        const response: LogoutResponse = yield call(logout);

        yield put(logoutFilfilldAction(response));

        yield put(setAuthorized(false));

        yield put(logoutResetAction());
    } catch (error) {
        const { response } = error as ErrorType;

        switch (response?.status) {
            case 401:
                yield put(setAuthorized(false));
                yield put(setUnauthorized(true));
                break;

            default:
                yield put(setUnexpectedError(true));
                break;
        }

        yield put(setUnexpectedError(true));
    }
}
