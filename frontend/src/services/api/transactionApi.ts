import { axiosInstance } from "@/lib/axios"
import type { TransactionFilter } from "@/types"
import type { FormDataTransaction } from "@/types/api"

const create = async (data: FormDataTransaction, token: string) => {
  const response = await axiosInstance.post("/transactions", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const update = async (id: string, data: FormDataTransaction, token: string) => {
  const response = await axiosInstance.put(`/transactions/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const remove = async (id: string, token: string) => {
  const response = await axiosInstance.delete(`/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (request: TransactionFilter, token: string) => {
  const response = await axiosInstance.get("/transactions", {
    params: request,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const transactionApi = {
  create,
  update,
  remove,
  getAll,
}
export default transactionApi
