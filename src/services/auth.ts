import axios from 'axiosConfig';
import { IUser } from 'models';
import Cookies from 'js-cookie';
import { boolean } from 'yup';
import Link from 'next/link';

interface ILoginResponse {
    sessionToken: string;
    isAdmin: boolean;
    id: string;
    isAuthenticated: boolean;
}

export class AuthService {

    _Authentication: ILoginResponse
    constructor() {
        this._Authentication = { sessionToken: "", isAdmin: false, id: "", isAuthenticated: false };
        this.getAuthentication();
    }
    static init() {
        return new AuthService();
    }

    async Register(data: IUser) {
        const response = await axios.post(`/auth/register`, data, {
        });

        if (response.status !== 200) {
            throw new Error('Registration failed');
        }
    }

    async login(phone: string, password: string): Promise<void> {

        const response = await axios.post(`/auth/login`, {
            phone,
            password,
        });

        if (response.status !== 200) {
            throw new Error('Login failed');
        }

        const data = response.data;
        if (data.isAdmin === false) {
            throw new Error('You are not admin');
        }
        this._Authentication.sessionToken = data.authentication.sessionToken || "";
        this._Authentication.isAdmin = data.isAdmin;
        this._Authentication.id = data._id || "";
        this._Authentication.isAuthenticated = true;
        this.setAuthentication();

    }
    private setAuthentication() {
        Cookies.set('token', JSON.stringify(this._Authentication));
    }
    private getAuthentication() {
        const data = Cookies.get('token');
        if (data) {
            this._Authentication = JSON.parse(data);
        }
    }

    isLoggedIn() {
        // Check if the sessionToken exists in localStorage
        this.getAuthentication();
        if (this._Authentication.sessionToken) {
            this._Authentication.isAuthenticated = true;
            return true;
        }
        this._Authentication.isAuthenticated = false;
        if (typeof window !== 'undefined') {
            window.location.href = "/login";
        }
        return false;
    }
}