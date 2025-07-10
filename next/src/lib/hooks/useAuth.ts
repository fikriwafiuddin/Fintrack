import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import authApi from "../api/auth-api"
import { ApiResponse } from "@/types/responses-type"
import { User } from "@/types/data-type"

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser,
    retry: 1,
    select: (response) => response?.data.user,
  })
}

export const useUserFromCache = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<ApiResponse<{ user: User }>>(["user"])
  return data?.data.user ?? null
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user)
    },
    onError: (error) => {
      console.log(error)
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
