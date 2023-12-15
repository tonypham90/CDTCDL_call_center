
import axios from 'axiosConfig';
import { IUser } from 'models';
import Cookies from 'js-cookie';
import { boolean } from 'yup';
import Link from 'next/link';
import toast from 'react-hot-toast';
import * as process from "process";

interface ILoginResponse {
    sessionToken: string;
    isAdmin: boolean;
    id: string;
    isAuthenticated: boolean;
}

export class AuthService {

    _Authentication: ILoginResponse
    private static instance: AuthService;
    private constructor() {
        this._Authentication = { sessionToken: "", isAdmin: false, id: "", isAuthenticated: false };
    }
    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async isLoggedIn() {
        // Check if the sessionToken exists in the cookie
        try {

            const response = await axios.get(`/auth/isLoggedIn`);
            if (response.status !== 200) {
                return false;
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async login(phone: string, password: string) {
        try {
            const response = await axios.post(`/auth/login`, { phone, password });
            if (response.status !== 200) {
                toast.error("Số điện thoại hoặc mật khẩu không đúng");
                return false;
            }
            const { sessionToken, isAdmin, id, isAuthenticated } = response.data;
            this._Authentication = { sessionToken, isAdmin, id, isAuthenticated };
            Cookies.set('sessionToken', sessionToken);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async logout() {
        try {
            const response = await axios.post(`/auth/logout`);
            if (response.status !== 200) {
                return false;
            }
            Cookies.remove('sessionToken');
            return true;
        }
        catch (error) {
            return false;
        }
    }

}