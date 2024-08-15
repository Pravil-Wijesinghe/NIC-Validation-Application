import api from './api';

export const getNICData = () => {
    return api.get('/nic/data');
};
