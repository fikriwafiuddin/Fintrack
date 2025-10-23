import { axiosInstance } from "@/lib/axios"
import type { FormDataSetting, SuccessResponse, UserPreference } from "@/types"
import type { AxiosResponse } from "axios"

const show = async (token: string) => {
  const response: AxiosResponse<
    SuccessResponse<{ userPreference: UserPreference }>
  > = await axiosInstance.get("/settings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.data.userPreference
}

const update = async (data: FormDataSetting, token: string) => {
  const response = await axiosInstance.put("/settings", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

const settingApi = {
  show,
  update,
}
export default settingApi
