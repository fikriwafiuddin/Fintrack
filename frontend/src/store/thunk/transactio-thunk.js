import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosAuthInstance } from "../../utils/axios"

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.post("/transaction/create", data)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async (type, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance(`/transaction/${type}`)
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteTransaction = createAsyncThunk(
  "transction/deleteTransacion",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.delete(
        `transaction/delete/${id}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)

export const updateTransaction = createAsyncThunk(
  "transaction/updateTransaction",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosAuthInstance.put(
        `transaction/update/${id}`,
        data
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  }
)
