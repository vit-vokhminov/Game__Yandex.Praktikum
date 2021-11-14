import { takeLatest, ForkEffect } from 'redux-saga/effects';
import { SET_PROFILE } from '../../actions/users/profile';
import { SET_AVATAR } from '../../actions/users/avatar';
import { SET_PASWORD } from '../../actions/users/password';
import { workerProfile, workerAvatar, workerPassword } from './workers';

export function* watchUsers(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(SET_PROFILE, workerProfile);
    yield takeLatest(SET_AVATAR, workerAvatar);
    yield takeLatest(SET_PASWORD, workerPassword);
}
