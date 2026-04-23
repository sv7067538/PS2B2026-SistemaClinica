import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para manejar respuestas
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            console.error('Error de respuesta:', error.response.data);
            return Promise.reject(error.response.data);
        } else if (error.request) {
            console.error('No hay respuesta del servidor');
            return Promise.reject({ message: 'No se puede conectar con el servidor' });
        } else {
            console.error('Error:', error.message);
            return Promise.reject({ message: error.message });
        }
    }
);

export default api;