export const FETCH_SERVICE_ID = 'serviceId/FETCH';
export const FETCH_SERVICE_ID_FULFILLED = 'serviceId/FETCH_FULFILLED';
export const FETCH_SERVICE_ID_FAILED = 'serviceId/FETCH_FAILED';
export const RESET_SERVICE_ID = 'serviceId/RESET';

export const fetchServiceId = (payload) => {
    return {
        type: FETCH_SERVICE_ID,
        payload,
    };
};

export const fetchServiceIdFulfilld = (response) => {
    return {
        type: FETCH_SERVICE_ID_FULFILLED,
        payload: response,
    };
};

export const fetchServiceIdFailed = (error) => {
    return {
        type: FETCH_SERVICE_ID_FAILED,
        payload: error,
    };
};

export const fetchServiceIdReset = () => {
    return {
        type: RESET_SERVICE_ID,
    };
};
