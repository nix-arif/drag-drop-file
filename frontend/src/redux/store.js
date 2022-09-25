import { configureStore } from '@reduxjs/toolkit';
import quoteFileReducer from './features/quoteFileSlice';

export const store = configureStore({
  reducer: {
    file: quoteFileReducer,
  },
});
