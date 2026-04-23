import api from './api';

export const pacienteService = {
    getAll: () => api.get('/pacientes'),
    getById: (id) => api.get(`/pacientes/${id}`),
    create: (data) => api.post('/pacientes', data),
    update: (id, data) => api.put(`/pacientes/${id}`, data),
    delete: (id) => api.delete(`/pacientes/${id}`),
    findByCI: (ci) => api.get(`/pacientes/buscar/ci/${ci}`),
};