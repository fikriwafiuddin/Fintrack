import { createSlice } from "@reduxjs/toolkit"
import {
  barData,
  categories,
  pieData,
  transactions,
} from "../../data/expense-data"

const initialState = {
  pieData: pieData,
  barData: barData,
  transactions: transactions,
  categories: categories,
}

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
})

export default expenseSlice.reducer
