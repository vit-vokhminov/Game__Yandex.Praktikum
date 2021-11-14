import type { ActionPayload, Action } from '../types';
import { AllLeaderBoardResponse, FetchData } from '../../../app/api/leaderBoard/types';

export const SET_APP_LOADING = 'app/LOADING';
export const SET_APP_AUTHORIZED = 'app/AUTHORIZED';
export const SET_APP_UNAUTHORIZED = 'app/UNAUTHORIZED';
export const SET_APP_UNEXPECTED_ERROR = 'app/UNAUTHORIZED';
export const SET_GAME_START = 'app/GAMESTART';

export const SET_LEADERBOARD = 'app/LEADERBOARD';
export const GET_LEADERBOARD_LIST = 'app/GET_LEADERBOARD_LIST';
export const LEADERBOARD_LIST = 'app/LEADERBOARD_LIST';

export const setLeaderboard = (
	payload: FetchData,
): ActionPayload<FetchData> => {
	return {
		type: SET_LEADERBOARD,
		payload,
	};
};
export const leaderboardList = (
	response: AllLeaderBoardResponse,
): ActionPayload<AllLeaderBoardResponse> => {
	return {
		type: LEADERBOARD_LIST,
		payload: response,
	};
};
export const getLeaderboardList = (): Action => {
	return {
		type: GET_LEADERBOARD_LIST,
	};
};

export const setGameStart = (payload: boolean): ActionPayload<boolean> => {
	return {
		type: SET_GAME_START,
		payload,
	};
};

export const setLoading = (payload: boolean): ActionPayload<boolean> => {
	return {
		type: SET_APP_LOADING,
		payload,
	};
};

export const setAuthorized = (payload: boolean): ActionPayload<boolean> => {
	return {
		type: SET_APP_AUTHORIZED,
		payload,
	};
};

export const setUnauthorized = (payload: boolean): ActionPayload<boolean> => {
	return {
		type: SET_APP_UNAUTHORIZED,
		payload,
	};
};

export const setUnexpectedError = (payload: boolean): ActionPayload<boolean> => {
	return {
		type: SET_APP_UNEXPECTED_ERROR,
		payload,
	};
};
