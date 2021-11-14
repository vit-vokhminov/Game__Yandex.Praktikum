import { isServer } from '../../../src/utilities/isServer';
import axios from '../../utils/axios-instance';
import type {
    ProfileProps,
    AvatarProps,
    PasswordProps,
    ProfileResponse,
    AvatarResponse,
    PasswordResponse,
} from './types';

export const profile = (props: ProfileProps, config = {}): Promise<ProfileResponse> => axios.put<ProfileResponse>('/user/profile', props, config)
    .then((response) => {
        if(isServer) {
            return response;
        }

        return response.data;
    });

export const avatar = (props: AvatarProps, config = {}): Promise<AvatarResponse> => axios.put<AvatarResponse>('/user/profile/avatar', props, config)
    .then((response) => {
        if(isServer) {
            return response;
        }

        return response.data;
    });

export const password = (props: PasswordProps, config = {}): Promise<PasswordResponse> => axios.put<PasswordResponse>('/user/password', props, config)
    .then((response) => {
        if(isServer) {
            return response;
        }

        return response.data;
    });
