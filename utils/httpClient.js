const axios = require('axios');

const httpClient = axios.create({
    timeout: 5000, 
});

// Middleware para manejar errores
httpClient.interceptors.response.use(
    response => response,
    error => {
        // Manejo de errores global
        console.error('HTTP Error:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

module.exports = httpClient;
