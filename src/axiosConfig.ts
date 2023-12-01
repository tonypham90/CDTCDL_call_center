// axiosConfig.js
import axios from 'axios';
import { env } from 'process';

const instance = axios.create({
    baseURL: process.env.API_SERVER,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;