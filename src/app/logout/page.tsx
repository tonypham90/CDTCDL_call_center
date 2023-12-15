'use client';
import React, { useEffect, useState } from 'react';
import { AuthService } from 'services/auth';
import toast, { Toaster } from 'react-hot-toast';
import useRouter from 'next/router';
import router from 'next/router';

const LoadingPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const auth = AuthService.getInstance();

    const logout = async () => {
        try {
            const result = await auth.logout();
            if (result) {
                toast.success('Logout success');
                router.push('/login');
            } else {
                toast.error('Logout failed');
                router.push('/');
            }
        } catch (error) { 
            console.log(error); 
            toast.error('Logout failed');
            router.push('/'); } 
            finally { setIsLoading(false); }
    }
    
    
    useEffect(() => {
        logout();
        const handlecheckLogin = async () => {
            const result = await auth.isLoggedIn();
            if (result) {
                toast.success('Logout success');
                router.push('/login');
            } else {
                toast.error('Logout failed');
                router.push('/');
            }
        }
        handlecheckLogin();
    }, [auth]);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Toaster />
            )}
        </div>
    );
};

export default LoadingPage;
