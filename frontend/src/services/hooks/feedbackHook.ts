import {
  type ErrorResponse,
  type Feedback,
  type FeedbackFieldErrors,
  type FormDataFeedback,
  type SuccessResponse,
} from "@/types"
import { useAuth } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query"
import feedbackApi from "../api/feedbackApi"
import { toast } from "sonner"
import type { AxiosError } from "axios"

export const useCreateFeedback = () => {
  const { getToken } = useAuth()

  return useMutation<
    SuccessResponse<{ feedback: Feedback }>,
    AxiosError<ErrorResponse<FeedbackFieldErrors>>,
    FormDataFeedback
  >({
    mutationFn: async (data) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await feedbackApi.create(data, token)
    },
    onError: (error) => {
      toast.error(
        error.message || "Network error. Please check your connection."
      )
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
  })
}
