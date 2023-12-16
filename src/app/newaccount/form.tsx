'use client';

import React, {useEffect, useState} from 'react';
import 'react-phone-number-input/style.css';
import {useRouter} from 'next/navigation';
import {toast} from 'react-hot-toast';
import {AuthService} from 'services';
import {ISignUp} from "../../models/interface";
import DataFactory from "../../data/api";

export default function RegisterForm() {
    const router = useRouter();
    const data = DataFactory.createData("user");

    const [user, setUser] = useState<ISignUp>({
        phone: '',
        password: "",
        avatar: "",
        fullName: '',
        isDriver: false,
        isAdmin: false,
        isVip: false,
        isActived: false
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSignUp = async () => {
        try {
            setLoading(true);
            const auth = AuthService.getInstance();
            data.create(user);
            toast.success('Đăng ký thành công');
            router.push('/login');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (
            user.phone.length > 0 &&
            user.password.length > 0 &&
            user.fullName.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    return (
        <div className="flex flex-col items-center justify-center min-h-0 py-2  bg-black">
            <h2>{loading ? 'Processing' : 'Sign In'}</h2>
            <form
                onSubmit={onSignUp}
                className="flex flex-col items-center justify-center w-full px-4 bg-transparent border-0 rounded-lg shadow-lg border-cyan-500"
            >
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="border border-gray-300 p-2 rounded-lg m-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                    id="phone"
                />
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="border border-gray-300 p-2 rounded-lg m-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    value={user.fullName}
                    onChange={(e) => setUser({...user, fullName: e.target.value})}
                    id="fullName"
                />
                <label htmlFor="avatar">Avatar</label>
                <input
                    type="file"
                    name="avatar"
                    placeholder="Avatar"
                    className="border border-gray-300 p-2 rounded-lg m-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    value={user.avatar}
                    onChange={(e) => setUser({...user, avatar: e.target.value})}
                    id="avatar"
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border border-gray-300 p-2 rounded-lg m-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                    value={user.password}
                    onChange={(e) =>
                        setUser({...user, password: e.target.value})
                    }
                    id="password"
                />
                <hr/>
                <div className="flex flex-wrap">
                    <div className="w-1/2">
                        <label>
                            <input
                                type="checkbox"
                                checked={user.isDriver}
                                onChange={(e) => setUser({...user, isDriver: e.target.checked})}
                            />
                            Is Driver
                        </label>
                    </div>
                    <div className="w-1/2">
                        <label>
                            <input
                                type="checkbox"
                                checked={user.isAdmin}
                                onChange={(e) => setUser({...user, isAdmin: e.target.checked})}
                            />
                            Is Admin
                        </label>
                    </div>
                    <div className="w-1/2">
                        <label>
                            <input
                                type="checkbox"
                                checked={user.isVip}
                                onChange={(e) => setUser({...user, isVip: e.target.checked})}
                            />
                            Is Vip
                        </label>
                    </div>
                </div>
                <hr/>
                {/*<h1>Car Infomation</h1>*/}
                {/*<label htmlFor="brand">Brand</label>*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    name="brand"*/}
                {/*    placeholder="Brand"*/}
                {/*    className="border border-gray-300 p-2 rounded-lg m-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"*/}
                {/*    value={user.car?.brand}*/}
                {/*    onChange={(e) => {*/}
                {/*        setUser({...user, car: {...user.car, brand: e.target.value}});*/}
                {/*    }}*/}
                {/*    id="brand"*/}
                {/*/>*/}
                {/*<label htmlFor="seatNumber">Seat Number</label>*/}
                {/*<input*/}
                {/*    type="number"*/}
                {/*    name="seatNumber"*/}
                {/*    placeholder="Seat Number"*/}
                {/*    className="border border-gray-300 p-2 rounded-lg m-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"*/}
                {/*    value={user.car?.seatNumber}*/}
                {/*    onChange={(e) =>*/}
                {/*        setUser({...user, car: {...user.car, seatNumber: e.target.valueAsNumber}})*/}
                {/*    }*/}
                {/*    id="seatNumber"*/}
                {/*/>*/}
                <button
                    type="submit"
                    disabled={buttonDisabled}
                    className=" border border-gray-300 text-white font-bold py-2 px-4 rounded-2xl w-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent focus:bg-gray-200 hover:bg-gray-200 hover:text-black"
                >
                    {buttonDisabled ? (
                        'No Sign-Up'
                    ) : (
                        <>
                            <span> Add New User</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
