import axios from 'axios';
import router from '../../router/index.js';

const api = axios.create({
    baseURL: 'http://localhost:3400',
});

// Interceptador de requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
});

// Interceptador de respostas
api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                localStorage.removeItem('userToken');
                router.push('/login');
                break;
        }
    } else if (error.request) {
        console.error('O pedido foi feito mas não houve resposta', error.request);
    } else {
        console.error('Erro na configuração da requisição:', error.message);
    }
    return Promise.reject(error);
});

export default api;
