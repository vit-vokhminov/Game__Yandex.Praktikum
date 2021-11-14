import axios from 'axios';
import { isServer } from '../../../src/utilities/isServer';

const baseURL = isServer
    ? 'https://ya-praktikum.tech/api/v2'
    : `${process.env.APP_URL}/api`;

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});

export default axiosInstance;
