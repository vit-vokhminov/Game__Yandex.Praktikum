import { SignupProps, SignupResponse } from '../../../../app/api/auth/types';
import type { Action, ActionPayload } from '../../types';

export const FETCH_SIGNUP = 'signup/FETCH';
export const FETCH_SIGNUP_FULFILLED = 'signup/FETCH_FULFILLED';
export const FETCH_SIGNUP_FAILED = 'signup/FETCH_FAILED';
export const RESET_SIGNUP = 'signup/RESET';

export const signupAction = (props: SignupProps): ActionPayload<SignupProps> => {
    return {
        type: FETCH_SIGNUP,
        payload: props,
    };
};

export const signupFilfilldAction = (response: SignupResponse): ActionPayload<SignupResponse> => {
    return {
        type: FETCH_SIGNUP_FULFILLED,
        payload: response,
    };
};

export const signupFailedAction = (error: string): ActionPayload<string> => {
    return {
        type: FETCH_SIGNUP_FAILED,
        payload: error,
    };
};

export const signupResetAction = (): Action => {
    return {
        type: RESET_SIGNUP,
    };
};
