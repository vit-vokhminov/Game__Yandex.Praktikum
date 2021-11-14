import type { Store } from '../../../reducers/types';

export const getLeaderboard = (store: Store) => store.widgets.app.leaderboard;
export const getLoading = (store: Store): boolean => store.widgets.app.loading;
export const getAuthorized = (store: Store): boolean => store.widgets.app.authorized;
export const getUnauthorized = (store: Store): boolean => store.widgets.app.unauthorized;
export const getUnexpectedError = (store: Store): boolean => store.widgets.app.unexpectedError;
