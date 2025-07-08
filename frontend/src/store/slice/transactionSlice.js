import { createSlice } from "@reduxjs/toolkit"
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../thunk/transactio-thunk"

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    totalTransactions: 0,
    totalPages: 0,
    currentPage: 1,
    isLoadingPost: false,
    isLoadingGet: false,
    isLoadingDelete: false,
    isLoadingPut: false,
    message: {
      success: "",
      error: "",
    },
  },
  reducers: {
    clearMsg: (state) => {
      state.message = {
        success: "",
        error: "",
      }
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isLoadingPost = true
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoadingPost = false
        state.transactions = [
          ...state.transactions,
          action.payload.data.transaction,
        ]
        state.message.success = action.payload.message
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoadingPost = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(getTransactions.pending, (state) => {
        state.isLoadingGet = true
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoadingGet = false
        state.transactions = action.payload.data.transactions
        state.totalPages = action.payload.data.totalPages
        state.totalTransactions = action.payload.data.totalTransactions
      })
      .addCase(getTransactions.rejected, (state) => {
        state.isLoadingGet = false
      })
    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoadingDelete = true
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoadingDelete = false
        const transaction = action.payload.data.transaction
        state.transactions = state.transactions.filter(
          (value) => value._id !== transaction._id
        )
        state.message.success = action.payload.message
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoadingDelete = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(updateTransaction.pending, (state) => {
        state.isLoadingPut = true
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoadingPut = false
        const transaction = action.payload.data.transaction
        const findIndex = state.transactions.findIndex(
          (value) => value._id === transaction._id
        )
        if (findIndex > -1) {
          state.transactions[findIndex] = transaction
        }
        state.message.success = action.payload.message
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoadingPut = false
        state.message.error = action.payload.message
      })
  },
})

export const { clearMsg, setPage } = transactionSlice.actions
export default transactionSlice.reducer
