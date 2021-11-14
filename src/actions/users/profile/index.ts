import type { ProfileProps, ProfileResponse } from '../../../../app/api/users/types';
import type { ActionPayload } from '../../types';

export const SET_PROFILE = 'profile/SET';
export const SET_PROFILE_FULFILLED = 'profile/SET_FULFILLED';
export const SET_PROFILE_FAILED = 'profile/SET_FAILED';

export const profileAction = (props: ProfileProps): ActionPayload<ProfileProps> => {
    return {
        type: SET_PROFILE,
        payload: props,
    };
};

export const profileFilfilldAction = (
    response: ProfileResponse,
): ActionPayload<ProfileResponse> => {
    return {
        type: SET_PROFILE_FULFILLED,
        payload: response,
    };
};

export const profileFailedAction = (error: string): ActionPayload<string> => {
    return {
        type: SET_PROFILE_FAILED,
        payload: error,
    };
};
