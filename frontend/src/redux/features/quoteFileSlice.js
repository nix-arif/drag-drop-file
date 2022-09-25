import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {};

export const excelFile = createAsyncThunk(
  '/quoteFile/processFile',
  async (file) => {
    try {
      const response = await api.excelFile(file);
      return response.data;
    } catch (error) {
      return { message: error };
    }
  }
);

const quoteFileSlice = createSlice({
  name: 'quoteFile',
  initialState,
  reducers: {},
  extraReducers: {
    [excelFile.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default quoteFileSlice.reducer;
