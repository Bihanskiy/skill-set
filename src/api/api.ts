import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import LocalStorageService from '../services/local-storage.service';
import AppConfig from './config';

export const publicAPI: AxiosInstance = axios.create({
    baseURL: AppConfig.baseURL,
});

export const privateAPI: AxiosInstance = axios.create({
    baseURL: AppConfig.baseURL,
});

const checkTokenInterceptor = (config: any) => {
    const token = LocalStorageService.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};

const responseSuccessInterceptor = (response: AxiosResponse) => {
    const data = response.data;

    return { data, } as AxiosResponse;
};

const errorInterceptor = (error: AxiosError) => {
    const responseError = error?.response?.data;

    return { error: responseError || error };
};

publicAPI.interceptors.response.use(responseSuccessInterceptor, errorInterceptor);

privateAPI.interceptors.request.use(checkTokenInterceptor);
privateAPI.interceptors.response.use(responseSuccessInterceptor, errorInterceptor);

