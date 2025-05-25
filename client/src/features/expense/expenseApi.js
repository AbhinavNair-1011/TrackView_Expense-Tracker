import api from "../../app/axiosConfig"

export const createExpenseAPI = async (expenseData) => {
  return await api.post('/expense', expenseData);
};

export const getExpensesAPI = async (params = {}) => {
  return await api.get('/expense', { params });
};

export const getExpenseAPI = async (id) => {
  return await api.get(`/expense/${id}`);
};

export const updateExpenseAPI = async (id, expenseData) => {
  return await api.put(`/expense/${id}`, expenseData);
};

export const deleteExpenseAPI = async (id) => {
  return await api.delete(`/expense/${id}`);
};

export const getExpenseSummaryAPI = async (params = {}) => {
  return await api.get(`/expense/summary`, { params });
};


export const getDuesAPI = async (params = {}) => {
  return await api.get('/expense-dues', { params }); 
};

export const createDueAPI = async (dueData) => {
  return await api.post('/expense-dues', dueData);
};

export const markPaidDueAPI = async (ids) => {
  return await api.put(`/expense-dues/paid`, ids);
};

export const deleteDueAPI = async (id) => {
  return await api.delete(`/expense-dues/${id}`);
};

export const getDueNotificationAPI = async (id) => {
return await api.get("/expense-dues/notifications");
}