import { configureStore } from "@reduxjs/toolkit"
import incomeReducer from "./slice/incomeSlice"
import expensesReducer from "./slice/expensesSlice"
import authReducer from "./slice/authSlice"
import categotyReducer from "./slice/categorySlice"

const store = configureStore({
  reducer: {
    income: incomeReducer,
    expenses: expensesReducer,
    auth: authReducer,
    category: categotyReducer,
  },
})

export default store
