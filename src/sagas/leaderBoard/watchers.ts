import { takeLatest, ForkEffect } from 'redux-saga/effects';
import { SET_LEADERBOARD, GET_LEADERBOARD_LIST } from '../../actions/app';
import { workerAddUserLeaderBoard, workerGetAllLeaderBoard } from './workers';

export function* watchLeaderboard(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(SET_LEADERBOARD, workerAddUserLeaderBoard);
    yield takeLatest(GET_LEADERBOARD_LIST, workerGetAllLeaderBoard);
}
