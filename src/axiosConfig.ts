// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.API_SERVER || 'https://grabapi-192a6fe739cb.herokuapp.com',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        timeout: 3000,
    },
});

export default instance;