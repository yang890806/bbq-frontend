import axios from 'axios';
import getConfig from 'next/config';

const { 
	publicRuntimeConfig: { apiRoot } 
} = getConfig();

axios.defaults.baseURL = apiRoot;

const instance = axios.create();

// 前攔截器
instance.interceptors.request.use(
    (config) => {
        // const accessToken = getAccessToken();
        // if (accessToken) {
        //     config.headers.Authorization = `Bearer ${accessToken}`;
        // }
        // else {
        //     console.log("No access token found.");
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

// 後攔截器
instance.interceptors.response.use(
    ({ data }) => data,
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
