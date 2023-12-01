import axios from 'axios';
const api_server = process.env.API_SERVER;


async function processRegistration(data: { phone: string; avatar: File; fullName: string; isDriver: boolean; isActive: boolean; isAdmin: boolean; password: string; latitude: number; longitude: number; }) {
    const response = await axios.post(`${api_server}/auth/register`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


async function login(phone: string, password: string) {

    const response = await axios.post(`${api_server}/auth/login`, {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }


    const data = await response.data;
    if (data.isAdmin === false) {
        throw new Error('You are not admin');
    }
    this.token = data.token;
}

export default new Api();