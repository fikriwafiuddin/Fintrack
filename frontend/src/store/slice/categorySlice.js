import { createSlice } from "@reduxjs/toolkit"
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../thunk/category-thunk"

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoadingGet: false,
    isLoadingPost: false,
    isLoadingPut: false,
    isLoadingDelete: false,
    message: {
      success: "",
      error: "",
    },
  },
  reducers: {
    clearMsg: (state) => {
      state.message = {
        success: "",
        error: "",
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoadingGetCategories = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoadingGetCategories = false
        state.categories = action.payload.data.categories
      })
      .addCase(getCategories.rejected, (state) => {
        state.isLoadingGetCategories = false
      })
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoadingPost = true
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoadingPost = false
        state.categories = [...state.categories, action.payload.data.category]
        state.message.success = action.payload.message
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoadingPost = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(updateCategory.pending, (state) => {
        state.isLoadingPut = true
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoadingPut = false
        const category = action.payload.data.category
        const findIndex = state.categories.findIndex(
          (value) => value._id === category._id
        )
        if (findIndex > -1) {
          state.categories[findIndex] = category
        }
        state.message.success = action.payload.message
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoadingPut = false
        state.message.error = action.payload.message
      })
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.isLoadingDelete = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoadingDelete = false
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.data.category._id
        )
        state.message.success = action.payload.message
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoadingDelete = false
        state.message.error = action.payload.message
      })
  },
})

export const { clearMsg } = categorySlice.actions
export default categorySlice.reducer
