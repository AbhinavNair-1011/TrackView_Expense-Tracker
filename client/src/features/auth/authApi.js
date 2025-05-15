import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'; 
const API_BASE_URL =  'http://localhost:3000/api'; 

const api = axios.create({
  baseURL:  'http://localhost:3000/api',
  withCredentials: true,
});

export const registerUserAPI = async (formData) => {
  return await api.post(`/auth/register`, formData);
};

export const loginUserAPI = async (formData) => {
  return await api.post('/auth/login', formData);
};