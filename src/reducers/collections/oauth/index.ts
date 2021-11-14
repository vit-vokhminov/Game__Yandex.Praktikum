import { FETCH_SERVICE_ID_FULFILLED, FETCH_SERVICE_ID_FAILED } from '../../../actions/oauth/service-id';

const initialServiceId = {
	data: null,
	error: null,
};

export const serviceId = ( store = initialServiceId, action ) => {
	switch (action.type) {
		case FETCH_SERVICE_ID_FULFILLED: {
			store.data = action.payload.service_id;

			return store;
		}

		case FETCH_SERVICE_ID_FAILED: {
			store.error = action.payload;

			return store;
		}

		default:
			return store;
	}
};
