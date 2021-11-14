import type {
    SignupResponse,
    SigninResponse,
    UserResponse,
    LogoutResponse,
} from '../../../../app/api/auth/types';

import type { StoreItem } from '../../types';

export type SignupStore = StoreItem<SignupResponse>;

export type SigninStore = StoreItem<SigninResponse>;

export type UserStore = UserResponse;

export type LogoutStore = StoreItem<LogoutResponse>;
