import { takeLatest, ForkEffect } from 'redux-saga/effects';
import {
    GET_POST,
    GET_POSTS,
    FETCH_POSTS,
    ADD_POST,
    GET_MESSAGES,
    FETCH_MESSAGES,
    ADD_MESSAGES,
    ADD_MESSAGES_TO_MESSAGES,
    GET_MESSAGES_TO_MESSAGES,
} from '../../actions/forum';
import {
    workerGetPosts,
    workerGetPost,
    workerAddPost,
    workerGetMessages,
    workerAddMessage,
    workerAddMessageToMessage,
    workerGetMessageToMessage,
} from './workers';

export function* watchForum(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(GET_POST, workerGetPost);
    yield takeLatest(FETCH_POSTS, workerGetPosts);
    yield takeLatest(ADD_POST, workerAddPost);
    yield takeLatest(FETCH_MESSAGES, workerGetMessages);
    yield takeLatest(ADD_MESSAGES, workerAddMessage);
    yield takeLatest(ADD_MESSAGES_TO_MESSAGES, workerAddMessageToMessage);
    yield takeLatest(GET_MESSAGES_TO_MESSAGES, workerGetMessageToMessage);
}
