import { isServer } from '../../../src/utilities/isServer';
import axios from '../../utils/axios-instance';
import type {
    OauthYandexProps,
    OauthYandexResponse,
    ServiceIdProps,
    ServiceIdResponse,
} from './types';

export const oauthYandex = (props: OauthYandexProps): Promise<OauthYandexResponse> => axios.post<OauthYandexResponse>('/oauth/yandex', props)
    .then((response) => response);

export const serviceId = (config): Promise<ServiceIdResponse> => axios.get<ServiceIdResponse>('/oauth/yandex/service-id', config)
    .then((response) => {
        if(isServer) {
            return response;
        }

        return response.data;
    });
