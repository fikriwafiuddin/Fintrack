import { useAuth } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query"
import dashboardApi, { type SummaryDataResponse } from "../api/dashboardApi"
import type { Category, SuccessResponse, Transaction } from "@/types"

export const useGetBalance = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["dashboard-balance"],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await dashboardApi.getBalance(token)
    },
    select: (data: SuccessResponse<{ balance: number }>): number => {
      return data.data.balance
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetSummary = (request: { period: string }) => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["dashboard-summary", request.period],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await dashboardApi.getSummary(request, token)
    },
    select: (
      data: SuccessResponse<SummaryDataResponse>
    ): SummaryDataResponse => {
      return data.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetRecentTransactions = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["dashboard-recent-transactions"],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await dashboardApi.getRecentTransactions(token)
    },
    select: (
      data: SuccessResponse<{ transactions: Transaction<Category>[] }>
    ) => {
      return data.data.transactions
    },
    staleTime: 5 * 60 * 1000,
  })
}
