import { axiosInstance } from "@/lib/axios"

const getLast6MonthsSummary = async (token: string) => {
  const response = await axiosInstance.get("/report/tren-6-monsths", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getSummary = async (
  request: { month: number; year: number },
  token: string
) => {
  const response = await axiosInstance.get("/report/summary", {
    params: request,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return await response.data
}

const reportApi = {
  getLast6MonthsSummary,
  getSummary,
}
export default reportApi
