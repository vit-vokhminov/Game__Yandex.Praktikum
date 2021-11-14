import type { Store } from '../../../reducers/types';

export const getServiceId = (store: Store) => store.collections.serviceId.data;
