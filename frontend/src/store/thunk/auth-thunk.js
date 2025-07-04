import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../utils/axios"

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", data)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error("Login error:", error)
      return rejectWithValue(error.response?.data)
    }
  }
)
