import axios from '../../utils/axios-instance';
import { isServer } from '../../../src/utilities/isServer';

// Получить все посты
export const getPosts = () => axios.get('/posts')
    .then((response) => {
        return response.data;
    });

// Получить пост по id
export const getPost = (id: string) => axios.get(`/post/${id}`)
    .then((response) => {
        if (isServer) {
            return response;
        }
        return response.data;
    });

// Создать новый пост
export const addPost = (values: string) => axios.post('/post/', values)
    .then((response) => {
        if (isServer) {
            return response;
        }
        return response.data;
    });

// Получить все комментарии поста
export const getMessages = (id: string) => axios.get(`/messages/${id}`)
    .then((response) => {
        if (isServer) {
            return response;
        }
        return response.data;
    });

// Добавить комментарий
export const addMessage = ({ id, value }) => axios.post(`/message/${id}`, value)
    .then((response) => {
        if (isServer) {
            return response;
        }
        return response.data;
    });

// Получить все ответы на комментарий
export const getMessageToMessage = (postId: string, messageId: number) => axios.get(`/answers/${postId}/${messageId}`)
    .then((response) => {
        if (isServer) {
            return response;
        }
        return response.data;
    });

// Добавить комментарий к комментарию
export const addMessageToMessage = (id: string, value: string) => axios.post(`/answer/${id}`, value)
    .then((response) => {
        if (isServer) {
            return response;
        }
        return response.data;
    });
