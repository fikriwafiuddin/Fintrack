import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import categoryApi, { type FormDataCategory } from "../api/categoryApi"
import type { Category, SuccessResponse } from "@/types"
import { toast } from "sonner"
import type { AxiosError } from "axios"
import type { CategoryFieldErrors, ErrorResponse } from "@/types/api"

export const useCreateCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ category: Category }>,
    AxiosError<ErrorResponse<CategoryFieldErrors>>,
    FormDataCategory
  >({
    mutationFn: async (data: FormDataCategory) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await categoryApi.create(data, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
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

export const useUpdateCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ category: Category }>,
    AxiosError<ErrorResponse<CategoryFieldErrors>>,
    { id: string; data: FormDataCategory }
  >({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: FormDataCategory
    }) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await categoryApi.update(id, data, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
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

export const useRemoveCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<
    SuccessResponse<{ category: Category }>,
    AxiosError<ErrorResponse<CategoryFieldErrors>>,
    string
  >({
    mutationFn: async (id: string) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await categoryApi.remove(id, token)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
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

export const useGetAllCategories = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await categoryApi.getAll(token)
    },
    select: (
      data: SuccessResponse<{
        defaultCategories: Category[]
        customCategories: Category[]
      }>
    ) => {
      return data.data
    },
  })
}
