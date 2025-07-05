import { createSlice } from "@reduxjs/toolkit"
import { barData, pieData, transactions } from "../../data/income-data"
import { getCategories } from "../thunk/income-thunk"

const initialState = {
  pieData,
  barData,
  transactions,
  categories: [],
  isLoadingGetCategories: false,
}

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoadingGetCategories = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoadingGetCategories = false
        state.categories = action.payload.data.categories
      })
      .addCase(getCategories.rejected, (state) => {
        state.isLoadingGetCategories = false
      })
  },
})

export default incomeSlice.reducer
