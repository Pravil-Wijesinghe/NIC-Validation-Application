import api from './api';

export const login = (credentials) => {
    return api.post('/user/login', credentials);
};
