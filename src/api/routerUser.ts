import { instanceAPI } from './instances';
import { AxiosResponse } from 'axios';
import { TypeLogin, TypeRegistration, IAuthResponse } from 'types/ApiAuthTypes';

// Авторизация
export const login = async (values: TypeLogin): Promise<AxiosResponse<IAuthResponse>> => {
    return await instanceAPI.post<IAuthResponse>('/login', values);
};

// Регистрация
export const registration = async (values: TypeRegistration): Promise<AxiosResponse<IAuthResponse>> => {
    return await instanceAPI.post<IAuthResponse>('/registration', values);
};

// Выйти из аккаунта
export const logout = async () => {
    return await instanceAPI.post('/logout');
};

// проверка авторизации пользователя при загрузке сайта
export const checkAuth = async () => {
    return await instanceAPI.get<IAuthResponse>('/refresh');
};

// изменить email или логин пользователя
export const editUser = async (value: any) => {
    return await instanceAPI.put<any>('/edit-user', value);
};

// изменить пароль пользователя
export const editUserPassword = async (value: any) => {
    return await instanceAPI.put<any>('/edit-password', value);
};
