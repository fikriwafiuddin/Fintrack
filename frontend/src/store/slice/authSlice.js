import { createSlice } from "@reduxjs/toolkit"
import { getUser, login, register } from "../thunk/auth-thunk"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isChecked: false,
    message: {
      success: "",
      error: "",
    },
  },
  reducers: {
    clearMsg: (state) => {
      state.message.error = ""
      state.message.success = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data.user
        state.message.success = action.payload.message
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data.user
        state.message.success = action.payload.message
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data.user
        state.isChecked = true
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false
        state.isChecked = true
      })
  },
})

export const { clearMsg } = authSlice.actions
export default authSlice.reducer
