import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  userId: '1',
  boardId: '1',
  boardName: '',
  board: {
    pending: [],
    inProgress: [],
    completed: []
  },
  cards: {
    cardId: 0,
    cardBody: ''    
  }
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    renameBoard: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    resetBoard: (state, param) => {
      const { payload } = param;
      state.board = [...state.board, payload];
    },
    moveCardTo: (state, toColumn, card) => {
      let toC = state.board[toColumn];
      toC.push(card);
      state.board = { state, ...toC }
    },
    moveCardFrom: ( state, fromColumn, card ) => {
      let frC = state.board[fromColumn];
      const index = frC.indexOf(card);
      delete frC[index];
      state.board = { state, ...frC }

    },
    addCard: (state) => {

    },
    modifyCard: (state) => {

    },
    deleteCard: (state) => {

    }
  },
})

// Action creators are generated for each case reducer function
export const { renameBoard, resetBoard, moveCardTo, moveCardFrom, addCard, modifyCard, deleteCard } = boardSlice.actions

export default boardSlice.reducer