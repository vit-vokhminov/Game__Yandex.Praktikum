import { fork } from 'redux-saga/effects';
import { watchAuth } from './auth/watchers';
import { watchUsers } from './users/watchers';
import { watchOauth } from './oauth/watchers';
import { watchLeaderboard } from './leaderBoard/watchers';
import { watchForum } from './forum/watchers';

export default function* rootSaga() {
    yield fork(watchAuth);
    yield fork(watchUsers);
    yield fork(watchOauth);
    yield fork(watchLeaderboard);
    yield fork(watchForum);
}
