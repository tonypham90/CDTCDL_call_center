import axios from 'axiosConfig';
import {IExistingUser} from 'models';
import React, {useEffect, useState} from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

const UserPage: React.FC = () => {
    const [page, setPage] = useState<number>(1); // Replace with your state
    const [users, setUsers] = useState<IExistingUser[]>([]);
    const [metadata, setMetadata] = useState<Metadata>({}); // Replace with your state

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/users'); // Replace with your API endpoint
            const data = await response.data.data;
            const metadata = await response.data.metadata[0];
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

    const deleteUser = async (userId: number) => {
        try {
            await axios.delete(`/users/${userId}`); // Replace with your API endpoint
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const updateUser = async (userId: number) => {
        // Implement your logic to update the user
    };

    return (
        <div>
            {users.map((user) => (
                <div key={user.id} className="user-card">
                    <Image src={user.avatar} alt={user.fullName}/>
                    <h3>{user.fullName}</h3>
                    <p>{user.phone}</p>
                    <button onClick={() => deleteUser(Number(user.id))}>Delete</button>
                    <button onClick={() => updateUser(Number(user.id))}>Update</button>
                </div>
            ))}
            <button onClick={prevPage}>Previous Page</button>
            <button onClick={nextPage}>Next Page</button>
        </div>
    );
};

export default UserPage;
