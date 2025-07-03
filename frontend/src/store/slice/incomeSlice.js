import { createSlice } from "@reduxjs/toolkit"
import {
  barData,
  pieData,
  transactions,
  categories,
} from "../../data/income-data"

const initialState = {
  pieData,
  barData,
  transactions,
  categories,
}

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
})

export default incomeSlice.reducer
