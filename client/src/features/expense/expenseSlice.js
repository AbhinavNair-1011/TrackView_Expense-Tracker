import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createExpenseAPI,
  getExpensesAPI,
  getExpenseAPI,
  updateExpenseAPI,
  deleteExpenseAPI,
  getExpenseSummaryAPI,
} from './expenseApi';



export const fetchExpenses = createAsyncThunk(
  'expenses/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getExpensesAPI(params);
      console.log(response)
      return response.data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createExpense = createAsyncThunk(
  'expenses/create',
  async (expenseData, { rejectWithValue }) => {
    try {
      const response = await createExpenseAPI(expenseData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/update',
  async ({ id, ...expenseData }, { rejectWithValue }) => {
    try {
      const response = await updateExpenseAPI(id, expenseData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteExpenseAPI(id);
      return id; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchExpenseSummary = createAsyncThunk(
  'expenses/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getExpenseSummaryAPI();
      console.log(response)
      return response.data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  expenses: [],
  loading: false,
  error: null,
  currentExpense: null,
  pagination: null,
  summary: null,
  summaryLoading: false,
  summaryError: null,

};
export const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setCurrentExpense(state, action) {
      state.currentExpense = action.payload;
    },
    clearCurrentExpense(state) {
      state.currentExpense = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload.expenses;
        state.pagination = action.payload.pagination;

      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.unshift(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.expenses.findIndex(e => e.id === action.payload.id);
        if (index !== -1) state.expenses[index] = action.payload;
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchExpenseSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenseSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchExpenseSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
          .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.expenses = state.expenses.filter(expense => expense.id !== id);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { setCurrentExpense, clearCurrentExpense } = expenseSlice.actions;


export default expenseSlice.reducer;
