import { instanceAPI } from './instances';

// Получить всех лидеров
export const getLeaders = async () => {
    return await instanceAPI.get(`/leaders`);
};

// добавить лидера
export const addLeader = async (user: any) => {
    return await instanceAPI.post(`/leader`, user);
};

// Изменить рекорд юзера
export const editRecordLeader = async (user: any) => {
    return await instanceAPI.put(`/leader`, user);
};
