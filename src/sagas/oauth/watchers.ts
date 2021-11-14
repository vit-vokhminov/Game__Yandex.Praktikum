import { takeLatest } from 'redux-saga/effects';
import { FETCH_OAUTH_YANDEX } from '../../actions/oauth/oauth-yandex';
import { FETCH_SERVICE_ID } from '../../actions/oauth/service-id';
import { workerOauthYandex, workerServiceId } from './workers';

export function* watchOauth() {
    yield takeLatest(FETCH_OAUTH_YANDEX, workerOauthYandex);
    yield takeLatest(FETCH_SERVICE_ID, workerServiceId);
}
