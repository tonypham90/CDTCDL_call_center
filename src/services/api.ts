import axios from 'axiosConfig';



async function processRegistration(data: { phone: string; avatar: File; fullName: string; isDriver: boolean; isActive: boolean; isAdmin: boolean; password: string; latitude: number; longitude: number; }) {
    const response = await axios.post(`${api_server}/auth/register`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


async function login(phone: string, password: string) {

    const response = await axios.post(`/auth/login`, {
        phone,
        password,
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }


    const data = await response.data;
    if (data.isAdmin === false) {
        throw new Error('You are not admin');
    }
    localStorage.setItem('token', data.authentication.sessionToken);
}

function isLoggedIn() {
    // Check if the sessionToken exists in localStorage
    return localStorage.getItem('token') !== null;
}

export default { login, processRegistration, isLoggedIn };