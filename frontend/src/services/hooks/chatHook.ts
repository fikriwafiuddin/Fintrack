import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import chatApi from "../api/chatApi"
import type { Chat, ErrorResponse, FormDataAskAI, Message } from "@/types"
import type { AxiosError } from "axios"
import { toast } from "sonner"

const queryKeyChat = () => ["chat"]

export const useGetChat = () => {
  const { getToken } = useAuth()

  return useQuery<Chat, AxiosError<ErrorResponse>, Chat>({
    queryKey: queryKeyChat(),
    queryFn: async () => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return await chatApi.show(token)
    },
    staleTime: 10 * 60 * 1000,
  })
}

export const useAskAI = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<Message, AxiosError<ErrorResponse>, FormDataAskAI>({
    mutationFn: async (data) => {
      const token = await getToken()
      if (!token) {
        throw new Error("Authentication token is missing")
      }
      return chatApi.askAI(data, token)
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: queryKeyChat() })

      const userMessage: Message = {
        _id: new Date().toString(),
        role: "user",
        content: data.message,
        timestamp: new Date().toString(),
      }

      queryClient.setQueryData(queryKeyChat(), (oldChat: Chat) => {
        if (!oldChat) return oldChat
        return {
          ...oldChat,
          messages: [...(oldChat.messages || []), userMessage],
        }
      })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["chat"], (oldChat: Chat) => {
        if (!oldChat) return oldChat
        return {
          ...oldChat,
          messages: [...(oldChat.messages || []), data],
        }
      })
    },
    onError: (error) => {
      console.log(error)
      toast.error("Something wrong")
    },
  })
}
