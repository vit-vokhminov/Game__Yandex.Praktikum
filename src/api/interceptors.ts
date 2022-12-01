import axios from 'axios';
import { instanceAPI } from './instances';

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
                console.error('НЕ АВТОРИЗОВАН');
            }
        }
        // если условие не отработало, прокидываем ошибку на верхний уровень
        throw error;
    }
);
