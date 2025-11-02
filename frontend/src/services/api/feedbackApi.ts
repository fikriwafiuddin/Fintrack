import { axiosInstance } from "@/lib/axios"
import type { FormDataFeedback } from "@/types"

const create = async (data: FormDataFeedback, token: string) => {
  const response = await axiosInstance.post("/feedback", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const feedbackApi = {
  create,
}
export default feedbackApi
