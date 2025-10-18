import type {
  Budget,
  BudgetFieldErrors,
  ErrorResponse,
  FormDataBudget,
  SuccessResponse,
} from "@/types"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import budgetApi from "../api/budgetApi"
import { toast } from "sonner"

export const queryKeyBudgets = (options: object = {}) => {
  return ["budgets", options]
}

export const useCreateBudget = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ budget: Budget }>,
    AxiosError<ErrorResponse<BudgetFieldErrors>>,
    FormDataBudget
  >({
    mutationFn: async (data) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await budgetApi.create(data, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeyBudgets() })
      toast.success(data.message)
    },
    onError: (error) => {
      console.error("Mutation Error:", error)

      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(
          error.message || "Network error. Please check your connection."
        )
      }
    },
  })
}

export const useUpdateBudget = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ budget: Budget }>,
    AxiosError<ErrorResponse<BudgetFieldErrors>>,
    { id: string; data: FormDataBudget }
  >({
    mutationFn: async ({ id, data }) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await budgetApi.update(id, data, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeyBudgets() })
      toast.success(data.message)
    },
    onError: (error) => {
      console.error("Mutation Error:", error)

      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(
          error.message || "Network error. Please check your connection."
        )
      }
    },
  })
}

export const useRemoveBudget = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ budget: Budget }>,
    AxiosError<ErrorResponse<BudgetFieldErrors>>,
    string
  >({
    mutationFn: async (id) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await budgetApi.remove(id, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeyBudgets() })
      toast.success(data.message)
    },
    onError: (error) => {
      console.error("Mutation Error:", error)

      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(
          error.message || "Network error. Please check your connection."
        )
      }
    },
  })
}

export const useGetAllBudgets = () => {
  const { getToken } = useAuth()

  return useQuery<
    SuccessResponse<{ budgets: Budget[] }>,
    AxiosError<ErrorResponse>,
    { budgets: Budget[] }
  >({
    queryKey: queryKeyBudgets(),
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await budgetApi.getAll(token)
    },
    select: (data) => {
      return data.data
    },
    staleTime: 5 * 60 * 1000,
  })
}
