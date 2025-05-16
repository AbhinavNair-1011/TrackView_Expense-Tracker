import axios from 'axios';

// const API_URL = 'http://localhost:300/api/profile'; 

const api = axios.create({
  baseURL:  'http://localhost:3000/api',
  withCredentials: true,
});


export const fetchProfileAPI = async () => {
  return await api.get("/profile");
  
};

export const updateProfileAPI = async (profileData) => {
 return await api.put("/profile", profileData);
 
};
export const updatePasswordAPI = async (passwordData) => {
 return await api.put("/auth/update-password", passwordData);
 
};

