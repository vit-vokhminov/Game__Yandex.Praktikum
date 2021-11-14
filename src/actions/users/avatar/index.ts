import type { AvatarProps, AvatarResponse } from '../../../../app/api/users/types';
import type { ActionPayload } from '../../types';

export const SET_AVATAR = 'avatar/SET';
export const SET_AVATAR_FULFILLED = 'avatar/SET_FULFILLED';
export const SET_AVATAR_FAILED = 'avatar/SET_FAILED';

export const avatarAction = (payload: AvatarProps): ActionPayload<AvatarProps> => {
    return {
        type: SET_AVATAR,
        payload,
    };
};

export const avatarFilfilldAction = (response: AvatarResponse): ActionPayload<AvatarResponse> => {
    return {
        type: SET_AVATAR_FULFILLED,
        payload: response,
    };
};

export const avatarFailedAction = (error: string): ActionPayload<string> => {
    return {
        type: SET_AVATAR_FAILED,
        payload: error,
    };
};
