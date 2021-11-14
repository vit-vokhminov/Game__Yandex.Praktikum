import type { ActionPayload, Action } from '../types';

export const GET_POST = 'forum/GET_POST';
export const GET_POSTS = 'forum/GET_POSTS';
export const FETCH_POSTS = 'forum/FETCH_POSTS';
export const ADD_POST = 'forum/ADD_POST';
export const GET_MESSAGES = 'forum/GET_MESSAGES';
export const FETCH_MESSAGES = 'forum/FETCH_MESSAGES';
export const ADD_MESSAGES = 'forum/ADD_MESSAGES';
export const ADD_MESSAGES_TO_MESSAGES = 'forum/ADD_MESSAGES_TO_MESSAGES';
export const GET_MESSAGES_TO_MESSAGES = 'forum/GET_MESSAGES_TO_MESSAGES';

export const getPosts = (response): ActionPayload<[]> => {
    return {
        type: GET_POSTS,
        payload: response,
    };
};
export const fetchPosts = (): Action => {
    return {
        type: FETCH_POSTS,
    };
};

export const getPost = (id: string): ActionPayload<string> => {
    return {
        type: GET_POST,
        payload: id,
    };
};

export const addPost = (values: string): ActionPayload<string> => {
    return {
        type: ADD_POST,
        payload: values,
    };
};

export const getMessages = (response): ActionPayload<[]> => {
    return {
        type: GET_MESSAGES,
        payload: response,
    };
};

export const fetchMessages = (id: string): ActionPayload<string> => {
    return {
        type: FETCH_MESSAGES,
        payload: id,
    };
};

export const addMessage = (id: string, value: string): ActionPayload<Record<string, string>> => {
    return {
        type: ADD_MESSAGES,
        payload: { id, value },
    };
};

export const getMessageToMessage = (
    postId: string,
    messageId: number,
): ActionPayload<Record<string, string | number>> => {
    return {
        type: ADD_MESSAGES_TO_MESSAGES,
        payload: { postId, messageId },
    };
};

export const addMessageToMessage = (
    id: string,
    value: string,
): ActionPayload<Record<string, string>> => {
    return {
        type: GET_MESSAGES_TO_MESSAGES,
        payload: { id, value },
    };
};
