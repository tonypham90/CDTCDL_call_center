'use client';
import axios from 'axiosConfig';
import {IExistingUser} from 'models';
import React, {useEffect, useState} from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import DataFactory from '../../data/api/index';
import { string } from 'yup';
import router from 'next/router';


const UserPage: React.FC = () => {
    const [page, setPage] = useState<number>(1); // Replace with your state
    const [users, setUsers] = useState<IExistingUser[]>([]);
    const [metadata, setMetadata] = useState<Metadata>({}); // Replace with your state
    const dataF = DataFactory.createData('user');
    useEffect(() => {
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        try {
            
            const data = await dataF.getAll();
            console.log(data);
            const metadata = await data.metadata[0];
            console.log(metadata);

            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const nextPage = () => {
        setPage(page + 1);
    }
    const prevPage = () => {
        if (page === 1) return;
        setPage(page - 1);
    }

    const deleteUser = async (userId: string) => {
        try {
            await dataF.delete(userId); // Replace with your API endpoint
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const updateUser = async (userId:string) => {
            router.push(`/profile/${userId}`); // Replace with your API endpoint
    };

    return (
        <div>
            {users.map((user) => (
                <div key={user.id} className="user-card">
                    <Image src={user.avatar} alt={user.fullName}/>
                    <h3>{user.fullName}</h3>
                    <p>{user.phone}</p>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                    <button onClick={() => updateUser(user.id)}>Update</button>
                </div>
            ))}
            <button onClick={prevPage}>Previous Page</button>
            <button onClick={nextPage}>Next Page</button>
        </div>
    );
};

export default UserPage;
