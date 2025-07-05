import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../utils/axios"

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (type, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.get(`/categories/${type}`)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.post(`/categories/create`, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.put(
        `/categories/update/${id}`,
        data
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.delete(
        `/categories/remove/${id}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
