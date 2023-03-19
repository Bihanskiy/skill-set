import { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';

export type IError = AxiosError;

export interface TResponse<T> extends AxiosResponse<T> {
    error?: IError;
}