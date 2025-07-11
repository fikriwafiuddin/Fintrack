import { LoginCredentials, RegisterCredentials } from "@/types/credentials-type"
import { User } from "@/types/data-type"
import { ApiResponse } from "@/types/responses-type"
import { axiosWithCredential } from "@/utils/axios"

const getUser = async (): Promise<ApiResponse<{ user: User }>> => {
  const response = await axiosWithCredential.get("/auth/getUser")
  return response.data.data.user
}

const login = async (
  data: LoginCredentials
): Promise<ApiResponse<{ user: User }>> => {
  const response = await axiosWithCredential.post("/auth/login", data)
  return response.data
}

const register = async (
  data: RegisterCredentials
): Promise<ApiResponse<{ user: User }>> => {
  const response = await axiosWithCredential.post("/auth/register", data)
  return response.data
}

const logout = async (): Promise<ApiResponse<{ user: User }>> => {
  const response = await axiosWithCredential.get("/auth/logout")
  return response.data
}

const authApi = {
  getUser,
  login,
  register,
  logout,
}

export default authApi
