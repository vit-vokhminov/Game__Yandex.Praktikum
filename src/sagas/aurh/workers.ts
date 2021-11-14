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
import type {
	LogoutResponse,
	SigninProps,
	SigninResponse,
	SignupProps,
	SignupResponse,
	UserResponse,
} from '../../../app/api/auth/types';
import type { Action, ActionPayload } from '../../actions/types';
import type { ErrorType } from '../../../app/utils/axios-instance/types';

export function* workerSignup(
	action: ActionPayload<SignupProps>,
): Generator<CallEffect<SignupResponse> | PutEffect<Action>, void, unknown> {
	try {
		const response = yield call(signup, action.payload);

		yield put(signupFilfilldAction(response as SignupResponse));

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

			case 500:
				yield put(setUnexpectedError(true));
				break;

			default:
				break;
		}
	}
}

export function* workerSignin(
	action: ActionPayload<SigninProps>,
): Generator<PutEffect<Action> | CallEffect<string>, void, unknown> {
	try {
		const response = yield call(signin, action.payload);
		yield put(signinFilfilldAction(response as SigninResponse));

		// yield put(signinResetAction());
	} catch (error) {
		const { response } = error as ErrorType;

		switch (response?.status) {
			case 400:
				yield put(signinFailedAction(response.data.reason));
				break;

			case 401:
				yield put(signinFailedAction(response.data.reason));
				break;

			case 500:
				yield put(setUnexpectedError(true));
				break;

			default:
				break;
		}
	}
}

export function* workerUser(): Generator<CallEffect<UserResponse>
	| PutEffect<ActionPayload<boolean>>
	| PutEffect<ActionPayload<UserResponse>>, void, unknown> {
	yield put(setLoading(true));

	try {
		const response = yield call(user);
		yield put(fetchUserFulfilled(response as UserResponse));
		yield put(setAuthorized(true));
	} catch (error) {
		const { response } = error as ErrorType;

		switch (response?.status) {
			case 401:
				yield put(setUnauthorized(true));
				break;

			case 500:
				yield put(setUnexpectedError(true));
				break;

			default:
				break;
		}
	}

	yield put(setLoading(false));
}

export function* workerLogout(): Generator<PutEffect<Action>
	| CallEffect<string>, void, unknown> {
	try {
		const response = yield call(logout);
		yield put(logoutFilfilldAction(response as LogoutResponse));

		yield put(logoutResetAction());
	} catch (error) {
		const { response } = error as ErrorType;

		switch (response?.status) {
			case 500:
				yield put(setUnexpectedError(true));
				break;

			default:
				break;
		}
	}
}
