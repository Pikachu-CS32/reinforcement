/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});
