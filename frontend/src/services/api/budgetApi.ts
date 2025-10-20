import { axiosInstance } from "@/lib/axios"
import type { FormDataBudget } from "@/types"

const create = async (data: FormDataBudget, token: string) => {
  const response = await axiosInstance.post("/budgets", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const update = async (id: string, data: FormDataBudget, token: string) => {
  const response = await axiosInstance.put(`/budgets/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const remove = async (id: string, token: string) => {
  const response = await axiosInstance.delete(`/budgets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (request: object, token: string) => {
  const response = await axiosInstance.get("/budgets", {
    params: { ...request },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const budgetApi = {
  create,
  update,
  remove,
  getAll,
}
export default budgetApi
