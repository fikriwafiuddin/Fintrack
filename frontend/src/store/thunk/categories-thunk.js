import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../utils/axios"

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async ({ type }, { rejectWithValue }) => {
    try {
      const response = axiosAuthInstance.get(`/categories/${type}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
