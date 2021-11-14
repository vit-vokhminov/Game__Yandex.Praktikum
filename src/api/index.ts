import axios from 'axios';

const instanceAPI = axios.create({
    baseURL: `${process.env.APP_URL}/`,
    headers: {
        post: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        put: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    },
});

export const API = {
    // Получить все посты
    async getPosts() {
        return await instanceAPI.get('/api/posts');
    },

    // Получить пост по id
    async getPost(id: string) {
        return await instanceAPI.get(`/api/post/${id}`);
    },

    // Создать новый пост
    async addPost(values: string) {
        return await instanceAPI.post('/api/post/', values);
    },

    // Получить все комментарии поста
    async getMessages(id: string) {
        return await instanceAPI.get(`/api/messages/${id}`);
    },

    // Добавить комментарий
    async addMessage(id: string, value: string) {
        return await instanceAPI.post(`/api/message/${id}`, value);
    },

    // Получить все ответы на комментарий
    async getMessageToMessage(postId: string, messageId: number) {
        return await instanceAPI.get(`/api/answers/${postId}/${messageId}`);
    },

    // Добавить комментарий к комментарию
    async addMessageToMessage(id: string, value: string) {
        return await instanceAPI.post(`/api/answer/${id}`, value);
    },
};
