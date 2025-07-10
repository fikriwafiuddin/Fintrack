import axios from "axios"
import { BASE_URL } from "./constans"

export const axiosWithCredential = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

export const axiosWithoutCredential = axios.create({
  baseURL: BASE_URL,
})
