import { createSlice } from "@reduxjs/toolkit"

const globalSlice = createSlice({
  name: "global",
  initialState: {
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
  },
  reducers: {
    setMonth: (state, action) => {
      state.selectedMonth = action.payload
    },
    setYear: (state, action) => {
      state.selectedYear = action.payload
    },
  },
})

export const { setMonth, setYear } = globalSlice.actions
export default globalSlice.reducer
