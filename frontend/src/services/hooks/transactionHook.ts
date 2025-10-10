import type {
  Category,
  SuccessResponse,
  Transaction,
  TransactionFilter,
} from "@/types"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import transactionApi from "../api/transactionApi"
import type { AxiosError } from "axios"
import type {
  ErrorResponse,
  FormDataTransaction,
  TransactionFieldErrors,
} from "@/types/api"
import { toast } from "sonner"

export const useCreateTransaction = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ category: Category }>,
    AxiosError<ErrorResponse<TransactionFieldErrors>>,
    FormDataTransaction
  >({
    mutationFn: async (data) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await transactionApi.create(data, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
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

export const useUpdateTransaction = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ transaction: Transaction<string> }>,
    AxiosError<ErrorResponse<TransactionFieldErrors>>,
    { id: string; data: FormDataTransaction }
  >({
    mutationFn: async ({ id, data }) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await transactionApi.update(id, data, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
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

export const useRemoveTransaction = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ transaction: Transaction<string> }>,
    AxiosError<ErrorResponse<TransactionFieldErrors>>,
    string
  >({
    mutationFn: async (id) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await transactionApi.remove(id, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
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

export const useGetAllTransactions = (request: TransactionFilter) => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["transactions", request],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await transactionApi.getAll(request, token)
    },
    select: (
      data: SuccessResponse<{ transactions: Transaction<Category>[] }>
    ) => {
      return data.data.transactions
    },
    staleTime: 5 * 60 * 1000,
  })
}
