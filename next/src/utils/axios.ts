import axios, { AxiosError } from "axios"
import { BASE_URL } from "./constans"
import { ApiError } from "@/types/responses-type"
import { toast } from "react-toastify"

export const axiosWithCredential = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

export const axiosWithoutCredential = axios.create({
  baseURL: BASE_URL,
})

axiosWithCredential.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status
    const data = error.response?.data

    if (status === 500) {
      toast.error(data?.message)
    }

    console.log(error)
    return Promise.reject(data)
  }
)
