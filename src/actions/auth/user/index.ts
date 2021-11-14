import { UserResponse } from '../../../../app/api/auth/types';
import type { Action, ActionPayload } from '../../types';

export const FETCH_USER = 'user/FETCH';
export const FETCH_USER_FULFULLED = 'user/FETCH_FULFULLED';
export const FETCH_USER_FAILED = 'user/FETCH_FAILED';

export const fetchUser = (config): Action => {
	return {
		type: FETCH_USER,
		config,
	};
};

export const fetchUserFulfilled = (response: UserResponse): ActionPayload<UserResponse> => {
	return {
		type: FETCH_USER_FULFULLED,
		payload: response,
	};
};

export const fetchUserFailed = (error: string): ActionPayload<string> => {
	return {
		type: FETCH_USER_FAILED,
		payload: error,
	};
};
