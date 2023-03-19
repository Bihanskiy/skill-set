import { publicAPI } from "../api/api";
import { TResponse } from '../types/request.types';

interface IAuth {
    token: string;
}

export default class AuthService {
    static async GetToken(): Promise<TResponse<IAuth>> {
        return publicAPI.get<IAuth>(`auth/anonymous?platform=subscriptions`)
    }
}