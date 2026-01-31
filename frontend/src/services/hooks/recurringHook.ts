import type {
  Category,
  ErrorResponse,
  RecurringTransaction,
  SuccessResponse,
} from "@/types"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import recurringApi from "../api/recurringApi"
import type { AxiosError } from "axios"
import { toast } from "sonner"
import type { FormDataRecurring, RecurringFieldErrors } from "@/types/form"

export const queryKeyRecurrings = (options: object = {}) => {
  return ["recurrings", options]
}

export const useCreateRecurring = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ recurring: RecurringTransaction<string> }>,
    AxiosError<ErrorResponse<RecurringFieldErrors>>,
    FormDataRecurring
  >({
    mutationFn: async (data) => {
      const token = await getToken()
      if (!token) throw new Error("Authentication token is missing")
      return await recurringApi.create(data, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeyRecurrings() })
      toast.success(data.message)
    },
    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message || "Network error")
      }
    },
  })
}

export const useUpdateRecurring = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ recurring: RecurringTransaction<string> }>,
    AxiosError<ErrorResponse<RecurringFieldErrors>>,
    { id: string; data: Partial<FormDataRecurring> & { status?: string } }
  >({
    mutationFn: async ({ id, data }) => {
      const token = await getToken()
      if (!token) throw new Error("Authentication token is missing")
      return await recurringApi.update(id, data, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeyRecurrings() })
      toast.success(data.message)
    },
    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message || "Network error")
      }
    },
  })
}

export const useUpdateRecurringStatus = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ recurring: RecurringTransaction<string> }>,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationFn: async (id) => {
      const token = await getToken()
      if (!token) throw new Error("Authentication token is missing")
      return await recurringApi.updateStatus(id, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeyRecurrings() })
      toast.success(data.message)
    },
    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message || "Network error")
      }
    },
  })
}

export const useRemoveRecurring = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ recurring: RecurringTransaction<string> }>,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationFn: async (id) => {
      const token = await getToken()
      if (!token) throw new Error("Authentication token is missing")
      return await recurringApi.remove(id, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeyRecurrings() })
      toast.success(data.message)
    },
    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message || "Network error")
      }
    },
  })
}

export const useGetAllRecurrings = (options: { status?: string } = {}) => {
  const { getToken } = useAuth()

  return useQuery<RecurringTransaction<Category>[], ErrorResponse>({
    queryKey: queryKeyRecurrings(options),
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error("Authentication token is missing")
      return await recurringApi.getAll(options, token)
    },
    staleTime: 5 * 60 * 1000,
  })
}
