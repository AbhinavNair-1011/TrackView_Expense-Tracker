import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'; 
const API_BASE_URL =  'http://localhost:3000/api'; 
export const registerUserAPI = (formData) => {
  return axios.post(`${API_BASE_URL}/auth/register`, formData);
};
