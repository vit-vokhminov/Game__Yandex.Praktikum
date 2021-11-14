import type { AppStore } from './types';
import type { ActionPayload } from '../../../actions/types';

import {
	SET_APP_LOADING,
	SET_APP_AUTHORIZED,
	SET_APP_UNAUTHORIZED,
	SET_APP_UNEXPECTED_ERROR,
	SET_GAME_START,
	LEADERBOARD_LIST,
} from '../../../actions/app';
import { FetchData } from '../../../../app/api/leaderBoard/types';

type LeaderboardArr = { data: FetchData }[];

const initialState = {
	loading: false,
	authorized: false,
	unauthorized: false,
	unexpectedError: false,
	gamaRunner: false,
	leaderboard: [],
};

export const app = (
	store: AppStore = initialState,
	action: ActionPayload<LeaderboardArr | boolean>,
): AppStore => {
	switch (action.type) {
		case LEADERBOARD_LIST: {
			store.leaderboard = (action as ActionPayload<LeaderboardArr>).payload;
			return store;
		}
		case SET_GAME_START: {
			store.gamaRunner = (action as ActionPayload<boolean>).payload;

			return store;
		}
		case SET_APP_LOADING: {
			store.loading = (action as ActionPayload<boolean>).payload;

			return store;
		}

		case SET_APP_AUTHORIZED: {
			store.authorized = (action as ActionPayload<boolean>).payload;

			return store;
		}

		case SET_APP_UNAUTHORIZED: {
			store.unauthorized = (action as ActionPayload<boolean>).payload;
			return store;
		}

		case SET_APP_UNEXPECTED_ERROR: {
			store.unexpectedError = (action as ActionPayload<boolean>).payload;

			return store;
		}

		default:
			return store;
	}
};
