// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: "https://grabapi-192a6fe739cb.herokuapp.com",
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;