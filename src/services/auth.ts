
import axios from 'axiosConfig';
import { IUser } from 'models';
import Cookies from 'js-cookie';
import { boolean } from 'yup';
import Link from 'next/link';
import toast from 'react-hot-toast';

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
            toast.error("Login failed");
            console.log("Login failed");
            return;
        }

        const data = response.data;
        if (data.isAdmin === false) {
            throw new Error('You are not admin');
            toast.error("You are not admin");
            console.log("You are not admin");
        }
        else {
            this._Authentication.sessionToken = data.authentication.sessionToken || "";
            this._Authentication.isAdmin = data.isAdmin;
            this._Authentication.id = data._id || "";
            this._Authentication.isAuthenticated = true;
            this.setAuthentication();

        }
    }
    private setAuthentication() {
        Cookies.set('ADMIN_SECRET', JSON.stringify(this._Authentication));
        localStorage.setItem("ADMIN_SECRET", this._Authentication.sessionToken);
        Cookies.set('ADMIN_SECRET', this._Authentication.sessionToken);
    }
    private getAuthentication() {

        const data = Cookies.get('ADMIN_SECRET');
        if (data) {
            this._Authentication.sessionToken = localStorage.getItem("ADMIN_SECRET") || "";
            this._Authentication.isAdmin = true;
            this._Authentication.sessionToken = data;
        }
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
}