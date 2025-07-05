import axios from "axios"
import constants from "./constants"

export const axiosInstance = axios.create({
  baseURL: constants.BASE_URL,
})

export const axiosAuthInstance = axios.create({
  baseURL: constants.BASE_URL,
  withCredentials: true,
})
