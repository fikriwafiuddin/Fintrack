import { configureStore } from "@reduxjs/toolkit"
import incomeReducer from "./slice/incomeSlice"
import expensesReducer from "./slice/expensesSlice"
import authReducer from "./slice/authSlice"
import categotyReducer from "./slice/categorySlice"
import transactionReducer from "./slice/transactionSlice"
import statisticReducer from "./slice/statisticSlice"
import globalReducer from "./slice/globalSlice"

const store = configureStore({
  reducer: {
    income: incomeReducer,
    expenses: expensesReducer,
    auth: authReducer,
    category: categotyReducer,
    transaction: transactionReducer,
    statistic: statisticReducer,
    global: globalReducer,
  },
})

export default store
