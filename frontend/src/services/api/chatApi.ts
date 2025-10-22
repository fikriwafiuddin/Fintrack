import { axiosInstance } from "@/lib/axios"
import type { Chat, FormDataAskAI, Message, SuccessResponse } from "@/types"
import type { AxiosResponse } from "axios"

const show = async (token: string) => {
  const response: AxiosResponse<SuccessResponse<{ chat: Chat }>> =
    await axiosInstance.get("/chats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

  return response.data.data.chat
}

const askAI = async (data: FormDataAskAI, token: string) => {
  const response: AxiosResponse<SuccessResponse<{ message: Message }>> =
    await axiosInstance.post("/chats/ask-ai", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

  return response.data.data.message
}

const chatApi = {
  show,
  askAI,
}
export default chatApi
