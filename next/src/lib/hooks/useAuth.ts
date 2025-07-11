import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import authApi from "../api/auth-api"
import { ApiError, ApiResponse } from "@/types/responses-type"
import { User } from "@/types/data-type"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { LoginCredentials, RegisterCredentials } from "@/types/credentials-type"

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser,
    retry: 1,
  })
}

export const useUserFromCache = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<ApiResponse<{ user: User }>>(["user"])
  return data
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation<ApiResponse<{ user: User }>, ApiError, LoginCredentials>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.data.user)
      toast.success(data.message)
      router.push("/dashboard")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation<
    ApiResponse<{ user: User }>,
    ApiError,
    RegisterCredentials
  >({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.data.user)
      toast.success(data.message)
      router.push("/dashboard")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] })
    },
    onError: (error) => {
      console.log(error)
    },
  })
}
