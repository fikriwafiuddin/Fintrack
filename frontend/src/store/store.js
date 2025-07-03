import { configureStore } from "@reduxjs/toolkit"
import incomeReducer from "./slice/incomeSlice"
import expensesReducer from "./slice/expensesSlice"

const store = configureStore({
  reducer: {
    income: incomeReducer,
    expenses: expensesReducer,
  },
})

export default store
