import { axiosInstance } from "@/lib/axios"
import type { Category, SuccessResponse, Transaction } from "@/types"

const getBalance = async (
  token: string
): Promise<SuccessResponse<{ balance: number }>> => {
  const response = await axiosInstance.get("dashboard/balance", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export type SummaryDataResponse = {
  summary: {
    totalIncome: number
    totalExpense: number
    difference: number
  }
}

const getSummary = async (
  request: { period: string },
  token: string
): Promise<SuccessResponse<SummaryDataResponse>> => {
  const response = await axiosInstance.get("/dashboard/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: request,
  })
  return response.data
}

const getRecentTransactions = async (
  token: string
): Promise<SuccessResponse<{ transactions: Transaction<Category>[] }>> => {
  const response = await axiosInstance.get("/dashboard/recent-transactions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const dashboardApi = {
  getSummary,
  getBalance,
  getRecentTransactions,
}
export default dashboardApi
