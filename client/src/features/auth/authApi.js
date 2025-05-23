import api from "../../app/axiosConfig"

export const registerUserAPI = async (formData) => {
  return await api.post(`/auth/register`, formData);
};

export const loginUserAPI = async (formData) => {
  return await api.post('/auth/login', formData);
};

export const logoutUserAPI = async () => await api.post('/auth/logout');

export const verifyLoginAPI = async (formData) => {
  return await api.post('/auth/verify-login', formData);
};

export const verifyUserCookieAPI = async () => await api.get('/auth/verify-cookie');

export const refreshTokenApi = async ()=> await api.post('/auth/refresh-token');

