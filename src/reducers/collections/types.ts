import type {
    SignupStore,
    SigninStore,
    UserStore,
    LogoutStore,
} from './auth/types';

import { ServiceIdStore } from './oauth/types';

export type Collections = {
    signup: SignupStore,
    signin: SigninStore,
    user: UserStore,
    logout: LogoutStore,
    serviceId: ServiceIdStore,
};
