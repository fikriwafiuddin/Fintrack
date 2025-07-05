import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance, axiosInstance } from "../../utils/axios"

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", data, {
        withCredentials: true,
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error("Login error:", error)
      return rejectWithValue(error.response?.data)
    }
  }
)

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get("/auth/getUser")
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
