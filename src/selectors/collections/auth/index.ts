import type { Store } from '../../../reducers/types';
import type {
    SignupStore,
    SigninStore,
    UserStore,
    LogoutStore,
} from '../../../reducers/collections/auth/types';

export const getSignup = (store: Store): SignupStore => store.collections.signup;
export const getSignin = (store: Store): SigninStore => store.collections.signin;
export const getUser = (store: Store): UserStore => store.collections.user;
export const getUserAvatar = (store: Store): string | null => {
    const avatarPath = store.collections.user.avatar;

    if (avatarPath) {
        return `https://ya-praktikum.tech/api/v2/resources${avatarPath}`;
    }

    return null;
};
export const getLogout = (store: Store): LogoutStore => store.collections.logout;
