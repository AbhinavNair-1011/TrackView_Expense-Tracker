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

export const getExpenseSummaryAPI = async () => {
  return await api.get(`/expense/summary`);
};


