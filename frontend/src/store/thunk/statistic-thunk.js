import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../utils/axios"

export const statisticPerMonth = createAsyncThunk(
  "statistic/statisticPerMonth",
  async ({ type, year, month }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/statistic/perMonth", {
        params: { type, year, month },
      })
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
