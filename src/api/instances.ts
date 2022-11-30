import axios from 'axios';

export const instanceAPI = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    baseURL: `${process.env.API_URL}/api/`,
    withCredentials: true
});
