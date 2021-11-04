import axios from 'axios';

const api = axios.create({
    baseURL : 'https://api.frankfurter.app/currencies',
});

export default api;