import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  userId: '1',
  boardId: '1',
  boardName: '',
  board: {
    pending: [],
    inProgress: [],
    completed: [],
  },
  cards: {
    cardId: 0,
    cardBody: '',
  },
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    renameBoard: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
    resetBoard: (state, param) => {
      const { payload } = param;
      state.board = [...state.board, payload];
    },
    moveCardTo: (state, params) => {
      console.log(Object.entries(state), state.board[params.payload.toColumn], params);
      const toC = state.board[params.payload.toColumn];
      toC.push(params.payload.card);
      state.board = { state, ...toC };
    },
    moveCardFrom: (state, params) => {
      const frC = state.board[fromColumn];
      const index = frC.indexOf(card);
      delete frC[index];
      state.board = { state, ...frC };
    },
    addCard: (state) => {

    },
    modifyCard: (state) => {

    },
    deleteCard: (state) => {

    },
  },
});

// Action creators are generated for each case reducer function
export const {
  renameBoard, resetBoard, moveCardTo, moveCardFrom, addCard, modifyCard, deleteCard,
} = boardSlice.actions;

export default boardSlice.reducer;
