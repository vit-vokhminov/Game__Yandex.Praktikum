import { instanceAPI } from './instances';
import { addPostResponseType, EditPostType, AddMessageValueType } from 'types/ApiForumTypes';
import { valueAddPostType, postType } from 'pages/Forum/types';

// Получить все посты
export const getPosts = async (): Promise<Array<postType>> => {
    return await instanceAPI.get('/posts');
};

// Получить пост по id
export const getPost = async (id: string): Promise<postType> => {
    return await instanceAPI.get(`/post/${id}`);
};

// Создать новый пост
export const addPost = async (values: valueAddPostType) => {
    return await instanceAPI.post<addPostResponseType>('/post/', values);
};

// Изменить пост по id
export const editPost = async (id: string, values: EditPostType) => {
    return await instanceAPI.put(`/post/${id}`, values);
};

// Удалить пост по id
export const deletePost = async (id: string) => {
    return await instanceAPI.delete(`/post/${id}`);
};

// Получить все комментарии поста
export const getMessages = async (id: string) => {
    return await instanceAPI.get(`/messages/${id}`);
};

// Добавить комментарий
export const addMessage = async (id: string, value: AddMessageValueType) => {
    return await instanceAPI.post(`/message/${id}`, value);
};

// Получить все ответы на комментарий
export const getMessageToMessage = async (postId: string, messageId: string) => {
    return await instanceAPI.get(`/answers/${postId}/${messageId}`);
};

// Добавить комментарий к комментарию
export const addMessageToMessage = async (id: string, value: AddMessageValueType) => {
    return await instanceAPI.post(`/answer/${id}`, value);
};
