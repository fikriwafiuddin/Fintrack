import { axiosInstance } from "@/lib/axios"
import type { Category, FormDataCategory, SuccessResponse } from "@/types"

const create = async (
  data: FormDataCategory,
  token: string
): Promise<SuccessResponse<{ category: Category }>> => {
  const response = await axiosInstance.post("/categories", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const update = async (
  id: string,
  data: FormDataCategory,
  token: string
): Promise<SuccessResponse<{ category: Category }>> => {
  const response = await axiosInstance.put(`/categories/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const remove = async (
  id: string,
  token: string
): Promise<SuccessResponse<{ category: Category }>> => {
  const response = await axiosInstance.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (
  token: string
): Promise<
  SuccessResponse<{
    defaultCategories: Category[]
    customCategories: Category[]
  }>
> => {
  const response = await axiosInstance.get("/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const categoryApi = {
  create,
  update,
  remove,
  getAll,
}
export default categoryApi
