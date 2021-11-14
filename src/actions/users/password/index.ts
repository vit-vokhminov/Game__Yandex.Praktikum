import type { PasswordProps, PasswordResponse } from '../../../../app/api/users/types';
import type { ActionPayload } from '../../types';
import type { ErrorType } from '../../../../app/utils/axios-instance/types';

export const SET_PASWORD = 'password/SET';
export const SET_PASWORD_FULFILLED = 'password/SET_FULFILLED';
export const SET_PASWORD_FAILED = 'password/SET_FAILED';

export const passwordAction = (payload: PasswordProps): ActionPayload<PasswordProps> => {
    return {
        type: SET_PASWORD,
        payload,
    };
};

export const passwordFilfilldAction = (
    response: PasswordResponse,
): ActionPayload<PasswordResponse> => {
    return {
        type: SET_PASWORD_FULFILLED,
        payload: response,
    };
};

export const passwordFailedAction = (error: string): ActionPayload<string> => {
    return {
        type: SET_PASWORD_FAILED,
        payload: error,
    };
};
