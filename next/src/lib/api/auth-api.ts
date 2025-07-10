import { LoginCredentials } from "@/types/credentials-type"
import { User } from "@/types/data-type"
import { ApiResponse } from "@/types/responses-type"
import { axiosWithCredential } from "@/utils/axios"

const getUser = async (): Promise<ApiResponse<{ user: User }> | undefined> => {
  try {
    const response = await axiosWithCredential.get("/auth/getUser")
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const login = async (
  data: LoginCredentials
): Promise<ApiResponse<{ user: User }>> => {
  const response = await axiosWithCredential.post("/auth/login", data)
  return response.data
}

const logout = async (): Promise<ApiResponse<{ user: User }>> => {
  const response = await axiosWithCredential.get("/auth/logout")
  return response.data
}

const authApi = {
  getUser,
  login,
  logout,
}

export default authApi
