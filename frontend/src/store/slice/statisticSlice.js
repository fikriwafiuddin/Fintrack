import { createSlice } from "@reduxjs/toolkit"
import { statisticPerMonth } from "../thunk/statistic-thunk"

const statisticSlice = createSlice({
  name: "statistic",
  initialState: {
    isLoading: false,
    totalAmount: 0,
    barData: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    },
    pieData: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: [""],
          borderWidth: 1,
        },
      ],
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(statisticPerMonth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(statisticPerMonth.fulfilled, (state, action) => {
        state.isLoading = false
        state.totalAmount = action.payload.data.totalAmount
        state.barData = action.payload.data.barData
        state.pieData = action.payload.data.pieData
      })
      .addCase(statisticPerMonth.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default statisticSlice.reducer
