'use client';

import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {useRouter} from 'next/router';
import {response} from "express";
import axios from "../../axiosConfig";

interface ILoginData {
    phone: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<ILoginData>();
    const [loginError, setLoginError] = useState<string | null>(null);

    const onSubmit = async (data: ILoginData, event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post('/auth/login', data);
            console.log(response.data);
            localStorage.setItem('token', response.data.sessionToken);
            // Handle success
            console.log('Login successful');
            setLoginError(null);
            window.location.href = '/';

        } catch (error) {
            // Handle error
            console.error('Login failed', error);
            setLoginError('Login failed, please try again');
        }
    };

    const input_style = {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        width: '100%',
    };

    return (
        <form onSubmit={(event) => handleSubmit(onSubmit)(event)} className=" text-black">
            {/* ...existing code... */}
            {loginError && <p>{loginError}</p>}
            <label htmlFor="phone">
                {' '}
                phone:
                <input
                    type="text"
                    {...register('phone', {required: true})}
                    placeholder="Phone Number"
                    style={input_style}
                />
                {errors.phone && <span>This field is required</span>}
            </label>

            <label htmlFor="password">
                {' '}
                Password:
                <input
                    type="password"
                    {...register('password', {required: true})}
                    placeholder="Password"
                    style={input_style}
                />
                {errors.password && <span>This field is required</span>}
            </label>

            <button
                type="submit"
                className="px-5 py-4 bg-green-300 text-black font-medium text-sm leading-snug uppercase rounded shadow-md hover: bg-green-500 hover:shadow-lg focus:bg-gray-100 focus:shadow-lg focus:outline-none focus:ring-0 active: bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            >
                Sign In
            </button>
        </form>
    );
};

export default LoginForm;
