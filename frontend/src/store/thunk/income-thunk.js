import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../utils/axios"

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = axiosAuthInstance.get(`/categories/income`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
