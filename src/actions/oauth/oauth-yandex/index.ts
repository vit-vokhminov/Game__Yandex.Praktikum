export const FETCH_OAUTH_YANDEX = 'oauthYandex/FETCH';
export const FETCH_OAUTH_YANDEX_FULFILLED = 'oauthYandex/FETCH_FULFILLED';
export const FETCH_OAUTH_YANDEX_FAILED = 'oauthYandex/FETCH_FAILED';
export const RESET_OAUTH_YANDEX = 'oauthYandex/RESET';

export const fetchOauthYandex = (payload) => {
    return {
        type: FETCH_OAUTH_YANDEX,
        payload,
    };
};

export const fetchOauthYandexFilfilld = (response) => {
    return {
        type: FETCH_OAUTH_YANDEX_FULFILLED,
        payload: response,
    };
};

export const fetchOauthYandexFailed = (error) => {
    return {
        type: FETCH_OAUTH_YANDEX_FAILED,
        payload: error,
    };
};

export const fetchOauthYandexReset = () => {
    return {
        type: RESET_OAUTH_YANDEX,
    };
};
