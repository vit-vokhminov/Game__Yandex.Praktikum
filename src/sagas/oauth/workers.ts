import setCookie from 'set-cookie-parser';
import { put, call } from 'redux-saga/effects';
import { oauthYandex, serviceId } from '../../../app/api/oauth';
import { fetchServiceIdFulfilld } from '../../actions/oauth/service-id';
import { user } from '../../../app/api/auth';
import { fetchUserFulfilled } from '../../actions/auth/user';
import { setAuthorized, setUnauthorized, setUnexpectedError } from '../../actions/app';


export function* workerOauthYandex( action ) {
    try {
        const responseOauth = yield call(oauthYandex, action.payload);

        const cookies = setCookie.parse(responseOauth.headers['set-cookie'], {
            decodeValues: true,
            map: true,
        });

        const responseUser = yield call(user, {
            headers: {
                cookie: `uuid=${cookies.uuid.value}; authCookie=${cookies.authCookie.value}`,
            },
        });

        yield put(fetchUserFulfilled(responseUser));

        yield put(setAuthorized(true));
        yield put(setUnauthorized(false));

    } catch (error) {
        const { response } = error;

        switch (response?.status) {
            case 401:
                yield put(setUnauthorized(true));
                break;

            default:
                yield put(setUnexpectedError(true));
                break;
        }
    }
}

export function* workerServiceId(action) {  
    try {
        const response = yield call(serviceId, { params: { redirect_uri: action.payload }});

        yield put(fetchServiceIdFulfilld(response));
        
    } catch (error) {
        const { response } = error;

        yield put(setUnexpectedError(true));
    }
}
