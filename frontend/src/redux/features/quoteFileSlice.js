import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {};

const quoteFileSlice = createSlice({
  name: 'quoteFile',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default quoteFileSlice.reducer;
