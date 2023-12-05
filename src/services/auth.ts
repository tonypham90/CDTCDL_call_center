import axios from 'axiosConfig';

async function processRegistration(data: { phone: string; avatar: File; fullName: string; isDriver: boolean; isActive: boolean; isAdmin: boolean; password: string; latitude: number; longitude: number; }) {
    const formData = new FormData();
    formData.append('phone', data.phone);
    formData.append('avatar', data.avatar);
    formData.append('fullName', data.fullName);
    formData.append('isDriver', data.isDriver.toString());
    formData.append('isActive', data.isActive.toString());
    formData.append('isAdmin', data.isAdmin.toString());
    formData.append('password', data.password);
    formData.append('latitude', data.latitude.toString());
    formData.append('longitude', data.longitude.toString());


    const response = await axios.post(`/auth/register`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    if (response.status !== 200) {
        throw new Error('Registration failed');
    }
}

async function login(phone: string, password: string) {

    const response = await axios.post(`/auth/login`, {
        phone,
        password,
    });

    if (response.status !== 200) {
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

const auth = {
    login,
    processRegistration,
    isLoggedIn
};

export default auth;