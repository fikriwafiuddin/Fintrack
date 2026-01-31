import { axiosInstance } from "@/lib/axios"
import type { Category, RecurringTransaction, SuccessResponse } from "@/types"
import type { AxiosResponse } from "axios"
import type { FormDataRecurring } from "@/types/form"

const create = async (data: FormDataRecurring, token: string) => {
  const response = await axiosInstance.post("/recurrings", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const update = async (
  id: string,
  data: Partial<FormDataRecurring> & { status?: string },
  token: string,
) => {
  const response = await axiosInstance.put(`/recurrings/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const updateStatus = async (id: string, token: string) => {
  const response = await axiosInstance.patch(
    `/recurrings/${id}/status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

const remove = async (id: string, token: string) => {
  const response = await axiosInstance.delete(`/recurrings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getAll = async (request: { status?: string } = {}, token: string) => {
  const response: AxiosResponse<
    SuccessResponse<{ recurrings: RecurringTransaction<Category>[] }>
  > = await axiosInstance.get("/recurrings", {
    params: request,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data.recurrings
}

const recurringApi = {
  create,
  update,
  updateStatus,
  remove,
  getAll,
}

export default recurringApi
