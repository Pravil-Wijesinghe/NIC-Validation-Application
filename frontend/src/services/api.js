import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3003', // Point to the API Gateway
});

export default api;
