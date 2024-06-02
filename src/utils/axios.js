import axios from 'axios';
import { getCookie } from 'cookies-next';
import getConfig from 'next/config';

const { 
	publicRuntimeConfig: { apiRoot } 
} = getConfig();

axios.defaults.baseURL = apiRoot;

const instance = axios.create();

// 前攔截器
instance.interceptors.request.use(
    (config) => {
        const accessToken = getCookie('access-token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 後攔截器
instance.interceptors.response.use(
    ({ data }) => ({ status: 200, data }), 
    ({
        response: {
            status,
            statusText,
            data: {
                detail
            } = {},
        } = {},
    } = {}) => ({ status, statusText, detail })
);

export default instance;
