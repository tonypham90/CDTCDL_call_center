'use client';
import Link from 'next/link';
import React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axiosConfig';
import {toast} from 'react-hot-toast';
import {AuthService} from 'services';
import DataFactory from '../../data/api';
import webstruct from "../../data/webstruct.json"

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        phone: '',
        password: '',
    });
    const pageinfomation = webstruct.find((item) => item.info.path === '/login');
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);

            const auth = AuthService.getInstance();

            // auth.login(user.phone, user.password);

            // const response = await axios.post(
            //   '/auth/login',
            //   user,
            // );
            const response = await axios.post('/auth/login', user);
            console.log('Login success', response.data);
            toast.success('Login success');
            router.push('/');
        } catch (error: any) {
            console.log('Login failed', error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.phone.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? 'Processing' : 'Login'}</h1>
            <hr/>

            <label htmlFor="phone">phone</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="phone"
                type="text"
                value={user.phone}
                onChange={(e) => setUser({...user, phone: e.target.value})}
                placeholder="phone"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
            />
            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Login
            </button>
            <Link href="/newaccount">Visit Signup page</Link>
        </div>
    );
}
