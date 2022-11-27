import axios, { AxiosResponse } from 'axios';
import { TypeLogin, TypeRegistration, IAuthResponse } from 'types/ApiAuthTypes';

const instanceAPI = axios.create({
    baseURL: `${process.env.API_URL}/api/`,
    // что бы куки цеплялись автоматически
    withCredentials: true
});

// в каждый запрос устанавливается Authorization с токеном
instanceAPI.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

// в каждый ответ
instanceAPI.interceptors.response.use(
    // первый параметр это callback который выполняется в случае если запрос выполняется успешно
    (config) => {
        return config;
    },
    // если произошла ошибка
    async (error) => {
        const originalRequest = error.config;
        // смотрим статус код, если 401 то делаем запрос на refresh токена
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            // что избежать бесконечного цикла
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`/refresh`, {
                    withCredentials: true
                });
                localStorage.setItem('token', response.data.accessToken);
                // originalRequest хранит все данные для запроса
                return instanceAPI.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН');
            }
        }
        // если условие не отработало, прокидываем ошибку на верхний уровень
        throw error;
    }
);

export const API_AUTH = {
    // Авторизация
    async login(values: TypeLogin): Promise<AxiosResponse<IAuthResponse>> {
        return await instanceAPI.post<IAuthResponse>('/login', values);
    },

    // Регистрация
    async registration(values: TypeRegistration): Promise<AxiosResponse<IAuthResponse>> {
        return await instanceAPI.post<IAuthResponse>('/registration', values);
    },

    // Выйти из аккаунта
    async logout() {
        return await instanceAPI.post('/logout');
    },

    // проверка авторизации пользователя при загрузке сайта
    async checkAuth() {
        return await instanceAPI.get<IAuthResponse>('/refresh');
    },

    // изменить email или логин пользователя
    async editUser(value: any) {
        return await instanceAPI.put<any>('/edit-user', value);
    },

    // изменить пароль пользователя
    async editUserPassword(value: any) {
        return await instanceAPI.put<any>('/edit-password', value);
    }
};

export default instanceAPI;
