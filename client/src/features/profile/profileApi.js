import api from "../../app/axiosConfig"

export const fetchProfileAPI = async () => {
  return await api.get("/profile");
  
};

export const updateProfileAPI = async (profileData) => {
 return await api.put("/profile", profileData);
 
};
export const updatePasswordAPI = async (passwordData) => {
 return await api.put("/auth/update-password", passwordData);
 
};

