import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import settingApi from "../api/settingApi"
import type {
  ErrorResponse,
  FormDataSetting,
  SuccessResponse,
  UserPreference,
} from "@/types"
import type { AxiosError } from "axios"
import { toast } from "sonner"
import { useUserPreference } from "@/store/useUserPreference"

export const queryKeySettings = () => ["settings"]

export const useGetUserPreference = () => {
  const { getToken } = useAuth()

  return useQuery<UserPreference, ErrorResponse, UserPreference>({
    queryKey: queryKeySettings(),
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return settingApi.show(token)
    },
    staleTime: Infinity,
  })
}

export const useUpdateUserPreference = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  const setCurrencyCode = useUserPreference((state) => state.setCurrencyCode)

  return useMutation<
    SuccessResponse<{ userPreference: UserPreference }>,
    AxiosError<ErrorResponse>,
    FormDataSetting
  >({
    mutationFn: async (data) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await settingApi.update(data, token)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.setQueryData(queryKeySettings(), (oldData: UserPreference) =>
        oldData
          ? {
              ...oldData,
              ...data.data.userPreference,
            }
          : oldData
      )
      setCurrencyCode(data.data.userPreference.currency)
    },
    onError: () => {
      toast.error("Something wrong")
    },
  })
}
