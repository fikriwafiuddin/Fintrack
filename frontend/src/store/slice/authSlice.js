import { createSlice } from "@reduxjs/toolkit"
import { login } from "../thunk/auth-thunk"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
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
  },
})

export const { clearMsg } = authSlice.actions
export default authSlice.reducer
