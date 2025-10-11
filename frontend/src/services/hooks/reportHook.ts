import { useAuth } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query"
import reportApi from "../api/reportApi"
import type { BreakdownCategoryItem, SuccessResponse } from "@/types"
import type { AxiosError } from "axios"
import type { ErrorResponse } from "@/types/api"

export interface MonthsSummary {
  month: string
  income: number
  expense: number
}

export const useGetLast6MonthsSummary = () => {
  const { getToken } = useAuth()

  return useQuery<
    SuccessResponse<MonthsSummary[]>,
    AxiosError<ErrorResponse<[]>>,
    MonthsSummary[]
  >({
    queryKey: ["last-6-months-summary"],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await reportApi.getLast6MonthsSummary(token)
    },
    select: (data) => {
      return data.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

export interface ReportSummary {
  totalIncome: number
  totalExpense: number
  difference: number
  totalTransactions: number
  expenseCategoryBreakdown: BreakdownCategoryItem[]
  incomeCategoryBreakdown: BreakdownCategoryItem[]
}

export const useGetSummary = (request: { month: number; year: number }) => {
  const { getToken } = useAuth()

  return useQuery<
    SuccessResponse<ReportSummary>,
    AxiosError<ErrorResponse>,
    ReportSummary
  >({
    queryKey: ["report-summary", request],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await reportApi.getSummary(request, token)
    },
    select: (data) => {
      return data.data
    },
    staleTime: 5 * 60 * 1000,
  })
}
