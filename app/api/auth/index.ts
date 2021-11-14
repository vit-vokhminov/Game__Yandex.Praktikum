import { isServer } from '../../../src/utilities/isServer';
import axios from '../../utils/axios-instance';
import type {
    SignupProps,
    SigninProps,
    SignupResponse,
    SigninResponse,
    UserResponse,
    LogoutResponse,
} from './types';

export const signup = (props: SignupProps): Promise<SignupResponse> => axios.post<SignupResponse>('/auth/signup', props)
    .then((response) => {
        if (isServer) {
            return response;
        }

        return response.data;
    });

export const signin = (props: SigninProps): Promise<SigninResponse> => axios.post<SigninResponse>('/auth/signin', props)
    .then((response) => {
        if (isServer) {
            return response;
        }
        return response.data;
    });

export const user = (config): Promise<UserResponse> => axios.get<UserResponse>('/auth/user', config)
    .then((response) => {
        if (isServer) {
            return response;
        }

        return response.data;
    });

export const logout = (): Promise<LogoutResponse> => axios.post<LogoutResponse>('/auth/logout')
    .then((response) => {
        if (isServer) {
            return response;
        }

        return response.data;
    });
