import type { AppStore } from './types';
import type { ActionPayload } from '../../../actions/types';

import {
    GET_POST,
    GET_POSTS,
    ADD_POST,
    GET_MESSAGES,
    ADD_MESSAGES,
    ADD_MESSAGES_TO_MESSAGES,
    GET_MESSAGES_TO_MESSAGES,
} from '../../../actions/forum';
import { FetchData } from '../../../../app/api/leaderBoard/types';

const initialState = {
    posts: [],
    messages: [],
};

export const forum = (
    store: AppStore = initialState,
    action: ActionPayload<LeaderboardArr | boolean>,
): AppStore => {
    switch (action.type) {
        case GET_POSTS: {
            store.posts = action.payload;
            return store;
        }
        case GET_MESSAGES: {
            store.messages = action.payload;
            return store;
        }
        default:
            return store;
    }
};
