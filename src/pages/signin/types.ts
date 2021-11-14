import { signinAction } from '../../actions/auth/signin';
import type { SigninStore } from '../../reducers/collections/auth/types';
import { fetchUser } from '../../actions/auth/user';

export type Props = {
    signin: typeof signinAction;
    user: typeof fetchUser;
    signinStore: SigninStore;
};
