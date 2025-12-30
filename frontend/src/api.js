import axios from 'axios';

const API_URL = 'http://localhost:8080/req';

export const registerUser = (userData) => {
    // Sends POST to http://localhost:8080/req/signup
    return axios.post(`${API_URL}/signup`, userData);
};

export const loginUser = (userData) => {
    // Sends POST to http://localhost:8080/req/login
    return axios.post(`${API_URL}/login`, userData);
};