// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.API_SERVER || 'https://grabapi-192a6fe739cb.herokuapp.com',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
        'If-Modified-Since': '0',

    },
});

export default instance;